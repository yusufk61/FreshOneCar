'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Icon from '@/components/Icon';
import GalleryMedia, { PLACEHOLDERS, galleryCaption } from '@/components/GalleryTile';

// Galerie-Mosaik (12er-Raster, Spannen 7/5 · 5/7 · 6/6 – per CSS :nth-child generalisiert) mit Vollbild-Viewer.
// - Keine Fotos: 6 Platzhalter-Kacheln (GLOSS/DETAIL/…), ohne Klick-Verhalten.
// - Mit Fotos: NUR die echten Fotos (auch bei 1–5). Platzhalter-Kacheln mit „Foto folgt“ neben echten Arbeiten würden
//   die echten Bilder entwerten; das Mosaik trägt jede Anzahl (eine einzelne Kachel am Ende füllt die volle Breite).

const pad = (n) => String(n).padStart(2, '0');
const mod = (a, n) => ((a % n) + n) % n;

// Responsive Bildgrößen passend zur jeweiligen Spanne (Desktop / Tablet / Handy).
function sizesFor(i, n) {
  const aloneDesktop = i === n - 1 && i % 2 === 0;
  const aloneMobile = i === n - 1 && i % 3 === 1;
  const desktop = aloneDesktop ? '100vw' : ['58vw', '42vw', '42vw', '58vw', '50vw', '50vw'][i % 6];
  const tablet = aloneDesktop ? '100vw' : '50vw';
  const mobile = i % 3 === 0 || aloneMobile ? '100vw' : '50vw';
  return `(max-width: 680px) ${mobile}, (max-width: 1050px) ${tablet}, ${desktop}`;
}

// Liegt der Klick innerhalb des tatsächlich sichtbaren Fotos (object-fit: contain)? Sonst zählt er als Hintergrund.
function hitsPhoto(img, x, y) {
  const r = img.getBoundingClientRect();
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  if (!nw || !nh) return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  const scale = Math.min(r.width / nw, r.height / nh);
  const w = nw * scale;
  const h = nh * scale;
  const left = r.left + (r.width - w) / 2;
  const top = r.top + (r.height - h) / 2;
  return x >= left && x <= left + w && y >= top && y <= top + h;
}

