import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import CarLine from '@/components/CarLine';
import Stars from '@/components/Stars';
import CtaBand from '@/components/CtaBand';
import GalleryMedia, { galleryCaption } from '@/components/GalleryTile';
import { SITE, PICKUP_NOTE } from '@/data/site';
import { PACKAGES, EXTRAS, MIN_PRICES } from '@/data/services';
import { getMedia } from '@/lib/media';
import { siteUrl } from '@/lib/seo';

// Titel/Beschreibung kommen aus dem Root-Layout ("Fresh Car Hamm | Premium Fahrzeugaufbereitung in Hamm").
export const metadata = { ...(siteUrl() ? { alternates: { canonical: '/' } } : {}) };

const USPS = [
  { icon: 'seat', title: 'Innenraum', text: 'Tiefenreinigung von Sitzen bis Kofferraum', href: '/leistungen#pakete' },
  { icon: 'drop', title: 'Außenpflege', text: 'Handwäsche, Felgen & Reifenglanz', href: '/leistungen#pakete' },
  { icon: 'spark', title: 'Politur', text: 'Vom Hochglanz bis 3-stufig', href: '/leistungen#polituren' },
  { icon: 'car', title: 'Abholservice', text: 'Abholung & Rückgabe gegen Aufpreis', href: '/abholservice' },
];

const HIGHLIGHTS = [
  { no: '01', icon: 'seat', eyebrow: 'Interior Detail', title: PACKAGES[0].name, text: PACKAGES[0].teaser, kicker: 'Paketpreis', price: PACKAGES[0].priceLabel, href: '/leistungen#pakete' },
  { no: '02', icon: 'drop', eyebrow: 'Exterior Detail', title: PACKAGES[1].name, text: PACKAGES[1].teaser, kicker: 'Paketpreis', price: PACKAGES[1].priceLabel, href: '/leistungen#pakete' },
  { no: '03', icon: 'spark', eyebrow: 'Paint Correction', title: 'Polituren', text: 'Vom Hochglanz bis zur 3-stufigen Politur – abgestimmt auf Lackzustand und Wunschergebnis.', kicker: 'Ab-Preis', price: `ab ${MIN_PRICES.polituren} €`, href: '/leistungen#polituren' },
  { no: '04', icon: 'shield', eyebrow: 'Extras', title: `${EXTRAS.length} Extras`, text: 'Leder, Scheinwerfer, Motorraum, Versiegelung u. v. m. – frei kombinierbar.', kicker: 'Ab-Preis', price: `ab ${MIN_PRICES.extras} €`, href: '/leistungen#extras' },
];

