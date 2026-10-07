'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const WHATSAPP_NUMBER = '4917670988025';
const ADDRESS = 'Bockelweg 73, 59073 Hamm';
const GOOGLE_PLACE_ID = 'ChIJx8TN0B11uUcR-3FXFlMySGk';
const GOOGLE_RATING = '5,0';
const GOOGLE_REVIEW_COUNT = 4;
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Fresh Car Hamm, ${ADDRESS}`)}&query_place_id=${GOOGLE_PLACE_ID}`;
const GOOGLE_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}&destination_place_id=${GOOGLE_PLACE_ID}`;
const APPLE_MAPS_URL = `https://maps.apple.com/?daddr=${encodeURIComponent(ADDRESS)}&dirflg=d`;
const GOOGLE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

const servicePackages = [
  {
    no: '01',
    title: 'Innenraumpaket',
    price: '150 €',
    eyebrow: 'Interior Detail',
    text: 'Gründliches Saugen inkl. Tornador-Reinigung der Ritzen, Tiefenreinigung der Sitze, Reinigung von Cockpit, Lenkrad, Mittelkonsole, Schaltern, Display, Lüftungsdüsen und Kunststoffteilen, Türverkleidungen, Türeinstiegen, Einstiegsleisten und Gummiteilen, Pedalen und Fußraum, Kofferraum, Fußmatten sowie streifenfreie Innenscheiben.',
    icon: 'seat',
  },
  {
    no: '02',
    title: 'Außenpaket',
    price: '100 €',
    eyebrow: 'Exterior Detail',
    text: 'Vorreinigung, schonende Handwäsche, Detailreinigung mit Pinsel, Reifen- und Felgenreinigung, Radkastenreinigung, Trocknung mit Mikrofasertüchern und Reifenglanz.',
    icon: 'drop',
  },
];

const polishServices = [
  ['Hochglanzpolitur', 'ab 150 €'],
  ['1-stufige Politur', 'ab 180 €'],
  ['2-stufige Politur', 'ab 220 €'],
  ['3-stufige Politur', 'ab 280 €'],
  ['Einzelne Kratzer', 'Preis je nach Kratzer'],
];

const extras = [
  ['Dachhimmelreinigung', 'ab 20 €'],
  ['Lederpflege', 'ab 20 €'],
  ['Kunststoffpflege', 'ab 20 €'],
  ['Gummipflege', 'ab 20 €'],
  ['Tierhaarentfernung', 'ab 50 €'],
  ['Intensivreinigung der Sitze', 'pro Sitz ab 20 €'],
  ['Intensivreinigung der Fußmatten', 'pro Matte ab 10 €'],
  ['Gurtreinigung', 'ab 20 €'],
  ['Gummimattenpflege', 'ab 20 €'],
  ['Aufkleberentfernung', 'ab 10 €'],
  ['Flugrostentfernung', 'ab 20 €'],
  ['Fahrzeug kneten', 'ab 50 €'],
  ['Ausgeblichene Kunststoffteile schwärzen', 'ab 25 €'],
  ['Scheinwerferaufbereitung', 'ab 50 €'],
  ['Dichtungspflege', 'ab 25 €'],
  ['Insektenentfernung', 'ab 30 €'],
  ['Motorraumreinigung', 'ab 50 €'],
  ['Sprühversiegelung Scheiben', 'pro Scheibe ab 10 €'],
  ['Sprühversiegelung Karosserie', 'ab 80 €'],
  ['Komplette Innenaufbereitung ohne Chemie', 'ab 100 €'],
];

const gallery = [
  ['01', 'GLOSS', 'Lackfinish'],
  ['02', 'DETAIL', 'Innenraum'],
  ['03', 'SHINE', 'Politur'],
  ['04', 'CLEAN', 'Außenpflege'],
  ['05', 'PROTECT', 'Versiegelung'],
  ['06', 'FRESH', 'Komplettpaket'],
];

const svgCommon = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  shapeRendering: 'geometricPrecision',
  focusable: 'false',
  'aria-hidden': true,
};

