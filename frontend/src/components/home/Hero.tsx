import { Link } from "wouter";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2348&q=80')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h1 
          className="font-display text-4xl md:text-6xl lg:text-7xl text-[#F5F5F5] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E7A3] to-[#D4AF37] bg-clip-text text-transparent">
            Extraordinary
          </span> Experiences
        </motion.h1>
        <motion.p 
          className="font-accent text-xl md:text-2xl text-[#FFFFFF] opacity-90 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Elite Event Planning & Luxury Concierge Services for the Discerning
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/services">
            <a className="relative overflow-hidden transition-all duration-300 bg-[#D4AF37] hover:bg-[#B38728] text-black px-8 py-3 rounded-sm w-full sm:w-auto inline-block">
              <span className="relative z-10">Explore Services</span>
              <span className="absolute inset-0 bg-white bg-opacity-30 transform -translate-x-full transition-transform duration-300 hover:translate-x-0"></span>
            </a>
          </Link>
          <Link href="/contact">
            <a className="relative overflow-hidden transition-all duration-300 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:bg-opacity-10 px-8 py-3 rounded-sm w-full sm:w-auto inline-block">
              <span className="relative z-10">Request Consultation</span>
              <span className="absolute inset-0 bg-white bg-opacity-10 transform -translate-x-full transition-transform duration-300 hover:translate-x-0"></span>
            </a>
          </Link>
        </motion.div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <a href="#about" className="inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
