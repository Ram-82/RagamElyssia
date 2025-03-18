import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./button";

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
}

export function PaymentForm({ amount, onSuccess }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Payment Service Unavailable",
        description: "The payment system is temporarily unavailable. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking`,
        },
        redirect: "if_required",
      });

      if (error) {
        // Handle specific error types
        const errorType = error.type;
        
        if (errorType === "card_error" || errorType === "validation_error") {
          toast({
            title: "Payment Failed",
            description: error.message || "Your card was declined. Please try another payment method.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Payment Error",
            description: "An unexpected error occurred. Please try again or continue without payment.",
            variant: "destructive",
          });
        }
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast({
          title: "Payment Successful",
          description: "Thank you for your payment.",
        });
        onSuccess(paymentIntent.id);
      } else if (paymentIntent) {
        // Handle other payment statuses
        toast({
          title: "Payment Processing",
          description: `Your payment is ${paymentIntent.status}. We'll update you when it's complete.`,
        });
        // Still send the ID for backend processing
        onSuccess(paymentIntent.id);
      }
    } catch (unexpectedError) {
      console.error("Unexpected payment error:", unexpectedError);
      toast({
        title: "Payment System Error",
        description: "We encountered a technical problem. Please try again or continue without payment.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-md border border-gold/20 p-6">
        <PaymentElement
          options={{
            layout: {
              type: "tabs",
              defaultCollapsed: false,
            },
            theme: "night",
            variables: {
              colorPrimary: '#D4AF37',
              colorBackground: '#111111',
              colorText: '#FFFFFF',
              colorDanger: '#FF5555',
              fontFamily: 'Cormorant, serif',
              borderRadius: '4px',
              spacingUnit: '4px',
            },
            rules: {
              '.Input': {
                color: '#FFFFFF',
                backgroundColor: '#222222',
                borderColor: 'rgba(212, 175, 55, 0.3)',
              },
              '.Input:focus': {
                borderColor: 'rgba(212, 175, 55, 0.8)',
              },
              '.Label': {
                color: '#C0C0C0',
              },
              '.Tab': {
                color: '#C0C0C0',
                borderColor: 'rgba(212, 175, 55, 0.3)',
              },
              '.Tab--selected': {
                color: '#D4AF37',
                borderColor: '#D4AF37',
              },
            }
          }}
        />
      </div>

      <div className="flex justify-end">
        <Button
          variant="default"
          size="lg"
          type="submit"
          disabled={isProcessing || !stripe || !elements}
          className="w-full bg-gold text-black hover:bg-gold/80"
        >
          {isProcessing ? "Processing..." : `Pay $${amount.toLocaleString()}`}
        </Button>
      </div>
    </form>
  );
}