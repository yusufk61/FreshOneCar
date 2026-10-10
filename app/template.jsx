// Seitenübergang: Next.js erzeugt template.jsx bei jeder Navigation neu → kurze CSS-Animation (nur opacity/transform,
// ~300 ms, blockiert die Navigation nicht) plus eine feine rote Linie am oberen Rand.
export default function Template({ children }) {
  return (
    <>
      <div className="route-line" aria-hidden="true" />
      <div className="page-enter">{children}</div>
    </>
  );
}
