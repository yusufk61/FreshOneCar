import { Suspense } from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import PagePager from '@/components/PagePager';
import Icon from '@/components/Icon';
import BookingForm from '@/components/BookingForm';
import BookingSkeleton from '@/components/BookingSkeleton';
import { SITE, LINKS } from '@/data/site';
import { genericWhatsappUrl } from '@/lib/whatsapp';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Termin anfragen',
  description:
    'Termin bei Fresh Car Hamm anfragen: Leistungen auswählen, Wunschtermin angeben und die vorbereitete Anfrage direkt per WhatsApp senden – optional mit Abhol- & Bringservice.',
  path: '/termin',
});

const STEPS = [
  { no: '01', title: 'ANFRAGEN', text: 'Leistung auswählen und WhatsApp-Anfrage senden.' },
  { no: '02', title: 'FOTOS', text: 'Wenn nötig, ein paar Bilder vom Fahrzeug mitschicken.' },
  { no: '03', title: 'TERMIN', text: 'Passenden Termin und Umfang gemeinsam bestätigen.' },
  { no: '04', title: 'FRESH', text: 'Selbst abholen – oder unseren Abhol- & Bringservice gegen Aufpreis nutzen.' },
];

const external = { target: '_blank', rel: 'noopener noreferrer' };

export default function TerminPage() {
  return (
    <>
      <PageHero
        crumb="Termin anfragen"
        path="/termin"
        mark="07"
        title="DEIN AUTO."
        accent="DEIN TERMIN."
        actions={
          <>
            <a className="btn btn-primary" href="#anfrage">
              Zum Formular <Icon name="chevron-down" size={18} />
            </a>
            <a className="btn btn-ghost" href={genericWhatsappUrl} {...external}>
              <Icon name="whatsapp" size={20} /> Direkt auf WhatsApp
            </a>
          </>
        }
        meta={
          <>
            <div>
              <strong>01</strong>
              <span>
                Direkt per
                <br />
                WhatsApp
              </span>
            </div>
            <div>
              <strong>02</strong>
              <span>
                Umfang vorab
                <br />
                abgestimmt
              </span>
            </div>
            <div>
              <strong>03</strong>
              <span>
                Abholung
                <br />
                optional
              </span>
            </div>
          </>
        }
      >
        <p>Formular ausfüllen, auf WhatsApp senden – die Nachricht wird automatisch für dich vorbereitet.</p>
      </PageHero>

      {/* TERMIN-BLOCK — roter Look wie bisher: links Info, rechts schwarze Formular-Karte */}
      <section className="booking-wrap" id="anfrage" aria-labelledby="booking-title">
        <div className="booking-noise" aria-hidden="true" />

        <div className="booking-copy" data-reveal>
          <div className="eyebrow light">
            <span aria-hidden="true" /> TERMIN ANFRAGEN
          </div>
          <h2 id="booking-title">
            BEREIT FÜR
            <em>FRESH?</em>
          </h2>
          <p>Formular ausfüllen, auf WhatsApp senden und fertig. Die Nachricht wird automatisch für dich vorbereitet.</p>
        </div>

        <div className="booking-main">
          <Suspense fallback={<BookingSkeleton />}>
            <BookingForm />
          </Suspense>
          <noscript>
            <style>{'.bf-skeleton{display:none!important}'}</style>
            <div className="booking-form bf-noscript">
              <p>Für das Formular wird JavaScript benötigt. Schreib uns einfach direkt auf WhatsApp – wir antworten dir dort.</p>
              <a className="form-submit" href={genericWhatsappUrl} {...external}>
                <Icon name="whatsapp" size={22} />
                <span>Direkt auf WhatsApp schreiben</span>
                <Icon name="arrow-up-right" size={20} />
              </a>
            </div>
          </noscript>
        </div>

        <aside className="booking-aside" aria-label="Kontakt" data-reveal>
          <dl className="booking-contact">
            <dt>WhatsApp</dt>
            <dd>
              <a href={genericWhatsappUrl} {...external}>
                {SITE.phone.display} <Icon name="arrow-up-right" size={14} />
                <span className="sr-only"> (öffnet WhatsApp in neuem Tab)</span>
              </a>
            </dd>
            <dt>Adresse</dt>
            <dd>
              <a href={LINKS.googleDirections} {...external}>
                {SITE.address.oneLine} <Icon name="arrow-up-right" size={14} />
                <span className="sr-only"> (öffnet Route in neuem Tab)</span>
              </a>
            </dd>
            <dt>Instagram</dt>
            <dd>
              <a href={LINKS.instagram} {...external}>
                {SITE.instagram.handle} <Icon name="arrow-up-right" size={14} />
                <span className="sr-only"> (öffnet Instagram in neuem Tab)</span>
              </a>
            </dd>
            <dt>Google</dt>
            <dd>
              <a href={LINKS.googleMaps} {...external}>
                {SITE.google.ratingLabel} / 5 · {SITE.google.reviewCount} Rezensionen <Icon name="arrow-up-right" size={14} />
                <span className="sr-only"> (öffnet Google Maps in neuem Tab)</span>
              </a>
            </dd>
          </dl>

          <p className="booking-note">
            <Icon name="shield" size={18} />
            <span>
              Deine Eingaben werden nicht auf dieser Website gespeichert – du sendest die Nachricht selbst in WhatsApp ab.
              <Link href="/datenschutz">Datenschutz lesen</Link>
            </span>
          </p>
          <Link className="booking-more" href="/leistungen">
            Alle Leistungen &amp; Preise ansehen <Icon name="arrow-right" size={16} />
          </Link>
        </aside>
      </section>

      {/* SO LÄUFT'S */}
      <section className="section process" id="ablauf" aria-labelledby="process-title">
        <div className="section-head" data-reveal>
          <div>
            <div className="eyebrow">
              <span aria-hidden="true" /> SO LÄUFT&apos;S
            </div>
            <h2 id="process-title">
              4 SCHRITTE.
              <br />
              <em>KEIN STRESS.</em>
            </h2>
          </div>
          <p>Kein kompliziertes Buchungssystem. Du schickst die wichtigsten Infos – Fresh Car Hamm meldet sich direkt zurück.</p>
        </div>
        <ol className="process-grid">
          {STEPS.map((s, i) => (
            <li className="process-card" key={s.no} data-reveal style={{ '--delay': `${i * 60}ms` }}>
              <span className="process-no">{s.no}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <i aria-hidden="true">
                <Icon name={i < STEPS.length - 1 ? 'arrow-right' : 'check'} size={22} />
              </i>
            </li>
          ))}
        </ol>
      </section>

      <PagePager href="/termin" />
    </>
  );
}
