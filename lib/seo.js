import { SITE } from '@/data/site';

// Es wird KEINE Domain erfunden. Auf Vercel liefert VERCEL_PROJECT_PRODUCTION_URL die echte Produktions-Domain;
// alternativ kann NEXT_PUBLIC_SITE_URL gesetzt werden (z. B. https://www.deine-domain.de).
export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return null;
}

// Metadaten je Seite. Canonical/og:url nur, wenn die echte Domain bekannt ist.
export function pageMetadata({ title, description, path }) {
  const url = siteUrl();
  const fullTitle = `${title} | ${SITE.name}`;
  return {
    title,
    description,
    ...(url ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      type: 'website',
      siteName: SITE.name,
      locale: 'de_DE',
      ...(url ? { url: path } : {}),
    },
  };
}
