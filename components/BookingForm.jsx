'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon';
import { ALL_SERVICES, SERVICE_GROUPS, isServiceSlug } from '@/data/services';
import { PICKUP_NOTE } from '@/data/site';
import { PICKUP_OPTIONS, buildInquiryMessage, whatsappUrl } from '@/lib/whatsapp';

const VEHICLE_TYPES = ['PKW', 'SUV', 'Sportwagen', 'Transporter', 'Anderes Fahrzeug'];
const TRUE_VALUES = new Set(['true', '1', 'ja', 'yes']);
const GROUP_OF = new Map(ALL_SERVICES.map((s) => [s.slug, s.category]));
const pad2 = (n) => String(n).padStart(2, '0');

// URL-Vorauswahl: /termin?service=lederpflege,dachhimmelreinigung&pickup=true — nur gültige Slugs.
function parseParams(sp) {
  const slugs = [];
  for (const raw of sp.getAll('service')) {
    for (const part of raw.split(',')) {
      const slug = part.trim().toLowerCase();
      if (slug && isServiceSlug(slug) && !slugs.includes(slug)) slugs.push(slug);
    }
  }
  const pickup = TRUE_VALUES.has((sp.get('pickup') ?? '').trim().toLowerCase());
  return { slugs, pickup };
}

