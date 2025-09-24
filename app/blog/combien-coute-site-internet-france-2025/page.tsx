import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Combien coûte un site internet en France en 2025 | Guide Complet Tarifs',
  description: 'Prix détaillé des sites internet en France en 2025. Tarifs agences web, freelances, coûts cachés. Guide complet par HyperWeb pour éviter les pièges.',
  keywords: 'prix site internet, tarif site web France, coût création site 2025, agence web tarifs, devis site internet',
  alternates: {
    canonical: 'https://agencehyperweb.com/blog/combien-coute-site-internet-france-2025',
  },
  openGraph: {
    title: 'Combien coûte un site internet en France en 2025 | Guide Complet Tarifs',
    description: 'Prix détaillé des sites internet en France en 2025. Tarifs transparents et conseils pour éviter les pièges.',
    url: 'https://agencehyperweb.com/blog/combien-coute-site-internet-france-2025',
    type: 'article',
    images: [
      {
        url: 'https://agencehyperweb.com/prix-cout-site-internet-france-2025-tarifs-agence-web.webp',
        width: 1200,
        height: 630,
        alt: 'Prix création site internet France 2025 - développement web professionnel tarifs agence web',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Combien coûte un site internet en France en 2025 | Guide Complet Tarifs',
    description: 'Prix détaillé des sites internet en France en 2025. Tarifs transparents et conseils pour éviter les pièges.',
    images: ['https://agencehyperweb.com/prix-cout-site-internet-france-2025-tarifs-agence-web.webp'],
  },
}

// Lightning Icon Component (using emoji - learned from first blog)
const LightningIcon: React.FC<{ className?: string }> = ({ className }) => (
  <span
    className={`inline-flex items-center filter grayscale ${className}`}
    style={{ fontSize: '12px', lineHeight: '1' }}
  >
    ⚡
  </span>
)

// Tooltip Component - using only inline elements
const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <span className="relative group inline-block">
    <span className="cursor-help border-b border-dotted border-gray-400 dark:border-gray-500">
      {children}
    </span>
    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 block">
      {text}
      <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100 block"></span>
    </span>
  </span>
)

