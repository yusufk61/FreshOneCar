import Link from 'next/link';
import Icon from './Icon';
import { genericWhatsappUrl } from '@/lib/whatsapp';

// Roter Abschluss-CTA (Look des bisherigen Termin-Blocks). Blendet den schwebenden WhatsApp-Button aus.
export default function CtaBand({
  eyebrow = 'Termin anfragen',
  title = 'Bereit für',
  accent = 'Fresh?',
  text = 'Bereit für dein Fresh-Car-Erlebnis? Schick uns deine Anfrage – die WhatsApp-Nachricht wird automatisch für dich vorbereitet.',
  primary = { href: '/termin', label: 'Termin anfragen' },
  showWhatsApp = true,
}) {
  return (
    <section className="cta-band" data-hide-float aria-labelledby="cta-title">
      <div className="booking-noise" aria-hidden="true" />
      <div className="cta-copy" data-reveal>
        <div className="eyebrow light">
          <span aria-hidden="true" /> {eyebrow}
        </div>
        <h2 id="cta-title">
          {title}
          <em>{accent}</em>
        </h2>
        <p>{text}</p>
      </div>
      <div className="cta-actions" data-reveal>
        <Link className="btn btn-light" href={primary.href}>
          {primary.label} <Icon name="arrow-up-right" size={18} />
        </Link>
        {showWhatsApp ? (
          <a className="cta-wa" href={genericWhatsappUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={20} /> Direkt auf WhatsApp
          </a>
        ) : null}
      </div>
    </section>
  );
}