export default function Home() {
  const media = getMedia();
  const teaserPhotos = [0, 1, 2].map((i) => media.gallery[i] ?? null);

  return (
    <>
      {/* 1 — HERO */}
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span aria-hidden="true" /> {SITE.name} · Fahrzeugaufbereitung
          </div>
          <h1 id="hero-title">
            <span>DEIN AUTO.</span>
            <em>FRISCH WIE NEU.</em>
          </h1>
          <p>
            <strong>{SITE.claim}.</strong> Aufbereitung, Politur und Pflege mit Fokus auf saubere Details und starken Glanz. Auf Wunsch holen wir dein Fahrzeug gegen Aufpreis ab und bringen es nach der Aufbereitung wieder zurück.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/termin">
              Termin anfragen <Icon name="arrow-up-right" size={18} />
            </Link>
            <Link className="btn btn-ghost" href="/leistungen">
              Leistungen entdecken <Icon name="arrow-right" size={18} />
            </Link>
          </div>
          <Link className="pickup-pill" href="/abholservice">
            <span>NEU</span>
            <strong>Abhol- &amp; Bringservice verfügbar</strong>
            <Icon name="arrow-right" size={16} />
          </Link>
          <Link
            className="hero-rating"
            href="/bewertungen"
            aria-label={`Google-Bewertungen ansehen: ${SITE.google.ratingLabel} von 5 bei ${SITE.google.reviewCount} Rezensionen`}
          >
            <Stars size={14} label="" />
            <strong>{SITE.google.ratingLabel}</strong>
            <span>{SITE.google.reviewCount} Google-Rezensionen</span>
            <Icon name="arrow-up-right" size={16} />
          </Link>
          <div className="hero-meta">
            <div>
              <strong>01</strong>
              <span>
                Direkt per
                <br />
                WhatsApp
              </span>
            </div>
            <div>
              <strong>02</strong>
              <span>
                Pakete ab
                <br />
                {MIN_PRICES.pakete} €
              </span>
            </div>
            <div>
              <strong>03</strong>
              <span>
                Abholung
                <br />
                gegen Aufpreis
              </span>
            </div>
          </div>
        </div>

        <div className={`hero-visual${media.hero ? ' has-photo' : ''}`} aria-hidden="true">
          {media.hero ? (
            <div className="hero-photo">
              <Image src={media.hero} alt="" fill priority sizes="(max-width: 1050px) 100vw, 55vw" />
            </div>
          ) : (
            <>
              <div className="hero-logo-watermark">FCH</div>
              <div className="red-orbit" />
              <CarLine />
            </>
          )}
          <div className="hero-floor" />
          <div className="hero-spec hero-spec-a">
            <span>DETAIL</span>
            <b>MAX</b>
          </div>
          <div className="hero-spec hero-spec-b">
            <span>FINISH</span>
            <b>FRESH</b>
          </div>
        </div>
        <a className="scroll-cue" href="#highlights" aria-label="Zu den Leistungen scrollen">
          <span>SCROLL</span>
          <i />
        </a>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((n) => (
            <span className="ticker-set" key={n}>
              <span>INNENRAUM</span>
              <i>✦</i>
              <span>AUSSENPFLEGE</span>
              <i>✦</i>
              <span>POLITUR</span>
              <i>✦</i>
              <span>EXTRAS</span>
              <i>✦</i>
              <span>ABHOL- &amp; BRINGSERVICE</span>
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      {/* 2 — USPs */}
      <section className="usp-strip" aria-label="Das macht Fresh Car Hamm aus">
        <ul className="usp-grid">
          {USPS.map((u, i) => (
            <li key={u.title} data-reveal style={{ '--delay': `${i * 60}ms` }}>
              <Link className="usp-cell" href={u.href}>
                <span className="usp-icon">
                  <Icon name={u.icon} size={24} />
                </span>
                <strong>{u.title}</strong>
                <small>{u.text}</small>
                <Icon name="arrow-up-right" size={16} className="usp-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 — LEISTUNGS-TEASER */}
      <section className="section teaser" id="highlights" aria-labelledby="teaser-title">
        <div className="section-head" data-reveal>
          <div>
            <div className="eyebrow">
              <span aria-hidden="true" /> LEISTUNGEN & PREISE
            </div>
            <h2 id="teaser-title">
              KLARE LEISTUNG.
              <br />
              <em>SAUBERER PREIS.</em>
            </h2>
          </div>
          <p>Vier Highlights aus unserem Angebot – die komplette Liste mit allen Paketen, Polituren und Extras findest du auf der Leistungsseite.</p>
        </div>
        <ul className="teaser-grid">
          {HIGHLIGHTS.map((h, i) => (
            <li key={h.no} data-reveal style={{ '--delay': `${i * 60}ms` }}>
              <Link className="teaser-card" href={h.href}>
                <span className="teaser-top">
                  <span className="service-no">{h.no}</span>
                  <span className="service-icon">
                    <Icon name={h.icon} size={24} />
                  </span>
                </span>
                <span className="service-eyebrow">{h.eyebrow}</span>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
                <span className="teaser-price">
                  <span>
                    <small>{h.kicker}</small>
                    <strong>{h.price}</strong>
                  </span>
                  <span className="teaser-go" aria-hidden="true">
                    <Icon name="arrow-up-right" size={17} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="section-cta" data-reveal>
          <Link className="btn btn-primary" href="/leistungen">
            Alle Leistungen &amp; Preise <Icon name="arrow-right" size={18} />
          </Link>
          <span>Preise sind Ab-/Richtpreise – der Umfang wird vorher abgestimmt.</span>
        </div>
      </section>

      {/* 4 — ABHOLSERVICE-TEASER */}
      <section className="pickup-section is-teaser" aria-labelledby="pickup-title">
        <div className="pickup-grid-bg" aria-hidden="true" />
        <div className="pickup-copy" data-reveal>
          <div className="eyebrow light">
            <span aria-hidden="true" /> ABHOL- & BRINGSERVICE
          </div>
          <div className="pickup-badge">OPTIONAL · GEGEN AUFPREIS</div>
          <h2 id="pickup-title">
            DU BLEIBST DA.
            <em>WIR HOLEN DAS AUTO.</em>
          </h2>
          <p>Keine Zeit, das Fahrzeug selbst zu bringen? Nach Absprache holen wir dein Auto ab, führen die vereinbarte Aufbereitung durch und bringen es anschließend wieder zu dir zurück.</p>
          <div className="pickup-actions">
            <Link className="btn pickup-light" href="/abholservice">
              Abhol- &amp; Bringservice entdecken <Icon name="arrow-up-right" size={18} />
            </Link>
          </div>
        </div>
        <div className="pickup-mini" data-reveal>
          <ol>
            <li>
              <span>01</span>
              <strong>ABHOLUNG</strong>
            </li>
            <li>
              <span>02</span>
              <strong>AUFBEREITUNG</strong>
            </li>
            <li>
              <span>03</span>
              <strong>RÜCKGABE</strong>
            </li>
          </ol>
          <small>{PICKUP_NOTE}</small>
        </div>
      </section>

      {/* 5 — GALERIE-TEASER */}
      <section className="section gallery-teaser" aria-labelledby="gallery-title">
        <div className="section-head compact" data-reveal>
          <div>
            <div className="eyebrow">
              <span aria-hidden="true" /> WORK / GALERIE
            </div>
            <h2 id="gallery-title">
              ECHTE AUTOS.
              <br />
              <em>ECHTE ERGEBNISSE.</em>
            </h2>
          </div>
          <p>
            {media.gallery.length > 0
              ? 'Ein Einblick in unsere Arbeit – alle Fotos findest du in der Galerie.'
              : 'Hier entsteht unsere Galerie: Fotos und Video von Fresh Car Hamm folgen in Kürze.'}
          </p>
        </div>
        <ul className="gt-grid">
          {teaserPhotos.map((photo, i) => (
            <li key={i} data-reveal style={{ '--delay': `${i * 70}ms` }}>
              <Link
                className="gt-tile"
                href="/galerie"
                aria-label={photo ? `Galerie öffnen – Foto ${String(i + 1).padStart(2, '0')}` : 'Zur Galerie – Fotos folgen'}
              >
                <GalleryMedia photo={photo} index={i} sizes="(max-width: 680px) 100vw, 33vw" />
                <span className="gallery-caption">
                  <span>{galleryCaption(photo, i)}</span>
                  <b>FRESH CAR HAMM</b>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="section-cta" data-reveal>
          <Link className="btn btn-ghost" href="/galerie">
            Alle Arbeiten ansehen <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </section>

      {/* 6 — BEWERTUNGS-TEASER */}
      <section className="section reviews reviews-teaser" aria-labelledby="reviews-title">
        <div className="reviews-shell is-compact" data-reveal>
          <div className="reviews-score">
            <div className="eyebrow">
              <span aria-hidden="true" /> GOOGLE REVIEWS
            </div>
            <div className="rating-number">{SITE.google.ratingLabel}</div>
            <Stars size={22} label={`${SITE.google.ratingLabel} von 5 Sternen`} />
            <p>
              <strong>{SITE.google.reviewCount} Rezensionen</strong> auf Google
            </p>
          </div>
          <div className="reviews-copy">
            <span className="reviews-kicker">Vertrauen entsteht nicht durch Werbung.</span>
            <h2 id="reviews-title">
              SONDERN DURCH
              <br />
              <em>ECHTE ERFAHRUNGEN.</em>
            </h2>
            <p>Die aktuelle Google-Bewertung ist direkt verlinkt – schau dir echtes Feedback an oder hinterlasse selbst eine Bewertung.</p>
            <div className="reviews-actions">
              <Link className="btn btn-primary" href="/bewertungen">
                Bewertungen ansehen <Icon name="arrow-right" size={18} />
              </Link>
            </div>
          </div>
          <div className="reviews-glow" aria-hidden="true" />
        </div>
      </section>

      {/* 7 — ABSCHLUSS-CTA */}
      <CtaBand />
    </>
  );
}
