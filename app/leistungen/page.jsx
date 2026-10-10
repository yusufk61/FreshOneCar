import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ServiceCatalog from '@/components/ServiceCatalog';
import CtaBand from '@/components/CtaBand';
import PagePager from '@/components/PagePager';
import Icon from '@/components/Icon';
import { ALL_SERVICES, MIN_PRICES } from '@/data/services';
import { PRICE_NOTE, SITE } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Leistungen & Preise',
  description:
    'Innenraumpaket 150 €, Außenpaket 100 €, Polituren ab 150 € und über 20 Extras – alle Leistungen und Preise von Fresh Car Hamm in Hamm auf einen Blick. Direkt per WhatsApp anfragen.',
  path: '/leistungen',
});

// Strukturierte Daten direkt aus data/services.js — nichts hart erfunden.
const offerCatalog = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: `Leistungen & Preise – ${SITE.name}`,
  itemListElement: ALL_SERVICES.map((s) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: s.name, ...(s.text ? { description: s.text } : {}), provider: { '@type': 'AutomotiveBusiness', name: SITE.name } },
    priceCurrency: 'EUR',
    ...(s.priceKind === 'fix' ? { price: String(s.priceFrom) } : {}),
    ...(s.priceKind === 'from' ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: String(s.priceFrom), priceCurrency: 'EUR' } } : {}),
  })),
};

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        crumb="Leistungen & Preise"
        path="/leistungen"
        mark="02"
        title="DETAILS MACHEN"
        accent="DEN UNTERSCHIED."
        actions={
          <>
            <Link className="btn btn-primary" href="/termin">
              Termin anfragen <Icon name="arrow-up-right" size={18} />
            </Link>
            <Link className="btn btn-ghost" href="/abholservice">
              Abholservice <Icon name="arrow-right" size={18} />
            </Link>
          </>
        }
        meta={
          <>
            <div>
              <strong>01</strong>
              <span>
                Pakete ab
                <br />
                {MIN_PRICES.pakete} €
              </span>
            </div>
            <div>
              <strong>02</strong>
              <span>
                Polituren ab
                <br />
                {MIN_PRICES.polituren} €
              </span>
            </div>
            <div>
              <strong>03</strong>
              <span>
                Extras ab
                <br />
                {MIN_PRICES.extras} €
              </span>
            </div>
          </>
        }
      >
        <p>Pakete, Polituren und Extras – mit klaren Ab-Preisen. Tippe auf eine Leistung, um sie direkt per WhatsApp anzufragen.</p>
        <p>{PRICE_NOTE}</p>
      </PageHero>

      <ServiceCatalog />

      <section className="pickup-hint" aria-label="Hinweis Abholservice">
        <div className="pickup-hint-inner" data-reveal>
          <span className="pickup-hint-badge">NEU</span>
          <div>
            <strong>Keine Zeit, das Auto zu bringen?</strong>
            <p>Wir holen dein Fahrzeug nach Absprache ab und bringen es nach der Aufbereitung zurück – gegen Aufpreis.</p>
          </div>
          <Link className="btn btn-ghost" href="/abholservice">
            Abhol- &amp; Bringservice <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </section>

      <CtaBand text="Such dir deine Leistungen aus und schick uns die Anfrage – wir melden uns direkt auf WhatsApp zurück." />
      <PagePager href="/leistungen" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalog) }} />
    </>
  );
}
