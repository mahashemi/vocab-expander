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
require("./audit-trilingual-meanings.cjs");
const load = file => require(path.join(__dirname, "..", "website", file));
load("term03-source-audit.js");
load("term03-page1-additions.js");

const page1 = window.TERM03_PAGE1_ADDITIONS;
assert.ok(page1, "page-one additions must run before deduplication");
assert.equal(page1.newCards, 39, "all 39 genuinely new page-one cards should be present");
assert.equal(page1.linkedCards, 77, "all 77 lesson links should be applied");
assert.equal(page1.missingLinks.length, 0, "no page-one lesson links may be missing");
assert.equal(page1.missingLinks.length, 0, "no page-one lesson links may be missing");

load("term03-chapter-mapping.js");
load("term03-dedup.js");

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

const consumption = window.TERM3_DATA.find(x => x.fa === "مصرف کردن");
assert.ok(consumption && consumption.sources.includes("KH3-09") && consumption.units.includes(9), "the missing KH3-09 page-one lesson link must attach to the existing verb");
assert.ok((consumption.extraExamples || []).some(x => x.fa.includes("میوه‌های دارای ویتامین C")), "the KH3-09 source example must be retained rather than discarded");

const rows = window.TERM3_DATA;
const distinctSenses = {
  "ردیف": ["ردیف (شعر)", "ردیف (صف)"],
  "فرا رسیدن": ["فرا رسیدن (فعل)", "فرا رسیدن (اسم)"],
  "قابل حمل": ["قابل حمل (صفت)", "قابل حمل (کاربرد اسمی)"],
  "روبوسی کردن": ["روبوسی کردن (سلام و احوال‌پرسی)", "روبوسی کردن (بوسیدن گونه‌ها)"],
  "هوای کسی را داشتن": ["هوای کسی را داشتن (حمایت و پشتیبانی)", "هوای کسی را داشتن (مراقبت و همراهی)"],
  "خدمت رسیدن": ["خدمت رسیدن (عبارت محترمانه)", "خدمت رسیدن (دیدار محترمانه)", "خدمت رسیدن (خدمت‌رسانی)"],
  "جهیزیه": ["جهیزیه (جهیزیهٔ عروس)", "جهیزیه (لوازم خانهٔ عروس)"],
  "به هیچ‌وجه": ["به هیچ‌وجه (قید)", "به هیچ‌وجه (کاربرد اسمی)"],
  "پاس کردن": ["پاس کردن (چک)", "پاس کردن (درس و امتحان)"],
  "خون‌سرد": ["خون‌سرد (جانورشناسی)", "خون‌سرد (ویژگی شخصیتی)"],
  "ولیمه": ["ولیمه (مراسم ازدواج)", "ولیمه (مناسبت ویژه)"],
  "فدای سرت": ["فدای سرت (دلجویی)", "فدای سرت (محبت و دلگرمی)"],
  "نقش": ["نقش (طرح و نگار)", "نقش (جایگاه و وظیفه)"],
  "روایت": ["روایت (حدیث)", "روایت (گزارش و داستان)"],
  "مخفیانه": ["مخفیانه (قید)", "مخفیانه (صفت)"]
};
assert.equal(Object.keys(distinctSenses).length, audit.distinctHeadwordGroups, "all retained sense groups must be explicitly labelled");
for (const [headword, labels] of Object.entries(distinctSenses)) {
  const cards = rows.filter(x => labels.includes(x.fa));
  assert.deepEqual(cards.map(x => x.fa).sort(), labels.slice().sort(), headword + " must retain every reviewed sense");
  assert.equal(new Set(cards.map(x => x.id)).size, labels.length, headword + " senses must have unique IDs");
  for (const card of cards) {
    const meaning = window.PERSIAN_SEMANTICS[card.fa];
    assert.ok(meaning && meaning.faMeaning && meaning.enMeaning && meaning.arMeaning, headword + " sense needs a trilingual semantic record");
  }
}
assert.ok(rows.some(x => (x.extraExamples || []).length > 0), "merged examples must be preserved and rendered");
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
