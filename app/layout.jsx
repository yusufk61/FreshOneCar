import './globals.css';
import './styles/shell.css';
import './styles/pages.css';
import './styles/catalog.css';
import './styles/booking.css';
import './styles/media.css';
import './styles/pickup.css';
import './styles/info.css';
import './styles/legal.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollProgress from '@/components/ScrollProgress';
import RevealObserver from '@/components/RevealObserver';
import { SITE, LINKS } from '@/data/site';
import { siteUrl, metadataBaseUrl, socialMetadata, jsonLd } from '@/lib/seo';

const base = siteUrl();
const metaBase = metadataBaseUrl();
const homeDescription = 'Dein Auto. Frisch wie neu. Innenraum, Außenpflege, Politur und Abhol- & Bringservice in Hamm.';

export const metadata = {
  ...(metaBase ? { metadataBase: new URL(metaBase) } : {}),
  title: {
    default: `${SITE.name} | ${SITE.claim}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  formatDetection: { telephone: false },
  ...socialMetadata({ title: `${SITE.name} | ${SITE.claim}`, description: homeDescription }),
};

export const viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutomotiveBusiness',
  name: SITE.name,
  description: 'Fahrzeugaufbereitung, Innenraumreinigung, Außenpflege, Politur sowie optionaler Abhol- und Bringservice in Hamm.',
  telephone: SITE.phone.schema,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    postalCode: SITE.address.postalCode,
    addressLocality: SITE.address.city,
    addressCountry: SITE.address.country,
  },
  hasMap: LINKS.googleMaps,
  sameAs: [LINKS.instagram, LINKS.googleMaps],
  ...(base ? { url: base, logo: `${base}/brand/fresh-car-hamm-logo.png`, image: `${base}/brand/fresh-car-hamm-logo.png` } : {}),
  // Vor Veröffentlichung aktuelles Google Rating prüfen (Werte zentral in data/site.js).
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: SITE.google.rating.toFixed(1),
    reviewCount: String(SITE.google.reviewCount),
    bestRating: '5',
    worstRating: '1',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <a className="skip-link" href="#main-content">
          Zum Inhalt springen
        </a>
        <ScrollProgress />
        <Header />
        <main id="main-content" tabIndex={-1} data-menu-inert>
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <RevealObserver />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema) }} />
      </body>
    </html>
  );
}
