// Web-App für die Lead-Liste (Google Sheet „Lead Liste - Immovent-hv“).
// Einrichtung: im Sheet Erweiterungen → Apps Script, diesen Code einfügen,
// Bereitstellen → Neue Bereitstellung → Web-App, Ausführen als „Ich“, Zugriff „Jeder“.
// Die /exec-URL kommt in src/data/site.ts → formEndpoint.
function doPost(e) {
  const p = e.parameter;
  // Apostroph erzwingt Text: „+49…“ sonst Formel, „0151…“ ohne Null
  const t = (v) => (v ? "'" + v : '');
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActive();
    const sheet = ss.getSheetByName('Sheet1');
    // Form ID: fortlaufend, neueste Nummer (Zeile 2) + 1
    let id = 1;
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
  return ContentService.createTextOutput('ok');
}
