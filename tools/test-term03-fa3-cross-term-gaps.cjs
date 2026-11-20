const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const reportPath = path.join(root, "reports/term03-fa3-reading-gap-report.json");
assert.ok(fs.existsSync(reportPath), "FA3 reading gap report must be generated before this test");
const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));

assert.equal(report.totals.sourceFilesFound, 20, "all FA3 OCR files must be scanned");
assert.ok(report.totals.paragraphsScanned > 1000, "the reading-passage scan must cover the full source set");

const coveredWords = new Map(report.crossTermCovered.words.map(item => [item.word, item]));
const unmatchedWords = new Set(report.words.map(item => item.word));
const expectedCoverage = [
  ["باغچه", "1"],
  ["دریاچه", "1"],
  ["قرن", "1"],
  ["میدان", "1"],
  ["درخواست", "2"],
  ["عید", "1"],
  ["استمراری", "2"]
];
for (const [word, term] of expectedCoverage) {
  const item = coveredWords.get(word);
  assert.ok(item, "Expected " + word + " to be recognized as covered in another term");
  assert.ok(item.otherTerms.includes(term), word + " should point to Term " + term);
  assert.ok(!unmatchedWords.has(word), word + " must not remain in the globally-uncovered word queue");
}

assert.ok(!unmatchedWords.has("دکان"), "the reviewed literary word دکان should no longer remain in the candidate queue");
assert.ok(!unmatchedWords.has("کدام‌یک"), "the reviewed expression کدام‌یک should no longer remain in the candidate queue");
const unmatchedPhrases = new Set(report.phrases.map(item => item.phrase));
const reviewedBatch06 = [
  "خودداری کردن","دعا کردن","دریافت کردن","نگهداری کردن","مرتب کردن","جمع کردن",
  "وصل کردن","تقسیم شدن","حل شدن","روشن شدن","نابود شدن","متولد شدن",
  "غافل شدن","تکرار شدن","به شمار رفتن","به ذهنم رسیدن","به آرزویش رسیدن","در ارتباط بودن"
];
for (const phrase of reviewedBatch06) assert.ok(!unmatchedPhrases.has(phrase), "Reviewed compound phrase should no longer be in the gap queue: " + phrase);
assert.equal(report.totals.crossTermCoveredWordCandidates, report.crossTermCovered.words.length);
assert.equal(report.totals.crossTermCoveredPhraseCandidates, report.crossTermCovered.phrases.length);

console.log("PASS: FA3 reading-gap audit recognizes existing Term 01/02 vocabulary without suppressing genuinely new candidates");
console.log(JSON.stringify({
  unmatchedWords: report.totals.unknownRepeatedWordCandidates,
  unmatchedPhrases: report.totals.unmatchedPhraseCandidates,
  crossTermWords: report.totals.crossTermCoveredWordCandidates,
  crossTermPhrases: report.totals.crossTermCoveredPhraseCandidates
}, null, 2));
