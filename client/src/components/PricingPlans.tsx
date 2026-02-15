import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Building2, Rocket } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type BillingCycle = 'monthly' | 'annual';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: PlanFeature[];
  highlight?: boolean;
  ctaText: string;
  icon: React.ElementType;
}

const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for side projects and learning.',
    price: { monthly: 0, annual: 0 },
    icon: Rocket,
    ctaText: 'Start Building',
    features: [
      { text: 'Up to 1K API calls per month', included: true },
      { text: 'Basic data ingestion pipelines', included: true },
      { text: 'Web console access', included: true },
      { text: 'Community support', included: true },
      { text: 'Basic monitoring & alerts', included: true },
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'For power users and growing teams.',
    price: { monthly: 49, annual: 470 },
    icon: Zap,
    highlight: true,
    ctaText: 'Upgrade to Pro',
    features: [
      { text: 'Unlimited API calls', included: true },
      { text: 'Advanced reasoning models', included: true },
      { text: 'Performance analytics & insights', included: true },
      { text: 'Custom workflows & integrations', included: true },
      { text: 'Priority support with SLA', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large-scale mission-critical systems.',
    price: { monthly: 999, annual: 9999 },
    icon: Building2,
    ctaText: 'Contact Sales',
    features: [
      { text: 'On-premises & private cloud', included: true },
      { text: 'Advanced security & compliance', included: true },
      { text: 'Dedicated support team', included: true },
      { text: 'Team management & audit logs', included: true },
      { text: 'Custom model fine-tuning', included: true },
    ],
  }
];

export function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <section className="relative w-full overflow-hidden bg-background py-24 text-foreground selection:bg-primary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-sans"
          >
            Pricing Plans
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Choose the perfect plan for your needs. Always flexible.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <span className={cn("text-sm transition-colors", billingCycle === 'monthly' ? "text-foreground font-medium" : "text-muted-foreground")}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(c => c === 'monthly' ? 'annual' : 'monthly')}
              className="relative h-8 w-14 rounded-full bg-muted p-1 ring-1 ring-border transition-all hover:ring-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <motion.div
                className="h-6 w-6 rounded-full bg-primary shadow-sm"
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                animate={{ x: billingCycle === 'monthly' ? 0 : 24 }}
              />
            </button>
            <span className={cn("text-sm transition-colors flex items-center gap-2", billingCycle === 'annual' ? "text-foreground font-medium" : "text-muted-foreground")}>
              Annual
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary ring-1 ring-inset ring-primary/20">
                Save 20%
              </span>
            </span>
          </motion.div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 xl:gap-10">
          {plans.map((plan, index) => (
            <PriceCard 
              key={plan.id} 
              plan={plan} 
              billingCycle={billingCycle} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceCard({ plan, billingCycle, index }: { plan: PricingPlan; billingCycle: BillingCycle; index: number }) {
  const isCustom = plan.price.monthly > 500;
  const priceDisplay = isCustom 
    ? 'Custom' 
    : `$${billingCycle === 'monthly' ? plan.price.monthly : Math.floor(plan.price.annual / 12)}`;
  
  const Icon = plan.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      className={cn(
        "relative flex flex-col rounded-3xl p-8 backdrop-blur-xl transition-all duration-300",
        plan.highlight 
          ? "bg-muted border-2 border-primary shadow-xl md:-mt-4 md:mb-4 lg:z-10" 
          : "bg-card border border-border hover:border-primary/50"
      )}
    >
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <div className={cn("mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl", plan.highlight ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
      </div>

      <div className="mb-6 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight text-foreground">
           {priceDisplay}
        </span>
        {!isCustom && (
          <span className="text-sm text-muted-foreground">
            /mo
            {billingCycle === 'annual' && <span className="block text-xs font-normal text-primary">billed annually</span>}
          </span>
        )}
      </div>

      <ul className="mb-8 flex-1 space-y-4">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
            <Check className={cn("h-5 w-5 shrink-0", plan.highlight ? "text-primary" : "text-primary/60")} />
            <span className="leading-5">{feature.text}</span>
          </li>
        ))}
      </ul>

      <button
        className={cn(
          "group inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          plan.highlight
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        {plan.ctaText}
        <Zap className={cn("h-4 w-4 transition-transform group-hover:fill-current", plan.highlight ? "" : "opacity-0")} />
      </button>
    </motion.div>
  );
}
