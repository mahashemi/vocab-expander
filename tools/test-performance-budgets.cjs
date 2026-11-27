#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict");
const {evaluate,LIMITS}=require("./performance-budgets.cjs");
function sample(viewport,scenario){
 const values={lcpMs:1000,term03RouteReadyMs:800,transferBytes:100000,scriptTransferBytes:90000,requestCount:10,longTaskMs:100,cls:0.01};
 return {...values,...LIMITS[viewport][scenario]&&Object.fromEntries(Object.keys(LIMITS[viewport][scenario]).map(k=>[k,Math.max(0,LIMITS[viewport][scenario][k]-1)]))};
}
const report={results:["mobile","desktop"].map(viewport=>({viewport,cold:sample(viewport,"cold"),deepCold:sample(viewport,"deepCold"),deepWarm:sample(viewport,"deepWarm")}))};
assert.equal(evaluate(report).passed,true);
const regression=structuredClone(report);regression.results.find(x=>x.viewport==="mobile").deepCold.lcpMs=LIMITS.mobile.deepCold.lcpMs+1;
assert.equal(evaluate(regression).passed,false);
assert.ok(evaluate(regression).failures.some(x=>x.includes("mobile deepCold lcpMs")));
const missing=structuredClone(report);delete missing.results[0].deepWarm;
assert.equal(evaluate(missing).passed,false);
const missingMetric=structuredClone(report);delete missingMetric.results[1].cold.cls;
assert.equal(evaluate(missingMetric).passed,false);
console.log("PASS: mobile/desktop performance budgets, regression detection and missing-metric failure");
