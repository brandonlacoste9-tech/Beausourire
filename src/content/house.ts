export const house = {
  name: 'Clinique Dentaire du Centre-Ville',
  shortName: 'Beausourire',
  email: 'info@beausourire.com',
  founded: 1997,
  liveSite: 'https://www.beausourire.com/',
  phone: '514-861-5252',
  phoneHref: 'tel:+15148615252',
  registrationForm: 'https://www.beausourire.com/questionnaire-dinscription-confidentiel/',
} as const;

export const locations = [
  {
    id: 'downtown' as const,
    slug: 'downtown',
    name: {
      en: 'Montreal Downtown Dental Clinic',
      fr: 'Clinique Dentaire du Centre-Ville',
    },
    area: { en: 'Downtown Montreal', fr: 'Centre-ville de Montréal' },
    addressLines: {
      en: ['980 Sainte-Catherine Ouest, suite 200', 'Montréal, QC'],
      fr: ['980 Sainte-Catherine Ouest, bureau 200', 'Montréal, QC'],
    },
    postal: 'H3B 1E5',
    phone: house.phone,
    phoneAlt: '',
    phoneHref: house.phoneHref,
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=980+Sainte-Catherine+Ouest+Montreal+QC+H3B+1E5',
    visitHours: {
      en: 'Monday–Friday 9:00–19:00 · Saturday–Sunday closed',
      fr: 'Lundi au vendredi 9 h – 19 h · Samedi et dimanche fermé',
    },
    phoneHours: {
      en: 'Call during opening hours. They do not publish an after-hours emergency line on the site.',
      fr: 'Téléphonez pendant les heures d’ouverture. Ils ne publient pas de ligne d’urgence hors heures sur le site.',
    },
    businessHours: {
      en: 'As printed in the sidebar of beausourire.com. Weekends closed.',
      fr: 'Comme imprimé dans la barre latérale de beausourire.com. Fins de semaine fermées.',
    },
  },
] as const;

export const bookingDoors = [
  {
    id: 'call',
    title: { en: 'Call the clinic', fr: 'Téléphoner à la clinique' },
    body: {
      en: 'They do not publish an online booker. 514-861-5252, Monday–Friday 9:00–19:00. This site does not book a slot.',
      fr: 'Ils ne publient pas de réservation en ligne. 514-861-5252, lundi au vendredi 9 h – 19 h. Ce site ne réserve pas de plage.',
    },
    href: house.phoneHref,
    cta: { en: 'Call 514-861-5252', fr: 'Appeler 514-861-5252' },
  },
  {
    id: 'form',
    title: { en: 'New-patient form', fr: 'Questionnaire d’inscription' },
    body: {
      en: 'Their live site still has a confidential registration form. We send you there — we do not collect health or RAMQ numbers here.',
      fr: 'Leur site a encore un questionnaire d’inscription confidentiel. On vous y envoie — on ne recueille pas de dossier ou de numéro RAMQ ici.',
    },
    href: house.registrationForm,
    cta: { en: 'Their form', fr: 'Leur formulaire' },
  },
  {
    id: 'email',
    title: { en: 'Email', fr: 'Courriel' },
    body: {
      en: 'info@beausourire.com is on the homepage. Email does not book a visit unless they say so — they do not.',
      fr: 'info@beausourire.com est sur l’accueil. Le courriel ne réserve pas une visite, sauf s’ils le disent — ils ne le disent pas.',
    },
    href: `mailto:${house.email}`,
    cta: { en: 'info@beausourire.com', fr: 'info@beausourire.com' },
  },
  {
    id: 'urgent',
    title: { en: 'If this cannot wait', fr: 'Si ça ne peut pas attendre' },
    body: {
      en: 'Call the clinic during hours. After hours: 911, or a hospital emergency room. They do not print a weekend emergency number.',
      fr: 'Téléphonez pendant les heures. Hors heures : 911, ou l’urgence d’un hôpital. Ils n’impriment pas de numéro d’urgence le week-end.',
    },
    href: 'tel:911',
    cta: { en: '911', fr: '911' },
  },
] as const;

export const services = [
  { id: 'exam', title: { en: 'Exam and cleaning', fr: 'Examen et nettoyage' } },
  { id: 'whitening', title: { en: 'Whitening', fr: 'Blanchiment' } },
  { id: 'cosmetic', title: { en: 'Cosmetic dentistry', fr: 'Dentisterie esthétique' } },
  { id: 'veneers', title: { en: 'Porcelain veneers', fr: 'Facettes de porcelaine' } },
  { id: 'ortho', title: { en: 'Orthodontics', fr: 'Orthodontie' } },
  { id: 'root', title: { en: 'Root canal', fr: 'Traitements de canaux' } },
  { id: 'extract', title: { en: 'Extractions (wisdom teeth)', fr: 'Extractions (dents de sagesse)' } },
  { id: 'gums', title: { en: 'Gum treatments', fr: 'Traitements de gencives' } },
  { id: 'denture', title: { en: 'Dentures', fr: 'Prothèse dentaire' } },
  { id: 'crowns', title: { en: 'Bridges and crowns', fr: 'Ponts et couronnes' } },
  { id: 'implants', title: { en: 'Implants', fr: 'Implants' } },
] as const;
