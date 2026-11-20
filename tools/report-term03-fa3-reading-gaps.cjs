const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
global.window = global;

for (const file of [
  "term03-data.js",
  "term03-lexicon-additions.js",
  "term03-matn-verbs.js",
  "term03-source-audit.js",
  "term03-page1-additions.js",
  "term03-fa3-reviewed-additions.js",
  "term03-fa3-reading-additions.js",
  "term03-fa3-reading-additions-02.js",
  "term03-fa3-reading-additions-03.js"
]) require(path.join(root, "website", file));

const entries = global.TERM3_DATA || [];
if (!entries.length) throw new Error("Term 03 vocabulary did not load");

const normalize = value => String(value || "").normalize("NFKC")
  .replace(/[يى]/g, "ی").replace(/ك/g, "ک")
  .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
  .replace(/[\u200c\sـ]/g, "")
  .replace(/[،؛؟,.!?«»()[\]{}"'"]/g, "").toLowerCase();

const known = new Set(entries.map(item => normalize(item.fa)).filter(Boolean));
const knownComponents = new Set();
for (const item of entries) {
  for (const token of String(item.fa || "").split(/[\s‌]+/)) {
    const key = normalize(token);
    if (key) knownComponents.add(key);
  }
}

const stopWords = new Set([
  "و","یا","که","را","در","به","از","با","برای","تا","اگر","چون","اما","ولی","این","آن","آنها","ایشان","او","من","تو","ما","شما","خود","هم","نیز","هر","هیچ","بعضی","بسیاری","چند","یک","دو","سه","همه","فقط","بسیار","خیلی","بیشتر","کمتر","دیگر","باید","شاید","ممکن","است","هست","بود","باشد","هستند","شد","شده","می","نمی","های","ها","تر","ترین","ای","آنچه","چیزی","کسی","هرگز","همیشه","اکنون","امروز","دیروز","فردا","حالا","وقتی","همان","چنین","بنابراین","مثلا","مثلاً","یعنی","زیرا","سپس","بعد","قبل","پس","مانند","درباره","دربارة","نسبت","طریق","طور","جهت","ضمن","بدون","روی","زیر","کنار","مقابل","میان","بین","پیش","نزد","همچنین","بلکه","نه","بله","آری","خیر","لطفا","لطفاً","سلام","خداحافظ","آنجا","اینجا","کدام","چه","چرا","چگونه","چطور","کجا","کی","کِی","هرکدام","همین","آنها","آنها","ایشان","بعضی","اکثر","تمام","کل","نزدیک","دور","مثل","مثال","مثلا","برای","همراه","بسیار","واقعاً","واقعا","اصلا","اصلاً","فقط","حتی","تقریبا","تقریباً","فورا","فوراً","دوباره","یکدیگر","دیگران","خودشان","خودش","خودم","خودت","خودمان","خودتان"
]);

const verbForms = new Map();
function addForms(canonical, forms) { verbForms.set(normalize(canonical), canonical); for (const form of forms.split("|")) verbForms.set(normalize(form), canonical); }
addForms("کردن","کرد|کرده|کردند|کردیم|کردم|کردی|کن|کنید|کنند|کند|می‌کند|می‌کنم|می‌کنی|می‌کنند|می‌کنید|نمی‌کند|نمی‌کنند|نکن|نکنید|بکند|بکنند|بکن");
addForms("شدن","شد|شده|شدند|شدیم|شدم|شو|شود|شوند|شوید|می‌شود|می‌شوند|می‌شوم|می‌شوی|نمی‌شود|نشد|نشود|بشود");
addForms("داشتن","داشت|داشته|دارم|داری|دارد|دارند|دارید|داریم|می‌دارد|می‌دارند|ندارد|ندارند");
addForms("گرفتن","گرفت|گرفته|گرفتند|گرفتم|گرفتی|بگیر|بگیرید|بگیرند|می‌گیرد|می‌گیرند|می‌گیرم|می‌گیری|نگرفت|نگیر");
addForms("دادن","داد|داده|دادند|دادم|دادی|بده|بدهید|بدهند|می‌دهد|می‌دهند|می‌دهم|می‌دهی|نداد|نده");
addForms("زدن","زد|زده|زدند|زدم|زدی|بزن|بزنید|بزنند|می‌زند|می‌زنند|می‌زنم|می‌زنی");
addForms("آوردن","آورد|آورده|آوردند|آوردم|بیاور|بیاورید|می‌آورد|می‌آورند|می‌آورم|می‌آوری");
addForms("رفتن","رفت|رفته|رفتند|رفتم|رفتی|برو|بروید|بروند|می‌رود|می‌روند|می‌روم|می‌روی|نرفت");
addForms("گذاشتن","گذاشت|گذاشته|گذاشتند|بگذار|بگذارید|می‌گذارد|می‌گذارند|می‌گذارم");
addForms("ماندن","ماند|مانده|ماندند|بمان|بمانید|می‌ماند|می‌مانند");
addForms("رسیدن","رسید|رسیده|رسیدند|برس|برسید|می‌رسد|می‌رسند");
addForms("خوردن","خورد|خورده|خوردند|بخور|بخورید|می‌خورد|می‌خورند");
addForms("کشیدن","کشید|کشیده|کشیدند|بکش|بکشید|می‌کشد|می‌کشند");
addForms("انداختن","انداخت|انداخته|انداختند|بینداز|بیندازید|می‌اندازد|می‌اندازند");
addForms("پوشیدن","پوشید|پوشیده|پوشیدند|بپوش|بپوشید|می‌پوشد|می‌پوشند");
addForms("خواندن","خواند|خوانده|خواندند|بخوان|بخوانید|می‌خواند|می‌خوانند");
addForms("نوشتن","نوشت|نوشته|نوشتند|بنویس|بنویسید|می‌نویسد|می‌نویسند");
addForms("دیدن","دید|دیده|دیدند|ببین|ببینید|می‌بیند|می‌بینند");
addForms("فهمیدن","فهمید|فهمیده|فهمیدند|بفهم|بفهمید|می‌فهمد|می‌فهمند");
addForms("توانستن","توانست|توانسته|توانستند|بتوان|بتوانید|می‌تواند|می‌توانند|نمی‌تواند");
addForms("بودن","بود|بوده|باش|باشد|باشند|هست|هستم|هستی|هستند|نیست|نیستم|نیستند|می‌باشد");
addForms("شدن","شوند|شود|شده‌اند|شده‌است|شده");
const isStop = token => stopWords.has(normalize(token)) || verbForms.has(normalize(token));

