import { FAQ } from '@/components/ui/faq'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Questions Fréquentes | Agence HyperWeb',
  description: 'Toutes les réponses à vos questions sur la création de sites web modernes avec React et Next.js.',
  alternates: {
    canonical: 'https://agencehyperweb.com/faq',
  },
}

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto mb-8">
          <Breadcrumb currentPage="FAQ" />
        </div>
        
        <div className="flex flex-col items-center">
          <h1 className="text-5xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-black dark:text-white">
            FAQ
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 text-center">
            Toutes les réponses sur la création de sites web modernes
          </p>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto">
          <FAQ 
            title=""
            description=""
            items={[
              {
                question: "Pourquoi choisir React et Next.js pour mon site web ?",
                answer: "React et Next.js offrent des avantages techniques majeurs : performances exceptionnelles, SEO optimisé nativement, temps de chargement ultra-rapides, sécurité renforcée, et évolutivité maximale. Ces technologies modernes permettent des fonctionnalités avancées comme le rendu côté serveur, l'optimisation automatique des images, et une expérience utilisateur fluide. C'est l'avenir du web, contrairement aux solutions obsolètes comme WordPress."
              },
              {
                question: "Proposez-vous des solutions de paiement en plusieurs fois ?",
                answer: "Oui, nous proposons des facilités de paiement flexibles : paiement en 2x, 3x, ou 6x sans frais selon votre formule. Pour les projets Enterprise, des modalités spécifiques peuvent être négociées. Ces options vous permettent d'étaler l'investissement tout en démarrant rapidement votre projet. Contactez-nous pour discuter des modalités qui vous conviennent le mieux."
              },
              {
                question: "Proposez-vous la refonte de sites web existants ?",
                answer: "Absolument ! Nous sommes spécialisés dans la refonte de sites web obsolètes (WordPress, anciens CMS, sites non-responsives). Notre processus de migration préserve votre référencement existant tout en modernisant complètement votre présence web avec React/Next.js. Audit gratuit de votre site actuel et plan de migration détaillé fournis. La refonte apporte généralement +40% de performances et +25% de conversions."
              },
              {
                question: "Vos sites web sont-ils conformes au RGPD ?",
                answer: "Oui, tous nos sites web sont 100% conformes au RGPD et aux réglementations européennes. Nous intégrons : gestion des cookies avec consentement explicite, politique de confidentialité sur-mesure, système de suppression des données, audit de conformité inclus. Pour les entreprises, nous proposons également la conformité aux standards d'accessibilité WCAG 2.1. Documentation juridique et technique fournie."
              },
              {
                question: "Que comprend le support après livraison ?",
                answer: "Support complet inclus selon votre formule : • **Essentiel** (3 mois) : corrections bugs, mises à jour sécurité, assistance email. • **Premium** (6 mois) : tout du précédent + maintenance proactive, optimisations performances, support téléphonique. • **Enterprise** (12 mois) : support premium avec temps de réponse garanti <2h, hotline dédiée, évolutions mineures incluses. Possibilité d'extension après la période initiale."
              },
              {
                question: "Les sites sont-ils optimisés pour le référencement (SEO) ?",
                answer: "Oui, optimisation SEO complète incluse ! • **SEO de base** (toutes formules) : structure HTML sémantique, balises meta optimisées, sitemap automatique, Core Web Vitals >90/100, optimisation images. • **SEO avancé** (Premium/Enterprise) : analyse mots-clés, stratégie contenu, schema markup, suivi positions Google Search Console. Nos sites atteignent généralement la première page Google en 2-4 mois."
              },
              {
                question: "Travaillez-vous avec des entreprises de toutes tailles ?",
                answer: "Absolument ! Nos références incluent : startups tech (€450-750), PME en croissance (€750-1,100), et grandes entreprises (€1,100+). Exemples récents : boutique e-commerce (x3 ventes en 6 mois), cabinet d'avocat (première page Google en 3 mois), startup SaaS (25% d'augmentation conversions). Notre approche modulaire et nos 3 formules s'adaptent parfaitement à chaque taille d'organisation et budget."
              }
            ]}
          />
        </div>
      </div>
    </main>
  )
}