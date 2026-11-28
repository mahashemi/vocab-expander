(function(){
 "use strict";
 const STORE="vocab_learning_attempts_v1",MAX_EVENTS=5000;
 const $=s=>document.querySelector(s),esc=s=>{const d=document.createElement("div");d.textContent=s??"";return d.innerHTML.replace(/"/g,"&quot;")};
 const read=()=>{try{const x=JSON.parse(localStorage.getItem(STORE)||"[]");return Array.isArray(x)?x:[]}catch(_){return[]}};
 const write=x=>{try{localStorage.setItem(STORE,JSON.stringify(x.slice(-MAX_EVENTS)))}catch(_){}};
 let rowSnapshot=null,canonicalItemIds=new Set(),reviewMapBuilt=false;
 const items=()=>rowSnapshot||(rowSnapshot=(()=>{
  const rows=Array.isArray(window.LEARNING_SCHOOL_DATA?.rows)?window.LEARNING_SCHOOL_DATA.rows.slice():(typeof window.__getAllVocabRows==="function"?window.__getAllVocabRows():[]);
  const custom=typeof window.__getCustomVocabRows==="function"?window.__getCustomVocabRows():[];
  for(const entry of custom){
   if(!Array.isArray(entry)||entry.length<5)continue;
   const [book,chapter,fa,tr,en,xf="",xt="",xe=""]=entry;
   const bk=Number(book),ch=Number(chapter);
   if(![1,2,3].includes(bk)||!fa)continue;
   rows.push({bk,ch,units:[ch],fa:String(fa),tr:String(tr||""),en:String(en||""),xf:String(xf||""),xt:String(xt||""),xe:String(xe||""),nt:"",source:"user-added",sources:[],id:bk+"|"+ch+"|"+String(fa),sem:(window.PERSIAN_SEMANTICS||{})[String(fa)]||null});
  }
  return rows;
 })());
 const modes={imla:{...window.VocabImla,id:"imla"},"skip-gram":{...window.VocabSkipGram,id:"skip-gram"},"meaning-recall":{...window.VocabMeaningRecall,id:"meaning-recall"}};
 const modeRegistry=window.VocabLearningModeRegistry.create(Object.values(modes));
 window.VocabLearningSchoolModeIds=modeRegistry.list().map(item=>item.id);
 if(!modeRegistry.get("imla")||!modeRegistry.get("skip-gram")||!modeRegistry.get("meaning-recall"))throw new Error("The Learning School is missing a required independent learning mode.");
 let mode="imla",term="all",queueFilter="all",queue=[],index=0,current=null,prompt=null,hints=0,started=0,checked=false,identitySnapshot=null,reviewMap=new Map(),reviewCounts={new:0,due:0,weak:0},showMistakes=false,focusedLegacyId=null,meaningLanguage="en";
 function buildIdentity(){
  if(identitySnapshot)return;
  const data=window.LEARNING_SCHOOL_DATA;
  if(data?.aliasIndex){
   const aliases={...(data.aliasIndex.aliases||{})};
   const ambiguous=[...(data.aliasIndex.ambiguous||[])];
   const canonicalIds=new Set(Object.values(aliases));
   const customRows=items().filter(row=>row.source==="user-added");
   if(customRows.length){
    const customBuilt=window.VocabLearningManifest.build(customRows);
    for(const [legacyId,itemId] of Object.entries(customBuilt.aliasIndex.aliases||{})){
     if(aliases[legacyId]&&aliases[legacyId]!==itemId)continue;
     aliases[legacyId]=itemId;
     canonicalIds.add(itemId);
    }
    ambiguous.push(...(customBuilt.aliasIndex.ambiguous||[]));
   }
   const aliasIndex={valid:!!data.aliasIndex.valid,errors:[],aliases,ambiguous:[...new Set(ambiguous)]};
   identitySnapshot={
    manifest:{schemaVersion:1,items:[...canonicalIds].map(itemId=>({itemId}))},
    aliasIndex,
    stats:{...(data.stats||{}),indexedItems:canonicalIds.size,ambiguousAliases:aliasIndex.ambiguous.length}
   };
  }else identitySnapshot=window.VocabLearningManifest.build(items());
  canonicalItemIds=new Set(identitySnapshot.manifest.items.map(item=>item.itemId));
 }
 function canonicalItemId(legacyId,storedItemId,row){
  const priorId=String(storedItemId||"");
  if(priorId.startsWith("vocab:canonical:")&&canonicalItemIds.has(priorId))return priorId;
  if(priorId.startsWith("vocab:source:")){
   const prior=window.VocabLearningIdentity.resolveLegacyId(identitySnapshot?.aliasIndex,priorId);
   if(prior.status==="resolved")return prior.itemId;
  }
  if(row?.fa){
   const sourceId=window.VocabLearningManifest.legacyStableKey(String(legacyId||""),String(row.fa));
   const prior=window.VocabLearningIdentity.resolveLegacyId(identitySnapshot?.aliasIndex,sourceId);
   if(prior.status==="resolved")return prior.itemId;
   const rowId=window.VocabLearningManifest.identityForRow(row);
   if(canonicalItemIds.has(rowId))return rowId;
  }
  const result=window.VocabLearningIdentity.resolveLegacyId(identitySnapshot?.aliasIndex,String(legacyId||""));
  return result.status==="resolved"?result.itemId:"legacy:"+String(legacyId||"unknown");
 }
 function history(){return read().map(event=>{const legacyId=event.legacyId||event.itemId;const itemId=canonicalItemId(legacyId,event.itemId);return {...event,legacyId,itemId}})}
 function reviewKey(itemId,modeId){return itemId+"|"+modeId}
 function progressModeId(){return mode==="meaning-recall"?"meaning-recall-"+meaningLanguage:mode}
 function buildReviewMap(){reviewMap=new Map();for(const event of history()){const key=reviewKey(event.itemId,event.modeId);if(!reviewMap.has(key))reviewMap.set(key,[]);reviewMap.get(key).push(event)}reviewMapBuilt=true}
 function reviewFor(item){return window.VocabReviewScheduler.evaluate(reviewMap.get(reviewKey(canonicalItemId(item.id,null,item),progressModeId()))||[])}
 function eligibleRows(){
  const selected=modeRegistry.get(mode);
  let candidates=items().filter(x=>term==="all"||Number(x.bk)===Number(term));
  if(focusedLegacyId)candidates=candidates.filter(x=>String(x.id)===String(focusedLegacyId));
  const canonicalRows=window.VocabLearningManifest.selectPracticeRows(candidates,identitySnapshot?.aliasIndex,term);
  return canonicalRows.filter(x=>selected&&selected.eligible(x,mode==="meaning-recall"?{language:meaningLanguage}:{}));
 }
 function notebookRows(){
  const latest=new Map(),byLegacy=new Map();
  for(const row of items()){
   const key=String(row.id)+"|"+canonicalItemId(row.id,null,row);
   byLegacy.set(key,row);
  }
  for(const event of history()){const key=reviewKey(event.itemId,event.modeId),old=latest.get(key);if(!old||Date.parse(event.occurredAt||0)>=Date.parse(old.occurredAt||0))latest.set(key,event)}
  return [...latest.values()].filter(event=>!event.correct).map(event=>({event,item:byLegacy.get(String(event.legacyId)+"|"+event.itemId)})).filter(x=>x.item&&(term==="all"||Number(x.item.bk)===Number(term))).sort((a,b)=>Date.parse(b.event.occurredAt||0)-Date.parse(a.event.occurredAt||0));
 }
 function stats(){const h=history(),errors=new Map();for(const event of h)if(event.modeId==="imla")for(const type of event.errorTypes||[])errors.set(type,(errors.get(type)||0)+1);const spellingPatterns=[...errors].sort((a,b)=>b[1]-a[1]).slice(0,3);return {attempts:h.length,correct:h.filter(x=>x.correct).length,items:new Set(h.map(x=>x.itemId)).size,mistakes:notebookRows().length,spellingPatterns}}
 function makeQueue(){
  buildIdentity();if(!reviewMapBuilt)buildReviewMap();
  const candidates=eligibleRows();reviewCounts={new:0,due:0,weak:0};
  const decorated=candidates.map(item=>({item,state:reviewFor(item)}));
  for(const x of decorated){if(x.state.isNew)reviewCounts.new++;if(x.state.due)reviewCounts.due++;if(x.state.weak)reviewCounts.weak++}
  let chosen=decorated.filter(x=>queueFilter==="all"||(queueFilter==="new"&&x.state.isNew)||(queueFilter==="due"&&x.state.due)||(queueFilter==="weak"&&x.state.weak));
  if(focusedLegacyId)chosen=chosen.filter(x=>String(x.item.id)===String(focusedLegacyId));
  chosen.sort((a,b)=>{
   const rank=x=>x.state.isNew?0:x.state.due?1:x.state.weak?2:3;
   return rank(a)-rank(b)||a.state.attempts-b.state.attempts;
  });
  queue=chosen.map(x=>x.item);index=0;loadCurrent();
 }
 function loadCurrent(){
  if(!queue.length){current=null;prompt=null;return}
  if(index>=queue.length)index=0;
  current=queue[index];
  const review=reviewFor(current);
  prompt=mode==="skip-gram"?modes[mode].createPrompt(current,review.streak):mode==="meaning-recall"?modes[mode].createPrompt(current,{language:meaningLanguage}):modes[mode].createPrompt(current);
  hints=0;started=Date.now();checked=false;
 }
 function record(result){
  const rows=read();
  rows.push({itemId:canonicalItemId(current.id,null,current),legacyId:current.id,modeId:progressModeId(),occurredAt:new Date().toISOString(),correct:result.correct,response:result.response,errorTypes:result.errorTypes||[],errorPositions:result.errorPositions||[],errorDetails:result.errorDetails||[],hintsUsed:hints,elapsedMs:Math.max(0,Date.now()-started),promptVersion:prompt.version||1});
  write(rows);buildReviewMap();updateQueueStats();
 }
 function updateQueueStats(){
  reviewCounts={new:0,due:0,weak:0};
  for(const item of eligibleRows()){const state=reviewFor(item);if(state.isNew)reviewCounts.new++;if(state.due)reviewCounts.due++;if(state.weak)reviewCounts.weak++;}
  const queueSelect=$("#learningQueue");if(queueSelect){queueSelect.querySelector('option[value="new"]').textContent="New · "+reviewCounts.new;queueSelect.querySelector('option[value="due"]').textContent="Due · "+reviewCounts.due;queueSelect.querySelector('option[value="weak"]').textContent="Needs review · "+reviewCounts.weak;}
  const notebook=$("#learningNotebook");if(notebook)notebook.textContent="Mistake notebook · "+notebookRows().length;
 }
 function summaryCards(){
  const report=window.VocabLearningProgressSummary.build(history(),items());
  const cards=report.terms.map(item=>{
   const accuracy=item.accuracy==null?"Not practised yet":Math.round(item.accuracy*100)+"% accuracy";
   return '<article class="learning-term-card"><b>Term 0'+item.term+'</b><strong>'+item.distinctItems+'</strong><span>items practised</span><small>'+item.attempts+' attempts · '+accuracy+'</small></article>';
  }).join("");
  const total=report.all.accuracy==null?"No attempts yet":Math.round(report.all.accuracy*100)+"% accuracy";
  return '<div class="learning-summary"><div class="learning-summary-heading"><b>Practice across all three terms</b><span>'+report.all.distinctItems+' term-specific items · '+report.all.attempts+' attempts · '+total+'</span></div><div class="learning-term-grid">'+cards+'</div><p class="mut">These are practice statistics, not mastery claims. The same vocabulary may appear in more than one term.</p></div>';
 }
 function shell(){
  const s=stats(),m=identitySnapshot?.stats||{indexedItems:0,ambiguousAliases:0},mistakes=s.mistakes,patterns=s.spellingPatterns.length?" · Common spelling errors: "+s.spellingPatterns.map(([k,v])=>k+" ("+v+")").join(", "):"";
  return '<section class="writing-wrap learning-school"><div class="eyebrow">VOCAB EXPANDER · LEARNING SCHOOL</div><div class="row"><button type="button" data-learning-back>← Back to library</button></div><h2>تمرین و یادگیری · Practice & Remember</h2><p>Choose a learning method. Practise words and phrases across all three terms, then revisit weak and due items.</p><div class="panel"><div class="row"><label for="learningTerm">Term</label><select id="learningTerm"><option value="all">All terms</option><option value="1">Term 01</option><option value="2">Term 02</option><option value="3">Term 03</option></select><button type="button" data-mode="imla" class="'+(mode==="imla"?"pri":"")+'">املاء · Imla</button><button type="button" data-mode="skip-gram" class="'+(mode==="skip-gram"?"pri":"")+'">Skip-gram</button><button type="button" data-mode="meaning-recall" class="'+(mode==="meaning-recall"?"pri":"")+'">معنی‌یابی · Meaning recall</button></div><div class="row" id="learningMeaningControls" style="'+(mode==="meaning-recall"?"display:flex":"display:none")+'"><label for="learningMeaningLanguage">Meaning language</label><select id="learningMeaningLanguage"><option value="en">English</option><option value="ar">العربية · Arabic</option></select></div><div class="row learning-tools"><label for="learningQueue">Practice queue</label><select id="learningQueue"><option value="all">All eligible items</option><option value="new">New · '+reviewCounts.new+'</option><option value="due">Due · '+reviewCounts.due+'</option><option value="weak">Needs review · '+reviewCounts.weak+'</option></select><button type="button" id="learningNotebook">Mistake notebook · '+mistakes+'</button></div><div class="mut">'+s.attempts+' attempts · '+s.correct+' correct · '+s.items+' distinct items · '+m.indexedItems+' identities indexed · '+m.ambiguousAliases+' ambiguous aliases blocked'+esc(patterns)+'</div></div>'+summaryCards()+'<div id="learningExercise"></div></section>';
 }
 function renderNotebook(){
  const root=$("#learningExercise"),rows=notebookRows();
  if(!root)return;
  root.innerHTML='<div class="panel learning-notebook"><div class="row"><div><h3>Mistake notebook · دفتر اشتباهات</h3><p class="mut">Your latest incorrect response for each item and learning mode.</p></div><button id="closeLearningNotebook">Back to practice</button></div>'+(rows.length?rows.map(({event,item})=>'<article class="learning-mistake-entry"><div class="mut">TERM 0'+item.bk+' · Chapter '+esc(item.ch)+' · '+esc(event.modeId)+' · '+esc(event.occurredAt||"")+'</div><div class="fa" dir="rtl" lang="fa">'+esc(item.fa)+'</div><div>'+esc(item.en||"")+'</div><div class="mut">Your answer: '+esc(event.response||"—")+' · '+esc((event.errorTypes||[]).join(", ")||"unclassified")+(event.errorPositions?.length?' · positions: '+esc(event.errorPositions.join(", ")):"")+'</div>'+(event.errorDetails?.length?'<div class="mut">Details: '+esc(event.errorDetails.slice(0,4).map(x=>x.position+': '+(x.expected||"∅")+' → '+(x.actual||"∅")).join(" · "))+'</div>':"")+'<button data-practice-mistake="'+esc(item.id)+'" data-practice-mode="'+esc(event.modeId)+'">Practise this item</button></article>').join(""):'<p>No mistakes recorded in this term yet. Keep practising; missed answers will appear here.</p>')+'</div>';
  $("#closeLearningNotebook").onclick=()=>{showMistakes=false;exercise()};
  root.querySelectorAll("[data-practice-mistake]").forEach(button=>button.onclick=()=>{focusedLegacyId=button.dataset.practiceMistake;const savedMode=button.dataset.practiceMode;if(savedMode.startsWith("meaning-recall-")){mode="meaning-recall";meaningLanguage=savedMode.slice("meaning-recall-".length)}else mode=savedMode;queueFilter="all";showMistakes=false;makeQueue();render()});
 }
 function exercise(){
  const root=$("#learningExercise");if(!root)return;
  if(showMistakes){renderNotebook();return}
  if(!current){root.innerHTML='<div class="panel"><h3>No eligible items in this selection</h3><p>Try another term, mode or queue. Items without a reliable meaning or usable spelling are intentionally excluded.</p></div>';return}
  const meaningMode=mode==="meaning-recall",meaning=meaningMode?current.fa:(current.en||current.sem?.enMeaning||""),shown=mode==="skip-gram"?modes[mode].mask(prompt):"",review=reviewFor(current);
  const state=review.isNew?"New item":review.due?"Due for review":review.weak?"Needs review":"In practice";
  const instruction=meaningMode?(meaningLanguage==="en"?"Write the English meaning":"اكتب المعنى بالعربية"):(mode==="imla"?"Recall the Persian spelling":"Complete the missing letters");
  const context=meaningMode?current.xf:current.xe;
  const placeholder=meaningMode?(meaningLanguage==="en"?"Type the English meaning…":"المعنى بالعربية…"):"پاسخ را اینجا بنویسید…";
  const direction=meaningMode&&meaningLanguage==="ar"?"rtl":"auto";
  root.innerHTML='<div class="panel learning-question"><div class="mut">'+(index+1)+' / '+queue.length+' · TERM 0'+current.bk+' · Chapter '+esc(current.ch)+' · '+state+' · '+instruction+'</div><h3 class="learning-meaning" '+(meaningMode?'dir="rtl" lang="fa"':"")+'>'+esc(meaning)+'</h3>'+(context?'<p class="mut">Context: '+esc(context)+'</p>':"")+(mode==="skip-gram"?'<div class="fa learning-mask" dir="rtl" lang="fa">'+esc(shown)+'</div>':"")+'<label for="learningAnswer">'+(meaningMode?(meaningLanguage==="en"?"English meaning":"المعنى بالعربية"):"Your Persian answer / پاسخ شما")+'</label><input id="learningAnswer" class="learning-answer" dir="'+direction+'" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="'+placeholder+'" '+(checked?"disabled":"")+'><div class="row"><button class="pri" id="learningCheck" '+(checked?"disabled":"")+'>Check answer</button><button id="learningHint" '+(checked?"disabled":"")+'>Hint · '+hints+'</button><button id="learningNext" '+(!checked?"disabled":"")+'>Next →</button><button type="button" id="learningVocabCard">Vocabulary card</button></div><div id="learningFeedback" aria-live="polite"></div></div>';
  const answer=$("#learningAnswer");answer.focus();answer.addEventListener("keydown",e=>{if(e.key==="Enter"&&!checked)check()});
  $("#learningCheck").onclick=check;$("#learningNext").onclick=next;$("#learningHint").onclick=hint;
  $("#learningVocabCard").onclick=async()=>{
   const button=$("#learningVocabCard");
   try{
    if(typeof window.ensureLearningSemantics==="function"&&!window.LEARNING_SCHOOL_SEMANTICS_READY)await window.ensureLearningSemantics();
    window.openSharedVocabularyCard?.(current.id,button,current);
   }catch(error){
    const feedback=$("#learningFeedback");
    if(feedback)feedback.innerHTML='<div class="learning-feedback incorrect" role="alert">The vocabulary card could not be opened. Please try again.</div>';
   }
  };
 }
 function check(){
  if(checked||!current)return;
  const response=$("#learningAnswer").value,result=modes[mode].validate(current,response,prompt);
  checked=true;record(result);
  $("#learningAnswer").disabled=true;$("#learningCheck").disabled=true;$("#learningHint").disabled=true;$("#learningNext").disabled=false;
  const sem=current.sem||{};
  const details=mode==="meaning-recall"
   ?'<div class="semantic-feedback"><p><b>فارسی:</b> '+esc(sem.faMeaning||current.fa)+'</p><p><b>English:</b> '+esc(sem.enMeaning||current.en||"")+'</p><p dir="rtl" lang="ar"><b>العربية:</b> '+esc(sem.arMeaning||"")+'</p></div>'
   :'<div>'+esc(current.tr||"")+' · '+esc(current.en||"")+'</div>'+(sem.arMeaning?'<div dir="rtl" lang="ar">العربية: '+esc(sem.arMeaning)+'</div>':"");
  const diagnostics=(result.errorDetails||[]).slice(0,4).map(x=>x.position+': '+(x.expected||"∅")+' → '+(x.actual||"∅")).join(" · ");
  $("#learningFeedback").innerHTML='<div class="learning-feedback '+(result.correct?"correct":"incorrect")+'"><b>'+(result.correct?"آفرین! Correct":"Not quite · Let’s learn it")+'</b><div class="fa" lang="fa" dir="rtl">'+esc(current.fa)+'</div>'+details+(result.correct?'<p>Good retrieval. Your next review interval is '+reviewFor(current).intervalDays+' day(s).</p>':'<p>Review the answer, then continue. Error pattern: '+esc((result.errorTypes||[]).join(", ")||"not classified")+'</p>'+(diagnostics?'<p>Letter-level feedback: '+esc(diagnostics)+'</p>':""))+'</div>';
 }
 function hint(){if(checked||!current)return;const text=modes[mode].hint(current,prompt,hints);hints++;const el=$("#learningFeedback");el.innerHTML='<div class="mut learning-hint">'+esc(text)+'</div>';const b=$("#learningHint");b.textContent="Hint · "+hints}
 function next(){if(focusedLegacyId||queueFilter!=="all"){focusedLegacyId=null;makeQueue();exercise();return}index++;if(index>=queue.length)index=0;loadCurrent();exercise()}
 function render(){
  const root=$("#v");root.innerHTML=shell();
  const back=$("[data-learning-back]");if(back)back.onclick=()=>{location.hash="#/"};
  $("#learningTerm").value=term;$("#learningQueue").value=queueFilter;
  const languageSelect=$("#learningMeaningLanguage");if(languageSelect){languageSelect.value=meaningLanguage;languageSelect.onchange=e=>{meaningLanguage=e.target.value;focusedLegacyId=null;makeQueue();render()}}
  $("#learningTerm").onchange=e=>{term=e.target.value;focusedLegacyId=null;makeQueue();render()};
  $("#learningQueue").onchange=e=>{queueFilter=e.target.value;focusedLegacyId=null;showMistakes=false;makeQueue();render()};
  root.querySelectorAll("[data-mode]").forEach(b=>b.onclick=async()=>{
   const nextMode=b.dataset.mode;
   if(nextMode==="meaning-recall"&&typeof window.ensureLearningSemantics==="function"&&!window.LEARNING_SCHOOL_SEMANTICS_READY){
    const root=$("#learningExercise");
    if(root)root.innerHTML='<div class="panel" role="status">Loading verified trilingual meanings…</div>';
    try{await window.ensureLearningSemantics()}catch(error){
     if(root)root.innerHTML='<div class="panel" role="alert">Meanings could not be loaded. Please try again. <small>'+esc(error.message||error)+'</small></div>';
     return;
    }
   }
   if(nextMode==="meaning-recall"){reviewMapBuilt=false;}
   mode=nextMode;focusedLegacyId=null;makeQueue();render();
  });
  $("#learningNotebook").onclick=()=>{showMistakes=true;exercise()};
  exercise();
  if(!window.__learningSchoolFirstExerciseMarked&&current&&window.performance&&window.performance.mark){window.__learningSchoolFirstExerciseMarked=true;window.performance.mark("vocab-learning-school-first-exercise")}
 }
 window.learningSchool=()=>{window.ensureSharedVocabularyModal?.();makeQueue();render()};
})();
