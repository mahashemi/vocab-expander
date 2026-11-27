#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
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
const measureSource=fs.readFileSync("tools/measure-site-performance.cjs","utf8");
const portalSource=fs.readFileSync("website/term-portal.js","utf8");
assert.ok(measureSource.includes("for (const term of [1, 2, 3])"),"the baseline must measure each term route independently");
assert.ok(measureSource.includes("term01: termRoutes[1]")&&measureSource.includes("term02: termRoutes[2]"),"the report must retain separate Term 01 and Term 02 samples");
assert.ok(measureSource.includes("termRouteReadyMs"),"each direct term route must report its route-ready marker");
assert.ok(measureSource.includes("termSemanticsReadyMs"),"the report must separate first render from semantic enrichment");
assert.ok(portalSource.includes('const routeMark="vocab-term"+String(activeTerm).padStart(2,"0")+"-route-ready"')&&portalSource.includes("window.performance.mark(routeMark)"),"all term routes must emit a common first-render performance marker");
assert.ok(portalSource.includes("termSemanticsScheduled"),"Term 01/02 semantic enrichment must be scheduled after the first render");
console.log("PASS: mobile/desktop budgets, regression detection, missing metrics and per-term route coverage");
