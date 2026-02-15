import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-20 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 rounded-sm flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="ANT Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-lg tracking-tight">Amari Nunn Tech</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              Building high-performance web experiences with modern architecture.
              Based in the digital realm, serving clients worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono font-bold text-sm uppercase tracking-wider mb-4">Sitemap</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="/portfolio" className="hover:text-primary transition-colors">Work</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono font-bold text-sm uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground font-mono">
          <p>© {new Date().getFullYear()} Amari Nunn Tech. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
