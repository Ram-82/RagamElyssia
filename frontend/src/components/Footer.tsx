import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-black pt-16 pb-8 border-t border-gold/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-pearl font-display text-xl mb-6">Ragam Elyssia</h3>
            <p className="text-silver text-sm mb-6">Transforming ordinary moments into extraordinary memories through meticulous planning, unparalleled attention to detail, and personalized service.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-silver hover:text-gold transition-colors">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="text-silver hover:text-gold transition-colors">
                <i className="ri-facebook-line text-xl"></i>
              </a>
              <a href="#" className="text-silver hover:text-gold transition-colors">
                <i className="ri-twitter-x-line text-xl"></i>
              </a>
              <a href="#" className="text-silver hover:text-gold transition-colors">
                <i className="ri-linkedin-line text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-pearl font-display text-xl mb-6">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="text-silver hover:text-gold transition-colors">Luxury Event Planning</Link></li>
              <li><Link href="/services" className="text-silver hover:text-gold transition-colors">Concierge Services</Link></li>
              <li><Link href="/services" className="text-silver hover:text-gold transition-colors">Elite Fashion Events</Link></li>
              <li><Link href="/services" className="text-silver hover:text-gold transition-colors">Bespoke Services</Link></li>
              <li><Link href="/brochure" className="text-silver hover:text-gold transition-colors">Download Brochure</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-pearl font-display text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-silver hover:text-gold transition-colors">About Us</Link></li>
              <li><Link href="/booking" className="text-silver hover:text-gold transition-colors">Book Our Services</Link></li>
              <li><Link href="#" className="text-silver hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-silver hover:text-gold transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/auth" className="text-silver hover:text-gold transition-colors">Client Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-pearl font-display text-xl mb-6">Newsletter</h3>
            <p className="text-silver text-sm mb-4">Subscribe to receive exclusive offers and updates.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="email" 
                  className="w-full bg-black border border-gold/30 text-pearl px-4 py-2 rounded focus:outline-none focus:border-gold" 
                  placeholder="Your Email"
                />
              </div>
              <button 
                type="submit" 
                className="bg-gold text-black px-5 py-2 uppercase tracking-widest text-xs font-medium hover:bg-gold/80 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gold/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-silver text-xs mb-4 md:mb-0">&copy; {new Date().getFullYear()} Ragam Elyssia. All rights reserved.</p>
            <div className="flex space-x-6 text-xs">
              <a href="#" className="text-silver hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="text-silver hover:text-gold transition-colors">Terms of Service</a>
              <a href="#" className="text-silver hover:text-gold transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