function Icon({ name }) {
  if (name === 'seat') return <svg {...svgCommon}><path d="M7 4v7.5c0 1.3.7 2.5 1.8 3.1L13 17"/><path d="M9 18h7.5a2.5 2.5 0 0 0 2.5-2.5V14"/><path d="M6 12H4v7"/><path d="M15 17v3"/></svg>;
  if (name === 'drop') return <svg {...svgCommon}><path d="M12 3s5 5.2 5 10a5 5 0 0 1-10 0c0-4.8 5-10 5-10Z"/><path d="M9.5 14.2c.6 1.2 1.5 1.8 2.7 1.8"/></svg>;
  if (name === 'spark') return <svg {...svgCommon}><path d="m12 3 1.2 4.1L17 9l-3.8 1.9L12 15l-1.2-4.1L7 9l3.8-1.9L12 3Z"/><path d="m18.5 14 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z"/></svg>;
  if (name === 'shield') return <svg {...svgCommon}><path d="M12 3 19 6v5c0 4.7-2.8 7.8-7 10-4.2-2.2-7-5.3-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>;
  if (name === 'car') return <svg {...svgCommon}><path d="M3 15.5 4.7 11a2 2 0 0 1 1.9-1.3h10.8a2 2 0 0 1 1.9 1.3l1.7 4.5"/><path d="M5 15h14"/><path d="M5 15v4h2v-2h10v2h2v-4"/><circle cx="7.5" cy="14" r="1"/><circle cx="16.5" cy="14" r="1"/></svg>;
  return <svg {...svgCommon}><path d="M7 7h11l-3-3"/><path d="m18 7-3 3"/><path d="M17 17H6l3 3"/><path d="m6 17 3-3"/></svg>;
}

function ArrowUpRightIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" shapeRendering="geometricPrecision" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>;
}

function ArrowRightIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" shapeRendering="geometricPrecision" aria-hidden="true"><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></svg>;
}

function CheckIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" shapeRendering="geometricPrecision" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>;
}


function PlayIcon({ size = 26 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" shapeRendering="geometricPrecision" aria-hidden="true"><path d="M8 5.5v13l10-6.5L8 5.5Z"/></svg>;
}

function MapPinIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" shapeRendering="geometricPrecision" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
}

function CompassIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" shapeRendering="geometricPrecision" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></svg>;
}

function StarIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" shapeRendering="geometricPrecision" aria-hidden="true"><path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.4 6.3-.9L12 2.8Z"/></svg>;
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" shapeRendering="geometricPrecision" aria-hidden="true"><path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.4A8.4 8.4 0 1 1 20.5 11.7Z" stroke="currentColor" strokeWidth="2"/><path d="M8.4 8.2c.2-.5.4-.5.7-.5h.5c.2 0 .3.1.4.4l.8 1.9c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4-.1.6.7 1.5 1.8 2.6 3.3 3.3.2.1.4.1.6-.1l.7-.8c.2-.2.4-.3.7-.1l1.8.9c.3.1.4.3.4.5 0 .4-.2 1.3-.7 1.8-.5.5-1.5.9-2.6.6-1.5-.4-3.4-1.2-5.3-3.1-1.6-1.6-2.7-3.5-3-4.8-.3-1.1.2-1.8.5-2Z" fill="currentColor"/></svg>
  );
}

function CarLine() {
  return (
    <svg className="car-line" viewBox="0 0 900 290" role="img" aria-label="Stilisierte Sportwagen-Silhouette" shapeRendering="geometricPrecision">
      <path className="car-line-main" pathLength="1" d="M79 188c27-10 68-21 108-28l44-58c11-16 30-27 50-29 86-8 181-8 268 14 45 11 79 34 114 58 62 6 116 23 164 56l-8 25-67 4c-10-38-43-62-84-62-40 0-72 23-84 59H310c-12-35-45-58-85-58-42 0-76 25-85 63l-65-5-15-19 19-20Z"/>
      <path className="car-line-soft" d="m244 102 83 5 139-2c44 0 82 12 122 40H208l36-43Z"/>
      <path className="car-line-soft" d="m654 151 79 12M160 161l-60 14M373 159h117"/>
      <circle className="car-wheel" cx="225" cy="225" r="46"/>
      <circle className="car-wheel" cx="669" cy="225" r="46"/>
    </svg>
  );
}

