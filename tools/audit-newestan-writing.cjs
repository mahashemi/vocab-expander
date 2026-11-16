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
assert(index.includes('const lessons=activeTerm===3&&window.term3InshaForChapter?window.term3InshaForChapter(essayCh):[];'),"Term 03 chapter mapping must remain term-specific");
assert.deepEqual(global.term3InshaForChapter(3).map(x=>x.lesson),["N3-01","N3-07"]);
assert.deepEqual(global.term3InshaForChapter(16).map(x=>x.lesson),["N3-06","N3-09"]);
assert.deepEqual(global.term3InshaForChapter(20).map(x=>x.lesson),["N3-02","N3-10"]);
console.log(JSON.stringify({term01:library[1].length,term02:library[2].length,term03:Object.keys(t3).length,term03Essays:9,term03ResearchLessons:1},null,2));