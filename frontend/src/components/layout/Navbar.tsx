import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header 
      className={`fixed w-full bg-black bg-opacity-90 z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center">
              <span className="font-display text-[#D4AF37] text-2xl tracking-wider">RAGAM ELYSSIA</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/" active={location === "/"}>Home</NavLink>
            <NavLink href="/about" active={location === "/about"}>About</NavLink>
            <NavLink href="/services" active={location === "/services"}>Services</NavLink>
            <NavLink href="/brochure" active={location === "/brochure"}>Brochure</NavLink>
            <NavLink href="/contact" active={location === "/contact"}>Contact</NavLink>
            
            {user ? (
              <Button 
                onClick={handleLogout}
                className="ml-4 bg-[#D4AF37] hover:bg-[#B38728] text-black px-6 py-2 rounded-sm transition duration-300"
              >
                Logout
              </Button>
            ) : (
              <Link href="/auth">
                <Button 
                  className="ml-4 bg-[#D4AF37] hover:bg-[#B38728] text-black px-6 py-2 rounded-sm transition duration-300"
                >
                  Login
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-[#D4AF37]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink href="/services" onClick={() => setMobileMenuOpen(false)}>Services</MobileNavLink>
            <MobileNavLink href="/brochure" onClick={() => setMobileMenuOpen(false)}>Brochure</MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</MobileNavLink>
            
            {user ? (
              <Button 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="bg-[#D4AF37] hover:bg-[#B38728] text-black px-6 py-2 rounded-sm transition duration-300 text-center"
              >
                Logout
              </Button>
            ) : (
              <Link href="/auth">
                <Button
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#D4AF37] hover:bg-[#B38728] text-black px-6 py-2 rounded-sm transition duration-300 w-full text-center"
                >
                  Login
                </Button>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}

const NavLink = ({ href, active, children }: NavLinkProps) => (
  <Link href={href}>
    <a className={`relative text-white hover:text-[#D4AF37] transition duration-300 nav-link after:content-[''] after:absolute after:w-0 after:h-[1px] after:bottom-[-2px] after:left-0 after:bg-[#D4AF37] after:transition-all after:duration-300 hover:after:w-full ${active ? 'text-[#D4AF37]' : ''}`}>
      {children}
    </a>
  </Link>
);

interface MobileNavLinkProps {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink = ({ href, onClick, children }: MobileNavLinkProps) => (
  <Link href={href}>
    <a 
      className="text-white hover:text-[#D4AF37] transition duration-300"
      onClick={onClick}
    >
      {children}
    </a>
  </Link>
);

export default Navbar;