function Stars() {
  return <div className="review-stars" aria-label="5 von 5 Sternen">{Array.from({ length: 5 }, (_, i) => <StarIcon key={i} size={20} />)}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compare, setCompare] = useState(54);
  const [showVideoNote, setShowVideoNote] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [form, setForm] = useState({ vehicle: 'PKW', service: 'Innenraumpaket', pickup: 'Nein, ich bringe das Fahrzeug selbst', date: '', note: '' });
  const [serviceTab, setServiceTab] = useState('pakete');
  const [scrollProgress, setScrollProgress] = useState(0);
  const dateRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    if (dateRef.current) dateRef.current.min = local;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const whatsappHref = useMemo(() => {
    const message = 'Hallo Fresh Car Hamm, ich möchte einen Termin anfragen.';
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, []);

  function submitBooking(e) {
    e.preventDefault();
    const lines = [
      'Hallo Fresh Car Hamm 👋',
      '',
      'ich möchte einen Termin anfragen:',
      `🚘 Fahrzeug: ${form.vehicle}`,
      `✨ Leistung: ${form.service}`,
      `🚗 Abhol- & Bringservice: ${form.pickup}`,
      `📅 Wunschtermin: ${form.date || 'flexibel / noch offen'}`,
      form.note ? `📝 Info: ${form.note}` : null,
      '',
      'Könnt ihr mir sagen, wann etwas frei ist?'
    ].filter(Boolean);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <main>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Fresh Car Hamm Startseite">
          <img src="/brand/fresh-car-hamm-logo.png" alt="Fresh Car Hamm" />
        </a>
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          <a href="#services">Leistungen</a>
          <a href="#pickup">Abholservice</a>
          <a href="#gallery">Galerie</a>
          <a href="#location">Kontakt</a>
          <a href="#booking">Termin</a>
        </nav>
        <a className="nav-cta" href={whatsappHref} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp</a>
        <button className={`menu-btn ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menuOpen}>
          <span/><span/><span/>
        </button>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-head"><span>FRESH CAR HAMM</span><small>MENÜ</small></div>
          <a onClick={() => setMenuOpen(false)} href="#top"><b>01</b><span>Start</span></a>
          <a onClick={() => setMenuOpen(false)} href="#services"><b>02</b><span>Leistungen & Preise</span></a>
          <a onClick={() => setMenuOpen(false)} href="#pickup"><b>03</b><span>Abhol- & Bringservice</span></a>
          <a onClick={() => setMenuOpen(false)} href="#gallery"><b>04</b><span>Galerie</span></a>
          <a onClick={() => setMenuOpen(false)} href="#reviews"><b>05</b><span>Bewertungen</span></a>
          <a onClick={() => setMenuOpen(false)} href="#location"><b>06</b><span>Kontakt & Standort</span></a>
          <a onClick={() => setMenuOpen(false)} href="#booking"><b>07</b><span>Termin anfragen</span></a>
          <div className="mobile-menu-legal"><a onClick={() => setMenuOpen(false)} href="/impressum">Impressum</a><a onClick={() => setMenuOpen(false)} href="/datenschutz">Datenschutz</a></div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span /> HAMM · FAHRZEUGPFLEGE</div>
          <h1>
            <span>DEIN AUTO.</span>
            <em>FRISCH WIE NEU.</em>
          </h1>
          <p>Aufbereitung, Politur und Pflege mit Fokus auf saubere Details und starken Glanz. Auf Wunsch holen wir dein Fahrzeug gegen Aufpreis ab und bringen es nach der Aufbereitung wieder zurück.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#booking">Termin anfragen <ArrowUpRightIcon /></a>
            <a className="btn btn-ghost" href="#services">Preise ansehen <ArrowRightIcon size={18}/></a>
          </div>
          <a className="pickup-pill" href="#pickup"><span>NEU</span><strong>Abhol- & Bringservice verfügbar</strong><ArrowRightIcon size={16}/></a>
          <a className="hero-rating" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" aria-label={`Google-Bewertungen öffnen: ${GOOGLE_RATING} von 5 bei ${GOOGLE_REVIEW_COUNT} Rezensionen`}>
            <Stars />
            <strong>{GOOGLE_RATING}</strong>
            <span>{GOOGLE_REVIEW_COUNT} Google-Rezensionen</span>
            <ArrowUpRightIcon size={16}/>
          </a>
          <div className="hero-meta">
            <div><strong>01</strong><span>Direkt per<br/>WhatsApp</span></div>
            <div><strong>02</strong><span>Pakete ab<br/>100 €</span></div>
            <div><strong>03</strong><span>Abholung<br/>gegen Aufpreis</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-logo-watermark">FCH</div>
          <div className="red-orbit" />
          <CarLine />
          <div className="hero-floor" />
          <div className="hero-spec hero-spec-a"><span>DETAIL</span><b>MAX</b></div>
          <div className="hero-spec hero-spec-b"><span>FINISH</span><b>FRESH</b></div>
        </div>
        <a className="scroll-cue" href="#services" aria-label="Nach unten scrollen"><span>SCROLL</span><i /></a>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>INNENRAUM</span><i>✦</i><span>AUßENPFLEGE</span><i>✦</i><span>POLITUR</span><i>✦</i><span>EXTRAS</span><i>✦</i><span>ABHOL- & BRINGSERVICE</span><i>✦</i>
          <span>INNENRAUM</span><i>✦</i><span>AUßENPFLEGE</span><i>✦</i><span>POLITUR</span><i>✦</i><span>EXTRAS</span><i>✦</i><span>ABHOL- & BRINGSERVICE</span><i>✦</i>
        </div>
      </div>

      <section className="section services price-catalog" id="services">
        <div className="section-head" data-reveal>
          <div><div className="eyebrow"><span /> LEISTUNGEN & PREISE</div><h2>KLARE LEISTUNG.<br/><em>SAUBERER PREIS.</em></h2></div>
          <p>Hier siehst du die aktuellen Basispreise und Extras. Bei starker Verschmutzung, besonderem Aufwand oder individuellen Wünschen kann der Preis abweichen – wir klären das vorher transparent mit dir.</p>
        </div>

        <div className="price-tabs" role="tablist" aria-label="Leistungskategorien" data-reveal>
          <button className={serviceTab === 'pakete' ? 'active' : ''} onClick={() => setServiceTab('pakete')} type="button"><span>01</span> Pakete</button>
          <button className={serviceTab === 'politur' ? 'active' : ''} onClick={() => setServiceTab('politur')} type="button"><span>02</span> Polituren</button>
          <button className={serviceTab === 'extras' ? 'active' : ''} onClick={() => setServiceTab('extras')} type="button"><span>03</span> Extras</button>
        </div>

        {serviceTab === 'pakete' && <div className="package-grid" data-reveal>
          {servicePackages.map((s) => (
            <article className="package-card" key={s.no}>
              <div className="package-top"><span className="service-no">{s.no}</span><div className="service-icon"><Icon name={s.icon}/></div></div>
              <div className="service-eyebrow">{s.eyebrow}</div>
              <h3>{s.title}</h3>
              <div className="package-price"><small>PAKETPREIS</small><strong>{s.price}</strong></div>
              <p>{s.text}</p>
              <a href="#booking">Paket anfragen <ArrowUpRightIcon size={17}/></a>
            </article>
          ))}
          <aside className="price-note-card">
            <span>WICHTIG</span>
            <h3>FAIR STATT<br/>ÜBERRASCHUNG.</h3>
            <p>Bei starker Verschmutzung oder außergewöhnlichem Mehraufwand kann der Endpreis höher ausfallen. Wir stimmen den Umfang vorher mit dir ab.</p>
            <div><CheckIcon size={18}/> Preis vorab abstimmen</div>
            <div><CheckIcon size={18}/> Extras frei kombinierbar</div>
            <div><CheckIcon size={18}/> Abholung optional</div>
          </aside>
        </div>}

        {serviceTab === 'politur' && <div className="price-list-shell" data-reveal>
          <div className="price-list-head"><span>POLITUR / PAINT CORRECTION</span><small>AB-PREISE</small></div>
          {polishServices.map(([name, price], i) => <div className="price-row" key={name}><span className="price-index">{String(i+1).padStart(2,'0')}</span><strong>{name}</strong><span className="price-dots"/><b>{price}</b><a href="#booking" aria-label={`${name} anfragen`}><ArrowUpRightIcon size={16}/></a></div>)}
          <div className="price-list-foot">Der passende Politur-Aufbau richtet sich nach Lackzustand und gewünschtem Ergebnis.</div>
        </div>}

        {serviceTab === 'extras' && <div className="extras-grid" data-reveal>
          {extras.map(([name, price], i) => <article className="extra-item" key={name}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{name}</strong><small>{price}</small></div><a href="#booking" aria-label={`${name} anfragen`}><ArrowUpRightIcon size={15}/></a></article>)}
        </div>}

        <div className="catalog-footer" data-reveal><span>Alle Preise verstehen sich als Richt-/Ab-Preise entsprechend dem angegebenen Leistungsumfang.</span><a href="#booking">Leistung anfragen <ArrowRightIcon size={17}/></a></div>
      </section>

      <section className="pickup-section" id="pickup">
        <div className="pickup-grid-bg" aria-hidden="true" />
        <div className="pickup-copy" data-reveal>
          <div className="eyebrow light"><span /> ABHOL- & BRINGSERVICE</div>
          <div className="pickup-badge">OPTIONAL · GEGEN AUFPREIS</div>
          <h2>DU BLEIBST DA.<br/><em>WIR HOLEN DAS AUTO.</em></h2>
          <p>Keine Zeit, das Fahrzeug selbst zu bringen? Nach Absprache holen wir dein Auto ab, führen die vereinbarte Aufbereitung durch und bringen es anschließend wieder zu dir zurück.</p>
          <div className="pickup-actions"><a className="btn pickup-light" href="#booking">Abholung anfragen <ArrowUpRightIcon/></a><a className="pickup-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer"><WhatsAppIcon/> Direkt auf WhatsApp</a></div>
        </div>
        <div className="pickup-flow" data-reveal>
          <div className="pickup-flow-line" aria-hidden="true"/>
          <article><span>01</span><div><strong>ABHOLUNG</strong><p>Ort und Zeitpunkt kurz mit uns abstimmen.</p></div></article>
          <article><span>02</span><div><strong>AUFBEREITUNG</strong><p>Dein Fahrzeug bekommt die gebuchte Pflege.</p></div></article>
          <article><span>03</span><div><strong>RÜCKGABE</strong><p>Frisch aufbereitet wieder zu dir zurück.</p></div></article>
          <small>Aufpreis abhängig von Entfernung und Aufwand · Verfügbarkeit nach Absprache</small>
        </div>
      </section>

      <section className="showreel section" id="showreel">
        <div className={`video-stage ${videoReady ? 'has-video' : ''}`} data-reveal>
          <video className="showreel-video" autoPlay muted loop playsInline preload="metadata" onCanPlay={() => setVideoReady(true)} onError={() => setVideoReady(false)}>
            <source src="/media/showreel.mp4" type="video/mp4" />
          </video>
          <div className="video-copy">
            <div className="eyebrow"><span /> CINEMATIC SHOWREEL</div>
            <h2>{videoReady ? <>FRESH CAR<br/><em>IN MOTION.</em></> : <>DEIN VIDEO<br/><em>KOMMT HIER REIN.</em></>}</h2>
            <p>{videoReady ? 'Cinematic Showreel von Fresh Car Hamm.' : 'Der Slot erkennt /public/media/showreel.mp4 automatisch. Sobald die Datei dort liegt, läuft das Video hier direkt als Fullscreen-Showreel.'}</p>
          </div>
          {!videoReady && <button className="play-button" onClick={() => setShowVideoNote(true)} aria-label="Video-Platzhalter öffnen"><span><PlayIcon size={26}/></span></button>}
          <div className="video-rails"><span/><span/><span/></div>
          <div className="video-label">{videoReady ? 'FRESH CAR HAMM / SHOWREEL' : 'PLACEHOLDER / READY FOR MP4'}</div>
        </div>
        {showVideoNote && (
          <div className="video-toast" role="status">Video-Slot ist vorbereitet. Schick später einfach die MP4-Datei. <button onClick={() => setShowVideoNote(false)}>×</button></div>
        )}
      </section>

      <section className="section gallery" id="gallery">
        <div className="section-head compact" data-reveal>
          <div><div className="eyebrow"><span /> WORK / GALERIE</div><h2>ECHTE AUTOS.<br/><em>ECHTE ERGEBNISSE.</em></h2></div>
          <p>Die Flächen sind schon für eure echten Bilder vorbereitet. Später ersetzen wir die Platzhalter 1:1 – ohne das Layout neu zu bauen.</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((g, index) => (
            <article className={`gallery-card gallery-${index+1}`} key={g[0]} data-reveal>
              <div className="gallery-no">{g[0]}</div>
              <div className="gallery-placeholder">
                <div className="photo-shine" />
                <CarLine />
                <div className="gallery-word">{g[1]}</div>
              </div>
              <div className="gallery-caption"><span>{g[2]}</span><b>FRESH CAR HAMM</b></div>
            </article>
          ))}
        </div>
      </section>

      <section className="compare-section section">
        <div className="compare-copy" data-reveal>
          <div className="eyebrow"><span /> BEFORE / AFTER</div>
          <h2>DER UNTERSCHIED<br/><em>MUSS SICHTBAR SEIN.</em></h2>
          <p>Der Slider ist schon fertig. Mit euren echten Vorher-/Nachher-Bildern wird das später einer der stärksten Bereiche der Seite.</p>
          <div className="compare-values"><span>VORHER</span><strong>{compare}%</strong><span>NACHHER</span></div>
          <input aria-label="Vorher-Nachher-Vergleich" type="range" min="12" max="88" value={compare} onChange={(e) => setCompare(e.target.value)} />
        </div>
        <div className="compare-stage" data-reveal>
          <div className="compare-before"><span>BEFORE</span><CarLine/></div>
          <div className="compare-after" style={{ clipPath: `inset(0 ${100-compare}% 0 0)` }}><span>AFTER</span><CarLine/></div>
          <div className="compare-divider" style={{ left: `${compare}%` }}><i><ArrowRightIcon size={18}/></i></div>
        </div>
      </section>

      <section className="section reviews" id="reviews">
        <div className="reviews-shell" data-reveal>
          <div className="reviews-score">
            <div className="eyebrow"><span /> GOOGLE REVIEWS</div>
            <div className="rating-number">{GOOGLE_RATING}</div>
            <Stars />
            <p><strong>{GOOGLE_REVIEW_COUNT} Rezensionen</strong> auf Google</p>
          </div>
          <div className="reviews-copy">
            <span className="reviews-kicker">Vertrauen entsteht nicht durch Werbung.</span>
            <h2>SONDERN DURCH<br/><em>ECHTE ERFAHRUNGEN.</em></h2>
            <p>Die aktuelle Google-Bewertung ist direkt verlinkt. Kunden können alle Rezensionen öffnen oder mit einem Klick selbst Feedback hinterlassen.</p>
            <div className="reviews-actions">
              <a className="btn btn-primary" href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer"><StarIcon size={18}/> Jetzt bewerten</a>
              <a className="btn btn-ghost" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">Alle Rezensionen <ArrowUpRightIcon /></a>
            </div>
            <div className="review-qr">
              <img src="/brand/google-review-qr.png" alt="QR-Code für eine Google-Bewertung von Fresh Car Hamm" />
              <div><strong>SCAN &amp; REVIEW</strong><span>Am Desktop einfach mit dem Handy scannen und direkt eine Google-Bewertung schreiben.</span></div>
            </div>
            <small>Google-Bewertungsstand: {GOOGLE_RATING}/5 bei {GOOGLE_REVIEW_COUNT} Rezensionen. Die Zahl kann sich nach neuen Bewertungen ändern.</small>
          </div>
          <div className="reviews-glow" aria-hidden="true" />
        </div>
      </section>

      <section className="section process" id="process">
        <div className="section-head" data-reveal>
          <div><div className="eyebrow"><span /> SO LÄUFT'S</div><h2>4 SCHRITTE.<br/><em>KEIN STRESS.</em></h2></div>
          <p>Kein kompliziertes Buchungssystem. Du schickst die wichtigsten Infos – Fresh Car Hamm meldet sich direkt zurück.</p>
        </div>
        <div className="process-grid">
          {[
            ['01','ANFRAGEN','Leistung auswählen und WhatsApp-Anfrage senden.'],
            ['02','FOTOS','Wenn nötig, ein paar Bilder vom Fahrzeug mitschicken.'],
            ['03','TERMIN','Passenden Termin und Umfang gemeinsam bestätigen.'],
            ['04','FRESH','Selbst abholen – oder unseren Abhol- & Bringservice gegen Aufpreis nutzen.'],
          ].map((p,index)=>(
            <article className="process-card" key={p[0]} data-reveal style={{ '--delay': `${index*60}ms` }}>
              <span>{p[0]}</span><h3>{p[1]}</h3><p>{p[2]}</p><i>{index < 3 ? <ArrowRightIcon size={22}/> : <CheckIcon size={22}/>}</i>
            </article>
          ))}
        </div>
      </section>

      <section className="section location" id="location">
        <div className="location-shell" data-reveal>
          <div className="location-copy">
            <div className="eyebrow"><span /> FRESH CAR HAMM / STANDORT</div>
            <h2>DU FINDEST UNS<br/><em>IN HAMM.</em></h2>
            <div className="address-block">
              <div className="address-icon"><MapPinIcon size={26}/></div>
              <div><span>ADRESSE</span><strong>Bockelweg 73<br/>59073 Hamm</strong><small>Hamm-Heessen</small></div>
            </div>
            <p>Navigation starten und direkt hinfahren. Google Maps und Apple Karten öffnen die Route auf dem Handy mit Fresh Car Hamm als Ziel.</p>
            <div className="route-actions">
              <a className="route-btn google" href={GOOGLE_DIRECTIONS_URL} target="_blank" rel="noreferrer"><CompassIcon/><span><small>ROUTE MIT</small>Google Maps</span><ArrowUpRightIcon/></a>
              <a className="route-btn apple" href={APPLE_MAPS_URL} target="_blank" rel="noreferrer"><CompassIcon/><span><small>ROUTE MIT</small>Apple Karten</span><ArrowUpRightIcon/></a>
            </div>
          </div>
          <a className="map-visual" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" aria-label="Fresh Car Hamm auf Google Maps öffnen">
            <div className="map-grid" aria-hidden="true" />
            <div className="road road-a" aria-hidden="true" />
            <div className="road road-b" aria-hidden="true" />
            <div className="road road-c" aria-hidden="true" />
            <div className="road-label road-label-a">BOCKELWEG</div>
            <div className="road-label road-label-b">HAMM-HEESSEN</div>
            <div className="map-pin"><span><MapPinIcon size={28}/></span><div className="pin-pulse" /></div>
            <div className="map-business-card">
              <img src="/brand/fresh-car-hamm-logo.png" alt="" />
              <div><strong>FRESH CAR HAMM</strong><span>Bockelweg 73 · 59073 Hamm</span><small><StarIcon size={13}/> {GOOGLE_RATING} · {GOOGLE_REVIEW_COUNT} Google-Rezensionen</small></div>
              <ArrowUpRightIcon/>
            </div>
            <div className="map-open">AUF GOOGLE MAPS ÖFFNEN <ArrowUpRightIcon size={15}/></div>
          </a>
        </div>
      </section>

      <section className="booking-wrap" id="booking">
        <div className="booking-noise" aria-hidden="true" />
        <div className="booking-copy" data-reveal>
          <div className="eyebrow light"><span /> TERMIN ANFRAGEN</div>
          <h2>BEREIT FÜR<br/><em>FRESH?</em></h2>
          <p>Formular ausfüllen, auf WhatsApp senden und fertig. Die Nachricht wird automatisch für dich vorbereitet.</p>
          <div className="booking-contact">
            <span>WhatsApp</span><a href={whatsappHref} target="_blank" rel="noreferrer">0176 70988025 <ArrowUpRightIcon size={14}/></a>
            <span>Adresse</span><a href={GOOGLE_DIRECTIONS_URL} target="_blank" rel="noreferrer">Bockelweg 73, 59073 Hamm <ArrowUpRightIcon size={14}/></a>
            <span>Instagram</span><a href="https://www.instagram.com/freshcarhamm/" target="_blank" rel="noreferrer">@freshcarhamm <ArrowUpRightIcon size={14}/></a>
            <span>Google</span><a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">{GOOGLE_RATING} / 5 · {GOOGLE_REVIEW_COUNT} Rezensionen <ArrowUpRightIcon size={14}/></a>
          </div>
        </div>
        <form className="booking-form" onSubmit={submitBooking} data-reveal>
          <label><span>Fahrzeug</span><select value={form.vehicle} onChange={e=>setForm({...form,vehicle:e.target.value})}><option>PKW</option><option>SUV</option><option>Sportwagen</option><option>Transporter</option><option>Anderes Fahrzeug</option></select></label>
          <label><span>Leistung</span><select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}><option>Innenraumpaket – 150 €</option><option>Außenpaket – 100 €</option><option>Hochglanzpolitur – ab 150 €</option><option>1-stufige Politur – ab 180 €</option><option>2-stufige Politur – ab 220 €</option><option>3-stufige Politur – ab 280 €</option><option>Einzelne Kratzer</option><option>Extras / individuelle Kombination</option><option>Komplette Innenaufbereitung ohne Chemie – ab 100 €</option><option>Noch unsicher – Beratung</option></select></label>
          <label><span>Abhol- & Bringservice</span><select value={form.pickup} onChange={e=>setForm({...form,pickup:e.target.value})}><option>Nein, ich bringe das Fahrzeug selbst</option><option>Ja, bitte gegen Aufpreis anfragen</option></select></label>
          <label><span>Wunschtermin</span><input ref={dateRef} type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></label>
          <label className="full"><span>Kurze Info <small>optional</small></span><textarea rows="4" value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder="z. B. BMW 3er, starke Verschmutzung, Abholung in Hamm-Heessen ..."/></label>
          <button className="form-submit" type="submit"><WhatsAppIcon/><span>ANFRAGE ÜBER WHATSAPP SENDEN</span><ArrowUpRightIcon size={20}/></button>
          <p className="form-note">Basis-/Ab-Preise laut Leistungskatalog · Mehraufwand & Abholservice nach Absprache · Antwort direkt über WhatsApp</p>
        </form>
      </section>

      <footer>
        <div className="footer-brand"><img src="/brand/fresh-car-hamm-logo.png" alt="Fresh Car Hamm"/><p>Fahrzeugpflege · Politur · An- & Verkauf<br/>Bockelweg 73 · 59073 Hamm</p></div>
        <div className="footer-links"><a href="#services">Leistungen & Preise</a><a href="#pickup">Abholservice</a><a href="#gallery">Galerie</a><a href="#reviews">Bewertungen</a><a href="#location">Kontakt & Standort</a><a href="#booking">Termin</a><a href="https://www.instagram.com/freshcarhamm/" target="_blank" rel="noreferrer">Instagram</a></div>
        <div className="footer-legal"><span>© {new Date().getFullYear()} Fresh Car Hamm</span><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a></div>
      </footer>

      <a className="floating-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Termin über WhatsApp anfragen"><WhatsAppIcon/><span>TERMIN</span></a>
    </main>
  );
}
