import { useServices } from "@/hooks/use-content";
import { Check, Cpu, Terminal, Globe, Shield, Database, Layout } from "lucide-react";
import { TechCard } from "@/components/TechCard";

const icons: Record<string, any> = {
  cpu: Cpu,
  terminal: Terminal,
  globe: Globe,
  shield: Shield,
  database: Database,
  layout: Layout,
};

export default function Services() {
  const { data: services, isLoading } = useServices();

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Technical Services</h1>
        <p className="text-xl text-muted-foreground">
          Specialized engineering solutions for modern businesses. From concept to deployment, 
          I deliver production-grade software.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 rounded-xl bg-muted/20 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => {
            const Icon = icons[service.icon] || Terminal;
            
            return (
              <TechCard 
                key={service.id}
                title={service.title}
                subtitle="Active Client"
                className="flex flex-col h-full"
                headerRight={<Icon className="w-4 h-4 text-muted-foreground" />}
              >
                <div className="mb-6">
                  <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-6 border border-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed min-h-[80px]">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-border/50">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Starting at</span>
                    <span className="text-lg font-bold font-mono">{service.priceRange || "Custom"}</span>
                  </div>
                </div>
              </TechCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
