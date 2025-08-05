import MockupGrid from '@/components/MockupGrid'
import { Pricing } from '@/components/ui/pricing'
import { FAQ } from '@/components/ui/faq'
import { StarBorder } from '@/components/ui/star-border'
import { Testimonials } from '@/components/ui/testimonials-demo'
import { DemoOne } from '@/components/ui/contact-demo'
import { AuroraBackground } from '@/components/ui/aurora-background'

export default function Home() {
  return (
    <main className="min-h-screen">
        {/* Hero Section */}
        <section className="flex min-h-screen flex-col items-center justify-center pt-10 pb-20 px-20">
        <div className="text-center">
          <h1 className="text-7xl lg:text-8xl font-black tracking-tighter text-gray-900 dark:text-white mb-8">
            Des sites conçus<br/>pour vendre.
          </h1>
          <p className="text-center opacity-75 text-xl mb-8">
            Garantie Satisfait ou Remboursé à 100%.<br />Pas de Résultats ? Vous Gardez le Site ET Récupérez Votre Argent.
          </p>
          
          {/* Button Container */}
          <div className="flex items-center justify-center gap-3">
            <div className="relative dark:hidden">
              <button className="bg-black text-white px-5 py-2.5 rounded-full font-bold text-base hover:bg-gray-800 transition-colors">
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
              <button className="relative z-10 bg-black text-white px-5 py-2.5 rounded-full font-bold text-base hover:bg-gray-800 transition-colors">
                Sites réalisés
              </button>
            </div>
            <a href="#contact" className="bg-white text-black px-5 py-2.5 rounded-full font-bold text-base hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 border border-gray-200 shadow-sm">
              Nous contacter
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
            </a>
          </div>
        </div>
        </section>

        {/* Portfolio Grid Section */}
      <MockupGrid />

      {/* Testimonials Section */}
      <Testimonials />

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
                "Design moderne et responsive",
                "Jusqu'à 5 pages",
                "Intégration formulaire de contact",
                "Optimisation SEO",
                "Approche mobile-first",
                "3 mois de support",
              ],
              description: "Parfait pour les petites entreprises & startups",
              buttonText: "Commencer",
              href: "#contact",
              isPopular: false,
            },
            {
              name: "Site Web Premium",
              price: "€750",
              features: [
                "Pages illimitées",
                "Animations et interactions avancées",
                "Système de gestion de contenu",
                "Intégration e-commerce",
                "Fonctionnalités sur mesure",
                "Optimisation des performances",
                "6 mois de support et maintenance",
                "Timeline de développement prioritaire",
              ],
              description: "Solution complète pour entreprises en croissance",
              buttonText: "Lancer Votre Projet",
              href: "#contact",
              isPopular: true,
            },
            {
              name: "Site Web Enterprise",
              price: "€1,100+",
              features: [
                "Tout du Premium inclus",
                "Application web complexe",
                "Intégrations API avancées",
                "Tableau de bord administrateur",
                "Système d'authentification",
                "Base de données personnalisée",
                "Architecture scalable",
                "12 mois de support premium",
                "Formations équipe incluses",
              ],
              description: "Pour les grandes entreprises avec besoins spécifiques",
              buttonText: "Contactez-nous",
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
