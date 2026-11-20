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
  "term03-fa3-reading-additions-03.js",
  "term03-fa3-reading-additions-04.js"
]) require(path.join(root, "website", file));

const entries = global.TERM3_DATA || [];
if (!entries.length) throw new Error("Term 03 vocabulary did not load");

const normalize = value => String(value || "")
  .normalize("NFKC").replace(/[يى]/g,"ی").replace(/ك/g,"ک")
  .replace(/[\u064B-\u065F\u0670\u0640]/g,"")
  .replace(/[\u200c\sـ]/g,"")
  .replace(/[،؛؟,.!?«»()[\]{}"'"]/g,"").toLowerCase();

const listStopWords = new Set(["از","به","در","و","را","که","با","برای","تا","یا","این","آن","یک","هم","اما","اگر","چون","ما","من","تو","او","همه","هر","هیچ","چه","کدام"]);
const sourceDir = path.join(root,"study-materials/dars/term-03");
const sourceFiles = fs.readdirSync(sourceDir);
const lexiconBySource = new Map();
const lexiconByHeadword = new Map();
for(const item of entries){
 const key=normalize(item.fa); if(!key) continue;
 if(!lexiconByHeadword.has(key)) lexiconByHeadword.set(key,[]);
 lexiconByHeadword.get(key).push(item);
 const refs=Array.from(new Set([item.source,...(item.sources||[])].filter(Boolean)));
 for(const ref of refs){if(!lexiconBySource.has(ref))lexiconBySource.set(ref,new Set());lexiconBySource.get(ref).add(key);}
}

