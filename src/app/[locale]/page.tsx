import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { bookingDoors, house, locations, services } from '@/content/house';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const lang = locale as Locale;
  const site = locations[0];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy">
        <div className="relative min-h-[min(72vh,42rem)]">
          <Image
            src="/hero-operatory.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_38%]"
          />
          <div
            className="absolute inset-0 z-[2] bg-gradient-to-r from-navy/82 via-navy/40 to-navy/12"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto flex min-h-[min(72vh,42rem)] max-w-[1280px] flex-col justify-end px-6 pb-24 pt-28">
            <div className="max-w-xl bg-navy/80 p-6 backdrop-blur-[2px] md:p-8">
              <p className="text-[0.72rem] tracking-[0.28em] text-gold uppercase">{t('kicker')}</p>
              <h1 className="mt-4 font-heading text-[3.2rem] leading-[0.92] font-light text-paper md:text-[5.2rem]">
                {t('title')}
              </h1>
              <p className="mt-5 text-lg font-light text-paper/90">{t('lead')}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={house.phoneHref} className="btn bg-accent text-paper hover:bg-[#186a96]">
                  {t('ctaCall')}
                </a>
                <Link href="/appointment" className="btn btn-frost">
                  {t('ctaBook')}
                </Link>
                <a href={house.registrationForm} className="btn btn-frost">
                  {t('ctaForm')}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-20 mx-auto grid max-w-[1280px] -mt-10 grid-cols-2 md:grid-cols-4">
          <Link href="/locations" className="bg-[#1f7eb0] px-4 py-8 text-center text-paper hover:bg-[#186a96]">
            <span className="block text-[0.78rem] tracking-[0.16em] uppercase">{t('tileHours')}</span>
            <span className="mt-1 block text-xs text-paper/80">{t('tileHoursSub')}</span>
          </Link>
          <Link href="/appointment" className="bg-[#2b91c4] px-4 py-8 text-center text-paper hover:bg-[#1f7eb0]">
            <span className="block text-[0.78rem] tracking-[0.16em] uppercase">{t('tileCall')}</span>
            <span className="mt-1 block text-xs text-paper/80">{t('tileCallSub')}</span>
          </Link>
          <Link href="/services" className="bg-[#4aa3c7] px-4 py-8 text-center text-paper hover:bg-[#2b91c4]">
            <span className="block text-[0.78rem] tracking-[0.16em] uppercase">{t('tileServices')}</span>
            <span className="mt-1 block text-xs text-paper/80">{t('tileServicesSub')}</span>
          </Link>
          <Link href="/contact" className="bg-[#7eb8d4] px-4 py-8 text-center text-navy hover:bg-[#4aa3c7]">
            <span className="block text-[0.78rem] tracking-[0.16em] uppercase">{t('tileContact')}</span>
            <span className="mt-1 block text-xs text-navy/70">{t('tileContactSub')}</span>
          </Link>
        </div>
      </section>

      <p className="bg-wash py-4 text-center text-[0.72rem] tracking-[0.18em] text-muted uppercase">{t('strip')}</p>

      <section className="mx-auto max-w-[1080px] px-6 py-20">
        <h2 className="text-4xl font-light md:text-6xl">{t('bookTitle')}</h2>
        <p className="mt-6 max-w-2xl text-lg text-muted">{t('bookLead')}</p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {bookingDoors.map((door) => (
            <li key={door.id} className="border border-line p-6">
              <h3 className="text-2xl font-light">{door.title[lang]}</h3>
              <p className="mt-3 text-muted">{door.body[lang]}</p>
              <a href={door.href} className="mt-5 inline-block text-sm tracking-[0.12em] uppercase">
                {door.cta[lang]} →
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-wash">
        <div className="mx-auto grid max-w-[1080px] gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('placeKicker')}</p>
            <h2 className="mt-3 text-4xl font-light md:text-5xl">{t('placeTitle')}</h2>
            <p className="mt-6 text-lg text-muted">{t('placeLead')}</p>
            <p className="mt-5 text-ink">
              {site.addressLines[lang].map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block">{site.postal}</span>
            </p>
            <a
              href={site.mapUrl}
              className="mt-6 inline-block text-sm tracking-[0.12em] uppercase"
            >
              {t('placeMap')} →
            </a>
          </div>
          <div>
            <h3 className="text-2xl font-light">{t('hoursTitle')}</h3>
            <dl className="mt-6">
              <div className="flex justify-between gap-4 border-t border-line py-3">
                <dt>{t('hoursWeek')}</dt>
                <dd>{t('hoursWeekTime')}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-line py-3">
                <dt>{t('hoursSat')}</dt>
                <dd>{t('hoursClosed')}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-b border-line py-3">
                <dt>{t('hoursSun')}</dt>
                <dd>{t('hoursClosed')}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-muted">{t('hoursNote')}</p>
            <a href={house.phoneHref} className="mt-6 inline-block text-sm tracking-[0.12em] uppercase">
              {house.phone} →
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-6 py-20">
        <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('svcKicker')}</p>
        <h2 className="mt-3 text-4xl font-light md:text-6xl">{t('svcTitle')}</h2>
        <p className="mt-6 max-w-2xl text-lg text-muted">{t('svcLead')}</p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {services.map((item) => (
            <li key={item.id} className="border-t border-line pt-3">
              {item.title[lang]}
            </li>
          ))}
        </ul>
        <Link href="/services" className="mt-8 inline-block text-sm tracking-[0.12em] uppercase">
          {t('svcMore')} →
        </Link>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto max-w-[1080px] px-6 py-20">
          <h2 className="text-4xl font-light md:text-6xl">{t('aboutTitle')}</h2>
          <p className="mt-6 max-w-2xl text-lg font-light text-paper/85">{t('aboutLead')}</p>
          <p className="mt-4 text-sm text-paper/65">{site.visitHours[lang]}</p>
          <Link href="/clinic" className="mt-8 inline-block text-sm tracking-[0.12em] text-gold uppercase">
            {t('aboutCta')} →
          </Link>
        </div>
      </section>
    </>
  );
}
