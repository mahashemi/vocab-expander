/* Term 03 FA3 reading-passage reviewed additions — batch 05.
   Curated from FA3-14 (date expressions), FA3-20 (Sa'di vocabulary),
   and repeated question prompts in FA3-02 / FA3-10. */
(()=>{
 const D=window.TERM3_DATA||(window.TERM3_DATA=[]);
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const norm=x=>String(x||"").normalize("NFKC").replace(/[يى]/g,"ی").replace(/ك/g,"ک")
  .replace(/[\u064B-\u065F\u0670\u0640]/g,"").replace(/[\u200c\sـ]/g,"")
  .replace(/[،؛؟,.!?«»()[\]{}]/g,"").toLowerCase();
 const cards=[
  {
   fa:"دکان",tr:"dokān",en:"shop; store (traditional or literary)",
   sources:["FA3-20"],unit:20,units:[20],pos:"اسم — noun",
   ex:["در بازار قدیمی، هر دکان کالای ویژه‌ای می‌فروخت.","Dar bāzār-e qadimi, har dokān kalā-ye vizhe'i miforuxt.","In the old bazaar, each shop sold a particular product."],
   meaning:["مغازه یا محل کوچک دادوستد؛ واژه‌ای رایج در متون ادبی و بازارهای سنتی.","A shop or small place of business; common in older and literary contexts.","دكّان؛ محلّ صغير للبيع والتجارة."]
  },
  {
   fa:"کدام‌یک",tr:"kodām-yek",en:"which one; which of them",
   sources:["FA3-02","FA3-10"],unit:2,units:[2,10],pos:"ضمیر پرسشی — interrogative pronoun",
   ex:["از میان این کتاب‌ها، کدام‌یک را می‌خواهی؟","Az miyān-e in ketābhā, kodām-yek rā mikhāhi?","Which of these books do you want?"],
   meaning:["برای پرسیدن دربارهٔ یک مورد از میان چند شخص یا چیز به کار می‌رود.","Used to ask which person or thing is meant from a group.","أيّ واحد؛ تُستعمل للسؤال عن واحد من بين مجموعة."]
  },
  {
   fa:"قبل از میلاد",tr:"qabl az milād",en:"BCE; BC (before Christ)",
   sources:["FA3-14"],unit:14,units:[14],pos:"عبارت زمانی — time expression",
   ex:["این تمدن در سدهٔ ششم قبل از میلاد شکوفا شد.","In tamaddon dar sade-ye sheshom qabl az milād shekufā shod.","This civilisation flourished in the sixth century BCE."],
   meaning:["برای تاریخ‌گذاری سال‌ها و رویدادهای پیش از مبدأ میلاد مسیح به کار می‌رود؛ در نگارش دانشگاهی، BCE نیز رایج است.","Used to date years and events before the traditionally defined birth of Christ; BCE is also common in academic writing.","قبل الميلاد؛ يُستعمل لتأريخ السنوات والأحداث السابقة لميلاد المسيح."]
  },
  {
   fa:"پس از میلاد",tr:"pas az milād",en:"CE; AD (after Christ)",
   sources:["FA3-14"],unit:14,units:[14],pos:"عبارت زمانی — time expression",
   ex:["این بنا در سدهٔ سوم پس از میلاد ساخته شد.","In banā dar sade-ye sevvom pas az milād sākhte shod.","This building was constructed in the third century CE."],
   meaning:["برای تاریخ‌گذاری سال‌ها و رویدادهای پس از مبدأ میلاد مسیح به کار می‌رود؛ در نگارش دانشگاهی، CE نیز رایج است.","Used to date years and events after the traditionally defined birth of Christ; CE is also common in academic writing.","بعد الميلاد؛ يُستعمل لتأريخ السنوات والأحداث اللاحقة لميلاد المسيح."]
  }
 ];
 const byKey=new Map();
 for(const item of D){const key=norm(item.fa);if(!byKey.has(key))byKey.set(key,[]);byKey.get(key).push(item);}
 let added=0,linked=0;
 for(const card of cards){
  const key=norm(card.fa),prior=byKey.get(key)||[];
  if(prior.length){
   for(const item of prior){
    item.sources=Array.from(new Set([...(item.sources||[item.source]).filter(Boolean),...card.sources]));
    item.units=Array.from(new Set([...(item.units||[item.unit]),...card.units]));
   }
   linked++;
  }else{
   const {meaning,...fields}=card;
   const item={...fields,source:card.sources[0]};
   D.push(item);byKey.set(key,[item]);added++;
  }
  const meaning=card.meaning;
  S[card.fa]={...(S[card.fa]||{}),faMeaning:meaning[0],enMeaning:meaning[1],arMeaning:meaning[2],
   faSynonyms:(S[card.fa]||{}).faSynonyms||[],enSynonyms:(S[card.fa]||{}).enSynonyms||[],arSynonyms:(S[card.fa]||{}).arSynonyms||[]};
 }
 window.TERM03_FA3_READING_BATCH05={added,linked,headwords:cards.map(x=>x.fa)};
})();
