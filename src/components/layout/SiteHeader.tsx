'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LocaleSwitch } from '@/components/layout/LocaleSwitch';
import { house } from '@/content/house';
import { Link, usePathname } from '@/i18n/navigation';

const navItems = [
  { href: '/locations', key: 'locations' },
  { href: '/appointment', key: 'appointments' },
  { href: '/services', key: 'services' },
  { href: '/team', key: 'team' },
  { href: '/clinic', key: 'clinic' },
  { href: '/contact', key: 'contact' },
] as const;

export function SiteHeader() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={open ? 'sticky top-0 z-[70]' : 'sticky top-0 z-30'}>
      <div className="bg-navy text-paper">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-[0.68rem] md:px-6">
          <a href={`mailto:${house.email}`} className="hover:text-gold">
            {house.email}
          </a>
          <span className="flex items-center gap-3">
            <a href={house.phoneHref} className="hover:text-gold">
              {house.phone}
            </a>
          </span>
        </div>
      </div>
      <header className="border-b border-line bg-paper text-ink">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-sm"
        >
          {t('skip')}
        </a>
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4 py-3 md:px-6">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">{t('menu')}</span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span className="block h-px bg-ink" />
              <span className="block h-px bg-ink" />
              <span className="block h-px bg-ink" />
            </span>
          </button>

          <Link href="/" className="flex min-w-0 flex-1 items-center md:flex-none">
            <Image
              src="/logo.png"
              alt={house.name}
              width={140}
              height={128}
              className="h-14 w-auto md:h-16"
              priority
            />
          </Link>

          <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-x-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  pathname === item.href
                    ? 'text-[0.72rem] tracking-[0.16em] text-accent uppercase'
                    : 'text-[0.72rem] tracking-[0.16em] text-ink/70 uppercase hover:text-ink'
                }
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3 md:gap-5">
            <a
              href={house.phoneHref}
              className="inline-flex h-11 items-center bg-navy px-3 text-[0.68rem] tracking-[0.16em] text-paper uppercase md:px-4"
            >
              {t('book')}
            </a>
            <div className="hidden md:block">
              <LocaleSwitch tone="light" />
            </div>
          </div>
        </div>

        {open ? (
          <div
            id="mobile-nav"
            className="fixed inset-0 z-[60] flex flex-col bg-paper text-ink md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t('menu')}
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <Link href="/" onClick={() => setOpen(false)}>
                <Image
                  src="/logo.png"
                  alt={house.name}
                  width={140}
                  height={128}
                  className="h-14 w-auto"
                />
              </Link>
              <button
                type="button"
                className="inline-flex h-11 items-center px-2 text-sm tracking-[0.16em] uppercase"
                onClick={() => setOpen(false)}
              >
                {t('close')}
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 px-6 pt-8" aria-label="Primary">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-line py-4 font-heading text-3xl font-light tracking-wide"
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-6">
              <a
                href={house.phoneHref}
                className="inline-flex h-11 items-center bg-navy px-4 text-[0.72rem] tracking-[0.16em] text-paper uppercase"
              >
                {t('book')}
              </a>
              <LocaleSwitch tone="light" />
            </div>
          </div>
        ) : null}
      </header>
    </div>
  );
}
