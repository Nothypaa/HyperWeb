import { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - Protection des Données Personnelles',
  description: 'Découvrez comment HyperWeb protège et traite vos données personnelles selon le RGPD. Transparence totale sur nos pratiques de confidentialité.',
  alternates: {
    canonical: 'https://agencehyperweb.com/politique-confidentialite',
  },
}

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 pt-40 pb-20 max-w-4xl">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Breadcrumb currentPage="Politique de Confidentialité" />
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Responsable du traitement</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Le responsable du traitement des données personnelles collectées sur ce site est :
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4"><strong>HyperWeb</strong><br />
            Agence web spécialisée en développement digital<br />
            Email : contact@agencehyperweb.com<br />
            Téléphone : +33 7 67 56 39 26<br />
            Site web : https://agencehyperweb.com</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Données personnelles collectées</h2>
            
            <h3 className="text-xl font-medium mb-3">2.1 Formulaire de contact</h3>
            <p>Lorsque vous utilisez notre formulaire de contact, nous collectons :</p>
            <ul className="ml-6 list-disc">
              <li><strong>Nom complet</strong> (obligatoire)</li>
              <li><strong>Adresse email</strong> (obligatoire)</li>
              <li><strong>Numéro de téléphone</strong> (facultatif)</li>
              <li><strong>Objet de la demande</strong> (obligatoire)</li>
              <li><strong>Message</strong> (facultatif)</li>
              <li><strong>Adresse IP</strong> (collecte automatique pour la sécurité)</li>
              <li><strong>Horodatage</strong> (date et heure de soumission)</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-6">2.2 Chatbot IA</h3>
            <p>Lors de l'utilisation de notre assistant virtuel :</p>
            <ul className="ml-6 list-disc">
              <li><strong>Messages de conversation</strong> échangés avec le chatbot</li>
              <li><strong>Historique des conversations</strong> (temporaire, pour la session)</li>
              <li><strong>Adresse IP</strong> (pour la limitation du taux de requêtes)</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-6">2.3 Données de navigation</h3>
            <p>Nous collectons automatiquement certaines données techniques :</p>
            <ul className="ml-6 list-disc">
              <li><strong>Cookies analytiques</strong> (Google Analytics)</li>
              <li><strong>Pages visitées</strong> et temps passé sur le site</li>
              <li><strong>Type de navigateur</strong> et système d'exploitation</li>
              <li><strong>Résolution d'écran</strong> et préférences d'affichage</li>
              <li><strong>Référent</strong> (site d'origine de votre visite)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Finalités du traitement</h2>
            <p>Vos données personnelles sont traitées pour les finalités suivantes :</p>
            
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="font-semibold">Gestion des demandes de contact</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Répondre à vos questions, établir un devis, vous recontacter pour vos projets web.</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Base légale :</strong> Consentement et intérêt légitime</p>
              </div>

              <div>
                <h4 className="font-semibold">Assistant virtuel (Chatbot)</h4>
                <p>Vous conseiller sur nos services, répondre à vos questions techniques, vous orienter vers la solution adaptée.</p>
                <p><strong>Base légale :</strong> Consentement explicite</p>
              </div>

              <div>
                <h4 className="font-semibold">Analyse et amélioration</h4>
                <p>Comprendre l'utilisation de notre site, améliorer l'expérience utilisateur, mesurer l'efficacité de nos services.</p>
                <p><strong>Base légale :</strong> Intérêt légitime</p>
              </div>

              <div>
                <h4 className="font-semibold">Sécurité et prévention</h4>
                <p>Protection contre le spam, les attaques par déni de service, limitation du taux de requêtes.</p>
                <p><strong>Base légale :</strong> Intérêt légitime</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Conservation des données</h2>
            <p>Les durées de conservation sont définies selon le type de données :</p>
            
            <div className="overflow-x-auto mt-4">
              <table className="w-full border border-gray-200 dark:border-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Type de données</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Durée de conservation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Données de contact</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">3 ans après le dernier contact</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Conversations chatbot</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Durée de la session uniquement</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Données analytiques</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">26 mois (Google Analytics)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Logs de sécurité</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">1 an maximum</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Partage des données</h2>
            <p>Vos données personnelles peuvent être partagées avec :</p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">5.1 Prestataires de services</h3>
            <ul className="ml-6 list-disc">
              <li><strong>Anthropic</strong> (Claude AI) - pour le fonctionnement du chatbot</li>
              <li><strong>Google</strong> (Analytics) - pour les statistiques de visite</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-6">5.2 Hébergement</h3>
            <p>Nos données sont hébergées en Europe, conformément au RGPD. Nous nous assurons que tous nos prestataires respectent les standards de protection européens.</p>

            <h3 className="text-xl font-medium mb-3 mt-6">5.3 Aucune vente de données</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Engagement ferme :</strong> Nous ne vendons jamais vos données personnelles à des tiers. Vos informations ne sont utilisées que dans le cadre de nos services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Vos droits RGPD</h2>
            <p>Conformément au Règlement Général sur la Protection des Données, vous disposez des droits suivants :</p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div>
                <h4 className="font-semibold">✓ Droit d'accès</h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2">Obtenir une copie de vos données personnelles que nous détenons.</p>
              </div>
              
              <div>
                <h4 className="font-semibold">✓ Droit de rectification</h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2">Corriger ou mettre à jour vos informations personnelles.</p>
              </div>
              
              <div>
                <h4 className="font-semibold">✓ Droit à l'effacement</h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2">Demander la suppression de vos données personnelles.</p>
              </div>
              
              <div>
                <h4 className="font-semibold">✓ Droit de portabilité</h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2">Récupérer vos données dans un format structuré.</p>
              </div>
              
              <div>
                <h4 className="font-semibold">✓ Droit d'opposition</h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2">Vous opposer au traitement de vos données personnelles.</p>
              </div>
              
              <div>
                <h4 className="font-semibold">✓ Droit de limitation</h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2">Demander la limitation du traitement de vos données.</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Comment exercer vos droits ?</h4>
              <p>Pour exercer ces droits, contactez-nous à :</p>
              <ul className="mt-3">
                <li><strong>Email :</strong> contact@agencehyperweb.com</li>
                <li><strong>Objet :</strong> "Demande RGPD - [Type de demande]"</li>
              </ul>
              <p className="text-sm mt-3 text-gray-700 dark:text-gray-300">
                <strong>Délai de réponse :</strong> Nous nous engageons à répondre dans un délai maximum de 30 jours.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Sécurité des données</h2>
            <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
            
            <ul className="ml-6 list-disc mt-4 space-y-2">
              <li><strong>Chiffrement HTTPS</strong> pour toutes les communications</li>
              <li><strong>Protection contre les attaques</strong> (limitation de débit, filtrage IP)</li>
              <li><strong>Accès restreint</strong> aux données par mot de passe sécurisé</li>
              <li><strong>Sauvegardes régulières</strong> et sécurisées</li>
              <li><strong>Surveillance continue</strong> des systèmes</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Cookies et technologies similaires</h2>
            <p>Notre site utilise des cookies pour améliorer votre expérience :</p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">8.1 Types de cookies</h3>
            <ul className="ml-6 list-disc space-y-2">
              <li><strong>Cookies essentiels :</strong> Fonctionnement de base du site (thème, préférences)</li>
              <li><strong>Cookies analytiques :</strong> Google Analytics (avec votre consentement)</li>
              <li><strong>Cookies de chat :</strong> Fonctionnement du chatbot IA</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-6">8.2 Gestion des cookies</h3>
            <p>Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur ou nous contacter pour plus d'informations.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">9. Réclamations</h2>
            <p>Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, vous avez le droit d'introduire une réclamation auprès de :</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4">
              <p><strong>Commission Nationale de l'Informatique et des Libertés (CNIL)</strong><br />
              3 Place de Fontenoy - TSA 80715<br />
              75334 PARIS CEDEX 07<br />
              Tél : 01 53 73 22 22<br />
              Site web : <a href="https://www.cnil.fr" className="text-gray-900 dark:text-white hover:underline">https://www.cnil.fr</a></p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">10. Modifications de cette politique</h2>
            <p>Cette politique de confidentialité peut être amenée à évoluer. En cas de modification substantielle, nous vous en informerons par email si nous disposons de votre adresse, ou via un avis visible sur notre site web.</p>
            
            <p className="mt-4"><strong>Version actuelle :</strong> 1.0 - {new Date().toLocaleDateString('fr-FR')}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
            <p>Pour toute question relative à cette politique de confidentialité ou à la protection de vos données personnelles :</p>
            
            <div className="mt-4">
              <h4 className="font-semibold mb-3">HyperWeb - Responsable de la protection des données</h4>
              <ul className="space-y-2">
                <li><strong>Email :</strong> contact@agencehyperweb.com</li>
                <li><strong>Téléphone :</strong> +33 7 67 56 39 26</li>
                <li><strong>Courrier :</strong> HyperWeb, Protection des données, Montpellier, France</li>
              </ul>
            </div>
          </section>

          {/* Additional navigation links */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
            <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                Retour à l'accueil
              </a>
              <span className="text-gray-300">•</span>
              <a href="/mentions-legales" className="text-blue-600 dark:text-blue-400 hover:underline">
                Mentions légales
              </a>
              <span className="text-gray-300">•</span>
              <a href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
                Blog
              </a>
              <span className="text-gray-300">•</span>
              <a href="/faq" className="text-blue-600 dark:text-blue-400 hover:underline">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}