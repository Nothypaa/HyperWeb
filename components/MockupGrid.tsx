'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const portfolioItems = [
  {
    id: 1,
    image: "/projet-client/site-videosurveillance-montpellier-agence-web-france.webp",
    alt: "Création site internet vidéosurveillance professionnel Montpellier - HyperWeb agence web France",
    name: "Zozo Sécurité",
    title: "Création site web + Optimisation Google My Business - Entreprise de sécurité",
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
    name: "Lemon Tattoo",
    title: "Création site web + Optimisation Google My Business - Salon de tatouage",
    challenge: "Nouveau salon de tatouage cherchant à se démarquer dans une zone concurrentielle.",
    results: [
      { label: "Page 1 Google", value: "tatouage Castelnau-le-Lez" },
      { label: "Page 1 Google", value: "salon tatouage Castelnau-le-Lez" },
      { label: "Top 3 Google My Business", value: "recherches locales tatouage" }
    ],
    services: "Création site vitrine + SEO local + Optimisation GMB",
    sector: "Art & Tatouage"
  }
]

const MockupGrid: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const activeProject = portfolioItems[activeProjectIndex]

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
        <div className="py-16 md:py-24">
          {/* Desktop Layout - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6 lg:space-y-8"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-foreground text-sm font-medium mb-4">
                    {activeProject.sector}
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black tracking-tighter text-foreground leading-tight mb-4">
                    {activeProject.title}
                  </h3>
                  <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                    {activeProject.challenge}
                  </p>
                </div>

                {/* Results */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold tracking-tight text-foreground">
                    RÉSULTATS SEO
                  </h4>
                  <div className="space-y-3">
                    {activeProject.results.map((result, idx) => {
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
                    {activeProject.services}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right: Carousel + Image */}
            <div className="space-y-4">
              {/* Carousel Navigation */}
              <div className="flex items-center justify-end gap-3">
                <span className="text-sm text-muted-foreground font-medium">
                  Voir plus d'exemples
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveProjectIndex((prev) => (prev === 0 ? portfolioItems.length - 1 : prev - 1))}
                    className="rounded-full border bg-card hover:bg-muted p-2 transition-colors"
                    aria-label="Projet précédent"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>

                  <div className="flex gap-1.5">
                    {portfolioItems.map((item, index) => (
                      <div
                        key={item.id}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeProjectIndex === index
                            ? 'bg-foreground w-6'
                            : 'bg-muted w-1.5'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveProjectIndex((prev) => (prev === portfolioItems.length - 1 ? 0 : prev + 1))}
                    className="rounded-full border bg-card hover:bg-muted p-2 transition-colors"
                    aria-label="Projet suivant"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Image with transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full rounded-3xl overflow-hidden shadow-lg border bg-card"
                >
                  <Image
                    src={activeProject.image}
                    alt={activeProject.alt}
                    width={1200}
                    height={900}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MockupGrid