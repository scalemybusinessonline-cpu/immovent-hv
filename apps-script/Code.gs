// Web-App für die Lead-Liste (Google Sheet „Lead Liste - Immovent-hv“).
// Einrichtung: im Sheet Erweiterungen → Apps Script, diesen Code einfügen,
// Bereitstellen → Neue Bereitstellung → Web-App, Ausführen als „Ich“, Zugriff „Jeder“.
// Die /exec-URL kommt in src/data/site.ts → formEndpoint.

// Empfänger der Lead-Zusammenfassung per E-Mail
const EMPFAENGER = ['scale.my.business.online@gmail.com', 'l.rauh@immovent-hv.de'];

function doPost(e) {
  const p = e.parameter;
  let id = 1;
  // Apostroph erzwingt Text: „+49…“ sonst Formel, „0151…“ ohne Null
  const t = (v) => (v ? "'" + v : '');
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActive();
    const sheet = ss.getSheetByName('Sheet1');
    // Form ID: fortlaufend, neueste Nummer (Zeile 2) + 1
    if (sheet.getLastRow() > 1) {
      const prev = sheet.getRange(2, 1).getValue();
      id = (Number(prev) || 0) + 1;
    }
    // Neueste Anfrage oben: leere Zeile 2 einfügen
    sheet.insertRowBefore(2);
    const row = sheet.getRange(2, 1, 1, 16);
    row.clearFormat();
    row.setValues([[
      id,
      new Date(),
      '',
      '',
      t(p.name),
      t(p.email),
      t(p.telefon),
      t(p.nachricht),
      t(p.standort),
      t(p.art),
      t(p.einheiten),
      t(p.quelle),
      t(p.gclid),
      t(p.kampagne),
      t(p.keyword),
      t(p.url),
    ]]);
  } finally {
    lock.releaseLock();
  }
  // Mail-Fehler dürfen den Sheet-Eintrag nicht verhindern
  try {
    sendMail(id, p);
  } catch (err) {
    console.error(err);
  }
  return ContentService.createTextOutput('ok');
}

function sendMail(id, p) {
  if (!EMPFAENGER.length) return;
  const formular = /\/angebot/.test(p.url || '') ? 'Angebots-Funnel' : 'Kontaktformular';
  const felder = [
    ['Name', p.name],
    ['E-Mail', p.email],
    ['Telefon', p.telefon],
    ['Nachricht', p.nachricht],
    ['Standort', p.standort],
    ['Art', p.art],
    ['Einheiten', p.einheiten],
    ['Quelle', p.quelle],
    ['Kampagne', p.kampagne],
    ['Keyword', p.keyword],
    ['Seite', p.url],
  ].filter(([, v]) => v);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const zeilen = felder
    .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#4F5B6B;vertical-align:top">${k}</td><td style="padding:4px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('');
  MailApp.sendEmail({
    to: EMPFAENGER.join(','),
    replyTo: p.email || undefined,
    subject: `Neue Anfrage #${id}: ${p.name || 'ohne Name'} (${formular})`,
    body: felder.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nLead-Liste: ${SpreadsheetApp.getActive().getUrl()}`,
    htmlBody: `<p>Neue Anfrage über das ${formular} (#${id}):</p><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${zeilen}</table><p><a href="${SpreadsheetApp.getActive().getUrl()}">Lead-Liste öffnen</a></p>`,
  });
}

// Einmal im Editor ausführen: erteilt die Mail-Berechtigung und schickt eine Testmail
function testMail() {
  sendMail(0, { name: 'Test Lead', email: 'scale.my.business.online@gmail.com', nachricht: 'Testanfrage', url: 'https://www.immovent-hv.de/kontakt' });
}
