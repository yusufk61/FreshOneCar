'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import CarLine from '@/components/CarLine';
import Icon from '@/components/Icon';

// Vorher/Nachher-Slider.
// - Die Position lebt NUR als CSS-Variable (--pos, 0–100) am Container: Pointer-Events und Regler schreiben sie direkt,
//   es gibt keinen React-State pro Bewegung. Die Ebenen bewegen sich ausschließlich per transform (kein Repaint-Layout).
// - Mit before + after: echte Fotos (next/image, gleicher Ausschnitt, feste Aspect-Ratio). Ohne: Linien-Platzhalter,
//   der Slider funktioniert trotzdem.
// - Tastatur/Screenreader: <input type="range"> unter der Fläche, synchron zur Fläche.

const MIN = 6;
const MAX = 94;
const START = 50;

function valueText(p) {
  const v = Math.round(p);
  return `Vorher ${v} Prozent, Nachher ${100 - v} Prozent`;
}

export default function BeforeAfter({ before = null, after = null }) {
  const stageRef = useRef(null);
  const rangeRef = useRef(null);
  const drag = useRef(null);
  const timer = useRef(0);
  const photos = Boolean(before && after);

  const setPos = useCallback((value, { animate = false, fromRange = false } = {}) => {
    const stage = stageRef.current;
    if (!stage) return;
    const p = Math.min(MAX, Math.max(MIN, value));
    stage.style.setProperty('--pos', String(p));
    const range = rangeRef.current;
    if (range) {
      if (!fromRange) range.value = String(p);
      range.setAttribute('aria-valuetext', valueText(p));
    }
    if (animate) {
      stage.classList.add('is-animating');
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => stage.classList.remove('is-animating'), 320);
    }
  }, []);

  useEffect(() => {
    rangeRef.current?.setAttribute('aria-valuetext', valueText(START));
    return () => window.clearTimeout(timer.current);
  }, []);

  const posFromX = (clientX) => {
    const r = stageRef.current.getBoundingClientRect();
    return ((clientX - r.left) / r.width) * 100;
  };

  const begin = (e) => {
    const stage = stageRef.current;
    stage.setPointerCapture?.(e.pointerId);
    stage.classList.remove('is-animating');
    stage.classList.add('is-dragging');
    drag.current.active = true;
    setPos(posFromX(e.clientX));
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, active: false };
    // Maus: sofort greifen. Touch: erst nach klar horizontaler Bewegung, damit vertikales Scrollen weiter klappt.
    if (e.pointerType === 'mouse') begin(e);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (d.active) {
      setPos(posFromX(e.clientX));
      return;
    }
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) > 5 && Math.abs(dx) > Math.abs(dy)) begin(e);
  };

  const endDrag = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    const stage = stageRef.current;
    stage.classList.remove('is-dragging');
    // Tippen (kaum Bewegung, nicht abgebrochen): Griff springt weich zur Stelle.
    if (!d.active && e.type === 'pointerup' && Math.abs(e.clientX - d.x) < 6 && Math.abs(e.clientY - d.y) < 6) {
      setPos(posFromX(e.clientX), { animate: true });
    }
  };

  const layerBefore = photos ? (
    <Image className="compare-img" src={before} alt="Vorher: Fahrzeug vor der Aufbereitung" fill sizes="(max-width: 1050px) 100vw, 58vw" draggable={false} />
  ) : (
    <CarLine />
  );
  const layerAfter = photos ? (
    <Image className="compare-img" src={after} alt="Nachher: Fahrzeug nach der Aufbereitung" fill sizes="(max-width: 1050px) 100vw, 58vw" draggable={false} />
  ) : (
    <CarLine />
  );

  return (
    <div className="compare-wrap" data-reveal>
      <div
        ref={stageRef}
        className={`compare-stage${photos ? ' has-photos' : ' is-placeholder'}`}
        style={{ '--pos': START }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="compare-layer compare-before">
          {layerBefore}
          <span className="compare-tag is-before" aria-hidden="true">
            VORHER
          </span>
        </div>

        <div className="compare-clip">
          <div className="compare-layer compare-after">
            {layerAfter}
            <span className="compare-tag is-after" aria-hidden="true">
              NACHHER
            </span>
          </div>
        </div>

        {photos ? null : <span className="gallery-soon compare-soon">Fotos folgen</span>}

        <div className="compare-divider" aria-hidden="true">
          <i>
            <Icon name="chevron-left" size={16} />
            <Icon name="chevron-right" size={16} />
          </i>
        </div>
      </div>

      <div className="compare-controls">
        <span aria-hidden="true">VORHER</span>
        <input
          ref={rangeRef}
          type="range"
          min={MIN}
          max={MAX}
          step={1}
          defaultValue={START}
          aria-label="Vorher-Nachher-Vergleich: Regler verschieben"
          onChange={(e) => setPos(Number(e.target.value), { fromRange: true })}
          onFocus={() => stageRef.current?.classList.add('is-focus')}
          onBlur={() => stageRef.current?.classList.remove('is-focus')}
        />
        <span aria-hidden="true">NACHHER</span>
      </div>
    </div>
  );
}
