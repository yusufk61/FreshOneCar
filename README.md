# Fresh Car Hamm — Website

Mobile-first Multi-Page-Website (Next.js App Router, React) für **Fresh Car Hamm**, Bockelweg 73, 59073 Hamm.
Keine UI-Bibliothek, keine Animations-Library, keine externen Bild-/Font-Abhängigkeiten.

## Seiten

| Route | Inhalt |
|---|---|
| `/` | Startseite: Hero, USPs, Leistungs-Teaser, Abholservice-Teaser, Galerie-Teaser, Bewertungs-Teaser, Abschluss-CTA |
| `/leistungen` | Leistungen & Preise (Pakete · Polituren · Extras), jede Leistung → Terminanfrage |
| `/abholservice` | Abhol- & Bringservice |
| `/galerie` | Showreel, Galerie mit Lightbox, Vorher/Nachher |
| `/bewertungen` | Google-Bewertungen, Bewertung schreiben, QR-Code |
| `/kontakt` | Kontakt & Standort, Routen (Google Maps / Apple Karten) |
| `/termin` | Terminanfrage → vorbereitete WhatsApp-Nachricht |
| `/impressum`, `/datenschutz` | Rechtsseiten (**Platzhalter**, siehe unten) |

Navigation: Hamburger-Menü auf allen Bildschirmgrößen (Fullscreen-Panel, nummerierte Einträge).

### Terminformular vorbelegen (URL-Parameter)

- `/termin?service=innenraumpaket` — Leistung vorauswählen (Slugs siehe `data/services.js`)
- `/termin?service=lederpflege,dachhimmelreinigung` — mehrere Leistungen
- `/termin?pickup=true` — Abhol- & Bringservice auf „Ja“

## Lokal starten

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build
npm start        # Produktions-Build lokal ausliefern
```

Node ≥ 20.9. Next.js und React sind bewusst auf feste Versionen gepinnt (`package.json`, `package-lock.json`).

## Deployment (GitHub + Vercel)

1. Repository bei Vercel importieren (**Framework: Next.js**, **Root Directory: leer / `./`** — das Projekt liegt im Repo-Root).
2. Deploy. Jeder Push auf den Produktions-Branch deployt automatisch neu.
3. Optional: Eigene Domain in Vercel verbinden. Für Canonical-URLs und strukturierte Daten nutzt die Seite
   automatisch die echte Vercel-Produktions-Domain (`VERCEL_PROJECT_PRODUCTION_URL`); alternativ
   `NEXT_PUBLIC_SITE_URL=https://deine-domain.de` setzen. Es wird keine Domain erfunden.

## Inhalte pflegen

| Was | Wo |
|---|---|
| Telefon/WhatsApp, Adresse, Instagram, Google-Place-ID, **Google-Rating & Rezensionsanzahl** | `data/site.js` |
| Leistungen & Preise (Quelle: `data/source/Website.ods`) | `data/services.js` |
| Menü-Einträge | `data/navigation.js` |
| WhatsApp-Nachrichtenformat | `lib/whatsapp.js` |

Die Zuordnung ODS → Website steht in `docs/LEISTUNGEN-ZUORDNUNG.md`.

### Bilder & Video ergänzen

Dateien in `public/media/` legen (Namen siehe `public/media/README.txt`), committen, fertig — die Seiten erkennen
die Dateien beim Build automatisch. Ohne Dateien erscheinen Platzhalter (keine kaputten Bilder).

## Projektstruktur

```
app/            Routen (page.jsx je Seite), layout.jsx, template.jsx (Seitenübergang), not-found.jsx
app/styles/     CSS je Bereich (shell, pages, catalog, booking, media, pickup, info, legal); globals.css = Kern-Design
components/     Header/Menü, Footer, PageHero, CtaBand, PagePager, ServiceCatalog, BookingForm, Galerie, …
data/           Geschäftsdaten, Leistungen, Navigation (zentral, nichts doppelt hartkodiert)
lib/            WhatsApp-Nachricht, Medien-Erkennung (Build-Zeit), SEO-Helfer
public/         brand/ (Logo, QR-Code), media/ (Fotos, Video)
```

## Performance-Prinzipien

- Statisch vorgerendert (alle Seiten „○ Static“), kleine Client-Komponenten nur für Menü, Katalog-Tabs, Formular, Galerie/Slider.
- Animationen ausschließlich `transform`/`opacity`, keine Blur-/Backdrop-Filter-Flächen, keine Dauer-Animationen außer dem Ticker, kein Scroll-Listener außer dem rAF-gedrosselten Lesefortschritt.
- `prefers-reduced-motion` wird respektiert. Icons sind eigene SVGs (`components/Icon.jsx`).
- Bilder über `next/image` (responsive AVIF/WebP). Video lädt auf Handys erst nach Tippen.

## Noch offen (Betreiber)

- **Impressum & Datenschutz**: Platzhalter — Inhaber, Rechtsform, E-Mail, Register-/Steuerdaten, Datenschutz-Details ergänzen (ggf. rechtlich prüfen).
- **Fotos & Showreel**: `public/media/` (siehe oben).
- **Google-Bewertungsstand** (`data/site.js`) vor Livegang prüfen.
- Öffnungszeiten und ein fester Preis für den Abholservice sind bewusst **nicht** angegeben.
