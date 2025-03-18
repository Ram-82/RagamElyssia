import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ParallaxSection } from '@/components/ui/parallax';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set the worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const BrochurePage = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      return Math.max(1, Math.min(numPages || 1, newPageNumber));
    });
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  // Mock PDF URL - in a real implementation, this would be a real PDF file
  const pdfUrl = "/brochure.pdf";

  return (
    <>
      {/* Hero Section */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
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
            Our Brochure
          </motion.h1>
          
          <motion.div 
            variants={fadeIn('up', 0.4)}
            className="w-24 h-px bg-gold mx-auto mb-8"
          ></motion.div>
          
          <motion.p 
            variants={fadeIn('up', 0.5)}
            className="text-lg md:text-xl font-serif text-[#C0C0C0] max-w-3xl mx-auto"
          >
            Explore our detailed brochure to discover the full range of exclusive services we offer
          </motion.p>
        </motion.div>
      </ParallaxSection>

      {/* Brochure Interactive Section */}
      <section className="py-24 bg-gradient-to-b from-black to-[#222222] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="flip-card w-full max-w-md mx-auto aspect-[3/4] rounded shadow-xl">
                <div className="flip-card-inner w-full h-full">
                  <div className="flip-card-front w-full h-full rounded overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                      alt="Ragam Elyssia Brochure Cover" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-8">
                      <h3 className="text-2xl font-display text-pearl mb-2">Ragam Elyssia</h3>
                      <p className="text-sm text-[#C0C0C0]">Elite Event Planning & Concierge Services</p>
                    </div>
                  </div>
                  <div className="flip-card-back w-full h-full bg-black border border-gold/30 rounded p-8 flex flex-col justify-center">
                    <h3 className="text-xl font-display text-gold mb-4">Inside Our Brochure</h3>
                    <ul className="text-[#C0C0C0] space-y-2 mb-6">
                      <li className="flex items-start">
                        <i className="ri-check-line text-gold mr-2 mt-1"></i>
                        <span>Detailed service descriptions</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-gold mr-2 mt-1"></i>
                        <span>Premium event packages</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-gold mr-2 mt-1"></i>
                        <span>Case studies of past events</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-gold mr-2 mt-1"></i>
                        <span>Client testimonials</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-gold mr-2 mt-1"></i>
                        <span>Exclusive partnership offerings</span>
                      </li>
                    </ul>
                    <p className="text-xs text-[#C0C0C0] mb-6">Hover to flip back, or download the full brochure below.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h3 className="text-2xl font-display text-pearl mb-4">Explore Our Complete Portfolio</h3>
              <p className="text-[#C0C0C0] mb-6">Our brochure showcases the breadth of our capabilities and the attention to detail that defines every Ragam Elyssia experience. From intimate gatherings to grand celebrations, discover how we can transform your vision into reality.</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mr-4">
                    <i className="ri-file-pdf-line text-gold text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-pearl">Digital Brochure</h4>
                    <p className="text-xs text-[#C0C0C0]">PDF format, 8.2MB</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mr-4">
                    <i className="ri-mail-line text-gold text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-pearl">Request Physical Copy</h4>
                    <p className="text-xs text-[#C0C0C0]">Delivered to your address</p>
                  </div>
                </div>
              </div>
              <a 
                href="#"
                onClick={(e) => e.preventDefault()}
                className="btn-gold bg-transparent border border-gold text-gold px-6 py-3 uppercase tracking-widest text-sm font-medium inline-flex items-center"
              >
                <i className="ri-download-line mr-2"></i> Download Brochure
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive PDF Viewer */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display text-pearl mb-4 split-underline inline-block">Interactive Brochure</h2>
            <p className="text-[#C0C0C0] max-w-2xl mx-auto">Browse through our digital brochure to learn more about our exclusive offerings.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-black border border-gold/20 rounded-lg shadow-xl p-8"
          >
            <div className="flex justify-center mb-8">
              {/* Replace this with actual Document viewer when you have a real PDF */}
              <div className="w-full aspect-[3/4] bg-black-light border border-gold/10 rounded flex items-center justify-center">
                <div className="text-center">
                  <i className="ri-file-pdf-line text-gold text-6xl mb-4"></i>
                  <p className="text-pearl">Interactive Brochure Preview</p>
                  <p className="text-sm text-[#C0C0C0] mt-2">Would display actual PDF pages in production</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <button 
                onClick={previousPage} 
                disabled={pageNumber <= 1}
                className="bg-black-light border border-gold/30 text-gold px-4 py-2 rounded flex items-center disabled:opacity-50"
              >
                <i className="ri-arrow-left-line mr-2"></i> Previous
              </button>
              
              <p className="text-[#C0C0C0]">
                Page {pageNumber} of {numPages || '-'}
              </p>
              
              <button 
                onClick={nextPage} 
                disabled={pageNumber >= (numPages || 1)}
                className="bg-black-light border border-gold/30 text-gold px-4 py-2 rounded flex items-center disabled:opacity-50"
              >
                Next <i className="ri-arrow-right-line ml-2"></i>
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a 
              href="#"
              onClick={(e) => e.preventDefault()}
              className="btn-gold bg-transparent border border-gold text-gold px-6 py-3 uppercase tracking-widest text-sm font-medium inline-flex items-center"
            >
              <i className="ri-download-line mr-2"></i> Download Full Brochure
            </a>
          </motion.div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-24 bg-gradient-to-b from-black to-[#222222]">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display text-pearl mb-4 split-underline inline-block">Brochure Highlights</h2>
            <p className="text-[#C0C0C0] max-w-2xl mx-auto">A glimpse into what our complete brochure offers</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "ri-vip-crown-line",
                title: "Exclusive Access",
                description: "Learn about our network of exclusive venues and experiences available only to our clients."
              },
              {
                icon: "ri-customer-service-line",
                title: "Personalized Service",
                description: "Discover our tailored approach to meeting your unique needs and exceeding expectations."
              },
              {
                icon: "ri-money-dollar-circle-line",
                title: "Transparent Pricing",
                description: "Review our pricing structures and packages designed for different service levels."
              }
            ].map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black border border-gold/20 p-8 rounded shadow-lg"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                  <i className={`${highlight.icon} text-gold text-2xl`}></i>
                </div>
                <h3 className="text-xl font-display text-pearl mb-4">{highlight.title}</h3>
                <p className="text-[#C0C0C0] mb-6">{highlight.description}</p>
                <Link href="/services">
                  <a className="text-gold hover:text-gold/80 transition-colors flex items-center text-sm">
                    Learn More <i className="ri-arrow-right-line ml-1"></i>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1516685018646-549198525c1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
        className="py-24"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display text-pearl mb-6">Ready to Experience Luxury?</h2>
            <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto mb-10">Contact us today to discuss how we can create an unforgettable experience tailored to your desires.</p>
            <Link href="/contact">
              <a className="bg-gold text-black px-10 py-4 uppercase tracking-widest text-sm font-medium hover:bg-gold/80 transition duration-300 inline-block shadow-lg">
                Contact Us
              </a>
            </Link>
          </motion.div>
        </div>
      </ParallaxSection>
    </>
  );
};

export default BrochurePage;
