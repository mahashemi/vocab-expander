(function(){
 "use strict";
 const STORE="vocab_learning_attempts_v1",MAX_EVENTS=5000;
 const $=s=>document.querySelector(s),esc=s=>{const d=document.createElement("div");d.textContent=s??"";return d.innerHTML.replace(/"/g,"&quot;")};
 const read=()=>{try{const x=JSON.parse(localStorage.getItem(STORE)||"[]");return Array.isArray(x)?x:[]}catch(_){return[]}};
 const write=x=>{try{localStorage.setItem(STORE,JSON.stringify(x.slice(-MAX_EVENTS)))}catch(_){}};
 const items=()=>typeof window.__getAllVocabRows==="function"?window.__getAllVocabRows():[];
 const modes={imla:window.VocabImla,"skip-gram":window.VocabSkipGram,"meaning-recall":window.VocabMeaningRecall};
 let mode="imla",term="all",queueFilter="all",queue=[],index=0,current=null,prompt=null,hints=0,started=0,checked=false,identitySnapshot=null,reviewMap=new Map(),reviewCounts={new:0,due:0,weak:0},showMistakes=false,focusedLegacyId=null,meaningLanguage="en";
 function buildIdentity(){identitySnapshot=window.VocabLearningManifest.build(items())}
 function canonicalItemId(legacyId){const result=window.VocabLearningIdentity.resolveLegacyId(identitySnapshot?.aliasIndex,String(legacyId||""));return result.status==="resolved"?result.itemId:"legacy:"+String(legacyId||"unknown")}
 function history(){return read().map(event=>{const legacyId=event.legacyId||event.itemId;const storedId=String(event.itemId||"");const itemId=storedId.startsWith("vocab:source:")?storedId:canonicalItemId(legacyId);return {...event,legacyId,itemId}})}
 function reviewKey(itemId,modeId){return itemId+"|"+modeId}
 function progressModeId(){return mode==="meaning-recall"?"meaning-recall-"+meaningLanguage:mode}
 function buildReviewMap(){reviewMap=new Map();for(const event of history()){const key=reviewKey(event.itemId,event.modeId);if(!reviewMap.has(key))reviewMap.set(key,[]);reviewMap.get(key).push(event)}}
 function reviewFor(item){return window.VocabReviewScheduler.evaluate(reviewMap.get(reviewKey(canonicalItemId(item.id),progressModeId()))||[])}
 function eligibleRows(){return items().filter(x=>(term==="all"||Number(x.bk)===Number(term))&&modes[mode].eligible(x,mode==="meaning-recall"?{language:meaningLanguage}:{}))}
 function notebookRows(){
  const latest=new Map(),byLegacy=new Map(items().map(x=>[String(x.id),x]));
  for(const event of history()){const key=reviewKey(event.itemId,event.modeId),old=latest.get(key);if(!old||Date.parse(event.occurredAt||0)>=Date.parse(old.occurredAt||0))latest.set(key,event)}
  return [...latest.values()].filter(event=>!event.correct).map(event=>({event,item:byLegacy.get(String(event.legacyId))})).filter(x=>x.item&&(term==="all"||Number(x.item.bk)===Number(term))).sort((a,b)=>Date.parse(b.event.occurredAt||0)-Date.parse(a.event.occurredAt||0));
 }
 function stats(){const h=history();return {attempts:h.length,correct:h.filter(x=>x.correct).length,items:new Set(h.map(x=>x.itemId)).size,mistakes:notebookRows().length}}
 function makeQueue(){
  buildIdentity();buildReviewMap();
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
  prompt=mode==="skip-gram"?modes[mode].createPrompt(current,review.streak):modes[mode].createPrompt(current);
  hints=0;started=Date.now();checked=false;
 }
 function record(result){
  const rows=read();
  rows.push({itemId:canonicalItemId(current.id),legacyId:current.id,modeId:progressModeId(),occurredAt:new Date().toISOString(),correct:result.correct,response:result.response,errorTypes:result.errorTypes||[],hintsUsed:hints,elapsedMs:Math.max(0,Date.now()-started),promptVersion:prompt.version||1});
  write(rows);buildReviewMap();updateQueueStats();
 }
 function updateQueueStats(){
  reviewCounts={new:0,due:0,weak:0};
  for(const item of eligibleRows()){const state=reviewFor(item);if(state.isNew)reviewCounts.new++;if(state.due)reviewCounts.due++;if(state.weak)reviewCounts.weak++;}
  const queueSelect=$("#learningQueue");if(queueSelect){queueSelect.querySelector('option[value="new"]').textContent="New · "+reviewCounts.new;queueSelect.querySelector('option[value="due"]').textContent="Due · "+reviewCounts.due;queueSelect.querySelector('option[value="weak"]').textContent="Needs review · "+reviewCounts.weak;}
  const notebook=$("#learningNotebook");if(notebook)notebook.textContent="Mistake notebook · "+notebookRows().length;
 }
 function shell(){
  const s=stats(),m=identitySnapshot?.stats||{indexedItems:0,ambiguousAliases:0},mistakes=s.mistakes;
  return '<section class="writing-wrap learning-school"><div class="eyebrow">VOCAB EXPANDER · LEARNING SCHOOL</div><div class="row"><button type="button" data-learning-back>← Back to library</button></div><h2>تمرین و یادگیری · Practice & Remember</h2><p>Choose a learning method. Practise words and phrases across all three terms, then revisit weak and due items.</p><div class="panel"><div class="row"><label for="learningTerm">Term</label><select id="learningTerm"><option value="all">All terms</option><option value="1">Term 01</option><option value="2">Term 02</option><option value="3">Term 03</option></select><button type="button" data-mode="imla" class="'+(mode==="imla"?"pri":"")+'">املاء · Imla</button><button type="button" data-mode="skip-gram" class="'+(mode==="skip-gram"?"pri":"")+'">Skip-gram</button><button type="button" data-mode="meaning-recall" class="'+(mode==="meaning-recall"?"pri":"")+'">معنی‌یابی · Meaning recall</button></div><div class="row" id="learningMeaningControls" '+(mode==="meaning-recall"?"":"hidden")+'><label for="learningMeaningLanguage">Meaning language</label><select id="learningMeaningLanguage"><option value="en">English</option><option value="ar">العربية · Arabic</option></select></div><div class="row learning-tools"><label for="learningQueue">Practice queue</label><select id="learningQueue"><option value="all">All eligible items</option><option value="new">New · '+reviewCounts.new+'</option><option value="due">Due · '+reviewCounts.due+'</option><option value="weak">Needs review · '+reviewCounts.weak+'</option></select><button type="button" id="learningNotebook">Mistake notebook · '+mistakes+'</button></div><div class="mut">'+s.attempts+' attempts · '+s.correct+' correct · '+s.items+' distinct items · '+m.indexedItems+' identities indexed · '+m.ambiguousAliases+' ambiguous aliases blocked</div></div><div id="learningExercise"></div></section>';
 }
 function renderNotebook(){
  const root=$("#learningExercise"),rows=notebookRows();
  if(!root)return;
  root.innerHTML='<div class="panel learning-notebook"><div class="row"><div><h3>Mistake notebook · دفتر اشتباهات</h3><p class="mut">Your latest incorrect response for each item and learning mode.</p></div><button id="closeLearningNotebook">Back to practice</button></div>'+(rows.length?rows.map(({event,item})=>'<article class="learning-mistake-entry"><div class="mut">TERM 0'+item.bk+' · Chapter '+esc(item.ch)+' · '+esc(event.modeId)+' · '+esc(event.occurredAt||"")+'</div><div class="fa" dir="rtl" lang="fa">'+esc(item.fa)+'</div><div>'+esc(item.en||"")+'</div><div class="mut">Your answer: '+esc(event.response||"—")+' · '+esc((event.errorTypes||[]).join(", ")||"unclassified")+'</div><button data-practice-mistake="'+esc(item.id)+'" data-practice-mode="'+esc(event.modeId)+'">Practise this item</button></article>').join(""):'<p>No mistakes recorded in this term yet. Keep practising; missed answers will appear here.</p>')+'</div>';
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
  root.innerHTML='<div class="panel learning-question"><div class="mut">'+(index+1)+' / '+queue.length+' · TERM 0'+current.bk+' · Chapter '+esc(current.ch)+' · '+state+' · '+instruction+'</div><h3 class="learning-meaning" '+(meaningMode?'dir="rtl" lang="fa"':"")+'>'+esc(meaning)+'</h3>'+(context?'<p class="mut">Context: '+esc(context)+'</p>':"")+(mode==="skip-gram"?'<div class="fa learning-mask" dir="rtl" lang="fa">'+esc(shown)+'</div>':"")+'<label for="learningAnswer">'+(meaningMode?(meaningLanguage==="en"?"English meaning":"المعنى بالعربية"):"Your Persian answer / پاسخ شما")+'</label><input id="learningAnswer" class="learning-answer" dir="'+direction+'" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="'+placeholder+'" '+(checked?"disabled":"")+'><div class="row"><button class="pri" id="learningCheck" '+(checked?"disabled":"")+'>Check answer</button><button id="learningHint" '+(checked?"disabled":"")+'>Hint · '+hints+'</button><button id="learningNext" '+(!checked?"disabled":"")+'>Next →</button></div><div id="learningFeedback" aria-live="polite"></div></div>';
  const answer=$("#learningAnswer");answer.focus();answer.addEventListener("keydown",e=>{if(e.key==="Enter"&&!checked)check()});
  $("#learningCheck").onclick=check;$("#learningNext").onclick=next;$("#learningHint").onclick=hint;
 }
 function check(){
  if(checked||!current)return;
  const response=$("#learningAnswer").value,result=modes[mode].validate(current,response,prompt);
  checked=true;record(result);
  $("#learningAnswer").disabled=true;$("#learningCheck").disabled=true;$("#learningHint").disabled=true;$("#learningNext").disabled=false;
  const sem=current.sem||{};
  const details=mode==="meaning-recall"
   ?'<div class="semantic-feedback"><p><b>فارسی:</b> '+esc(sem.faMeaning||current.fa)+'</p><p><b>English:</b> '+esc(sem.enMeaning||current.en||"")+'</p><p dir="rtl" lang="ar"><b>العربية:</b> '+esc(sem.arMeaning||"")+'</p></div>'
   :'<div>'+esc(current.tr||"")+' · '+esc(current.en||"")+'</div>';
  $("#learningFeedback").innerHTML='<div class="learning-feedback '+(result.correct?"correct":"incorrect")+'"><b>'+(result.correct?"آفرین! Correct":"Not quite · Let’s learn it")+'</b><div class="fa" lang="fa" dir="rtl">'+esc(current.fa)+'</div>'+details+(result.correct?'<p>Good retrieval. Your next review interval is '+reviewFor(current).intervalDays+' day(s).</p>':'<p>Review the answer, then continue. Error pattern: '+esc((result.errorTypes||[]).join(", ")||"not classified")+'</p>')+'</div>';
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
  root.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>{mode=b.dataset.mode;focusedLegacyId=null;makeQueue();render()});
  $("#learningNotebook").onclick=()=>{showMistakes=true;exercise()};
  exercise();
 }
 window.learningSchool=()=>{makeQueue();render()};
})();
