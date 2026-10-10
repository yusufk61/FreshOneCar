import LegalPlaceholder from './LegalPlaceholder';

// Hinweis-Kasten am Anfang jeder Rechtsseite: ehrlich kennzeichnen, dass die Seite ein Platzhalter ist.
// Eigenes Inline-SVG (Info-Kreis), weil Icon.jsx dieses Symbol nicht enthält.
export default function LegalNotice() {
  return (
    <div className="legal-notice" role="note" aria-label="Hinweis">
      <div className="legal-notice-head">
        <span className="legal-notice-icon" aria-hidden="true">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            shapeRendering="geometricPrecision"
            focusable="false"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5" />
            <path d="M12 7.5h.01" />
          </svg>
        </span>
        <p className="legal-notice-label">Platzhalter-Seite</p>
      </div>
      <p>Diese Seite ist ein Platzhalter – vor der Veröffentlichung vom Betreiber zu vervollständigen (ggf. rechtlich prüfen lassen).</p>
      <p className="legal-notice-legend">
        Offene Angaben sind so markiert: <LegalPlaceholder>…</LegalPlaceholder>
      </p>
    </div>
  );
}
