// import { Router } from "express";
// import { setupAuth } from "./auth";
// import { storage } from "./storage"; // Import the storage instance
// import Stripe from "stripe";
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables from .env file


import express, { Express, Request, Response } from "express"; // Import express and its types
import path, { dirname } from "path"; // Import path for resolving file paths
import { fileURLToPath } from "url";
import { setupAuth } from "./auth";
import { storage } from "./storage"; // Import the storage instance
import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  throw new Error("Stripe secret key is missing");
}
const stripe = new Stripe(stripeKey, {
  apiVersion: "2025-02-24.acacia",
});



if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required Stripe secret: STRIPE_SECRET_KEY");
}

export const registerRoutes = (app: Express) => {
  const router = express.Router();

  setupAuth(app);

  app.get("/", (req: Request, res: Response) => {
    res.send("Backend is working fine!\n\n");
  });

  app.get("/health", (req: Request, res: Response) => {
    res.json({ message: "API is up and running!" });
  });



  // Storage-related routes
  router.get("/storage/users", async (_req: Request, res: Response) => {
    try {
      const users = Array.from(storage.users.values());
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  router.post("/storage/users", async (req: Request, res: Response) => {
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

        // Example: Save contact data to storage (or database)
        const contactData = { name, email, subject, message };
        console.log("Contact form submission:", contactData);

        // Respond with success
        res.status(200).json({ message: "Contact form submitted successfully" });
      } catch (error) {
        console.error("Error processing contact form:", error);
        res.status(500).json({ message: "Failed to process contact form" });
      }
    });

     // Payment endpoint
  // router.post("/create-payment-intent", async (req, res) => {
  //   try {
  //       const { amount } = req.body; // Amount in cents

  //       const paymentIntent = await stripe.paymentIntents.create({
  //         amount,
  //         currency: "usd",
  //       });

  //       res.status(200).json({ clientSecret: paymentIntent.client_secret });
  //     } catch (error) {
  //       console.error("Error creating payment intent:", error);
  //       res.status(500).json({ error: "Failed to create payment intent" });
  //     }
  //   });


  router.post("/create-payment-intent", async (req, res) => {
    try {
      console.log("inside create-payment-intent")
      const { amount } = req.body;

      // Validate the amount
      if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid amount. Amount must be a positive number.",
        });
      }

      // Validate Stripe secret key format (should start with sk_test_ for test mode)
      const stripeKey = process.env.STRIPE_SECRET_KEY || '';
      if (!stripeKey.startsWith('sk_test_') && !stripeKey.startsWith('sk_live_')) {
        console.error("Invalid Stripe secret key format. Please check your environment variables.");
        return res.status(500).json({
          success: false,
          message: "Payment service configuration error.",
          error: "invalid_api_key_format",
        });
      }

      try {
        // Create a PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Convert to cents
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
        });

        // Return the client secret
        res.json({ 
          success: true, 
          clientSecret: paymentIntent.client_secret 
        });
      } catch (stripeError: any) {
        console.error("Stripe API error:", stripeError);
        
        // Check if it's an authentication error
        if (stripeError.type === 'StripeAuthenticationError') {
          return res.status(500).json({
            success: false,
            message: "Payment service authentication failed. Please check API keys.",
            error: "authentication_failed",
          });
        }
        
        // Other Stripe-specific errors
        return res.status(500).json({
          success: false,
          message: "Payment service error: " + stripeError.message,
          error: stripeError.type || "stripe_error",
        });
      }
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({
        success: false,
        message: "Error creating payment intent: " + error.message,
        error: "server_error",
      });
    }
  });


  // API route to handle bookings
  router.post("/bookings", async (req, res) => {
    try {
      const { paymentIntentId, ...bookingData } = req.body;

      // Validate the paymentIntentId
      if (!paymentIntentId) {
        return res.status(400).json({
          success: false,
          message: "Payment intent ID is required.",
        });
      }

      // Special case for pending payments (when Stripe integration is unavailable)
      if (paymentIntentId === "pending_payment") {
        // Store the booking as pending payment (mock implementation)
        console.log("Booking data (payment pending):", bookingData);
        
        return res.status(200).json({
          success: true,
          message: "Booking request submitted. Payment will be collected later.",
          status: "pending_payment"
        });
      }

      try {
        // Verify the payment was successful
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== "succeeded") {
          return res.status(400).json({
            success: false,
            message: "Payment not completed.",
          });
        }
      } catch (stripeError) {
        console.error("Stripe verification error:", stripeError);
        return res.status(400).json({
          success: false,
          message: "Could not verify payment. Please contact support.",
        });
      }

      // Store the booking (mock implementation)
      // In a real application, this would be stored in a database
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

  // router.get("/brochure", (req, res) => {
  //   res.status(200).json({
  //     success: true,
  //     message: "Brochure download link.",
  //     url: "/brochure.pdf",
  //   });
  // });

  // router.post("/newsletter", (req, res) => {
  //   res.status(200).json({
  //     success: true,
  //     message: "Newsletter subscription successful.",
  //   });
  // });


  // Serve frontend in production
  if (process.env.NODE_ENV === "production") {
    router.use(express.static(path.resolve(__dirname, "../../frontend/dist")));
    router.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, "../../frontend/dist/index.html"));
    });
  }

  app.use("/api", router);
};
