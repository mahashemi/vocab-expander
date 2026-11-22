const fs = require('node:fs');
const source = fs.readFileSync('website/app-bootstrap.js', 'utf8');
const rendererStart = source.indexOf('function speeches(){');
const rendererEnd = source.indexOf('\nfunction render()', rendererStart);
if (rendererStart < 0 || rendererEnd < 0) throw new Error('Shared Sukhanrani renderer not found');
const renderer = source.slice(rendererStart, rendererEnd);
const structure = renderer.indexOf('<div class="panel speech-timing-panel"');
const quran = renderer.indexOf('<div class="panel speech-verse-panel"');
if (structure < 0 || quran < 0 || structure >= quran) {
  throw new Error("The speech structure section must appear before the Qur'anic section.");
}
if (renderer.indexOf("Qur'anic anchor:", quran) < quran) {
  throw new Error("The Qur'anic anchor must remain inside the Qur'anic section.");
}
for (const stage of ['Opening', "Qur'anic connection", 'Main message', 'Application', 'Conclusion']) {
  if (!renderer.includes('<div class="speech-structure-tile"><b>' + stage + '</b>')) {
    throw new Error('Missing Sukhanrani structure tile: ' + stage);
  }
}
if (!renderer.includes('activeTerm===2?')) throw new Error('Term 02 does not use the shared Sukhanrani renderer.');
if (!renderer.includes('window.TERM3_SPEECHES')) throw new Error('Term 03 does not use the shared Sukhanrani renderer.');
console.log('Sukhanrani layout verified: all five structure tiles precede the Qur’anic section for Terms 02 and 03.');
