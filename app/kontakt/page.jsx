import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ContactCards from '@/components/ContactCards';
import ContactLocation from '@/components/ContactLocation';
import CtaBand from '@/components/CtaBand';
import PagePager from '@/components/PagePager';
import Icon from '@/components/Icon';
import { SITE, LINKS } from '@/data/site';
import { genericWhatsappUrl } from '@/lib/whatsapp';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Kontakt & Standort',
  description: `Fresh Car Hamm in Hamm-Heessen: ${SITE.address.oneLine}. Route mit Google Maps oder Apple Karten, WhatsApp, Instagram und Telefon – Termine nach Anfrage über WhatsApp.`,
  path: '/kontakt',
});

export default function KontaktPage() {
  return (
    <>
      <PageHero
        crumb="Kontakt & Standort"
        path="/kontakt"
        mark="06"
        title="DU FINDEST UNS"
        accent="IN HAMM."
        actions={
          <>
            <a className="btn btn-primary" href={genericWhatsappUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={20} /> WhatsApp schreiben
            </a>
            <a className="btn btn-ghost" href={LINKS.googleDirections} target="_blank" rel="noopener noreferrer">
              <Icon name="compass" size={20} /> Route starten
            </a>
          </>
        }
      >
        <p>
          Du findest uns im {SITE.address.street} in {SITE.address.district}. Termine gibt es nach Anfrage über WhatsApp – schreib uns einfach, was du vorhast.
        </p>
      </PageHero>

      <section className="section ct-contact" aria-labelledby="ct-title">
        <div className="section-head compact" data-reveal>
          <div>
            <div className="eyebrow">
              <span aria-hidden="true" /> KONTAKT
            </div>
            <h2 id="ct-title">
              SCHREIB UNS.{' '}
              <em>WIE DU WILLST.</em>
            </h2>
          </div>
          <p>WhatsApp ist der schnellste Weg zu Fresh Car Hamm. Alternativ erreichst du uns über Instagram oder per Anruf.</p>
        </div>

        <ContactCards />

        <div className="section-cta" data-reveal>
          <Link className="btn btn-ghost" href="/termin">
            Zum Terminformular <Icon name="arrow-right" size={18} />
          </Link>
          <span>Termine nach Anfrage über WhatsApp</span>
        </div>
      </section>

      <ContactLocation />

      <CtaBand
        text="Schick uns deine Anfrage – die WhatsApp-Nachricht wird automatisch für dich vorbereitet. Termine gibt es nach Anfrage."
      />
      <PagePager href="/kontakt" />
    </>
  );
}
