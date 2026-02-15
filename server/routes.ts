import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProjectBySlug(req.params.slug);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  // Posts
  app.get(api.posts.list.path, async (req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  // Services
  app.get(api.services.list.path, async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  // Testimonials
  app.get(api.testimonials.list.path, async (req, res) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createContactMessage(input);
      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Initialize seed data
  await seedDatabase();

  return httpServer;
}

// Seed function to populate the database with initial data
export async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    const projectsToSeed = [
      {
        title: "SkyIQ Cloud",
        slug: "skyiq-cloud",
        description: "A sleek SaaS landing page showcasing AI-powered voice assistant and telephony solutions for modern businesses.",
        content: "A sleek SaaS landing page showcasing AI-powered voice assistant and telephony solutions for modern businesses.",
        imageUrl: "/images/skyiq-cloud.png",
        technologies: ["React", "Tailwind", "AI"],
        liveUrl: "https://skyiq.cloud",
        featured: true,
        order: 1
      },
      {
        title: "SkyIQ App",
        slug: "skyiq-app",
        description: "A full-featured web application platform delivering intelligent automation and client management tools.",
        content: "A full-featured web application platform delivering intelligent automation and client management tools.",
        imageUrl: "/images/skyiq-app.png",
        technologies: ["React", "Node.js", "Automation"],
        liveUrl: "https://www.skyiq.app",
        featured: true,
        order: 2
      },
      {
        title: "Lyra Robotics",
        slug: "lyra-robotics",
        description: "A forward-thinking robotics and AI company site highlighting innovative automation technology and solutions.",
        content: "A forward-thinking robotics and AI company site highlighting innovative automation technology and solutions.",
        imageUrl: "/images/lyra-robotics.png",
        technologies: ["Next.js", "AI", "Robotics"],
        liveUrl: "https://www.lyrarobotics.io/",
        featured: true,
        order: 3
      },
      {
        title: "Onda Floent Money",
        slug: "onda-floent",
        description: "A dynamic entertainment and music brand site representing the Money on da FLO creative movement.",
        content: "A dynamic entertainment and music brand site representing the Money on da FLO creative movement.",
        imageUrl: "https://images.unsplash.com/photo-1514525253361-bee8a197c9c4",
        technologies: ["Web Design", "Branding", "Entertainment"],
        liveUrl: "https://ondafloent.money/",
        featured: true,
        order: 4
      },
      {
        title: "TRI Creative Group",
        slug: "tricreative",
        description: "A polished creative agency website offering comprehensive branding, design, and digital marketing services.",
        content: "A polished creative agency website offering comprehensive branding, design, and digital marketing services.",
        imageUrl: "/images/tricreative.png",
        technologies: ["React", "Branding", "Marketing"],
        liveUrl: "https://tricreativegroup.com/",
        featured: true,
        order: 5
      },
      {
        title: "Antwon Harris",
        slug: "antwon-harris",
        description: "A professional personal brand and portfolio site spotlighting expertise, projects, and entrepreneurial ventures.",
        content: "A professional personal brand and portfolio site spotlighting expertise, projects, and entrepreneurial ventures.",
        imageUrl: "/images/antwon-harris.png",
        technologies: ["Portfolio", "Personal Brand"],
        liveUrl: "https://antwonharris.com",
        featured: true,
        order: 6
      },
      {
        title: "Saniya Allen",
        slug: "saniya-allen",
        description: "An elegant personal brand website showcasing talent, artistry, and professional achievements.",
        content: "An elegant personal brand website showcasing talent, artistry, and professional achievements.",
        imageUrl: "/images/sani-allen.png",
        technologies: ["Artistry", "Personal Brand"],
        liveUrl: "https://www.saniyallen.com/",
        featured: true,
        order: 7
      }
    ];

    for (const project of projectsToSeed) {
      await storage.createProject(project);
    }
  }

  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    await storage.createService({
      title: "Web Development",
      description: "Full-stack web applications built for scale.",
      priceRange: "Starting at $5,000",
      features: ["Custom Design", "SEO Optimization", "Responsive Layout"],
      icon: "Globe",
      order: 1
    });

    await storage.createService({
      title: "AI Integration",
      description: "Integrate cutting-edge AI models into your business.",
      priceRange: "Starting at $3,000",
      features: ["Chatbots", "Data Analysis", "Automation"],
      icon: "Bot",
      order: 2
    });
  }

  const existingTestimonials = await storage.getTestimonials();
  if (existingTestimonials.length === 0) {
    await storage.createTestimonial({
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechFlow",
      content: "The attention to detail and technical expertise provided was outstanding. Our platform performance improved by 200%.",
      featured: true
    });
  }
  
  const existingPosts = await storage.getPosts();
  if (existingPosts.length === 0) {
    await storage.createPost({
        title: "The Future of Web Development with AI",
        slug: "future-web-ai",
        excerpt: "How AI is transforming the way we build and deploy web applications.",
        content: "Artificial Intelligence is not just a buzzword...",
        published: true,
        publishedAt: new Date()
    });
  }
}
