const fs = require('node:fs');
const source = fs.readFileSync('website/app-bootstrap.js', 'utf8');
const rendererStart = source.indexOf('function speeches(){');
const rendererEnd = source.indexOf('\nfunction render()', rendererStart);
if (rendererStart < 0 || rendererEnd < 0) throw new Error('Shared Sukhanrani renderer not found');
const renderer = source.slice(rendererStart, rendererEnd);
const anchor = renderer.indexOf("Qur'anic anchor:");
const structure = renderer.indexOf('<div class="panel speech-timing-panel"', anchor);
if (anchor < 0 || structure < 0 || structure <= anchor) {
  throw new Error("The five-minute structure tiles must follow the Qur'anic anchor.");
}
for (const stage of ['Opening', "Qur'anic connection", 'Main message', 'Application', 'Conclusion']) {
  if (!renderer.includes('<div class="speech-structure-tile"><b>' + stage + '</b>')) {
    throw new Error('Missing Sukhanrani structure tile: ' + stage);
  }
}
if (!renderer.includes('activeTerm===2?')) throw new Error('Term 02 does not use the shared Sukhanrani renderer.');
if (!renderer.includes('window.TERM3_SPEECHES')) throw new Error('Term 03 does not use the shared Sukhanrani renderer.');
console.log('Sukhanrani layout verified: Quranic anchor precedes all five structure tiles for Terms 02 and 03.');
