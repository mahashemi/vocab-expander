#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict");
require("../website/learning/identity.js");
require("../website/learning/manifest.js");
const rows=[
 {id:"1|1|FA1-01|کتاب",bk:1,ch:1,fa:"کتاب",en:"book",source:"FA1-01",sources:["FA1-01"],xf:"کتاب روی میز است.",xt:"Ketāb ru-ye miz ast.",xe:"The book is on the table."},
 {id:"2|0|در نتیجه",bk:2,ch:0,fa:"در نتیجه",en:"as a result",sources:["FA2-00"]},
 {id:"3|20|FA3-20|شاعر",bk:3,ch:20,fa:"شاعر",en:"poet",source:"FA3-20",sources:["FA3-20"]}
];
const before=JSON.stringify(rows),built=VocabLearningManifest.build(rows);
assert.equal(built.validation.valid,true,JSON.stringify(built.validation.errors));
assert.equal(built.stats.indexedItems,3);
assert.equal(built.manifest.items.find(x=>x.headword==="در نتیجه").kind,"phrase");
assert.equal(VocabLearningIdentity.resolveLegacyId(built.aliasIndex,"1|1|FA1-01|کتاب").status,"resolved");
assert.equal(VocabLearningIdentity.resolveLegacyId(built.aliasIndex,"2|0|در نتیجه").status,"resolved");
assert.equal(JSON.stringify(rows),before,"manifest builder must not mutate source rows");
const duplicateAlias=VocabLearningManifest.build([
 ...rows,
 {id:"1|1|FA1-01|کتاب",bk:1,ch:1,fa:"کتابخانه",en:"library",source:"FA1-01",sources:["FA1-01"]}
]);
assert.equal(VocabLearningIdentity.resolveLegacyId(duplicateAlias.aliasIndex,"1|1|FA1-01|کتاب").status,"ambiguous");
const duplicateRow=VocabLearningManifest.build([rows[0],{...rows[0],sources:["FA1-02"]}]);
assert.equal(duplicateRow.stats.indexedItems,1,"same legacy ID and headword should retain one stable identity");
assert.equal(duplicateRow.manifest.items[0].occurrences.length,2);
console.log("PASS: deterministic read-only source manifest, phrase classification, explicit legacy aliases and ambiguity blocking");