function extractCandidates(raw,family){
 const page1=String(raw).split(/==========\s*PAGE\s*2\s*==========/i)[0];
 let section="";
 let mode="";
 if(family==="SH3"){
  // SH3 page-one vocabulary is enclosed by two dashed separators; the
  // printed vocabulary heading is repeated after the learning objectives.
  const separators=[...page1.matchAll(/^\s*-{2,}\s*$/gm)];
  if(separators.length>=2){
   mode="dashed-vocabulary-block";
   const start=separators[0].index+separators[0][0].length;
   section=page1.slice(start,separators[1].index);
  }else{
   const lesson=/^\s*درس[\s‌]*[^\n]{1,24}/m.exec(page1);
   if(!lesson)return {status:"no_vocabulary_heading",mode:"none",candidates:[]};
   mode="lesson-title-fallback";
   const titleEnd=page1.indexOf("\n",lesson.index+lesson[0].length);
   section=page1.slice(titleEnd<0?lesson.index+lesson[0].length:titleEnd+1);
  }
 }else{
  // KH3 and N3 OCR pages place their lesson vocabulary directly after the
  // lesson title, usually between dashed separators, without a reliable heading.
  const lesson=/^\s*درس[\s‌]*[^\n]{1,24}/m.exec(page1);
  if(!lesson)return {status:"no_vocabulary_heading",mode:"none",candidates:[]};
  mode="lesson-title-before-objectives";
  const titleEnd=page1.indexOf("\n",lesson.index+lesson[0].length);
  section=page1.slice(titleEnd<0?lesson.index+lesson[0].length:titleEnd+1);
 }
 const stopPatterns=[
  /با[\s‌]*خواندن[\s‌]*این[\s‌]*درس/i,
  /اهداف?.{0,8}درس/i,
  /انتظ[اآا]ر[\s‌]*می[\s‌]*رود/i,
  /انتظار[\s‌]*می[\s‌]*رود/i,
  /واژه(?:‌|\s)*ها\s*و\s*(?:اصطلاحات|اصطاحات|اصطلاح)\s*درس/i,
 ];
 let stopIndex=-1;
 for(const pattern of stopPatterns){const match=pattern.exec(section);if(match&&(stopIndex<0||match.index<stopIndex))stopIndex=match.index;}
 if(stopIndex>=0)section=section.slice(0,stopIndex);

 const candidates=new Map();
 for(const line of section.split(/\r?\n/)){
  const cleanedLine=line.replace(/^[\s\d۰-۹٠-٩ـ•\-–—"'«»()]+/,"").replace(/[\s\d۰-۹٠-٩ـ•\-–—"'«»()]+$/,"");
  for(const part of cleanedLine.split(/[،,؛;.»]/)){
   let candidate=part.trim().replace(/^[\s:؛،"'«»()[\]{}]+|[\s:؛،"'«»()[\]{}]+$/g,"").replace(/\s+/g," ").trim();
   const parenthetical=candidate.search(/[()]/);
   if(parenthetical>=0)candidate=candidate.slice(0,parenthetical).trim();
   const key=normalize(candidate);
   if(!key||key.length<2||!/[\u0600-\u06ff]/.test(candidate))continue;
   if(candidate.split(/\s+/).length===1&&listStopWords.has(key))continue;
   if(candidate.length>65||candidate.split(/\s+/).length>8)continue;
   if(/^(واژه|اصطلاحات|جدید|درس|صفحه|اهداف)$/.test(candidate)||/^واژه.{0,18}(اصطلاح|اصطاح).{0,8}درس/.test(candidate))continue;
   if(!candidates.has(key))candidates.set(key,candidate);
  }
 }
 // OCR sometimes wraps a compound expression immediately before its light verb.
 const lightVerbs=new Set(["کردن","شدن","داشتن","گرفتن","دادن","زدن","رفتن","آمدن","بودن","آوردن","بردن","خوردن","کشیدن","رسیدن","گذاشتن","ماندن","پوشیدن","پیچیدن","درآوردن","بیرون‌آمدن","بیرون‌رفتن"]);
 const lines=section.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
 for(let i=0;i<lines.length-1;i++){
  if(/[،,؛;]$/.test(lines[i]))continue;
  const previous=(lines[i].match(/[\u0600-\u06ff]+(?:‌[\u0600-\u06ff]+)*/g)||[]);
  const next=(lines[i+1].match(/[\u0600-\u06ff]+(?:‌[\u0600-\u06ff]+)*/g)||[]);
  if(!previous.length||!next.length)continue;
  const verb=normalize(next[0]);
  if(verb==="کردن"&&/کردن\s*\/\s*شدن/.test(lines[i+1])){
   for(const form of ["کردن","شدن"]){
    const phrase=previous.slice(-1).concat(form).join(" ");
    const key=normalize(phrase);if(key)candidates.set(key,phrase);
   }
   continue;
  }
  if(!lightVerbs.has(verb))continue;
  const last=normalize(previous[previous.length-1]);
  const width= new Set(["قرار","دست","پا","گوش","خود","یاد","نظر","کار","خدمت","اختیار","وجود","به","در","از"]).has(last)?2:1;
  let tail=previous.slice(-width);
  if(width===2&&tail.length===2&&["تحت","پشت","به","در","از"].includes(normalize(tail[0]))&&last==="قرار")tail=previous.slice(-3);
  const phrase=tail.concat(next[0]).join(" ");
  const key=normalize(phrase);if(key)candidates.set(key,phrase);
 }
 return {status:candidates.size?"parsed":"heading_but_no_candidates",mode,candidates:[...candidates].map(([key,text])=>({key,text}))};
}

function editDistance(a,b){
 const m=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));
 for(let i=0;i<=a.length;i++)m[i][0]=i;
 for(let j=0;j<=b.length;j++)m[0][j]=j;
 for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++){
  const cost=a[i-1]===b[j-1]?0:1;
  m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+cost);
  if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])m[i][j]=Math.min(m[i][j],m[i-2][j-2]+1);
 }
 return m[a.length][b.length];
}
function nearMatches(key){
 if(key.length<4)return[];
 const limit=key.length>=6?2:1,candidates=[];
 for(const [known,items] of lexiconByHeadword){
  if(Math.abs(known.length-key.length)>limit)continue;
  const distance=editDistance(key,known);
  if(distance>0&&distance<=limit)candidates.push({headword:items[0].fa,distance,sourceRefs:Array.from(new Set(items.flatMap(x=>[x.source,...(x.sources||[])].filter(Boolean))))});
 }
 return candidates.sort((a,b)=>a.distance-b.distance).slice(0,3);
}

const families=[
 {id:"KH3",limit:20,prefix:n=>"T3_KH3_"+String(n).padStart(2,"0")+"-"},
 {id:"N3",limit:10,prefix:n=>"T3_N3-"+String(n).padStart(2,"0")+"-"},
 {id:"SH3",limit:10,prefix:n=>"T3_SH3_"+String(n).padStart(2,"0")+"-"}
];
const results=[];
for(const family of families){
 for(let lesson=1;lesson<=family.limit;lesson++){
  const suffix=String(lesson).padStart(2,"0");
  const source=family.id+"-"+suffix;
  const filename=sourceFiles.find(name=>name.startsWith(family.prefix(lesson))&&name.endsWith(".txt"));
  if(!filename){results.push({source,family:family.id,filename:null,status:"missing_source_file",candidates:[]});continue;}
  const raw=fs.readFileSync(path.join(sourceDir,filename),"utf8");
  const extracted=extractCandidates(raw,family.id);
  const sourceKeys=lexiconBySource.get(source)||new Set();
  const candidates=extracted.candidates.map(candidate=>{
   const exact=sourceKeys.has(candidate.key);
   const elsewhere=lexiconByHeadword.has(candidate.key);
   const componentKeys=!exact&&candidate.key.length>=4?[...sourceKeys].filter(key=>key.length>=4&&(key.includes(candidate.key)||candidate.key.includes(key))):[];
   const component=componentKeys.length>0;
   const matches=exact?lexiconByHeadword.get(candidate.key):elsewhere?lexiconByHeadword.get(candidate.key):componentKeys.flatMap(key=>lexiconByHeadword.get(key)||[]);
   const suggestions=exact||elsewhere||component?[]:nearMatches(candidate.key);
   const mapped=suggestions.find(item=>item.sourceRefs.includes(source));
   return {
    text:candidate.text,normalized:candidate.key,
    status:exact?"covered_in_source":component?"covered_as_component":elsewhere?"present_elsewhere_check_source_link":mapped?"covered_via_ocr_variant":suggestions.length?"possible_ocr_variant":"unmatched_review",
    existingHeadwords:matches.slice(0,5).map(item=>item.fa),nearMatches:suggestions
   };
  });
  results.push({source,family:family.id,filename,status:extracted.status,extractionMode:extracted.mode,candidateCount:candidates.length,candidates});
 }
}

