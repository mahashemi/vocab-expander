/* Three-term portal, global multilingual search and shared progress dashboard. */
(function(){
 const $id=id=>document.getElementById(id);
 const esc=s=>{const d=document.createElement("div");d.textContent=s??"";return d.innerHTML};
 const normalize=s=>String(s??"").normalize("NFKC").toLowerCase()
  .replace(/[يى]/g,"ی").replace(/ك/g,"ک").replace(/[\u064B-\u065F\u0670\u0640]/g,"")
  .replace(/[\u200c\u200d\s]+/g," ").trim();
 const flatten=(x,out=[])=>{if(x==null)return out;if(typeof x==="string"||typeof x==="number")out.push(String(x));else if(Array.isArray(x))x.forEach(v=>flatten(v,out));else if(typeof x==="object")Object.values(x).forEach(v=>flatten(v,out));return out};
 function portalCounts(){
  const summary=window.VOCAB_PORTAL_SUMMARY||{1:0,2:0,3:0};
  const custom=window.__getCustomVocabRows?window.__getCustomVocabRows():[];
  const doneIds=window.__getDoneIds?window.__getDoneIds():[];
  const counts={},doneByTerm={};
  for(const b of [1,2,3]){
   counts[b]=(Number(summary[b])||0)+custom.filter(row=>Number(row[0])===b).length;
   doneByTerm[b]=Math.min(counts[b],doneIds.filter(id=>String(id).startsWith(b+"|")).length);
  }
  const total=counts[1]+counts[2]+counts[3],done=doneByTerm[1]+doneByTerm[2]+doneByTerm[3];
  return {counts,doneByTerm,total,done};
 }
 function updateStats(){
  const stats=portalCounts(),p=stats.total?Math.round(stats.done*100/stats.total):0;
  $id("overallDone").textContent=stats.done.toLocaleString();
  $id("overallWords").textContent=stats.total.toLocaleString();
  $id("overallBar").style.width=p+"%";
  $id("overallPercent").textContent=p+"% memorised";
  $id("termProgressMini").textContent=[1,2,3].map(b=>"T"+b+" "+stats.counts[b].toLocaleString()).join(" · ")+" words";
 }
 const SEARCH_INDEX_STORAGE_KEY="vocab_expander_global_search_index_v1";
 const SEARCH_INDEX_MAX_STORAGE_CHARS=2500000;
 let cachedSearchIndex=null,searchIndexBuilds=0,searchIndexRestores=0,searchIndexPersisted=false,searchIndexStorageBytes=0,searchIndexFingerprint="";
 // Keep the index corpus and its fingerprint in lockstep. Include every
 // learner-facing language, accepted spelling, inflection/form, and example so
 // a change to any searchable field invalidates a previously persisted index.
 function searchableFields(x){
  return flatten([
   x.fa,x.tr,x.en,x.source,x.sources,x.sem,x.pos,x.acceptedForms,x.aliases,
   x.variants,x.synonyms,x.xf,x.xt,x.xe,x.extraExamples,x.extraNotes,
   x.m,x.a,x.note,x.ms,x.amr,x.units
  ]);
 }
 function fingerprintSearchRows(words,verbs){
  let hash=2166136261;
  const feed=value=>{const text=String(value??"");for(let i=0;i<text.length;i++){hash^=text.charCodeAt(i);hash=Math.imul(hash,16777619)}hash^=31;hash=Math.imul(hash,16777619)};
  const row=(kind,x)=>feed([kind,x.bk,x.ch,x.id,...searchableFields(x)].join("\u001f"));
  words.forEach(x=>row("Vocabulary",x));verbs.forEach(x=>row("Verb Treasury",x));
  return (hash>>>0).toString(36);
 }
 function makeSearchRow(kind,record){
  const label=record.fa||"",tr=record.tr||"",meaning=record.en||"";
  const source=(record.sources||[record.source]).filter(Boolean).join(" · ");
  const forms=kind==="Verb Treasury"?[record.ms,record.amr].filter(Boolean).join(" · "):"";
  return {kind,label,tr,meaning,forms,source,bk:record.bk,ch:record.ch,id:record.id,record,
   _label:normalize(label),
   _hay:normalize(searchableFields(record).concat([label,tr,meaning,forms,source]).join(" "))};
 }
 function searchIndex(){
  if(cachedSearchIndex)return cachedSearchIndex;
  const wordRecords=all(),verbRecords=window.getVerbSearchRows?window.getVerbSearchRows():[];
  const version=window.VOCAB_DATA_VERSION||"unversioned";
  const fingerprint=fingerprintSearchRows(wordRecords,verbRecords);
  const recordMap=new Map();
  wordRecords.forEach(x=>recordMap.set("Vocabulary|"+x.bk+"|"+x.id,x));
  verbRecords.forEach(x=>recordMap.set("Verb Treasury|"+x.bk+"|"+x.id,x));
  try{
   const payload=JSON.parse(localStorage.getItem(SEARCH_INDEX_STORAGE_KEY)||"null");
   if(payload&&payload.version===version&&payload.fingerprint===fingerprint&&Array.isArray(payload.rows)&&payload.rows.length===recordMap.size){
    const restored=payload.rows.map(x=>{const record=recordMap.get(x.kind+"|"+x.bk+"|"+x.id);return record?makeSearchRow(x.kind,record):null});
    if(restored.every(x=>x.record)){
     cachedSearchIndex=restored;searchIndexRestores++;searchIndexPersisted=true;searchIndexStorageBytes=JSON.stringify(payload).length;searchIndexFingerprint=fingerprint;
     return cachedSearchIndex;
    }
   }
  }catch(error){}
  const words=wordRecords.map(x=>makeSearchRow("Vocabulary",x));
  const verbs=verbRecords.map(x=>makeSearchRow("Verb Treasury",x));
  const seen=new Set();
  cachedSearchIndex=words.concat(verbs).filter(x=>{const k=x.kind+"|"+x.bk+"|"+x.id;if(seen.has(k))return false;seen.add(k);return true});
  searchIndexBuilds++;searchIndexFingerprint=fingerprint;
  try{
   // Persist only stable record keys; rebuild the searchable text from the
   // canonical records on restore. This avoids localStorage quota failures as
   // examples, aliases and trilingual meanings expand the searchable corpus.
   const payload={version,fingerprint,rows:cachedSearchIndex.map(({kind,bk,id})=>({kind,bk,id}))};
   const serialized=JSON.stringify(payload);
   if(serialized.length<=SEARCH_INDEX_MAX_STORAGE_CHARS){localStorage.setItem(SEARCH_INDEX_STORAGE_KEY,serialized);searchIndexPersisted=true;searchIndexStorageBytes=serialized.length}
  }catch(error){}
  return cachedSearchIndex;
 }
 window.__getGlobalSearchDiagnostics=()=>({built:searchIndexBuilds,restored:searchIndexRestores,size:cachedSearchIndex?cachedSearchIndex.length:0,persisted:searchIndexPersisted,storageBytes:searchIndexStorageBytes,version:window.VOCAB_DATA_VERSION||"unversioned",fingerprint:searchIndexFingerprint});
 function portal(){
  const stats=portalCounts(),counts=stats.counts,doneByTerm=stats.doneByTerm;
  const data=[
   {b:1,no:"TERM 01",name:"Term One",sub:"Build the foundations of Persian",theme:"t1"},
   {b:2,no:"TERM 02",name:"Term Two",sub:"Strengthen grammar and expression",theme:"t2"},
   {b:3,no:"TERM 03",name:"Term Three",sub:"Read, write, speak and think in Persian",theme:"t3"}
  ];
  if(!v.querySelector('.portal-intro'))v.innerHTML='<section class="portal-intro"><div class="eyebrow">YOUR PERSIAN LEARNING LIBRARY</div><h2>Choose your term. Continue your journey.</h2><p>Every term has its own vocabulary, practice tools and learning activities. Your memorisation progress is tracked across the whole collection.</p></section>'+
  '<section class="global-search" aria-label="Search all terms and verbs"><div class="global-search-heading"><div><div class="eyebrow">ONE SEARCH · THE WHOLE LIBRARY</div><h3>Find a word, phrase or verb</h3><p>Search Persian, Arabic, Urdu, English or transliteration across all three terms and the Verb Treasury.</p></div></div><div class="global-search-box"><span aria-hidden="true">⌕</span><input id="globalSearchInput" type="search" autocomplete="off" placeholder="مثلاً: برگشتن · برگرد · return · sit down" aria-label="Search all terms and verb treasury"><button type="button" id="globalSearchClear" aria-label="Clear search">Clear</button></div><div class="global-search-meta" id="globalSearchMeta" aria-live="polite">Search the complete vocabulary and verb collection.</div><div id="globalSearchResults" class="global-search-results"></div></section>'+
  '<div class="term-grid">'+data.map(t=>{const count=counts[t.b]||0,mem=doneByTerm[t.b]||0,p=count?Math.round(mem*100/count):0;return '<button class="term-entry '+t.theme+'" data-enter="'+t.b+'"><span class="term-no">'+t.no+'</span><span class="term-name">'+t.name+'</span><span class="term-sub">'+t.sub+'</span><div class="term-stats"><span>'+count.toLocaleString()+' words</span><span>'+mem.toLocaleString()+' memorised</span></div><div class="bar"><i style="width:'+p+'%"></i></div><span class="term-cta">Enter term →</span></button>'}).join("")+'</div>'+
  '<div class="verb-entry-wrap"><button class="verb-entry" data-open-verbs><span class="term-no">A SHARED GRAMMAR COLLECTION</span><span class="term-name">گنجینهٔ فعل‌ها · Verb Treasury</span><span class="term-sub">Masdar, amr, example sentences and revision cards across terms</span><span class="term-cta">Enter the verb treasury →</span></button></div>'+
  '<div class="learning-school-entry"><button class="verb-entry" data-open-school><span class="term-no">A NEW WAY TO LEARN</span><span class="term-name">مدرسهٔ یادگیری · Learning School</span><span class="term-sub">Practise spelling with Imla and rebuild words with Skip-gram across all three terms</span><span class="term-cta">Start learning →</span></button></div>'+
  '<div class="portal-summary"><span><b>'+stats.total.toLocaleString()+'</b> total vocabulary entries</span><span><b>'+stats.done.toLocaleString()+'</b> memorised</span><span><b>'+(stats.total?Math.round(stats.done*100/stats.total):0)+'%</b> overall progress</span></div>';
  data.forEach(t=>{
   const count=counts[t.b]||0,mem=doneByTerm[t.b]||0,p=count?Math.round(mem*100/count):0;
   const card=v.querySelector('[data-enter="'+t.b+'"]');if(!card)return;
   const statsNode=card.querySelector(".term-stats");
   if(statsNode)statsNode.innerHTML='<span>'+count.toLocaleString()+' words</span><span>'+mem.toLocaleString()+' memorised</span>';
   const bar=card.querySelector(".bar i");if(bar)bar.style.width=p+"%";
  });
  const summary=v.querySelectorAll(".portal-summary b");
  if(summary.length>=3){
   summary[0].textContent=stats.total.toLocaleString();
   summary[1].textContent=stats.done.toLocaleString();
   summary[2].textContent=(stats.total?Math.round(stats.done*100/stats.total):0)+"%";
  }
  v.querySelectorAll("[data-enter]").forEach(btn=>btn.onclick=()=>enterTerm(Number(btn.dataset.enter)));
  const verbs=v.querySelector("[data-open-verbs]");
  if(verbs)verbs.onclick=()=>{activeTerm=null;$id("termNav").hidden=true;window.gotoTab("verbs")};
  const school=v.querySelector("[data-open-school]");
  if(school)school.onclick=()=>{activeTerm=null;$id("termNav").hidden=true;window.gotoTab("school")};
  const input=$id("globalSearchInput"),results=$id("globalSearchResults"),meta=$id("globalSearchMeta");
  let searchRequest=0;
  const renderResults=async()=>{
   const q=normalize(input.value),request=++searchRequest;
   if(!q){results.innerHTML="";meta.textContent="Search the complete vocabulary and verb collection.";return}
   meta.textContent="Loading the complete vocabulary and verb index…";
   try{await window.ensureAllTermsLoaded()}catch(error){meta.textContent="Search data could not be loaded. Please retry.";console.error(error);return}
   if(request!==searchRequest||q!==normalize(input.value))return;
   const terms=q.split(" ").filter(Boolean),rows=searchIndex();
   const rank=x=>x._label===q?0:x._label.startsWith(q)?1:terms.every(t=>x._label.includes(t))?2:3;
   const hits=rows.filter(x=>terms.every(t=>x._hay.includes(t))).sort((a,b)=>rank(a)-rank(b)||((a.kind==="Verb Treasury"?-1:0)-(b.kind==="Verb Treasury"?-1:0))).slice(0,60);
   meta.textContent=hits.length?hits.length+" result"+(hits.length===1?"":"s")+" shown · search includes all terms and verbs":"No matches yet. Try another spelling or language.";
   results.innerHTML=hits.map((x,i)=>'<button type="button" class="global-search-result" data-result="'+i+'"><span class="global-result-top"><b class="fa" lang="fa">'+esc(x.label)+'</b><span class="global-result-kind">'+esc(x.kind)+' · Term '+String(x.bk).padStart(2,"0")+'</span></span><span class="global-result-tr">'+esc(x.tr)+'</span><span class="global-result-meaning">'+esc(x.meaning)+(x.forms?" · "+esc(x.forms):"")+'</span><span class="global-result-source">'+esc(x.source||"Source lesson not recorded")+(x.ch?" · Dars "+x.ch:"")+'</span></button>').join("");
   results.querySelectorAll("[data-result]").forEach(btn=>btn.onclick=async()=>{
    const x=hits[Number(btn.dataset.result)];if(!x)return;
    if(x.kind==="Verb Treasury"){activeTerm=null;$id("termNav").hidden=true;await window.ensureAllTermsLoaded();if(window.openVerbSearch)await window.openVerbSearch(x.label);else await window.gotoTab("verbs");return}
    await enterTerm(Number(x.bk));if(x.ch!=null){chSel.value=String(x.ch);render()}$id("termNav").scrollIntoView({behavior:"smooth",block:"start"});
   });
  };
  input.oninput=renderResults;
  $id("globalSearchClear").onclick=()=>{input.value="";renderResults();input.focus()};
  if(input.value)renderResults();
 }
 window.updateGlobalStats=updateStats;
 let termEntryRequest=0;
 async function enterTerm(b){
  const request=++termEntryRequest;
  try{await window.ensureTermLoaded(b)}catch(error){const status=$id("globalSearchMeta");if(status)status.textContent="This term could not be loaded. Please retry.";console.error(error);return}
  if(request!==termEntryRequest)return;
  activeTerm=b;bkSel.value=String(b);fillCh();chSel.value="all";if(b===2){speechCh=1;}
  $id("termNav").hidden=false;$id("activeTermTitle").textContent="TERM 0"+b+(b===3?" · PERSIAN":"");
  document.querySelectorAll('#termTabs [data-t="essays"]').forEach(x=>x.hidden=false);document.querySelectorAll('#termTabs [data-t="speeches"],#termTabs [data-t="khulasa"]').forEach(x=>x.hidden=!(b===2||b===3));
  await window.gotoTab("home");
 }
 function back(){activeTerm=null;tab="portal";bkSel.value="all";fillCh();$id("termNav").hidden=true;render()}
 const originalHome=home;
 window.home=function(){originalHome();const title=activeTerm===1?"Term One":activeTerm===2?"Term Two":"Term Three · Persian";
  const description=activeTerm===3?"Farsi Umumi, Khwandan, Newestan and Shunidan are brought together here. Each Farsi Umumi chapter includes a learning summary, linked lesson vocabulary, and dedicated writing and speaking practice.":activeTerm===2?"Term 02 includes vocabulary and grammar from all 60 source lessons, chapter summaries, writing and speaking practice.":"Term 01 is being built from its Farsi Umumi, Khwandan, Newestan and Shunidan source lessons.";
  const codes=activeTerm===3?["FA3","KH3","N3","SH3"]:activeTerm===2?["FA2","KH2","N2","SH2"]:[],sourceCounts=codes.map(code=>({code,count:all().filter(x=>x.bk===activeTerm&&(x.sources||[x.source]).some(src=>String(src||"").startsWith(code+"-"))).length}));
  const sourceLine=sourceCounts.length?'<div class="source-coverage">'+sourceCounts.map(x=>'<span><b>'+x.code+'</b><small>'+x.count+' words</small></span>').join("")+'</div>':"";
  v.insertAdjacentHTML("afterbegin",'<section class="term-welcome"><h2>'+title+'</h2><p>'+description+'</p>'+sourceLine+'</section>');
 };
 const routeTabs={fa:"home",study:"home",flashcards:"cards",quiz:"quiz",khulasa:"khulasa",newestan:"essays",sukhanrani:"speeches"};
 const routeNames={home:"fa",cards:"flashcards",quiz:"quiz",khulasa:"khulasa",essays:"newestan",speeches:"sukhanrani"};
 let applyingRoute=false,routeRequest=0,tabRequest=0,term03SemanticsScheduled=false;
 function currentRoute(){
  if(tab==="portal")return "#/";
  if(tab==="verbs")return "#/verbs";
  if(tab==="school")return "#/learning";
  const term=activeTerm||3,name=routeNames[tab]||"study";
  let path="#/term/"+term+"/"+name;
  let lesson=null;
  if(tab==="essays"){
   const pick=document.getElementById("newestanLesson");
   lesson=pick?Number(pick.value):(window.__vocabRouteLesson||1);
  }else if(tab==="khulasa"){
   const ch=chSel.value;
   if(ch&&ch!=="all")lesson=ch;
  }else if(tab==="speeches")lesson=Number(speechCh)||20;
  else if(["home","cards","quiz"].includes(tab)&&chSel.value&&chSel.value!=="all")lesson=chSel.value;
  if(lesson!==null&&lesson!==undefined&&lesson!==""&&!Number.isNaN(Number(lesson))){
   path+="/"+(tab==="home"||tab==="cards"||tab==="quiz"?"chapter":"lesson")+"/"+encodeURIComponent(String(lesson));
  }
  return path;
 }
 function syncRoute(){
  if(applyingRoute)return;
  const next=currentRoute();
  if(location.hash!==next)location.hash=next;
 }
 window.syncVocabRoute=syncRoute;
 async function applyRoute(){
  const request=++routeRequest;
  const raw=location.hash||"#/";
  if(raw==="#/"||raw==="#"){
   applyingRoute=true;activeTerm=null;tab="portal";bkSel.value="all";fillCh();$id("termNav").hidden=true;window.__vocabRouteLesson=null;render();applyingRoute=false;return;
  }
  if(raw==="#/learning"){
   applyingRoute=true;
   try{await window.ensureLearningSchool()}catch(error){if(request===routeRequest){applyingRoute=false;document.documentElement.classList.remove("route-boot");}console.error(error);return}
   if(request!==routeRequest)return;
   activeTerm=null;tab="school";$id("termNav").hidden=true;window.__vocabRouteLesson=null;render();applyingRoute=false;return;
  }
  if(raw==="#/verbs"){
   applyingRoute=true;
   try{await window.ensureAllTermsLoaded()}catch(error){if(request===routeRequest){applyingRoute=false;document.documentElement.classList.remove("route-boot");}console.error(error);return}
   if(request!==routeRequest)return;
   activeTerm=null;tab="verbs";$id("termNav").hidden=true;window.__vocabRouteLesson=null;render();applyingRoute=false;return;
  }
  const m=raw.match(/^#\/term\/(1|2|3)\/(fa|study|flashcards|quiz|khulasa|newestan|sukhanrani)(?:\/(chapter|lesson)\/([^/?#]+))?\/?$/);
  if(!m){if(!applyingRoute) {applyingRoute=true;location.hash="#/";applyingRoute=false;}return}
  const term=Number(m[1]),routeName=m[2],nextTab=routeTabs[routeName],kind=m[3],value=m[4]?decodeURIComponent(m[4]):null;
  applyingRoute=true;
  try{
   await window.ensureTermLoaded(term);
   if(routeName==="khulasa")await window.ensureFeatureLoaded(term,"khulasa");
   if(routeName==="sukhanrani")await window.ensureFeatureLoaded(term,"speeches");
   if(routeName==="newestan")await window.ensureFeatureLoaded(term,"essays");
  }catch(error){if(request===routeRequest){applyingRoute=false;document.documentElement.classList.remove("route-boot");}console.error(error);return}
  if(request!==routeRequest)return;
  activeTerm=term;bkSel.value=String(term);fillCh();
  if(routeName==="newestan")window.__vocabRouteLesson=Math.max(1,Math.min(10,Number(value)||1));else window.__vocabRouteLesson=null;
  if(routeName==="sukhanrani")speechCh=Number(value)|| (term===2?1:20);
  if(["study","flashcards","quiz"].includes(routeName)||routeName==="khulasa"){
   chSel.value=value&&kind==="chapter"||value&&routeName==="khulasa"?String(value):"all";
   if(chSel.selectedIndex<0)chSel.value="all";
  }else chSel.value="all";
  $id("termNav").hidden=false;$id("activeTermTitle").textContent="TERM 0"+term+(term===3?" · PERSIAN":"");
  document.querySelectorAll('#termTabs [data-t="essays"]').forEach(x=>x.hidden=false);document.querySelectorAll('#termTabs [data-t="speeches"],#termTabs [data-t="khulasa"]').forEach(x=>x.hidden=!(term===2||term===3));
  tab=nextTab;document.querySelectorAll("[data-t]").forEach(x=>x.classList.toggle("on",x.dataset.t===tab));
  bkSel.hidden=true;chSel.hidden=![ "cards","quiz","khulasa"].includes(tab);
  deck=[];idx=0;flip=false;render();applyingRoute=false;
 }
 window.render=function(){
  document.documentElement.classList.remove("route-boot");
  if(tab==="portal")portal();else if(tab==="home")home();else if(tab==="cards")cards();else if(tab==="quiz")startQuiz();else if(tab==="khulasa")khulasa();else if(tab==="essays")essays();else if(tab==="speeches")speeches();else if(tab==="verbs")window.verbTreasury();else if(tab==="school")window.learningSchool();
  updateStats();syncRoute();
  if(activeTerm===3&&window.performance&&window.performance.mark)window.performance.mark("vocab-term03-route-ready");
  // Keep ordinary chapter navigation term-local. Cross-term datasets are
  // loaded only by explicit all-library workflows (search, Verb Treasury,
  // learning school and Newestan) through ensureAllTermsLoaded().
  if(activeTerm===3&&tab!=="portal"&&!window.TERM03_SEMANTICS_READY&&window.ensureTerm03Semantics&&!term03SemanticsScheduled){
   term03SemanticsScheduled=true;
   const enrich=()=>{term03SemanticsScheduled=false;window.ensureTerm03Semantics().catch(error=>console.error("Term 03 semantic enrichment failed",error));};
   if(typeof window.requestIdleCallback==="function")window.requestIdleCallback(enrich,{timeout:1800});
   else window.setTimeout(enrich,0);
  }
 };
 window.refreshActiveTermViewIfSafe=function(){
  if(activeTerm&&tab==="home"&&(!window.scrollY||window.scrollY<80))window.render();
  else updateStats();
 };
 window.gotoTab=async function(t){
  const request=++tabRequest;
  try{
   if(t==="verbs")await window.ensureAllTermsLoaded();
   else if(t==="school")await window.ensureLearningSchool();
   else if(["khulasa","speeches","essays"].includes(t)&&activeTerm)await window.ensureFeatureLoaded(activeTerm,t==="essays"?"essays":t);
  }catch(error){const status=$id("globalSearchMeta");if(status)status.textContent="This learning section could not be loaded. Please retry.";console.error(error);return}
  if(request!==tabRequest)return;
  tab=t;document.querySelectorAll("[data-t]").forEach(x=>x.classList.toggle("on",x.dataset.t===t));bkSel.hidden=true;chSel.hidden=![ "cards","quiz","khulasa"].includes(t);deck=[];idx=0;flip=false;render()
 };
 document.addEventListener("change",e=>{if(e.target&&["newestanLesson","speechChapter","khulasaChapter","ch"].includes(e.target.id))syncRoute()});
 window.addEventListener("hashchange",applyRoute);
 document.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>gotoTab(b.dataset.t));
 $id("backTerms").onclick=back;chSel.onchange=()=>{deck=[];idx=0;flip=false;render()};bkSel.hidden=true;chSel.hidden=true;$id("termNav").hidden=true;if(location.hash&&location.hash!=="#")applyRoute();else{render();updateStats()}
})();