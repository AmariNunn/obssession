import { useProjects } from "@/hooks/use-content";
import { TechCard } from "@/components/TechCard";
import { Link } from "wouter";
import { ExternalLink, Github } from "lucide-react";
import { TubesBackground } from "@/components/ui/tubes-background";
import { motion } from "framer-motion";

export default function Portfolio() {
  const { data: projects, isLoading } = useProjects();

  return (
    <TubesBackground className="min-h-screen">
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Project Archive</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A collection of shipped products, experimental prototypes, and open source contributions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {isLoading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-xl bg-muted/20 animate-pulse" />
            ))
          ) : (
            projects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TechCard 
                  title={project.title}
                  subtitle={project.featured ? "FEATURED" : "ARCHIVED"}
                  className="flex flex-col group pointer-events-auto"
                >
                  <div className="aspect-video w-full overflow-hidden rounded-md bg-muted mb-6 relative border border-border/50">
                    <img 
                      src={project.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Hover overlay with links */}
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform shadow-lg"
                          title="View Live"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {project.repoUrl && (
                        <a 
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-card border border-border text-foreground rounded-full hover:scale-110 transition-transform shadow-lg"
                          title="View Code"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex-grow">
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2.5 py-1 rounded-md bg-muted/50 text-xs font-mono text-foreground border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </TechCard>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </TubesBackground>
  );
}
