'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';
import CarLine from '@/components/CarLine';

// Showreel-Bereich der Galerie.
// - Ohne Video (oder bei einem Ladefehler): dekorativer Platzhalter, KEIN Button, kein Netzwerk-Request.
// - Mit Video: fester Seitenverhältnis-Container (kein Layout-Shift). Das <video> bekommt erst dann eine Quelle,
//   wenn es wirklich gebraucht wird:
//     · Desktop / gutes Netz: sobald der Bereich sichtbar wird (IntersectionObserver), autoplay – außerhalb pausiert.
//     · Mobil / Save-Data / 2G–3G / reduzierte Bewegung / Touch: NICHTS wird geladen, bis der Nutzer auf Play tippt.
// Das src-Attribut wird bewusst nur imperativ gesetzt (React rendert es nie), damit ein Re-Render die Wiedergabe
// nicht per erneutem Setzen des Attributs zurücksetzt.

const SLOW_NETWORK = ['slow-2g', '2g', '3g'];

function shouldAutoplay() {
  try {
    if (!('IntersectionObserver' in window)) return false;
    const mq = (q) => window.matchMedia(q).matches;
    if (mq('(prefers-reduced-motion: reduce)')) return false;
    if (mq('(max-width: 820px)')) return false;
    if (mq('(hover: none) and (pointer: coarse)')) return false;
    const c = navigator.connection;
    if (c && (c.saveData || SLOW_NETWORK.includes(c.effectiveType))) return false;
    return true;
  } catch {
    return false;
  }
}

// Fehlendes Icon „pause“ → eigenes Inline-SVG (gleiche Linien-Sprache wie Icon.jsx).
function PauseGlyph({ size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M9 6v12" />
      <path d="M15 6v12" />
    </svg>
  );
}

export default function Showreel({ src = null, poster = null }) {
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const wanted = useRef(false); // soll laufen (Tap oder Auto-Start)
  const inView = useRef(false);
  const autoDone = useRef(false);

  const [failed, setFailed] = useState(false);
  const [wantPlay, setWantPlay] = useState(false);
  const [started, setStarted] = useState(false);
  const [contain, setContain] = useState(false);

  const live = Boolean(src) && !failed;
  const loading = live && wantPlay && !started;

  // Einziger Ort, an dem die Wiedergabe gesteuert wird: läuft nur, wenn gewünscht UND sichtbar UND Tab aktiv.
  const sync = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const go = wanted.current && inView.current && !document.hidden;
    if (go) {
      if (!v.getAttribute('src')) v.src = src;
      v.muted = true;
      const p = v.play();
      if (p && typeof p.catch === 'function') {
        p.catch((err) => {
          if (err && err.name === 'NotAllowedError') {
            wanted.current = false;
            setWantPlay(false);
          }
        });
      }
    } else if (v.getAttribute('src') && !v.paused) {
      v.pause();
    }
  }, [src]);

  const toggle = () => {
    wanted.current = !wanted.current;
    inView.current = true; // der Tap beweist: der Bereich ist sichtbar
    setWantPlay(wanted.current);
    sync();
  };

  useEffect(() => {
    if (!live) return undefined;
    if (!('IntersectionObserver' in window)) {
      inView.current = true;
      return undefined;
    }
    const auto = shouldAutoplay();
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting && auto && !autoDone.current) {
          autoDone.current = true;
          wanted.current = true;
          setWantPlay(true);
        }
        sync();
      },
      { threshold: 0.25 },
    );
    io.observe(stageRef.current);
    const onVisibility = () => sync();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [live, sync]);

  const onError = () => {
    wanted.current = false;
    setWantPlay(false);
    setStarted(false);
    setFailed(true);
  };

  // Hochformat-Video in breitem Container: nicht beschneiden, sondern mit Rand zeigen (Layout bleibt unverändert).
  const onLoadedMetadata = (e) => {
    const v = e.currentTarget;
    setContain(v.videoHeight > v.videoWidth && window.matchMedia('(min-width: 681px)').matches);
  };

  const stageClass = ['video-stage', live && 'has-video', started && 'is-started', wantPlay && 'is-wanted', contain && 'is-contain']
    .filter(Boolean)
    .join(' ');

  const label = loading ? 'LÄDT …' : live ? 'FRESH CAR HAMM / SHOWREEL' : 'SHOWREEL · BALD VERFÜGBAR';

  return (
    <section className="section showreel" id="showreel" aria-labelledby="showreel-title">
      <div className="video-reveal" data-reveal>
        <div className={stageClass} ref={stageRef}>
          <div className="video-media">
            {live && poster ? null : <CarLine />}
            {live && poster ? (
              <Image className="showreel-poster" src={poster} alt="" fill sizes="(min-width: 1440px) 1325px, 100vw" />
            ) : null}
            {live ? (
              <video
                ref={videoRef}
                className="showreel-video"
                muted
                loop
                playsInline
                preload="none"
                disablePictureInPicture
                aria-hidden="true"
                tabIndex={-1}
                onPlaying={() => setStarted(true)}
                onLoadedMetadata={onLoadedMetadata}
                onError={onError}
              />
            ) : null}
            <div className="video-rails" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            {live ? (
              <button type="button" className="video-toggle" onClick={toggle} aria-pressed={wantPlay} aria-label="Showreel abspielen">
                <span className="play-ring" aria-hidden="true">
                  <span>{wantPlay ? <PauseGlyph /> : <Icon name="play" size={26} className="glyph-play" />}</span>
                </span>
              </button>
            ) : (
              <div className="video-toggle is-static" aria-hidden="true">
                <span className="play-ring">
                  <span>
                    <Icon name="play" size={26} />
                  </span>
                </span>
              </div>
            )}

            <div className="video-label" aria-live="polite">
              {label}
            </div>
          </div>

          <div className="video-copy">
            <div className="eyebrow">
              <span aria-hidden="true" /> SHOWREEL
            </div>
            <h2 id="showreel-title">
              FRESH CAR
              <em>IN MOTION.</em>
            </h2>
            <p>
              {live
                ? 'Glanz, Detail und Finish in Bewegung – ein kurzer Einblick in unsere Arbeit.'
                : 'Glanz, Detail und Finish in Bewegung – unser Showreel folgt in Kürze.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
