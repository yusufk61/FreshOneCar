// Zentrale Geschäftsdaten von Fresh Car Hamm.
// Alles, was an mehreren Stellen gebraucht wird (Telefon, Adresse, Maps, Bewertungen), steht NUR hier.

export const SITE = {
  name: 'Fresh Car Hamm',
  claim: 'Premium Fahrzeugaufbereitung in Hamm',
  description:
    'Fahrzeugaufbereitung, Innenraumreinigung, Außenpflege und Politur in Hamm-Heessen. Optionaler Abhol- & Bringservice gegen Aufpreis. Bockelweg 73, 59073 Hamm.',

  address: {
    street: 'Bockelweg 73',
    postalCode: '59073',
    city: 'Hamm',
    district: 'Hamm-Heessen',
    country: 'DE',
    oneLine: 'Bockelweg 73, 59073 Hamm',
  },

  // WhatsApp = Haupt-Conversion. `international` ohne "+" für wa.me.
  phone: {
    display: '0176 70988025',
    international: '4917670988025',
    e164: '+4917670988025',
    schema: '+49 176 70988025',
  },

  instagram: {
    handle: '@freshcarhamm',
    url: 'https://www.instagram.com/freshcarhamm/',
  },

  // Google-Bewertungen — HIER pflegen (Anzeige UND strukturierte Daten nutzen diese Werte).
  // Bitte vor dem Livegang mit dem aktuellen Google-Eintrag abgleichen.
  google: {
    placeId: 'ChIJx8TN0B11uUcR-3FXFlMySGk',
    rating: 5.0,
    ratingLabel: '5,0',
    reviewCount: 4,
  },

  // Nicht bekannt / vom Betreiber zu liefern — bewusst NICHT erfunden:
  // Öffnungszeiten, E-Mail, Inhaber, Rechtsform, Register-/Steuerdaten, fester Preis für den Abholservice.
  openingHours: null,
  email: null,
};

export const PICKUP_NOTE = 'Aufpreis abhängig von Entfernung und Aufwand · Verfügbarkeit nach Absprache';

export const PRICE_NOTE =
  'Bei starker Verschmutzung, besonderem Aufwand oder individuellen Wünschen kann der Preis abweichen – der Umfang wird vorher abgestimmt.';

const addr = encodeURIComponent(SITE.address.oneLine);
const placeId = SITE.google.placeId;

export const LINKS = {
  googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.name}, ${SITE.address.oneLine}`)}&query_place_id=${placeId}`,
  googleDirections: `https://www.google.com/maps/dir/?api=1&destination=${addr}&destination_place_id=${placeId}`,
  appleMaps: `https://maps.apple.com/?daddr=${addr}&dirflg=d`,
  googleReview: `https://search.google.com/local/writereview?placeid=${placeId}`,
  instagram: SITE.instagram.url,
  tel: `tel:${SITE.phone.e164}`,
};
