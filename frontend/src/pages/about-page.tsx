import { motion } from "framer-motion";
import { Link } from "wouter";
import { Parallax, ParallaxSection } from "@/components/ui/parallax";
import { fadeIn, staggerContainer } from "@/lib/animations";

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1620735692151-26a7e0748429?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
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
            About Ragam Elyssia
          </motion.h1>

          <motion.div
            variants={fadeIn("up", 0.4)}
            className="w-24 h-px bg-gold mx-auto mb-8"
          ></motion.div>

          <motion.p
            variants={fadeIn("up", 0.5)}
            className="text-lg md:text-xl font-serif text-[#C0C0C0] max-w-3xl mx-auto"
          >
            Where luxury meets impeccable execution
          </motion.p>
        </motion.div>
      </ParallaxSection>

      {/* Legacy Section */}
      <section className="py-24 bg-gradient-to-b from-black to-[#222222] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2 mb-12 lg:mb-0"
            >
              <h2 className="text-3xl md:text-4xl font-display text-pearl mb-6 split-underline">
                Our Legacy of Luxury
              </h2>
              <p className="text-[#C0C0C0] mb-6">
                Ragam Elyssia is born from the passion to transform ordinary
                moments into extraordinary memories. We are the architects of
                exceptional experiences, crafting bespoke events and providing
                concierge services that surpass expectations.
              </p>
              <p className="text-[#C0C0C0] mb-6">
                Our team combines creativity, precision, and an uncompromising
                commitment to excellence, ensuring that every detail is
                meticulously curated to perfection.
              </p>
              <p className="text-gold font-serif text-xl mb-8">
                "We don't just plan events; we craft memories that last a
                lifetime."
              </p>
              <div>
                <Link
                  href="/services"
                  className="border-b border-gold text-gold hover:text-gold/80 transition-colors flex items-center gap-2 w-fit"
                >
                  Discover our services <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2 lg:pl-16 grid grid-cols-2 gap-4"
            >
              <Parallax speed={0.2}>
                <img
                  src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Elegant event with luxury decor"
                  className="w-full h-64 object-cover rounded shadow-lg transform hover:scale-105 transition duration-500"
                />
              </Parallax>
              <Parallax speed={0.4}>
                <img
                  src="https://images.unsplash.com/photo-1563784462041-5f97ac9523dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Private yacht charter experience"
                  className="w-full h-64 object-cover rounded shadow-lg transform hover:scale-105 transition duration-500 mt-8"
                />
              </Parallax>
              <Parallax speed={0.3}>
                <img
                  src="https://images.unsplash.com/photo-1522413452208-996ff3f3e740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Luxury dining experience"
                  className="w-full h-64 object-cover rounded shadow-lg transform hover:scale-105 transition duration-500 mt-8"
                />
              </Parallax>
              <Parallax speed={0.5}>
                <img
                  src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Exclusive fashion event"
                  className="w-full h-64 object-cover rounded shadow-lg transform hover:scale-105 transition duration-500"
                />
              </Parallax>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/3"
            >
              <div className="relative">
                <img
                  src="https://iili.io/3qGat7n.jpg"
                  alt="Ramachandragowda S Patil - Founder of Ragam Elyssia"
                  className="w-full rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-gold rounded-lg flex items-center justify-center">
                  <span className="font-display text-black text-2xl">RE</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-2/3"
            >
              <h2 className="text-3xl md:text-4xl font-display text-pearl mb-6">
                Founder's Vision
              </h2>
              <p className="text-[#C0C0C0] mb-6 font-serif text-lg">
                "Ragam Elyssia was born from my desire to redefine luxury
                experiences. With over 15 years in the luxury event industry,
                I've witnessed the transformative power of meticulously crafted
                experiences that elevate beyond the ordinary."
              </p>
              <p className="text-[#C0C0C0] mb-6">
                Our philosophy centers on personalization, discretion, and
                unparalleled attention to detail. We believe that true luxury
                lies not just in opulence, but in understanding our clients
                deeply and curating experiences that resonate with their unique
                sensibilities.
              </p>
              <p className="text-[#C0C0C0] mb-8">
                Every member of our team shares this vision and brings
                specialized expertise across various domains of luxury service.
                Together, we create moments that transcend expectations and
                leave lasting impressions.
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    src="https://iili.io/3qGat7n.jpg"
                    alt="Ramachandragowda S Patil signature"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-pearl font-medium">
                    Ramachandragowda S Patil
                  </h4>
                  <p className="text-gold text-sm">
                    Founder & Creative Director
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Core Values
            </h2>
            <p className="text-[#C0C0C0] max-w-2xl mx-auto">
              The principles that guide every experience we create
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "ri-heart-line",
                title: "Passion",
                description:
                  "We are driven by our passion for creating exceptional experiences that exceed expectations.",
              },
              {
                icon: "ri-shield-check-line",
                title: "Excellence",
                description:
                  "We are committed to excellence in every detail, no matter how small.",
              },
              {
                icon: "ri-user-star-line",
                title: "Personalization",
                description:
                  "We believe that truly luxury experiences must be tailored to individual preferences.",
              },
              {
                icon: "ri-lock-line",
                title: "Discretion",
                description:
                  "We honor our clients' privacy and maintain the highest level of confidentiality.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black border border-gold/20 p-8 rounded shadow-lg text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <i className={`${value.icon} text-gold text-2xl`}></i>
                </div>
                <h3 className="text-xl font-display text-pearl mb-4">
                  {value.title}
                </h3>
                <p className="text-[#C0C0C0]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1546622891-02c72c1537b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
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
              Ready to Experience Luxury?
            </h2>
            <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto mb-10">
              Let us bring your vision to life with our expert team and
              unparalleled service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/services"
                className="btn-gold bg-transparent border border-gold text-gold px-8 py-3 uppercase tracking-widest text-sm font-medium inline-block"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="bg-gold text-black px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-gold/80 transition duration-300 inline-block"
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

export default AboutPage;
