#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
global.window=global;
for(const file of ["newestan-language-lessons.js","newestan-writing-library.js","term03-newestan-insha.js","term03-newestan-teaching.js","term03-newestan-final-insha.js"]){
 require(path.join(root,"website",file));
}
const language=global.NEWESTAN_LANGUAGE_LESSONS;
const writing=global.NEWESTAN_WRITING_LIBRARY;
const t3Prompts=global.TERM3_NEWESTAN_INSHA;
const t3Teaching=global.TERM3_NEWESTAN_TEACHING;
const t3Final=global.TERM3_NEWESTAN_FINAL_INSHA;
assert(language&&writing&&t3Prompts&&t3Teaching&&t3Final,"Newestan source-linked content modules did not load");
const rows=[];
for(let term=1;term<=3;term++){
 const dir=path.join(root,"study-materials","dars","term-0"+term);
 const files=fs.readdirSync(dir);
 for(let no=1;no<=10;no++){
  const id="N"+term+"-"+String(no).padStart(2,"0");
  const prefix="T"+term+"_N"+term+"_"+String(no).padStart(2,"0")+"-";
  const sourceFile=files.find(name=>name.startsWith(prefix)&&name.endsWith(".txt"));
  assert(sourceFile,"Missing original OCR source for "+id);
  const raw=fs.readFileSync(path.join(dir,sourceFile),"utf8");
  assert(raw.length>500,"OCR source unexpectedly short for "+id);
  const lesson=(language[term]||{})[no];
  assert(lesson,"Missing Biyāmozīm teaching record for "+id);
  assert(String(lesson.source||"").includes(id),"Biyāmozīm source reference mismatch for "+id);
  assert(lesson.titleFa&&lesson.titleEn&&lesson.titleAr&&lesson.overviewEn&&lesson.overviewAr,"Incomplete trilingual lesson overview for "+id);
  assert(Array.isArray(lesson.sections)&&lesson.sections.length>=2,"Missing lesson-specific language teaching points for "+id);
  for(const section of lesson.sections){
   for(const field of ["fa","en","ar","whenEn","whenAr"])assert(section[field],"Missing "+field+" in "+id);
  }
  let prompt="",genre="",modelReady=false,notes="";
  if(term<3){
   const rec=(writing[term]||[]).find(x=>Number(x.no)===no);
   assert(rec,"Missing source-linked writing workshop for "+id);
   assert(String(rec.source||"").includes("T"+term+"_N"+term+"_"+String(no).padStart(2,"0")),"Writing workshop source mismatch for "+id);
   assert(rec.prompt&&rec.promptEn&&rec.skill,"Missing writing prompt or teaching skill for "+id);
   assert(Array.isArray(rec.steps)&&rec.steps.length>=3,"Missing staged writing method for "+id);
   assert(Array.isArray(rec.subtopics)&&rec.subtopics.length>=3,"Missing exam-relevant supporting subtopics for "+id);
   modelReady=!!(rec.model&&(rec.model.muqaddama&&rec.model.band1&&rec.model.band2&&rec.model.natija)||rec.modelText);
   assert(modelReady,"Missing developed model response for "+id);
   prompt=rec.prompt;
   genre=rec.format||"guided essay";
   if(term===1&&no===9){notes="OCR of the source exercise is damaged; the workshop explicitly limits its guidance to the readable celebration prompt."}
   if(term===2&&no===2){notes="The OCR also includes a sports-registration form activity; keep this distinct from the biography-writing task."}
  }else{
   const rec=t3Prompts[id],teach=t3Teaching[id];
   assert(rec&&teach,"Missing Term 03 prompt/teaching record for "+id);
   assert(String(rec.source||"").includes(id),"Term 03 prompt source mismatch for "+id);
   assert(teach.skill&&Array.isArray(teach.steps)&&teach.steps.length>=3,"Missing Term 03 writing method for "+id);
   assert(Array.isArray(teach.subtopics)&&teach.subtopics.length>=3,"Missing Term 03 exam-relevant subtopics for "+id);
   if(no===10){
    assert(rec.researchForm===true&&Array.isArray(rec.exampleResearchTopics)&&t3Final.source.includes(id),"N3-10 must remain a research project, not a generic essay.");
    assert(t3Final.muqaddama&&t3Final.band1&&t3Final.band2&&t3Final.natija,"Missing complete N3-10 research model");
    prompt="Research form: topic, main question, subquestions";
    genre="research project";
    notes="Separate research-writing path; includes research questions, references, abstract and 5–8 keywords.";
   }else{
    assert(Array.isArray(rec.topics)&&rec.topics.length>0,"Missing actual OCR writing topics for "+id);
    assert(teach.model&&teach.model.muqaddama&&teach.model.band1&&teach.model.band2&&teach.model.natija,"Missing developed model response for "+id);
    prompt=rec.topics.map(x=>x.fa).join(" / ");
    genre="guided essay";
    modelReady=true;
   }
   if(no===2||no===7)notes=notes?notes+" OCR caution recorded in chapter guide.":"OCR caution recorded in chapter guide; uncertain source fragments are not silently reconstructed.";
  }
  rows.push({term,id,sourceFile,sourceRef:lesson.source,title:lesson.titleEn,genre,prompt,modelReady,ocrChars:raw.length,notes});
 }
}
const ui=fs.readFileSync(path.join(root,"website","newestan-writing-ui.js"),"utf8");
const order=["Writing skill taught in this lesson","renderNewestanLanguageLesson","Textbook exercise","Supporting subtopics","Writing steps","+rubric+","'<details open><summary><b>Model response"];
let previous=-1;
for(const marker of order){const index=ui.indexOf(marker);assert(index>previous,"Writing workshop order is incomplete or misplaced at "+marker);previous=index;}
const standalone=fs.readFileSync(path.join(root,"website","term03-newestan-standalone.js"),"utf8");
for(const marker of ["renderNewestanLanguageLesson","Textbook exercise","Writing skill from Biyāmozīm","researchForm","Your own writing"])assert(standalone.includes(marker),"Term 03 standalone is missing "+marker);
assert.equal(rows.length,30);
console.log(JSON.stringify({status:"PASS",chapters:rows.length,byTerm:[1,2,3].map(term=>({term,count:rows.filter(x=>x.term===term).length})),sourceOCRFiles:rows.length,sourceLinkedLanguageLessons:rows.length,sourceLinkedWritingTasks:rows.length,completeModelResponses:rows.filter(x=>x.modelReady).length,ocrCautions:rows.filter(x=>x.notes).map(x=>({id:x.id,note:x.notes})),crosswalk:rows.map(x=>({id:x.id,source:x.sourceFile,teaching:x.title,genre:x.genre,prompt:x.prompt,notes:x.notes}))},null,2));
