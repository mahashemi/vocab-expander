#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
require("../website/learning/identity.js");
require("../website/learning/manifest.js");
const rows=[
 {id:"1|1|FA1-01|کتاب",bk:1,ch:1,fa:"کتاب",tr:"ketāb",en:"book",pos:"اسم — noun",source:"FA1-01",sources:["FA1-01"],xf:"کتاب روی میز است.",xt:"Ketāb ru-ye miz ast.",xe:"The book is on the table.",acceptedForms:["کتاب‌ها"]},
 {id:"2|2|FA2-02|کتاب",bk:2,ch:2,fa:"کتاب",tr:"ketāb",en:"book",pos:"اسم — noun",source:"FA2-02",sources:["FA2-02"],extraExamples:[{fa:"کتاب را بخوان.",transliteration:"Ketāb rā bekhān.",en:"Read the book."}],variants:["کتاب"]},
 {id:"3|3|FA3-03|کتاب",bk:3,ch:3,fa:"کتاب",tr:"ketāb",en:"volume; book as a bound work",pos:"اسم — noun",source:"FA3-03",sources:["FA3-03"]},
 {id:"3|4|FA3-04|در نتیجه",bk:3,ch:4,fa:"در نتیجه",tr:"dar natije",en:"as a result",pos:"قید — adverb",source:"FA3-04",sources:["FA3-04"]},
 {id:"2|5|FA2-05|تماس گرفتن",bk:2,ch:5,fa:"تماس گرفتن",tr:"tamās gereftan",en:"to call",pos:"فعل مرکب — compound verb",source:"FA2-05",sources:["FA2-05"],ms:"تماس گرفتن",amr:"تماس بگیر"},
 {id:"3|5|FA3-05|تماس گرفتن",bk:3,ch:5,fa:"تماس گرفتن",tr:"tamās gereftan",en:"to call",pos:"فعل مرکب — compound verb",source:"FA3-05",sources:["FA3-05"],ms:"تماس گرفتن",amr:"تماس بگیر"}
];
const before=JSON.stringify(rows),built=VocabLearningManifest.build(rows);
assert.equal(built.validation.valid,true,JSON.stringify(built.validation.errors));
assert.equal(built.stats.indexedItems,4,"same-sense entries across terms must share one canonical identity");
assert.equal(built.stats.crossTermMerged,2,"two canonical items occur in multiple terms");
const books=built.manifest.items.filter(item=>item.headword==="کتاب");
assert.equal(books.length,2,"different meanings of the same headword remain separate senses");
const sharedBook=books.find(item=>item.meanings.en==="book");
assert.ok(sharedBook);
assert.deepEqual(sharedBook.occurrences.map(item=>item.term).sort(),[1,2]);
assert.deepEqual(sharedBook.legacyIds.filter(id=>!id.startsWith("vocab:source:")).sort(),["1|1|FA1-01|کتاب","2|2|FA2-02|کتاب"]);
assert.ok(sharedBook.legacyIds.some(id=>id.startsWith("vocab:source:")),"old source-specific IDs remain available for progress migration");
assert.ok(sharedBook.acceptedForms.includes("کتاب‌ها"));
assert.ok(sharedBook.aliases.includes("کتاب"));
assert.equal(sharedBook.examples.length,2,"examples from both term occurrences are retained");
const id1=VocabLearningIdentity.resolveLegacyId(built.aliasIndex,"1|1|FA1-01|کتاب");
const id2=VocabLearningIdentity.resolveLegacyId(built.aliasIndex,"2|2|FA2-02|کتاب");
assert.equal(id1.status,"resolved");
assert.equal(id1.itemId,id2.itemId,"legacy progress IDs from both terms resolve to the same canonical identity");
const priorSourceId=VocabLearningManifest.legacyStableKey("1|1|FA1-01|کتاب","کتاب");
assert.equal(VocabLearningIdentity.resolveLegacyId(built.aliasIndex,priorSourceId).itemId,id1.itemId,"previously saved source-specific progress IDs migrate to the canonical identity");
assert.equal(VocabLearningIdentity.resolveLegacyId(built.aliasIndex,"3|3|FA3-03|کتاب").itemId===id1.itemId,false,"different senses do not collapse");
assert.equal(built.manifest.items.find(x=>x.headword==="در نتیجه").kind,"phrase");
assert.equal(built.manifest.items.find(x=>x.headword==="تماس گرفتن").kind,"compound-verb");
const allPractice=VocabLearningManifest.selectPracticeRows(rows,built.aliasIndex,"all");
assert.equal(allPractice.filter(x=>x.fa==="کتاب").length,2,"all-term practice shows one card per canonical sense");
const sharedPracticeBook=allPractice.find(x=>x.fa==="کتاب"&&x.en==="book");
assert.ok(sharedPracticeBook.sources.includes("FA1-01")&&sharedPracticeBook.sources.includes("FA2-02"),"one practice card retains all source contexts");
assert.ok(sharedPracticeBook.acceptedForms.includes("کتاب‌ها"),"one practice card retains accepted forms from every occurrence");
assert.equal(allPractice.filter(x=>x.fa==="تماس گرفتن").length,1,"same compound verb is not duplicated across terms");
assert.equal(VocabLearningManifest.selectPracticeRows(rows,built.aliasIndex,1).filter(x=>x.fa==="کتاب").length,1);
assert.equal(VocabLearningManifest.selectPracticeRows(rows,built.aliasIndex,2).filter(x=>x.fa==="کتاب").length,1);
const sameLegacyDifferentSenses=[
 {id:"shared-legacy",bk:1,ch:1,fa:"کتاب",en:"book",pos:"اسم"},
 {id:"shared-legacy",bk:2,ch:2,fa:"کتاب",en:"volume",pos:"اسم"}
];
const ambiguousSenseManifest=VocabLearningManifest.build(sameLegacyDifferentSenses);
assert.equal(VocabLearningIdentity.resolveLegacyId(ambiguousSenseManifest.aliasIndex,"shared-legacy").status,"ambiguous");
assert.equal(VocabLearningManifest.selectPracticeRows(sameLegacyDifferentSenses,ambiguousSenseManifest.aliasIndex,"all").length,2,"ambiguous source IDs must never merge different senses in the practice queue");
assert.ok(ambiguousSenseManifest.manifest.items.every(item=>sameLegacyDifferentSenses.some(row=>VocabLearningManifest.identityForRow(row)===item.itemId)));
const reordered=VocabLearningManifest.build(rows.slice().reverse());
assert.deepEqual(reordered.manifest.items.map(x=>x.itemId),built.manifest.items.map(x=>x.itemId),"canonical IDs must not depend on row order");
assert.equal(JSON.stringify(rows),before,"manifest builder must not mutate source rows");
const partialSense={id:"3|4|FA3-04|کتاب",bk:3,ch:4,fa:"کتاب",pos:"اسم — noun",source:"FA3-04",sources:["FA3-04"]};
const oneSense=VocabLearningManifest.build([rows[0],partialSense]);
assert.equal(oneSense.manifest.items.length,1,"an underspecified occurrence joins a unique compatible sense");
assert.equal(oneSense.manifest.items[0].occurrences.length,2);
const ambiguousSenses=VocabLearningManifest.build([rows[0],rows[2],partialSense]);
const ambiguousSensesReordered=VocabLearningManifest.build([partialSense,rows[2],rows[0]]);
assert.deepEqual(ambiguousSensesReordered.manifest.items.map(x=>x.itemId),ambiguousSenses.manifest.items.map(x=>x.itemId),"ambiguous partial senses remain deterministic regardless of source row order");
assert.equal(ambiguousSenses.manifest.items.filter(x=>x.headword==="کتاب").length,3,"an underspecified occurrence is not arbitrarily assigned between two distinct meanings");
const duplicateAlias=VocabLearningManifest.build([
 ...rows,
 {id:"1|1|FA1-01|کتاب",bk:1,ch:1,fa:"کتابخانه",en:"library",source:"FA1-01",sources:["FA1-01"]}
]);
assert.equal(VocabLearningIdentity.resolveLegacyId(duplicateAlias.aliasIndex,"1|1|FA1-01|کتاب").status,"ambiguous");
const duplicateRow=VocabLearningManifest.build([rows[0],{...rows[0],sources:["FA1-02"]}]);
assert.equal(duplicateRow.stats.indexedItems,1,"same source ID and headword should retain one stable identity");
assert.equal(duplicateRow.manifest.items[0].occurrences.length,2);
const schoolSource=fs.readFileSync("website/learning/learning-school.js","utf8");
assert.ok(schoolSource.includes('priorId.startsWith("vocab:source:")'),"saved source-specific item IDs must be resolved before raw legacy IDs");
assert.ok(schoolSource.includes('legacyStableKey(String(legacyId||""),String(row.fa))'),"ambiguous raw legacy IDs must resolve through their source/headword identity");
assert.ok(schoolSource.includes('canonicalItemId(legacyId,event.itemId)'),"history must migrate existing attempts to the current canonical identity");
assert.ok(schoolSource.includes('identityForRow(row)'),"ambiguous current rows must resolve using their complete sense identity");
console.log("PASS: cross-term canonical vocabulary/sense identities, source aggregation, practice de-duplication, legacy progress migration and ambiguous legacy blocking");
