import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-black text-[#F5F5F5] py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-display text-[#D4AF37] text-xl mb-4">Ragam Elyssia</h3>
            <p className="mb-4">
              Purveyors of extraordinary experiences and elite event planning for the most discerning clientele worldwide.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon="instagram" />
              <SocialLink href="#" icon="facebook-f" />
              <SocialLink href="#" icon="twitter" />
              <SocialLink href="#" icon="linkedin-in" />
            </div>
          </div>
          
          <div>
            <h3 className="font-display text-[#D4AF37] text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/"><a className="hover:text-[#D4AF37] transition duration-300">Home</a></Link></li>
              <li><Link href="/about"><a className="hover:text-[#D4AF37] transition duration-300">About Us</a></Link></li>
              <li><Link href="/services"><a className="hover:text-[#D4AF37] transition duration-300">Services</a></Link></li>
              <li><Link href="/brochure"><a className="hover:text-[#D4AF37] transition duration-300">Brochure</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-[#D4AF37] transition duration-300">Contact</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-[#D4AF37] text-xl mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services#luxury-events"><a className="hover:text-[#D4AF37] transition duration-300">Luxury Event Planning</a></Link></li>
              <li><Link href="/services#concierge"><a className="hover:text-[#D4AF37] transition duration-300">Concierge Services</a></Link></li>
              <li><Link href="/services#fashion-events"><a className="hover:text-[#D4AF37] transition duration-300">Elite Brand & Fashion Events</a></Link></li>
              <li><Link href="/services#bespoke"><a className="hover:text-[#D4AF37] transition duration-300">Bespoke Services</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-[#D4AF37] text-xl mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to receive exclusive updates and offers.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow bg-[#2A2A2A] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-white p-2 rounded-sm focus:outline-none"
              />
              <button 
                type="submit" 
                className="ml-2 bg-[#D4AF37] hover:bg-[#B38728] text-black px-3 rounded-sm transition duration-300"
                aria-label="Subscribe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Ragam Elyssia. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy"><a className="text-sm hover:text-[#D4AF37] transition duration-300">Privacy Policy</a></Link>
            <Link href="/terms"><a className="text-sm hover:text-[#D4AF37] transition duration-300">Terms of Service</a></Link>
            <Link href="/cookies"><a className="text-sm hover:text-[#D4AF37] transition duration-300">Cookie Policy</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: string;
}

const SocialLink = ({ href, icon }: SocialLinkProps) => (
  <a href={href} className="text-white hover:text-[#D4AF37] transition duration-300" aria-label={icon}>
    <i className={`fab fa-${icon}`}></i>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      {icon === "instagram" && (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      )}
      {icon === "facebook-f" && (
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      )}
      {icon === "twitter" && (
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
      )}
      {icon === "linkedin-in" && (
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      )}
    </svg>
  </a>
);

export default Footer;
