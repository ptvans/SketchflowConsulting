import { SiReplit, SiFacebook, SiApple, SiUber, SiAtlassian } from "react-icons/si";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Transforming <span className="gradient-text">Enterprise & AI</span> Through Strategic Design
          </h1>
          <p className="text-xl md:text-2xl text-primary-700 mb-10 leading-relaxed">
            Expert consulting for companies building the next generation of tools, products, and intelligent systems.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#services" className="bg-secondary-600 text-white px-8 py-3 rounded-md font-medium hover:bg-secondary-700 transition-colors">
              Explore Services
            </a>
            <a href="#contact" className="bg-white text-primary-900 border border-primary-200 px-8 py-3 rounded-md font-medium hover:bg-primary-100 transition-colors">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-20 md:mt-28 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-wider text-primary-700 mb-6 font-medium">Trusted by innovative companies</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            <SiReplit className="h-6 md:h-8 w-auto client-logo" aria-label="Replit" />
            <SiFacebook className="h-6 md:h-8 w-auto client-logo" aria-label="Facebook" />
            <SiApple className="h-6 md:h-8 w-auto client-logo" aria-label="Apple" />
            <SiUber className="h-6 md:h-8 w-auto client-logo" aria-label="Uber Freight" />
            <SiAtlassian className="h-6 md:h-8 w-auto client-logo" aria-label="Atlassian" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
