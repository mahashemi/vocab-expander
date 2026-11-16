/* Term 03 trilingual meanings — completion batch 46 (three exact card headwords). */
(()=>{
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
  "سازمان‌دهی کردن":{
   faMeaning:"کارها، افراد یا چیزها را طبق نظم و برنامه‌ای مشخص مرتب و ساماندهی کردن.",
   enMeaning:"To organise or arrange people, tasks, or things according to a clear order or plan.",
   arMeaning:"نظّم؛ رتّب الأشخاص أو الأعمال أو الأشياء وفق ترتيب وخطة واضحة."
  },
  "خونسردی خود را حفظ کردن":{
   faMeaning:"در موقعیت دشوار یا تنش‌زا آرام ماندن و هیجان‌زده یا عصبانی نشدن.",
   enMeaning:"To stay calm and composed in a difficult or stressful situation.",
   arMeaning:"حافظ على هدوئه ورباطة جأشه في موقف صعب أو متوتر."
  },
  "سرو کردن":{
   faMeaning:"غذا یا نوشیدنی را آماده کردن و جلوی مهمان یا مشتری گذاشتن.",
   enMeaning:"To serve food or drink to a guest or customer.",
   arMeaning:"قدّم الطعام أو الشراب للضيف أو الزبون."
  }
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={
  ...(S[fa]||{}),
  faMeaning:v.faMeaning,enMeaning:v.enMeaning,arMeaning:v.arMeaning
 };
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH46=Object.keys(rows);
})();
