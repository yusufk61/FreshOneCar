// Stilisierte Sportwagen-Silhouette (Linien-Illustration) — dient als Marken-Visual und Foto-Platzhalter.
// Zeigt bewusst KEIN reales Kundenfahrzeug.
export default function CarLine({ label = 'Stilisierte Sportwagen-Silhouette', decorative = true }) {
  return (
    <svg
      className="car-line"
      viewBox="0 0 900 290"
      shapeRendering="geometricPrecision"
      {...(decorative ? { 'aria-hidden': true, focusable: 'false' } : { role: 'img', 'aria-label': label })}
    >
      <path
        className="car-line-main"
        pathLength="1"
        d="M79 188c27-10 68-21 108-28l44-58c11-16 30-27 50-29 86-8 181-8 268 14 45 11 79 34 114 58 62 6 116 23 164 56l-8 25-67 4c-10-38-43-62-84-62-40 0-72 23-84 59H310c-12-35-45-58-85-58-42 0-76 25-85 63l-65-5-15-19 19-20Z"
      />
      <path className="car-line-soft" d="m244 102 83 5 139-2c44 0 82 12 122 40H208l36-43Z" />
      <path className="car-line-soft" d="m654 151 79 12M160 161l-60 14M373 159h117" />
      <circle className="car-wheel" cx="225" cy="225" r="46" />
      <circle className="car-wheel" cx="669" cy="225" r="46" />
    </svg>
  );
}
