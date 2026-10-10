import Image from 'next/image';
import CarLine from './CarLine';

// Beschriftungen der Platzhalter-Kacheln (solange noch keine echten Fotos in public/media/ liegen).
export const PLACEHOLDERS = [
  ['GLOSS', 'Lackfinish'],
  ['DETAIL', 'Innenraum'],
  ['SHINE', 'Politur'],
  ['CLEAN', 'Außenpflege'],
  ['PROTECT', 'Versiegelung'],
  ['FRESH', 'Komplettpaket'],
];

// Medienfläche einer Galerie-Kachel: echtes Foto (next/image, responsive) ODER hochwertiger Platzhalter.
// Der Platzhalter ist eine abstrakte Linien-Illustration — kein (Fake-)Kundenfahrzeug.
export default function GalleryMedia({ photo, index, sizes, priority = false }) {
  const [word] = PLACEHOLDERS[index % PLACEHOLDERS.length];
  const no = String(index + 1).padStart(2, '0');
  return (
    <div className={`gallery-placeholder${photo ? ' has-photo' : ''}`}>
      {photo ? (
        <Image
          src={photo.src}
          alt={`Fahrzeugaufbereitung bei Fresh Car Hamm – Foto ${no}`}
          fill
          sizes={sizes}
          priority={priority}
          className="gallery-photo"
        />
      ) : (
        <>
          <div className="photo-shine" />
          <CarLine />
          <div className="gallery-word" aria-hidden="true">
            {word}
          </div>
          <span className="gallery-soon">Foto folgt</span>
        </>
      )}
    </div>
  );
}

export function galleryCaption(photo, index) {
  const no = String(index + 1).padStart(2, '0');
  return photo ? `Foto ${no}` : PLACEHOLDERS[index % PLACEHOLDERS.length][1];
}
