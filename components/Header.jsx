'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import Logo from './Logo';
import { NAV_ITEMS, LEGAL_ITEMS, isActive } from '@/data/navigation';
import { SITE, LINKS, PICKUP_NOTE } from '@/data/site';
import { genericWhatsappUrl } from '@/lib/whatsapp';

// Header + Hamburger-Menü (auf allen Bildschirmgrößen). Das Menü ist ein Fullscreen-Panel mit nummerierten
// Einträgen; jeder Eintrag führt auf eine echte Route.
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  // Menü schließt automatisch bei Routenwechsel
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll-Lock, Inert-Hintergrund, Fokus & Tastatur — nur solange das Menü offen ist
  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    root.classList.add('menu-open');
    const inertEls = document.querySelectorAll('[data-menu-inert]');
    inertEls.forEach((el) => el.setAttribute('inert', ''));

    const firstLink = panelRef.current?.querySelector('a[href]');
    firstLink?.focus({ preventScroll: true });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = Array.from(document.querySelectorAll('.nav-shell a[href], .nav-shell button, .site-menu a[href], .site-menu button')).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      root.classList.remove('menu-open');
      inertEls.forEach((el) => el.removeAttribute('inert'));
    };
  }, [open, close]);

  const onPanelClick = (e) => {
    // Klick auf freie Fläche (Hintergrund) schließt das Menü
    if (e.target === e.currentTarget || e.target.hasAttribute('data-close')) setOpen(false);
  };

  return (
    <>
      <header className="nav-shell">
        <Link className="brand" href="/" aria-label="Fresh Car Hamm – zur Startseite" onClick={() => setOpen(false)}>
          <Logo width={154} priority />
        </Link>

        <a className="nav-cta" href={genericWhatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Termin über WhatsApp anfragen">
          <Icon name="whatsapp" size={20} />
          <span className="nav-cta-text">WhatsApp</span>
        </a>

        <button
          ref={buttonRef}
          type="button"
          className={`menu-btn${open ? ' is-open' : ''}`}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="menu-btn-label" aria-hidden="true">
            Menü
          </span>
        </button>
      </header>

      <div
        id="site-menu"
        ref={panelRef}
        className={`site-menu${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Hauptmenü"
        aria-hidden={!open}
        onClick={onPanelClick}
      >
        <div className="menu-grid" data-close>
          <nav className="menu-nav" aria-label="Hauptnavigation" data-close>
            <p className="menu-kicker" aria-hidden="true">
              <span /> Navigation
            </p>
            <ol className="menu-list">
              {NAV_ITEMS.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} style={{ '--i': i }}>
                    <Link
                      href={item.href}
                      className={`menu-link${item.highlight ? ' is-cta' : ''}`}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                      tabIndex={open ? undefined : -1}
                    >
                      <b>{item.no}</b>
                      <span>{item.label}</span>
                      <em className="menu-dot" aria-hidden="true" />
                      <Icon name={item.highlight ? 'arrow-up-right' : 'arrow-right'} size={20} className="menu-arrow" />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <aside className="menu-aside" data-close>
            <div className="menu-card">
              <p className="menu-card-label">Direkt anfragen</p>
              <a className="btn btn-primary menu-wa" href={genericWhatsappUrl} target="_blank" rel="noopener noreferrer" tabIndex={open ? undefined : -1}>
                <Icon name="whatsapp" size={20} />
                <span>Per WhatsApp schreiben</span>
              </a>
              <ul className="menu-card-list">
                <li>
                  <Icon name="map-pin" size={18} />
                  <a href={LINKS.googleMaps} target="_blank" rel="noopener noreferrer" tabIndex={open ? undefined : -1}>
                    {SITE.address.street}
                    <br />
                    {SITE.address.postalCode} {SITE.address.city}
                  </a>
                </li>
                <li>
                  <Icon name="instagram" size={18} />
                  <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" tabIndex={open ? undefined : -1}>
                    {SITE.instagram.handle}
                  </a>
                </li>
              </ul>
              <p className="menu-card-note">
                <b>NEU</b> Abhol- &amp; Bringservice nach Absprache
                <small>{PICKUP_NOTE}</small>
              </p>
            </div>
          </aside>

          <div className="menu-legal" data-close>
            {LEGAL_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                onClick={() => setOpen(false)}
                tabIndex={open ? undefined : -1}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
