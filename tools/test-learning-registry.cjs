#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict");
require("../website/learning/mode-registry.js");
const modules=[
 {id:"imla",title:"Imla",eligible:item=>!!item.fa&&!!item.en,createPrompt:()=>({}),validate:()=>({correct:true}),hint:()=>"meaning"},
 {id:"skip-gram",title:"Skip-gram",eligible:item=>Array.from(item.fa||"").length>=4,createPrompt:()=>({}),validate:()=>({correct:false}),hint:()=>"letter"}
];
const registry=VocabLearningModeRegistry.create(modules);
assert.deepEqual(registry.list().map(x=>x.id),["imla","skip-gram"]);
assert.deepEqual(registry.eligible({fa:"کتاب",en:"book"}).map(x=>x.id),["imla","skip-gram"]);
assert.deepEqual(registry.assess({fa:"در",en:"in"}).map(x=>({id:x.id,eligible:x.eligible})),[{id:"imla",eligible:true},{id:"skip-gram",eligible:false}]);
assert.match(registry.assess({fa:"در",en:"in"})[1].reason,/requirements/);
assert.equal(registry.get("unknown"),null);
assert.throws(()=>registry.register(modules[0]),/Duplicate/);
assert.throws(()=>registry.register({id:"broken",eligible:()=>true}),/missing/);
assert.throws(()=>VocabLearningModeRegistry.create([{id:"bad",eligible:()=>true}]),/missing/);
assert.equal(Object.isFrozen(registry.get("imla")),true);
console.log("PASS: independent mode registration, required API contract, explainable eligibility and safe mode lookup");
