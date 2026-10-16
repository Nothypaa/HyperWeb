export const DONT_KNOW = 'Je ne sais pas encore'

// Shared folder where clients drop their logo, photos and any other files
export const DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/1LH3YnuAYTC3hEA-QxotyvCpQgN2Icaj-?usp=sharing'

export type QuestionKind = 'text' | 'email' | 'textarea' | 'choice' | 'multi' | 'colors'

export interface BriefQuestion {
  id: string
  /** Full question shown to the client */
  label: string
  /** Short label used in the e-mail Formspree sends, so answers are quick to scan */
  short: string
  kind: QuestionKind
  hint?: string
  /** Shows a button opening the shared Drive folder, for questions that involve files */
  upload?: boolean
  placeholder?: string
  options?: string[]
  required?: boolean
}

export interface BriefSection {
  id: string
  title: string
  intro: string
  questions: BriefQuestion[]
}

export const BRIEF_SECTIONS: BriefSection[] = [
  {
    id: 'activite',
    title: 'Toi et ton activité',
    intro: 'Commençons par faire connaissance : qui tu es et ce que tu proposes.',
    questions: [
      {
        id: 'nom',
        label: 'Quel est ton nom complet ?',
        short: 'Nom complet',
        kind: 'text',
        placeholder: 'Ex. Camille Martin',
      },
      {
        id: 'entreprise',
        label: 'Quel est le nom de ton entreprise ou de ta marque ?',
        short: 'Entreprise / marque',
        kind: 'text',
        placeholder: 'Ex. Atelier Lumière',
      },
      {
        id: 'siret',
        label: 'Quel est ton numéro SIRET ?',
        short: 'SIRET',
        kind: 'text',
        hint: '14 chiffres. Il apparaîtra dans les mentions légales de ton site.',
        placeholder: 'Ex. 123 456 789 00012',
      },
      {
        id: 'email',
        label: 'À quelle adresse e-mail puis-je te répondre ?',
        short: 'E-mail de contact',
        kind: 'email',
        hint: 'Je l’utilise seulement pour te recontacter au sujet de ton site.',
        placeholder: 'toi@exemple.fr',
        required: true,
      },
      {
        id: 'activite',
        label: 'Quelle est ton activité, et quels services ou produits proposes-tu ?',
        short: 'Activité & offre',
        kind: 'textarea',
        placeholder: 'Décris ton métier et ce que tes clients peuvent acheter ou réserver chez toi.',
      },
      {
        id: 'experience',
        label: 'Depuis combien de temps exerces-tu, et qu’est-ce qui te distingue des autres dans ton domaine ?',
        short: 'Expérience & différence',
        kind: 'textarea',
      },
      {
        id: 'existant',
        label: 'As-tu déjà un site web, des réseaux sociaux ou un logo ? Merci de partager les liens.',
        short: 'Site, réseaux, logo existants',
        kind: 'textarea',
        placeholder: 'instagram.com/…, monsite.fr, …',
      },
    ],
  },
  {
    id: 'objectifs',
    title: 'Objectifs du site',
    intro: 'Ce que ton site doit accomplir pour toi.',
    questions: [
      {
        id: 'objectif',
        label: 'Quel est l’objectif principal du site ?',
        short: 'Objectif principal',
        kind: 'multi',
        options: ['Présenter mon activité', 'Trouver des clients', 'Vendre en ligne', 'Prendre des rendez-vous'],
        placeholder: 'Précise si besoin…',
      },
      {
        id: 'action',
        label: 'Quelle action un visiteur doit-il faire en premier ?',
        short: 'Première action du visiteur',
        kind: 'choice',
        options: ['Me contacter', 'Réserver', 'Acheter', 'S’abonner'],
        placeholder: 'Une autre action ? Écris-la ici…',
      },
      {
        id: 'reussite',
        label: 'Comment sauras-tu que le site est une réussite ?',
        short: 'Critère de réussite',
        kind: 'textarea',
        placeholder: 'Ex. 5 demandes de devis par mois, des réservations en ligne chaque semaine…',
      },
    ],
  },
  {
    id: 'public',
    title: 'Public cible',
    intro: 'Les personnes à qui ton site va parler.',
    questions: [
      {
        id: 'clients',
        label: 'Qui sont tes clients idéaux ?',
        short: 'Clients idéaux',
        kind: 'textarea',
        hint: 'Âge, profession, lieu, besoins : tout ce qui t’aide à les décrire.',
        placeholder: 'Ex. Femmes de 30 à 45 ans, actives, à Montpellier, qui cherchent…',
      },
    ],
  },
  {
    id: 'structure',
    title: 'Pages et structure',
    intro: 'Ce qu’on doit voir en premier en arrivant sur ton site.',
    questions: [
      {
        id: 'messages',
        label: 'Quels sont les messages les plus importants à mettre en avant sur la page d’accueil ?',
        short: 'Messages clés de l’accueil',
        kind: 'textarea',
      },
    ],
  },
  {
    id: 'identite',
    title: 'Couleurs et identité visuelle',
    intro: 'L’allure de ton site : couleurs, ambiance, typographie.',
    questions: [
      {
        id: 'couleurs-marque',
        label: 'As-tu déjà des couleurs de marque ? Si oui, indique les codes couleur.',
        short: 'Couleurs de marque (HEX)',
        kind: 'colors',
        hint: 'Codes HEX, par exemple #1A2B3C. Tu peux aussi utiliser le sélecteur.',
        placeholder: '#1A2B3C, #F4EDE4…',
      },
      {
        id: 'couleurs-aimees',
        label: 'Si tu n’as pas encore de codes, quelles couleurs aimes-tu ou souhaites-tu voir sur le site ?',
        short: 'Couleurs aimées',
        kind: 'textarea',
        placeholder: 'Ex. des tons sable et vert sauge, un bleu profond…',
      },
      {
        id: 'couleurs-exclues',
        label: 'Y a-t-il des couleurs que tu ne veux pas utiliser ?',
        short: 'Couleurs à éviter',
        kind: 'text',
      },
      {
        id: 'ambiance',
        label: 'Quelle ambiance le site doit-il donner ?',
        short: 'Ambiance',
        kind: 'multi',
        options: ['Calme', 'Élégante', 'Audacieuse', 'Chaleureuse', 'Moderne', 'Minimaliste', 'Ludique'],
        placeholder: 'Un autre mot pour décrire l’ambiance ?',
      },
      {
        id: 'fond',
        label: 'Préfères-tu un fond clair ou un fond sombre ?',
        short: 'Fond',
        kind: 'choice',
        options: ['Fond clair', 'Fond sombre', DONT_KNOW],
      },
      {
        id: 'polices',
        label: 'Utilises-tu déjà des polices précises, ou y a-t-il un style qui te plaît ?',
        short: 'Polices / style typographique',
        kind: 'multi',
        options: ['Classique', 'Arrondi', 'Moderne'],
        placeholder: 'Nom de police ou exemple…',
      },
      {
        id: 'logo',
        label: 'As-tu un logo ?',
        short: 'Logo',
        kind: 'choice',
        options: ['Oui, je le dépose dans le Drive', 'J’ai besoin d’aide pour le créer', DONT_KNOW],
        hint: 'Dépose le fichier dans notre dossier Drive partagé.',
        upload: true,
        placeholder: 'Une précision sur ton logo ?',
      },
    ],
  },
  {
    id: 'inspirations',
    title: 'Style et inspirations',
    intro: 'Ce qui te plaît, et ce qui ne te ressemble pas.',
    questions: [
      {
        id: 'sites-aimes',
        label: 'Quels sites web aimes-tu, et qu’aimes-tu dans chacun ?',
        short: 'Sites aimés',
        kind: 'textarea',
        hint: 'Mise en page, couleurs, photos, ton… Un lien et une phrase suffisent.',
      },
      {
        id: 'sites-detestes',
        label: 'Quels sites web n’aimes-tu pas, et pourquoi ?',
        short: 'Sites pas aimés',
        kind: 'textarea',
      },
      {
        id: 'concurrents',
        label: 'Quels concurrents ou professionnels similaires dois-je regarder ?',
        short: 'Concurrents',
        kind: 'textarea',
      },
    ],
  },
  {
    id: 'contenu',
    title: 'Contenu et médias',
    intro: 'Les textes, les photos et la voix de ton site.',
    questions: [
      {
        id: 'textes',
        label: 'Rédigeras-tu les textes toi-même, ou as-tu besoin d’aide pour les écrire ?',
        short: 'Rédaction des textes',
        kind: 'choice',
        options: ['Je les rédige moi-même', 'J’ai besoin d’aide', 'Un peu des deux'],
      },
      {
        id: 'photos',
        label: 'As-tu des photos ou des vidéos professionnelles ? Sinon, acceptes-tu des images de banque d’images ?',
        short: 'Photos & vidéos',
        kind: 'choice',
        options: ['J’ai des photos / vidéos pro', 'Les banques d’images me conviennent', 'Un mélange des deux'],
        hint: 'Si tu en as, dépose-les dans notre dossier Drive partagé.',
        upload: true,
        placeholder: 'Un détail à ajouter ?',
      },
      {
        id: 'ton',
        label: 'Quel ton les textes doivent-ils avoir ?',
        short: 'Ton des textes',
        kind: 'multi',
        options: ['Formel', 'Amical', 'Inspirant', 'Direct'],
      },
    ],
  },
  {
    id: 'fonctionnalites',
    title: 'Fonctionnalités et outils',
    intro: 'Comment tu veux faire vivre ton site après sa livraison.',
    questions: [
      {
        id: 'autonomie',
        label: 'Souhaites-tu pouvoir modifier le site toi-même après sa livraison ?',
        short: 'Modifier le site soi-même',
        kind: 'choice',
        options: ['Oui', 'Non, je préfère te confier les modifications', DONT_KNOW],
      },
    ],
  },
  {
    id: 'technique',
    title: 'Nom de domaine, hébergement et technique',
    intro: 'L’adresse de ton site et les outils qui le font tourner.',
    questions: [
      {
        id: 'domaine',
        label: 'Possèdes-tu déjà un nom de domaine ? Sinon, quels noms aimerais-tu ?',
        short: 'Nom de domaine',
        kind: 'text',
        placeholder: 'Ex. monnom.fr, ou des idées : atelier-lumiere.fr…',
      },
      {
        id: 'hebergement',
        label: 'As-tu déjà un hébergement, ou dois-je m’en occuper ?',
        short: 'Hébergement',
        kind: 'choice',
        options: ['J’ai déjà un hébergement', 'Occupe-t’en pour moi', DONT_KNOW],
        placeholder: 'Chez quel hébergeur ?',
      },
      {
        id: 'email-pro',
        label: 'Quelle adresse e-mail professionnelle souhaites-tu utiliser ?',
        short: 'E-mail pro souhaité',
        kind: 'text',
        placeholder: 'Ex. contact@tonnom.fr',
      },
    ],
  },
  {
    id: 'fin',
    title: 'Pour finir',
    intro: 'Le dernier mot est pour toi.',
    questions: [
      {
        id: 'autre',
        label: 'Y a-t-il autre chose que je devrais savoir avant de commencer ?',
        short: 'Autres informations',
        kind: 'textarea',
        placeholder: 'Une date importante, une contrainte, une envie particulière…',
      },
    ],
  },
]

export const ALL_QUESTIONS = BRIEF_SECTIONS.flatMap((s) => s.questions)
