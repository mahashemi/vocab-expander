#!/usr/bin/env node
"use strict";
const fs=require("node:fs");
const path=require("node:path");
const {evaluate}=require("./performance-budgets.cjs");
const file=path.resolve(__dirname,"..","reports","site-performance-baseline.json");
if(!fs.existsSync(file)){console.error("Performance report is missing: "+file);process.exit(1)}
const report=JSON.parse(fs.readFileSync(file,"utf8"));
const result=evaluate(report);
for(const check of result.checks)console.log((check.ok?"PASS":"FAIL")+" "+check.viewport+"."+check.scenario+"."+check.metric+": "+check.value+" / "+check.limit);
if(!result.passed){console.error("Performance budget violations:\n- "+result.failures.join("\n- "));process.exit(1)}
console.log("All synthetic desktop/mobile performance budgets passed. These lab budgets are not field Core Web Vitals.");