const sourceDir = path.join(root, "study-materials/dars/term-03");
const sourceFiles = fs.readdirSync(sourceDir);
const phraseMap = new Map();
const tokenMap = new Map();
const sources = [];

function addCandidate(map, key, text, source, context) {
  if (!map.has(key)) map.set(key, { text, count: 0, sources: new Set(), contexts: [] });
  const item = map.get(key);
  item.count++;
  item.sources.add(source);
  if (item.contexts.length < 3 && context && !item.contexts.includes(context)) item.contexts.push(context);
}

for (let lesson = 1; lesson <= 20; lesson++) {
  const source = "FA3-" + String(lesson).padStart(2, "0");
  const prefix = "T3_FA3_" + String(lesson).padStart(2, "0") + "-";
  const filename = sourceFiles.find(name => name.startsWith(prefix) && name.endsWith(".txt"));
  if (!filename) { sources.push({ source, filename: null, paragraphs: 0 }); continue; }
  const raw = fs.readFileSync(path.join(sourceDir, filename), "utf8");
  const pageMarkers = [...raw.matchAll(/==========\s*PAGE\s*(\d+)\s*==========/gi)];
  const passageParts = [];
  for (let i = 0; i < pageMarkers.length; i++) {
    const pageNumber = Number(pageMarkers[i][1]);
    if (pageNumber < 2) continue;
    const start = pageMarkers[i].index + pageMarkers[i][0].length;
    const end = i + 1 < pageMarkers.length ? pageMarkers[i + 1].index : raw.length;
    passageParts.push(raw.slice(start, end));
  }
  const passage = passageParts.join("\n");
  const paragraphs = passage.split(/\n\s*\n+/).map(x => x.replace(/\s+/g, " ").trim()).filter(x => x.length >= 15 && /[\u0600-\u06ff]/.test(x));
  for (const paragraph of paragraphs) {
    const sentences = paragraph.split(/[.!؟?؛:]+/).map(x => x.trim()).filter(x => x.length >= 12);
    for (const sentence of sentences) {
      const tokens = (sentence.match(/[\u0600-\u06ff]+(?:‌[\u0600-\u06ff]+)*/g) || []).map(x => x.trim());
      if (!tokens.length) continue;

      const frequencies = new Map();
      for (const token of tokens) {
        const key = normalize(token);
        if (!key || key.length < 3 || isStop(token) || known.has(key) || knownComponents.has(key)) continue;
        frequencies.set(key, (frequencies.get(key) || 0) + 1);
      }
      for (const [key, count] of frequencies) {
        if (count >= 2) addCandidate(tokenMap, key, tokens.find(t => normalize(t) === key), source, sentence);
      }

      for (let i = 0; i < tokens.length; i++) {
        const canonicalVerb = verbForms.get(normalize(tokens[i]));
        if (!canonicalVerb || i < 1) continue;
        const previous = tokens[i - 1];
        const previousKey = normalize(previous);
        if (!previousKey || isStop(previous) || previousKey === "خدا") continue;

        const addPhrase = phraseTokens => {
          const phrase = phraseTokens.join(" ");
          const key = normalize(phrase);
          if (!key || known.has(key)) return;
          addCandidate(phraseMap, key, phrase, source, sentence);
        };

        // Core light-verb collocation: noun/adjective + infinitive.
        addPhrase([previous, canonicalVerb]);

        // Preserve a small set of productive Persian preposition + noun + light-verb
        // patterns, rather than generating arbitrary sentence fragments.
        if (i >= 2) {
          const prep = normalize(tokens[i - 2]);
          if (["به","از","در","زیر","روی"].includes(prep)) {
            addPhrase([tokens[i - 2], previous, canonicalVerb]);
          }
        }

        // Established three-part idiom/collocation shapes that need a wider window.
        if (i >= 3) {
          const p3 = normalize(tokens[i - 3]);
          const p2 = normalize(tokens[i - 2]);
          const p1 = normalize(tokens[i - 1]);
          if (p3 === "از" && p2 === "کوره" && p1 === "در" && canonicalVerb === "رفتن") {
            addPhrase(["از","کوره","در","رفتن"]);
          }
          if (p3 === "روی" && p2 === "کسی" && p1 === "حساب" && canonicalVerb === "کردن") {
            addPhrase(["روی","کسی","حساب","کردن"]);
          }
          if (p3 === "در" && p2 === "معرض" && p1 === "قرار" && canonicalVerb === "گرفتن") {
            addPhrase(["در","معرض","قرار","گرفتن"]);
          }
          if (p3 === "از" && p2 === "دست" && p1 === "دادن" && canonicalVerb === "دادن") {
            addPhrase(["از","دست","دادن"]);
          }
        }
      }
    }
  }
  sources.push({ source, filename, paragraphs: paragraphs.length });
}

