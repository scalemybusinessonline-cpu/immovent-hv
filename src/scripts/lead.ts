import { site } from '../data/site';

// Herkunft des Besuchs für die Sitzung merken: Spalten Quelle, Gclid, Kampagne, Keyword in der Lead-Liste
const KEY = 'immovent-attr';

export function trackLanding() {
  const q = new URLSearchParams(location.search);
  const hasParams = ['gclid', 'utm_source', 'utm_campaign', 'utm_term'].some((k) => q.has(k));
  try {
    if (sessionStorage.getItem(KEY) && !hasParams) return;
    const ref = document.referrer ? new URL(document.referrer).hostname : '';
    sessionStorage.setItem(KEY, JSON.stringify({
      quelle: q.get('utm_source') || (q.has('gclid') ? 'Google Ads' : ref && ref !== location.hostname ? ref : 'Direkt'),
      gclid: q.get('gclid') || '',
      kampagne: q.get('utm_campaign') || '',
      keyword: q.get('utm_term') || '',
    }));
  } catch {}
}

// Formular an die Apps-Script-Web-App der Lead-Liste schicken
export function sendLead(form: HTMLFormElement) {
  if (!site.formEndpoint) return Promise.resolve();
  const f = new FormData(form);
  const v = (k: string) => String(f.get(k) ?? '').trim();
  let attr = {};
  try { attr = JSON.parse(sessionStorage.getItem(KEY) || '{}'); } catch {}
  const body = new URLSearchParams({
    name: [v('vorname'), v('nachname')].filter(Boolean).join(' '),
    email: v('email'),
    telefon: v('telefon'),
    nachricht: v('nachricht') || (v('zeitpunkt') && `Gewünschter Start: ${v('zeitpunkt')}`),
    standort: v('standort'),
    art: v('art'),
    einheiten: v('einheiten'),
    ...attr,
    url: location.origin + location.pathname,
  });
  // Apps Script sendet keine CORS-Header: Antwort ist nicht lesbar, nur Netzwerkfehler werden erkannt
  return fetch(site.formEndpoint, { method: 'POST', mode: 'no-cors', body });
}
