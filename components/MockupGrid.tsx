'use client'

import React from 'react'
import Image from 'next/image'

const portfolioItems = [
  {
    id: 1,
    image: "/projet-client/site-videosurveillance-montpellier-agence-web-france.webp",
    alt: "Création site internet vidéosurveillance professionnel Montpellier - HyperWeb agence web France",
    name: "Zozo Sécurité",
    title: "Sécurité & Vidéosurveillance Montpellier",
    challenge: "Entreprise locale invisible face à la concurrence nationale sur les recherches sécurité.",
    results: [
      { label: "Position #1 Google", value: "installation vidéosurveillance Montpellier" },
      { label: "Position #1 Google My Business", value: "recherches locales" },
      { label: "Visibilité locale", value: "Site web + fiche Google optimisés" }
    ],
    services: "Création site vitrine + SEO local + Optimisation GMB",
    sector: "Sécurité & Surveillance"
  },
  {
    id: 2,
    image: "/projet-client/creation-site-tatouage-castelnau-le-lez-developpement-web.webp",
    alt: "Site web sur mesure salon tatouage Castelnau-le-Lez - développement web professionnel HyperWeb",
    name: "Site Tatouage",
    description: "Studio de tatouage"
  }
]

const MockupGrid: React.FC = () => {
  // Generate CreativeWork schema for portfolio items
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Portfolio HyperWeb - Réalisations Sites Web",
    "description": "Portfolio des sites internet créés par HyperWeb, agence web française",
    "itemListElement": portfolioItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": item.name === "Zozo Sécurité"
          ? "Site Web Vidéosurveillance Professionnel Montpellier"
          : "Site Web Salon Tatouage Professionnel Castelnau-le-Lez",
        "description": item.name === "Zozo Sécurité"
          ? "Site web professionnel pour entreprise de vidéosurveillance à Montpellier, développé par HyperWeb agence web France"
          : "Site web sur mesure pour salon de tatouage à Castelnau-le-Lez, création HyperWeb agence web professionnelle",
        "creator": {
          "@type": "Organization",
          "name": "HyperWeb",
          "url": "https://agencehyperweb.com"
        },
        "image": `https://agencehyperweb.com${item.image}`,
        "dateCreated": "2025",
        "genre": "Site Web Professionnel",
        "keywords": item.name === "Zozo Sécurité"
          ? "site web vidéosurveillance, création site internet Montpellier, agence web France"
          : "site web tatouage, création site internet Castelnau-le-Lez, développement web professionnel"
      }
    }))
  }

  return (
    <>
      {/* Portfolio Schema Markup for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Show only Zozo Sécurité for now */}
        {portfolioItems
          .filter(item => item.name === "Zozo Sécurité")
          .map((project) => (
            <div key={project.id} className="py-16 md:py-24">

              {/* Desktop Layout - Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left: Content */}
                <div className="space-y-6 lg:space-y-8">
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-foreground text-sm font-medium mb-4">
                      {project.sector}
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black tracking-tighter text-foreground leading-tight mb-4">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold tracking-tight text-foreground">
                      RÉSULTATS SEO
                    </h4>
                    <div className="space-y-3">
                      {project.results.map((result, idx) => {
                        const labelParts = result.label.split('#1')
                        const hasFirstPosition = labelParts.length > 1

                        return (
                          <div
                            key={idx}
                            className="rounded-2xl border bg-card p-4 shadow-sm"
                          >
                            <div className="font-semibold text-foreground text-base mb-1">
                              {hasFirstPosition ? (
                                <>
                                  {labelParts[0]}
                                  <span className="text-yellow-600 dark:text-yellow-400">#1</span>
                                  {labelParts[1]}
                                </>
                              ) : (
                                result.label
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {result.value}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Services : </span>
                      {project.services}
                    </div>
                  </div>
                </div>

                {/* Right: Image */}
                <div className="w-full rounded-3xl overflow-hidden shadow-lg border bg-card">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    width={1200}
                    height={900}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default MockupGrid