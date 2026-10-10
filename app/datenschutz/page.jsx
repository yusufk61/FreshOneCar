import PageHero from '@/components/PageHero';
import LegalPage from '@/components/LegalPage';
import LegalSection from '@/components/LegalSection';
import LegalToc from '@/components/LegalToc';
import LegalPlaceholder from '@/components/LegalPlaceholder';
import { SITE, LINKS } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Datenschutz',
  description: `Datenschutzhinweise von ${SITE.name}: Hosting, Terminanfrage über WhatsApp, externe Links und Cookies.`,
  path: '/datenschutz',
});

// Bewusst ein Platzhalter. FAKTEN (Stand der Entwicklung): Hosting über Vercel; Terminformular sendet nichts an einen
// eigenen Server (es öffnet nur WhatsApp mit vorbereiteter Nachricht); externe Anbieter werden nur verlinkt;
// keine Cookies, keine Analyse-/Tracking-Dienste. Alles Weitere ist ein markierter Platzhalter.
const SECTIONS = [
  { id: 'verantwortlicher', title: 'Verantwortlicher' },
  { id: 'hosting', title: 'Hosting & Server-Logfiles' },
  { id: 'whatsapp', title: 'Terminanfrage über WhatsApp' },
  { id: 'externe-links', title: 'Externe Links' },
  { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'rechte', title: 'Deine Rechte' },
  { id: 'kontakt', title: 'Kontakt zum Datenschutz' },
].map((s, i) => ({ ...s, no: String(i + 1).padStart(2, '0') }));

const sec = (id) => SECTIONS.find((s) => s.id === id);

export default function DatenschutzPage() {
  return (
    <LegalPage
      current="/datenschutz"
      aside={<LegalToc items={SECTIONS} />}
      hero={
        <PageHero crumb="Datenschutz" path="/datenschutz" mark="§" title="DATENSCHUTZ.">
          <p>
            So geht diese Website mit Daten um. Das Terminformular sendet nichts an einen eigenen Server – erst in WhatsApp wird eine
            Nachricht abgeschickt. Offene Punkte sind rot markiert.
          </p>
        </PageHero>
      }
    >
      <LegalSection {...sec('verantwortlicher')}>
        <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
        <dl className="legal-dl">
          <div>
            <dt>Name / Firma</dt>
            <dd>{SITE.name}</dd>
          </div>
          <div>
            <dt>Vertreten durch</dt>
            <dd>
              <LegalPlaceholder>Inhaber bzw. vertretungsberechtigte Person</LegalPlaceholder>
            </dd>
          </div>
          <div>
            <dt>Anschrift</dt>
            <dd>
              {SITE.address.street}
              <br />
              {SITE.address.postalCode} {SITE.address.city}
            </dd>
          </div>
          <div>
            <dt>Telefon / WhatsApp</dt>
            <dd>
              <a href={LINKS.tel}>{SITE.phone.display}</a>
            </dd>
          </div>
          <div>
            <dt>E-Mail</dt>
            <dd>
              <LegalPlaceholder>E-Mail-Adresse</LegalPlaceholder>
            </dd>
          </div>
        </dl>
      </LegalSection>

      <LegalSection {...sec('hosting')}>
        <p>
          Diese Website wird über den Hosting-Dienst Vercel ausgeliefert. Beim Aufruf der Seiten können dabei technisch notwendige
          Verbindungsdaten in Server-Logfiles verarbeitet werden, zum Beispiel:
        </p>
        <ul className="legal-list">
          <li>IP-Adresse</li>
          <li>Zeitpunkt des Abrufs</li>
          <li>abgerufene Seite</li>
        </ul>
        <p>
          <LegalPlaceholder>
            Angaben zum Hosting-Anbieter, Rechtsgrundlage, Speicherdauer und Drittlandübermittlung ergänzen bzw. prüfen
          </LegalPlaceholder>
        </p>
      </LegalSection>

      <LegalSection {...sec('whatsapp')}>
        <p>
          Das Terminformular sendet keine Daten an einen eigenen Server. Beim Absenden öffnet sich WhatsApp mit einer vorbereiteten
          Nachricht. Sie enthält nur Angaben, die du im Formular gemacht hast – du kannst sie in WhatsApp prüfen und ändern.
        </p>
        <p>
          Erst wenn du die Nachricht in WhatsApp abschickst, werden die darin enthaltenen Angaben an {SITE.name} und an den
          Messenger-Anbieter übermittelt.
        </p>
        <p>
          <LegalPlaceholder>
            Hinweise zu WhatsApp / Meta (Anbieter, Rechtsgrundlage, Drittlandübermittlung, Verweis auf die Datenschutzhinweise von
            WhatsApp) – rechtlich prüfen
          </LegalPlaceholder>
        </p>
      </LegalSection>

      <LegalSection {...sec('externe-links')}>
        <p>Auf dieser Website sind Links zu externen Anbietern gesetzt:</p>
        <ul className="legal-list">
          <li>Google Maps und Apple Karten (Anfahrt)</li>
          <li>Google-Bewertungen</li>
          <li>Instagram</li>
        </ul>
        <p>
          Es werden keine Karten, Skripte oder Schriften dieser Anbieter automatisch geladen. Erst mit einem Klick auf den jeweiligen
          Link wird die Seite des Anbieters aufgerufen – ab dann können dort Daten verarbeitet werden.
        </p>
        <p>
          <LegalPlaceholder>Hinweise auf die Datenschutzerklärungen der verlinkten Anbieter ergänzen bzw. prüfen</LegalPlaceholder>
        </p>
      </LegalSection>

      <LegalSection {...sec('cookies')}>
        <p>Nach aktuellem Stand setzt diese Website keine Cookies und keine Analyse- oder Tracking-Dienste ein.</p>
        <p>
          <LegalPlaceholder>
            Betreiber vor der Veröffentlichung bestätigen – und ergänzen, falls später Cookies oder Analyse-Dienste hinzukommen
          </LegalPlaceholder>
        </p>
      </LegalSection>

      <LegalSection {...sec('rechte')}>
        <p>
          <LegalPlaceholder>
            Hinweise zu den Betroffenenrechten (Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit, Widerspruch, Beschwerde bei einer Aufsichtsbehörde) – rechtlich prüfen lassen
          </LegalPlaceholder>
        </p>
      </LegalSection>

      <LegalSection {...sec('kontakt')}>
        <dl className="legal-dl">
          <div>
            <dt>Telefon / WhatsApp</dt>
            <dd>
              <a href={LINKS.tel}>{SITE.phone.display}</a>
            </dd>
          </div>
          <div>
            <dt>Anschrift</dt>
            <dd>
              {SITE.name}, {SITE.address.oneLine}
            </dd>
          </div>
        </dl>
        <p>
          <LegalPlaceholder>
            Kontakt für Datenschutzanfragen (E-Mail / Anschrift) und ggf. Datenschutzbeauftragte(r)
          </LegalPlaceholder>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