export default function PricingBlogPostPage() {
  // BlogPosting + PriceSpecification Schema for SEO
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": ["BlogPosting", "PriceSpecification"],
    "headline": "Combien coûte un site internet en France en 2025",
    "description": "Prix détaillé des sites internet en France en 2025. Tarifs agences web, freelances, coûts cachés. Guide complet pour éviter les pièges.",
    "image": "https://agencehyperweb.com/prix-cout-site-internet-france-2025-tarifs-agence-web.webp",
    "author": {
      "@type": "Organization",
      "name": "HyperWeb",
      "url": "https://agencehyperweb.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "HyperWeb",
      "logo": {
        "@type": "ImageObject",
        "url": "https://agencehyperweb.com/HyperWeb-logo/Hyperweb-nobg.svg"
      }
    },
    "datePublished": "2025-09-16",
    "dateModified": "2025-09-16",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://agencehyperweb.com/blog/combien-coute-site-internet-france-2025"
    },
    "keywords": "prix site internet, tarif site web France, coût création site 2025, agence web tarifs",
    "articleSection": "Guide Tarifs",
    "wordCount": 3000,
    "inLanguage": "fr-FR",
    "priceCurrency": "EUR",
    "price": "450-25000",
    "offers": [
      {
        "@type": "Offer",
        "name": "Site Vitrine Essentiel",
        "price": "450",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "name": "Site E-commerce Premium",
        "price": "1100",
        "priceCurrency": "EUR"
      }
    ]
  }

  return (
    <>
      {/* BlogPosting + Pricing Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />

      <main className="min-h-screen">
        <div className="container mx-auto px-4 pt-32 pb-20">
          {/* Breadcrumb Navigation */}
          <div className="max-w-7xl mx-auto mb-8">
            <Breadcrumb
              currentPage="Combien coûte un site internet en France en 2025"
              items={[
                { label: "Blog", href: "/blog" }
              ]}
            />
          </div>

          {/* Article Header */}
          <div className="max-w-4xl mx-auto">
            {/* Category and Date */}
            <div className="flex items-center gap-2 mb-8">
              <LightningIcon className="w-4 h-4 text-gray-500 dark:text-gray-500" />
              <span className="text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                GUIDE TARIFS
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-500">•</span>
              <span className="text-sm text-gray-500 dark:text-gray-500">
                16 septembre 2025 • 17:56
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black dark:text-white mb-8 leading-tight">
              Combien coûte un site internet en France en 2025
            </h1>

            {/* Summary Section */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Ce que vous allez découvrir dans ce guide
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Ce guide transparent vous révèle les vrais coûts de création d'un site internet en France en 2025.
                Vous découvrirez les fourchettes de prix réelles, comment éviter les arnaques, calculer votre ROI,
                et choisir la solution adaptée à votre budget et vos objectifs.
              </p>
              <ul className="list-none space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Tarifs détaillés par type de site</li>
                <li>• Coûts cachés à éviter</li>
                <li>• Comparatif freelance vs agence</li>
              </ul>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <Image
                src="/HyperWeb-logo/Hyperweb-nobg.svg"
                alt="HyperWeb Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div>
                <div className="font-semibold text-black dark:text-white">Rédigé par HyperWeb</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Agence web à Montpellier spécialisée en développement siteweb & SEO</div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="w-full aspect-[16/9] mb-8 rounded-2xl overflow-hidden">
              <Image
                src="/prix-cout-site-internet-france-2025-tarifs-agence-web.webp"
                alt="Prix création site internet France 2025 - développement web professionnel tarifs agence web"
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Introduction */}
            <div className="max-w-none mb-12">
              <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-normal">
                En 2025, investir dans un site internet performant est un choix stratégique pour toute entreprise en France.
                Mais le prix d'un site internet dépend de nombreux facteurs : objectifs, design, fonctionnalités et ambition digitale.
                Ce guide transparent vous révèle les vrais coûts et vous aide à éviter les pièges.
              </p>
            </div>

            {/* Article Content */}
            <article className="max-w-none">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-8">

                <h2 className="text-3xl font-bold text-black dark:text-white mt-12 mb-6">
                  Fourchettes de prix réelles en France en 2025
                </h2>

                <p>
                  Contrairement aux idées reçues, il n'existe pas de "prix standard" pour un site internet.
                  Voici les vraies fourchettes pratiquées sur le marché français en 2025 :
                </p>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 my-8">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-6">
                    Tarifs par type de site (France 2025)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 font-bold text-black dark:text-white">Type de site</th>
                          <th className="text-left py-3 font-bold text-black dark:text-white">Prix moyen</th>
                          <th className="text-left py-3 font-bold text-black dark:text-white">Délai</th>
                          <th className="text-left py-3 font-bold text-black dark:text-white">Inclus</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-4"><strong>Site vitrine simple</strong><br/>5-10 pages</td>
                          <td className="py-4 text-black dark:text-white font-bold">450€ - 1 200€</td>
                          <td className="py-4">2-4 semaines</td>
                          <td className="py-4 text-xs">Design, SEO de base, responsive</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-4"><strong>Site corporate</strong><br/>10-20 pages</td>
                          <td className="py-4 text-black dark:text-white font-bold">750€ - 2 500€</td>
                          <td className="py-4">3-6 semaines</td>
                          <td className="py-4 text-xs">Design sur-mesure, SEO avancé, blog</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-4"><strong>Site e-commerce</strong><br/>Boutique en ligne</td>
                          <td className="py-4 text-black dark:text-white font-bold">1 100€ - 5 000€</td>
                          <td className="py-4">4-8 semaines</td>
                          <td className="py-4 text-xs">Paiement, gestion stock, admin</td>
                        </tr>
                        <tr>
                          <td className="py-4"><strong>Plateforme sur-mesure</strong><br/>Web app, SaaS</td>
                          <td className="py-4 text-black dark:text-white font-bold">5 000€ - 25 000€+</td>
                          <td className="py-4">8+ semaines</td>
                          <td className="py-4 text-xs">Développement spécifique, API</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 border-l-4 border-gray-400 dark:border-gray-600 rounded-r-2xl p-6 my-8">
                  <p className="text-gray-900 dark:text-gray-100 font-medium">
                    <strong>Chez HyperWeb :</strong> Nos tarifs débutent à 450€ pour un site vitrine et 750€ pour un site premium.
                    Toujours avec SEO natif, performances optimales et support inclus.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-black dark:text-white mt-12 mb-6">
                  Les coûts cachés que les agences ne mentionnent pas
                </h2>

                <p>
                  Attention aux devis qui semblent "trop beaux pour être vrais". Voici les coûts supplémentaires
                  souvent oubliés ou dissimulés :
                </p>

                <div className="bg-gray-50 dark:bg-gray-900 border-l-4 border-gray-400 dark:border-gray-600 rounded-r-2xl p-6 my-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Coûts cachés fréquents :
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Techniques</h4>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                        <li>• <strong><Tooltip text="Nom de domaine (.fr, .com) nécessaire pour votre site">Nom de domaine</Tooltip> :</strong> 10-50€/an</li>
                        <li>• <strong>Hébergement :</strong> 60-300€/an</li>
                        <li>• <strong>Certificat SSL :</strong> 0-200€/an</li>
                        <li>• <strong>Sauvegardes :</strong> 20-100€/an</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Contenu</h4>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                        <li>• <strong>Rédaction web :</strong> 50-150€/page</li>
                        <li>• <strong>Photos professionnelles :</strong> 300-1000€</li>
                        <li>• <strong>Traduction :</strong> 0,10-0,25€/mot</li>
                        <li>• <strong>Vidéos :</strong> 500-3000€</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 border-l-4 border-gray-400 dark:border-gray-600 rounded-r-2xl p-6 my-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Ce qui devrait TOUJOURS être inclus :
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <ul className="space-y-2 text-gray-800 dark:text-gray-200 text-sm">
                        <li>• Design responsive (mobile/tablette)</li>
                        <li>• Optimisation SEO de base</li>
                        <li>• <Tooltip text="Certificat de sécurité HTTPS obligatoire">SSL gratuit</Tooltip> (Let's Encrypt)</li>
                        <li>• Formation à l'administration</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-2 text-gray-800 dark:text-gray-200 text-sm">
                        <li>• Tests sur tous navigateurs</li>
                        <li>• Optimisation des performances</li>
                        <li>• Support technique initial</li>
                        <li>• Livraison des fichiers sources</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-black dark:text-white mt-12 mb-6">
                  Freelance vs Agence vs Plateformes : Le vrai comparatif
                </h2>

                <p>
                  Chaque option a ses avantages et inconvénients. Voici un comparatif objectif basé
                  sur notre expérience du marché français :
                </p>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 my-8">
                  <div className="grid lg:grid-cols-3 gap-6">

                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <h4 className="text-lg font-bold text-black dark:text-white mb-3">
                        Freelance
                      </h4>
                      <div className="mb-4">
                        <div className="text-black dark:text-white font-bold text-lg">300€ - 2 000€</div>
                        <div className="text-xs text-gray-500">Prix moyen</div>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="text-gray-700 dark:text-gray-300 font-medium mb-1">Avantages</div>
                          <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Prix attractif</li>
                            <li>• Relation directe</li>
                            <li>• Flexibilité</li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-gray-700 dark:text-gray-300 font-medium mb-1">Risques</div>
                          <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Disponibilité limitée</li>
                            <li>• Compétences variables</li>
                            <li>• Pas de garantie long terme</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-gray-400 dark:border-gray-600 rounded-xl p-4 relative">
                      <div className="absolute -top-3 left-4 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 px-2 py-1 text-xs rounded font-bold">
                        RECOMMANDÉ
                      </div>
                      <h4 className="text-lg font-bold text-black dark:text-white mb-3">
                        Agence Web
                      </h4>
                      <div className="mb-4">
                        <div className="text-black dark:text-white font-bold text-lg">450€ - 5 000€</div>
                        <div className="text-xs text-gray-500">Prix HyperWeb</div>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="text-gray-700 dark:text-gray-300 font-medium mb-1">Avantages</div>
                          <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Équipe complète</li>
                            <li>• Garanties contractuelles</li>
                            <li>• Support long terme</li>
                            <li>• Expertise polyvalente</li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-gray-700 dark:text-gray-300 font-medium mb-1">À noter</div>
                          <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Prix plus élevé</li>
                            <li>• Processus structuré</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <h4 className="text-lg font-bold text-black dark:text-white mb-3">
                        Plateformes DIY
                      </h4>
                      <div className="mb-4">
                        <div className="text-black dark:text-white font-bold text-lg">0€ - 50€/mois</div>
                        <div className="text-xs text-gray-500">Wix, Squarespace</div>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="text-gray-700 dark:text-gray-300 font-medium mb-1">Avantages</div>
                          <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Prix minimal</li>
                            <li>• Interface simple</li>
                            <li>• Démarrage rapide</li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-gray-700 dark:text-gray-300 font-medium mb-1">Limites</div>
                          <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• SEO très limité</li>
                            <li>• Design générique</li>
                            <li>• Performances faibles</li>
                            <li>• Dépendance totale</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-black dark:text-white mt-12 mb-6">
                  Calculer le <Tooltip text="Return on Investment - Retour sur investissement de votre site web">ROI</Tooltip> de votre investissement web
                </h2>

                <p>
                  Un site internet n'est pas une dépense, c'est un investissement. Voici comment calculer
                  le retour sur investissement de votre projet web :
                </p>

                <div className="bg-gray-50 dark:bg-gray-900 border-l-4 border-gray-400 dark:border-gray-600 rounded-r-2xl p-6 my-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Exemple concret : Restaurant à Lyon
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 text-gray-800 dark:text-gray-200 text-sm">
                    <div>
                      <h4 className="font-bold mb-2">Investissement initial</h4>
                      <ul className="space-y-1">
                        <li>• Site vitrine : 750€</li>
                        <li>• Photos professionnelles : 400€</li>
                        <li>• Hébergement 1an : 120€</li>
                        <li><strong>• Total : 1 270€</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Retour mensuel</h4>
                      <ul className="space-y-1">
                        <li>• +15 réservations/mois</li>
                        <li>• Panier moyen : 45€</li>
                        <li>• Chiffre d'affaires : +675€/mois</li>
                        <li><strong>• ROI : 100% en 2 mois</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-black dark:text-white mt-8 mb-4">
                  Calculateur ROI simplifié
                </h3>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 my-8">
                  <h4 className="text-lg font-bold text-black dark:text-white mb-4">
                    Formule de calcul rapide
                  </h4>
                  <div className="space-y-4 text-sm">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                      <div className="font-mono text-center">
                        <div className="text-lg font-bold">ROI = (Revenus générés - Coût du site) ÷ Coût du site × 100</div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-bold text-black dark:text-white mb-2">Variables à considérer</h5>
                        <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                          <li>• Nouveaux clients/mois</li>
                          <li>• Panier moyen</li>
                          <li>• Taux de conversion</li>
                          <li>• Coût d'acquisition</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-black dark:text-white mb-2">Bénéfices indirects</h5>
                        <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                          <li>• Crédibilité renforcée</li>
                          <li>• Support client réduit</li>
                          <li>• Processus automatisés</li>
                          <li>• Données clients</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-black dark:text-white mb-2">Secteurs performants</h5>
                        <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                          <li>• E-commerce : 200-500%</li>
                          <li>• Services B2B : 150-300%</li>
                          <li>• Restauration : 100-200%</li>
                          <li>• Artisanat : 80-150%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-black dark:text-white mt-12 mb-6">
                  Red flags : Comment détecter les arnaques
                </h2>

                <p>
                  Le marché du web regorge d'offres trompeuses. Voici les signaux d'alarme qui doivent vous
                  faire fuir immédiatement :
                </p>

                <div className="bg-gray-50 dark:bg-gray-900 border-l-4 border-gray-400 dark:border-gray-600 rounded-r-2xl p-6 my-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Signaux d'alarme absolus
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Discours commercial</h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        <li>• "Site gratuit" (avec abonnement forcé)</li>
                        <li>• "1er sur Google garanti"</li>
                        <li>• "Offre limitée, signez maintenant"</li>
                        <li>• Démarchage téléphonique agressif</li>
                        <li>• Pas de portfolio visible</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Pratiques douteuses</h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        <li>• Pas de contrat détaillé</li>
                        <li>• Paiement 100% à l'avance</li>
                        <li>• Pas de code source fourni</li>
                        <li>• Site "propriétaire" non transférable</li>
                        <li>• Support technique payant dès J+1</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 border-l-4 border-gray-400 dark:border-gray-600 rounded-r-2xl p-6 my-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Questions à poser AVANT de signer
                  </h3>
                  <div className="space-y-3 text-gray-800 dark:text-gray-200 text-sm">
                    <div>
                      <strong>Technique :</strong> "Quelle technologie utilisez-vous ? Aurai-je accès au code source ?"
                    </div>
                    <div>
                      <strong>SEO :</strong> "Comment optimisez-vous pour Google ? Puis-je voir des exemples de résultats ?"
                    </div>
                    <div>
                      <strong>Délais :</strong> "Quel est le planning détaillé ? Que se passe-t-il en cas de retard ?"
                    </div>
                    <div>
                      <strong>Support :</strong> "Combien de temps de support inclus ? Quel est le coût de la maintenance ?"
                    </div>
                    <div>
                      <strong>Propriété :</strong> "Serai-je propriétaire de mon site ? Puis-je changer de prestataire ?"
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-black dark:text-white mt-12 mb-6">
                  Options de paiement et financement
                </h2>

                <p>
                  Un site web représente un investissement important pour une PME. Heureusement,
                  plusieurs options existent pour étaler le coût :
                </p>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 my-8">
                  <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                    Solutions de financement disponibles
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-black dark:text-white mb-2">Paiement échelonné</h4>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                        <li>• <strong>2x sans frais</strong> (la plupart des agences)</li>
                        <li>• <strong>3x sans frais</strong> (projets &gt; 1000€)</li>
                        <li>• <strong>6x avec frais</strong> (gros projets)</li>
                        <li>• <strong>Paiement par étapes</strong> (jalon projet)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-black dark:text-white mb-2">Financement professionnel</h4>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                        <li>• <strong>Crédit professionnel</strong> (banque)</li>
                        <li>• <strong>Leasing digital</strong> (nouvelle formule)</li>
                        <li>• <strong>Financement BPI</strong> (innovation)</li>
                        <li>• <strong>Crédit-bail</strong> (solution rare)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 border-l-4 border-gray-400 dark:border-gray-600 rounded-r-2xl p-6 my-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Chez HyperWeb : Flexibilité maximale
                  </h3>
                  <div className="text-gray-800 dark:text-gray-200 text-sm space-y-2">
                    <div><strong>Sites 450-750€ :</strong> Paiement 2x sans frais (50% signature / 50% livraison)</div>
                    <div><strong>Sites 750-1100€ :</strong> Paiement 3x sans frais (40% / 40% / 20%)</div>
                    <div><strong>Projets &gt; 1100€ :</strong> Paiement par jalons ou financement sur mesure</div>
                    <div><strong>Entreprises :</strong> Paiement à 30 jours fin de mois sur facture</div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-black dark:text-white mt-12 mb-6">
                  Coûts de maintenance : L'investissement continu
                </h2>

                <p>
                  Créer un site web n'est que le début. La maintenance représente 15-25% du coût initial
                  par an, mais elle est essentielle pour la sécurité et les performances :
                </p>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 my-8">
                  <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                    Maintenance annuelle détaillée
                  </h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Maintenance de base</h4>
                        <div className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                          <div className="font-bold text-lg">60-150€/an</div>
                          <ul className="space-y-1">
                            <li>• Mises à jour sécurité</li>
                            <li>• Sauvegardes automatiques</li>
                            <li>• Monitoring uptime</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Maintenance Premium</h4>
                        <div className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                          <div className="font-bold text-lg">150-400€/an</div>
                          <ul className="space-y-1">
                            <li>• Support prioritaire</li>
                            <li>• Optimisations continues</li>
                            <li>• Rapports mensuels</li>
                            <li>• Modifications mineures</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Maintenance Enterprise</h4>
                        <div className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                          <div className="font-bold text-lg">400-1000€/an</div>
                          <ul className="space-y-1">
                            <li>• Support 24/7</li>
                            <li>• Évolutions fonctionnelles</li>
                            <li>• Audit SEO trimestriel</li>
                            <li>• Hotline dédiée</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-black dark:text-white mt-12 mb-6">
                  Impact de la technologie sur le prix
                </h2>

                <p>
                  Le choix de la technologie influence drastiquement le coût et la qualité de votre site.
                  Voici un comparatif objectif des principales solutions :
                </p>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 my-8">
                  <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                    Technologies et impact prix
                  </h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-800 dark:text-gray-200">WordPress</h4>
                        <span className="text-gray-600 dark:text-gray-400 text-sm font-bold">250-800€</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-700 dark:text-gray-300 mb-1">Avantages</div>
                          <ul className="text-gray-700 dark:text-gray-300 text-xs space-y-1">
                            <li>• Prix attractif</li>
                            <li>• Écosystème riche</li>
                            <li>• Facilité d'utilisation</li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-gray-700 dark:text-gray-300 mb-1">Inconvénients</div>
                          <ul className="text-gray-700 dark:text-gray-300 text-xs space-y-1">
                            <li>• Sécurité fragile</li>
                            <li>• Performances limitées</li>
                            <li>• Maintenance lourde</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-gray-800 dark:text-gray-200">React / Next.js</h4>
                          <span className="text-xs text-gray-600 dark:text-gray-400">Recommandé HyperWeb</span>
                        </div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm font-bold">450-2500€</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-700 dark:text-gray-300 mb-1">Avantages</div>
                          <ul className="text-gray-700 dark:text-gray-300 text-xs space-y-1">
                            <li>• Performance exceptionnelle</li>
                            <li>• SEO optimisé nativement</li>
                            <li>• Sécurité renforcée</li>
                            <li>• Évolutivité maximale</li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-gray-700 dark:text-gray-300 mb-1">À noter</div>
                          <ul className="text-gray-700 dark:text-gray-300 text-xs space-y-1">
                            <li>• Investissement initial plus élevé</li>
                            <li>• Nécessite une expertise</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-800 dark:text-gray-200">Solutions Sur-mesure</h4>
                        <span className="text-gray-600 dark:text-gray-400 text-sm font-bold">2000€+</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-700 dark:text-gray-300 mb-1">Avantages</div>
                          <ul className="text-gray-700 dark:text-gray-300 text-xs space-y-1">
                            <li>• 100% personnalisé</li>
                            <li>• Propriété totale du code</li>
                            <li>• Fonctionnalités uniques</li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-gray-700 dark:text-gray-300 mb-1">Inconvénients</div>
                          <ul className="text-gray-700 dark:text-gray-300 text-xs space-y-1">
                            <li>• Coût élevé</li>
                            <li>• Délais plus longs</li>
                            <li>• Maintenance spécialisée</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-black dark:text-white mt-12 mb-6">
                  Conclusion : Investir intelligemment
                </h2>

                <p>
                  Le prix d'un site internet en France varie de 450€ à 25 000€ selon vos objectifs et ambitions.
                  La clé ? Choisir un partenaire transparent qui vous accompagne dans la durée.
                </p>

                <div className="bg-gray-50 dark:bg-gray-900 border-l-4 border-gray-400 dark:border-gray-600 rounded-r-2xl p-6 my-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Notre recommandation pour 2025
                  </h3>
                  <div className="text-gray-800 dark:text-gray-200 text-sm space-y-2">
                    <div><strong>Budget serré (450-750€) :</strong> Site vitrine React avec SEO natif</div>
                    <div><strong>Ambition commerciale (750-1100€) :</strong> Site premium avec stratégie de contenu</div>
                    <div><strong>Projet e-commerce (1100€+) :</strong> Boutique sur-mesure avec intégrations avancées</div>
                  </div>
                </div>

                <p>
                  <strong>Besoin d'un devis personnalisé ?</strong> Contactez HyperWeb pour un audit gratuit de vos besoins
                  et découvrez exactement combien coûtera VOTRE projet, sans surprise ni coût caché.
                </p>

                {/* CTA Button */}
                <div className="mt-8 flex justify-center">
                  <Link
                    href="/#contact"
                    className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold text-base hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
                  >
                    Devis gratuit personnalisé
                  </Link>
                </div>

              </div>
            </article>

            {/* Related Articles Section */}
            <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-black dark:text-white mb-8 text-center">
                Articles qui pourraient vous intéresser
              </h3>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <Link href="/blog/comment-etre-premier-sur-google-2025" className="group block">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src="/seo-google-2025-strategies-referencement-naturel-france.webp"
                        alt="Stratégies SEO Google 2025"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-500 uppercase">
                          LECTURE RAPIDE
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          20 septembre 2025
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-black dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        Comment être #1 sur Google en 2025
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Stratégies SEO avancées pour dominer Google en 2025 et attirer plus de clients.
                      </p>
                    </div>
                    <div className="w-6 h-6 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}