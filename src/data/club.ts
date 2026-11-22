// ===========================================================================
// INFOS PRATIQUES DU CLUB : saison, horaires, inscription, tarifs
// Utilisé par la page Infos et par l'accueil.
// ===========================================================================

export const SEASON = 'Saison 2026 - 2027';

// Horaires d'entraînement au Hall Max Lessines
export const trainingSchedule = [
  { category: 'Mini-handball (né(e)s en 2015+)', day: 'Tous les samedis', time: '10:30 - 12:00' },
  { category: 'U16 (né(e)s en 2011 et 2012)', day: 'Tous les lundis', time: '17:30 - 18:45' },
  { category: 'U16 (né(e)s en 2011 et 2012)', day: 'Tous les vendredis', time: '17:30 - 19:00' },
  { category: 'U18 (né(e)s en 2008 à 2010)', day: 'Tous les lundis', time: '18:30 - 20:00' },
  { category: 'U18 (né(e)s en 2008 à 2010)', day: 'Tous les vendredis', time: '17:30 - 19:00' },
  { category: 'Seniors', day: 'Tous les mercredis', time: '19:30 - 21:00' },
  { category: 'Seniors', day: 'Tous les vendredis', time: '19:00 - 20:30' },
  { category: 'Équipe Loisir', day: 'Tous les vendredis', time: '20:30 - 21:45' },
];

export const registrationSteps = [
  { step: 1, title: 'Contactez-nous', description: 'Par téléphone, email ou via notre formulaire de contact' },
  { step: 2, title: "Séance d'essai", description: 'Venez essayer gratuitement pendant 3 entraînements' },
  { step: 3, title: 'Inscription', description: "Remplissez le formulaire d'inscription et fournissez les documents" },
  { step: 4, title: 'Paiement', description: 'Réglez la cotisation annuelle' },
];

// Cotisations annuelles
export const tarifs = [
  { label: 'Mini-handball (né(e)s en 2015 et après)', price: '100 €' },
  { label: 'Joueurs Loisir', price: '100 €' },
  { label: 'Juniors (né(e)s à partir de 2009)', price: '165 €' },
  { label: 'Séniors (né(e)s en 2008 et avant)', price: '220 €' },
  { label: 'Transfert international (> 16 ans)', price: '220 € + 150 € (caution)' },
];

// Agendas Google des matchs, par catégorie
export const calendars = [
  { label: 'U16', url: 'https://calendar.google.com/calendar/render?cid=98cb0fbe3bdfc2fd4eb65887b777f3c2adde03decaf3788157877eef0f2d90ff%40group.calendar.google.com' },
  { label: 'U18', url: 'https://calendar.google.com/calendar/render?cid=02e4b51b6158592872bd32c184e0d05fd75480ee1893fc293ab3cbc5c8f1cc13%40group.calendar.google.com' },
  { label: 'Seniors PBH', url: 'https://calendar.google.com/calendar/render?cid=769ad348db76a4e8894f0d4a68d95cee19bf16fe8f0106699e38fc325093c59d%40group.calendar.google.com' },
  { label: 'Seniors D1 LFH', url: 'https://calendar.google.com/calendar/render?cid=fdee024de7152bc6a1cb0223655f4ffdee60ccbed3176e1f519629784de20e4a%40group.calendar.google.com' },
];

export const CLUB_CALENDAR = 'https://www.handballbelgium.be/index.php/competition/vhv-competitions/?season_id=5&organization_id=2&start_date=2025-07-21&end_date=2025-07-27&club_id=112&serie_tab=fullCalendar';

// Documents officiels (PDF Handball Belgium)
export const DOCUMENTS = [
  { label: "Fiche d'affiliation", url: 'https://www.handballbelgium.be/wp-content/uploads/2025/07/Affiliation-Demande.pdf' },
  { label: 'Formulaire de transfert international', url: 'https://www.handballbelgium.be/wp-content/uploads/2025/07/Trasnfert-Formulaire-demande-transfert-international-2025-2026.pdf' },
];

// Paiement de la cotisation
export const IBAN = 'BE07 1261 1084 1566';
export const PAYMENT_DEADLINE = '30/09/2026';
