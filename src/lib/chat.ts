import { house, locations } from '@/content/house';
import type { Locale } from '@/i18n/routing';

function fold(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function has(text: string, ...needles: string[]): boolean {
  return needles.some((n) => text.includes(n));
}

function say(locale: Locale, lines: Record<Locale, string>): string {
  return lines[locale];
}

export function openingChat(locale: Locale): string {
  return say(locale, {
    en: 'Bonjour. Clinique Dentaire du Centre-Ville — 980 Sainte-Catherine Ouest. I can point you to the phone or their registration form. I do not book a slot. I cannot give medical advice.',
    fr: 'Bonjour. Clinique Dentaire du Centre-Ville — 980 Sainte-Catherine Ouest. Je peux vous orienter vers le téléphone ou leur questionnaire. Je ne réserve pas. Je ne donne pas de conseils médicaux.',
  });
}

export type BookStep = 'idle' | 'reason' | 'attached';
export type ChatLink = { href: string; label: string };
export type ChatReply = { reply: string; step: BookStep; reason: string; links: ChatLink[] };
export type BookState = { step: BookStep; reason: string };

export function emailNote(text: string) {
  const subject = encodeURIComponent('Question from the website');
  const body = encodeURIComponent(text);
  return `mailto:${house.email}?subject=${subject}&body=${body}`;
}

export function continueChat(raw: string, locale: Locale, _state?: BookState): ChatReply {
  const q = fold(raw);
  const empty = { step: 'idle' as const, reason: '', links: [] as ChatLink[] };
  const site = locations[0];

  if (has(q, '911', 'emergency', 'urgence', 'chest pain', 'suicide')) {
    return {
      ...empty,
      reply: say(locale, {
        en: 'If this cannot wait: 911 or a hospital emergency room. The clinic prints closed on Saturday and Sunday.',
        fr: 'Si ça ne peut pas attendre : 911 ou l’urgence d’un hôpital. La clinique imprime fermé samedi et dimanche.',
      }),
      links: [
        { href: 'tel:911', label: '911' },
        { href: house.phoneHref, label: house.phone },
      ],
    };
  }

  if (has(q, 'hour', 'open', 'horaire', 'ouvert', 'weekend', 'samedi', 'dimanche')) {
    return {
      ...empty,
      reply: say(locale, {
        en: 'Monday–Friday 9:00–19:00. Saturday and Sunday closed. 980 Sainte-Catherine Ouest, suite 200.',
        fr: 'Lundi au vendredi 9 h – 19 h. Samedi et dimanche fermé. 980 Sainte-Catherine Ouest, bureau 200.',
      }),
      links: [{ href: house.phoneHref, label: house.phone }],
    };
  }

  if (has(q, 'form', 'questionnaire', 'register', 'inscription', 'new patient', 'nouveau')) {
    return {
      ...empty,
      reply: say(locale, {
        en: 'New-patient paperwork stays on their live site. We do not collect health records here.',
        fr: 'Le questionnaire des nouveaux patients reste sur leur site. On ne recueille pas de dossier ici.',
      }),
      links: [{ href: house.registrationForm, label: locale === 'fr' ? 'Formulaire' : 'Form' }],
    };
  }

  if (
    has(
      q,
      'book',
      'rendez',
      'rdv',
      'appointment',
      'price',
      'tarif',
      'cout',
      'tooth',
      'dent',
      'whitening',
      'blanchiment',
      'implant',
      'cleaning',
      'nettoyage',
      'extraction',
      'canal',
    )
  ) {
    return {
      ...empty,
      reply: say(locale, {
        en: 'I do not book, and they do not publish a fee list. Call 514-861-5252 during hours. New patients can start with the form they already host.',
        fr: 'Je ne réserve pas, et ils ne publient pas de liste de tarifs. 514-861-5252 pendant les heures. Les nouveaux patients peuvent commencer par le questionnaire qu’ils hébergent déjà.',
      }),
      links: [
        { href: house.phoneHref, label: house.phone },
        { href: house.registrationForm, label: locale === 'fr' ? 'Formulaire' : 'Form' },
      ],
    };
  }

  return {
    ...empty,
    reply: say(locale, {
      en: `I can help with hours or the address. Call ${house.phone}. Urgent: 911.`,
      fr: `Je peux aider pour les heures ou l’adresse. Appelez ${house.phone}. Urgent : 911.`,
    }),
    links: [
      { href: house.phoneHref, label: house.phone },
      { href: site.mapUrl, label: locale === 'fr' ? 'Carte' : 'Map' },
    ],
  };
}
