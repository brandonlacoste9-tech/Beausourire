import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: '/:locale/appointments',
        destination: '/:locale/appointment',
        permanent: false,
      },
      {
        source: '/:locale/walkin',
        destination: '/:locale/walk-in',
        permanent: false,
      },
      {
        source: '/:locale/sans-rendez-vous',
        destination: '/:locale/walk-in',
        permanent: false,
      },
      {
        source: '/:locale/our-clinic',
        destination: '/:locale/clinic',
        permanent: false,
      },
      {
        source: '/:locale/about-us',
        destination: '/:locale/clinic',
        permanent: false,
      },
      {
        source: '/:locale/our-team',
        destination: '/:locale/team',
        permanent: false,
      },
      {
        source: '/:locale/contact-us',
        destination: '/:locale/contact',
        permanent: false,
      },
      {
        source: '/:locale/book-online',
        destination: '/:locale/appointment',
        permanent: false,
      },
      {
        source: '/:locale/a-propos',
        destination: '/:locale/clinic',
        permanent: false,
      },
      {
        source: '/:locale/notre-equipe',
        destination: '/:locale/team',
        permanent: false,
      },
      {
        source: '/:locale/nous-joindre',
        destination: '/:locale/contact',
        permanent: false,
      },
      {
        source: '/:locale/reservez-en-ligne',
        destination: '/:locale/appointment',
        permanent: false,
      },
      {
        source: '/:locale/downtown',
        destination: '/:locale/locations',
        permanent: false,
      },
      {
        source: '/:locale/careers',
        destination: '/:locale/contact',
        permanent: false,
      },
      {
        source: '/:locale/carriere',
        destination: '/:locale/contact',
        permanent: false,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
