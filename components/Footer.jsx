import Link from 'next/link';
import Icon from './Icon';
import Logo from './Logo';
import { NAV_ITEMS, LEGAL_ITEMS } from '@/data/navigation';
import { SITE, LINKS } from '@/data/site';
import { genericWhatsappUrl } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="site-footer" data-menu-inert data-hide-float>
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" aria-label="Fresh Car Hamm – zur Startseite">
            <Logo width={170} alt="Fresh Car Hamm" />
          </Link>
          <p>
            {SITE.claim}
            <br />
            {SITE.address.street} · {SITE.address.postalCode} {SITE.address.city}
          </p>
          <a className="btn btn-primary footer-cta" href={genericWhatsappUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={20} />
            <span>Termin über WhatsApp</span>
          </a>
        </div>

        <nav className="footer-nav" aria-label="Seiten">
          <p className="footer-title">Seiten</p>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-contact">
          <p className="footer-title">Kontakt</p>
          <ul>
            <li>
              <a href={genericWhatsappUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={18} />
                {SITE.phone.display}
              </a>
            </li>
            <li>
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" size={18} />
                {SITE.instagram.handle}
              </a>
            </li>
            <li>
              <a href={LINKS.googleDirections} target="_blank" rel="noopener noreferrer">
                <Icon name="map-pin" size={18} />
                <span>
                  {SITE.address.street}
                  <br />
                  {SITE.address.postalCode} {SITE.address.city}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-legal">
        <span>© {new Date().getFullYear()} Fresh Car Hamm</span>
        {LEGAL_ITEMS.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
