#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict");
require("../website/learning/meaning-recall.js");
const item={fa:"پرهیز کردن",en:"avoid",sem:{enMeaning:"To deliberately avoid or refrain from something.",enSynonyms:["avoid","refrain from"],arMeaning:"اجتنبَ الشيءَ وابتعدَ عنه.",arSynonyms:["اجتناب","ابتعاد"]}};
assert.equal(VocabMeaningRecall.eligible(item,{language:"en"}),true);
assert.equal(VocabMeaningRecall.eligible(item,{language:"ar"}),true);
assert.equal(VocabMeaningRecall.eligible({fa:"کتاب",en:"book"},{language:"ar"}),false);
const en=VocabMeaningRecall.createPrompt(item,{language:"en"});
assert.equal(VocabMeaningRecall.validate(item,"AVOID",en).correct,true);
assert.equal(VocabMeaningRecall.validate(item,"wrong",en).correct,false);
const ar=VocabMeaningRecall.createPrompt(item,{language:"ar"});
assert.equal(VocabMeaningRecall.validate(item,"اجتناب",ar).correct,true);
assert.equal(VocabMeaningRecall.validate(item,"اجتنب الشيء وابتعد عنه",ar).correct,true);
assert.ok(VocabMeaningRecall.hint(item,ar,0).includes("العربية"));
console.log("PASS: reviewed English/Arabic meaning recall, synonym acceptance and missing-semantic eligibility");
