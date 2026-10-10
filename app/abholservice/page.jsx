import Link from 'next/link';
import PageHero from '@/components/PageHero';
import RouteVisual from '@/components/RouteVisual';
import CtaBand from '@/components/CtaBand';
import PagePager from '@/components/PagePager';
import Icon from '@/components/Icon';
import { PICKUP_NOTE } from '@/data/site';
import { genericWhatsappUrl } from '@/lib/whatsapp';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Abhol- & Bringservice',
  description:
    'Optionaler Abhol- & Bringservice von Fresh Car Hamm: Nach Absprache holen wir dein Fahrzeug ab und bringen es nach der Aufbereitung wieder zurück – gegen Aufpreis, abhängig von Entfernung und Aufwand.',
  path: '/abholservice',
});

const STEPS = [
  { no: '01', icon: 'car', title: 'ABHOLUNG', text: 'Wir holen dein Fahrzeug nach Absprache ab.' },
  { no: '02', icon: 'spark', title: 'AUFBEREITUNG', text: 'Deine gebuchten Leistungen werden durchgeführt.' },
  { no: '03', icon: 'map-pin', title: 'RÜCKGABE', text: 'Dein frisch aufbereitetes Fahrzeug kommt zurück.' },
];

// Nur Aussagen, die sich aus den bekannten Fakten ergeben (optional, gegen Aufpreis, Verfügbarkeit nach Absprache).
const FAQ = [
  {
    q: 'Kostet der Service extra?',
    a: 'Ja. Der Abhol- & Bringservice ist optional und wird gegen Aufpreis angeboten – der Aufpreis hängt von Entfernung und Aufwand ab. Einen festen Preis nennen wir hier bewusst nicht. Die Details klärst du direkt per WhatsApp.',
  },
  {
    q: 'Ist der Service immer möglich?',
    a: 'Die Verfügbarkeit klären wir nach Absprache. Schreib uns kurz, was du vorhast – wir melden uns, ob es passt.',
  },
  {
    q: 'Wie frage ich ihn an?',
    a: 'Am einfachsten über den Button „Abholservice anfragen“: Im Terminformular ist „Abhol- & Bringservice“ dann schon auf „Ja“ gestellt, und deine Anfrage öffnet sich als vorbereitete WhatsApp-Nachricht. Alternativ schreibst du uns direkt auf WhatsApp.',
  },
  {
    q: 'Was wird aufbereitet?',
    a: 'Die Leistungen, die du gebucht und mit uns vereinbart hast – zum Beispiel Pakete, Polituren oder Extras. Was es alles gibt, findest du auf der Leistungsseite.',
    link: { href: '/leistungen', label: 'Alle Leistungen & Preise' },
  },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function AbholservicePage() {
  return (
    <>
      <PageHero
        crumb="Abhol- & Bringservice"
        path="/abholservice"
        mark="03"
        title="DEIN AUTO."
        accent="UNSER WEG."
        aside={<RouteVisual />}
        actions={
          <>
            <Link className="btn btn-primary" href="/termin?pickup=true">
              Abholservice anfragen <Icon name="arrow-up-right" size={18} />
            </Link>
            <a className="btn btn-ghost" href={genericWhatsappUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={20} /> Direkt per WhatsApp
            </a>
          </>
        }
      >
        <p>Nach Absprache holen wir dein Fahrzeug ab und bringen es nach der Aufbereitung wieder zurück.</p>
        <span className="pk-tag">OPTIONAL · GEGEN AUFPREIS</span>
      </PageHero>

      {/* SO FUNKTIONIERT'S */}
      <section className="section pk-steps" aria-labelledby="pk-steps-title">
        <div className="section-head compact" data-reveal>
          <div>
            <div className="eyebrow">
              <span aria-hidden="true" /> SO FUNKTIONIERT&apos;S
            </div>
            <h2 id="pk-steps-title">
              DREI SCHRITTE.{' '}
              <em>KEIN STRESS.</em>
            </h2>
          </div>
          <p>Du entscheidest, ob du dein Fahrzeug selbst bringst oder den Abhol- &amp; Bringservice dazu anfragst. Wir stimmen alles vorher mit dir ab.</p>
        </div>

        <ol className="pk-steps-list">
          {STEPS.map((s, i) => (
            <li key={s.no} data-reveal style={{ '--delay': `${i * 70}ms` }}>
              <span className="pk-step-no" aria-hidden="true">
                {s.no}
              </span>
              <span className="service-icon">
                <Icon name={s.icon} size={24} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="pk-note" data-reveal>
          <span className="pk-note-badge">HINWEIS</span>
          <div>
            <strong>{PICKUP_NOTE}</strong>
            <p>Einen festen Preis nennen wir bewusst nicht. Die Details klärst du direkt mit uns per WhatsApp.</p>
          </div>
          <a className="btn btn-ghost" href={genericWhatsappUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={20} /> Details klären
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pk-faq" aria-labelledby="pk-faq-title">
        <div className="section-head compact" data-reveal>
          <div>
            <div className="eyebrow">
              <span aria-hidden="true" /> GUT ZU WISSEN
            </div>
            <h2 id="pk-faq-title">
              HÄUFIGE FRAGEN.{' '}
              <em>KURZ &amp; KLAR.</em>
            </h2>
          </div>
          <p>Mehr zum Abhol- &amp; Bringservice – ehrlich und ohne Kleingedrucktes.</p>
        </div>

        <div className="pk-faq-list" data-reveal>
          {FAQ.map((f, i) => (
            <details className="pk-faq-item" key={f.q}>
              <summary>
                <span className="pk-faq-no" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="pk-faq-q">{f.q}</span>
                <span className="pk-faq-toggle" aria-hidden="true">
                  <Icon name="chevron-down" size={18} />
                </span>
              </summary>
              <div className="pk-faq-a">
                <p>{f.a}</p>
                {f.link ? (
                  <Link className="pk-faq-link" href={f.link.href}>
                    {f.link.label} <Icon name="arrow-right" size={16} />
                  </Link>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Abholservice"
        title="Wir holen"
        accent="dein Auto."
        text="Schick uns deine Anfrage – im Terminformular ist der Abhol- & Bringservice schon vorausgewählt. Die WhatsApp-Nachricht wird automatisch für dich vorbereitet."
        primary={{ href: '/termin?pickup=true', label: 'Abholservice anfragen' }}
      />
      <PagePager href="/abholservice" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
