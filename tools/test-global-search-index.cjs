#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const portal=fs.readFileSync("website/term-portal.js","utf8");
const loader=fs.readFileSync("website/term-loader.js","utf8");
const html=fs.readFileSync("website/index.html","utf8");
for(const marker of [
 "vocab_expander_global_search_index_v1",
 "fingerprintSearchRows",
 "function searchableFields(x)",
 "x.acceptedForms,x.aliases",
 "x.variants,x.synonyms,x.xf,x.xt,x.xe",
 "x.extraExamples,x.extraNotes",
 "x.m,x.a,x.note,x.ms,x.amr,x.units",
 "_hay:normalize(searchableFields(x.record||{}).concat([x.label,x.tr,x.meaning,x.forms,x.source]).join(\" \"))",
 "payload.version===version",
 "payload.fingerprint===fingerprint",
 "localStorage.getItem(SEARCH_INDEX_STORAGE_KEY)",
 "localStorage.setItem(SEARCH_INDEX_STORAGE_KEY,serialized)",
 "recordMap.get(x.kind+\"|\"+x.bk+\"|\"+x.id)",
 "SEARCH_INDEX_MAX_STORAGE_CHARS",
 "searchIndexRestores",
 "window.__getGlobalSearchDiagnostics"
])assert(portal.includes(marker),"Persistent search index is missing "+marker);
assert(loader.includes("window.VOCAB_DATA_VERSION = assetVersion"),"Term loader must publish the data version");
assert(html.includes("term-portal.js?v=20261127-complete-search-field-coverage"),"Search code cache key must be versioned");
assert(html.includes("term-loader.js?v=20261127-persistent-global-search-index"),"Data version cache key must be versioned");
console.log("PASS: versioned search-index cache, content fingerprint, record reattachment and asset-version contract are present.");
