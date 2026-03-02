import { useState } from "react";
import { Mail, MapPin, Clock, Linkedin, Twitter, Github } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would submit to a form handling service like Formspree
    console.log("Form submitted:", formData);
    // Clear form after submission
    setFormData({
      name: "",
      email: "",
      company: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-primary-900 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-lg text-primary-100 mb-8">Ready to transform your product or business? Get in touch to discuss how Sketchflow can help you achieve your goals.</p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary-600/20 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-secondary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <a href="mailto:hello@sketchflow.design" className="text-primary-200 hover:text-white transition-colors">hello@sketchflow.design</a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary-600/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-secondary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Location</h3>
                  <p className="text-primary-200">San Francisco, CA (Remote available)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary-600/20 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-secondary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Availability</h3>
                  <p className="text-primary-200">Currently accepting new clients</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary-800 hover:bg-primary-700 rounded-full flex items-center justify-center transition-colors" 
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary-800 hover:bg-primary-700 rounded-full flex items-center justify-center transition-colors" 
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary-800 hover:bg-primary-700 rounded-full flex items-center justify-center transition-colors" 
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-primary-800 rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary-300 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-md text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500" 
                    placeholder="Your name" 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-md text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500" 
                    placeholder="your.email@example.com" 
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-primary-300 mb-1">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-md text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500" 
                    placeholder="Your company" 
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary-300 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-md text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500" 
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="w-full bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-6 rounded-md font-medium transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
