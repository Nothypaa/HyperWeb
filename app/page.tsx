import MockupGrid from '@/components/MockupGrid'
import { Pricing2 } from '@/components/ui/pricing2'
import { StarBorder } from '@/components/ui/star-border'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <h1 className="text-6xl lg:text-7xl font-black tracking-tighter text-gray-900 dark:text-white mb-4">
            Des sites conçus<br/>pour vendre.
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
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
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 opacity-70"
                     style={{
                       background: 'radial-gradient(circle, rgba(255,255,255,0.8), transparent 10%)',
                       animationDuration: '6s',
                     }}
                />
                <div className="absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0 opacity-70"
                     style={{
                       background: 'radial-gradient(circle, rgba(255,255,255,0.8), transparent 10%)',
                       animationDuration: '6s',
                     }}
                />
              </div>
              <button className="relative z-10 bg-black text-white px-5 py-2.5 rounded-full font-bold text-base hover:bg-gray-800 transition-colors">
                Sites réalisés
              </button>
            </div>
            <button className="bg-white text-black px-5 py-2.5 rounded-full font-bold text-base hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 border border-gray-200 shadow-sm">
              Voir nos tarifs
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
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <MockupGrid />

      {/* Pricing Section */}
      <Pricing2 
        heading="Nos Offres"
        description="Choisissez l'offre parfaite pour vos besoins de développement web"
        plans={[
          {
            id: "essential",
            name: "Site Web Essentiel",
            description: "Parfait pour les petites entreprises & startups",
            monthlyPrice: "€450",
            yearlyPrice: "€450",
            features: [
              { text: "Design moderne et responsive" },
              { text: "Jusqu'à 5 pages" },
              { text: "Intégration formulaire de contact" },
              { text: "Optimisation SEO" },
              { text: "Approche mobile-first" },
              { text: "3 mois de support" },
            ],
            button: {
              text: "Commencer",
              url: "#contact",
            },
          },
          {
            id: "premium",
            name: "Site Web Premium",
            description: "Solution complète pour entreprises en croissance",
            monthlyPrice: "€1,100",
            yearlyPrice: "€1,100",
            features: [
              { text: "Pages illimitées" },
              { text: "Animations et interactions avancées" },
              { text: "Système de gestion de contenu" },
              { text: "Intégration e-commerce" },
              { text: "Fonctionnalités sur mesure" },
              { text: "Optimisation des performances" },
              { text: "6 mois de support et maintenance" },
              { text: "Timeline de développement prioritaire" },
            ],
            button: {
              text: "Lancer Votre Projet",
              url: "#contact",
            },
          },
        ]}
      />
    </main>
  )
}