import { SITE } from '@/data/site';

// Es wird KEINE Domain erfunden.
// Reihenfolge: NEXT_PUBLIC_SITE_URL (z. B. https://www.deine-domain.de) → Vercel-Produktions-Domain
// (VERCEL_PROJECT_PRODUCTION_URL, wird von Vercel automatisch gesetzt) → keine Domain.
function validOrigin(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.origin : null;
  } catch {
    return null;
  }
}

export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    const o = validOrigin(explicit);
    if (o) return o;
  }
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return validOrigin(`https://${vercel}`);
  return null;
}

// Basis für relative Bild-URLs (og:image). Auf Preview-Deployments steht nur VERCEL_URL zur Verfügung.
export function metadataBaseUrl() {
  const prod = siteUrl();
  if (prod) return prod;
  const preview = process.env.VERCEL_URL;
  return preview ? validOrigin(`https://${preview}`) : null;
}

export const OG_IMAGE = { url: '/og/fresh-car-hamm-og.png', width: 1200, height: 630, alt: `${SITE.name} – ${SITE.claim}` };

function socialImages() {
  return metadataBaseUrl() ? [OG_IMAGE] : undefined;
}

// Open Graph + Twitter-Card (Bild nur, wenn eine Basis-URL bekannt ist — sonst würde Next localhost eintragen).
export function socialMetadata({ title, description, url }) {
  const images = socialImages();
  return {
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: SITE.name,
      locale: 'de_DE',
      ...(url && siteUrl() ? { url } : {}),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}

// Metadaten je Seite. Canonical/og:url nur, wenn die echte Domain bekannt ist.
export function pageMetadata({ title, description, path }) {
  return {
    title,
    description,
    ...(siteUrl() ? { alternates: { canonical: path } } : {}),
    ...socialMetadata({ title: `${title} | ${SITE.name}`, description, url: path }),
  };
}

// JSON-LD sicher einbetten ("<" maskieren, damit nie ein </script> im Inhalt entstehen kann).
export function jsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