const totals={term:"03",families:["KH3","N3","SH3"],sourceFilesExpected:40,sourceFilesFound:results.filter(x=>x.filename).length,listsParsed:results.filter(x=>x.status==="parsed").length,candidates:results.reduce((n,x)=>n+(x.candidates||[]).length,0),coveredInSource:0,coveredAsComponent:0,coveredViaOcrVariant:0,presentElsewhereCheckSourceLink:0,possibleOcrVariant:0,unmatchedReview:0};
for(const result of results)for(const c of result.candidates||[]){
 if(c.status==="covered_in_source")totals.coveredInSource++;
 else if(c.status==="covered_as_component")totals.coveredAsComponent++;
 else if(c.status==="covered_via_ocr_variant")totals.coveredViaOcrVariant++;
 else if(c.status==="present_elsewhere_check_source_link")totals.presentElsewhereCheckSourceLink++;
 else if(c.status==="possible_ocr_variant")totals.possibleOcrVariant++;
 else totals.unmatchedReview++;
}
const report={
 generatedAt:new Date().toISOString(),
 method:"First-page vocabulary-list extraction for KH3/N3/SH3. When a vocabulary heading exists it is used; for KH3/N3 pages without a heading, the lesson-title section before the learning objectives is used. Candidates are compared with the full Term 03 lexicon and source links.",
 limitations:[
  "OCR candidates are not approved vocabulary and must be reviewed against the original lesson.",
  "KH3/N3 lists without explicit headings are extracted from the section between the lesson title and learning objectives; this may include OCR noise.",
  "A candidate present elsewhere but not linked to this lesson needs source-mapping review, not automatic duplication.",
  "A phrase component may be represented by a longer source-linked canonical phrase."
 ],
 totals,
 sources:results
};
const reportDir=path.join(root,"reports");fs.mkdirSync(reportDir,{recursive:true});
const jsonPath=path.join(reportDir,"term03-kh3-n3-sh3-page1-gap-report.json");
const mdPath=path.join(reportDir,"term03-kh3-n3-sh3-page1-gap-report.md");
fs.writeFileSync(jsonPath,JSON.stringify(report,null,2)+"\n","utf8");
const lines=[
 "# Term 03 KH3/N3/SH3 first-page vocabulary gap report","",
 "Generated: "+report.generatedAt,"",
 "## Summary","",
 "- OCR files found: "+totals.sourceFilesFound+"/40",
 "- Vocabulary lists parsed: "+totals.listsParsed+"/40",
 "- Extracted candidates: "+totals.candidates,
 "- Exact matches in the same source: "+totals.coveredInSource,
 "- Phrase-component coverage: "+totals.coveredAsComponent,
 "- OCR variants mapped to reviewed canonical cards: "+totals.coveredViaOcrVariant,
 "- Present elsewhere; source link needs review: "+totals.presentElsewhereCheckSourceLink,
 "- Possible OCR variants: "+totals.possibleOcrVariant,
 "- Unmatched candidates requiring human review: "+totals.unmatchedReview,"",
 "## Source-by-source results",""
];
for(const result of results){
 lines.push("### "+result.source+" — "+result.status,"");
 if(!result.filename){lines.push("Source file not found.");}
 else{
  lines.push("OCR file: "+result.filename,"Extraction mode: "+result.extractionMode,"");
  for(const c of result.candidates){
   lines.push("- ["+c.status+"] "+c.text);
   if(c.existingHeadwords.length)lines.push("  - Existing canonical entry: "+c.existingHeadwords.join("، "));
   if(c.nearMatches.length)lines.push("  - Possible OCR matches: "+c.nearMatches.map(x=>x.headword+" (distance "+x.distance+")").join("، "));
  }
 }
 lines.push("");
}
lines.push("## Method and limitations","",...report.limitations.map(x=>"- "+x),"");
fs.writeFileSync(mdPath,lines.join("\n"),"utf8");
console.log(JSON.stringify(totals,null,2));
console.log("Wrote "+path.relative(root,jsonPath));
console.log("Wrote "+path.relative(root,mdPath));
