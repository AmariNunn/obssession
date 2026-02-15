import { db } from "./db";
import { 
  projects, posts, services, testimonials, contactMessages,
  type InsertProject, type InsertPost, type InsertService, 
  type InsertTestimonial, type InsertContactMessage,
  type Project, type Post, type Service, type Testimonial, type ContactMessage
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  
  // Posts
  getPosts(): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | undefined>;

  // Services
  getServices(): Promise<Service[]>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;

  // Contact
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;

  // Seed helpers (optional, but good for completeness)
  createProject(project: InsertProject): Promise<Project>;
  createPost(post: InsertPost): Promise<Post>;
  createService(service: InsertService): Promise<Service>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.order));
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
    return project;
  }

  async getPosts(): Promise<Post[]> {
    return await db.select().from(posts).where(eq(posts.published, true)).orderBy(desc(posts.publishedAt));
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }

  async getServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(services.order);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).where(eq(testimonials.featured, true));
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [contact] = await db.insert(contactMessages).values(message).returning();
    return contact;
  }

  // Seeding methods
  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }
}

export const storage = new DatabaseStorage();
