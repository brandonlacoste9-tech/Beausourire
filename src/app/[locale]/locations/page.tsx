import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locations } from '@/content/house';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'locations' });
  return { title: t('title') };
}

export default async function LocationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('locations');
  const lang = locale as Locale;

  return (
    <section className="mx-auto max-w-[960px] px-6 py-16 md:py-24">
      <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('kicker')}</p>
      <h1 className="mt-3 text-5xl font-light md:text-7xl">{t('title')}.</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{t('lead')}</p>
      <div className="mt-14 grid gap-8">
        {locations.map((site) => (
          <article key={site.id} className="border border-line p-8">
            <p className="text-sm text-muted">{site.area[lang]}</p>
            <h2 className="mt-2 text-3xl font-light">{site.name[lang]}</h2>
            <p className="mt-4">
              {site.addressLines[lang].map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block">{site.postal}</span>
            </p>
            <a href={site.phoneHref} className="mt-4 block text-ink">
              {site.phone}
            </a>
            <p className="mt-6 text-sm">
              <span className="block text-muted">{t('visit')}</span>
              {site.visitHours[lang]}
            </p>
            <p className="mt-3 text-sm">
              <span className="block text-muted">{t('phoneHours')}</span>
              {site.phoneHours[lang]}
            </p>
            <a href={site.mapUrl} className="mt-6 inline-block text-sm tracking-[0.12em] uppercase">
              {t('maps')}
            </a>
          </article>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted">{t('note')}</p>
    </section>
  );
}
