import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Services', path: '/services' },
    { title: 'Brochure', path: '/brochure' },
    { title: 'Booking', path: '/booking' },
    { title: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black bg-opacity-90 shadow-lg' : ''}`}>
      <nav className="bg-blur bg-black bg-opacity-20 border-b border-gold/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-display text-gold tracking-wider">RAGAM ELYSSIA</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-pearl hover-gold text-sm uppercase tracking-wider ${location === link.path ? 'text-gold' : ''}`}
              >
                {link.title}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gold text-sm">Hello, {user.username}</span>
                <button 
                  onClick={handleLogout}
                  className="border border-gold text-gold hover:bg-gold hover:text-black transition duration-300 px-5 py-2 text-sm uppercase tracking-wider"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/auth"
                className="border border-gold text-gold hover:bg-gold hover:text-black transition duration-300 px-5 py-2 text-sm uppercase tracking-wider"
              >
                Login
              </Link>
            )}
          </div>
          
          <button 
            className="md:hidden text-pearl" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`ri-${mobileMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black bg-opacity-95 border-b border-gold/20 w-full md:hidden"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`text-pearl text-sm uppercase tracking-wider py-2 ${location === link.path ? 'text-gold' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
              
              {user ? (
                <div className="flex flex-col gap-4">
                  <span className="text-gold text-sm">Hello, {user.username}</span>
                  <button 
                    onClick={handleLogout}
                    className="border border-gold text-gold text-center hover:bg-gold hover:text-black transition duration-300 px-5 py-2 text-sm uppercase tracking-wider"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  href="/auth"
                  className="border border-gold text-gold text-center hover:bg-gold hover:text-black transition duration-300 px-5 py-2 text-sm uppercase tracking-wider"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
