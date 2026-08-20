import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { house } from '@/content/house';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'clinic' });
  return { title: t('title') };
}

export default async function ClinicPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('clinic');

  return (
    <section className="mx-auto max-w-[760px] px-6 py-16 md:py-24">
      <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('kicker')}</p>
      <h1 className="mt-3 text-5xl font-light md:text-7xl">{t('title')}.</h1>
      <p className="mt-6 text-lg text-muted">{t('lead')}</p>
      <p className="mt-6 text-lg">{t('tech')}</p>
      <figure className="mt-10 max-w-sm border border-line p-4">
        <Image
          src="/tech.jpg"
          alt={t('techCaption')}
          width={487}
          height={372}
          className="h-auto w-full"
        />
        <figcaption className="mt-3 text-sm text-muted">{t('techCaption')}</figcaption>
      </figure>
      <div className="mt-10 flex flex-wrap gap-6">
        <Link href="/locations" className="text-sm tracking-[0.12em] uppercase">
          {t('locationCta')}
        </Link>
        <a href={house.phoneHref}>{house.phone}</a>
      </div>
    </section>
  );
}
