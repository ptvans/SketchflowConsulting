import { 
  SiReplit, 
  SiFacebook, 
  SiApple, 
  SiUber, 
  SiAtlassian, 
  SiThreedotjs
} from "react-icons/si";

export interface ClientProject {
  id: number;
  clientName: string;
  logo: React.ElementType;
  category: string;
  description: string;
  techStack: string[];
  imagePlaceholder: string;
}

export const clientProjects: ClientProject[] = [
  {
    id: 1,
    clientName: "Replit",
    logo: SiReplit,
    category: "AI Agents",
    description: "Building coding agents that write and deploy apps based on natural language requests.",
    techStack: ["LLMs", "React", "Python"],
    imagePlaceholder: "AI Coding Assistant Interface"
  },
  {
    id: 2,
    clientName: "Facebook",
    logo: SiFacebook,
    category: "Dev Tools",
    description: "Building engineering infrastructure and employee productivity tools for scale.",
    techStack: ["React", "GraphQL", "Data Viz"],
    imagePlaceholder: "Engineering Dashboard"
  },
  {
    id: 3,
    clientName: "Apple",
    logo: SiApple,
    category: "ML & 3D",
    description: "Iterating 3D visualization & ML training tools for autonomous systems.",
    techStack: ["WebGL", "TensorFlow", "Python"],
    imagePlaceholder: "3D ML Visualization Tool"
  },
  {
    id: 4,
    clientName: "Uber Freight",
    logo: SiUber,
    category: "Logistics",
    description: "Building market monitoring, pricing, and contract management tools.",
    techStack: ["React", "D3.js", "Python"],
    imagePlaceholder: "Freight Monitoring Dashboard"
  },
  {
    id: 5,
    clientName: "Atlassian",
    logo: SiAtlassian,
    category: "Automation",
    description: "Building automation-as-a-service and internal people-management tools.",
    techStack: ["React", "Node.js", "GraphQL"],
    imagePlaceholder: "Automation Workflow Builder"
  },
  {
    id: 6,
    clientName: "Desktop Metal",
    logo: SiThreedotjs,
    category: "3D Printing",
    description: "Bringing easy-to-use 3D printing workflows for medical implants to clinicians.",
    techStack: ["React", "WebGL", "Three.js"],
    imagePlaceholder: "Medical Implant Designer"
  }
];
