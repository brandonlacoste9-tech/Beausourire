import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { house, locations } from '@/content/house';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title') };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const lang = locale as Locale;

  return (
    <section className="mx-auto max-w-[760px] px-6 py-16 md:py-24">
      <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('kicker')}</p>
      <h1 className="mt-3 text-5xl font-light md:text-7xl">{t('title')}.</h1>
      <div className="mt-12 space-y-10">
        {locations.map((site) => (
          <article key={site.id}>
            <h2 className="text-3xl font-light">{site.name[lang]}</h2>
            <p className="mt-3">
              {site.addressLines[lang].map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block">{site.postal}</span>
            </p>
            <a href={site.phoneHref} className="mt-3 block">
              {site.phone}
            </a>
            <p className="mt-2 text-sm text-muted">{site.visitHours[lang]}</p>
            <a href={site.mapUrl} className="mt-2 inline-block text-sm">
              {t('map')}
            </a>
          </article>
        ))}
      </div>
      <h2 className="mt-14 text-3xl font-light">{t('emailTitle')}</h2>
      <a href={`mailto:${house.email}`} className="mt-4 block">
        {house.email}
      </a>
      <p className="mt-3 text-sm text-muted">{t('emailNote')}</p>
      <Link href="/appointment" className="mt-10 inline-block text-sm tracking-[0.12em] uppercase">
        {t('bookCta')}
      </Link>
    </section>
  );
}
