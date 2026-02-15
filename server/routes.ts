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
    await storage.createProject({
      title: "SkyIQ Cloud Platform",
      slug: "skyiq-cloud",
      description: "A full-featured web application platform delivering intelligent automation and client management tools.",
      content: "SkyIQ Cloud is an AI-powered voice agent platform with features including call dashboards, bulk calling, business profiles, and admin panels. Built to streamline client communication and automate business workflows.",
      imageUrl: "/images/skyiq-dashboard.png",
      technologies: ["React", "Node.js", "AI", "Cloud"],
      liveUrl: "https://www.skyiq.cloud",
      featured: true,
      order: 1
    });
    
    await storage.createProject({
      title: "Lyra Robotics",
      slug: "lyra-robotics",
      description: "A forward-thinking robotics and AI company site highlighting innovative automation technology and solutions.",
      content: "Lyra Robotics is the most powerful omnichain toolkit, supporting Ethereum, Solana, Polygon, Avalanche, Bitcoin, and more. Features include automated minting, sniping, raffle and discord botting, airdrop farming, and wallet management across multiple blockchains.",
      imageUrl: "/images/lyra-robotics.png",
      technologies: ["Next.js", "Blockchain", "Web3", "AI"],
      liveUrl: "https://www.lyrarobotics.io",
      featured: true,
      order: 2
    });
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
