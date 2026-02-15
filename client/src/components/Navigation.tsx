import { Link, useLocation } from "wouter";
import { Terminal, Code2, FolderGit2, Mail, Cpu, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Terminal },
    { href: "/services", label: "Services", icon: Cpu },
    { href: "/portfolio", label: "Work", icon: FolderGit2 },
    { href: "/blog", label: "Log", icon: BookOpen },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-md flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="ANT Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">Amari Nunn Tech</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 group",
                    isActive 
                      ? "text-primary bg-primary/5 shadow-sm border border-border/50" 
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-accent" : "text-muted-foreground group-hover:text-primary")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex md:hidden">
            {/* Mobile menu could go here, keeping it simple for now with a scrollable bar */}
            <div className="flex space-x-4 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
             {/* Using simple links for mobile fallback if needed */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
