import { getLocale, getTranslations } from 'next-intl/server';
import { house, locations } from '@/content/house';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

export async function SiteFooter() {
  const t = await getTranslations('footer');
  const nav = await getTranslations('nav');
  const locale = (await getLocale()) as Locale;

  return (
    <footer className="mt-auto bg-navy pb-16 text-paper">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="text-[0.58rem] tracking-[0.28em] text-gold uppercase">Dentaire</p>
          <p className="wordmark mt-1 text-2xl text-paper">{house.shortName}</p>
          <p className="mt-3 text-sm text-paper/55">{t('line')}</p>
        </div>
        <address className="not-italic text-sm leading-relaxed text-paper/75">
          {locations.map((site) => (
            <span key={site.id} className="mb-4 block">
              <span className="block text-paper">{site.name[locale]}</span>
              {site.addressLines[locale].map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block">{site.postal}</span>
              <a href={site.phoneHref} className="text-paper hover:text-gold">
                {site.phone}
              </a>
            </span>
          ))}
          <a href={`mailto:${house.email}`} className="mt-1 block text-paper hover:text-gold">
            {house.email}
          </a>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] tracking-[0.16em] uppercase">
            <Link href="/locations">{nav('locations')}</Link>
            <Link href="/appointment">{nav('appointments')}</Link>
            <Link href="/contact">{nav('contact')}</Link>
          </div>
        </address>
      </div>
    </footer>
  );
}
