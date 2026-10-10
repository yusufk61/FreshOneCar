'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// In den Zwischenablage-Fallback fällt der Button zurück, wenn navigator.clipboard fehlt (z. B. ältere Browser,
// unsicherer Kontext) oder die Berechtigung verweigert wird.
async function copyToClipboard(text) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // weiter mit Fallback
    }
  }
  try {
    const previous = document.activeElement;
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.setAttribute('aria-hidden', 'true');
    // 16px verhindert den automatischen Zoom auf iOS; außerhalb des Bildes und unsichtbar.
    area.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:0;opacity:0;font-size:16px;pointer-events:none';
    document.body.appendChild(area);
    area.focus({ preventScroll: true });
    area.select();
    area.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    if (previous && typeof previous.focus === 'function') previous.focus({ preventScroll: true });
    return ok;
  } catch {
    return false;
  }
}

/**
 * Button, der `text` in die Zwischenablage kopiert.
 * - Rückmeldung für Screenreader über eine aria-live-Region (successMessage / errorMessage).
 * - Visuelle Rückmeldung per CSS: der Button bekommt `is-copied` bzw. `is-failed` (nach `resetAfter` ms wieder weg).
 *   Die Kinder werden unverändert gerendert; Zustandsabhängiges blendet das CSS ein/aus.
 */
export default function CopyButton({ text, className = '', children, successMessage = 'Kopiert', errorMessage = 'Kopieren nicht möglich', resetAfter = 2600, ...rest }) {
  const [status, setStatus] = useState('idle');
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = useCallback(async () => {
    const ok = await copyToClipboard(text);
    setStatus(ok ? 'copied' : 'failed');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), resetAfter);
  }, [text, resetAfter]);

  const stateClass = status === 'copied' ? ' is-copied' : status === 'failed' ? ' is-failed' : '';

  return (
    <>
      <button type="button" className={`${className}${stateClass}`} onClick={onClick} {...rest}>
        {children}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {status === 'copied' ? successMessage : status === 'failed' ? errorMessage : ''}
      </span>
    </>
  );
}
