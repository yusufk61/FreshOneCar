'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { CATEGORIES, PACKAGES, POLISHES, EXTRAS, termRequestHref } from '@/data/services';
import { PRICE_NOTE } from '@/data/site';

const IDS = CATEGORIES.map((c) => c.id);
const pad = (n) => String(n).padStart(2, '0');

// Leistungskatalog mit Tabs. ALLE drei Bereiche liegen im HTML (SEO, Screenreader, ohne JS sichtbar);
// der aktive Tab wird nur per `hidden` umgeschaltet. Deep-Link: /leistungen#polituren
export default function ServiceCatalog() {
  const [tab, setTab] = useState('pakete');
  const rootRef = useRef(null);
  const tabRefs = useRef({});

  useEffect(() => {
    const apply = () => {
      const id = window.location.hash.replace('#', '');
      if (!IDS.includes(id)) return false;
      setTab(id);
      return true;
    };
    if (apply()) requestAnimationFrame(() => rootRef.current?.scrollIntoView({ block: 'start' }));
    const onHash = () => {
      if (apply()) rootRef.current?.scrollIntoView({ block: 'start' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const select = useCallback((id, focus = false) => {
    setTab(id);
    window.history.replaceState(null, '', `#${id}`);
    if (focus) tabRefs.current[id]?.focus();
  }, []);

  const onKeyDown = (e) => {
    const i = IDS.indexOf(tab);
    let next = null;
    if (e.key === 'ArrowRight') next = IDS[(i + 1) % IDS.length];
    else if (e.key === 'ArrowLeft') next = IDS[(i - 1 + IDS.length) % IDS.length];
    else if (e.key === 'Home') next = IDS[0];
    else if (e.key === 'End') next = IDS[IDS.length - 1];
    if (next) {
      e.preventDefault();
      select(next, true);
    }
  };

  return (
    <section className="section price-catalog" id="katalog" ref={rootRef} aria-label="Leistungen und Preise">
      <noscript>
        <style>{'#katalog [role="tabpanel"][hidden]{display:block!important}#katalog .price-tabs{display:none}#katalog [role="tabpanel"]{margin-bottom:28px}'}</style>
      </noscript>

      <div className="price-tabs" role="tablist" aria-label="Leistungskategorien" onKeyDown={onKeyDown}>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            ref={(el) => {
              tabRefs.current[c.id] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${c.id}`}
            aria-selected={tab === c.id}
            aria-controls={`panel-${c.id}`}
            tabIndex={tab === c.id ? 0 : -1}
            className={tab === c.id ? 'active' : ''}
            onClick={() => select(c.id)}
          >
            <span>{c.no}</span> {c.label}
          </button>
        ))}
      </div>

      {/* PAKETE */}
      <div className="package-grid" role="tabpanel" id="panel-pakete" aria-labelledby="tab-pakete" hidden={tab !== 'pakete'}>
        {PACKAGES.map((s) => (
          <article className="package-card" key={s.slug}>
            <div className="package-top">
              <span className="service-no">{s.no}</span>
              <div className="service-icon">
                <Icon name={s.icon} size={24} />
              </div>
            </div>
            <div className="service-eyebrow">{s.eyebrow}</div>
            <h3>{s.name}</h3>
            <div className="package-price">
              <small>PAKETPREIS</small>
              <strong>{s.priceLabel}</strong>
            </div>
            <p>{s.text}</p>
            <ul className="package-notes">
              <li>
                <Icon name="check" size={16} /> Abhol- &amp; Bringservice möglich
              </li>
              <li>
                <Icon name="check" size={16} /> Bei starker Verschmutzung teurer
              </li>
            </ul>
            <Link className="package-cta" href={termRequestHref(s.slug)}>
              Diese Leistung anfragen <Icon name="arrow-up-right" size={17} />
            </Link>
          </article>
        ))}
        <aside className="price-note-card">
          <span>WICHTIG</span>
          <h3>
            FAIR STATT
            <br />
            ÜBERRASCHUNG.
          </h3>
          <p>Bei starker Verschmutzung oder außergewöhnlichem Mehraufwand kann der Endpreis höher ausfallen. Wir stimmen den Umfang vorher mit dir ab.</p>
          <div>
            <Icon name="check" size={18} /> Preis vorab abstimmen
          </div>
          <div>
            <Icon name="check" size={18} /> Extras frei kombinierbar
          </div>
          <div>
            <Icon name="check" size={18} /> Abholung optional
          </div>
        </aside>
      </div>

      {/* POLITUREN */}
      <div className="price-list-shell" role="tabpanel" id="panel-polituren" aria-labelledby="tab-polituren" hidden={tab !== 'polituren'}>
        <div className="price-list-head">
          <span>POLITUR / PAINT CORRECTION</span>
          <small>AB-PREISE</small>
        </div>
        {POLISHES.map((s, i) => (
          <Link className="price-row" href={termRequestHref(s.slug)} key={s.slug}>
            <span className="price-index">{pad(i + 1)}</span>
            <strong>{s.name}</strong>
            <span className="price-dots" aria-hidden="true" />
            <b>{s.priceLabel}</b>
            <span className="row-go">
              <Icon name="arrow-up-right" size={16} />
            </span>
            <span className="sr-only">– Diese Leistung anfragen</span>
          </Link>
        ))}
        <div className="price-list-foot">Der passende Politur-Aufbau richtet sich nach Lackzustand und gewünschtem Ergebnis.</div>
      </div>

      {/* EXTRAS */}
      <div className="extras-grid" role="tabpanel" id="panel-extras" aria-labelledby="tab-extras" hidden={tab !== 'extras'}>
        {EXTRAS.map((s, i) => (
          <Link className="extra-item" href={termRequestHref(s.slug)} key={s.slug}>
            <span className="extra-no">{pad(i + 1)}</span>
            <span className="extra-text">
              <strong>{s.name}</strong>
              <small>{s.priceLabel}</small>
            </span>
            <span className="row-go">
              <Icon name="arrow-up-right" size={15} />
            </span>
            <span className="sr-only">– Diese Leistung anfragen</span>
          </Link>
        ))}
      </div>

      <div className="catalog-footer">
        <span>Alle Preise verstehen sich als Richt-/Ab-Preise entsprechend dem angegebenen Leistungsumfang. {PRICE_NOTE}</span>
        <Link href="/termin">
          Leistung anfragen <Icon name="arrow-right" size={17} />
        </Link>
      </div>
    </section>
  );
}
