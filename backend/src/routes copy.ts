import { Router } from "express";
import { setupAuth } from "./auth";
import { storage } from "./storage"; // Import the storage instance
import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});
// Debugging: Log the Stripe secret key

console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);



// Validate Stripe secret key

if (!process.env.STRIPE_SECRET_KEY) {

  throw new Error("Missing required Stripe secret: STRIPE_SECRET_KEY");

}



// Initialize Stripe
export const registerRoutes = (app: express.Application) => {
  const router = Router();

  // Setup authentication routes
  setupAuth(app);

  // Storage-related routes
  router.get("/storage/users", async (_req, res) => {
    try {
      // Example: Fetch all users (you can modify this logic as needed)
      const users = Array.from(storage.users.values());
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  router.post("/storage/users", async (req, res) => {
    try {
      // Example: Create a new user (you can modify this logic as needed)
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
  router.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount } = req.body; // Amount in cents

        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: "Failed to create payment intent" });
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