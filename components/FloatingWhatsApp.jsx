'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import { genericWhatsappUrl } from '@/lib/whatsapp';

// Schwebender WhatsApp-Button. Er blendet sich aus, sobald ein CTA-Bereich ([data-hide-float]) im Bild ist
// oder das Menü offen ist — so verdeckt er keine Inhalte und doppelt keine Buttons.
export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [covered, setCovered] = useState(false);
  const hiddenHere = pathname === '/termin';

  useEffect(() => {
    if (hiddenHere || !('IntersectionObserver' in window)) return undefined;
    const targets = document.querySelectorAll('[data-hide-float]');
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      setCovered(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => {
      io.disconnect();
      setCovered(false);
    };
  }, [pathname, hiddenHere]);

  if (hiddenHere) return null;

  return (
    <aside aria-label="WhatsApp-Schnellkontakt">
      <a
        className={`floating-whatsapp${covered ? ' is-hidden' : ''}`}
        href={genericWhatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Termin über WhatsApp anfragen"
        data-menu-inert
        tabIndex={covered ? -1 : undefined}
      >
        <Icon name="whatsapp" size={22} />
        <span>Termin</span>
      </a>
    </aside>
  );
}
