import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Showreel from '@/components/Showreel';
import GalleryGrid from '@/components/GalleryGrid';
import BeforeAfter from '@/components/BeforeAfter';
import CtaBand from '@/components/CtaBand';
import PagePager from '@/components/PagePager';
import Icon from '@/components/Icon';
import { LINKS, SITE } from '@/data/site';
import { getMedia } from '@/lib/media';
import { pageMetadata, siteUrl, jsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Galerie',
  description:
    'Showreel, Fotogalerie und Vorher-Nachher-Vergleich: So arbeitet Fresh Car Hamm bei der Fahrzeugaufbereitung in Hamm.',
  path: '/galerie',
});

// Lead je nach Medienlage – ehrlich: nichts versprechen, was (noch) nicht da ist.
function leadText({ video, photos, compare }) {
  const parts = [];
  if (video) parts.push('Showreel');
  if (photos) parts.push('Fotos');
  if (compare) parts.push('Vorher-Nachher-Vergleich');
  if (parts.length === 0) {
    return 'Hier entsteht unsere Galerie: Fotos, Showreel und Vorher-Nachher-Vergleich von Fresh Car Hamm folgen in Kürze.';
  }
  const list = parts.length > 1 ? `${parts.slice(0, -1).join(', ')} und ${parts[parts.length - 1]}` : parts[0];
  return `Ein Einblick in unsere Arbeit – mit ${list}.`;
}

export default function GaleriePage() {
  const media = getMedia();
  const hasPhotos = media.gallery.length > 0;
  const hasVideo = Boolean(media.showreel);
  const hasCompare = Boolean(media.before && media.after);

  const base = siteUrl();
  const galleryLd =
    base && hasPhotos
      ? {
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: `Galerie – ${SITE.name}`,
          url: `${base}/galerie`,
          hasPart: media.gallery.map((p) => ({ '@type': 'ImageObject', contentUrl: `${base}${p.src}` })),
        }
      : null;

  return (
    <>
      <PageHero
        crumb="Galerie"
        path="/galerie"
        mark="04"
        title="ECHTE AUTOS."
        accent="ECHTE ERGEBNISSE."
        actions={
          <>
            <Link className="btn btn-primary" href="/termin">
              Termin anfragen <Icon name="arrow-up-right" size={18} />
            </Link>
            <a className="btn btn-ghost" href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
              Mehr auf Instagram <Icon name="instagram" size={18} />
            </a>
          </>
        }
      >
        <p>{leadText({ video: hasVideo, photos: hasPhotos, compare: hasCompare })}</p>
      </PageHero>

      <Showreel src={media.showreel} poster={media.showreelPoster} />

      <section className="section gallery" id="galerie" aria-labelledby="gallery-title">
        <div className="section-head compact" data-reveal>
          <div>
            <div className="eyebrow">
              <span aria-hidden="true" /> WORK / GALERIE
            </div>
            <h2 id="gallery-title">
              FRISCH
              <em>AUFBEREITET.</em>
            </h2>
          </div>
          <p>
            {hasPhotos
              ? media.gallery.length > 1
                ? 'Wähle ein Foto für die Großansicht – mit Pfeiltasten oder Wischen blätterst du durch.'
                : 'Wähle das Foto für die Großansicht.'
              : 'Hier entsteht unsere Galerie – freu dich auf Glanz, Detail und Finish.'}
          </p>
        </div>
        <GalleryGrid photos={media.gallery} />
      </section>

      <section className="section compare-section" id="vorher-nachher" aria-labelledby="compare-title">
        <div className="compare-copy" data-reveal>
          <div className="eyebrow">
            <span aria-hidden="true" /> BEFORE / AFTER
          </div>
          <h2 id="compare-title">
            DER UNTERSCHIED
            <em>MUSS SICHTBAR SEIN.</em>
          </h2>
          <p>
            {hasCompare
              ? 'Schiebe den Regler und sieh selbst, was eine Aufbereitung bewirkt: links vorher, rechts nachher.'
              : 'Schiebe den Regler und sieh, was eine Aufbereitung bewirkt. Die ersten echten Vorher-Nachher-Fotos folgen in Kürze.'}
          </p>
        </div>
        <BeforeAfter before={media.before} after={media.after} />
      </section>

      <CtaBand
        eyebrow="Termin anfragen"
        title="Dein Auto"
        accent="als Nächstes?"
        text="Schick uns deine Anfrage – die WhatsApp-Nachricht wird automatisch für dich vorbereitet, wir melden uns direkt bei dir."
      />
      <PagePager href="/galerie" />
      {galleryLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(galleryLd) }} /> : null}
    </>
  );
}
