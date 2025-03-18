import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="services" className="py-20 bg-[#F5F5F5]" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
        >
          <h2 className="font-display text-3xl md:text-4xl text-black mb-4">Exceptional Services</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-[#2A2A2A]">
            Experience the height of luxury through our comprehensive range of elite services, each customized to exceed your expectations and create moments of unparalleled magnificence.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              image={service.image}
              link={service.link}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/contact">
            <a className="inline-block bg-[#D4AF37] hover:bg-[#B38728] text-black px-8 py-3 rounded-sm transition duration-300 relative overflow-hidden">
              <span className="relative z-10">Request a Consultation</span>
              <span className="absolute inset-0 bg-white bg-opacity-30 transform -translate-x-full hover:translate-x-0 transition-transform duration-500"></span>
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  index: number;
  isInView: boolean;
}

const ServiceCard = ({ title, description, image, link, index, isInView }: ServiceCardProps) => (
  <motion.div 
    className="bg-white rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300 hover:-translate-y-1"
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
  >
    <div className="h-56 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
      />
    </div>
    <div className="p-6">
      <h3 className="font-display text-xl text-black mb-3">{title}</h3>
      <p className="text-[#2A2A2A] text-sm mb-4">{description}</p>
      <Link href={link}>
        <a className="inline-block font-medium text-[#D4AF37] hover:text-[#B38728] transition duration-300">
          Discover More 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </Link>
    </div>
  </motion.div>
);

const services = [
  {
    title: "Luxury Event Planning",
    description: "Elite weddings, VIP parties, corporate events, and destination celebrations crafted with unparalleled attention to detail.",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    link: "/services#luxury-events"
  },
  {
    title: "Concierge Services",
    description: "Private jet and yacht charters, luxury travel arrangements, fine dining reservations, and exclusive shopping experiences.",
    image: "https://images.unsplash.com/photo-1541185934-01b600ea069c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80",
    link: "/services#concierge"
  },
  {
    title: "Elite Brand & Fashion Events",
    description: "High-end fashion shows, influential brand launches, and exclusive celebrity collaborations conceived and executed with finesse.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2373&q=80",
    link: "/services#fashion-events"
  },
  {
    title: "Bespoke Services",
    description: "Entirely customized experiences tailored to your unique desires, no matter how exclusive or extraordinary your request may be.",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80",
    link: "/services#bespoke"
  }
];

export default Services;
