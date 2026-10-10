import Link from 'next/link';
import Icon from './Icon';
import { pagerFor } from '@/data/navigation';

// Dezente Zurück-/Weiter-Navigation am Seitenende (Lesereihenfolge der Hauptseiten).
export default function PagePager({ href }) {
  const { prev, next } = pagerFor(href);
  if (!prev && !next) return null;
  return (
    <nav className="page-pager" aria-label="Weitere Seiten">
      {prev ? (
        <Link className="pager-link is-prev" href={prev.href}>
          <Icon name="arrow-left" size={20} />
          <span>
            <small>Zurück</small>
            <strong>{prev.title}</strong>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link className="pager-link is-next" href={next.href}>
          <span>
            <small>Weiter</small>
            <strong>{next.title}</strong>
          </span>
          <Icon name="arrow-right" size={20} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
