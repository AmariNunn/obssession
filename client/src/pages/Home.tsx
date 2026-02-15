import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Terminal, Code2, Cpu, FileText, Layout, Database } from "lucide-react";
import { TechCard } from "@/components/TechCard";
import { LiquidEther } from "@/components/LiquidEther";
import { PricingPlans } from "@/components/PricingPlans";
import { InteractiveFolder } from "@/components/InteractiveFolder";
import { useProjects } from "@/hooks/use-content";

export default function Home() {
  const { data: projects, isLoading } = useProjects();
  
  // Only show featured projects
  const featuredProjects = projects?.filter(p => p.featured).slice(0, 3) || [];

  return (
    <div className="space-y-0 pb-0 bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <LiquidEther
            colors={['#070D0D', '#333333', '#fbfbfb']}
            mouseForce={25}
            cursorSize={120}
            autoDemo={true}
            autoSpeed={0.6}
            autoIntensity={2.5}
            resolution={0.5}
            BFECC={true}
            className="pointer-events-auto"
            style={{ pointerEvents: 'auto' }}
          />
          {/* Gradient overlay to fade effect under to the next section */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-[1.1]">
                AmariNunn.Tech <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">We build what's next.</span>
              </h1>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 group"
                >
                  Start Project
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/portfolio" 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors font-medium"
                >
                  View Work
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-card rounded-xl border border-border shadow-2xl p-2 max-w-md ml-auto rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-muted/30 rounded-lg p-6 font-mono text-sm leading-relaxed overflow-hidden">
                  <div className="flex space-x-2 mb-4 border-b border-border/50 pb-4">
                     <div className="w-3 h-3 rounded-full bg-red-400" />
                     <div className="w-3 h-3 rounded-full bg-yellow-400" />
                     <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="space-y-2">
                    <p><span className="text-blue-500">const</span> <span className="text-yellow-500">engineer</span> = <span className="text-purple-500">new</span> <span className="text-green-500">Developer</span>({`{`}</p>
                    <p className="pl-4"><span className="text-red-500">name</span>: <span className="text-green-500">"Amari Nunn"</span>,</p>
                    <p className="pl-4"><span className="text-red-500">skills</span>: [<span className="text-green-500">"React"</span>, <span className="text-green-500">"Node"</span>, <span className="text-green-500">"AI"</span>],</p>
                    <p className="pl-4"><span className="text-red-500">status</span>: <span className="text-green-500">"Online"</span></p>
                    <p>{`}`});</p>
                    <br/>
                    <p><span className="text-muted-foreground">// Initializing creative protocols...</span></p>
                    <p><span className="text-green-500">➜</span> <span className="animate-pulse">_</span></p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Snippet */}
      <section className="py-24 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-background/80 transition-colors border border-transparent hover:border-border/50">
              <div className="mb-4">
                <InteractiveFolder
                  size={1.2}
                  color="#5227FF"
                  label="WEB DEV"
                  items={[
                    <Code2 key="1" className="w-5 h-5 text-slate-400" />,
                    <Layout key="2" className="w-5 h-5 text-slate-400" />,
                    <FileText key="3" className="w-5 h-5 text-slate-400" />
                  ]}
                />
              </div>
              <h3 className="text-xl font-bold">Web Development</h3>
              <p className="text-muted-foreground text-sm text-center">High-performance React/Next.js applications built for scale and speed.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-background/80 transition-colors border border-transparent hover:border-border/50">
              <div className="mb-4">
                <InteractiveFolder
                  size={1.2}
                  color="#00D1FF"
                  label="AI"
                  items={[
                    <Cpu key="1" className="w-5 h-5 text-cyan-400" />,
                    <Terminal key="2" className="w-5 h-5 text-cyan-300" />
                  ]}
                />
              </div>
              <h3 className="text-xl font-bold">AI Integration</h3>
              <p className="text-muted-foreground text-sm text-center">Custom LLM implementation, chatbots, and intelligent automation workflows.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-background/80 transition-colors border border-transparent hover:border-border/50">
              <div className="mb-4">
                <InteractiveFolder
                  size={1.2}
                  color="#1A1A1B"
                  label="SYSTEMS"
                  items={[
                    <Database key="1" className="w-5 h-5 text-slate-500" />,
                    <Terminal key="2" className="w-5 h-5 text-slate-400" />
                  ]}
                />
              </div>
              <h3 className="text-xl font-bold">System Architecture</h3>
              <p className="text-muted-foreground text-sm text-center">Robust backend design, database optimization, and cloud infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Selected Work</h2>
            <p className="text-muted-foreground">Recent projects and case studies.</p>
          </div>
          <Link href="/portfolio" className="hidden sm:flex items-center text-sm font-medium hover:text-accent transition-colors">
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-96 rounded-xl bg-muted/20 animate-pulse" />
            ))
          ) : (
            featuredProjects.map((project) => (
              <Link key={project.id} href={`/portfolio/${project.slug}`}>
                <TechCard 
                  title={project.title} 
                  subtitle="CASE STUDY"
                  className="h-full hover:-translate-y-1 transition-transform cursor-pointer"
                >
                  <div className="aspect-video mb-6 overflow-hidden rounded-md bg-muted relative group-hover:ring-2 ring-accent/20 transition-all">
                    {/* Unsplash placeholder for projects */}
                    <img 
                      src={project.imageUrl || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80`} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="text-xs px-2 py-1 bg-muted rounded-md font-mono text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </TechCard>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <PricingPlans />

      {/* CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-6 py-16 md:px-12 md:py-20 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl -top-20 -left-20"></div>
             <div className="absolute w-96 h-96 bg-accent rounded-full blur-3xl -bottom-20 -right-20"></div>
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to elevate your digital presence?
            </h2>
            <p className="text-primary-foreground/80 mb-10 text-lg">
              Let's discuss your project and see how we can build something extraordinary together.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-background text-foreground font-bold hover:bg-accent hover:text-white transition-all duration-300 shadow-xl"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
