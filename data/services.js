// Leistungskatalog — Source of Truth ist data/source/Website.ods.
// Preise und Leistungen NICHT erfinden. Offensichtliche Tippfehler der Tabelle sind für die Anzeige korrigiert;
// Inhalt und Preis blieben unverändert. Die Spalte `ods` verweist auf die Zelle(n) in der Tabelle.
//
// priceLabel  = so wird der Preis angezeigt
// priceFrom   = Zahl für strukturierte Daten (nur wenn die Tabelle eine Zahl nennt)
// priceKind   = 'fix' | 'from' | 'varies'

export const CATEGORIES = [
  { id: 'pakete', no: '01', label: 'Pakete' },
  { id: 'polituren', no: '02', label: 'Polituren' },
  { id: 'extras', no: '03', label: 'Extras' },
];

export const PACKAGES = [
  {
    slug: 'innenraumpaket',
    no: '01',
    name: 'Innenraumpaket',
    eyebrow: 'Interior Detail',
    icon: 'seat',
    priceLabel: '150 €',
    priceFrom: 150,
    priceKind: 'fix',
    text: 'Gründliches Saugen inkl. Tornador-Reinigung der Ritzen, Tiefenreinigung der Sitze, Reinigung von Cockpit, Lenkrad, Mittelkonsole, Schaltern, Display, Lüftungsdüsen und Kunststoffteilen, Türverkleidungen, Türeinstiegen, Einstiegsleisten und Gummiteilen, Pedalen und Fußraum, Kofferraum, Fußmatten sowie streifenfreie Innenscheiben.',
    teaser: 'Tiefenreinigung innen – von den Sitzen bis zum Kofferraum.',
    ods: 'A1 · A2 · A3 (Hinweise A5/A6)',
  },
  {
    slug: 'aussenpaket',
    no: '02',
    name: 'Außenpaket',
    eyebrow: 'Exterior Detail',
    icon: 'drop',
    priceLabel: '100 €',
    priceFrom: 100,
    priceKind: 'fix',
    text: 'Vorreinigung, schonende Handwäsche, Detailreinigung mit Pinsel, Reifen- und Felgenreinigung, Radkastenreinigung, Trocknung mit Mikrofasertüchern und Reifenglanz.',
    teaser: 'Schonende Handwäsche mit Felgen-, Reifen- und Radkastenpflege.',
    ods: 'G1 · G2 · G3',
  },
];

export const POLISHES = [
  { slug: 'hochglanzpolitur', name: 'Hochglanzpolitur', priceLabel: 'ab 150 €', priceFrom: 150, priceKind: 'from', ods: 'E3 · F3' },
  { slug: 'politur-1-stufig', name: '1-stufige Politur', priceLabel: 'ab 180 €', priceFrom: 180, priceKind: 'from', ods: 'E4 · F4' },
  { slug: 'politur-2-stufig', name: '2-stufige Politur', priceLabel: 'ab 220 €', priceFrom: 220, priceKind: 'from', ods: 'E5 · F5' },
  { slug: 'politur-3-stufig', name: '3-stufige Politur', priceLabel: 'ab 280 €', priceFrom: 280, priceKind: 'from', ods: 'E6 · F6' },
  { slug: 'einzelne-kratzer', name: 'Einzelne Kratzer', priceLabel: 'Preis je nach Kratzer', priceFrom: null, priceKind: 'varies', ods: 'E7 · F7' },
];

