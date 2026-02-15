import { TechCard } from "@/components/TechCard";

export default function About() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sidebar/Profile */}
        <div className="lg:col-span-1 space-y-8">
          <div className="rounded-2xl overflow-hidden border border-border/50 bg-muted/20">
             {/* Profile Image - using a tech-y placeholder or avatar */}
             <div className="aspect-square bg-muted relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
             </div>
             <div className="p-6">
               <h2 className="text-xl font-bold mb-1">Amari Nunn</h2>
               <p className="text-sm text-accent font-mono mb-4">Founder & Full Stack Engineer</p>
               <div className="space-y-2 text-sm text-muted-foreground font-mono">
                 <div className="flex justify-between">
                   <span>Location</span>
                   <span className="text-foreground">San Francisco, CA</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Experience</span>
                   <span className="text-foreground">7+ Years</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Availability</span>
                   <span className="text-green-500">Open</span>
                 </div>
               </div>
             </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/50">
             <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Core Stack</h3>
             <div className="flex flex-wrap gap-2">
               {["React", "TypeScript", "Node.js", "PostgreSQL", "Next.js", "Tailwind", "Python", "AWS"].map(tech => (
                 <span key={tech} className="px-2 py-1 bg-muted rounded text-xs font-mono">{tech}</span>
               ))}
             </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <TechCard title="README.md" className="bg-[#0d1117] border-gray-800 text-gray-300">
             <article className="prose prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-blue-400">
               <h1 className="text-3xl text-white mb-6">Hello, World.</h1>
               <p>
                 I'm a passionate software engineer with a focus on building accessible, pixel-perfect user interfaces that blend art with code. 
                 My journey began 7 years ago when I decided to try editing custom Tumblr themes — turns out hacking together HTML & CSS was more fun than blogging.
               </p>
               <p>
                 Fast forward to today, and I’ve had the privilege of building software for an <span className="text-white font-semibold">advertising agency</span>, a <span className="text-white font-semibold">start-up</span>, and a <span className="text-white font-semibold">huge corporation</span>.
               </p>
               
               <hr className="border-gray-800 my-8"/>
               
               <h3 className="text-white text-xl">My Philosophy</h3>
               <p>
                 I believe that <span className="text-accent">great software is invisible</span>. It should work so smoothly that the user forgets they are using a tool. 
                 To achieve this, I focus heavily on:
               </p>
               <ul className="list-disc pl-5 space-y-2">
                 <li>Performance optimization (Core Web Vitals)</li>
                 <li>Clean, maintainable architecture</li>
                 <li>Accessibility (WCAG 2.1 compliance)</li>
                 <li>Delightful micro-interactions</li>
               </ul>

               <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700 font-mono text-sm">
                 <p className="text-gray-400">// Current focus</p>
                 <p><span className="text-purple-400">const</span> <span className="text-blue-400">learningGoal</span> = <span className="text-green-400">"Rust & WebAssembly"</span>;</p>
               </div>
             </article>
          </TechCard>
        </div>
      </div>
    </div>
  );
}
