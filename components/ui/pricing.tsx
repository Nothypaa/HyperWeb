"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Nos Offres",
  description = "Choisissez l'offre parfaite pour vos besoins de développement web",
}: PricingProps) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-pretty text-4xl font-black tracking-tighter lg:text-6xl">
            {title}
          </h2>
          <p className="text-center opacity-75 lg:text-xl">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mt-12">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{
                  y: plan.isPopular ? -10 : 0,
                  opacity: 1,
                  scale: plan.isPopular ? 1.05 : 1.0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 30,
                  delay: index * 0.1,
                }}
                className={cn(
                  "rounded-2xl border-[1px] p-6 bg-background text-center relative flex flex-col",
                  plan.isPopular ? "border-primary border-2 shadow-lg" : "border-border",
                  "h-full"
                )}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-primary py-1 px-3 rounded-bl-xl rounded-tr-xl flex items-center">
                    <Star className="text-primary-foreground h-4 w-4 fill-current" />
                    <span className="text-primary-foreground ml-1 font-semibold text-sm">
                      Populaire
                    </span>
                  </div>
                )}
                
                <div className="flex-1 flex flex-col">
                  <p className="text-base font-semibold text-muted-foreground mb-2">
                    {plan.name}
                  </p>
                  
                  <div className="mt-4 mb-4">
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      {plan.price}
                    </span>
                  </div>

                  <p className="text-center opacity-75 text-sm mb-6">
                    Paiement unique <span className="text-base font-medium">OU</span> en plusieurs fois
                  </p>

                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-left">
                        <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      href={plan.href}
                      className={cn(
                        "w-full bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full font-bold text-base hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2",
                        plan.isPopular && "bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground"
                      )}
                    >
                      {plan.buttonText}
                    </Link>
                    
                    <p className="mt-4 text-xs leading-5 text-muted-foreground text-center">
                      {plan.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}