const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Lightbox({ photos, startIndex, returnTo, onClose }) {
  const n = photos.length;
  const [pos, setPos] = useState(startIndex); // virtuelle Position (unbegrenzt) → endloses Blättern ohne Remount-Flackern
  const index = mod(pos, n);

  const dialogRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const closeRef = useRef(null);
  const busy = useRef(false);
  const timer = useRef(0);
  const drag = useRef(null);
  const down = useRef({ x: 0, y: 0 });
  const api = useRef({});

  const slideTo = useCallback(
    (dir) => {
      if (n < 2 || busy.current) return;
      const track = trackRef.current;
      if (reduceMotion() || !track) {
        setPos((p) => p + dir);
        return;
      }
      busy.current = true;
      track.style.transition = 'transform 0.26s cubic-bezier(0.2, 0.7, 0.2, 1)';
      track.style.transform = `translate3d(${-dir * 100}%, 0, 0)`;
      timer.current = window.setTimeout(() => setPos((p) => p + dir), 260);
    },
    [n],
  );

  // Nach dem Positionswechsel: Spur ohne Übergang zurück auf 0 (gleicher Frame wie die neuen Slide-Offsets).
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.style.transition = 'none';
      track.style.transform = '';
    }
    busy.current = false;
  }, [pos]);

  useLayoutEffect(() => {
    api.current = { slideTo, onClose };
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('lightbox-open');
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        api.current.onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        api.current.slideTo(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        api.current.slideTo(-1);
      } else if (e.key === 'Tab') {
        const items = Array.from(dialogRef.current?.querySelectorAll('button:not([disabled])') ?? []);
        if (items.length === 0) {
          e.preventDefault();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (!dialogRef.current.contains(active)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    // Fokus-Falle: landet der Fokus (z. B. per Screenreader-Geste) außerhalb, holen wir ihn zurück.
    const onFocusIn = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) closeRef.current?.focus({ preventScroll: true });
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', onFocusIn);
      window.clearTimeout(timer.current);
      html.classList.remove('lightbox-open');
      returnTo?.focus({ preventScroll: true });
    };
  }, [returnTo]);

  // --- Wischen (Pointer Events, horizontal) -------------------------------------------------------------
  const onPointerDown = (e) => {
    if (busy.current || (e.pointerType === 'mouse' && e.button !== 0)) return;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), dx: 0, locked: false };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.locked) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (n < 2 || Math.abs(dy) > Math.abs(dx)) {
        drag.current = null;
        return;
      }
      d.locked = true;
      stageRef.current?.setPointerCapture?.(e.pointerId);
      trackRef.current.style.transition = 'none';
    }
    d.dx = dx;
    trackRef.current.style.transform = `translate3d(${dx}px, 0, 0)`;
  };
  const endDrag = (e, cancelled) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.locked) return;
    const width = stageRef.current?.clientWidth ?? window.innerWidth;
    const flick = Math.abs(d.dx) > 40 && performance.now() - d.t < 300;
    if (!cancelled && (Math.abs(d.dx) > Math.min(90, width * 0.2) || flick)) {
      slideTo(d.dx < 0 ? 1 : -1);
    } else {
      const track = trackRef.current;
      track.style.transition = 'transform 0.22s cubic-bezier(0.2, 0.7, 0.2, 1)';
      track.style.transform = '';
    }
  };

  // Klick auf den Hintergrund (neben dem Foto) schließt – ein Wisch oder Klick auf Buttons nicht.
  const onRootClick = (e) => {
    if (e.target.closest('button')) return;
    if (Math.hypot(e.clientX - down.current.x, e.clientY - down.current.y) > 8) return;
    const img = trackRef.current?.querySelector('[data-current] img');
    if (img && hitsPhoto(img, e.clientX, e.clientY)) return;
    onClose();
  };

  const offsets = n > 1 ? [-1, 0, 1] : [0];

  return (
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Fotogalerie"
      onPointerDownCapture={(e) => {
        down.current = { x: e.clientX, y: e.clientY };
      }}
      onClick={onRootClick}
    >
      <div className="lightbox-top">
        <div className="lightbox-count" aria-live="polite" aria-atomic="true">
          <b>{pad(index + 1)}</b> / {pad(n)}
        </div>
        <button ref={closeRef} type="button" className="lightbox-btn lightbox-close" onClick={onClose} aria-label="Galerie schließen">
          <Icon name="close" size={22} />
        </button>
      </div>

      <div
        ref={stageRef}
        className="lightbox-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => endDrag(e, false)}
        onPointerCancel={(e) => endDrag(e, true)}
      >
        <div ref={trackRef} className="lightbox-track">
          {offsets.map((o) => {
            const vp = pos + o;
            const i = mod(vp, n);
            return (
              <div key={vp} className="lightbox-slide" style={{ '--o': o }} aria-hidden={o !== 0} {...(o === 0 ? { 'data-current': '' } : {})}>
                <div className="lightbox-frame">
                  <Image
                    className="lightbox-img"
                    src={photos[i].src}
                    alt={o === 0 ? `Fahrzeugaufbereitung bei Fresh Car Hamm – Foto ${pad(i + 1)}` : ''}
                    fill
                    sizes="100vw"
                    loading="eager"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {n > 1 ? (
        <>
          <button type="button" className="lightbox-btn lightbox-nav is-prev" onClick={() => slideTo(-1)} aria-label="Vorheriges Foto">
            <Icon name="arrow-left" size={22} />
          </button>
          <button type="button" className="lightbox-btn lightbox-nav is-next" onClick={() => slideTo(1)} aria-label="Nächstes Foto">
            <Icon name="arrow-right" size={22} />
          </button>
        </>
      ) : null}
    </div>
  );
}

export default function GalleryGrid({ photos = [] }) {
  const [open, setOpen] = useState(null); // { index, trigger } | null
  const n = photos.length;

  const close = useCallback(() => setOpen(null), []);

  if (n === 0) {
    return (
      <ul className="gallery-grid is-placeholder" role="list">
        {PLACEHOLDERS.map(([word], i) => (
          <li className="gallery-card" key={word} data-reveal style={{ '--delay': `${(i % 2) * 70}ms` }}>
            <div className="gallery-no">{pad(i + 1)}</div>
            <GalleryMedia photo={null} index={i} />
            <div className="gallery-caption">
              <span>{galleryCaption(null, i)}</span>
              <b>FRESH CAR HAMM</b>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <ul className="gallery-grid" role="list">
        {photos.map((photo, i) => (
          <li className="gallery-card is-photo" key={photo.src} data-reveal style={{ '--delay': `${(i % 2) * 70}ms` }}>
            <div className="gallery-no">{pad(i + 1)}</div>
            <div className="gallery-frame">
              <GalleryMedia photo={photo} index={i} sizes={sizesFor(i, n)} />
              <button
                type="button"
                className="gallery-open"
                aria-haspopup="dialog"
                aria-label={`Foto ${pad(i + 1)} von ${pad(n)} vergrößern`}
                onClick={(e) => setOpen({ index: i, trigger: e.currentTarget })}
              >
                <span className="gallery-open-icon" aria-hidden="true">
                  <Icon name="arrow-up-right" size={18} />
                </span>
              </button>
            </div>
            <div className="gallery-caption">
              <span>{galleryCaption(photo, i)}</span>
              <b>FRESH CAR HAMM</b>
            </div>
          </li>
        ))}
      </ul>
      {open ? createPortal(<Lightbox photos={photos} startIndex={open.index} returnTo={open.trigger} onClose={close} />, document.body) : null}
    </>
  );
}
