import { 
  Sliders, 
  ClipboardList, 
  Lightbulb, 
  Code, 
  BarChart2, 
  Layers 
} from "lucide-react";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Product Design",
    description: "Creating intuitive, scalable product experiences that solve complex problems and delight users.",
    icon: Sliders
  },
  {
    id: 2,
    title: "User Research",
    description: "Uncovering deep user insights that drive product strategy and create meaningful experiences.",
    icon: ClipboardList
  },
  {
    id: 3,
    title: "AI & ML Workflows",
    description: "Building intelligent systems and interfaces that leverage automation and machine learning effectively.",
    icon: Lightbulb
  },
  {
    id: 4,
    title: "Developer Tools",
    description: "Creating powerful, intuitive tools that enhance developer productivity and workflow efficiency.",
    icon: Code
  },
  {
    id: 5,
    title: "Data Visualization",
    description: "Transforming complex data into intuitive, actionable visual insights that drive better decision-making.",
    icon: BarChart2
  },
  {
    id: 6,
    title: "Prototyping",
    description: "Rapidly testing and validating ideas through high-fidelity prototypes that accelerate the development process.",
    icon: Layers
  }
];
