import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TechCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headerRight?: ReactNode;
}

export function TechCard({ title, subtitle, children, className, headerRight }: TechCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-xl border border-border bg-card/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent/40",
      className
    )}>
      {/* Top bar mimicking a window */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-muted/20">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-border group-hover:bg-red-400 transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-border group-hover:bg-yellow-400 transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-border group-hover:bg-green-400 transition-colors" />
          </div>
          <div className="pl-2 flex flex-col">
            <h3 className="text-sm font-semibold font-mono tracking-tight text-foreground">{title}</h3>
            {subtitle && <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">{subtitle}</span>}
          </div>
        </div>
        {headerRight && <div>{headerRight}</div>}
      </div>
      
      <div className="p-5">
        {children}
      </div>

      {/* Technical corner accents */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/20 rounded-tr-sm opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/20 rounded-bl-sm opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
