# Overview

This is **Amari Nunn Tech**, a personal portfolio and business website for a full-stack web developer. It's a multi-page application with a "Browser-Core Modernism" design aesthetic — technical, high-density UI that mimics developer tools and IDE interfaces. The site includes pages for Home, Services, Portfolio, About, Blog, and Contact, all backed by a PostgreSQL database for dynamic content management.

The project features a WebGL fluid simulation background effect (LiquidEther component using Three.js), extensive use of monospaced fonts and border-heavy design elements, and a complete REST API for content delivery.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Monorepo Structure

The project uses a single-repo structure with three main directories:

- **`client/`** — React frontend (SPA)
- **`server/`** — Express.js backend API
- **`shared/`** — Shared types, schemas, and route definitions used by both client and server

This structure allows the frontend and backend to share TypeScript types and Zod validation schemas, preventing drift between API contracts.

## Frontend (`client/src/`)

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite (config in `vite.config.ts`)
- **Routing**: Wouter (lightweight alternative to React Router)
- **State/Data Fetching**: TanStack React Query for server state management
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming, custom color system with light/dark mode support
- **Fonts**: Inter (sans-serif body) and JetBrains Mono (monospace for technical elements)
- **Animations**: Framer Motion for page transitions and interactive elements
- **Forms**: React Hook Form with Zod resolver for validation
- **Special Components**: LiquidEther — a custom WebGL fluid simulation component using Three.js for the hero background
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

Pages: Home, Services, Portfolio, About, Blog, Contact, plus a 404 page. The `TechCard` component provides the signature "window chrome" card design used throughout.

## Backend (`server/`)

- **Framework**: Express.js running on Node.js
- **Language**: TypeScript, executed via `tsx` in development
- **API Pattern**: RESTful JSON API, all routes prefixed with `/api/`
- **Route Registration**: Centralized in `server/routes.ts`, using route definitions from `shared/routes.ts`
- **Storage Layer**: `DatabaseStorage` class in `server/storage.ts` implements the `IStorage` interface, providing a clean abstraction over database operations
- **Dev Server**: Vite middleware is integrated into Express during development (via `server/vite.ts`) for HMR
- **Production**: Client is built to `dist/public/`, server is bundled with esbuild to `dist/index.cjs`

## Database

- **Database**: PostgreSQL (required via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for automatic Zod schema generation
- **Schema Location**: `shared/schema.ts`
- **Migrations**: Drizzle Kit with `drizzle-kit push` command (no migration files, direct push)
- **Connection**: `pg` Pool in `server/db.ts`

### Database Tables

| Table | Purpose |
|-------|---------|
| `projects` | Portfolio items with title, slug, description, content, image, technologies, URLs, featured flag, ordering |
| `posts` | Blog posts with title, slug, excerpt, content, published flag, timestamps |
| `services` | Service offerings with title, description, price range, features, icon name, ordering |
| `testimonials` | Client testimonials with name, role, company, content, avatar, featured flag |
| `contactMessages` | Contact form submissions with name, email, subject, message |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/:slug` | Get project by slug |
| GET | `/api/posts` | List published posts |
| GET | `/api/posts/:slug` | Get post by slug |
| GET | `/api/services` | List all services |
| GET | `/api/testimonials` | List all testimonials |
| POST | `/api/contact` | Submit contact form |

## Build System

- **Development**: `npm run dev` — runs tsx with Vite middleware for HMR
- **Production Build**: `npm run build` — Vite builds client, esbuild bundles server
- **Database Sync**: `npm run db:push` — pushes Drizzle schema to PostgreSQL
- **Type Check**: `npm run check` — runs TypeScript compiler

## Shared Route Contract

The `shared/routes.ts` file defines API routes with their methods, paths, and Zod response schemas. Both server and client import from this file, ensuring type-safe API communication. The client hooks in `client/src/hooks/use-content.ts` use these definitions for data fetching.

# External Dependencies

- **PostgreSQL** — Primary database, connected via `DATABASE_URL` environment variable
- **Three.js** — WebGL rendering for the LiquidEther fluid simulation background
- **Google Fonts** — Inter, JetBrains Mono, DM Sans, Fira Code, Geist Mono, Architects Daughter
- **Unsplash** — Placeholder images used in portfolio and about pages
- **Radix UI** — Headless UI primitives (accordion, dialog, dropdown, tabs, tooltip, etc.)
- **Recharts** — Chart library (available via shadcn chart component)
- **Replit Plugins** — `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` for development on Replit