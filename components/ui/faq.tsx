"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Head from "next/head";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  description?: string;
  items?: FAQItem[];
}

export function FAQ({
  title = "Questions Fréquentes", 
  description = "Trouvez les réponses aux questions les plus courantes sur nos services",
  items = [
    {
      question: "Combien de temps faut-il pour créer mon site web ?",
      answer: "Le délai varie selon la complexité du projet. Un site essentiel prend généralement 2-3 semaines, un site premium 4-6 semaines, et un projet enterprise 8-12 semaines. Chaque projet suit ces étapes : analyse des besoins (3-5 jours), conception et maquettage (5-7 jours), développement (7-21 jours), tests et optimisations (2-3 jours). Nous vous fournirons un planning détaillé avec jalons après avoir discuté de vos besoins spécifiques."
    },
    {
      question: "Que se passe-t-il si je ne suis pas satisfait du résultat ?",
      answer: "Nous offrons une garantie satisfait ou remboursé à 100% - unique sur le marché français ! Si vous n'êtes pas entièrement satisfait du résultat final, vous gardez le site ET récupérez votre argent. Cette garantie reflète notre confiance en la qualité de notre travail et notre engagement envers votre réussite. Contactez-nous pour plus de détails sur cette garantie exceptionnelle."
    },
    {
      question: "Quelle est la différence entre vos 3 formules (Essentiel, Premium, Enterprise) ?",
      answer: "• **Site Web Essentiel (€450)** : Parfait pour démarrer - jusqu'à 5 pages, design responsive, SEO de base, 3 mois de support. • **Site Web Premium (€750)** : Solution complète - pages illimitées, animations avancées, CMS intégré, e-commerce, 6 mois de support. • **Site Web Enterprise (€1,100+)** : Sur-mesure - applications complexes, intégrations API, tableau de bord admin, 12 mois de support premium. Voir nos offres détaillées pour choisir la formule adaptée à vos besoins."
    },
    {
      question: "Le site sera-t-il optimisé pour les mobiles ?",
      answer: "Absolument ! Tous nos sites sont conçus avec une approche mobile-first utilisant React et Next.js. Ils s'adaptent parfaitement à tous les appareils (smartphones, tablettes, ordinateurs) avec des scores Core Web Vitals optimaux (>90/100). Notre expertise technique garantit des temps de chargement ultra-rapides et une expérience utilisateur exceptionnelle sur chaque plateforme."
    },
    {
      question: "Pourquoi choisir React et Next.js pour mon site web ?",
      answer: "React et Next.js offrent des avantages techniques majeurs : performances exceptionnelles, SEO optimisé nativement, temps de chargement ultra-rapides, sécurité renforcée, et évolutivité maximale. Ces technologies modernes permettent des fonctionnalités avancées comme le rendu côté serveur, l'optimisation automatique des images, et une expérience utilisateur fluide. C'est l'avenir du web, contrairement aux solutions obsolètes comme WordPress."
    },
    {
      question: "Comment se déroule le processus de création d'un site web ?",
      answer: "Notre processus en 4 étapes garantit qualité et transparence : 1) **Analyse & Brief** (1-2 jours) - définition des objectifs et fonctionnalités. 2) **Développement & Design Direct** (7-21 jours) - nous codons directement le design avec React/Next.js, en vous donnant accès à un lien de prévisualisation pour des validations régulières. 3) **Optimisation & Tests** (2-3 jours) - SEO, performances, et tests finaux. 4) **Livraison & Formation** (1 jour) - mise en ligne et formation de votre équipe. Un suivi hebdomadaire et une communication transparente sont garantis."
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
  ]
}: FAQProps) {
  // Generate FAQ Schema markup for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question", 
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.replace(/\*\*/g, '').replace(/•/g, '-')
      }
    }))
  };

  return (
    <>
      {/* FAQ Schema Markup for Featured Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <section className="py-32" id="faq">
        <div className="container">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
            <h2 className="text-pretty text-4xl font-black tracking-tighter lg:text-6xl">
              {title}
            </h2>
            <p className="text-center opacity-75 lg:text-xl mb-12">{description}</p>
            
            <div className="w-full max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {items.map((item, index) => {
                  // Create SEO-friendly anchor from question
                  const anchorId = `faq-${item.question
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/g, '')
                    .replace(/\s+/g, '-')
                    .slice(0, 50)}`;
                    
                  return (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`} 
                      className="border-b border-border/40"
                      id={anchorId}
                    >
                      <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-left text-muted-foreground leading-relaxed pb-6">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.answer
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/• /g, '• ')
                              .replace(/Voir nos offres détaillées/g, '<a href="#pricing" class="text-primary hover:underline">Voir nos offres détaillées</a>')
                              .replace(/Contactez-nous/g, '<a href="#contact" class="text-primary hover:underline">Contactez-nous</a>')
                          }}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}