export const CLINIC_VOICE = 'UJCi4DDncuo0VJDSIegj';
export const FALLBACK_VOICE = 'pFZP5JQG7iQjIQuC4Bku';

export type VoiceLocale = 'en' | 'fr';

export function parseVoiceRequest(body: unknown): {
  text: string;
  locale: VoiceLocale;
} | null {
  if (!body || typeof body !== 'object') return null;
  if (!('text' in body) || typeof body.text !== 'string') return null;
  const text = body.text.trim();
  if (text.length < 1 || text.length > 700) return null;
  const raw = 'locale' in body && typeof body.locale === 'string' ? body.locale : 'en';
  const locale: VoiceLocale = raw === 'fr' ? 'fr' : 'en';
  return { text, locale };
}

export function elevenLabsConfig() {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim() ?? '';
  const voiceId = process.env.ELEVENLABS_VOICE_ID?.trim() || CLINIC_VOICE;
  return { apiKey, voiceId };
}
