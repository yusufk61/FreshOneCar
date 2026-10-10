// Inhaltskarte einer Rechtsseite: Nummer, <h2>, Inhalt. Die id dient als Sprungziel (Inhaltsverzeichnis).
export default function LegalSection({ id, no, title, children }) {
  return (
    <section id={id} className="legal-card" aria-labelledby={`${id}-title`}>
      <span className="legal-no" aria-hidden="true">
        {no}
      </span>
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  );
}
