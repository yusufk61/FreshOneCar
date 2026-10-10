import Icon from './Icon';

// Fehlt in Icon.jsx: Stift (Inline-SVG im gleichen Stil — 24er viewBox, 2px Linie, runde Enden).
function PencilIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" shapeRendering="geometricPrecision" aria-hidden="true" focusable="false">
      <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </svg>
  );
}

const STEPS = [
  { no: '01', icon: <Icon name="camera" size={24} />, title: 'ÖFFNEN', text: 'Am Handy tippst du auf „Jetzt bewerten“, am Desktop scannst du den QR-Code mit dem Handy.' },
  { no: '02', icon: <Icon name="star" size={24} />, title: 'STERNE VERGEBEN', text: 'Wähle auf Google deine Sterne – ganz ehrlich, so wie du es erlebt hast.' },
  { no: '03', icon: <PencilIcon />, title: 'KURZ SCHREIBEN', text: 'Beschreib in ein, zwei Sätzen, wie es war, und sende deine Bewertung ab.' },
];

export default function ReviewsSteps() {
  return (
    <ol className="rv-steps">
      {STEPS.map((s, i) => (
        <li key={s.no} data-reveal style={{ '--delay': `${i * 70}ms` }}>
          <span className="service-no" aria-hidden="true">
            {s.no}
          </span>
          <span className="service-icon">{s.icon}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
