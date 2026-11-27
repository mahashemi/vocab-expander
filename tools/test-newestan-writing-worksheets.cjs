#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict");
global.window=global;
global.esc=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const store=new Map();
global.localStorage={getItem:key=>store.get(key)||null,setItem:(key,value)=>store.set(key,value)};
require("../website/newestan-writing-worksheets.js");
const data=global.NEWESTAN_WRITING_WORKSHEETS;
assert(data,"Worksheet registry missing");
for(const term of [1,2]){
 assert.equal(data[term].length,10,"Term "+term+" must have ten worksheets");
 for(const lesson of data[term]){
  assert(lesson.titleFa&&lesson.titleEn,"Missing bilingual worksheet title for T"+term+"-"+lesson.no);
  assert(lesson.fields.length>=4,"Too few worksheet prompts for T"+term+"-"+lesson.no);
  assert.equal(new Set(lesson.fields.map(x=>x.id)).size,lesson.fields.length,"Duplicate worksheet field IDs");
  for(const field of lesson.fields)assert(field.labelFa&&field.labelEn&&field.hint,"Incomplete bilingual field in T"+term+"-"+lesson.no);
  const html=global.renderNewestanWritingWorksheet(term,lesson.no);
  assert(html.includes("SUPPLEMENTARY PRACTICE")&&html.includes("not a verbatim reproduction"),"Worksheet disclaimer missing");
  assert(html.includes("data-newestan-worksheet-field"),"Worksheet inputs are not wired for persistence");
 }
}
const first=global.renderNewestanWritingWorksheet(1,1);
assert(first.includes('newestan-ws-1-1-family'));
const second=global.renderNewestanWritingWorksheet(2,2);
assert(second.includes('newestan-ws-2-2-person'));
assert.equal(global.renderNewestanWritingWorksheet(3,1),"","Term 03 must continue using its dedicated chapter worksheets.");
console.log("PASS: twenty bilingual, source-aligned Term 01/02 Newestan worksheets; all fields and supplementary-practice disclaimers validated.");
