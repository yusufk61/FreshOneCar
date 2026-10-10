'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Dünne rote Leseanzeige oben. Kein React-State pro Scroll-Event: ein einziger passiver Listener, rAF-gedrosselt,
// nur ein transform (läuft auf dem Compositor).
export default function ScrollProgress() {
  const ref = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
