// Eigene SVG-Icons: einheitliche Designsprache (24er viewBox, 2px Linie, runde Enden), currentColor,
// shape-rendering geometricPrecision → auf Retina-/Handy-Displays gestochen scharf. Keine PNG-Icons.

const STROKE = {
  seat: (
    <>
      <path d="M7 4v7.5c0 1.3.7 2.5 1.8 3.1L13 17" />
      <path d="M9 18h7.5a2.5 2.5 0 0 0 2.5-2.5V14" />
      <path d="M6 12H4v7" />
      <path d="M15 17v3" />
    </>
  ),
  drop: (
    <>
      <path d="M12 3s5 5.2 5 10a5 5 0 0 1-10 0c0-4.8 5-10 5-10Z" />
      <path d="M9.5 14.2c.6 1.2 1.5 1.8 2.7 1.8" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 1.2 4.1L17 9l-3.8 1.9L12 15l-1.2-4.1L7 9l3.8-1.9L12 3Z" />
      <path d="m18.5 14 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 19 6v5c0 4.7-2.8 7.8-7 10-4.2-2.2-7-5.3-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  car: (
    <>
      <path d="M3 15.5 4.7 11a2 2 0 0 1 1.9-1.3h10.8a2 2 0 0 1 1.9 1.3l1.7 4.5" />
      <path d="M5 15h14" />
      <path d="M5 15v4h2v-2h10v2h2v-4" />
      <circle cx="7.5" cy="14" r="1" />
      <circle cx="16.5" cy="14" r="1" />
    </>
  ),
  swap: (
    <>
      <path d="M7 7h11l-3-3" />
      <path d="m18 7-3 3" />
      <path d="M17 17H6l3 3" />
      <path d="m6 17 3-3" />
    </>
  ),
  'arrow-up-right': (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </>
  ),
  'arrow-left': (
    <>
      <path d="M19 12H5" />
      <path d="m10 7-5 5 5 5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-left': <path d="m15 6-6 6 6 6" />,
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  'map-pin': (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6H8l1.2-2h5.6L16 6h1.5A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-8Z" />
      <circle cx="12" cy="12.5" r="3.5" />
    </>
  ),
};

const FILLED = {
  star: <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.4 6.3-.9L12 2.8Z" />,
  play: <path d="M8 5.5v13l10-6.5L8 5.5Z" />,
};

export default function Icon({ name, size = 20, strokeWidth = 2, className, ...rest }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className,
    shapeRendering: 'geometricPrecision',
    focusable: 'false',
    'aria-hidden': true,
    ...rest,
  };

  if (name === 'whatsapp') {
    return (
      <svg {...common} fill="none">
        <path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.4A8.4 8.4 0 1 1 20.5 11.7Z" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8.4 8.2c.2-.5.4-.5.7-.5h.5c.2 0 .3.1.4.4l.8 1.9c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4-.1.6.7 1.5 1.8 2.6 3.3 3.3.2.1.4.1.6-.1l.7-.8c.2-.2.4-.3.7-.1l1.8.9c.3.1.4.3.4.5 0 .4-.2 1.3-.7 1.8-.5.5-1.5.9-2.6.6-1.5-.4-3.4-1.2-5.3-3.1-1.6-1.6-2.7-3.5-3-4.8-.3-1.1.2-1.8.5-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (FILLED[name]) {
    return (
      <svg {...common} fill="currentColor" stroke={name === 'star' ? 'currentColor' : 'none'} strokeWidth={name === 'star' ? 1 : undefined}>
        {FILLED[name]}
      </svg>
    );
  }

  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {STROKE[name] ?? STROKE.swap}
    </svg>
  );
}
