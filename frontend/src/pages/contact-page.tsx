import { motion } from 'framer-motion';
import { ParallaxSection } from '@/components/ui/parallax';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll respond to your inquiry soon.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Could not send your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ContactFormValues) {
    contactMutation.mutate(data);
  }

  return (
    <>
      {/* Hero Section */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1582213782179-e0d4aeceebc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
        className="h-[60vh] flex items-center justify-center"
      >
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="container mx-auto px-6 text-center"
        >
          <motion.h1 
            variants={fadeIn('up', 0.3)}
            className="text-4xl md:text-5xl lg:text-6xl font-display text-pearl mb-6"
          >
            Contact Us
          </motion.h1>
          
          <motion.div 
            variants={fadeIn('up', 0.4)}
            className="w-24 h-px bg-gold mx-auto mb-8"
          ></motion.div>
          
          <motion.p 
            variants={fadeIn('up', 0.5)}
            className="text-lg md:text-xl font-serif text-[#C0C0C0] max-w-3xl mx-auto"
          >
            For inquiries and consultations, our team is at your service
          </motion.p>
        </motion.div>
      </ParallaxSection>

      {/* Contact Information and Form Section */}
      <section className="py-24 bg-gradient-to-b from-black to-[#222222] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-black border border-gold/20 rounded-lg shadow-lg p-8 h-full">
                <h3 className="text-2xl font-display text-pearl mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mr-4 shrink-0">
                      <i className="ri-map-pin-line text-gold"></i>
                    </div>
                    <div>
                      <h4 className="text-pearl text-lg mb-1">Our Address</h4>
                      <p className="text-[#C0C0C0]">Bangalore, Karnataka<br/>India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mr-4 shrink-0">
                      <i className="ri-phone-line text-gold"></i>
                    </div>
                    <div>
                      <h4 className="text-pearl text-lg mb-1">Phone</h4>
                      <p className="text-[#C0C0C0]">+91 9632069662</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mr-4 shrink-0">
                      <i className="ri-mail-line text-gold"></i>
                    </div>
                    <div>
                      <h4 className="text-pearl text-lg mb-1">Email</h4>
                      <p className="text-[#C0C0C0]">inquiries@ragamelyssia.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mr-4 shrink-0">
                      <i className="ri-time-line text-gold"></i>
                    </div>
                    <div>
                      <h4 className="text-pearl text-lg mb-1">Hours</h4>
                      <p className="text-[#C0C0C0]">Monday - Friday: 9AM - 7PM<br/>Weekends: By appointment</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="text-pearl text-lg mb-3">Follow Us</h4>
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition duration-300">
                        <i className="ri-instagram-line"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition duration-300">
                        <i className="ri-facebook-line"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition duration-300">
                        <i className="ri-twitter-x-line"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition duration-300">
                        <i className="ri-linkedin-line"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-black border border-gold/20 rounded-lg shadow-lg p-8 h-full">
                  <h3 className="text-xl font-display text-pearl mb-4">Send a Message</h3>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input 
                                placeholder="Your Name" 
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
                          <FormItem>
                            <FormControl>
                              <Input 
                                placeholder="Your Email" 
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
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input 
                                placeholder="Subject" 
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
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea 
                                placeholder="Your Message" 
                                className="bg-black border border-gold/30 text-pearl focus:border-gold resize-none" 
                                rows={5}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="bg-gold text-black hover:bg-gold/80 px-6 py-2 uppercase tracking-widest text-sm font-medium w-full"
                        disabled={contactMutation.isPending}
                      >
                        {contactMutation.isPending ? (
                          <><i className="ri-loader-4-line animate-spin mr-2"></i> Sending...</>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
                
                <div className="bg-black border border-gold/20 rounded-lg shadow-lg overflow-hidden h-full">
                  <div className="h-64 md:h-full w-full bg-[#222222]">
                    {/* Google Map would be embedded here */}
                    <div className="h-full w-full flex items-center justify-center bg-black">
                      <div className="text-center p-6">
                        <i className="ri-map-2-line text-gold text-4xl mb-2"></i>
                        <p className="text-[#C0C0C0]">Google Maps Integration</p>
                        <p className="text-xs text-[#C0C0C0]/70 mt-2">Bangalore, Karnataka, India</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display text-pearl mb-4 split-underline inline-block">Schedule a Consultation</h2>
            <p className="text-[#C0C0C0] max-w-2xl mx-auto">Discuss your vision with our team of luxury event specialists</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-black border border-gold/20 p-8 rounded-lg shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-display text-pearl mb-4">Private Consultations</h3>
                <p className="text-[#C0C0C0] mb-6">Our consultations provide an opportunity for you to share your vision while our specialists offer tailored recommendations based on your preferences and requirements.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <i className="ri-check-line text-gold mr-3 mt-1"></i>
                    <span className="text-[#C0C0C0]">One-on-one meetings with luxury specialists</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-gold mr-3 mt-1"></i>
                    <span className="text-[#C0C0C0]">Available in-person or virtually</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-gold mr-3 mt-1"></i>
                    <span className="text-[#C0C0C0]">Complimentary for qualified inquiries</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-gold mr-3 mt-1"></i>
                    <span className="text-[#C0C0C0]">Customized proposals following consultation</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-black border border-gold/10 p-6 rounded">
                <h4 className="text-xl font-display text-pearl mb-4 text-center">Preferred Appointment</h4>
                <p className="text-[#C0C0C0] text-sm mb-6 text-center">Select your preferred date and time for a consultation, and our team will confirm your appointment.</p>
                
                <div className="space-y-4">
                  <Button className="bg-gold text-black hover:bg-gold/80 w-full py-6">
                    <i className="ri-calendar-line mr-2"></i> Schedule Appointment
                  </Button>
                  
                  <div className="text-center">
                    <span className="text-[#C0C0C0] text-sm">Or call us directly at</span>
                    <a href="tel:+919632069662" className="block text-gold hover:text-gold/80 transition-colors mt-1">+91 9632069662</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-24 bg-gradient-to-b from-black to-[#222222]">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display text-pearl mb-4 split-underline inline-block">Our Global Presence</h2>
            <p className="text-[#C0C0C0] max-w-2xl mx-auto">Servicing elite clientele around the world</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                city: "Bangalore",
                address: "Headquarters, Bangalore, Karnataka, India",
                phone: "+91 9632069662",
                email: "info@ragamelyssia.com"
              },
              {
                city: "London",
                address: "45 Mayfair Street, Knightsbridge, London, SW1X 8QP, UK",
                phone: "+44 20 1234 5678",
                email: "london@ragamelyssia.com"
              },
              {
                city: "Dubai",
                address: "The Palm Jumeirah, East Crescent, Dubai, UAE",
                phone: "+971 4 123 4567",
                email: "dubai@ragamelyssia.com"
              }
            ].map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black border border-gold/20 p-6 rounded shadow-lg"
              >
                <h3 className="text-xl font-display text-pearl mb-4">{location.city}</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="ri-map-pin-line text-gold mr-3 mt-1"></i>
                    <span className="text-[#C0C0C0]">{location.address}</span>
                  </div>
                  <div className="flex items-start">
                    <i className="ri-phone-line text-gold mr-3 mt-1"></i>
                    <span className="text-[#C0C0C0]">{location.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <i className="ri-mail-line text-gold mr-3 mt-1"></i>
                    <span className="text-[#C0C0C0]">{location.email}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1551361415-69a0447d848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
        className="py-24"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display text-pearl mb-6">Begin Your Extraordinary Journey</h2>
            <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto mb-10">Contact us today to discover how we can transform your vision into an unforgettable experience.</p>
            <Button className="bg-gold text-black hover:bg-gold/80 px-10 py-7 uppercase tracking-widest text-sm font-medium shadow-lg">
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </ParallaxSection>
    </>
  );
};

export default ContactPage;
