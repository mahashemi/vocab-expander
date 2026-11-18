const assert=require("node:assert/strict");
const path=require("node:path");
global.window=global;
global.activeTerm=1;
global.localStorage={getItem:()=>null,setItem:()=>{}};
global.esc=value=>String(value??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/\x27/g,"&#39;");
require("../website/newestan-writing-library.js");
require("../website/newestan-writing-ui.js");
require("../website/term03-chapter-mapping.js");
require("../website/term03-newestan-insha.js");
require("../website/term03-newestan-teaching.js");
require("../website/newestan-language-lessons.js");
require("../website/term03-newestan-final-insha.js");
require("../website/term03-newestan-standalone.js");
const library=global.NEWESTAN_WRITING_LIBRARY;
assert.deepEqual(Object.keys(library).sort(),["1","2"]);
for(const term of [1,2]){
 const rows=library[term];
 assert.equal(rows.length,10,"Term "+term+" must contain ten Newestan lessons");
 assert.deepEqual(rows.map(x=>x.no),Array.from({length:10},(_,i)=>i+1));
 for(const row of rows){
  for(const field of ["title","source","prompt","promptEn","skill","steps","subtopics"])assert(row[field],"Missing "+field+" in Term "+term+" Dars "+row.no);
  assert(row.steps.length>=3,"Insufficient writing steps: "+term+"/"+row.no);
  assert(row.subtopics.length>=3,"Insufficient supporting subtopics: "+term+"/"+row.no);
  if(row.model){
   for(const field of ["muqaddama","band1","band2","natija"])assert(row.model[field],"Incomplete three-part model: "+term+"/"+row.no+"/"+field);
  }else{
   assert(row.modelText&&row.format,"Non-essay genre must have a model and format: "+term+"/"+row.no);
  }
 }
}
assert.equal(library[1][2].prompt,"با توجه به تصویرها، خانهٔ پدربزرگ پروین را در متن توصیف کنید.");
assert.equal(library[1][4].prompt,"با استفاده از واژه‌های بالا دربارهٔ برنامه و امکانات هتل انشا بنویسید.");
assert.equal(library[1][5].prompt,"دربارهٔ سفر به یک مکان تاریخی یا زیارتی انشایی بنویسید.");
assert.equal(library[1][6].prompt,"با استفاده از واژه‌های بالا انشایی دربارهٔ خرید از بازار بنویسید.");
assert.equal(library[1][7].prompt,"دربارهٔ پختن یک غذای ایرانی یا غذای کشورتان انشا بنویسید.");
assert.equal(library[1][8].prompt,"دربارهٔ یک جشن (مراسم عید) در کشور خود یا کشور دیگر انشایی بنویسید.");
assert.equal(library[1][9].prompt,"با استفاده از واژه‌های بالا انشایی دربارهٔ آب‌وهوای کشور خود بنویسید.");
assert.equal(library[2][2].prompt,"شرح حالی از بیماری خود یا یکی از اعضای خانواده‌تان بنویسید.");
assert.equal(library[2][3].prompt,"۱) با استفاده از مدل خورشیدی دربارهٔ یک مکان تاریخی ایران که به آن سفر کرده‌اید انشایی بنویسید. ۲) دربارهٔ یک مکان تاریخی کشور خود نیز انشایی بنویسید.");
assert.equal(library[2][6].prompt,"یکی از اتفاق‌هایی را که هنگام رانندگی برای خودتان یا دوستتان افتاده است، بنویسید.");
assert.equal(library[2][7].prompt,"دربارهٔ روش پختن یکی از غذاهای خوشمزهٔ کشورتان به صورت پلکانی انشایی بنویسید.");
assert.equal(library[2][9].format,"letter");
const t3=global.TERM3_NEWESTAN_TEACHING;
assert.equal(Object.keys(t3).length,10,"Term 03 must have ten lesson teaching records");
for(let i=1;i<=9;i++){
 const row=t3["N3-"+String(i).padStart(2,"0")];
 assert(row&&row.skill&&row.steps?.length>=3&&row.subtopics?.length>=3&&row.model,"Missing structured Term 03 essay model for N3-"+String(i).padStart(2,"0"));
 for(const field of ["muqaddama","band1","band2","natija"])assert(row.model[field],"Incomplete Term 03 model: N3-"+i+"/"+field);
}
assert(t3["N3-10"].skill.includes("Research writing"),"N3-10 must retain research-writing genre");
const bio=t3["N3-02"];
assert(bio.model.muqaddama.includes("علامه سید محمدحسین طباطبایی"),"Dars 02 model must be about Allameh Tabataba'i");
assert(bio.model.band1.includes("۱۳۰۴")&&bio.model.band1.includes("۱۳۱۳"),"Dars 02 model must include key education and return dates");
assert(bio.model.band2.includes("المیزان")&&bio.model.band2.includes("۲۴ آبان ۱۳۶۰"),"Dars 02 model must include major work and death date");
assert(bio.timeline.length>=5,"Dars 02 must provide a chronological timeline");
assert.equal(bio.examRubric.reduce((sum,x)=>sum+x.points,0),20,"Dars 02 rubric must total 20 points");
assert(bio.examRubric.some(x=>x.points===6&&x.label==="زبان"),"Dars 02 rubric must retain the 6-point language criterion");
assert(bio.steps.some(x=>x.includes("بند دوم")),"Dars 02 steps must explain the middle section");
for(let i=1;i<=10;i++){
 const row=t3["N3-"+String(i).padStart(2,"0")];
 assert(row.bilingual?.en&&row.bilingual?.ar,"Term 03 lesson must include English and Arabic explanation: N3-"+i);
}
assert(t3["N3-07"].skill.includes("short- and long-term planning"),"Dars 07 must teach planning, not be reduced to trip planning");
assert(t3["N3-07"].model.band2.includes("روز هفتم"),"Dars 07 trip model must cover the full one-week itinerary");
assert(t3["N3-06"].modelInternet?.band2,"Dars 06 must model the internet benefits/harms prompt as well as book critique");



