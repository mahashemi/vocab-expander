/* Renders Term 03 Newestan lesson-specific teaching and developed model essays. */
window.renderTerm3LessonTeaching=function(lesson){
 const t=(window.TERM3_NEWESTAN_TEACHING||{})[lesson.lesson];
 if(!t)return "";
 const m=t.model;
 return '<div class="newestan-model-section"><b>Writing skill from Biyāmozīm · مهارت نوشتاری</b><p>'+esc(t.skill)+'</p></div>'+
  '<div class="newestan-model-section"><b>ریزموضوع‌ها · Suggested supporting subtopics</b><ol class="newestan-support">'+t.subtopics.map(x=>'<li class="fa-block">'+esc(x)+'</li>').join("")+'</ol><p class="mut">These supporting points are developed from the exercise topic; they are not presented as a verbatim textbook list.</p></div>'+
  '<div class="newestan-model-section"><b>Writing steps · روش نگارش</b><ol class="newestan-support">'+t.steps.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ol></div>'+
  (m?'<details open><summary><b>Model essay · نمونهٔ انشا</b></summary><div class="dc">'+
   '<div class="newestan-model-section"><b>مقدمه</b><p class="fa-block">'+esc(m.muqaddama)+'</p></div>'+
   '<div class="newestan-model-section"><b>متن · بند اول</b><p class="fa-block">'+esc(m.band1)+'</p></div>'+
   '<div class="newestan-model-section"><b>متن · بند دوم</b><p class="fa-block">'+esc(m.band2)+'</p></div>'+
   '<div class="newestan-model-section"><b>نتیجه</b><p class="fa-block">'+esc(m.natija)+'</p></div></div></details>':'');
};