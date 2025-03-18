import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="py-20 bg-black" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="font-display text-3xl md:text-4xl text-[#D4AF37] mb-6">
              About Ragam Elyssia
            </motion.h2>
            <motion.p variants={itemVariants} className="text-[#F5F5F5] mb-6 leading-relaxed">
              At Ragam Elyssia, we curate extraordinary experiences for those who seek the pinnacle of luxury and exclusivity. Founded on the principle that life's most precious moments deserve exceptional attention to detail, we have established ourselves as the premier choice for elite event planning and concierge services worldwide.
            </motion.p>
            <motion.p variants={itemVariants} className="text-[#F5F5F5] mb-6 leading-relaxed">
              Our team of seasoned professionals brings unparalleled expertise in crafting bespoke experiences that reflect the unique preferences and discerning tastes of our distinguished clientele. From intimate gatherings to grand celebrations, private jet arrangements to exclusive dining reservations, we orchestrate every detail with precision and sophistication.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8">
              <Link href="/services">
                <a className="inline-block bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-6 py-3 rounded-sm transition duration-300">
                  Discover Our Philosophy
                </a>
              </Link>
            </motion.div>
          </motion.div>

          <div className="relative h-[500px] rounded-sm overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="h-full w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40"></div>
              <img 
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" 
                alt="Luxury event" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8">
                <blockquote className="text-[#F5F5F5] italic font-accent text-lg">
                  "We don't create events; we craft memories that last a lifetime."
                  <footer className="text-[#D4AF37] mt-2 text-sm font-sans">— Founder, Ragam Elyssia</footer>
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {valuesData.map((item, index) => (
            <ValueCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              delay={index * 0.1}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
  isInView: boolean;
}

const ValueCard = ({ icon, title, description, delay, isInView }: ValueCardProps) => (
  <motion.div
    className="bg-[#2A2A2A] p-8 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1"
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    transition={{ duration: 0.6, delay: delay + 0.5 }}
  >
    <div className="text-[#D4AF37] text-3xl mb-4">
      {icon === "gem" && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 3.5L1.5 8L12 18.5L22.5 8L18 3.5H6ZM12 16.33L4.67 9H19.33L12 16.33Z" />
        </svg>
      )}
      {icon === "crown" && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.55 18.55 20 18 20H6C5.45 20 5 19.55 5 19V18H19V19Z" />
        </svg>
      )}
      {icon === "lock" && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z" />
        </svg>
      )}
    </div>
    <h3 className="font-display text-xl text-[#D4AF37] mb-3">{title}</h3>
    <p className="text-[#F5F5F5]">{description}</p>
  </motion.div>
);

const valuesData = [
  {
    icon: "gem",
    title: "Uncompromising Excellence",
    description: "We pursue perfection in every detail, ensuring each experience exceeds expectations."
  },
  {
    icon: "crown",
    title: "Bespoke Creation",
    description: "Each service is meticulously tailored to reflect your unique vision and desires."
  },
  {
    icon: "lock",
    title: "Absolute Discretion",
    description: "Privacy and confidentiality form the foundation of our trustworthy relationships."
  }
];

export default About;
