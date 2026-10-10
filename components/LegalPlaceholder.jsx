// Deutlich sichtbarer Platzhalter für Angaben, die der Betreiber noch liefern muss.
// Bewusst ein <mark>: semantisch „hervorgehoben“, visuell dezent rot (siehe legal.css).
export default function LegalPlaceholder({ children }) {
  return <mark className="legal-placeholder">[BITTE ERGÄNZEN: {children}]</mark>;
}
