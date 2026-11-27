#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const names=Array.from({length:46},(_,i)=>"term03-additional-semantics-"+String(i+1).padStart(2,"0")+".js");
const groups=[];
for(let i=0;i<names.length;i+=10)groups.push(names.slice(i,i+10).map(name=>fs.readFileSync(path.join(root,"website",name),"utf8").replace(/\s+$/,"")).join("\n\n"));
const header="/* Generated bundle: source order and contents of term03-additional-semantics-01.js through -46.js. Edit source batches, then regenerate. */\n";
const expected=header+groups.join("\n")+"\n";
const actual=fs.readFileSync(path.join(root,"website","term03-additional-semantics-bundle.js"),"utf8");
assert.equal(actual,expected,"The browser bundle must exactly preserve all 46 source batches and their order.");
assert.equal((actual.match(/Generated bundle:/g)||[]).length,1);
console.log("PASS: bundled semantic payload exactly matches all 46 reviewed source batches ("+Buffer.byteLength(actual)+" bytes).");
