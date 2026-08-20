import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { services } from '@/content/house';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return { title: t('title') };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');
  const lang = locale as Locale;

  return (
    <section className="mx-auto max-w-[760px] px-6 py-16 md:py-24">
      <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('kicker')}</p>
      <h1 className="mt-3 text-5xl font-light md:text-7xl">{t('title')}.</h1>
      <p className="mt-6 text-lg text-muted">{t('lead')}</p>
      <ul className="mt-10 space-y-3">
        {services.map((item) => (
          <li key={item.id} className="border-t border-line pt-3">
            {item.title[lang]}
          </li>
        ))}
      </ul>
      <Link href="/appointment" className="mt-12 inline-block text-sm tracking-[0.12em] uppercase">
        {t('book')} →
      </Link>
    </section>
  );
}
