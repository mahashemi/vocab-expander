const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
global.window = global;

// Match the browser's script order for Term 01 data and its extensions.
for (const file of [
  "term01-data.js",
  "term01-chapters-11-15.js",
  "term01-chapters-16-20.js",
  "term01-supplementary.js",
  "term01-semantic-additions.js",
  "term01-amr-verbs.js",
  "term01-core-semantics.js"
]) require(path.join(root, "website", file));

const rows = global.TERM1_DATA || [];
assert(rows.length > 0, "Term 01 vocabulary data did not load");
const sourceDir = path.join(root, "study-materials/dars/term-01");
const files = fs.readdirSync(sourceDir).filter(name => name.endsWith(".txt"));
assert.equal(files.length, 69, "Expected 69 original Term 01 OCR files");

const expected = [];
for (let i = 1; i <= 20; i++) expected.push("F1-" + String(i).padStart(2, "0"));
for (let i = 1; i <= 20; i++) expected.push("KH1-" + String(i).padStart(2, "0"));
for (const prefix of ["N1", "SH1"]) {
  const limit = prefix === "N1" ? 10 : 20;
  for (let i = 1; i <= limit; i++) {
    // SH1-10 is intentionally not part of this term's source inventory.
    if (prefix === "SH1" && i === 10) continue;
    expected.push(prefix + "-" + String(i).padStart(2, "0"));
  }
}
const present = new Set();
const persian = /[\u0600-\u06ff]/;
let verbs = 0;
let nonverbs = 0;
for (const item of rows) {
  assert(item && item.fa && item.tr && item.en && item.pos,
    "Missing core vocabulary fields: " + JSON.stringify(item));
  assert(!persian.test(item.tr), "Persian script found in transliteration: " + item.fa);
  const sources = [...new Set([item.source, ...(item.sources || [])].filter(Boolean))];
  assert(sources.length > 0, "Vocabulary item has no OCR/source reference: " + item.fa);
  for (const source of sources) present.add(source);
  if (/فعل|verb|اصطلاح فعلی/i.test(item.pos)) {
    verbs++;
    if (item.ex) {
      assert(Array.isArray(item.ex) && item.ex.length >= 3 && item.ex.every(Boolean),
        "Incomplete verb example: " + item.fa);
      assert(!persian.test(item.ex[1] || ""), "Persian script in verb-example transliteration: " + item.fa);
    }
    if (item.amr) assert(item.ms, "Imperative entry missing masdar: " + item.fa);
  } else {
    nonverbs++;
    assert(Array.isArray(item.ex) && item.ex.length >= 3 && item.ex.every(Boolean),
      "Noun/adjective missing trilingual example: " + item.fa);
    assert(!persian.test(item.ex[1] || ""), "Persian script in example transliteration: " + item.fa);
  }
}
for (const source of expected) assert(present.has(source), "No Term 01 vocabulary linked to " + source);

const expectedFiles = [
  ...Array.from({length:20},(_,i)=>"T1_F1_"+String(i+1).padStart(2,"0")+"-"),
  ...Array.from({length:20},(_,i)=>"T1_Kh_"+String(i+1).padStart(2,"0")+"-"),
  ...Array.from({length:10},(_,i)=>"T1_N1_"+String(i+1).padStart(2,"0")+"-"),
  ...Array.from({length:9},(_,i)=>"T1_Sh1_"+String(i+1).padStart(2,"0")+"-"),
  ...Array.from({length:10},(_,i)=>"T1_Sh1_"+String(i+11).padStart(2,"0")+"-")
];
for (const prefix of expectedFiles) {
  assert(files.some(name => name.startsWith(prefix)), "Missing original OCR file matching " + prefix);
}
assert(global.TERM1_AMR_COUNT === 18, "Expected 18 supplementary Term 01 imperative verbs");
assert(global.TERM1_AMR_ADDED_COUNT + global.TERM1_AMR_EXISTING_COUNT === 18,
  "Term 01 imperative batch accounting does not reconcile");
assert(global.TERM1_CORE_SEMANTICS_COUNT > 0, "Term 01 core semantic meanings did not load");
assert(global.PERSIAN_SEMANTICS && Object.keys(global.PERSIAN_SEMANTICS).length > 0,
  "Shared Persian semantic dictionary did not load");

console.log(JSON.stringify({
  term: "01",
  ocrFiles: files.length,
  expectedSourceIds: expected.length,
  coveredSourceIds: expected.filter(source => present.has(source)).length,
  vocabularyRows: rows.length,
  verbs,
  nonverbs,
  supplementaryImperatives: global.TERM1_AMR_COUNT
}, null, 2));
