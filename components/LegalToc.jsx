// Inhaltsverzeichnis (Sprungmarken) für längere Rechtsseiten. Wird nur auf großen Bildschirmen in der
// Seitenspalte gezeigt (siehe legal.css) — auf dem Handy führen die nummerierten Karten ohnehin durch die Seite.
export default function LegalToc({ items }) {
  return (
    <nav className="legal-toc" aria-labelledby="legal-toc-title">
      <p className="legal-toc-title" id="legal-toc-title">
        Inhalt
      </p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>
              <b aria-hidden="true">{item.no}</b>
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
