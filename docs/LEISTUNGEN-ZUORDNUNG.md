# Leistungen: Zuordnung ODS → Website

Quelle: `data/source/Website.ods` (Source of Truth). Umsetzung: `data/services.js`.
Offensichtliche Tippfehler der Tabelle sind für die Anzeige korrigiert; Inhalt und Preis sind unverändert.

| ODS-Zelle(n) | Kategorie | Name laut ODS | Name auf der Website | Beschreibung | Preis laut ODS | Preis auf der Website |
|---|---|---|---|---|---|---|
| Pakete | A1 · A2 · A3 | Innenraumpacket | Innenraumpaket | ja | 150,00 € | 150 € |
| Pakete | G1 · G2 · G3 | Außenpaket | Außenpaket | ja | 100,00 € | 100 € |
| Polituren | E3 · F3 | Hochglanzpolitur | Hochglanzpolitur | – | Ab 150 | ab 150 € |
| Polituren | E4 · F4 | 1 stufige politur | 1-stufige Politur | – | Ab 180 | ab 180 € |
| Polituren | E5 · F5 | 2 stufige politur | 2-stufige Politur | – | Ab 220 | ab 220 € |
| Polituren | E6 · F6 | 3 stufige politur | 3-stufige Politur | – | Ab 280 | ab 280 € |
| Polituren | E7 · F7 | Einzelne Kratzer | Einzelne Kratzer | – | preis je nach kratzer | Preis je nach Kratzer |
| Extras | C3 · D3 | Dachhimmelreinigung | Dachhimmelreinigung | – | Ab 20 | ab 20 € |
| Extras | C4 · D4 | Lederpflege | Lederpflege | – | Ab20 | ab 20 € |
| Extras | C5 · D5 | Kunstoffplege | Kunststoffpflege | – | Ab 20 | ab 20 € |
| Extras | C6 · D6 | Gummipfelge | Gummipflege | – | Ab 20 | ab 20 € |
| Extras | C7 · D7 | Tierharrentfernung | Tierhaarentfernung | – | Ab 50 | ab 50 € |
| Extras | C8 · D8 | Intensive reinigung der sitze | Intensive Reinigung der Sitze | – | pro sitz ab 20 | pro Sitz ab 20 € |
| Extras | C9 · D9 | Intensive reinigung der fußmatten | Intensive Reinigung der Fußmatten | – | pro matte ab 10 | pro Matte ab 10 € |
| Extras | C11 · D11 | Gurtreinigung | Gurtreinigung | – | Ab 20 | ab 20 € |
| Extras | C12 · D12 | Gummimatten plege | Gummimattenpflege | – | Ab 20 | ab 20 € |
| Extras | C13 · D13 | Aufkleber entfernung | Aufkleberentfernung | – | Ab 10 | ab 10 € |
| Extras | C14 · D14 | Flugrostentfernug | Flugrostentfernung | – | Ab 20 | ab 20 € |
| Extras | C15 · D15 | Kneten des Fahrzeugs | Kneten des Fahrzeugs | – | Ab 50 | ab 50 € |
| Extras | C16 · D16 · C17 · D17 + C17 · D17 | schwärzen ausgebleichter plastikteile | Schwärzen ausgebleichter Kunststoffteile | – | Ab 25 | ab 25 € |
| Extras | C18 · D18 | Scheinwerfer aufbereitung | Scheinwerferaufbereitung | – | Ab 50 | ab 50 € |
| Extras | C19 · D19 | Dichtungspflege | Dichtungspflege | – | Ab 25 | ab 25 € |
| Extras | C20 · D20 | Insektenenfernung | Insektenentfernung | – | Ab 30 | ab 30 € |
| Extras | C21 · D21 | Motoraumreinigung | Motorraumreinigung | – | Ab 50 | ab 50 € |
| Extras | C22 · D22 | Sprühversiglung scheiben | Sprühversiegelung Scheiben | – | Ab 10 pro scheibe | pro Scheibe ab 10 € |
| Extras | C23 · D23 | Sprühversiglung Karosserie | Sprühversiegelung Karosserie | – | Ab 80 | ab 80 € |
| Extras | C24 · D24 | Komplette Innenaufbereitung Ohne Chemie | Komplette Innenaufbereitung ohne Chemie | – | Ab 100 | ab 100 € |

## Hinweise aus der Tabelle

- `A5` „hol und bring service verfügbar“ → Hinweis „Abhol- & Bringservice möglich“ an den Paketen sowie eigene Seite `/abholservice`.
- `A6` „bei satrker verschmutzung teurer“ → Hinweis „Bei starker Verschmutzung teurer“ am Innenraumpaket und allgemeiner Preis-Hinweis (`PRICE_NOTE`).
- `C16/D16` und `C17/D17` sind in der Tabelle doppelt („schwärzen ausgebleichter Plastikteile/Kunststoffteile“, beide ab 25 €) und erscheinen auf der Website einmal.

## Wo erscheinen die Leistungen?

- `/leistungen` → `components/ServiceCatalog.jsx` (Tabs Pakete · Polituren · Extras; alle Einträge liegen im HTML)
- `/termin` → `components/BookingForm.jsx` (jede Leistung als wählbarer Chip; Vorauswahl per `?service=<slug>`)
- `/` → Leistungs-Teaser (Auswahl, nicht vollständig)
