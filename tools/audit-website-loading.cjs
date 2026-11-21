#!/usr/bin/env node
'use strict';

// Static loading/dependency audit. This reports source inventory, not browser timing.
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const websiteDir = path.join(root, 'website');
const reportDir = path.join(root, 'reports');
const htmlPath = path.join(websiteDir, 'index.html');
const loaderPath = path.join(websiteDir, 'term-loader.js');
const html = fs.readFileSync(htmlPath, 'utf8');
if (!fs.existsSync(loaderPath)) throw new Error('Missing website/term-loader.js');
const loaderText = fs.readFileSync(loaderPath, 'utf8');

const tags = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)];
const scripts = tags.map((match, index) => {
  const attrs = match[1] || '';
  const srcMatch = attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  const src = srcMatch ? srcMatch[1] : null;
  const async = /\basync\b/i.test(attrs);
  const defer = /\bdefer\b/i.test(attrs);

  if (!src) {
    return {
      order: index + 1,
      kind: 'inline',
      file: '(inline application bootstrap)',
      bytes: Buffer.byteLength(match[2] || '', 'utf8'),
      async,
      defer,
    };
  }
  if (/^(?:https?:)?\/\//i.test(src)) {
    return { order: index + 1, kind: 'remote', file: src, bytes: null, async, defer };
  }

  const relative = src.split(/[?#]/, 1)[0].replace(/^\.\//, '');
  const resolved = path.resolve(websiteDir, relative);
  if (!resolved.startsWith(websiteDir + path.sep)) throw new Error('Script path escapes website directory: ' + src);
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) throw new Error('Referenced script does not exist: ' + src);
  return { order: index + 1, kind: 'external', file: relative, bytes: fs.statSync(resolved).size, async, defer };
});

const external = scripts.filter(x => x.kind === 'external');
const inline = scripts.filter(x => x.kind === 'inline');
const groupFor = file => {
  if (/^term01-/.test(file)) return 'Term 01';
  if (/^term02-/.test(file)) return 'Term 02';
  if (/^term03-/.test(file)) return 'Term 03';
  if (/^newestan-/.test(file)) return 'Newestan';
  return 'Shared / portal';
};
const groups = {};
for (const script of external) {
  const group = groupFor(script.file);
  groups[group] ||= { files: 0, bytes: 0 };
  groups[group].files += 1;
  groups[group].bytes += script.bytes;
}

const indexOf = name => scripts.findIndex(x => x.file === name);
const inlineIndex = scripts.findIndex(x => x.kind === 'inline');
const requiredOrder = [
  ['app-bootstrap.js', 'term-loader.js'],
  ['term-loader.js', 'verb-treasury.js'],
  ['verb-treasury.js', 'term-portal.js'],
];
const orderErrors = [];
for (const [before, after] of requiredOrder) {
  const a = before === '(inline application bootstrap)' ? inlineIndex : indexOf(before);
  const b = after === '(inline application bootstrap)' ? inlineIndex : indexOf(after);
  if (a < 0 || b < 0 || a >= b) orderErrors.push(before + ' must precede ' + after + ' in initial HTML');
}

const loaderOrder = [
  ['term01-data.js', 'term02-data.js'],
  ['term02-data.js', 'newestan-lexicon-additions.js'],
  ['newestan-lexicon-additions.js', 'newestan-essay-vocabulary.js'],
  ['semantic-meanings.js', 'term01-semantic-additions.js'],
  ['semantic-meanings.js', 'term01-core-semantics.js'],
  ['semantic-meanings.js', 'term02-core-semantics.js'],
  ['semantic-meanings.js', 'term03-core-semantics.js'],
  ['term03-data.js', 'term03-lexicon-additions.js'],
  ['term03-lexicon-additions.js', 'term03-matn-verbs.js'],
  ['term03-chapter-mapping.js', 'term03-dedup.js'],
  ['term03-dedup.js', 'await loadScript("newestan-lexicon-additions.js", true)'],
];
const loaderOrderErrors = [];
for (const [before, after] of loaderOrder) {
  const a = loaderText.indexOf(before);
  const b = loaderText.indexOf(after);
  if (a < 0 || b < 0 || a >= b) loaderOrderErrors.push(before + ' must precede ' + after + ' in term-loader.js');
}

const baselinePath = path.join(reportDir, 'vocabulary-baseline-2026-11-20.json');
if (!fs.existsSync(baselinePath)) throw new Error('Missing vocabulary baseline used by the portal count manifest');
const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
for (const term of [1, 2, 3]) {
  const key = String(term).padStart(2, '0');
  const expected = baseline.portalRuntimeCounts && baseline.portalRuntimeCounts[key];
  if (!loaderText.includes(term + ': ' + expected)) {
    loaderOrderErrors.push('Portal summary for Term ' + key + ' must match audited runtime portal count ' + expected);
  }
}

const forbiddenInitial = [
  'term01-data.js','term01-chapters-11-15.js','term01-chapters-16-20.js','term01-supplementary.js','term01-amr-verbs.js',
  'term02-data.js','term02-lexicon-additions.js','term02-proverbs.js','newestan-lexicon-additions.js','newestan-essay-vocabulary.js',
  'term03-data.js', 'term03-lexicon-additions.js', 'term03-dedup.js',
  'term03-core-semantics.js', 'term03-speeches.js', 'term03-khulasa.js',
  'term03-newestan-insha.js', 'term02-khulasa.js', 'term02-speeches.js',
  'semantic-meanings.js', 'term01-semantic-additions.js', 'term01-core-semantics.js',
  'term02-core-semantics.js',
  ...Array.from({ length: 9 }, (_, i) => 'term02-additional-semantics-' + String(i + 1).padStart(2, '0') + '.js'),
  'newestan-writing-library.js', 'newestan-language-lessons.js', 'newestan-writing-ui.js',
];
for (const file of forbiddenInitial) {
  if (indexOf(file) >= 0) loaderOrderErrors.push(file + ' must remain out of the initial HTML payload');
}
if (!loaderText.includes('length: 46') || !loaderText.includes('term03-additional-semantics-')) {
  loaderOrderErrors.push('Term 03 loader must include all 46 additional semantic chunks');
}

const quotedJsFiles = value => value.split('"').filter(x => x.endsWith('.js'));
const coreStart = loaderText.indexOf('const coreTermScripts');
const coreEnd = loaderText.indexOf('const term01SemanticScripts');
const coreScriptFiles = quotedJsFiles(loaderText.slice(coreStart, coreEnd));
for (const required of ['term01-data.js','term01-chapters-11-15.js','term01-chapters-16-20.js','term01-supplementary.js','term01-amr-verbs.js','term02-data.js','term02-lexicon-additions.js','term02-proverbs.js','newestan-lexicon-additions.js','newestan-essay-vocabulary.js']) {
  if (!coreScriptFiles.includes(required)) loaderOrderErrors.push(required + ' must be included in the deferred Term 01/02 core bundle');
}
const term3CoreStart = loaderText.indexOf('const term03CoreScripts');
const term3CoreEnd = loaderText.indexOf('const sharedEssayScripts');
const featureStart = loaderText.indexOf('const featureScripts');
const featureEnd = loaderText.indexOf('const scriptLoads');
const explicitTerm3Files = quotedJsFiles(loaderText.slice(term3CoreStart, term3CoreEnd));
const lazyTerm03CoreScriptCount = explicitTerm3Files.length;
const term03SemanticEnrichmentScriptCount = 46;
const lazyFeatureFiles = quotedJsFiles(loaderText.slice(featureStart, featureEnd));
const sharedFeatureFiles = ['newestan-writing-library.js', 'newestan-language-lessons.js', 'newestan-rubric.js', 'newestan-writing-ui.js'];
const lazyFeatureScriptCount = new Set([...lazyFeatureFiles, ...sharedFeatureFiles]).size;

const externalBytes = external.reduce((sum, item) => sum + item.bytes, 0);
const inlineBytes = inline.reduce((sum, item) => sum + item.bytes, 0);
if (external.length > 18) loaderOrderErrors.push('Initial external script count exceeds the 18-file budget: ' + external.length);
if (externalBytes > 0.75 * 1024 * 1024) loaderOrderErrors.push('Initial external JavaScript exceeds the 0.75 MiB source budget: ' + externalBytes + ' bytes');
if (inlineBytes > 250 * 1024) loaderOrderErrors.push('Inline application JavaScript exceeds the 250 KiB source budget: ' + inlineBytes + ' bytes');
const noLoadHints = scripts.filter(x => x.kind !== 'remote' && !x.defer).length;
if (scripts.some(x => x.async)) loaderOrderErrors.push('Initial app scripts must not use async; preserve ordered deferred execution.');
// Permit only the tiny synchronous route-visibility guard: it must run before
// CSS/paint to prevent a deep-link refresh from exposing the static portal.
const routeGuardAllowed = inline.length === 1 && inline[0].bytes <= 512 &&
  /var hash=window\.location\.hash\|\|"#\/";[\s\S]*route-boot/.test(html);
if (inline.length && !routeGuardAllowed) loaderOrderErrors.push('Only the <=512-byte synchronous route-visibility guard may be inline; application bootstrap must remain external.');
if (inlineBytes > 512) loaderOrderErrors.push('Synchronous route-visibility guard exceeds its 512-byte budget: ' + inlineBytes + ' bytes.');
const report = {
  generatedAt: new Date().toISOString(),
  measurementType: 'static-source-inventory-not-browser-performance',
  html: { path: 'website/index.html', bytes: fs.statSync(htmlPath).size },
  scriptTagCount: scripts.length,
  externalScriptCount: external.length,
  externalScriptBytes: externalBytes,
  inlineScriptCount: inline.length,
  inlineScriptBytes: inlineBytes,
  scriptTagsWithoutAsyncOrDefer: noLoadHints,
  groups,
  dependencyOrder: requiredOrder,
  orderErrors,
  loaderOrder,
  loaderOrderErrors,
  lazyLoadPlan: { term03CoreScriptCount: lazyTerm03CoreScriptCount, term03SemanticEnrichmentScriptCount, featureScriptCount: lazyFeatureScriptCount },
  scripts,
};

fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(path.join(reportDir, 'website-loading-inventory.json'), JSON.stringify(report, null, 2) + '\n');
const md = [
  '# Website loading inventory',
  '',
  'Generated by `tools/audit-website-loading.cjs`.',
  '',
  '> Static source inventory only. This is not a browser performance measurement and does not report actual transferred bytes or rendering timings.',
  '',
  '| Metric | Value |',
  '|---|---:|',
  '| HTML bytes | ' + report.html.bytes.toLocaleString('en-US') + ' |',
  '| Script tags | ' + report.scriptTagCount + ' |',
  '| External scripts | ' + report.externalScriptCount + ' (budget: 18) |',
  '| External JavaScript bytes | ' + report.externalScriptBytes.toLocaleString('en-US') + ' (budget: 0.75 MiB) |',
  '| Inline script bytes | ' + report.inlineScriptBytes.toLocaleString('en-US') + ' (route guard budget: 512 B) |',
  '| Scripts without async/defer | ' + report.scriptTagsWithoutAsyncOrDefer + ' |',
  '| Term 03 core scripts deferred until needed | ' + lazyTerm03CoreScriptCount + ' |',
  '| Term 03 supplementary semantic batches deferred until enrichment | ' + term03SemanticEnrichmentScriptCount + ' |',
  '| Feature scripts deferred until opened | ' + lazyFeatureScriptCount + ' |',
  '',
  '## Initial external scripts by group',
  '',
  '| Group | Files | Bytes |',
  '|---|---:|---:|',
  ...Object.entries(groups).map(([name, value]) => '| ' + name + ' | ' + value.files + ' | ' + value.bytes.toLocaleString('en-US') + ' |'),
  '',
  '## Initial external script order',
  '',
  ...external.map(x => (x.order + '. `' + x.file + '` — ' + x.bytes.toLocaleString('en-US') + ' bytes')),
  '',
  '## Dependency order checks',
  '',
  ...(orderErrors.length ? orderErrors.map(x => '- FAIL: ' + x) : ['- PASS: deferred app-bootstrap/loader/Verb Treasury/portal order.']),
  ...(loaderOrderErrors.length ? loaderOrderErrors.map(x => '- FAIL: ' + x) : ['- PASS: Term 03 and feature dependencies remain lazy and ordered.']),
  '',
].join('\n');
fs.writeFileSync(path.join(reportDir, 'website-loading-inventory.md'), md);

if (orderErrors.length || loaderOrderErrors.length) {
  console.error('Website loading dependency audit failed:\n- ' + [...orderErrors, ...loaderOrderErrors].join('\n- '));
  process.exitCode = 1;
} else {
  console.log('Website loading inventory generated.');
  console.log('Initial external scripts: ' + external.length + ' (' + externalBytes.toLocaleString('en-US') + ' bytes).');
  console.log('Inline script bytes: ' + inlineBytes.toLocaleString('en-US') + '.');
  console.log('Term 03 core scripts deferred: ' + lazyTerm03CoreScriptCount + '.');
  console.log('Feature scripts deferred: ' + lazyFeatureScriptCount + '.');
  console.log('Initial and lazy dependency order: PASS.');
}
