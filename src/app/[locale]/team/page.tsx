import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { house } from '@/content/house';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'team' });
  return { title: t('title') };
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('team');

  return (
    <section className="mx-auto max-w-[760px] px-6 py-16 md:py-24">
      <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('kicker')}</p>
      <h1 className="mt-3 text-5xl font-light md:text-7xl">{t('title')}.</h1>
      <p className="mt-6 text-lg text-muted">{t('lead')}</p>
      <div className="mt-10 flex flex-wrap gap-6">
        <a href={house.phoneHref} className="btn btn-solid">
          {house.phone}
        </a>
        <a href={house.registrationForm} className="text-sm tracking-[0.12em] uppercase">
          {t('formCta')} →
        </a>
        <Link href="/appointment" className="text-sm tracking-[0.12em] uppercase">
          {t('bookCta')}
        </Link>
      </div>
    </section>
  );
}
