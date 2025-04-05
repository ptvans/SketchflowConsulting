import { useState, useEffect } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section[id]');

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id') || "";

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <span className="font-bold text-xl md:text-2xl text-primary-900">
              Sketch<span className="gradient-text">flow</span>
            </span>
          </a>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center p-2" 
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#services" 
              className={`gradient-border text-primary-800 font-medium hover:text-secondary-600 transition-colors ${activeSection === "services" ? "text-secondary-600" : ""}`}
            >
              Services
            </a>
            <a 
              href="#about" 
              className={`gradient-border text-primary-800 font-medium hover:text-secondary-600 transition-colors ${activeSection === "about" ? "text-secondary-600" : ""}`}
            >
              About
            </a>
            <a 
              href="#clients" 
              className={`gradient-border text-primary-800 font-medium hover:text-secondary-600 transition-colors ${activeSection === "clients" ? "text-secondary-600" : ""}`}
            >
              Clients
            </a>
            <a 
              href="#contact" 
              className="bg-secondary-600 text-white px-5 py-2 rounded-md font-medium hover:bg-secondary-700 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-white border-t border-primary-200`}>
        <div className="container mx-auto px-4 py-3 space-y-3">
          <a 
            href="#services" 
            onClick={closeMobileMenu}
            className="block py-2 text-primary-800 font-medium hover:text-secondary-600"
          >
            Services
          </a>
          <a 
            href="#about" 
            onClick={closeMobileMenu}
            className="block py-2 text-primary-800 font-medium hover:text-secondary-600"
          >
            About
          </a>
          <a 
            href="#clients" 
            onClick={closeMobileMenu}
            className="block py-2 text-primary-800 font-medium hover:text-secondary-600"
          >
            Clients
          </a>
          <a 
            href="#contact" 
            onClick={closeMobileMenu}
            className="block py-2 text-secondary-600 font-medium hover:text-secondary-700"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
