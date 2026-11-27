#!/usr/bin/env node
"use strict";
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const names=Array.from({length:46},(_,i)=>"term03-additional-semantics-"+String(i+1).padStart(2,"0")+".js");
const groups=[];
for(let i=0;i<names.length;i+=10)groups.push(names.slice(i,i+10).map(name=>fs.readFileSync(path.join(root,"website",name),"utf8").replace(/\s+$/,"")).join("\n\n"));
const header="/* Generated bundle: source order and contents of term03-additional-semantics-01.js through -46.js. Edit source batches, then regenerate. */\n";
fs.writeFileSync(path.join(root,"website","term03-additional-semantics-bundle.js"),header+groups.join("\n")+"\n");
console.log("Generated one lazy bundle from "+names.length+" source batches.");
