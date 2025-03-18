import { motion } from "framer-motion";
import { Link } from "wouter";
import { ParallaxSection } from "@/components/ui/parallax";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { StripeError } from "@stripe/stripe-js";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { PaymentModal } from "@/components/ui/payment-modal";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Define package prices
const PACKAGE_PRICES = {
  events: 5000,
  concierge: 15000,
  fashion: 15000,
  bespoke: 25000,
};

// Define the booking form schema
const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  service: z.string({ required_error: "Please select a service." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
  paymentIntentId: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

// CheckoutForm component for Stripe Elements
const CheckoutForm = ({ amount, onSuccess }: { amount: number; onSuccess: (paymentIntentId: string) => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card element not found");
      setLoading(false);
      return;
    }

    try {
      // Create a PaymentIntent on the backend
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent.");
      }

      const { clientSecret } = await response.json();

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        },
      );

      if (error) {
        setError(error.message || "Payment error occurred");
        setLoading(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent.id);
        setLoading(false);
      } else {
        setError("Payment was not completed. Please try again.");
        setLoading(false);
      }
    } catch (error: unknown) {
      console.error("Payment failed:", error);
      setError(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border border-gold/30 rounded" />
      <Button
        type="submit"
        className="w-full bg-gold text-black hover:bg-gold/80"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};


// Main BookingPage component
const BookingPage = () => {
  const { toast } = useToast();
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState<BookingFormValues | null>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormValues) => {
      const res = await apiRequest("POST", "/api/bookings", data);
      if (!res.ok) {
        throw new Error("Failed to submit booking.");
      }
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.status === "pending_payment") {
        toast({
          title: "Booking Request Submitted",
          description: "Payment is pending. We'll contact you to arrange payment and discuss your requirements.",
        });
      } else {
        toast({
          title: "Booking Confirmed",
          description: "Payment successful! We'll contact you shortly to discuss your requirements.",
        });
      }
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handlePaymentSuccess = (paymentIntentId: string) => {
    if (!formData) return;
    bookingMutation.mutate({ ...formData, paymentIntentId });
    setShowPayment(false);
    setFormData(null);
  };

  const onSubmit = (data: BookingFormValues) => {
    const service = data.service as keyof typeof PACKAGE_PRICES;
    if (!PACKAGE_PRICES[service]) {
      toast({
        title: "Error",
        description: "Please select a valid service.",
        variant: "destructive",
      });
      return;
    }
    setFormData(data);
    setShowPayment(true);
  };

  const amount = formData?.service
    ? PACKAGE_PRICES[formData.service as keyof typeof PACKAGE_PRICES]
    : 0;

  return (
    <>
      <PaymentModal
        open={showPayment}
        onOpenChange={setShowPayment}
        amount={amount}
        onSuccess={handlePaymentSuccess}
      />
      {/* Hero Section */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
        className="h-[60vh] flex items-center justify-center"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="container mx-auto px-6 text-center"
        >
          <motion.h1
            variants={fadeIn("up", 0.3)}
            className="text-4xl md:text-5xl lg:text-6xl font-display text-pearl mb-6"
          >
            Book Our Services
          </motion.h1>

          <motion.div
            variants={fadeIn("up", 0.4)}
            className="w-24 h-px bg-gold mx-auto mb-8"
          ></motion.div>

          <motion.p
            variants={fadeIn("up", 0.5)}
            className="text-lg md:text-xl font-serif text-[#C0C0C0] max-w-3xl mx-auto"
          >
            Begin your journey with Ragam Elyssia by completing our booking form
          </motion.p>
        </motion.div>
      </ParallaxSection>

      {/* Booking Form Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display text-pearl mb-4 split-underline inline-block">
              Request Information
            </h2>
            <p className="text-[#C0C0C0] max-w-2xl mx-auto">
              Complete the form below and our team will contact you to discuss
              your requirements in detail.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-black border border-gold/20 rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-2xl font-display text-pearl mb-6">
                  Request Information
                </h3>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm text-[#C0C0C0]">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              className="bg-black border border-gold/30 text-pearl focus:border-gold"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm text-[#C0C0C0]">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your email"
                              className="bg-black border border-gold/30 text-pearl focus:border-gold"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm text-[#C0C0C0]">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your phone"
                              className="bg-black border border-gold/30 text-pearl focus:border-gold"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm text-[#C0C0C0]">
                            Service Interest
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-black border border-gold/30 text-pearl focus:border-gold">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-black border border-gold/30">
                              <SelectItem value="events" className="text-pearl">
                                Luxury Event Planning
                              </SelectItem>
                              <SelectItem
                                value="concierge"
                                className="text-pearl"
                              >
                                Concierge Services
                              </SelectItem>
                              <SelectItem
                                value="fashion"
                                className="text-pearl"
                              >
                                Elite Fashion Events
                              </SelectItem>
                              <SelectItem
                                value="bespoke"
                                className="text-pearl"
                              >
                                Bespoke Services
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm text-[#C0C0C0]">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your requirements"
                              className="bg-black border border-gold/30 text-pearl focus:border-gold resize-none"
                              {...field}
                              rows={4}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-gold text-black hover:bg-gold/80 px-6 py-6 uppercase tracking-widest text-sm font-medium"
                      disabled={bookingMutation.isPending}
                    >
                      {bookingMutation.isPending ? (
                        <>
                          <i className="ri-loader-4-line animate-spin mr-2"></i>{" "}
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>

              <div className="hidden md:block relative">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Luxury event setup"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
                <div className="absolute inset-0 flex items-center p-12">
                  <div>
                    <h3 className="text-2xl font-display text-pearl mb-4 text-shadow">
                      Why Choose Us
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <i className="ri-check-double-line text-gold text-xl mr-3 mt-1"></i>
                        <span className="text-[#C0C0C0] text-shadow">
                          Personalized attention to your unique needs
                        </span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-double-line text-gold text-xl mr-3 mt-1"></i>
                        <span className="text-[#C0C0C0] text-shadow">
                          Access to exclusive venues and experiences
                        </span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-double-line text-gold text-xl mr-3 mt-1"></i>
                        <span className="text-[#C0C0C0] text-shadow">
                          Meticulous attention to every detail
                        </span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-double-line text-gold text-xl mr-3 mt-1"></i>
                        <span className="text-[#C0C0C0] text-shadow">
                          Dedicated team of experienced professionals
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-[#C0C0C0]">
              Alternatively, you can contact us directly at:
            </p>
            <a
              href="tel:+919632069662"
              className="text-gold hover:text-gold/80 transition-colors font-medium"
            >
              +91 9632069662
            </a>
          </motion.div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-24 bg-gradient-to-b from-black to-[#222222]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display text-pearl mb-4 split-underline inline-block">
              Our Service Packages
            </h2>
            <p className="text-[#C0C0C0] max-w-2xl mx-auto">
              Choose from our curated packages or request a custom solution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Signature Experience",
                price: "$5,000+",
                features: [
                  "Personalized event planning",
                  "Access to select exclusive venues",
                  "Basic concierge services",
                  "Dedicated event coordinator",
                ],
                recommended: false,
              },
              {
                title: "Elite Experience",
                price: "$15,000+",
                features: [
                  "Comprehensive event management",
                  "Premium venue selection",
                  "Extended concierge services",
                  "Dedicated planning team",
                  "VIP transportation arrangements",
                ],
                recommended: true,
              },
              {
                title: "Royal Experience",
                price: "$25,000+",
                features: [
                  "End-to-end bespoke experience",
                  "Unlimited access to global venues",
                  "24/7 personal concierge",
                  "Private transport fleet",
                  "Celebrity/influencer coordination",
                  "Custom luxury amenities",
                ],
                recommended: false,
              },
            ].map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-black border ${pkg.recommended ? "border-gold" : "border-gold/20"} p-8 rounded shadow-lg relative`}
              >
                {pkg.recommended && (
                  <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-bl">
                    Recommended
                  </div>
                )}
                <h3 className="text-2xl font-display text-pearl mb-2">
                  {pkg.title}
                </h3>
                <div className="text-gold text-3xl font-display mb-6">
                  {pkg.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className="ri-check-line text-gold mr-3 mt-1"></i>
                      <span className="text-[#C0C0C0]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`${pkg.recommended ? "bg-gold text-black hover:bg-gold/80" : "bg-transparent border border-gold text-gold hover:text-gold/80"} transition-colors px-6 py-3 rounded w-full text-center inline-block uppercase tracking-wider text-sm font-medium`}
                >
                  Request Quote
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display text-pearl mb-4 split-underline inline-block">
              Booking FAQ
            </h2>
            <p className="text-[#C0C0C0] max-w-2xl mx-auto">
              Common questions about our booking process
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How far in advance should I book your services?",
                answer:
                  "For most events, we recommend booking at least 3-6 months in advance. For larger events like weddings or complex corporate events, 6-12 months is preferable. However, we understand that some situations require expedited planning, and we can accommodate last-minute requests based on availability.",
              },
              {
                question: "Is there a deposit required to secure my booking?",
                answer:
                  "Yes, we require a 50% deposit to secure your date and begin the planning process. The remaining balance is typically due two weeks before the event date, though payment schedules can be customized for larger events.",
              },
              {
                question: "Can I customize packages to suit my specific needs?",
                answer:
                  "Absolutely. Our packages are designed as starting points, but we pride ourselves on creating bespoke experiences. During your consultation, we'll discuss your vision and tailor our services accordingly.",
              },
              {
                question: "What is your cancellation policy?",
                answer:
                  "Our standard cancellation policy allows for a full refund of your deposit if cancelled more than 90 days before the event. Cancellations within 60-90 days receive a 50% refund of the deposit, and cancellations less than 60 days before the event are non-refundable. Special circumstances are considered on a case-by-case basis.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black border border-gold/20 rounded p-6"
              >
                <h3 className="text-xl font-display text-pearl mb-3">
                  {faq.question}
                </h3>
                <p className="text-[#C0C0C0]">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1616169201999-0d80789e6563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
        className="py-24"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display text-pearl mb-6">
              Let's Create Something Extraordinary
            </h2>
            <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto mb-10">
              Our team is ready to bring your vision to life with unparalleled
              attention to detail and personalized service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-gold text-black px-10 py-4 uppercase tracking-widest text-sm font-medium hover:bg-gold/80 transition duration-300 inline-block shadow-lg"
              >
                Book Now
              </a>
              <Link
                href="/contact"
                className="btn-gold bg-transparent border border-gold text-gold px-10 py-4 uppercase tracking-widest text-sm font-medium inline-block"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>
    </>
  );
};

export default BookingPage;