// Welche Gruppen sind offen? Pakete immer zuerst; jede Gruppe mit Vorauswahl öffnet sich.
function openGroups(slugs, current = { pakete: true }) {
  const next = { ...current };
  slugs.forEach((slug) => {
    const g = GROUP_OF.get(slug);
    if (g) next[g] = true;
  });
  return next;
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* Fallback unten */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;font-size:16px';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

function ServiceChip({ item, checked, onToggle }) {
  return (
    <li>
      <label className={`bf-chip${checked ? ' is-on' : ''}`}>
        <input type="checkbox" name="service" value={item.slug} checked={checked} onChange={() => onToggle(item.slug)} />
        <span className="bf-box" aria-hidden="true">
          <Icon name="check" size={14} strokeWidth={3} />
        </span>
        <span className="bf-chip-text">
          <span className="bf-chip-name">{item.name}</span>{' '}
          <span className="bf-chip-price">{item.priceLabel}</span>
        </span>
      </label>
    </li>
  );
}

export default function BookingForm() {
  const searchParams = useSearchParams();
  const urlKey = searchParams.toString();
  const formRef = useRef(null);
  const appliedKey = useRef(urlKey);
  const copyTimer = useRef(null);

  const [vehicleType, setVehicleType] = useState(VEHICLE_TYPES[0]);
  const [vehicleModel, setVehicleModel] = useState('');
  const [selected, setSelected] = useState(() => parseParams(searchParams).slugs);
  const [wantsAdvice, setWantsAdvice] = useState(false);
  const [open, setOpen] = useState(() => openGroups(parseParams(searchParams).slugs));
  const [pickup, setPickup] = useState(() => (parseParams(searchParams).pickup ? 'yes' : 'no'));
  const [date, setDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(null);
  const [copyState, setCopyState] = useState('idle');

  // min = heute: erst im Effect (Zeitzone/Datum des Geräts), damit nichts mit dem Server-Markup kollidiert.
  useEffect(() => {
    const d = new Date();
    setMinDate(`${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`);
  }, []);

  // Ändern sich die URL-Parameter bei bleibender Seite, wird die Vorauswahl ergänzt – manuelle Eingaben bleiben erhalten.
  useEffect(() => {
    if (appliedKey.current === urlKey) return;
    appliedKey.current = urlKey;
    const { slugs, pickup: wantsPickup } = parseParams(searchParams);
    if (slugs.length) {
      setSelected((prev) => [...prev, ...slugs.filter((s) => !prev.includes(s))]);
      setOpen((prev) => openGroups(slugs, prev));
    }
    if (wantsPickup) setPickup('yes');
  }, [urlKey, searchParams]);

  // Kommt jemand mit Vorauswahl auf die Seite (z. B. „Diese Leistung anfragen“), liegt das Formular weit unter dem Einstieg:
  // dann wird es einmal in den Blick gerückt. Ohne Vorauswahl oder bei bereits sichtbarem Formular passiert nichts.
  useEffect(() => {
    const { slugs, pickup: wantsPickup } = parseParams(searchParams);
    if (!slugs.length && !wantsPickup) return undefined;
    const t = window.setTimeout(() => {
      const el = formRef.current;
      if (!el) return;
      if (el.getBoundingClientRect().top > window.innerHeight * 0.55) el.scrollIntoView({ block: 'start' });
    }, 160);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlKey]);

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const toggleService = useCallback((slug) => {
    setSelected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const toggleGroup = useCallback((id) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const selectedServices = useMemo(() => ALL_SERVICES.filter((s) => selected.includes(s.slug)), [selected]);

  const message = useMemo(() => {
    const model = vehicleModel.trim();
    return buildInquiryMessage({
      // Ohne Modell nur den Fahrzeugtyp nennen („Fahrzeug: SUV“) statt „(SUV)“.
      vehicleType: model ? vehicleType : '',
      vehicleModel: model || vehicleType,
      services: selectedServices.map((s) => s.name),
      wantsAdvice,
      pickup: pickup === 'yes',
      date,
      note,
    });
  }, [vehicleType, vehicleModel, selectedServices, wantsAdvice, pickup, date, note]);

  const confirmed = sent && sent.message === message ? sent : null;
  const total = selectedServices.length;

  const onSubmit = (e) => {
    e.preventDefault();
    const url = whatsappUrl(message);
    // Programmatisch geklickter Link innerhalb der Nutzer-Geste: zuverlässig auf iOS/Android, kein Popup-Blocker.
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setSent({ message, url });
    setCopyState('idle');
  };

  const onCopy = async () => {
    const ok = await copyText(message);
    setCopyState(ok ? 'ok' : 'fail');
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopyState('idle'), 4000);
  };

  // Enter im Textfeld soll nicht versehentlich WhatsApp öffnen.
  const noEnterSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const liveText = confirmed
    ? copyState === 'ok'
      ? 'Nachricht kopiert.'
      : copyState === 'fail'
        ? 'Kopieren nicht möglich. Öffne die Vorschau und kopiere den Text von dort.'
        : 'WhatsApp wird geöffnet. Öffnet sich nichts, nutze den Link darunter.'
    : '';

  return (
    <form className="booking-form" id="anfrage-formular" ref={formRef} onSubmit={onSubmit} aria-label="Terminanfrage">
      {/* 01 — FAHRZEUG */}
      <fieldset className="bf-block">
        <legend className="bf-legend">
          <span className="bf-no" aria-hidden="true">01</span>
          <span className="bf-title">Fahrzeug</span>{' '}
        </legend>
        <div className="bf-fields bf-fields-2">
          <div className="bf-field">
            <label className="bf-label" htmlFor="bf-type">
              Fahrzeugtyp
            </label>
            <div className="bf-select">
              <select id="bf-type" className="bf-input" name="vehicleType" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                {VEHICLE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <Icon name="chevron-down" size={18} />
            </div>
          </div>
          <div className="bf-field">
            <label className="bf-label" htmlFor="bf-model">
              Marke &amp; Modell
            </label>
            <input
              id="bf-model"
              className="bf-input"
              type="text"
              name="vehicleModel"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              onKeyDown={noEnterSubmit}
              placeholder="z. B. BMW 3er"
              autoComplete="off"
              autoCapitalize="words"
              enterKeyHint="done"
              maxLength={60}
            />
          </div>
        </div>
      </fieldset>

      {/* 02 — LEISTUNG */}
      <fieldset className="bf-block">
        <legend className="bf-legend">
          <span className="bf-no" aria-hidden="true">02</span>
          <span className="bf-title">Gewünschte Leistung</span>{' '}
          <span className="bf-hint-inline">Mehrfachauswahl</span>
        </legend>
        <div className="bf-fields">
          <div className="bf-summary-wrap">
            <p className={`bf-summary${total > 0 || wantsAdvice ? ' has-items' : ''}`} aria-live="polite" aria-atomic="true">
              {total === 0 && !wantsAdvice ? 'Noch nichts gewählt' : null}
              {total > 0 ? `${total} ${total === 1 ? 'Leistung' : 'Leistungen'} gewählt` : null}
              {total === 0 && wantsAdvice ? 'Beratung gewünscht' : null}
              {total > 0 && wantsAdvice ? ' · Beratung gewünscht' : null}
            </p>
            {total > 0 ? <p className="bf-summary-list">{selectedServices.map((s) => s.name).join(' · ')}</p> : null}
          </div>

          <div className="bf-groups">
            {SERVICE_GROUPS.map((g) => {
              const isOpen = !!open[g.id];
              const count = g.items.filter((i) => selected.includes(i.slug)).length;
              return (
                <div className={`bf-group${isOpen ? ' is-open' : ''}`} key={g.id}>
                  <h3 className="bf-group-head">
                    <button
                      type="button"
                      className="bf-group-toggle"
                      id={`bf-toggle-${g.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`bf-panel-${g.id}`}
                      onClick={() => toggleGroup(g.id)}
                    >
                      <span className="bf-group-name">{g.label}</span>{' '}
                      <span className="bf-group-meta">
                        {count > 0 ? <span className="bf-group-count">{count} gewählt</span> : <span className="bf-group-total">{g.items.length}</span>}
                        <Icon name="chevron-down" size={18} className="bf-group-chevron" />
                      </span>
                    </button>
                  </h3>
                  <div className="bf-group-panel" id={`bf-panel-${g.id}`} role="group" aria-labelledby={`bf-toggle-${g.id}`} hidden={!isOpen}>
                    <ul className="bf-chips">
                      {g.items.map((item) => (
                        <ServiceChip key={item.slug} item={item} checked={selected.includes(item.slug)} onToggle={toggleService} />
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <label className={`bf-chip bf-chip-advice${wantsAdvice ? ' is-on' : ''}`}>
            <input type="checkbox" name="wantsAdvice" checked={wantsAdvice} onChange={(e) => setWantsAdvice(e.target.checked)} />
            <span className="bf-box" aria-hidden="true">
              <Icon name="check" size={14} strokeWidth={3} />
            </span>
            <span className="bf-chip-text">
              <span className="bf-chip-name">Ich bin unsicher – bitte beraten</span>{' '}
              <span className="bf-chip-price">Wir klären Leistung und Umfang gemeinsam mit dir.</span>
            </span>
          </label>
        </div>
      </fieldset>

      {/* 03 — ABHOLSERVICE */}
      <fieldset className="bf-block">
        <legend className="bf-legend">
          <span className="bf-no" aria-hidden="true">03</span>
          <span className="bf-title">Abhol- &amp; Bringservice</span>{' '}
        </legend>
        <div className="bf-fields">
          <div className="bf-pickup">
            {[
              { value: 'no', icon: 'car', label: PICKUP_OPTIONS.no },
              { value: 'yes', icon: 'swap', label: PICKUP_OPTIONS.yes },
            ].map((opt) => (
              <label className={`bf-card${pickup === opt.value ? ' is-on' : ''}`} key={opt.value}>
                <input type="radio" name="pickup" value={opt.value} checked={pickup === opt.value} onChange={() => setPickup(opt.value)} />
                <span className="bf-card-icon" aria-hidden="true">
                  <Icon name={opt.icon} size={22} />
                </span>
                <span className="bf-card-text">{opt.label}</span>
                <span className="bf-radio" aria-hidden="true" />
              </label>
            ))}
          </div>
          <p className="bf-help">{PICKUP_NOTE}.</p>
          <Link href="/abholservice" className="bf-link">
            Mehr zum Abhol- &amp; Bringservice <Icon name="arrow-right" size={15} />
          </Link>
        </div>
      </fieldset>

      {/* 04 — TERMIN & NACHRICHT */}
      <fieldset className="bf-block">
        <legend className="bf-legend">
          <span className="bf-no" aria-hidden="true">04</span>
          <span className="bf-title">Wunschtermin &amp; Nachricht</span>{' '}
        </legend>
        <div className="bf-fields">
          <div className="bf-fields bf-fields-2 bf-fields-date">
            <div className="bf-field">
              <label className="bf-label" htmlFor="bf-date">
                Wunschdatum <small>optional</small>
              </label>
              <input
                id="bf-date"
                className="bf-input bf-date"
                type="date"
                name="date"
                value={date}
                min={minDate || undefined}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <p className="bf-help bf-help-date">Ein Wunschtermin genügt – den genauen Termin und Umfang bestätigen wir gemeinsam.</p>
          </div>
          <div className="bf-field">
            <label className="bf-label" htmlFor="bf-note">
              Nachricht <small>optional</small>
            </label>
            <textarea
              id="bf-note"
              className="bf-input bf-textarea"
              name="note"
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="z. B. starke Verschmutzung, Tierhaare, Abholung in Hamm-Heessen …"
              maxLength={1000}
            />
          </div>
        </div>
      </fieldset>

      <div className="bf-actions">
        <details className="bf-preview">
          <summary>
            <span>Nachricht ansehen</span>
            <Icon name="chevron-down" size={18} className="bf-preview-chevron" />
          </summary>
          <pre className="bf-preview-text" aria-label="Vorschau der WhatsApp-Nachricht">
            {message}
          </pre>
        </details>

        <button type="submit" className="form-submit">
          <Icon name="whatsapp" size={22} />
          <span>Anfrage über WhatsApp senden</span>
          <Icon name="arrow-up-right" size={20} />
        </button>

        <p className="form-note">Basis-/Ab-Preise laut Leistungskatalog · Mehraufwand &amp; Abholservice nach Absprache · Antwort direkt über WhatsApp</p>

        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {liveText}
        </div>

        {confirmed ? (
          <div className="bf-confirm">
            <p className="bf-confirm-title">
              <Icon name="whatsapp" size={20} /> WhatsApp wird geöffnet …
            </p>
            <p className="bf-confirm-text">Sende die vorbereitete Nachricht dort ab – wir melden uns direkt auf WhatsApp bei dir.</p>
            <div className="bf-confirm-actions">
              <a className="bf-confirm-link" href={confirmed.url} target="_blank" rel="noopener noreferrer">
                Öffnet sich nichts? Hier tippen <Icon name="arrow-up-right" size={16} />
              </a>
              <button type="button" className="bf-copy" onClick={onCopy}>
                <Icon name={copyState === 'ok' ? 'check' : 'copy'} size={18} />
                {copyState === 'ok' ? 'Kopiert' : 'Nachricht kopieren'}
              </button>
            </div>
            {copyState === 'fail' ? <p className="bf-confirm-fail">Kopieren war nicht möglich – öffne oben „Nachricht ansehen“ und kopiere den Text von dort.</p> : null}
          </div>
        ) : null}
      </div>
    </form>
  );
}
