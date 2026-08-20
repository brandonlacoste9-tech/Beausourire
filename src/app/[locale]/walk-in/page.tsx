import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { house } from '@/content/house';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'walkin' });
  return { title: t('title') };
}

export default async function WalkInPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('walkin');

  return (
    <section className="mx-auto max-w-[760px] px-6 py-16 md:py-24">
      <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('kicker')}</p>
      <h1 className="mt-3 text-5xl font-light text-ink md:text-7xl">{t('title')}.</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">{t('lead')}</p>
      <p className="mt-6 text-ink">{t('hours')}</p>
      <p className="mt-3 text-sm text-muted">{t('hoursConflict')}</p>

      <div className="mt-10 flex flex-wrap gap-3">
        <a href={house.phoneHref} className="btn btn-solid">
          {house.phone}
        </a>
        <a href="tel:911" className="btn btn-ghost">
          911
        </a>
      </div>
      <p className="mt-6 text-ink">{t('phoneOption')}</p>

      <h2 className="mt-16 text-3xl text-ink">{t('listTitle')}</h2>
      <ul className="mt-5 list-disc space-y-2 pl-5 text-ink">
        <li>{t('item1')}</li>
        <li>{t('item2')}</li>
        <li>{t('item3')}</li>
        <li>{t('item4')}</li>
      </ul>

      <h2 className="mt-16 text-3xl text-ink">{t('familyTitle')}</h2>
      <p className="mt-5 text-lg leading-relaxed text-muted">{t('familyLead')}</p>
      <a href={house.registrationForm} className="btn btn-solid mt-8">
        {t('formCta')}
      </a>

      <p className="mt-10 text-lg leading-relaxed text-ink">{t('urgent')}</p>

      <div className="mt-10 flex flex-wrap gap-6">
        <Link href="/appointment" className="text-sm tracking-[0.12em] uppercase">
          {t('back')}
        </Link>
        <Link href="/contact" className="text-sm tracking-[0.12em] uppercase">
          {t('contact')}
        </Link>
      </div>
    </section>
  );
}
