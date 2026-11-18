/* Audit meaningful Persian words in Newestan, Khulasa and Sukhanrani text.
   Every token must resolve to an exact card, a reviewed alternate form, or an explicit function-word ignore. */
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
global.window=global;
global.localStorage={getItem:()=>null,setItem:()=>{}};
const root=path.resolve(__dirname,"..");
const load=p=>require(path.join(root,p));
[
 "website/term01-data.js","website/term01-chapters-11-15.js","website/term01-chapters-16-20.js","website/term01-supplementary.js","website/term01-amr-verbs.js",
 "website/term02-data.js","website/term02-lexicon-additions.js",
 "website/term03-data.js","website/term03-lexicon-additions.js","website/term03-matn-verbs.js","website/term03-source-audit.js","website/term03-page1-additions.js","website/term03-chapter-mapping.js",
 "website/newestan-lexicon-additions.js",
 "website/newestan-writing-library.js","website/newestan-language-lessons.js","website/term03-newestan-insha.js","website/term03-newestan-teaching.js","website/term03-newestan-final-insha.js",
 "website/term02-khulasa.js","website/term03-khulasa.js","website/term02-speeches.js","website/term03-speeches.js"
].forEach(load);
const index=fs.readFileSync(path.join(root,"website/index.html"),"utf8");
const aliasMatch=index.match(/const curatedVocabAliases\s*=\s*(\{[\s\S]*?\n\});/);
if(!aliasMatch)throw new Error("Cannot read reviewed alternate-form list from the shared linker");
const aliases=vm.runInNewContext("("+aliasMatch[1].slice(0,-1)+")");
const fold=t=>String(t).normalize("NFD").replace(/[\u0300-\u036f\u064b-\u065f\u0670\u200c]/g,"").replace(/\u06c0/g,"\u0647").replace(/\u064a/g,"\u06cc").replace(/\u0643/g,"\u06a9").toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]/g,"").replace(/ee/g,"i").replace(/oo/g,"u").replace(/u/g,"o").replace(/w/g,"v").replace(/gh/g,"q");
const exact=new Set(),aliasSet=new Set();
const books=[global.TERM1_DATA||[],global.TERM2_DATA||[],global.TERM3_DATA||[]];
for(const rows of books)for(const row of rows)if(row.fa)exact.add(fold(row.fa));
for(const [head,forms] of Object.entries(aliases))for(const form of forms)aliasSet.add(fold(form));
const ignored=new Set((
 "و یا هم نیز اما ولی چون تا که اگر در به از با را برای بر ازآن آن این آن‌ها این‌ها او وی من تو ما شما ایشان آنها خود خودم خودت خودش خودمان خودتان خودشان هر همه بعضی یک یکی چند هیچ چه کدام همان همین همان‌طور چنین چنان است هست هستند بود بودند باشد باشند شود می‌شود می‌شوند می‌باشد می‌باشند می‌کنم می‌کند می‌کنند می‌کرد می‌کردند نمی نه نا را که تا ای ای‌که زیرا چون اما ولی پس سپس فقط نیز حتی دیگر دیگران بیشتر کمتر بسیار خیلی کمی زیاد کم همهٔ همه‌ی هرگز همیشه گاهی اکنون امروز دیروز فردا امسال پارسال سال ماه روز ساعت وقت زمان هنگام قبل بعد پیش پس همان آنجا اینجا آنجا اینجا کجا چگونه چرا آیا اگر چه هرچند مگر مگرنه البته بله خیر بااین‌حال به‌خاطر به‌دلیل ازاینرو بدین جهت دراین درآن ازآن بهآن"
).split(/\s+/).map(fold));
const roots=[
 ["Term 01/02 Newestan",global.NEWESTAN_WRITING_LIBRARY],
 ["Term 03 Newestan teaching",global.TERM3_NEWESTAN_TEACHING],
 ["Term 03 Newestan final Insha",global.TERM3_NEWESTAN_FINAL_INSHA],
 ["Newestan Biyamoozim",global.NEWESTAN_LANGUAGE_LESSONS],
 ["Term 02 Khulasa",global.TERM2_KHULASA],
 ["Term 03 Khulasa",global.TERM3_KHULASA],
 ["Term 02 Sukhanrani",global.TERM2_SPEECHES],
 ["Term 03 Sukhanrani",global.TERM3_SPEECHES]
];
const texts=[];
function walk(value,label,field=""){
 if(typeof value==="string"){
  const persianField=/^(fa|.*Fa|prompt|title|modelText|model|sample|assignment|lines|topic|action|steps|subtopics|practice|meaning|keywords|abstract|muqaddama|band1|band2|natija|sourceNote|note)$/i.test(field);
  if((/[\u067e\u0686\u0698\u06af\u06a9\u06cc]/.test(value)||persianField)&&!/(ar|arabic|translationAr)$/i.test(field))texts.push({label,text:value});
 }else if(Array.isArray(value))value.forEach((v,i)=>walk(v,label+"["+i+"]",field));
 else if(value&&typeof value==="object")for(const [k,v] of Object.entries(value))walk(v,label+"."+k,k);
}
for(const [label,data] of roots)walk(data,label);
const tokenRe=/[\u0600-\u06ff\u200c]+/g,unmatched=new Map();let total=0,matched=0,ignoredCount=0;
const maxWords=Math.max(1,...[...exact,...aliasSet].map(x=>x.split("").length)); // phrase matching uses tokens below; bounded by 6.
for(const item of texts){
 const tokens=item.text.match(tokenRe)||[];
 for(let i=0;i<tokens.length;){
  let hit=0;
  for(let n=Math.min(6,tokens.length-i);n>=1;n--){
   const key=fold(tokens.slice(i,i+n).join(""));
   if(exact.has(key)||aliasSet.has(key)){hit=n;break}
  }
  if(hit){matched++;total++;i+=hit;continue}
  const word=tokens[i],key=fold(word);total++;
  if(ignored.has(key)){ignoredCount++;i++;continue}
  if(key.length<2){ignoredCount++;i++;continue}
  const rec=unmatched.get(key)||{word, count:0, contexts:[]};rec.count++;
  if(rec.contexts.length<3)rec.contexts.push(item.label+": "+item.text.slice(0,110));
  unmatched.set(key,rec);i++;
 }
}
const missing=[...unmatched.values()].sort((a,b)=>b.count-a.count);
console.log("Newestan/Khulasa/Sukhanrani Persian-token coverage: "+matched+" matched groups, "+ignoredCount+" explicitly ignored function tokens, "+missing.length+" unmatched headwords across "+total+" token groups.");
console.log("New card additions loaded: "+(global.TERM_NEWESTAN_VOCAB_ADDED||0));
if(missing.length)console.log("Unmatched meaningful tokens (review, add card or explicit ignore):\n"+missing.map(x=>x.word+" ×"+x.count+" | "+x.contexts.join(" || ")).join("\n"));
if(missing.length)throw new Error(missing.length+" meaningful Persian tokens have no card, reviewed alias or explicit ignore.");
