import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ParallaxSection } from '@/components/ui/parallax';
import { fadeIn, staggerContainer } from '@/lib/animations';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <ParallaxSection 
        bgImage="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80"
        className="h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="container mx-auto px-6 z-10 text-center"
        >
          <motion.h1 
            variants={fadeIn('up', 0.3)}
            className="text-4xl md:text-6xl lg:text-7xl font-display text-pearl mb-6"
          >
            <span className="block">Extraordinary Events.</span>
            <span className="block">Unparalleled Service.</span>
          </motion.h1>
          
          <motion.div 
            variants={fadeIn('up', 0.4)}
            className="w-24 h-px bg-gold mx-auto mb-8"
          ></motion.div>
          
          <motion.p 
            variants={fadeIn('up', 0.5)}
            className="text-lg md:text-xl font-serif text-[#C0C0C0] max-w-3xl mx-auto mb-12"
          >
            Elite event planning and concierge services for those who demand nothing but exceptional experiences.
          </motion.p>
          
          <motion.div 
            variants={fadeIn('up', 0.6)}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link href="/services" className="btn-gold bg-transparent border border-gold text-gold px-8 py-3 uppercase tracking-widest text-sm font-medium inline-block">
              Explore Services
            </Link>
            <Link href="/contact" className="bg-gold text-black px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-gold/80 transition duration-300 inline-block">
              Request Consultation
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <Link href="/about" className="text-pearl opacity-70 hover:opacity-100 transition-opacity">
            <i className="ri-arrow-down-line text-3xl"></i>
          </Link>
        </motion.div>
      </ParallaxSection>

      {/* Featured Services Preview */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display text-pearl mb-4 split-underline inline-block">Our Premium Services</h2>
            <p className="text-[#C0C0C0] max-w-2xl mx-auto">Discover our range of elite services designed to exceed all expectations.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Luxury Event Planning",
                image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                description: "Bespoke event design for weddings, galas, and milestone celebrations."
              },
              {
                title: "Concierge Services",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                description: "Personalized assistance providing access to exclusive experiences."
              },
              {
                title: "Elite Fashion Events",
                image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                description: "Sophisticated fashion events that spotlight brands and create memorable experiences."
              },
              {
                title: "Bespoke Services",
                image: "https://iili.io/3n6zncX.jpg",
                description: "Tailored solutions for unique requests beyond our standard offerings."
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-black border border-gold/20 p-6 rounded shadow-lg hover:border-gold/50 transition-all duration-500"
              >
                <div className="h-48 mb-4 overflow-hidden rounded">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-display text-pearl mb-2">{service.title}</h3>
                <p className="text-[#C0C0C0] text-sm mb-4">{service.description}</p>
                <Link href="/services" className="text-gold text-sm hover:text-gold/80 transition-colors flex items-center">
                  Learn More <i className="ri-arrow-right-line ml-1"></i>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/services" className="btn-gold bg-transparent border border-gold text-gold px-8 py-3 uppercase tracking-widest text-sm font-medium inline-block">
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-black to-[#222222]">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display text-pearl mb-4 split-underline inline-block">Client Testimonials</h2>
            <p className="text-[#C0C0C0] max-w-2xl mx-auto">Hear from our distinguished clients about their experiences with Ragam Elyssia.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Ragam Elyssia transformed our wedding into an unforgettable experience. Every detail was executed flawlessly.",
                author: "Emily & Michael Thompson",
                event: "Elite Wedding"
              },
              {
                quote: "Their concierge service made our anniversary trip absolutely seamless. The attention to detail was beyond our expectations.",
                author: "Jonathan Pierce",
                event: "Luxury Travel Experience"
              },
              {
                quote: "The fashion event they organized for our brand launch was nothing short of spectacular. The elite connections they brought were invaluable.",
                author: "Victoria Reynolds",
                event: "Brand Launch Event"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black border border-gold/20 p-8 rounded shadow-lg"
              >
                <i className="ri-double-quotes-l text-gold text-4xl mb-4 block"></i>
                <p className="text-[#C0C0C0] mb-6 font-serif text-lg italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mr-4">
                    <i className="ri-user-line text-gold"></i>
                  </div>
                  <div>
                    <h4 className="text-pearl font-medium">{testimonial.author}</h4>
                    <p className="text-[#C0C0C0] text-sm">{testimonial.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
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
            <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto mb-10">Let us create an unforgettable experience tailored specifically to your desires.</p>
            <Link href="/booking" className="bg-gold text-black px-10 py-4 uppercase tracking-widest text-sm font-medium hover:bg-gold/80 transition duration-300 inline-block shadow-lg">
              Book Your Consultation
            </Link>
          </motion.div>
        </div>
      </ParallaxSection>
    </>
  );
};

export default HomePage;
