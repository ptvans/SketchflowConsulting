const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-primary-900 border-t border-primary-800 text-primary-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="text-white font-bold text-lg">
              Sketch<span className="gradient-text">flow</span>
            </a>
          </div>
          
          <div className="text-sm">
            &copy; {currentYear} Sketchflow Consulting. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
