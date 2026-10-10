import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ReviewsPanel from '@/components/ReviewsPanel';
import ReviewsSteps from '@/components/ReviewsSteps';
import CtaBand from '@/components/CtaBand';
import PagePager from '@/components/PagePager';
import Icon from '@/components/Icon';
import { SITE, LINKS } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Bewertungen',
  description: `Google-Bewertung von Fresh Car Hamm: ${SITE.google.ratingLabel} von 5 Sternen bei ${SITE.google.reviewCount} Rezensionen. Direkt auf Google nachlesen oder selbst eine Bewertung abgeben.`,
  path: '/bewertungen',
});

export default function BewertungenPage() {
  return (
    <>
      <PageHero
        crumb="Bewertungen"
        path="/bewertungen"
        mark="05"
        title="ECHTE ERGEBNISSE."
        accent="ECHTES FEEDBACK."
        actions={
          <>
            <a className="btn btn-primary rv-hero-btn" href={LINKS.googleReview} target="_blank" rel="noopener noreferrer">
              <Icon name="star" size={18} /> Jetzt bewerten
            </a>
            <Link className="btn btn-ghost" href="/termin">
              Termin anfragen <Icon name="arrow-right" size={18} />
            </Link>
          </>
        }
      >
        <p>Was andere Kunden über Fresh Car Hamm schreiben, steht direkt auf Google – für alle einsehbar. Wir zeigen hier bewusst keine ausgewählten Zitate.</p>
      </PageHero>

      <ReviewsPanel />

      <section className="section rv-how" aria-labelledby="rv-how-title">
        <div className="section-head compact" data-reveal>
          <div>
            <div className="eyebrow">
              <span aria-hidden="true" /> IN DREI SCHRITTEN
            </div>
            <h2 id="rv-how-title">
              SO BEWERTEST{' '}
              <em>DU UNS.</em>
            </h2>
          </div>
          <p>Ein paar Klicks genügen. Für eine Google-Bewertung brauchst du ein Google-Konto.</p>
        </div>

        <ReviewsSteps />

        <div className="rv-honest" data-reveal>
          <span className="rv-honest-icon" aria-hidden="true">
            <Icon name="star" size={22} />
          </span>
          <div>
            <strong>Alle Bewertungen findest du auf Google.</strong>
            <p>Sämtliche Rezensionen sind dort öffentlich nachlesbar – direkt im Google-Eintrag von Fresh Car Hamm.</p>
          </div>
          <a className="btn btn-ghost" href={LINKS.googleMaps} target="_blank" rel="noopener noreferrer">
            Rezensionen auf Google <Icon name="arrow-up-right" size={18} />
          </a>
        </div>
      </section>

      <CtaBand
        title="Überzeug dich"
        accent="selbst."
        text="Lies die Rezensionen auf Google – und wenn du Fresh Car Hamm selbst erleben willst, schick uns deine Anfrage. Die WhatsApp-Nachricht wird automatisch für dich vorbereitet."
      />
      <PagePager href="/bewertungen" />
    </>
  );
}
