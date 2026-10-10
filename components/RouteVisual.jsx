import CarLine from './CarLine';

// Dezente Route-Visualisierung für den Abholservice: Start (dein Standort) → Ziel (Fresh Car Hamm) und zurück.
// Reines SVG/CSS, ohne Animation, rein dekorativ (die Seiten-Hero-Aside ist ohnehin aria-hidden).
// Die Koordinaten der Punkte (in %) passen zum viewBox 560 × 440 der Pfade.
export default function RouteVisual() {
  return (
    <div className="pk-route" aria-hidden="true">
      <div className="pk-route-grid" />
      <svg className="pk-route-svg" viewBox="0 0 560 440" preserveAspectRatio="none" shapeRendering="geometricPrecision" focusable="false">
        <defs>
          <marker id="pk-arrow-out" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="9" markerHeight="9" orient="auto">
            <path d="M2 1.5 7.5 5 2 8.5" fill="none" stroke="#ff1717" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker id="pk-arrow-back" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="9" markerHeight="9" orient="auto">
            <path d="M2 1.5 7.5 5 2 8.5" fill="none" stroke="#8a8a85" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <path className="pk-route-out" d="M108 200C175 66 372 66 440 196" markerEnd="url(#pk-arrow-out)" />
        <path className="pk-route-back" d="M440 244C372 374 175 374 108 240" markerEnd="url(#pk-arrow-back)" />
      </svg>

      <span className="pk-car pk-car-out">
        <CarLine />
      </span>
      <span className="pk-car pk-car-back">
        <CarLine />
      </span>

      <span className="pk-node pk-node-start">
        <i />
        <small>DEIN STANDORT</small>
      </span>
      <span className="pk-node pk-node-end">
        <i>
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" shapeRendering="geometricPrecision" aria-hidden="true" focusable="false">
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        </i>
        <small>FRESH CAR HAMM</small>
      </span>

      <span className="pk-chip pk-chip-1">
        <b>01</b>
        <em>ABHOLUNG</em>
      </span>
      <span className="pk-chip pk-chip-2">
        <b>02</b>
        <em>AUFBEREITUNG</em>
      </span>
      <span className="pk-chip pk-chip-3">
        <b>03</b>
        <em>RÜCKGABE</em>
      </span>
    </div>
  );
}
