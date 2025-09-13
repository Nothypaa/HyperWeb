import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales - Informations Légales Obligatoires',
  description: 'Mentions légales obligatoires du site HyperWeb : éditeur, hébergeur, responsable de publication et informations légales.',
  alternates: {
    canonical: 'https://agencehyperweb.com/mentions-legales',
  },
}

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 pt-40 pb-20 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Éditeur du site</h2>
            
            <h3 className="text-xl font-medium mb-4">HyperWeb</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Informations générales</h4>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li><strong>Activité :</strong> Agence web - Création de sites internet</li>
                  <li><strong>Forme juridique :</strong> Entreprise individuelle</li>
                  <li><strong>Secteur :</strong> Services numériques et développement web</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Contact</h4>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li><strong>Email :</strong> contact@agencehyperweb.com</li>
                  <li><strong>Téléphone :</strong> +33 7 67 56 39 26</li>
                  <li><strong>Site web :</strong> https://agencehyperweb.com</li>
                  <li><strong>Ville :</strong> Montpellier, France</li>
                </ul>
              </div>
            </div>
            
            
            <h4 className="font-semibold mb-2 mt-6">👤 Responsable de la publication</h4>
            <p className="text-gray-700 dark:text-gray-300">Le responsable de la publication du site agencehyperweb.com est le dirigeant de HyperWeb.</p>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
              <strong>Contact :</strong> contact@agencehyperweb.com
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Hébergement du site</h2>
            
            <h3 className="text-xl font-medium mb-4">Informations sur l'hébergeur</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Hébergement technique</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-1">
                  Ce site est hébergé sur une infrastructure cloud sécurisée, 
                  respectant les standards européens de protection des données (RGPD).
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">Localisation des serveurs</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-1">
                  Les serveurs hébergeant ce site sont situés en Europe, 
                  garantissant la conformité avec la réglementation européenne sur la protection des données.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">Contact hébergeur</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-1">
                  Pour toute question technique relative à l'hébergement, 
                  veuillez nous contacter à : contact@agencehyperweb.com
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Propriété intellectuelle</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3">3.1 Contenu du site</h3>
                <p>
                  L'ensemble du contenu de ce site (textes, images, vidéos, éléments graphiques, 
                  logos, icônes, sons, logiciels) est la propriété exclusive de HyperWeb, 
                  à l'exception des marques, logos ou contenus appartenant à d'autres sociétés 
                  partenaires ou auteurs.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3">3.2 Utilisation du contenu</h3>
                <p>
                  Toute représentation, reproduction, adaptation ou exploitation partielle ou totale 
                  des contenus, marques déposées et services proposés par le site est interdite sans 
                  autorisation expresse écrite de HyperWeb.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">⚖️ Sanctions</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Toute exploitation non autorisée du contenu de ce site constituerait une contrefaçon 
                  passible de sanctions en application des articles L.335-2 et suivants du Code de la 
                  Propriété Intellectuelle.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Données personnelles et cookies</h2>
            
            <div className="space-y-4">
              <p>
                Le traitement des données personnelles collectées sur ce site est régi par notre 
                <a href="/politique-confidentialite" className="text-blue-600 dark:text-blue-400 hover:underline font-medium"> Politique de Confidentialité</a>, 
                conforme au Règlement Général sur la Protection des Données (RGPD).
              </p>
              
              <div>
                <h4 className="font-semibold mb-2">📋 Points clés RGPD</h4>
                <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Collecte minimale de données personnelles</li>
                  <li>• Consentement explicite pour l'utilisation du chatbot</li>
                  <li>• Droit d'accès, de rectification et d'effacement</li>
                  <li>• Conservation limitée dans le temps</li>
                  <li>• Sécurisation des données collectées</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Responsabilité</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3">5.1 Informations publiées</h3>
                <p>
                  HyperWeb s'efforce d'assurer l'exactitude et la mise à jour des informations 
                  diffusées sur ce site. Cependant, HyperWeb ne peut garantir l'exactitude, 
                  la précision ou l'exhaustivité des informations mises à disposition.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3">5.2 Utilisation du site</h3>
                <p>
                  L'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive. 
                  HyperWeb décline toute responsabilité concernant d'éventuels dommages directs ou 
                  indirects pouvant résulter de l'accès au site ou de son utilisation.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3">5.3 Liens externes</h3>
                <p>
                  Le site peut contenir des liens vers des sites externes. HyperWeb n'exerce aucun 
                  contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Conditions d'utilisation</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-3">6.1 Acceptation des conditions</h3>
                <p>
                  L'utilisation du site agencehyperweb.com implique l'acceptation pleine et entière 
                  des conditions générales d'utilisation décrites ci-après.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3">6.2 Utilisation conforme</h3>
                <p>L'utilisateur s'engage à utiliser le site de manière loyale et conforme à sa destination :</p>
                <ul className="ml-6 list-disc mt-2 space-y-1">
                  <li>Ne pas porter atteinte au fonctionnement du site</li>
                  <li>Ne pas diffuser de contenu illégal ou malveillant</li>
                  <li>Respecter les droits de propriété intellectuelle</li>
                  <li>Utiliser les formulaires de contact de manière appropriée</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Droit applicable et juridiction</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">7.1 Droit applicable</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Les présentes mentions légales sont soumises au droit français. 
                  Tout litige en relation avec l'utilisation du site agencehyperweb.com 
                  est soumis au droit français.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">7.2 Juridiction compétente</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  En cas de litige, et à défaut de solution amiable, les tribunaux français 
                  seront seuls compétents. La juridiction compétente sera déterminée selon 
                  les règles de droit commun.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Médiation et règlement des litiges</h2>
            
            <div className="space-y-4">
              <p>
                Conformément aux dispositions du Code de la consommation concernant le règlement 
                amiable des litiges, HyperWeb adhère au service du médiateur de la consommation.
              </p>
              
              <div>
                <h4 className="font-semibold mb-2">🤝 Résolution amiable</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  En cas de litige, vous pouvez d'abord nous contacter directement à 
                  contact@agencehyperweb.com pour rechercher une solution amiable.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">9. Accessibilité</h2>
            
            <p>
              HyperWeb s'efforce de rendre son site accessible selon les standards du web. 
              Si vous rencontrez des difficultés d'accès au site, n'hésitez pas à nous contacter 
              à contact@agencehyperweb.com pour que nous puissions vous aider.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">10. Mise à jour des mentions légales</h2>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p>
                Ces mentions légales peuvent être modifiées à tout moment en fonction de l'évolution 
                du site et de la réglementation. La version applicable est celle en vigueur au moment 
                de votre visite.
              </p>
              <p className="mt-2">
                <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
            
            <h3 className="text-xl font-medium mb-4">Pour toute question concernant ces mentions légales</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Contact principal</h4>
                <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Email :</strong> contact@agencehyperweb.com</li>
                  <li><strong>Téléphone :</strong> +33 7 67 56 39 26</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Réponse garantie</h4>
                <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Réponse sous 48h ouvrées</li>
                  <li>• Service client personnalisé</li>
                  <li>• Suivi de votre demande</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}