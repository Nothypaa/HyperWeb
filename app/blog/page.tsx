import BlogGrid from '@/components/ui/blog-grid'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { FAQ } from '@/components/ui/faq'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Articles et Conseils Web | Agence HyperWeb',
  description: 'Découvrez nos articles sur le développement web, SEO, et stratégies digitales pour votre entreprise à Montpellier.',
  alternates: {
    canonical: 'https://agencehyperweb.com/blog',
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto mb-8">
          <Breadcrumb currentPage="Blog" />
        </div>
        
        <div className="flex justify-center mb-32">
          <h1 className="text-5xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-black dark:text-white">
            BLOG
          </h1>
        </div>
        
        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto">
          <BlogGrid />
        </div>
        
        {/* FAQ Section - No Title */}
        <div className="max-w-7xl mx-auto mt-16">
          <FAQ 
            title=""
            description=""
            items={[
              {
                question: "Pourquoi mon entreprise a-t-elle besoin d'un blog sur son site web ?",
                answer: "Un blog professionnel apporte plusieurs avantages stratégiques : **amélioration du référencement naturel** (67% de trafic organique supplémentaire), **génération de leads qualifiés** (126% de leads en plus), **positionnement d'expert** dans votre secteur, et **engagement client** renforcé. Le content marketing coûte 62% moins cher que le marketing traditionnel tout en générant 3x plus de leads. Pour les entreprises françaises, un blog permet de cibler des mots-clés locaux et d'établir une relation de confiance avec vos prospects."
              },
              {
                question: "Combien de temps faut-il pour voir des résultats SEO avec un blog ?",
                answer: "Les premiers résultats SEO d'un blog apparaissent selon ce calendrier : **1-3 mois** pour l'indexation des premiers articles par Google, **3-6 mois** pour une amélioration notable du trafic organique (15-30% d'augmentation), **6-12 mois** pour le positionnement sur des mots-clés concurrentiels, et **12+ mois** pour établir une autorité de domaine stable. Le marché français étant moins saturé, les entreprises peuvent souvent voir des résultats plus rapidement sur des requêtes locales."
              },
              {
                question: "Quelle approche technique choisir pour mon blog d'entreprise ?",
                answer: "Le **développement sur mesure** (recommandé par Hyperweb) offre un contrôle total du code et des performances, un SEO parfaitement optimisé selon vos besoins, un design unique, une sécurité renforcée et une évolutivité maximale. Contrairement aux solutions clé en main (Wix, Squarespace) qui ont des limitations SEO importantes et des performances souvent médiocres, notre approche utilise des technologies modernes pour garantir performance, sécurité et résultats SEO optimaux."
              }
            ]}
          />
        </div>
      </div>
    </main>
  )
}