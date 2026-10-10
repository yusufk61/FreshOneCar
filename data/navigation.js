// Informationsarchitektur: jede Hauptseite ist eine echte Route.

export const NAV_ITEMS = [
  { href: '/', no: '01', label: 'Start', title: 'Start' },
  { href: '/leistungen', no: '02', label: 'Leistungen & Preise', title: 'Leistungen & Preise' },
  { href: '/abholservice', no: '03', label: 'Abhol- & Bringservice', title: 'Abhol- & Bringservice' },
  { href: '/galerie', no: '04', label: 'Galerie', title: 'Galerie' },
  { href: '/bewertungen', no: '05', label: 'Bewertungen', title: 'Bewertungen' },
  { href: '/kontakt', no: '06', label: 'Kontakt & Standort', title: 'Kontakt & Standort' },
  { href: '/termin', no: '07', label: 'Termin anfragen', title: 'Termin anfragen', highlight: true },
];

export const LEGAL_ITEMS = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
];

export function isActive(pathname, href) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Vor-/Zurück-Navigation am Seitenende (ohne Termin — der ist das Ziel, nicht Teil der Lesereihenfolge).
const PAGER_ORDER = NAV_ITEMS.filter((i) => i.href !== '/termin');

export function pagerFor(href) {
  const idx = PAGER_ORDER.findIndex((i) => i.href === href);
  if (idx === -1) return { prev: PAGER_ORDER[PAGER_ORDER.length - 1], next: null };
  return { prev: PAGER_ORDER[idx - 1] ?? null, next: PAGER_ORDER[idx + 1] ?? null };
}
