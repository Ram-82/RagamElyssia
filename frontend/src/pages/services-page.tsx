import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ParallaxSection } from '@/components/ui/parallax';
import { fadeIn, staggerContainer } from '@/lib/animations';

const ServicesPage = () => {
  const services = [
    {
      id: 'luxury-events',
      title: 'Luxury Event Planning',
      description: 'Bespoke event design and execution for weddings, galas, corporate events, and milestone celebrations.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      features: [
        'Elite Weddings',
        'VIP Parties',
        'Corporate Events',
        'Destination Events'
      ],
      detailedDescription: 'Our luxury event planning service leaves no detail to chance. From concept to execution, we handle every aspect with meticulous care. We work with world-class vendors, exclusive venues, and innovative designers to create unforgettable experiences tailored to your vision.'
    },
    {
      id: 'concierge',
      title: 'Concierge Services',
      description: 'Personalized assistance for our elite clients, providing access to exclusive experiences and services.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      features: [
        'Private Jet & Yacht Charters',
        'Luxury Travel Arrangements',
        'Fine Dining Reservations',
        'Private Shopping Experiences'
      ],
      detailedDescription: 'Our concierge service offers you privileged access to the most exclusive experiences worldwide. Whether you desire a last-minute reservation at a Michelin-starred restaurant, a private yacht for your Mediterranean journey, or VIP access to sold-out events, we make the impossible possible.'
    },
    {
      id: 'fashion-events',
      title: 'Elite Fashion Events',
      description: 'Sophisticated fashion events that spotlight brands and create memorable experiences for all attendees.',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      features: [
        'High-End Fashion Shows',
        'Influencer Collaborations',
        'Celebrity Partnerships',
        'Brand Launch Events'
      ],
      detailedDescription: 'Our elite fashion events set the stage for unforgettable brand experiences. We connect prestigious brands with the right audience, creating immersive events that generate buzz and deliver measurable results. From runway shows to exclusive product launches, we craft fashion events that leave a lasting impression.'
    },
    {
      id: 'bespoke',
      title: 'Bespoke Services',
      description: 'Tailored solutions for unique requests beyond our standard offerings. If you can imagine it, we can create it.',
      image: 'https://iili.io/3n6zncX.jpg',
      features: [
        'Custom Experiences',
        'Personalized Celebrations',
        'Unique Gift Procurement',
        'Special Occasion Planning'
      ],
      detailedDescription: 'Our bespoke services are designed for those seeking truly unique experiences beyond conventional offerings. If you can dream it, we can create it. From arranging a private dinner on an iceberg to securing a rare collectible, our team specializes in turning extraordinary visions into reality.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
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
            Exceptional Services
          </motion.h1>
          
          <motion.div 
            variants={fadeIn('up', 0.4)}
            className="w-24 h-px bg-gold mx-auto mb-8"
          ></motion.div>
          
          <motion.p 
            variants={fadeIn('up', 0.5)}
            className="text-lg md:text-xl font-serif text-[#C0C0C0] max-w-3xl mx-auto"
          >
            From glamorous events to personalized concierge experiences, we offer a comprehensive suite of services designed to exceed expectations.
          </motion.p>
        </motion.div>
      </ParallaxSection>

      {/* Services Overview */}
      <section id="services-overview" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display text-pearl mb-4 split-underline inline-block">Our Services</h2>
            <p className="text-[#C0C0C0] max-w-2xl mx-auto">Discover our range of elite services designed with precision and delivered with passion.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
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
                <ul className="text-xs text-[#C0C0C0] mb-4 space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <i className="ri-check-line text-gold mr-2"></i> {feature}
                    </li>
                  ))}
                </ul>
                <a 
                  href={`#${service.id}`}
                  className="text-gold text-sm hover:text-gold/80 transition-colors flex items-center"
                >
                  Learn More <i className="ri-arrow-right-line ml-1"></i>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {services.map((service, index) => (
        <section 
          key={service.id}
          id={service.id}
          className={`py-24 ${index % 2 === 0 ? 'bg-gradient-to-b from-black to-[#222222]' : 'bg-[#222222]'}`}
        >
          <div className="container mx-auto px-6">
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full rounded-lg shadow-xl"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <h2 className="text-3xl md:text-4xl font-display text-pearl mb-6">{service.title}</h2>
                <p className="text-[#C0C0C0] mb-6">{service.detailedDescription}</p>
                <div className="mb-8">
                  <h3 className="text-xl font-display text-pearl mb-4">What We Offer</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center bg-black/50 p-3 rounded">
                        <i className="ri-check-line text-gold mr-2"></i>
                        <span className="text-[#C0C0C0]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/booking">
                  <a className="btn-gold bg-transparent border border-gold text-gold px-6 py-3 uppercase tracking-widest text-sm font-medium inline-block">
                    Request This Service
                  </a>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
        className="py-24"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display text-pearl mb-6">Elevate Your Experience</h2>
            <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto mb-10">Ready to transform your vision into an extraordinary reality? Our team is prepared to exceed your expectations.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/brochure">
                <a className="btn-gold bg-transparent border border-gold text-gold px-8 py-3 uppercase tracking-widest text-sm font-medium inline-block">
                  View Brochure
                </a>
              </Link>
              <Link href="/booking">
                <a className="bg-gold text-black px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-gold/80 transition duration-300 inline-block">
                  Book a Service
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>
    </>
  );
};

export default ServicesPage;
