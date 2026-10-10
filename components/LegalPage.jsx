import LegalNotice from './LegalNotice';
import LegalNav from './LegalNav';

// Gemeinsamer Rahmen für Impressum und Datenschutz:
// Hero (PageHero), danach Hinweis-Kasten (+ optional Inhaltsverzeichnis) und die Inhaltskarten.
// Mobil einspaltig, ab ca. 1080 px Seitenspalte (sticky) + Textspalte mit max. 760 px.
export default function LegalPage({ hero, current, aside, children }) {
  return (
    <div className="legal-page">
      {hero}
      <div className="legal-section">
        <div className="legal-grid">
          <div className="legal-aside">
            <LegalNotice />
            {aside}
          </div>
          <div className="legal-main">
            {children}
            <LegalNav current={current} />
          </div>
        </div>
      </div>
    </div>
  );
}
