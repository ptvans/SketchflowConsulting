import { clientProjects } from "@/data/clientProjects";

const ClientProjects = () => {
  return (
    <section id="clients" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Past Clients</h2>
          <p className="text-lg text-primary-700">Building impactful solutions for industry leaders and innovative startups.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-primary-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-primary-100 overflow-hidden flex items-center justify-center">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 16 9"
                  preserveAspectRatio="none"
                >
                  <rect width="16" height="9" fill="#E5E7EB" />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#6B7280"
                    fontSize="0.8"
                  >
                    {project.imagePlaceholder}
                  </text>
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-bold text-lg">{project.clientName}</div>
                  <div className="text-xs font-medium bg-primary-100 text-primary-800 px-3 py-1 rounded-full">{project.category}</div>
                </div>
                <p className="text-primary-700 mb-4">{project.description}</p>
                <div className="font-mono text-xs text-primary-600">// TECH STACK</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#contact" className="inline-flex items-center text-secondary-600 font-medium hover:text-secondary-700 transition-colors">
            <span>Discuss your project</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClientProjects;
