'use client';

import { useTranslations } from 'next-intl';
import { house } from '@/content/house';

export function WalkinBar() {
  const hours = useTranslations('hours');
  const nav = useTranslations('nav');

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-accent text-paper">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-1 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <p className="text-[0.62rem] tracking-[0.04em] text-paper/90 sm:text-[0.68rem]">{hours('banner')}</p>
        <a
          href={house.phoneHref}
          className="text-[0.72rem] font-medium tracking-[0.04em] text-paper underline-offset-2 hover:underline"
        >
          {nav('call')}
        </a>
      </div>
    </div>
  );
}