const language=global.NEWESTAN_LANGUAGE_LESSONS;
for(let term=1;term<=3;term++)for(let lesson=1;lesson<=10;lesson++){
 const row=language?.[term]?.[lesson];
 assert(row&&row.sections&&row.sections.length>0,"Missing Biyamoozim language lesson for Term "+term+" Dars "+lesson);
}
const has=(term,lesson,needle)=>language[term][lesson].sections.some(section=>section.fa.includes(needle));
assert(has(3,2,"ترتیبی")&&has(3,2,"هم‌زمانی")&&has(3,2,"ارجاعی")&&has(3,2,"انجامی"),"Term 03 Dars 02 must teach all four textbook temporal-link relations");
assert(has(1,4,"ضمیر پیوسته")&&has(1,5,"جمع با ـان"),"Term 01 pronoun and plural lessons must include the bottom-page Biyamoozim rules");
assert(has(2,1,"تبدیل فعل گفتاری")&&has(2,2,"چهار نوع جمله")&&has(2,5,"حروف ربط مرکب")&&has(2,10,"نقطه‌ویرگول"),"Term 02 language lessons must include spoken/written forms, sentence types, compound links and punctuation");
assert(has(3,3,"گذشتهٔ بعید")&&has(3,5,"اندام‌های جمع")&&has(3,8,"شش گام خلاصه")&&has(3,9,"نوشتار علمی")&&has(3,10,"مراحل سازمان‌دهی تحقیق"),"Term 03 must include the source-specific grammar, summary and research lessons");

