import Link from 'next/link';
import { SITE } from '@/data/site';
import { siteUrl } from '@/lib/seo';

// Einstieg jeder Unterseite: gleiche Designsprache wie der Start-Hero (Raster, rote Linie, Outline-Headline),
// eigener Titel, kurzer Lead und passender CTA. Die Brotkrumen sind bewusst als dezente Eyebrow-Zeile gelöst.
export default function PageHero({ crumb, path, title, accent, children, actions, meta, aside, mark }) {
  const base = siteUrl();
  const breadcrumbLd = base
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: SITE.name, item: `${base}/` },
          { '@type': 'ListItem', position: 2, name: crumb, item: `${base}${path}` },
        ],
      }
    : null;

  return (
    <section className="page-hero">
      <div className="hero-grid" aria-hidden="true" />
      {mark ? (
        <span className="page-hero-mark" aria-hidden="true">
          {mark}
        </span>
      ) : null}
      <div className={`page-hero-body${aside ? ' has-aside' : ''}`}>
        <div className="page-hero-copy">
          <nav className="eyebrow page-crumbs" aria-label="Brotkrumen">
            <span aria-hidden="true" />
            <ol>
              <li>
                <Link href="/">Start</Link>
              </li>
              <li aria-current="page">{crumb}</li>
            </ol>
          </nav>
          <h1>
            <span>{title}</span>{' '}
            {accent ? <em>{accent}</em> : null}
          </h1>
          {children ? <div className="page-hero-lead">{children}</div> : null}
          {actions ? <div className="hero-actions page-hero-actions">{actions}</div> : null}
          {meta ? <div className="hero-meta page-hero-meta">{meta}</div> : null}
        </div>
        {aside ? (
          <div className="page-hero-aside" aria-hidden="true">
            {aside}
          </div>
        ) : null}
      </div>
      {breadcrumbLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} /> : null}
    </section>
  );
}