const phrases = [...phraseMap.entries()]
  .filter(([,x]) => x.count >= 2 || x.text.split(/\s+/).length >= 3)
  .map(([normalized,x]) => ({ normalized, phrase:x.text, occurrences:x.count, sources:[...x.sources], contexts:x.contexts }))
  .sort((a,b) => b.occurrences-a.occurrences || a.phrase.localeCompare(b.phrase));
const words = [...tokenMap.entries()]
  .filter(([,x]) => x.count >= 2)
  .map(([normalized,x]) => ({ normalized, word:x.text, occurrences:x.count, sources:[...x.sources], contexts:x.contexts }))
  .sort((a,b) => b.occurrences-a.occurrences || a.word.localeCompare(b.word));

const report = {
  generatedAt: new Date().toISOString(),
  scope: "FA3 OCR pages 2 onward; vocabulary-list page 1 is excluded.",
  method: "Candidate-only scan. Finds repeated unknown Persian tokens and multiword sequences ending in recognized inflected light verbs, normalizes those verbs to infinitives, and compares against the current Term 03 lexicon.",
  limitations: [
    "This is a discovery heuristic, not a Persian morphological parser. It can miss one-off terms and produce phrase fragments.",
    "OCR line breaks, inflection, and sentence segmentation can distort candidates.",
    "Candidates must be checked against the original lesson and must not be added automatically.",
    "A token may be represented as part of an existing phrase; reviewers should check the canonical card and its source links."
  ],
  totals: {
    sourceFilesExpected: 20,
    sourceFilesFound: sources.filter(x => x.filename).length,
    paragraphsScanned: sources.reduce((n,x)=>n+x.paragraphs,0),
    unknownRepeatedWordCandidates: words.length,
    unmatchedPhraseCandidates: phrases.length
  },
  sources,
  words,
  phrases
};

const reportDir = path.join(root, "reports");
fs.mkdirSync(reportDir, { recursive: true });
const jsonPath = path.join(reportDir, "term03-fa3-reading-gap-report.json");
const mdPath = path.join(reportDir, "term03-fa3-reading-gap-report.md");
fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2) + "\n", "utf8");

const lines = [
  "# Term 03 FA3 reading-passage vocabulary candidates",
  "",
  "Generated: " + report.generatedAt,
  "",
  "## Summary",
  "",
  "- OCR files found: " + report.totals.sourceFilesFound + "/20",
  "- Paragraphs scanned (page 2 onward): " + report.totals.paragraphsScanned,
  "- Repeated unknown single-word candidates: " + report.totals.unknownRepeatedWordCandidates,
  "- Unmatched phrase candidates: " + report.totals.unmatchedPhraseCandidates,
  "",
  "## Repeated unknown single-word candidates",
  ""
];
for (const item of words.slice(0, 250)) {
  lines.push("- " + item.word + " — " + item.occurrences + " occurrence(s); " + item.sources.join(", "));
  for (const context of item.contexts.slice(0,2)) lines.push("  - " + context);
}
lines.push("", "## Unmatched phrase candidates", "");
for (const item of phrases.slice(0, 350)) {
  lines.push("- " + item.phrase + " — " + item.occurrences + " occurrence(s); " + item.sources.join(", "));
  for (const context of item.contexts.slice(0,2)) lines.push("  - " + context);
}
lines.push("", "## Method and limitations", "", ...report.limitations.map(x => "- " + x), "");
fs.writeFileSync(mdPath, lines.join("\n"), "utf8");
console.log(JSON.stringify(report.totals, null, 2));
console.log("Wrote " + path.relative(root, jsonPath));
console.log("Wrote " + path.relative(root, mdPath));
