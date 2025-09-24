export default function LocalBusinessSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "WebDesignerService", "MarketingCompany"],
    "@id": "https://agencehyperweb.com/#organization",
    "name": "HyperWeb - Agence Web & Communication Montpellier",
    "description": "Agence web et de communication à Montpellier spécialisée en création de sites internet, SEO et services webmaster",
    "url": "https://agencehyperweb.com",
    "telephone": "+33767563926",
    "email": "contact@agencehyperweb.com",
    "priceRange": "€450-€1100+",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Montpellier",
      "addressRegion": "Occitanie",
      "addressCountry": "FR",
      "postalCode": "34000"
    },
    "areaServed": [
      "Montpellier",
      "Hérault",
      "Occitanie",
      "France"
    ],
    "serviceType": [
      "Agence web",
      "Agence de communication",
      "Agence SEO",
      "Webmaster",
      "Création site internet",
      "Référencement naturel"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services Web",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Site Web Essentiel",
            "description": "Site responsive jusqu'à 5 pages"
          },
          "price": "450",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Site Web Premium",
            "description": "Solution complète jusqu'à 9 pages avec CMS"
          },
          "price": "750",
          "priceCurrency": "EUR"
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/agencehyperweb/",
      "https://www.linkedin.com/company/agencehyperweb",
      "https://x.com/agencehyperweb"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}