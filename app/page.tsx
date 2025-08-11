'use client'

import Link from 'next/link'
import { AnimatedHeading } from '@/components/ui/animated-heading'
import { FadeUp } from '@/components/ui/fade-up'
import MockupGrid from '@/components/MockupGrid'
import { Pricing } from '@/components/ui/pricing'
import { FAQ } from '@/components/ui/faq'
import { StarBorder } from '@/components/ui/star-border'
import { Testimonials } from '@/components/ui/testimonials-demo'
import { DemoOne } from '@/components/ui/contact-demo'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { useAnchorNavigation } from '@/hooks/useAnchorNavigation'

export default function Home() {
  const { navigateToAnchor } = useAnchorNavigation()

  return (
    <main className="min-h-screen">
        {/* Hero Section */}
        <section className="flex min-h-screen flex-col items-center justify-center pt-6 md:pt-10 pb-12 md:pb-8 px-6 md:px-32">
        <div className="text-center max-w-5xl mx-auto">
          <AnimatedHeading 
            text="Des sites conçus<br/>pour vendre."
            className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight"
            delay={100}
            staggerDelay={35}
          />
          
          <FadeUp delay={800} duration={800} distance={30}>
            <h2 className="text-center opacity-75 text-lg md:text-xl mb-8 md:mb-10 font-medium leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Garantie Satisfait ou Remboursé à 100%.<br />Pas de Résultats ? Vous Gardez le Site ET Récupérez Votre Argent.
            </h2>
          </FadeUp>
          
          {/* Button Container with staggered animation */}
          <FadeUp delay={1000} duration={800} distance={20}>
            <div className="flex items-center justify-center gap-3">
            <div className="relative dark:hidden">
              <button 
                onClick={() => navigateToAnchor('#portfolio')}
                className="bg-black text-white px-5 py-2.5 rounded-full font-bold text-base hover:bg-gray-800 transition-colors"
              >
                Sites réalisés
              </button>
            </div>
            <div className="relative hidden dark:block">
              <div className="absolute -inset-px rounded-full overflow-hidden">
                <div className="absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 opacity-100"
                     style={{
                       background: 'radial-gradient(circle, rgba(255,255,255,0.8), transparent 10%)',
                       animationDuration: '3s',
                     }}
                />
                <div className="absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0 opacity-100"
                     style={{
                       background: 'radial-gradient(circle, rgba(255,255,255,0.8), transparent 10%)',
                       animationDuration: '3s',
                     }}
                />
              </div>
              <button 
                onClick={() => navigateToAnchor('#portfolio')}
                className="relative z-10 bg-black text-white px-5 py-2.5 rounded-full font-bold text-base hover:bg-gray-800 transition-colors"
              >
                Sites réalisés
              </button>
            </div>
            <button 
              onClick={() => navigateToAnchor('#contact')}
              className="bg-white text-black px-5 py-2.5 rounded-full font-bold text-base hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 border border-gray-200 shadow-sm"
            >
              Devis gratuit
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg 
                  width="13" 
                  height="13" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
            </div>
          </FadeUp>
        </div>
        </section>

        {/* Portfolio Grid Section */}
        <section id="portfolio" className="pt-0 pb-4 md:pt-0 md:pb-12">
          <FadeUp delay={200} duration={1000} distance={40}>
            <MockupGrid />
          </FadeUp>
        </section>

      {/* Testimonials Section - Hidden */}
      <div className="hidden">
        <Testimonials />
      </div>

      {/* Pricing Section */}
      <section id="pricing">
        <Pricing 
          title="Nos Offres"
          description="Choisissez l'offre parfaite pour vos besoins de développement web"
          plans={[
            {
              name: "Site Web Essentiel",
              price: "€450",
              features: [
                "Design moderne, qui s'adapte au téléphone et à l'ordinateur",
                "Jusqu'à 5 pages (Accueil, Services, Contact, etc.)",
                "Formulaire de contact",
                "Référencement de base pour Google",
                "Mise en ligne du site",
                "Analyses du site et rapport mensuel",
              ],
              description: "Parfait pour les petites entreprises & startups",
              buttonText: "Demander un devis gratuit",
              href: "#contact",
              isPopular: false,
            },
            {
              name: "Site Web Premium",
              price: "€750",
              features: [
                "Tout du plan Essentiel",
                "Jusqu'à 9 pages",
                "Animations et interactions avancées",
                "Système de gestion de contenu (changer textes, images, etc. facilement)",
                "Intégration e-commerce pour vendre en ligne",
                "Fonctionnalités sur mesure selon vos besoins",
                "Optimisation des performances pour un site rapide",
                "Mise en ligne du site",
              ],
              description: "Solution complète pour entreprises en croissance",
              buttonText: "Demander un devis gratuit",
              href: "#contact",
              isPopular: true,
            },
            {
              name: "Solution Sur Mesure",
              price: "Nous contacter",
              features: [
                "Tout du Premium inclus",
                "Application web complexe",
                "Intégrations API avancées",
                "Tableau de bord administrateur",
                "Système d'authentification",
                "Base de données personnalisée",
                "Architecture scalable",
              ],
              description: "Prix adapté selon la complexité et vos besoins spécifiques",
              buttonText: "Demander un devis gratuit",
              href: "#contact",
              isPopular: false,
            },
          ]}
        />
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <FAQ />
      </section>
      
        {/* Contact Section */}
        <DemoOne />
    </main>
  )
}
