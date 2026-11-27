#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict");
require("../website/learning/progress-summary.js");
const rows=[
 {id:"t1-a",bk:1,fa:"کتاب"},{id:"t1-b",bk:1,fa:"خانه"},
 {id:"t2-a",bk:2,fa:"در نتیجه"},{id:"t3-a",bk:3,fa:"شاعر"}
];
const events=[
 {legacyId:"t1-a",itemId:"canonical-a",modeId:"imla",correct:true},
 {legacyId:"t1-a",itemId:"canonical-a",modeId:"imla",correct:false},
 {legacyId:"t1-b",itemId:"canonical-b",modeId:"skip-gram",correct:true},
 {legacyId:"t2-a",itemId:"canonical-c",modeId:"meaning-recall-en",correct:true},
 {legacyId:"t3-a",itemId:"canonical-d",modeId:"meaning-recall-ar",correct:false},
 {legacyId:"unknown",itemId:"unknown",modeId:"imla",correct:true}
];
const result=VocabLearningProgressSummary.build(events,rows);
assert.deepEqual(result.terms.map(x=>x.attempts),[3,1,1]);
assert.deepEqual(result.terms.map(x=>x.distinctItems),[2,1,1]);
assert.equal(result.terms[0].accuracy,2/3);
assert.equal(result.terms[0].modes.imla.attempts,2);
assert.equal(result.terms[0].modes["skip-gram"].accuracy,1);
assert.equal(result.terms[1].modes["meaning-recall-en"].correct,1);
assert.equal(result.terms[2].modes["meaning-recall-ar"].accuracy,0);
assert.deepEqual(result.all,{attempts:5,correct:3,distinctItems:4,accuracy:3/5});
assert.equal(VocabLearningProgressSummary.build([],rows).all.accuracy,null);
console.log("PASS: cross-term practice summary, per-mode accuracy, distinct items and unknown-event exclusion");
