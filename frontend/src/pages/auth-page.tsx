import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { useAuth } from '@/hooks/use-auth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

const loginSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  remember: z.boolean().optional(),
});

const registerSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [, navigate] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onLoginSubmit(data: LoginFormValues) {
    loginMutation.mutate({
      username: data.username,
      password: data.password,
    });
  }

  function onRegisterSubmit(data: RegisterFormValues) {
    registerMutation.mutate({
      username: data.username,
      password: data.password,
    });
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-6xl rounded-lg shadow-xl overflow-hidden">
          {/* Left side - Form */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="w-full md:w-1/2 bg-black border-r border-gold/20 p-8 md:p-12"
          >
            <motion.div 
              variants={fadeIn('up', 0.3)}
              className="mb-8 text-center"
            >
              <h2 className="text-3xl font-display text-pearl mb-2">Client Access</h2>
              <p className="text-[#C0C0C0]">Access your exclusive services and experience luxury</p>
            </motion.div>

            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-black-light border border-gold/20 rounded mb-8">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-gold data-[state=active]:text-black data-[state=active]:shadow"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="data-[state=active]:bg-gold data-[state=active]:text-black data-[state=active]:shadow"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              <motion.div
                variants={fadeIn('up', 0.4)}
                className="mt-6"
              >
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm text-[#C0C0C0]">Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your username" 
                                className="bg-black border border-gold/30 text-pearl focus:border-gold" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm text-[#C0C0C0]">Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password"
                                placeholder="Your password" 
                                className="bg-black border border-gold/30 text-pearl focus:border-gold" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-between">
                        <FormField
                          control={loginForm.control}
                          name="remember"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                                />
                              </FormControl>
                              <FormLabel className="text-sm text-[#C0C0C0]">Remember me</FormLabel>
                            </FormItem>
                          )}
                        />
                        <a href="#" className="text-sm text-gold hover:text-gold/80">Forgot password?</a>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gold text-black hover:bg-gold/80 px-6 py-6 uppercase tracking-widest text-sm font-medium"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <><i className="ri-loader-4-line animate-spin mr-2"></i> Signing In...</>
                        ) : (
                          "Sign In"
                        )}
                      </Button>

                      <div className="relative flex items-center justify-center my-6">
                        <div className="border-t border-gold/20 absolute w-full"></div>
                        <span className="bg-black px-4 text-[#C0C0C0] text-sm relative">Or continue with</span>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="flex items-center justify-center border border-gold/30 rounded hover:bg-gold/10 transition duration-300">
                          <i className="ri-google-fill text-[#C0C0C0] text-xl"></i>
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center border border-gold/30 rounded hover:bg-gold/10 transition duration-300">
                          <i className="ri-apple-fill text-[#C0C0C0] text-xl"></i>
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center border border-gold/30 rounded hover:bg-gold/10 transition duration-300">
                          <i className="ri-linkedin-fill text-[#C0C0C0] text-xl"></i>
                        </Button>
                      </div>

                      <div className="text-center text-sm text-[#C0C0C0] mt-6">
                        Don't have an account?{" "}
                        <button 
                          type="button"
                          onClick={() => setActiveTab("register")} 
                          className="text-gold hover:text-gold/80"
                        >
                          Register now
                        </button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm text-[#C0C0C0]">Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Create a username" 
                                className="bg-black border border-gold/30 text-pearl focus:border-gold" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm text-[#C0C0C0]">Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password"
                                placeholder="Create a password" 
                                className="bg-black border border-gold/30 text-pearl focus:border-gold" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm text-[#C0C0C0]">Confirm Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password"
                                placeholder="Confirm your password" 
                                className="bg-black border border-gold/30 text-pearl focus:border-gold" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-gold text-black hover:bg-gold/80 px-6 py-6 uppercase tracking-widest text-sm font-medium"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <><i className="ri-loader-4-line animate-spin mr-2"></i> Creating Account...</>
                        ) : (
                          "Create Account"
                        )}
                      </Button>

                      <div className="text-center text-sm text-[#C0C0C0] mt-6">
                        Already have an account?{" "}
                        <button 
                          type="button"
                          onClick={() => setActiveTab("login")} 
                          className="text-gold hover:text-gold/80"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
              </motion.div>
            </Tabs>
          </motion.div>

          {/* Right side - Hero */}
          <div className="hidden md:block md:w-1/2 relative">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Luxury Event" 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
            </div>
            <div className="relative h-full flex items-center p-12">
              <div>
                <h3 className="text-3xl font-display text-pearl mb-6">Experience Luxury</h3>
                <p className="text-[#C0C0C0] mb-8">
                  Join Ragam Elyssia's exclusive client network for personalized service, privileged access to elite events, and bespoke luxury experiences tailored just for you.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <i className="ri-check-double-line text-gold text-xl mr-3 mt-1"></i>
                    <span className="text-[#C0C0C0]">Access to members-only events</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-double-line text-gold text-xl mr-3 mt-1"></i>
                    <span className="text-[#C0C0C0]">Exclusive offers and priority booking</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-double-line text-gold text-xl mr-3 mt-1"></i>
                    <span className="text-[#C0C0C0]">Personal concierge services</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-double-line text-gold text-xl mr-3 mt-1"></i>
                    <span className="text-[#C0C0C0]">Customized recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
