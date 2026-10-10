import Image from 'next/image';
import Icon from './Icon';
import Stars from './Stars';
import { SITE, LINKS } from '@/data/site';

const { ratingLabel, reviewCount } = SITE.google;
const reviewWord = reviewCount === 1 ? 'Rezension' : 'Rezensionen';

// Volle Variante des Bewertungs-Panels (Startseite nutzt .reviews-shell.is-compact).
// Alle Zahlen kommen ausschließlich aus data/site.js. Es werden bewusst KEINE Rezensionstexte oder Namen gezeigt.
export default function ReviewsPanel() {
  return (
    <section className="section reviews rv-panel" aria-labelledby="reviews-title">
      <div className="reviews-shell" data-reveal>
        <div className="reviews-score">
          <div className="eyebrow">
            <span aria-hidden="true" /> GOOGLE REVIEWS
          </div>
          <div className="rating-number" aria-hidden="true">
            {ratingLabel}
          </div>
          <Stars size={24} label={`${ratingLabel} von 5 Sternen`} />
          <p>
            <strong>
              {reviewCount} {reviewWord}
            </strong>{' '}
            auf Google
          </p>
        </div>

        <div className="reviews-copy">
          <span className="reviews-kicker">Vertrauen entsteht nicht durch Werbung.</span>
          <h2 id="reviews-title">
            SONDERN DURCH{' '}
            <em>ECHTE ERFAHRUNGEN.</em>
          </h2>
          <p>Die Bewertungen findest du direkt auf Google – dort kannst du sie in Ruhe nachlesen. Und wenn du zufrieden warst, freuen wir uns über deine eigene Bewertung.</p>
          <div className="reviews-actions">
            <a className="btn btn-primary" href={LINKS.googleReview} target="_blank" rel="noopener noreferrer">
              <Icon name="star" size={18} /> Jetzt bewerten
            </a>
            <a className="btn btn-ghost" href={LINKS.googleMaps} target="_blank" rel="noopener noreferrer">
              Alle Rezensionen <Icon name="arrow-up-right" size={18} />
            </a>
          </div>

          {/* QR-Code: nur sinnvoll am Desktop (auf dem Handy reicht der Button) — mobil per CSS ausgeblendet */}
          <div className="review-qr">
            <Image
              src="/brand/google-review-qr.png"
              alt="QR-Code: Google-Bewertung für Fresh Car Hamm abgeben"
              width={450}
              height={450}
              unoptimized
              className="review-qr-img"
            />
            <div>
              <strong>SCAN &amp; REVIEW</strong>
              <span>Am Desktop einfach mit dem Handy scannen und direkt eine Google-Bewertung schreiben.</span>
            </div>
          </div>

          <small>
            Google-Bewertungsstand: {ratingLabel}/5 bei {reviewCount} {reviewWord}. Die Zahl kann sich ändern, sobald neue Bewertungen dazukommen.
          </small>
        </div>
        <div className="reviews-glow" aria-hidden="true" />
      </div>
    </section>
  );
}
