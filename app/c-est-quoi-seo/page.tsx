import Link from 'next/link'
import { FadeUp } from '@/components/ui/fade-up'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "C'est quoi SEO ? Guide Simple | Agence HyperWeb",
  description: 'Guide simple et clair pour comprendre le SEO et comment être trouvé sur Google. Explications et conseils pratiques.',
  alternates: {
    canonical: 'https://agencehyperweb.com/c-est-quoi-seo',
  },
}

export default function SEOPage() {
  return (
    <main className="min-h-screen pt-40 pb-20 px-6 md:px-32">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <FadeUp delay={100} duration={800} distance={30}>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              C'est quoi SEO ?
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Le guide simple pour comprendre comment être trouvé sur Google
            </p>
          </div>
        </FadeUp>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          
          <FadeUp delay={300} duration={800} distance={20}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                SEO = Search Engine Optimization
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Imaginez que votre site internet est un magasin. Le SEO, c'est comme mettre un grand panneau lumineux devant votre magasin pour que les gens le voient depuis la route.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Quand quelqu'un tape "plombier Montpellier" sur Google, le SEO aide votre site à apparaître en premier dans les résultats. Sans SEO, c'est comme avoir un magasin caché dans une ruelle sombre - personne ne vous trouve.
              </p>
            </section>
          </FadeUp>

          <FadeUp delay={400} duration={800} distance={20}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Comment ça marche ?
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Les mots-clés</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Ce sont les mots que vos clients tapent sur Google. Si vous êtes dentiste, vos mots-clés sont "dentiste", "mal aux dents", "urgence dentaire", etc.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Le contenu utile</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Google aime les sites qui aident vraiment les gens. Si votre site répond aux questions de vos clients, Google le montre en premier.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. La technique</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Votre site doit être rapide, fonctionner sur téléphone, et être facile à utiliser. Google n'aime pas les sites lents ou compliqués.
                </p>
              </div>
            </section>
          </FadeUp>

          <FadeUp delay={500} duration={800} distance={20}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Les chiffres qui prouvent l'importance du SEO
              </h2>
              
              {/* Statistics Section */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Faits réels sur le SEO</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">90%+</div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      des gens ne regardent <strong>jamais</strong> la page 2 de Google
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Source: Études SEO consolidées</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">28%</div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      des gens cliquent sur le 1er résultat Google
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Source: Backlinko</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">55%</div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      plus de visiteurs avec un blog SEO actif
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Source: HubSpot</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">3-6</div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      mois pour voir les premiers résultats SEO
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Source: Consensus industrie</p>
                  </div>
                </div>
              </div>

              {/* Real Impact Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Pourquoi les entreprises investissent dans le SEO
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 border-l-4 border-gray-400 p-4 rounded-r-lg mb-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                    <strong>Fait vérifiable:</strong> Les entreprises qui apparaissent en première position Google reçoivent en moyenne 28,5% de tous les clics pour leur mot-clé.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                    <strong>Impact financier:</strong> Une étude HubSpot montre que les entreprises avec un blog actif (SEO) génèrent 55% de visiteurs en plus.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>Retour sur investissement:</strong> Le SEO a un meilleur <span className="relative group cursor-help underline decoration-dotted">ROI<span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-800 dark:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">Return On Investment (Retour sur Investissement)</span></span> que la publicité payante à long terme selon Google.
                  </p>
                </div>
                <p className="text-xs text-gray-500">Sources: Backlinko, HubSpot, Google Economic Impact Report</p>
              </div>

              {/* Comparison Section */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Page 1 vs Page 2 Google</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">Page 1 Google</h4>
                      <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">92%</div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">de tous les clics</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4">
                      <h4 className="font-bold text-gray-700 dark:text-gray-400 mb-2">Page 2 Google</h4>
                      <div className="text-3xl font-black text-gray-600 dark:text-gray-500 mb-1">8%</div>
                      <p className="text-sm text-gray-600 dark:text-gray-500">de tous les clics</p>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-sm">
                  Être en page 2, c'est être invisible pour 92% des gens
                </p>
                <p className="text-xs text-gray-500 text-center mt-2">Source: Advanced Web Ranking, 2023</p>
              </div>
            </section>
          </FadeUp>

          <FadeUp delay={600} duration={800} distance={20}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Combien de temps ça prend ?
              </h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <strong>3 à 6 mois</strong> pour voir les premiers résultats. Le SEO, c'est comme planter un arbre - ça prend du temps, mais ensuite ça dure des années.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  C'est pour ça que beaucoup d'agences ne garantissent pas leurs résultats. Nous, on le fait parce qu'on sait comment bien faire.
                </p>
              </div>
            </section>
          </FadeUp>

          <FadeUp delay={700} duration={800} distance={20}>
            <section className="text-center bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Prêt à être trouvé sur Google ?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                On s'occupe de tout le SEO pour vous. Si ça ne marche pas, on vous rembourse.
              </p>
              <Link 
                href="/#contact"
                className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors"
              >
                Demander un devis gratuit
              </Link>
            </section>
          </FadeUp>

        </div>
      </div>
    </main>
  )
}