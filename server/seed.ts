import { storage } from "./storage";
import { type InsertProject } from "@shared/schema";

const projects: InsertProject[] = [
  {
    title: "Sani Ya Allen",
    slug: "sani-ya-allen",
    description: "Creative Director & Stylist Portfolio for Sani Ya Allen, featuring a high-density technical UI.",
    content: "A professional portfolio for creative director and stylist Sani Ya Allen. The site uses a technical, high-density UI to showcase fashion editorial work and creative direction projects.",
    imageUrl: "https://images.unsplash.com/photo-1539109132381-31a15b2c6d68?q=80&w=1000",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://www.saniyallen.com/",
    featured: true,
    order: 6
  },
  {
    title: "Lyra Robotics",
    slug: "lyra-robotics",
    description: "Advanced Robotic Systems and AI-driven automation solutions.",
    content: "Development of the digital presence for Lyra Robotics, focusing on cutting-edge robotic systems and industrial automation interfaces.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000",
    technologies: ["Next.js", "Three.js", "System Architecture", "AI Integration"],
    liveUrl: "https://www.lyrarobotics.io/",
    featured: true,
    order: 5
  },
  {
    title: "Antwon Harris",
    slug: "antwon-harris",
    description: "Professional Athlete & Brand Management platform.",
    content: "A comprehensive brand platform for professional athlete Antwon Harris, including media management and fan engagement features.",
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c64b52d3?q=80&w=1000",
    technologies: ["React", "Node.js", "PostgreSQL", "Cloud Infrastructure"],
    liveUrl: "http://antwonharris.com",
    featured: true,
    order: 4
  },
  {
    title: "Onda Floent",
    slug: "onda-floent",
    description: "Financial Solutions and digital money management platform.",
    content: "Modern financial services platform designed for seamless money management and digital transactions with high security standards.",
    imageUrl: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=1000",
    technologies: ["FinTech", "Security Architecture", "API Integration", "React"],
    liveUrl: "https://ondafloent.money/",
    featured: true,
    order: 3
  },
  {
    title: "The Tri Movement",
    slug: "the-tri-movement",
    description: "Health & Wellness community and training platform.",
    content: "A holistic health and wellness platform focused on community-driven fitness, nutrition, and mental health tracking.",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000",
    technologies: ["Mobile-First Design", "Real-time Data", "Community Features"],
    liveUrl: "https://thetrimovement.com",
    featured: true,
    order: 2
  },
  {
    title: "SkyIQ Cloud",
    slug: "skyiq-cloud",
    description: "Cloud Infrastructure & Solutions for modern enterprises.",
    content: "Enterprise-grade cloud solutions and infrastructure management dashboard for scalable business operations.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
    technologies: ["Cloud Infrastructure", "DevOps", "System Architecture", "Kubernetes"],
    liveUrl: "https://www.skyiq.cloud",
    featured: true,
    order: 1
  }
];

async function seed() {
  console.log("Seeding projects...");
  for (const project of projects) {
    try {
      await storage.createProject(project);
      console.log(`Created project: ${project.title}`);
    } catch (e) {
      console.error(`Failed to create project ${project.title}: `, e);
    }
  }
  console.log("Seeding completed!");
  process.exit(0);
}

seed();
