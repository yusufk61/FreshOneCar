import PageHero from '@/components/PageHero';
import LegalPage from '@/components/LegalPage';
import LegalSection from '@/components/LegalSection';
import LegalPlaceholder from '@/components/LegalPlaceholder';
import { SITE, LINKS } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Impressum',
  description: `Impressum von ${SITE.name} in Hamm: Angaben zum Anbieter und Kontakt.`,
  path: '/impressum',
});

// Bewusst ein Platzhalter: Inhaber, E-Mail, Rechtsform, Register- und Steuerdaten liefert der Betreiber.
// Bekannt (aus data/site.js): Name, Anschrift, Telefon/WhatsApp, Instagram.
const SECTIONS = [
  { id: 'anbieter', title: 'Angaben gemäß § 5 DDG' },
  { id: 'kontakt', title: 'Kontakt' },
  { id: 'register', title: 'Registereintrag' },
  { id: 'umsatzsteuer', title: 'Umsatzsteuer-ID' },
  { id: 'inhalt', title: 'Verantwortlich für den Inhalt' },
  { id: 'streitbeilegung', title: 'Streitbeilegung' },
].map((s, i) => ({ ...s, no: String(i + 1).padStart(2, '0') }));

const sec = (id) => SECTIONS.find((s) => s.id === id);

export default function ImpressumPage() {
  return (
    <LegalPage
      current="/impressum"
      hero={
        <PageHero crumb="Impressum" path="/impressum" mark="§" title="IMPRESSUM.">
          <p>Angaben zum Anbieter dieser Website. Offene Punkte sind rot markiert – der Betreiber ergänzt sie vor der Veröffentlichung.</p>
        </PageHero>
      }
    >
      <LegalSection {...sec('anbieter')}>
        <dl className="legal-dl">
          <div>
            <dt>Anbieter</dt>
            <dd>{SITE.name}</dd>
          </div>
          <div>
            <dt>Inhaber / Vertretungsberechtigte</dt>
            <dd>
              <LegalPlaceholder>Vor- und Nachname</LegalPlaceholder>
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
            <dt>Rechtsform</dt>
            <dd>
              <LegalPlaceholder>Rechtsform des Unternehmens</LegalPlaceholder>
            </dd>
          </div>
        </dl>
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
            <dt>E-Mail</dt>
            <dd>
              <LegalPlaceholder>E-Mail-Adresse</LegalPlaceholder>
            </dd>
          </div>
          <div>
            <dt>Instagram</dt>
            <dd>
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
                {SITE.instagram.handle}
              </a>
            </dd>
          </div>
        </dl>
      </LegalSection>

      <LegalSection {...sec('register')}>
        <p>Registergericht und Registernummer:</p>
        <p>
          <LegalPlaceholder>nur falls ein Registereintrag besteht – sonst diesen Abschnitt entfernen</LegalPlaceholder>
        </p>
      </LegalSection>

      <LegalSection {...sec('umsatzsteuer')}>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:</p>
        <p>
          <LegalPlaceholder>USt-IdNr., nur falls vorhanden – sonst diesen Abschnitt entfernen</LegalPlaceholder>
        </p>
      </LegalSection>

      <LegalSection {...sec('inhalt')}>
        <p>Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV:</p>
        <p>
          <LegalPlaceholder>Name und Anschrift der verantwortlichen Person</LegalPlaceholder>
        </p>
      </LegalSection>

      <LegalSection {...sec('streitbeilegung')}>
        <p>Angaben zur Verbraucherschlichtung:</p>
        <p>
          <LegalPlaceholder>Hinweis zur Streitbeilegung – rechtlich prüfen lassen</LegalPlaceholder>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
