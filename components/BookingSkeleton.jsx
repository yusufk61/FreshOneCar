import Icon from './Icon';
import { PACKAGES, SERVICE_GROUPS } from '@/data/services';
import { PICKUP_NOTE } from '@/data/site';
import { PICKUP_OPTIONS } from '@/lib/whatsapp';

// Lade-Zustand des Terminformulars (Server Component). Spiegelt die Struktur von BookingForm 1:1 — statische Texte
// (Überschriften, Labels, Hinweise) sind echter Text, nur Eingaben und Auswahl sind Platzhalter. Dadurch gleiche Höhen,
// kein Layout-Shift beim Hydrieren und ein hochwertiger Ladezustand. Bewusst statisch: keine Dauer-Animation.

const Ph = ({ className = '' }) => <span className={`bf-sk ${className}`} />;

function Legend({ no, title, hint }) {
  return (
    <div className="bf-legend">
      <span className="bf-no">{no}</span>
      <span className="bf-title">{title}</span>
      {hint ? <span className="bf-hint-inline">{hint}</span> : null}
    </div>
  );
}

function ChipPh({ item, advice = false }) {
  return (
    <div className={`bf-chip${advice ? ' bf-chip-advice' : ''}`}>
      <span className="bf-box" aria-hidden="true" />
      <span className="bf-chip-text">
        <span className="bf-chip-name">{item.name}</span> <span className="bf-chip-price">{item.priceLabel}</span>
      </span>
    </div>
  );
}

export default function BookingSkeleton() {
  return (
    <div className="booking-form bf-skeleton" role="status" aria-busy="true">
      <span className="sr-only">Terminformular wird geladen …</span>
      <div className="bf-skeleton-body" aria-hidden="true">
        {/* 01 Fahrzeug */}
        <div className="bf-block">
          <Legend no="01" title="Fahrzeug" />
          <div className="bf-fields bf-fields-2">
            <div className="bf-field">
              <span className="bf-label">Fahrzeugtyp</span>
              <Ph className="bf-sk-input" />
            </div>
            <div className="bf-field">
              <span className="bf-label">Marke &amp; Modell</span>
              <Ph className="bf-sk-input" />
            </div>
          </div>
        </div>

        {/* 02 Leistung */}
        <div className="bf-block">
          <Legend no="02" title="Gewünschte Leistung" hint="Mehrfachauswahl" />
          <div className="bf-fields">
            <div className="bf-summary-wrap">
              <Ph className="bf-sk-summary" />
            </div>
            <div className="bf-groups">
              {SERVICE_GROUPS.map((g, i) => (
                <div className={`bf-group${i === 0 ? ' is-open' : ''}`} key={g.id}>
                  <div className="bf-group-head">
                    <div className="bf-group-toggle">
                      <span className="bf-group-name">{g.label}</span>
                      <span className="bf-group-meta">
                        <span className="bf-group-total">{g.items.length}</span>
                        <Icon name="chevron-down" size={18} className={i === 0 ? 'bf-group-chevron is-flipped' : 'bf-group-chevron'} />
                      </span>
                    </div>
                  </div>
                  {i === 0 ? (
                    <div className="bf-group-panel">
                      <div className="bf-chips">
                        {PACKAGES.map((p) => (
                          <ChipPh item={p} key={p.slug} />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <ChipPh advice item={{ name: 'Ich bin unsicher – bitte beraten', priceLabel: 'Wir klären Leistung und Umfang gemeinsam mit dir.' }} />
          </div>
        </div>

        {/* 03 Abholservice */}
        <div className="bf-block">
          <Legend no="03" title="Abhol- & Bringservice" />
          <div className="bf-fields">
            <div className="bf-pickup">
              {[
                { key: 'no', icon: 'car', label: PICKUP_OPTIONS.no },
                { key: 'yes', icon: 'swap', label: PICKUP_OPTIONS.yes },
              ].map((o) => (
                <div className="bf-card" key={o.key}>
                  <span className="bf-card-icon">
                    <Icon name={o.icon} size={22} />
                  </span>
                  <span className="bf-card-text">{o.label}</span>
                  <span className="bf-radio" />
                </div>
              ))}
            </div>
            <p className="bf-help">{PICKUP_NOTE}.</p>
            <span className="bf-link">Mehr zum Abhol- &amp; Bringservice</span>
          </div>
        </div>

        {/* 04 Termin & Nachricht */}
        <div className="bf-block">
          <Legend no="04" title="Wunschtermin & Nachricht" />
          <div className="bf-fields">
            <div className="bf-fields bf-fields-2 bf-fields-date">
              <div className="bf-field">
                <span className="bf-label">
                  Wunschdatum <small>optional</small>
                </span>
                <Ph className="bf-sk-input" />
              </div>
              <p className="bf-help bf-help-date">Ein Wunschtermin genügt – den genauen Termin und Umfang bestätigen wir gemeinsam.</p>
            </div>
            <div className="bf-field">
              <span className="bf-label">
                Nachricht <small>optional</small>
              </span>
              <Ph className="bf-sk-area" />
            </div>
          </div>
        </div>

        <div className="bf-actions">
          <div className="bf-preview">
            <div className="bf-preview-bar">
              <span>Nachricht ansehen</span>
              <Icon name="chevron-down" size={18} className="bf-preview-chevron" />
            </div>
          </div>
          <Ph className="bf-sk-submit" />
          <p className="form-note">Basis-/Ab-Preise laut Leistungskatalog · Mehraufwand &amp; Abholservice nach Absprache · Antwort direkt über WhatsApp</p>
        </div>
      </div>
    </div>
  );
}
