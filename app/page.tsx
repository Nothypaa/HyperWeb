'use client'

import Link from 'next/link'
import { AnimatedHeading } from '@/components/ui/animated-heading'
import { FadeUp } from '@/components/ui/fade-up'
import { HelpCircle } from 'lucide-react'
import { useState } from 'react'
import MockupGrid from '@/components/MockupGrid'
import { Pricing } from '@/components/ui/pricing'
import { FAQ } from '@/components/ui/faq'
import { StarBorder } from '@/components/ui/star-border'
import { DemoOne } from '@/components/ui/contact-demo'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { Chatbot } from '@/components/ui/chatbot'
import { useAnchorNavigation } from '@/hooks/useAnchorNavigation'

export default function Home() {
  const { navigateToAnchor } = useAnchorNavigation()
  const [showTooltip, setShowTooltip] = useState(false)
  const [showMobileExpansion, setShowMobileExpansion] = useState(false)

  return (
    <main className="min-h-screen">
        {/* Hero Section */}
        <section className="flex min-h-screen flex-col items-center justify-center pt-8 md:pt-10 pb-16 md:pb-8 px-4 sm:px-6 md:px-32">
        <div className="text-center max-w-5xl mx-auto">
          <AnimatedHeading 
            text="La seule agence web Montpellier<br/>qui vous rembourse si votre site<br/>ne génère aucun résultat"
            mobileText="La seule agence web<br/>Montpellier qui<br/>vous rembourse si<br/>votre site ne génère<br/>aucun résultat"
            className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight uppercase"
            mobileClassName="text-4xl sm:text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 leading-tight uppercase"
            delay={50}
            staggerDelay={15}
          />
          
          <FadeUp delay={800} duration={800} distance={30}>
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-base sm:text-lg md:text-xl mb-8 md:mb-10 font-medium leading-relaxed">
                <>
                  <span className="opacity-75 text-gray-700 dark:text-gray-300">
                    Remboursement total. Site offert. Sans conditions. Sans questions.
                  </span>
                  {/* Tooltip outside opacity wrapper */}
                  <div 
                    className="relative inline-block ml-1"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                    {showTooltip && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 p-3 bg-black dark:bg-white text-white dark:text-black text-sm rounded-lg shadow-lg z-50 before:content-[''] before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black dark:before:border-t-white">
                        <p className="leading-relaxed">Votre satisfaction est notre priorité absolue. Si notre approche ne génère pas les résultats attendus, nous vous rembourserons intégralement ET vous gardez le site. Aucune condition, aucune question.</p>
                      </div>
                    )}
                  </div>
                </>
              </div>
            </div>
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

        {/* Pain Point Section */}
        <section className="py-40 md:py-48 px-6 md:px-32">
          <div className="max-w-5xl mx-auto">
            <FadeUp delay={200} duration={800} distance={30}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-16 leading-tight text-center uppercase">
                « J'ai payé des milliers d'euros pour un site web… et il n'apparaît jamais sur Google ! »
              </h2>
            </FadeUp>
            
            <FadeUp delay={400} duration={800} distance={20}>
              <div className="text-lg md:text-xl leading-loose text-gray-700 dark:text-gray-300 space-y-8">
                <p>
                  Beaucoup de chefs d'entreprise tombent dans le piège de payer des sommes énormes pour un site "magnifique" que personne ne trouve. Il est peut-être joli, mais sans véritable optimisation pour les moteurs de recherche (<Link href="/seo" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium transition-colors">SEO</Link>) et sans stratégie pour attirer les bons visiteurs, <span className="px-1 py-0.5 text-black" style={{backgroundColor: '#fffd01'}}>c'est comme ouvrir une boutique en plein désert</span> : <strong className="text-gray-900 dark:text-white">pas de trafic, pas de clients, aucun retour sur investissement.</strong>
                </p>
                
                <p>
                  Pour nous, un site web doit être bien plus qu'une simple vitrine digitale. C'est pourquoi nous créons des sites non seulement esthétiques, mais aussi construits sur des bases SEO solides, afin que votre entreprise soit trouvée par les personnes qui recherchent réellement vos services.
                </p>
                
                <p className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                  Et tout cela à un prix qui ne fera pas pâlir votre comptable.
                </p>
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
        
        {/* AI Chatbot */}
        <Chatbot />
    </main>
  )
}
