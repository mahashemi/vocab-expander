const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
global.window = global;

for (const file of [
  "term03-data.js",
  "term03-lexicon-additions.js",
  "term03-matn-verbs.js",
  "term03-source-audit.js",
  "term03-page1-additions.js"
]) require(path.join(root, "website", file));

const entries = global.TERM3_DATA || [];
if (!entries.length) throw new Error("Term 03 vocabulary did not load");

const normalize = value => String(value || "")
  .normalize("NFKC")
  .replace(/[يى]/g, "ی")
  .replace(/ك/g, "ک")
  .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
  .replace(/[\u200c\sـ]/g, "")
  .replace(/[،؛؟,.!?«»()[\]{}"'"]/g, "")
  .toLowerCase();

const sourceDir = path.join(root, "study-materials/dars/term-03");
const sourceFiles = fs.readdirSync(sourceDir);
const lexiconBySource = new Map();
const lexiconByHeadword = new Map();

for (const item of entries) {
  const key = normalize(item.fa);
  if (!key) continue;
  if (!lexiconByHeadword.has(key)) lexiconByHeadword.set(key, []);
  lexiconByHeadword.get(key).push(item);
  const refs = Array.from(new Set([item.source, ...(item.sources || [])].filter(Boolean)));
  for (const ref of refs) {
    if (!lexiconBySource.has(ref)) lexiconBySource.set(ref, new Set());
    lexiconBySource.get(ref).add(key);
  }
}

