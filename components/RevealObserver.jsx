'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Sanftes Einblenden für [data-reveal]-Elemente. Ohne JavaScript (oder bei reduzierter Bewegung) ist alles sofort
// sichtbar; nur Elemente UNTERHALB des sichtbaren Bereichs werden kurz versteckt und beim Scrollen eingeblendet.
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)'));
    if (els.length === 0) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' },
    );

    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.98) {
        el.classList.add('is-visible');
      } else {
        el.classList.add('reveal-pending');
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
