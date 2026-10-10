import Link from 'next/link';
import Icon from '@/components/Icon';
import { SITE } from '@/data/site';

// Echte 404 (Status 404) im Branding der Seite: gleiche Hero-Sprache wie die Unterseiten (Raster, rote Linie,
// Outline-Headline), dazu eine große Outline-„404“. Läuft im Root-Layout, also mit Header, Menü und Footer.
// (Next.js setzt für not-found automatisch <meta name="robots" content="noindex">.)
export const metadata = {
  title: 'Seite nicht gefunden',
};

export default function NotFound() {
  return (
    <section className="page-hero nf" aria-labelledby="nf-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="page-hero-body has-aside nf-body">
        <div className="nf-visual" aria-hidden="true">
          <div className="red-orbit" />
          <div className="nf-code">
            <span>4</span>
            <span className="nf-zero">0</span>
            <span>4</span>
          </div>
          <div className="nf-line" />
        </div>

        <div className="page-hero-copy nf-copy">
          <p className="eyebrow nf-eyebrow">
            <span aria-hidden="true" /> Fehler 404
          </p>
          <h1 id="nf-title">
            <span>FALSCHE</span> <em>ABBIEGUNG.</em>
          </h1>
          <div className="page-hero-lead">
            <p>Diese Seite gibt es nicht (mehr) – zurück zu {SITE.name}.</p>
          </div>
          <div className="hero-actions page-hero-actions">
            <Link className="btn btn-primary" href="/">
              Zur Startseite <Icon name="arrow-right" size={18} />
            </Link>
            <Link className="btn btn-ghost" href="/leistungen">
              Leistungen ansehen <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