function extractCandidates(raw) {
  const page1 = String(raw).split(/==========\s*PAGE\s*2\s*==========/i)[0];
  const heading = /واژه(?:‌|\s)?(?:های|ها)(?:\s+جدید)?|واژه‌های\s+جدید|واژه\s+و\s+اصطلاحات|واژه‌ها\s+و\s+اصطلاحات|واژه\s+اصطلاحات/i.exec(page1);
  if (!heading) return { status: "no_vocabulary_heading", candidates: [] };

  let section = page1.slice(heading.index + heading[0].length);
  const stop = /انتظار\s*می‌رود|انتظار\s*میرود|اهداف?\s+درس|هدف\s+درس/i.exec(section);
  if (stop) section = section.slice(0, stop.index);

  const candidates = new Map();
  for (const line of section.split(/\r?\n/)) {
    const cleanedLine = line
      .replace(/^[\s\d۰-۹٠-٩ـ•\-–—"'«»()]+/, "")
      .replace(/[\s\d۰-۹٠-٩ـ•\-–—"'«»()]+$/, "")
      .replace(/[؛;]/g, "،");
    for (const part of cleanedLine.split(/[،,]/)) {
      const candidate = part.trim()
        .replace(/^[\s:؛،"'«»()[\]{}]+|[\s:؛،"'«»()[\]{}]+$/g, "")
        .replace(/\s+/g, " ")
        .trim();
      const key = normalize(candidate);
      if (!key || key.length < 2 || !/[\u0600-\u06ff]/.test(candidate)) continue;
      if (/^(واژه|اصطلاحات|جدید|درس|صفحه)$/.test(candidate)) continue;
      if (!candidates.has(key)) candidates.set(key, candidate);
    }
  }
  return { status: candidates.size ? "parsed" : "heading_but_no_candidates", candidates: [...candidates].map(([key, text]) => ({ key, text })) };
}

const results = [];
for (let lesson = 1; lesson <= 20; lesson++) {
  const source = "FA3-" + String(lesson).padStart(2, "0");
  const prefix = "T3_FA3_" + String(lesson).padStart(2, "0") + "-";
  const filename = sourceFiles.find(name => name.startsWith(prefix) && name.endsWith(".txt"));
  if (!filename) {
    results.push({ source, filename: null, status: "missing_source_file", candidates: [] });
    continue;
  }

  const raw = fs.readFileSync(path.join(sourceDir, filename), "utf8");
  const extracted = extractCandidates(raw);
  const sourceKeys = lexiconBySource.get(source) || new Set();
  const candidates = extracted.candidates.map(candidate => {
    const matchesInSource = sourceKeys.has(candidate.key);
    const matchesElsewhere = lexiconByHeadword.has(candidate.key);
    const matches = matchesInSource ? lexiconByHeadword.get(candidate.key) : (matchesElsewhere ? lexiconByHeadword.get(candidate.key) : []);
    return {
      text: candidate.text,
      normalized: candidate.key,
      status: matchesInSource ? "covered_in_source" : matchesElsewhere ? "present_elsewhere_check_source_link" : "unmatched_review",
      existingHeadwords: matches.slice(0, 5).map(item => item.fa)
    };
  });
  results.push({ source, filename, status: extracted.status, candidateCount: candidates.length, candidates });
}

const totals = {
  term: "03",
  family: "FA3",
  sourceFilesExpected: 20,
  sourceFilesFound: results.filter(x => x.filename).length,
  listsParsed: results.filter(x => x.status === "parsed").length,
  candidates: results.reduce((n, x) => n + (x.candidates || []).length, 0),
  coveredInSource: 0,
  presentElsewhereCheckSourceLink: 0,
  unmatchedReview: 0
};
for (const result of results) {
  for (const candidate of result.candidates || []) {
    if (candidate.status === "covered_in_source") totals.coveredInSource++;
    else if (candidate.status === "present_elsewhere_check_source_link") totals.presentElsewhereCheckSourceLink++;
    else totals.unmatchedReview++;
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  method: "First-page vocabulary-heading extraction only. Candidates are not approved vocabulary. Exact comparison uses NFKC, Persian yeh/kaf normalization, diacritic/tatweel removal, whitespace/ZWNJ and punctuation removal.",
  limitations: [
    "This first pass covers FA3-01 through FA3-20 vocabulary lists only; it does not yet scan running reading passages.",
    "OCR misspellings and segmentation errors may appear as unmatched candidates.",
    "A candidate present elsewhere but not linked to this FA3 source needs source-mapping review, not automatic duplication.",
    "Sources without a detected vocabulary heading are reported explicitly and are not treated as fully covered."
  ],
  totals,
  sources: results
};

const reportDir = path.join(root, "reports");
fs.mkdirSync(reportDir, { recursive: true });
const jsonPath = path.join(reportDir, "term03-fa3-page1-gap-report.json");
const mdPath = path.join(reportDir, "term03-fa3-page1-gap-report.md");
fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2) + "\n", "utf8");

const lines = [
  "# Term 03 FA3 first-page vocabulary gap report",
  "",
  "Generated: " + report.generatedAt,
  "",
  "## Summary",
  "",
  "- Source files found: " + totals.sourceFilesFound + "/20",
  "- Vocabulary lists parsed: " + totals.listsParsed + "/20",
  "- Extracted candidates: " + totals.candidates,
  "- Covered in the same source: " + totals.coveredInSource,
  "- Present elsewhere; source link needs review: " + totals.presentElsewhereCheckSourceLink,
  "- Unmatched candidates requiring human review: " + totals.unmatchedReview,
  "",
  "## Source-by-source results",
  ""
];

for (const result of results) {
  lines.push("### " + result.source + " — " + result.status);
  lines.push("");
  if (!result.filename) {
    lines.push("Source file not found.");
  } else {
    lines.push("OCR file: " + result.filename);
    lines.push("");
    for (const candidate of result.candidates || []) {
      const suggestions = candidate.existingHeadwords.length ? " (existing: " + candidate.existingHeadwords.join("، ") + ")" : "";
      lines.push("- [" + candidate.status + "] " + candidate.text + suggestions);
    }
    if (!result.candidates?.length) lines.push("No candidates extracted; inspect parser coverage manually.");
  }
  lines.push("");
}
lines.push("## Method and limitations", "", ...report.limitations.map(x => "- " + x), "");
fs.writeFileSync(mdPath, lines.join("\n"), "utf8");

console.log(JSON.stringify(totals, null, 2));
console.log("Wrote " + path.relative(root, jsonPath));
console.log("Wrote " + path.relative(root, mdPath));
