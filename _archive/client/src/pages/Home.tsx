import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import ClientProjects from "@/components/ClientProjects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans text-primary-900 bg-primary-50">
      <Header />
      <Hero />
      <div className="section-divider"></div>
      <Services />
      <div className="section-divider"></div>
      <About />
      <div className="section-divider"></div>
      <ClientProjects />
      <div className="section-divider"></div>
      <Contact />
      <Footer />
    </div>
  );
}
