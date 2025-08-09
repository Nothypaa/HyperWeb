"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
    <section className="py-32 md:py-40" id="pricing">
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
          <h2 className="text-pretty text-4xl font-black tracking-tighter lg:text-6xl">
            {title}
          </h2>
          <p className="text-center opacity-75 lg:text-xl">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-9xl mt-12">
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
                  "rounded-2xl border-[1px] p-6 bg-background text-center relative flex flex-col z-10",
                  plan.isPopular ? "border-primary border-2 shadow-lg z-20" : "border-border",
                  "h-full"
                )}
              >

                
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

                  <ul className="space-y-4 mb-6 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-left">
                        <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Guarantee Section */}
                  <GuaranteeSection />

                  <div className="mt-auto">
                    <Link
                      href={plan.href}
                      className="w-full bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full font-bold text-base hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
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

// Guarantee Section Component
function GuaranteeSection() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showMobileExpansion, setShowMobileExpansion] = useState(false);

  const explanationText = "Votre satisfaction est notre priorité absolue. Si notre approche ne génère pas les résultats attendus, c'est que nous n'avons pas été à la hauteur de la confiance que vous nous avez accordée. Dans ce cas, nous vous rembourserons intégralement.";

  return (
    <div className="mb-4 px-2">
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-medium text-green-700 dark:text-green-400">
          ✓ Garantie satisfait ou remboursé
        </span>
        
        {/* Desktop Tooltip */}
        <div 
          className="relative hidden md:block"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 p-3 bg-black dark:bg-white text-white dark:text-black text-sm rounded-lg shadow-lg z-50 before:content-[''] before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black dark:before:border-t-white">
              <p className="leading-relaxed">{explanationText}</p>
            </div>
          )}
        </div>

        {/* Mobile Clickable Icon */}
        <button
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-full p-1"
          onClick={() => setShowMobileExpansion(!showMobileExpansion)}
          aria-label="Plus d'informations sur la garantie"
        >
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Mobile Expandable Section */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          showMobileExpansion 
            ? 'max-h-32 opacity-100 mt-3' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-300">
            {explanationText}
          </p>
        </div>
      </div>
    </div>
  );
}