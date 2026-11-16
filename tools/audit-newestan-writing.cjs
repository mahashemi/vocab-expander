const assert=require("node:assert/strict");
const path=require("node:path");
global.window=global;
require("../website/newestan-writing-library.js");
require("../website/term03-chapter-mapping.js");
require("../website/term03-newestan-insha.js");
require("../website/term03-newestan-teaching.js");
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
const index=require("node:fs").readFileSync(path.join(__dirname,"../website/index.html"),"utf8");
for(const script of ["newestan-writing-library.js","newestan-writing-ui.js","term03-newestan-teaching.js","term03-newestan-teaching-ui.js"])assert(index.includes(script),"Missing script include: "+script);
assert(index.includes("window.renderNewestanTerm1()"),"Term 01 Newestan view is not wired");
assert(index.includes("window.renderNewestanWorkshop()"),"Term 02 Newestan view is not wired");
assert(index.includes("window.renderTerm3LessonTeaching(lesson)"),"Term 03 lesson teaching is not wired");
assert(!index.includes("پس از تطبیق کامل با درس‌های منبع"),"Term 01 placeholder must be removed");
assert(index.includes("if(activeTerm===1||activeTerm===2){v.innerHTML=window.renderNewestanTerm1();window.bindNewestanWorkshop();return}"),"Terms 01 and 02 Newestan tabs must be standalone");
assert(index.includes("if(activeTerm===3){v.innerHTML=window.renderNewestanTerm3();window.bindNewestanTerm3();return}"),"Term 03 Newestan tab must be standalone");
assert(index.includes('<script src="term03-newestan-standalone.js"></script>'),"Term 03 standalone Newestan UI must load");
assert(!index.includes("term3InshaForChapter(essayCh)"),"Newestan tab must not be filtered by FA chapter mappings");
console.log(JSON.stringify({term01:library[1].length,term02:library[2].length,term03:Object.keys(t3).length,term03Essays:9,term03ResearchLessons:1},null,2));