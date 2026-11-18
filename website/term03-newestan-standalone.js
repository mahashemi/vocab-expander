/* Standalone Term 03 Newestan lesson selector and writing workshop. */
(()=>{
 const titles={
  "N3-01":"Paragraph and essay organisation","N3-02":"Biography writing",
  "N3-03":"Description and point of view","N3-04":"Problem and solution writing",
  "N3-05":"Descriptive writing","N3-06":"Critical review","N3-07":"Travel planning",
  "N3-08":"People and customs","N3-09":"Academic writing","N3-10":"Research writing"
 };
 let selected=1;
 const store="newestan-writing-drafts-v1";
 const escText=s=>esc(s||"");
 window.renderNewestanTerm3=(lessonNo)=>{
  if(Number.isInteger(Number(lessonNo))&&Number(lessonNo)>=1&&Number(lessonNo)<=10)selected=Number(lessonNo);
  const source=window.TERM3_NEWESTAN_INSHA||{};
  const rows=Object.keys(source).sort();
  const lesson=rows.find(x=>Number(x.slice(-2))===selected)||rows[0];
  selected=Number(lesson.slice(-2));
  const rec=source[lesson],teach=(window.TERM3_NEWESTAN_TEACHING||{})[lesson]||{};
  let drafts={};try{drafts=JSON.parse(localStorage.getItem(store)||"{}")}catch(e){}
  const draft=(drafts["t3-"+selected]||{}).text||"";
  const options=rows.map(x=>'<option value="'+Number(x.slice(-2))+'" '+(x===lesson?'selected':'')+'>Dars '+x.slice(-2)+' · '+escText(titles[x])+'</option>').join("");
  const prompts=rec.researchForm
   ? '<div class="newestan-model-section"><b>Research topics · موضوع‌های تحقیق</b><ol class="newestan-support">'+(rec.exampleResearchTopics||[]).map(x=>'<li><div class="fa-block">'+escText(x.fa)+'</div><div class="mut">'+escText(x.en)+'</div></li>').join("")+'</ol><p class="mut">This lesson teaches research-project writing, not an ordinary essay prompt.</p></div>'
   : '<div class="newestan-model-section"><b>Textbook exercise · تمرین واقعی درس</b><ol class="newestan-support">'+(rec.topics||[]).map(x=>'<li><div class="fa-block">'+escText(x.fa)+'</div><div class="mut">'+escText(x.en)+'</div></li>').join("")+'</ol></div>';
  const skill=teach.skill?'<div class="newestan-model-section"><b>Writing skill from Biyāmozīm · مهارت نوشتاری</b><p>'+escText(teach.skill)+'</p></div>':'';
  const bilingual=teach.bilingual?'<div class="newestan-model-section"><b>Understand the lesson · شرح الدرس بالعربية</b><p>'+escText(teach.bilingual.en)+'</p><p class="fa-block" dir="rtl" style="text-align:right">'+escText(teach.bilingual.ar)+'</p></div>':'';
  const subs=teach.subtopics?'<div class="newestan-model-section"><b>Suggested supporting subtopics · ریزموضوع‌ها</b><ol class="newestan-support">'+teach.subtopics.map(x=>'<li class="fa-block">'+escText(x)+'</li>').join("")+'</ol><p class="mut">These are developed study suggestions, not a verbatim textbook list.</p></div>':'';
  const steps=teach.steps?'<div class="newestan-model-section"><b>Writing steps · روش نگارش</b><ol class="newestan-support">'+teach.steps.map(x=>'<li>'+escText(x)+'</li>').join("")+'</ol></div>':'';
  const timeline=teach.timeline?'<div class="newestan-model-section"><b>Chronological timeline · جدول زمانی</b><ol class="newestan-support">'+teach.timeline.map(x=>'<li><b>'+escText(x.date)+'</b> — '+escText(x.event)+'</li>').join("")+'</ol><p class="mut">The lesson asks you to prepare a timeline before writing. Check dates against reliable sources.</p></div>':'';
  const connectors=teach.timeConnectors?'<div class="newestan-model-section"><b>Time connectors · عوامل ربط زمانی</b><p class="fa-block">'+teach.timeConnectors.map(escText).join(" · ")+'</p><p class="mut">Use these to show sequence; do not repeat the same connector in every sentence.</p></div>':'';
  const rubric=teach.examRubric?'<div class="newestan-model-section"><b>Exam marking rubric · بارم‌بندی امتحان (۲۰ نمره)</b><ul class="newestan-support">'+teach.examRubric.map(x=>'<li><b>'+escText(x.label)+' — '+x.points+'/20</b>: '+escText(x.detail)+'</li>').join("")+'</ul><p class="mut">Use this as a final self-check before submitting your writing.</p></div>':'';
  const examNote=teach.examNote?'<div class="newestan-model-section"><b>Important exam note · نکتهٔ مهم امتحانی</b><p>'+escText(teach.examNote)+'</p></div>':'';
  const sourceNote=teach.sourceNote?'<p class="mut">'+escText(teach.sourceNote)+'</p>':'';
  const model=teach.model?'<details open><summary><b>Model essay · نمونهٔ انشا</b></summary><div class="dc">'+
   '<div class="newestan-model-section"><b>مقدمه</b><p class="fa-block">'+escText(teach.model.muqaddama)+'</p></div>'+
   '<div class="newestan-model-section"><b>بخش میانی · بند اول</b><p class="fa-block">'+escText(teach.model.band1)+'</p></div>'+
   '<div class="newestan-model-section"><b>بخش میانی · بند دوم</b><p class="fa-block">'+escText(teach.model.band2)+'</p></div>'+
   '<div class="newestan-model-section"><b>نتیجه</b><p class="fa-block">'+escText(teach.model.natija)+'</p></div></div></details>':'';
  const internetModel=teach.modelInternet?'<details open><summary><b>Alternative model · Internet benefits and harms / نموذج بديل: فوائد الإنترنت وأضراره</b></summary><div class="dc">'+
   '<div class="newestan-model-section"><b>مقدمه</b><p class="fa-block">'+escText(teach.modelInternet.muqaddama)+'</p></div>'+
   '<div class="newestan-model-section"><b>بخش میانی · بند اول</b><p class="fa-block">'+escText(teach.modelInternet.band1)+'</p></div>'+
   '<div class="newestan-model-section"><b>بخش میانی · بند دوم</b><p class="fa-block">'+escText(teach.modelInternet.band2)+'</p></div>'+
   '<div class="newestan-model-section"><b>نتیجه</b><p class="fa-block">'+escText(teach.modelInternet.natija)+'</p></div></div></details>':'';
  const research=lesson==="N3-10"&&window.TERM3_NEWESTAN_FINAL_INSHA?'<details open><summary><b>Developed research model · نمونهٔ تحقیق</b></summary><div class="dc fa-block model-sample">'+escText(window.TERM3_NEWESTAN_FINAL_INSHA.sample)+'</div></details>':'';
  return '<section class="writing-wrap"><div class="mut">TERM 03 · NEWESTAN · INDEPENDENT WRITING CURRICULUM</div><h2>کارگاه نوشتن · Term 03</h2><p>Choose a Newestan lesson. This selector and its exercises are independent of Farsi Umumi (FA) chapters.</p>'+
   '<section class="panel newestan-workshop"><div class="mut">NEWESTAN · '+lesson+' · '+escText(rec.source)+'</div><div class="newestan-lesson-picker"><div class="newestan-picker-copy"><span class="newestan-picker-kicker">YOUR LEARNING PATH</span><label for="newestanLesson">Choose a Newestan lesson <span>انتخاب درس نیوستان</span></label><small>Select a lesson to open its teaching notes, language tools and writing practice.</small></div><select id="newestanLesson" aria-label="Choose a Newestan lesson">'+options+'</select></div><h2>'+escText(titles[lesson])+'</h2><p class="mut">'+escText(rec.note||"")+'</p>'+
   prompts+skill+bilingual+subs+steps+timeline+connectors+model+internetModel+rubric+examNote+research+sourceNote+
   '<div class="newestan-model-section"><b>Your own writing · تمرین شما</b><textarea id="newestanDraft" class="essay-draft" placeholder="مقدمه، بند اول، بند دوم و نتیجه را بنویسید...">'+escText(draft)+'</textarea><div class="mut" id="newestanDraftSaved">Your draft is saved locally in this browser.</div></div></section>'+
   '<div class="row no-print"><button class="pri" id="printNewestanLesson">Print this lesson</button></div></section>';
 };
 window.bindNewestanTerm3=()=>{
  const sel=document.getElementById("newestanLesson"),editor=document.getElementById("newestanDraft");
  if(sel)sel.onchange=e=>{selected=Number(e.target.value);essays()};
  if(editor)editor.oninput=()=>{
   let drafts={};try{drafts=JSON.parse(localStorage.getItem(store)||"{}")}catch(e){}
   drafts["t3-"+selected]={text:editor.value};
   try{localStorage.setItem(store,JSON.stringify(drafts))}catch(e){}
   const status=document.getElementById("newestanDraftSaved");
   if(status)status.textContent="Saved locally · "+new Date().toLocaleTimeString();
  };
  if(typeof attachVocabularyLinks==="function"){const scope=document.querySelector(".newestan-workshop");if(scope)attachVocabularyLinks(scope)}
  const print=document.getElementById("printNewestanLesson");if(print)print.onclick=printCurrent;
 };
})();