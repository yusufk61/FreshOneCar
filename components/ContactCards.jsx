import Icon from './Icon';
import CopyButton from './CopyButton';
import { SITE, LINKS } from '@/data/site';
import { genericWhatsappUrl } from '@/lib/whatsapp';

// Große Tap-Flächen für die vier Kontaktwege. Alle Daten aus data/site.js — keine erfundenen Zeiten/E-Mail-Adressen.
export default function ContactCards() {
  return (
    <ul className="ct-grid">
      <li data-reveal>
        <a className="ct-card is-primary" href={genericWhatsappUrl} target="_blank" rel="noopener noreferrer">
          <span className="ct-icon">
            <Icon name="whatsapp" size={26} />
          </span>
          <Icon name="arrow-up-right" size={18} className="ct-go" />
          <span className="ct-text">
            <small>WhatsApp schreiben</small>
            <strong>{SITE.phone.display}</strong>
            <span>Termine nach Anfrage über WhatsApp</span>
          </span>
        </a>
      </li>

      <li data-reveal style={{ '--delay': '60ms' }}>
        <a className="ct-card" href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
          <span className="ct-icon">
            <Icon name="instagram" size={24} />
          </span>
          <Icon name="arrow-up-right" size={18} className="ct-go" />
          <span className="ct-text">
            <small>Instagram</small>
            <strong>{SITE.instagram.handle}</strong>
            <span>Folge uns für Einblicke in unsere Arbeit</span>
          </span>
        </a>
      </li>

      <li data-reveal style={{ '--delay': '120ms' }}>
        <a className="ct-card" href={LINKS.tel}>
          <span className="ct-icon">
            <Icon name="phone" size={24} />
          </span>
          <Icon name="arrow-up-right" size={18} className="ct-go" />
          <span className="ct-text">
            <small>Anrufen</small>
            <strong>{SITE.phone.display}</strong>
            <span>Tippen, um direkt anzurufen</span>
          </span>
        </a>
      </li>

      <li data-reveal style={{ '--delay': '180ms' }}>
        <CopyButton className="ct-card ct-copy" text={SITE.address.oneLine} successMessage="Adresse kopiert" errorMessage="Kopieren nicht möglich – bitte die Adresse manuell markieren">
          <span className="ct-icon">
            <Icon name="copy" size={24} className="ct-ico-idle" />
            <Icon name="check" size={24} className="ct-ico-done" />
          </span>
          <span className="ct-go" aria-hidden="true" />
          <span className="ct-text">
            <small>Adresse kopieren</small>
            <strong>
              {SITE.address.street},
              <br />
              {SITE.address.postalCode} {SITE.address.city}
            </strong>
            <span className="ct-hint-idle">Tippen, um die Adresse zu kopieren</span>
            <span className="ct-hint-copied" aria-hidden="true">
              Adresse kopiert
            </span>
            <span className="ct-hint-failed" aria-hidden="true">
              Kopieren nicht möglich
            </span>
          </span>
        </CopyButton>
      </li>
    </ul>
  );
}
