// Medien-Erkennung zur BUILD-Zeit (nur in Server Components verwenden).
// Liegt eine Datei in public/media/, wird sie automatisch angezeigt — fehlt sie, zeigen die Seiten einen
// hochwertigen Platzhalter. Kein Client-Fetch, keine kaputten Bild-Icons, kein Layout-Shift.
import fs from 'node:fs';
import path from 'node:path';

const MEDIA_DIR = path.join(process.cwd(), 'public', 'media');
const IMAGE_EXT = ['webp', 'avif', 'jpg', 'jpeg', 'png'];
const VIDEO_EXT = ['mp4', 'webm'];

function listDir() {
  try {
    return fs.readdirSync(MEDIA_DIR);
  } catch {
    return [];
  }
}

function pick(files, base, exts) {
  for (const ext of exts) {
    const name = `${base}.${ext}`;
    if (files.includes(name)) return `/media/${name}`;
  }
  return null;
}

export function getMedia() {
  const files = listDir();

  const gallery = files
    .filter((f) => /^gallery-\d+\.(webp|avif|jpe?g|png)$/i.test(f))
    .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10))
    .map((f, i) => ({ src: `/media/${f}`, index: i + 1 }));

  const before = pick(files, 'before', IMAGE_EXT);
  const after = pick(files, 'after', IMAGE_EXT);

  return {
    hero: pick(files, 'hero', IMAGE_EXT),
    gallery,
    before: before && after ? before : null,
    after: before && after ? after : null,
    showreel: pick(files, 'showreel', VIDEO_EXT),
    showreelPoster: pick(files, 'showreel-poster', IMAGE_EXT),
  };
}
