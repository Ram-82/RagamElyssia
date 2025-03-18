import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "./payment-form";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error("Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY");
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PaymentWrapperProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
}

export function PaymentWrapper({ amount, onSuccess }: PaymentWrapperProps) {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setClientSecret("");
    setError("");

    // Use VITE_API_BASE_URL from old code to ensure correct backend URL
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
    fetch(`${apiBaseUrl}/api/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
      credentials: "include",
    })
      .then(async (res) => {
        const text = await res.text();

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Payment service not found. Please check if the server is running.");
          }
          try {
            const errorData = JSON.parse(text);
            throw new Error(errorData.message || "Payment service error");
          } catch {
            throw new Error(text || "Unable to communicate with payment service");
          }
        }

        try {
          const data = JSON.parse(text);
          if (data.success && data.clientSecret) {
            return data;
          }
          throw new Error("Invalid response from payment service");
        } catch {
          throw new Error("Failed to parse payment service response");
        }
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((err: unknown) => {
        console.error("Payment intent creation failed:", err);
        const message = err instanceof Error ? err.message : "Payment service temporarily unavailable";
        setError(message);
      });
  }, [amount]);

  if (!clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        {error ? (
          <div className="text-center space-y-4">
            <p className="text-red-500">{error}</p>
            <p className="text-sm text-[#C0C0C0]">
              You can still proceed with your booking request without payment.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-gold text-black hover:bg-gold/80 rounded text-sm font-medium"
              onClick={() => onSuccess("pending_payment")}
            >
              Continue without payment
            </button>
          </div>
        ) : (
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
        )}
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm amount={amount} onSuccess={onSuccess} />
    </Elements>
  );
}