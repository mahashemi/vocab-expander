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

  // Start after the complete title line so words such as "واژه‌ها و اصطلاحات درس ۶"
  // are not mistaken for vocabulary entries.
  const titleEnd = page1.indexOf("\n", heading.index + heading[0].length);
  let section = page1.slice(titleEnd < 0 ? heading.index + heading[0].length : titleEnd + 1);

  // Many OCR pages bracket the vocabulary list with two dashed separators.
  // When both exist, use only the text between them.
  const separators = [...section.matchAll(/^\s*--\s*$/gm)];
  if (separators.length >= 2) {
    const firstEnd = separators[0].index + separators[0][0].length;
    section = section.slice(firstEnd, separators[1].index);
  } else if (separators.length === 1) {
    const firstEnd = separators[0].index + separators[0][0].length;
    section = section.slice(firstEnd);
  }

  // Stop before lesson objectives/instructions. The fallback catches OCR-damaged
  // objective headings that still contain "با خواندن این درس" or begin with a
  // page-layout number marker.
  const stopPatterns = [
    /با\s*خواندن\s*این\s*درس/i,
    /اهداف?.{0,8}درس/i,
    /انتظ[اآا]ر.{0,12}زبان/i,
    /^\s*[0-9۰-۹٠-٩]+(?:\s+\S{1,8})?\s*$/m
  ];
  let stopIndex = -1;
  for (const pattern of stopPatterns) {
    const match = pattern.exec(section);
    if (match && (stopIndex < 0 || match.index < stopIndex)) stopIndex = match.index;
  }
  if (stopIndex >= 0) section = section.slice(0, stopIndex);

  const candidates = new Map();
  for (const line of section.split(/\r?\n/)) {
    const cleanedLine = line
      .replace(/^[\s\d۰-۹٠-٩ـ•\-–—"'«»()]+/, "")
      .replace(/[\s\d۰-۹٠-٩ـ•\-–—"'«»()]+$/, "");
    for (const part of cleanedLine.split(/[،,؛;.»]/)) {
      const candidate = part.trim()
        .replace(/^[\s:؛،"'«»()[\]{}]+|[\s:؛،"'«»()[\]{}]+$/g, "")
        .replace(/\s+/g, " ")
        .trim();
      const key = normalize(candidate);
      if (!key || key.length < 2 || !/[\u0600-\u06ff]/.test(candidate)) continue;
      if (candidate.length > 55 || candidate.split(/\s+/).length > 7) continue;
      if (/^(واژه|اصطلاحات|جدید|درس|صفحه)$/.test(candidate)) continue;
      if (!candidates.has(key)) candidates.set(key, candidate);
    }
  }
  return { status: candidates.size ? "parsed" : "heading_but_no_candidates", candidates: [...candidates].map(([key, text]) => ({ key, text })) };
}

function editDistance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length];
}

function nearMatches(key) {
  if (key.length < 5) return [];
  const limit = key.length >= 9 ? 2 : 1;
  const candidates = [];
  for (const [known, items] of lexiconByHeadword) {
    if (Math.abs(known.length - key.length) > limit) continue;
    const distance = editDistance(key, known);
    if (distance > 0 && distance <= limit) {
      candidates.push({ headword: items[0].fa, distance });
    }
  }
  return candidates.sort((a, b) => a.distance - b.distance).slice(0, 3);
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
    const suggestions = matchesInSource || matchesElsewhere ? [] : nearMatches(candidate.key);
    return {
      text: candidate.text,
      normalized: candidate.key,
      status: matchesInSource ? "covered_in_source" : matchesElsewhere ? "present_elsewhere_check_source_link" : suggestions.length ? "possible_ocr_variant" : "unmatched_review",
      existingHeadwords: matches.slice(0, 5).map(item => item.fa),
      nearMatches: suggestions
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
  possibleOcrVariant: 0,
  unmatchedReview: 0
};
for (const result of results) {
  for (const candidate of result.candidates || []) {
    if (candidate.status === "covered_in_source") totals.coveredInSource++;
    else if (candidate.status === "present_elsewhere_check_source_link") totals.presentElsewhereCheckSourceLink++;
    else if (candidate.status === "possible_ocr_variant") totals.possibleOcrVariant++;
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
      const existing = candidate.existingHeadwords.length ? " (existing: " + candidate.existingHeadwords.join("، ") + ")" : "";
      const near = candidate.nearMatches?.length ? " (possible: " + candidate.nearMatches.map(x => x.headword + " [" + x.distance + "]").join("، ") + ")" : "";
      const suggestions = existing + near;
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
