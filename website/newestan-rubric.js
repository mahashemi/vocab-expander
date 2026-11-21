/* Source-based 20-point Newestan self-assessment.
   Terms 01 and 03 have this rubric in their OCR writing assessments.
   Term 02 does not show this rubric in its current OCR set, so it is not invented there. */
(()=>{
 const STORE_KEY="newestan-writing-rubric-scores-v1";
 const defaults={
  1:[
   {key:"content",label:"محتوا · Content",points:5,detail:"Address the assigned topic and cover its required subtopics."},
   {key:"components",label:"اجزای متن · Text components",points:4,detail:"Include a clear opening, developed middle and appropriate closing."},
   {key:"structure",label:"ساختار متن · Text structure",points:5,detail:"Maintain coherence, cohesion, logical order and connected paragraphs."},
   {key:"language",label:"زبان · Language",points:6,detail:"Use suitable grammar and language level, accurate writing and correct spelling."}
  ],
  3:[
   {key:"content",label:"محتوا · Content",points:5,detail:"Address the assigned topic and cover its required subtopics."},
   {key:"communication",label:"اهداف ارتباطی · Communicative objectives",points:4,detail:"Provide an opening, a developed middle and a fitting conclusion with sufficient explanation."},
   {key:"structure",label:"ساختار متن · Text structure",points:5,detail:"Maintain coherence, cohesion, logical order and connected paragraphs."},
   {key:"language",label:"زبان · Language",points:6,detail:"Use suitable grammar and language level, accurate writing and correct spelling."}
  ]
 };
 const esc=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
 const read=()=>{try{return JSON.parse(localStorage.getItem(STORE_KEY)||"{}")}catch(e){return {}}};
 const lessonKey=(term,lesson)=>"t"+Number(term)+"-"+Number(lesson);
 function render(term,lesson,customRows){
  term=Number(term);lesson=Number(lesson);
  const sourceRows=Array.isArray(customRows)&&customRows.length?customRows:defaults[term];
  if(!sourceRows)return "";
  const rows=sourceRows.map((row,index)=>({key:row.key||"criterion-"+index,label:row.label||("Criterion "+(index+1)),points:Number(row.points)||0,detail:row.detail||""}));
  const saved=read()[lessonKey(term,lesson)]||{};
  const max=rows.reduce((sum,row)=>sum+row.points,0);
  const total=rows.reduce((sum,row)=>sum+(Object.prototype.hasOwnProperty.call(saved,row.key)?Number(saved[row.key])||0:0),0);
  const rated=rows.filter(row=>Object.prototype.hasOwnProperty.call(saved,row.key)).length;
  const controls=rows.map(row=>{
   const id="newestan-rubric-"+term+"-"+lesson+"-"+row.key;
   const current=Object.prototype.hasOwnProperty.call(saved,row.key)?String(saved[row.key]):"";
   const options='<option value="" '+(current===""?"selected":"")+'>Not rated</option>'+Array.from({length:row.points+1},(_,score)=>'<option value="'+score+'" '+(current===String(score)?"selected":"")+'>'+score+' / '+row.points+'</option>').join("");
   return '<div class="rubric-row"><div><b>'+esc(row.label)+' — '+row.points+' points</b><p class="mut">'+esc(row.detail)+'</p></div><label for="'+esc(id)+'">Your score <select id="'+esc(id)+'" class="newestan-rubric-score" data-rubric-key="'+esc(row.key)+'" data-rubric-max="'+row.points+'">'+options+'</select></label></div>';
  }).join("");
  return '<div class="newestan-model-section newestan-rubric" data-rubric-term="'+term+'" data-rubric-lesson="'+lesson+'"><b>۲۰ نمره · Source-based exam rubric and self-assessment</b><p class="mut">Choose your own estimate for each criterion. This is a practice self-assessment, not an official teacher mark.</p>'+controls+'<p><b>Self-assessment total: <span data-rubric-total>'+total+' / '+max+'</span></b> <span class="mut" data-rubric-status>('+rated+' of '+rows.length+' criteria rated)</span></p></div>';
 }
 function bind(term,lesson){
  const root=document.querySelector('.newestan-rubric[data-rubric-term="'+Number(term)+'"][data-rubric-lesson="'+Number(lesson)+'"]');
  if(!root)return;
  root.querySelectorAll("select.newestan-rubric-score").forEach(select=>select.addEventListener("change",()=>{
   const all=read(),key=lessonKey(term,lesson),entry=all[key]||{},field=select.dataset.rubricKey;
   if(select.value==="")delete entry[field];else entry[field]=Number(select.value);
   all[key]=entry;
   try{localStorage.setItem(STORE_KEY,JSON.stringify(all))}catch(e){}
   const controls=[...root.querySelectorAll("select.newestan-rubric-score")];
   const rated=controls.filter(x=>x.value!=="").length;
   const total=controls.reduce((sum,x)=>sum+(x.value===""?0:Number(x.value)),0);
   const max=controls.reduce((sum,x)=>sum+Number(x.dataset.rubricMax||0),0);
   const totalNode=root.querySelector("[data-rubric-total]"),statusNode=root.querySelector("[data-rubric-status]");
   if(totalNode)totalNode.textContent=total+" / "+max;
   if(statusNode)statusNode.textContent="("+rated+" of "+controls.length+" criteria rated)";
  }));
 }
 window.renderNewestanRubric=render;
 window.bindNewestanRubric=bind;
})();