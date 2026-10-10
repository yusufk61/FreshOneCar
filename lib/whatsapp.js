import { SITE } from '@/data/site';

export const PICKUP_OPTIONS = {
  no: 'Nein, ich bringe das Fahrzeug selbst',
  yes: 'Ja, bitte gegen Aufpreis anfragen',
};

export function whatsappUrl(message) {
  return `https://wa.me/${SITE.phone.international}?text=${encodeURIComponent(message)}`;
}

export const GENERIC_MESSAGE = 'Hallo Fresh Car Hamm, ich möchte einen Termin anfragen.';
export const genericWhatsappUrl = whatsappUrl(GENERIC_MESSAGE);

// "2026-10-15" -> "15.10.2026"
export function formatDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${m[3]}.${m[2]}.${m[1]}` : '';
}

/**
 * Baut die vorbereitete WhatsApp-Nachricht für die Terminanfrage.
 * @param {{vehicleType?:string, vehicleModel?:string, services?:string[], wantsAdvice?:boolean, pickup?:boolean, date?:string, note?:string}} f
 */
export function buildInquiryMessage(f) {
  const model = f.vehicleModel?.trim();
  const vehicle = model ? `${model}${f.vehicleType ? ` (${f.vehicleType})` : ''}` : f.vehicleType || 'noch nicht angegeben';

  const services = f.services ?? [];
  let serviceLines;
  if (services.length === 0) {
    serviceLines = [`Leistung: ${f.wantsAdvice ? 'Noch unsicher – bitte beraten' : 'noch offen'}`];
  } else if (services.length === 1 && !f.wantsAdvice) {
    serviceLines = [`Leistung: ${services[0]}`];
  } else {
    serviceLines = ['Leistungen:', ...services.map((s) => `• ${s}`)];
    if (f.wantsAdvice) serviceLines.push('• Zusätzlich: Beratung gewünscht');
  }

  const lines = [
    'Hallo Fresh Car Hamm 👋',
    '',
    'ich möchte gerne eine Fahrzeugaufbereitung anfragen.',
    '',
    `Fahrzeug: ${vehicle}`,
    ...serviceLines,
    `Abhol- & Bringservice: ${f.pickup ? 'Ja, bitte anfragen' : 'Nein, ich bringe das Fahrzeug selbst'}`,
    `Wunschtermin: ${formatDate(f.date) || 'flexibel / noch offen'}`,
  ];

  if (f.note?.trim()) lines.push('', 'Nachricht:', f.note.trim());
  lines.push('', 'Könnt ihr mir sagen, ob der Termin möglich ist?');
  return lines.join('\n');
}
