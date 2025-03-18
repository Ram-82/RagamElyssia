// import { Router } from "express";
// import { setupAuth } from "./auth";
// import { storage } from "./storage"; // Import the storage instance
// import Stripe from "stripe";
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables from .env file


import express, { Router, Request, Response } from "express"; // Import express and its types
import path from "path"; // Import path for resolving file paths
import { setupAuth } from "./auth";
import { storage } from "./storage"; // Import the storage instance
import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});



if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required Stripe secret: STRIPE_SECRET_KEY");
}

export const registerRoutes = (app: express.Application) => {
  const router = Router();

  setupAuth(app);

  app.get("/", (req, res) => {
    res.send("Backend is working fine!\n\n");
  });

  app.get("/health", (req: Request, res: Response) => {
    res.json({ message: "API is up and running!" });
  });

  // Storage-related routes
  router.get("/storage/users", async (_req, res) => {
    try {
      const users = Array.from(storage.users.values());
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  router.post("/storage/users", async (req, res) => {
    try {
      const newUser = await storage.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Contact form submission route
  router.post("/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      const contactData = { name, email, subject, message };
      console.log("Contact form submission:", contactData);
      res.status(200).json({ message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ message: "Failed to process contact form" });
    }
  });

  // Payment endpoint
  router.post("/create-payment-intent", async (req, res) => {
    try {
      console.log("inside create-payment-intent");
      const { amount } = req.body;

      if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid amount. Amount must be a positive number.",
        });
      }

      const stripeKey = process.env.STRIPE_SECRET_KEY || '';
      if (!stripeKey.startsWith('sk_test_') && !stripeKey.startsWith('sk_live_')) {
        console.error("Invalid Stripe secret key format. Please check your environment variables.");
        return res.status(500).json({
          success: false,
          message: "Payment service configuration error.",
          error: "invalid_api_key_format",
        });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({ 
        success: true, 
        clientSecret: paymentIntent.client_secret 
      });
    } catch (stripeError: any) {
      console.error("Stripe API error:", stripeError);
      if (stripeError.type === 'StripeAuthenticationError') {
        return res.status(500).json({
          success: false,
          message: "Payment service authentication failed. Please check API keys.",
          error: "authentication_failed",
        });
      }
      return res.status(500).json({
        success: false,
        message: "Payment service error: " + stripeError.message,
        error: stripeError.type || "stripe_error",
      });
    }
  });

  // API route to handle bookings
  router.post("/bookings", async (req, res) => {
    try {
      const { paymentIntentId, ...bookingData } = req.body;

      if (!paymentIntentId) {
        return res.status(400).json({
          success: false,
          message: "Payment intent ID is required.",
        });
      }

      if (paymentIntentId === "pending_payment") {
        console.log("Booking data (payment pending):", bookingData);
        return res.status(200).json({
          success: true,
          message: "Booking request submitted. Payment will be collected later.",
          status: "pending_payment"
        });
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({
          success: false,
          message: "Payment not completed.",
        });
      }

      console.log("Booking data (payment confirmed):", bookingData);
      res.status(200).json({
        success: true,
        message: "Booking confirmed and payment processed successfully.",
        status: "payment_succeeded"
      });
    } catch (error: any) {
      console.error("Error processing booking:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

  // Serve frontend in production
  if (process.env.NODE_ENV === "production") {
    router.use(express.static(path.resolve(__dirname, "../../frontend/dist")));
    router.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "../../frontend/dist/index.html"));
    });
  }

  app.use("/api", router);
};