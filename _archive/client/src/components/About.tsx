import { industryTags } from "@/data/industryTags";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-primary-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Paul,<br />Your Design Consultant</h2>
            <div className="space-y-4 text-primary-700">
              <p className="text-lg">With 15 years of experience helping startups rapidly prototype products and assisting large companies in building internal systems, Paul brings unmatched expertise to your projects.</p>
              <p>Specializing in B2B/SaaS across many industry verticals, including employee tools, enterprise software, workflows, automation, autonomous systems, machine learning, data visualization, app performance, and engineering, analytics & development tooling.</p>
              <p>Paul's unique perspective combines deep technical knowledge with user-centered design principles, allowing him to bridge the gap between complex systems and intuitive user experiences.</p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Industry Experience</h3>
              <div className="flex flex-wrap gap-2">
                {industryTags.map((tag, index) => (
                  <span key={index} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border-8 border-white relative z-10">
              <svg
                className="w-full h-full bg-gray-300"
                viewBox="0 0 1 1"
                preserveAspectRatio="none"
              >
                <rect width="1" height="1" fill="#E5E7EB" />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#6B7280"
                  fontSize="0.1"
                >
                  Portrait Photo
                </text>
              </svg>
            </div>
            <div className="absolute top-12 -right-10 bg-white shadow-lg rounded-lg p-6 max-w-xs z-20">
              <div className="font-mono text-sm text-primary-700 mb-2">// Design Philosophy</div>
              <p className="text-primary-900">"Great design is about solving real problems through a deep understanding of user needs and business objectives."</p>
            </div>
            <div className="absolute -bottom-10 -left-10 bg-secondary-600 rounded-lg p-6 max-w-xs text-white z-20">
              <div className="font-mono text-sm opacity-80 mb-2">// Years of Experience</div>
              <div className="text-4xl font-bold">15+</div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-secondary-100 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