export const EXTRAS = [
  { slug: 'dachhimmelreinigung', name: 'Dachhimmelreinigung', priceLabel: 'ab 20 €', priceFrom: 20, priceKind: 'from', ods: 'C3 · D3' },
  { slug: 'lederpflege', name: 'Lederpflege', priceLabel: 'ab 20 €', priceFrom: 20, priceKind: 'from', ods: 'C4 · D4' },
  { slug: 'kunststoffpflege', name: 'Kunststoffpflege', priceLabel: 'ab 20 €', priceFrom: 20, priceKind: 'from', ods: 'C5 · D5' },
  { slug: 'gummipflege', name: 'Gummipflege', priceLabel: 'ab 20 €', priceFrom: 20, priceKind: 'from', ods: 'C6 · D6' },
  { slug: 'tierhaarentfernung', name: 'Tierhaarentfernung', priceLabel: 'ab 50 €', priceFrom: 50, priceKind: 'from', ods: 'C7 · D7' },
  { slug: 'sitzreinigung-intensiv', name: 'Intensive Reinigung der Sitze', priceLabel: 'pro Sitz ab 20 €', priceFrom: 20, priceKind: 'from', ods: 'C8 · D8' },
  { slug: 'fussmattenreinigung-intensiv', name: 'Intensive Reinigung der Fußmatten', priceLabel: 'pro Matte ab 10 €', priceFrom: 10, priceKind: 'from', ods: 'C9 · D9' },
  { slug: 'gurtreinigung', name: 'Gurtreinigung', priceLabel: 'ab 20 €', priceFrom: 20, priceKind: 'from', ods: 'C11 · D11' },
  { slug: 'gummimattenpflege', name: 'Gummimattenpflege', priceLabel: 'ab 20 €', priceFrom: 20, priceKind: 'from', ods: 'C12 · D12' },
  { slug: 'aufkleberentfernung', name: 'Aufkleberentfernung', priceLabel: 'ab 10 €', priceFrom: 10, priceKind: 'from', ods: 'C13 · D13' },
  { slug: 'flugrostentfernung', name: 'Flugrostentfernung', priceLabel: 'ab 20 €', priceFrom: 20, priceKind: 'from', ods: 'C14 · D14' },
  { slug: 'fahrzeug-kneten', name: 'Kneten des Fahrzeugs', priceLabel: 'ab 50 €', priceFrom: 50, priceKind: 'from', ods: 'C15 · D15' },
  // In der Tabelle doppelt (C16/D16 „Plastikteile“ und C17/D17 „Kunststoffteile“, beide ab 25 €) — hier einmal.
  { slug: 'kunststoffteile-schwaerzen', name: 'Schwärzen ausgebleichter Kunststoffteile', priceLabel: 'ab 25 €', priceFrom: 25, priceKind: 'from', ods: 'C16 · D16 + C17 · D17 (doppelt)' },
  { slug: 'scheinwerferaufbereitung', name: 'Scheinwerferaufbereitung', priceLabel: 'ab 50 €', priceFrom: 50, priceKind: 'from', ods: 'C18 · D18' },
  { slug: 'dichtungspflege', name: 'Dichtungspflege', priceLabel: 'ab 25 €', priceFrom: 25, priceKind: 'from', ods: 'C19 · D19' },
  { slug: 'insektenentfernung', name: 'Insektenentfernung', priceLabel: 'ab 30 €', priceFrom: 30, priceKind: 'from', ods: 'C20 · D20' },
  { slug: 'motorraumreinigung', name: 'Motorraumreinigung', priceLabel: 'ab 50 €', priceFrom: 50, priceKind: 'from', ods: 'C21 · D21' },
  { slug: 'sprueh-versiegelung-scheiben', name: 'Sprühversiegelung Scheiben', priceLabel: 'pro Scheibe ab 10 €', priceFrom: 10, priceKind: 'from', ods: 'C22 · D22' },
  { slug: 'sprueh-versiegelung-karosserie', name: 'Sprühversiegelung Karosserie', priceLabel: 'ab 80 €', priceFrom: 80, priceKind: 'from', ods: 'C23 · D23' },
  { slug: 'innenaufbereitung-ohne-chemie', name: 'Komplette Innenaufbereitung ohne Chemie', priceLabel: 'ab 100 €', priceFrom: 100, priceKind: 'from', ods: 'C24 · D24' },
];

// Alles, was im Terminformular wählbar ist (Reihenfolge = Reihenfolge der Chips).
export const SERVICE_GROUPS = [
  { id: 'pakete', label: 'Pakete', items: PACKAGES },
  { id: 'polituren', label: 'Polituren', items: POLISHES },
  { id: 'extras', label: 'Extras', items: EXTRAS },
];

export const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) => g.items.map((item) => ({ ...item, category: g.id })));

const bySlug = new Map(ALL_SERVICES.map((s) => [s.slug, s]));

export function findService(slug) {
  return bySlug.get(slug) ?? null;
}

export function isServiceSlug(slug) {
  return bySlug.has(slug);
}

export function termRequestHref(slug) {
  return `/termin?service=${encodeURIComponent(slug)}`;
}

// Kleinster Einstiegspreis je Kategorie (abgeleitet — nichts hart erfunden).
const minFrom = (items) => Math.min(...items.map((i) => i.priceFrom).filter((n) => typeof n === 'number'));
export const MIN_PRICES = {
  pakete: minFrom(PACKAGES),
  polituren: minFrom(POLISHES),
  extras: minFrom(EXTRAS),
};
