export type Attachment = 'yes' | 'no';
export type BookPath = 'emergency' | 'portal' | 'gap' | 'cancel' | 'pregnancy' | 'gamf' | 'contact';
export type Orientation = { path: BookPath; speak: { en: string; fr: string } };

export function reasonResolvesWithoutAttachment(_reason: string): boolean {
  return false;
}

export function orient(_reason: string, _attached: Attachment): Orientation {
  return {
    path: 'contact',
    speak: {
      en: 'Call the clinic during hours, or use the registration form they already host.',
      fr: 'Téléphonez pendant les heures, ou utilisez le questionnaire qu’ils hébergent déjà.',
    },
  };
}
