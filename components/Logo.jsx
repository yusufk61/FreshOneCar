import Image from 'next/image';

// Hochwertiges Fresh-Car-Hamm-Logo (public/brand/fresh-car-hamm-logo.png, 1000×533, transparent).
// next/image liefert je nach Display-Dichte eine passend skalierte AVIF/WebP-Variante → scharf und leicht.
// Die angezeigte Breite steuert das CSS des Elternelements (.brand img, .footer-brand img, …); `width` hier
// ist nur der Hinweis für die Bildgrößen-Auswahl (sizes).
export default function Logo({ width = 154, priority = false, alt = '', className }) {
  return (
    <Image
      src="/brand/fresh-car-hamm-logo.png"
      alt={alt}
      width={1000}
      height={533}
      sizes={`${width}px`}
      quality={90}
      priority={priority}
      className={className}
    />
  );
}
