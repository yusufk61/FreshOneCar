import Link from 'next/link';
import Icon from './Icon';
import { LEGAL_ITEMS } from '@/data/navigation';

// Querverweise am Ende einer Rechtsseite: zur jeweils anderen Rechtsseite und zurück zur Startseite.
// Bewusst KEIN PagePager — Rechtsseiten gehören nicht in die Lesereihenfolge.
export default function LegalNav({ current }) {
  const others = LEGAL_ITEMS.filter((item) => item.href !== current);
  return (
    <nav className="legal-links" aria-label="Weitere Seiten">
      {others.map((item) => (
        <Link key={item.href} className="btn btn-ghost" href={item.href}>
          {item.label} <Icon name="arrow-right" size={18} />
        </Link>
      ))}
      <Link className="btn btn-ghost" href="/">
        <Icon name="arrow-left" size={18} /> Zur Startseite
      </Link>
    </nav>
  );
}
