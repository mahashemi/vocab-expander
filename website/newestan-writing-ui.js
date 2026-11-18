/* UI helpers for the source-based Term 01/02 Newestan writing workshops. */
(()=>{
 let selectedLesson=1;
 const draftKey=()=> "t"+activeTerm+"-"+selectedLesson;
 const draftsKey="newestan-writing-drafts-v1";
 function render(lessonNo){
  if(Number.isInteger(Number(lessonNo))&&Number(lessonNo)>=1&&Number(lessonNo)<=10)selectedLesson=Number(lessonNo);
  const rows=((window.NEWESTAN_WRITING_LIBRARY||{})[activeTerm])||[];
  const rec=rows.find(x=>x.no===selectedLesson)||rows[0];
  if(!rec)return "";
  selectedLesson=rec.no;
  let drafts={};try{drafts=JSON.parse(localStorage.getItem(draftsKey)||"{}")}catch(e){}
  const draft=drafts[draftKey()]||{};
  const model=rec.model
   ? '<div class="newestan-model-section"><b>مقدمه</b><p class="fa-block">'+esc(rec.model.muqaddama)+'</p></div>'+
     '<div class="newestan-model-section"><b>متن · بند اول</b><p class="fa-block">'+esc(rec.model.band1)+'</p></div>'+
     '<div class="newestan-model-section"><b>متن · بند دوم</b><p class="fa-block">'+esc(rec.model.band2)+'</p></div>'+
     '<div class="newestan-model-section"><b>نتیجه</b><p class="fa-block">'+esc(rec.model.natija)+'</p></div>'
   : '<div class="newestan-model-section"><b>نمونهٔ متن · Model response</b><div class="fa-block model-sample" style="white-space:pre-wrap">'+esc(rec.modelText||"")+'</div></div>';
  return '<section class="panel newestan-workshop">'+
   '<div class="mut">NEWESTAN · TERM 0'+activeTerm+' · DARS '+String(rec.no).padStart(2,"0")+' · '+esc(rec.source)+'</div>'+
   '<h2 class="fa-block">'+esc(rec.title)+'</h2>'+
   '<div class="newestan-lesson-picker"><div class="newestan-picker-copy"><span class="newestan-picker-kicker">YOUR LEARNING PATH</span><label for="newestanLesson">Choose a Newestan lesson <span>انتخاب درس نیوستان</span></label><small>Select a lesson to open its teaching notes, language tools and writing practice.</small></div><select id="newestanLesson" aria-label="Choose a Newestan lesson">'+rows.map(x=>'<option value="'+x.no+'" '+(x.no===rec.no?'selected':'')+'>Dars '+String(x.no).padStart(2,"0")+' · '+esc(x.title)+'</option>').join("")+'</select></div>'+
   '<div class="newestan-model-section"><b>Writing skill taught in this lesson · مهارت نوشتاری</b><p>'+esc(rec.skill)+'</p></div>'+
   (window.renderNewestanLanguageLesson?window.renderNewestanLanguageLesson(activeTerm,rec.no):'')+
   '<div class="newestan-model-section"><b>تمرین واقعی درس · Textbook exercise</b><p class="fa-block">'+esc(rec.prompt)+'</p><p class="mut">'+esc(rec.promptEn)+'</p></div>'+
   '<div class="newestan-model-section"><b>ریزموضوع‌ها · Supporting subtopics</b><ol class="newestan-support">'+rec.subtopics.map(x=>'<li class="fa-block">'+esc(x)+'</li>').join("")+'</ol></div>'+
   '<div class="newestan-model-section"><b>روش انجام تمرین · Writing steps</b><ol class="newestan-support">'+rec.steps.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ol></div>'+
   '<details open><summary><b>Model response · نمونهٔ پاسخ</b></summary><div class="dc">'+model+'</div></details>'+
   '<div class="newestan-model-section"><b>تمرین شما · Your own writing</b><textarea id="newestanDraft" class="essay-draft" placeholder="مقدمه، بند اول، بند دوم و نتیجه را بنویسید...">'+esc(draft.text||"")+'</textarea><div class="mut" id="newestanDraftSaved">Your draft is saved locally in this browser.</div></div>'+
   '</section>';
 }
 window.renderNewestanTerm1=(lessonNo)=>'<section class="writing-wrap"><div class="mut">TERM 01 · NEWESTAN · SOURCE-BASED WRITING</div><h2>کارگاه نوشتن · Term 01</h2><p>Study the lesson writing guidance, inspect its actual exercise, then compare your work with the developed model.</p>'+render(lessonNo)+'<div class="row no-print"><button class="pri" id="printNewestanLesson">Print this lesson</button></div></section>';
 window.renderNewestanWorkshop=(lessonNo)=>render(lessonNo);
 window.bindNewestanWorkshop=()=>{
  const select=document.getElementById("newestanLesson"),editor=document.getElementById("newestanDraft");
  if(select)select.onchange=e=>{selectedLesson=Number(e.target.value);essays()};
  if(editor)editor.addEventListener("input",()=>{
   let drafts={};try{drafts=JSON.parse(localStorage.getItem(draftsKey)||"{}")}catch(e){}
   drafts[draftKey()]={text:editor.value};
   try{localStorage.setItem(draftsKey,JSON.stringify(drafts))}catch(e){}
   const status=document.getElementById("newestanDraftSaved");
   if(status)status.textContent="Saved locally · "+new Date().toLocaleTimeString();
  });
  if(typeof attachVocabularyLinks==="function"){const scope=document.querySelector(".writing-wrap");if(scope)attachVocabularyLinks(scope)}
  const print=document.getElementById("printNewestanLesson");
  if(print)print.onclick=printCurrent;
 };
})();