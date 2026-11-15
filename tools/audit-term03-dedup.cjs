/* Runtime test for the Term 03 deduplication pipeline. */
const assert = require("node:assert/strict");
const path = require("node:path");

global.window = {};
const store = new Map([["persian_done_v1", JSON.stringify(["3|4|KH3-04|اختراع"])]]);
global.localStorage = {
  getItem(key) { return store.has(key) ? store.get(key) : null; },
  setItem(key, value) { store.set(key, String(value)); },
  removeItem(key) { store.delete(key); }
};

const load = file => require(path.join(__dirname, "..", "website", file));
load("term03-data.js");
load("term03-lexicon-additions.js");
load("term03-matn-verbs.js");
load("term03-source-audit.js");
load("semantic-meanings.js");
load("term03-core-semantics.js");
for (let i = 1; i <= 45; i++) load("term03-additional-semantics-" + String(i).padStart(2, "0") + ".js");
load("term03-page1-additions.js");

const page1 = window.TERM03_PAGE1_ADDITIONS;
assert.ok(page1, "page-one additions must run before deduplication");
assert.equal(page1.newCards, 39, "all 39 page-one cards should be present");
assert.equal(page1.linkedCards, 77, "all 77 lesson links should be applied");
assert.equal(page1.missingLinks.length, 0, "no page-one lesson links may be missing");

load("term03-dedup.js");
load("term03-chapter-mapping.js");

const audit = window.TERM03_DEDUP_AUDIT;
assert.ok(audit, "deduplication audit must be exposed");
assert.equal(audit.before, 2092, "expected pre-deduplication card count");
assert.equal(audit.approvedMerges, 124, "all approved merges must be applied");
assert.equal(audit.decisionMerges, 29, "all adjudicated duplicate-sense merges must be applied");
assert.equal(audit.after, 1939, "expected final Term 03 card count");
assert.equal(audit.idAliasCount, 54, "all planned legacy ID aliases must be handled");
assert.deepEqual(audit.missing, [], "every planned card descriptor must match exactly");
assert.deepEqual(audit.duplicateIds, [], "no surviving cards may share an ID");
assert.deepEqual(audit.duplicateHeadwordPos, [], "no duplicate headword/POS pairs may remain");
assert.deepEqual(audit.missingSemantics, [], "all reviewed headwords must retain trilingual records");
assert.deepEqual(audit.sourceLoss, [], "all cards must retain source and unit metadata");

const done = new Set(JSON.parse(store.get("persian_done_v1")));
assert.ok(done.has("3|17|FA3-17|اختراع"), "memorisation progress must migrate from the removed card ID");

const rows = window.TERM3_DATA;
const poetry = rows.find(x => x.fa === "ردیف (شعر)");
const rowSense = rows.find(x => x.fa === "ردیف (صف)");
assert.ok(poetry && rowSense, "distinct senses must have visible Persian labels");
assert.notEqual(poetry.id, rowSense.id, "distinct senses must have unique IDs");
for (const card of [poetry, rowSense]) {
  const meaning = window.PERSIAN_SEMANTICS[card.fa];
  assert.ok(meaning && meaning.faMeaning && meaning.enMeaning && meaning.arMeaning, "each distinct sense needs its own trilingual record");
}
console.log("Term 03 dedup runtime audit passed:", JSON.stringify({
  before: audit.before,
  approvedMerges: audit.approvedMerges,
  decisionMerges: audit.decisionMerges,
  after: audit.after,
  pageOneCards: page1.newCards,
  lessonLinks: page1.linkedCards,
  legacyAliases: audit.idAliasCount
}));