const index=require("node:fs").readFileSync(path.join(__dirname,"../website/index.html"),"utf8");
for(const script of ["newestan-writing-library.js","newestan-writing-ui.js","term03-newestan-teaching.js","term03-newestan-teaching-ui.js"])assert(index.includes(script),"Missing script include: "+script);
assert(index.includes("window.renderNewestanTerm1()"),"Term 01 Newestan view is not wired");
assert(index.includes("if(activeTerm===1||activeTerm===2){v.innerHTML=window.renderNewestanTerm1();window.bindNewestanWorkshop();return}"),"Term 01/02 Newestan view is not wired");
assert(index.includes("window.renderTerm3LessonTeaching(lesson)"),"Term 03 lesson teaching is not wired");
assert(!index.includes("پس از تطبیق کامل با درس‌های منبع"),"Term 01 placeholder must be removed");
assert(index.includes("if(activeTerm===1||activeTerm===2){v.innerHTML=window.renderNewestanTerm1();window.bindNewestanWorkshop();return}"),"Terms 01 and 02 Newestan tabs must be standalone");
assert(index.includes("if(activeTerm===3){v.innerHTML=window.renderNewestanTerm3();window.bindNewestanTerm3();return}"),"Term 03 Newestan tab must be standalone");
const term03Ui=require("node:fs").readFileSync(path.join(__dirname,"../website/term03-newestan-standalone.js"),"utf8");
const term12Ui=require("node:fs").readFileSync(path.join(__dirname,"../website/newestan-writing-ui.js"),"utf8");
assert(term03Ui.includes("newestan-lesson-picker")&&term12Ui.includes("newestan-lesson-picker"),"All Newestan terms must use the prominent lesson navigator");
assert(term03Ui.includes("attachVocabularyLinks(scope)")&&term12Ui.includes("attachVocabularyLinks(scope)"),"All Newestan model answers must link matching vocabulary to shared flashcards");
assert(index.includes("function attachVocabularyLinks(scope)"),"Shared exact-match vocabulary linker must be available");
assert(index.includes("function ensureVocabularyModal(scope)"),"Shared trilingual flashcard modal must be available");
assert(index.includes("data-vocab-id"),"Vocabulary links must use the shared flashcard identity");
assert(index.includes('attachVocabularyLinks(v.querySelector(".khulasa-page"))'),"Khulasa must use the shared vocabulary linker");
assert(index.includes('attachVocabularyLinks(v.querySelector(".writing-wrap"))'),"Sukhanrani must use the shared vocabulary linker");
assert(index.includes("reviewedPersianSuffixes"),"Reviewed Persian inflection forms must be available to the linker");
assert(index.includes("meaning-ar")&&index.includes("arMeaning"),"Shared flashcards must display Arabic semantic meanings");


assert.equal(typeof global.renderNewestanTerm3,"function","Term 03 standalone renderer must be available");
assert.equal(typeof global.bindNewestanTerm3,"function","Term 03 standalone selector must be wired");
assert.equal(Object.keys(global.TERM3_NEWESTAN_INSHA).length,10,"Term 03 source prompt library must contain all ten lessons");
assert(index.includes('<script src="newestan-language-lessons.js"></script>'),"OCR-based language lesson module must load");
for(let term=1;term<=3;term++)for(let i=1;i<=10;i++){
 const lesson=global.NEWESTAN_LANGUAGE_LESSONS?.[term]?.[i];
 assert(lesson&&lesson.source&&lesson.sections?.length>=1,"Missing source-based Biyamoozim lesson: Term "+term+" Dars "+i);
 for(const rule of lesson.sections)assert(rule.fa&&rule.en&&rule.ar&&rule.whenEn&&rule.whenAr&&rule.exampleFa&&rule.exampleEn&&rule.exampleAr,"Incomplete trilingual language rule: Term "+term+" Dars "+i);
}

for(let i=1;i<=10;i++){
 const html=global.renderNewestanTerm3(i);
 assert(html.includes("N3-"+String(i).padStart(2,"0")),"Term 03 lesson failed to render: "+i);
 assert(html.includes("Choose a Newestan lesson"),"Term 03 lesson selector missing: "+i);
 assert(html.includes("Textbook exercise")||html.includes("Research topics"),"Term 03 exercise missing: "+i);
  assert(html.includes("BIYĀMOZĪM"),"Term 03 Biyamoozim language lesson missing: "+i);
}
for(const term of [1,2]){
 global.activeTerm=term;
 for(let i=1;i<=10;i++){
  const html=term===1?global.renderNewestanTerm1(i):global.renderNewestanWorkshop(i);
  assert(html.includes("DARS "+String(i).padStart(2,"0")),"Term "+term+" Newestan lesson failed to render: "+i);
  assert(html.includes("Textbook exercise")||html.includes("تمرین واقعی درس"),"Term "+term+" exercise missing: "+i);
   assert(html.includes("BIYĀMOZĪM"),"Term "+term+" Biyamoozim language lesson missing: "+i);
 }
}
global.activeTerm=3;

assert(index.includes('<script src="term03-newestan-standalone.js"></script>'),"Term 03 standalone Newestan UI must load");
assert(index.includes("if(activeTerm===3){v.innerHTML=window.renderNewestanTerm3();window.bindNewestanTerm3();return}"),"Term 03 must return before the FA writing renderer");
console.log(JSON.stringify({term01:library[1].length,term02:library[2].length,term03:Object.keys(t3).length,term03Lessons:10,term03ResearchLessons:1},null,2));