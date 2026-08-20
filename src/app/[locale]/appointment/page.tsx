import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { bookingDoors, house } from '@/content/house';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'appointments' });
  return { title: t('title') };
}

export default async function AppointmentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('appointments');
  const lang = locale as Locale;

  return (
    <>
      <section className="bg-navy text-paper">
        <div className="mx-auto max-w-[1080px] px-6 py-16 md:py-20">
          <h1 className="font-heading text-6xl font-light md:text-8xl">{t('title')}.</h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-paper/80">{t('lead')}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1080px] gap-6 px-6 py-16 md:grid-cols-2">
        {bookingDoors.map((door) => (
          <article key={door.id} className="border border-line p-8">
            <h2 className="text-3xl font-light">{door.title[lang]}</h2>
            <p className="mt-4 text-muted">{door.body[lang]}</p>
            <a href={door.href} className="btn btn-solid mt-8">
              {door.cta[lang]}
            </a>
          </article>
        ))}
      </section>
      <p className="mx-auto max-w-[760px] px-6 pb-8 text-sm text-muted">{t('hoursNote')}</p>
      <section className="px-6 py-10">
        <div className="mx-auto max-w-[760px] rounded-xl bg-navy px-8 py-10 text-center text-paper">
          <p className="text-lg">{t('urgentLead')}</p>
        </div>
      </section>
      <p className="mx-auto max-w-[760px] px-6 pb-16 text-center text-sm text-muted">{t('emailNote')}</p>
      <p className="sr-only">{house.name}</p>
    </>
  );
}
