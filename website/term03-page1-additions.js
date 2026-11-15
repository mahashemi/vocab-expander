/* Term 03 — page-1 additions (one self-contained file).
   Adds 39 new flashcards with Persian / English / Arabic meanings, and links 77 existing cards to the lesson
   whose page 1 lists them. Load it AFTER term03-source-audit.js (and after the semantics files).
   Safe to load twice: cards and links are merged by headword, nothing is duplicated. */
(()=>{
 const D=window.TERM3_DATA; if(!D) return;
 const norm=x=>String(x||"").normalize("NFKC")
  .replace(/[يى]/g,"ی").replace(/ك/g,"ک")
  .replace(/[\\u064B-\\u065F\\u0670\\u0640]/g,"")
  .replace(/[\\u200c\\s]+/g," ").trim();
 const byHeadword=new Map();
 for(const item of D){
  const key=norm(item.fa);
  if(!byHeadword.has(key)) byHeadword.set(key,[]);
  byHeadword.get(key).push(item);
 }
 const matchesFor=fa=>byHeadword.get(norm(fa))||[];
 const merge=(prior,sources,units)=>{
  prior.sources=Array.from(new Set([...(prior.sources||[prior.source]).filter(Boolean),...sources].filter(Boolean)));
  prior.units=Array.from(new Set([...(prior.units||[prior.unit]),...units].filter(x=>x!==undefined&&x!==null)));
 };
 /* 1. new cards */
 const CARDS=[
  {"unit":7,"source":"FA3-07","fa":"جایگزین","tr":"jāyegozin","en":"substitute; alternative; replacement","pos":"اسم / صفت — noun / adjective","ex":["شرکت برای کارگر بیمار یک جایگزین استخدام کرد.","Sherkat barāye kārgar-e bimār yek jāyegozin estekhdām kard.","The company hired a replacement for the sick worker."],"sources":["FA3-07"],"units":[7]},
  {"unit":14,"source":"FA3-14","fa":"پیچیده","tr":"pichide","en":"complex; complicated","pos":"صفت — sifat (adjective)","ex":["جامعهٔ تمدن‌های بزرگ ساختاری پیچیده داشت.","Jāme'e-ye tamaddon-hā-ye bozorg sākhtāri pichide dāsht.","The society of the great civilisations had a complex structure."],"sources":["FA3-14"],"units":[14]},
  {"unit":14,"source":"FA3-14","fa":"تندرو","tr":"tondrow","en":"extremist; radical","pos":"اسم / صفت — noun / adjective","ex":["افراد تندرو دیدگاه دیگران را تحمل نمی‌کنند.","Afrād-e tondrow didgāh-e digarān rā tahammol nemikonand.","Extremists do not tolerate the views of others."],"sources":["FA3-14"],"units":[14]},
  {"unit":14,"source":"FA3-14","fa":"گسترش","tr":"gostaresh","en":"expansion; spread; development","pos":"اسم — ism (noun)","ex":["گسترش تمدن‌ها به تبادل فرهنگی کمک کرد.","Gostaresh-e tamaddon-hā be tabādol-e farhangi komak kard.","The expansion of civilisations helped cultural exchange."],"sources":["FA3-14"],"units":[14]},
  {"unit":14,"source":"FA3-14","fa":"بی‌گناه","tr":"bi-gonāh","en":"innocent","pos":"صفت — sifat (adjective)","ex":["قاضی گفت که متهم بی‌گناه است.","Qāzi goft ke mottaham bi-gonāh ast.","The judge said that the accused is innocent."],"sources":["FA3-14"],"units":[14]},
  {"unit":16,"source":"FA3-16","fa":"رقابت","tr":"reqābat","en":"competition; rivalry","pos":"اسم — ism (noun)","ex":["رقابت شبکه‌های خبری باعث بهتر شدن کیفیت خبر می‌شود.","Reqābat-e shabakehā-ye khabari bā'es-e behtar shodan-e keyfiyat-e khabar mishavad.","Competition between news networks improves the quality of news."],"sources":["FA3-16","KH3-16"],"units":[16]},
  {"unit":16,"source":"FA3-16","fa":"کاربر","tr":"kārbar","en":"user","pos":"اسم — ism (noun)","ex":["کاربران شبکه‌های اجتماعی هر روز خبرهای تازه می‌خوانند.","Kārbarān-e shabakehā-ye ejtemā'i har ruz khabarhā-ye tāze mikhānand.","Social media users read fresh news every day."],"sources":["FA3-16"],"units":[16]},
  {"unit":3,"source":"KH3-03","fa":"تناسب","tr":"tanāsob","en":"proportion; suitability; harmony","pos":"اسم — ism (noun)","ex":["بین درآمد و هزینه باید تناسب وجود داشته باشد.","Bein-e darāmad va hazine bāyad tanāsob vojud dāshte bāshad.","There must be proportion between income and expenses."],"sources":["KH3-03"],"units":[3]},
  {"unit":3,"source":"KH3-03","fa":"فعالیت","tr":"fa'āliyat","en":"activity","pos":"اسم — ism (noun)","ex":["فعالیت‌های هفتگی را در برنامه می‌نویسیم.","Fa'āliyat-hā-ye haftegi rā dar barnāme minevisim.","We write the weekly activities in the plan."],"sources":["KH3-03"],"units":[3]},
  {"unit":3,"source":"KH3-03","fa":"ضروری","tr":"zaruri","en":"necessary; essential","pos":"صفت — sifat (adjective)","ex":["برای موفقیت، برنامه‌ریزی کاری ضروری است.","Barāye movaffaqiyat, barnāme-rizi kāri zaruri ast.","Planning is essential for success."],"sources":["KH3-03"],"units":[3]},
  {"unit":4,"source":"KH3-04","fa":"پشیمان","tr":"pashimān","en":"regretful; sorry","pos":"صفت — sifat (adjective)","ex":["او از تصمیمش پشیمان است.","U az tasmimash pashimān ast.","He regrets his decision."],"sources":["KH3-04"],"units":[4]},
  {"unit":4,"source":"KH3-04","fa":"خطرناک","tr":"khatarnāk","en":"dangerous","pos":"صفت — sifat (adjective)","ex":["اسلحه‌های خطرناک جان مردم را تهدید می‌کنند.","Aslehehā-ye khatarnāk jān-e mardom rā tahdid mikonand.","Dangerous weapons threaten people's lives."],"sources":["KH3-04"],"units":[4]},
  {"unit":5,"source":"KH3-05","fa":"بیهوده","tr":"bihude","en":"futile; pointless; in vain","pos":"صفت / قید — adjective / adverb","ex":["تلاش برای رسیدن به آرزوی دست‌نیافتنی بیهوده است.","Talāsh barāye residan be ārezu-ye dast-nayāftani bihude ast.","Striving for an unreachable wish is futile."],"sources":["KH3-05"],"units":[5]},
  {"unit":5,"source":"KH3-05","fa":"کارگر","tr":"kārgar","en":"worker; labourer","pos":"اسم — ism (noun)","ex":["کارگر زیر آفتاب سنگ می‌تراشید.","Kārgar zir-e āftāb sang mitarāshid.","The worker was cutting stone under the sun."],"sources":["KH3-05"],"units":[5]},
  {"unit":5,"source":"KH3-05","fa":"سیراب","tr":"sirāb","en":"quenched; satiated; well watered","pos":"صفت — sifat (adjective)","ex":["باغ با آب چشمه سیراب است.","Bāgh bā āb-e cheshme sirāb ast.","The garden is watered by the spring."],"sources":["KH3-05"],"units":[5]},
  {"unit":9,"source":"KH3-09","fa":"پژوهشگران","tr":"pazhuheshgarān","en":"researchers","pos":"اسم جمع — plural noun","ex":["پژوهشگران دربارهٔ شادکامی مردم تحقیق کرده‌اند.","Pazhuheshgarān dar-bāre-ye shād-kāmi-ye mardom tahqiq karde'and.","Researchers have studied people's happiness."],"sources":["KH3-09"],"units":[9]},
  {"unit":9,"source":"KH3-09","fa":"اوقات","tr":"owqāt","en":"times; hours; mood","pos":"اسم جمع — plural noun","ex":["در اوقات فراغت با خانواده گردش می‌کنیم.","Dar owqāt-e farāqat bā khānevāde gardesh mikonim.","In our free time we go out with the family."],"sources":["KH3-09"],"units":[9]},
  {"unit":9,"source":"KH3-09","fa":"سفارش","tr":"sefāresh","en":"order; request; recommendation","pos":"اسم — ism (noun)","ex":["پدرم سفارش کرد که خوب درس بخوانم.","Pedaram sefāresh kard ke khub dars bekhānam.","My father urged me to study well."],"sources":["KH3-09"],"units":[9]},
  {"unit":11,"source":"KH3-11","fa":"مقاله","tr":"maqāle","en":"article; essay","pos":"اسم — ism (noun)","ex":["او مقاله‌ای دربارهٔ اختراع برق نوشت.","U maqāle-i dar-bāre-ye ekhterā'-e barq nevesht.","He wrote an article about the invention of electricity."],"sources":["KH3-11"],"units":[11]},
  {"unit":11,"source":"KH3-11","fa":"واقعیت","tr":"vāqe'iyat","en":"reality; fact","pos":"اسم — ism (noun)","ex":["واقعیت این است که هر اختراعی با تلاش زیاد به دست می‌آید.","Vāqe'iyat in ast ke har ekhterā'i bā talāsh-e ziyād be dast miāyad.","The reality is that every invention comes through great effort."],"sources":["KH3-11"],"units":[11]},
  {"unit":12,"source":"KH3-12","fa":"حقیقت","tr":"haqiqat","en":"truth; reality","pos":"اسم — ism (noun)","ex":["حقیقت ماجرا را کسی نمی‌دانست.","Haqiqat-e mājarā rā kasi nemidānest.","No one knew the truth of the matter."],"sources":["KH3-12"],"units":[12]},
  {"unit":12,"source":"KH3-12","fa":"اهالی","tr":"ahāli","en":"inhabitants; residents","pos":"اسم جمع — plural noun","ex":["اهالی شهر از افسانهٔ بیابان می‌ترسیدند.","Ahāli-ye shahr az afsāne-ye biyābān mitarsidand.","The inhabitants of the city were afraid of the desert legend."],"sources":["KH3-12"],"units":[12]},
  {"unit":12,"source":"KH3-12","fa":"حوصله","tr":"howsele","en":"patience; inclination","pos":"اسم — ism (noun)","ex":["برای خواندن متن طولانی حوصله لازم است.","Barāye khāndan-e matn-e tulāni howsele lāzem ast.","Reading a long text takes patience."],"sources":["KH3-12"],"units":[12]},
  {"unit":15,"source":"KH3-15","fa":"طرفدار","tr":"tarafdār","en":"supporter; fan","pos":"اسم / صفت — noun/adjective","ex":["او طرفدار نوشیدن چای سبز است.","U tarafdār-e nushidan-e chāy-e sabz ast.","He is a supporter of drinking green tea."],"sources":["KH3-15"],"units":[15]},
  {"unit":16,"source":"KH3-16","fa":"مخاطبان","tr":"mokhātabān","en":"audience; addressees","pos":"اسم جمع — plural noun","ex":["رسانه‌ها باید مخاطبان خود را جذب کنند.","Resānehā bāyad mokhātabān-e khod rā jazb konand.","The media must attract their audience."],"sources":["KH3-16"],"units":[16]},
  {"unit":16,"source":"KH3-16","fa":"دریافت","tr":"daryāft","en":"receipt; reception; understanding","pos":"اسم — ism (noun)","ex":["دریافت خبرهای تازه از رسانه‌ها آسان شده است.","Daryāft-e khabarhā-ye tāze az resānehā āsān shode ast.","Receiving fresh news from the media has become easy."],"sources":["KH3-16"],"units":[16]},
  {"unit":18,"source":"KH3-18","fa":"خمیازه","tr":"khamiyāze","en":"yawn","pos":"اسم — ism (noun)","ex":["خمیازهٔ او نشان می‌داد خیلی خسته است.","Khamiyāze-ye u neshān midād kheyli khaste ast.","His yawn showed that he was very tired."],"sources":["KH3-18"],"units":[18]},
  {"unit":18,"source":"KH3-18","fa":"عروسی","tr":"'arusi","en":"wedding","pos":"اسم — ism (noun)","ex":["در عروسی همهٔ فامیل جمع بودند.","Dar 'arusi hame-ye fāmil jam' budand.","The whole family was gathered at the wedding."],"sources":["KH3-18"],"units":[18]},
  {"unit":19,"source":"KH3-19","fa":"باستانی","tr":"bāstāni","en":"ancient","pos":"صفت — sifat (adjective)","ex":["تخت جمشید یک مجموعهٔ باستانی است.","Takht-e Jamshid yek majmu'e-ye bāstāni ast.","Persepolis is an ancient complex."],"sources":["KH3-19"],"units":[19]},
  {"unit":19,"source":"KH3-19","fa":"پادشاه","tr":"pādeshāh","en":"king; monarch","pos":"اسم — ism (noun)","ex":["پادشاه برای ساخت کاروانسرا دستور داد.","Pādeshāh barāye sākht-e kārevānsarā dastur dād.","The king gave an order to build the caravanserai."],"sources":["KH3-19"],"units":[19]},
  {"unit":20,"source":"N3-02","fa":"سمت","tr":"semat","en":"position; post; role","pos":"اسم — ism (noun)","ex":["او سمت‌های مهمی در دانشگاه داشت.","U semat-hā-ye mohemmi dar dāneshgāh dāsht.","He held important positions at the university."],"sources":["N3-02"],"units":[20]},
  {"unit":20,"source":"N3-02","fa":"تأسیس","tr":"ta'sis","en":"establishment; founding","pos":"اسم — ism (noun)","ex":["تأسیس بیمارستان کودکان کار بزرگی بود.","Ta'sis-e bimārestān-e kudakān kār-e bozorgi bud.","Founding a children's hospital was a great undertaking."],"sources":["N3-02"],"units":[20]},
  {"unit":20,"source":"N3-02","fa":"سرانجام","tr":"sarānjām","en":"finally; in the end","pos":"قید — qeyd (adverb)","ex":["پزشک سرانجام در همان شهر درگذشت.","Pezeshk sarānjām dar hamān shahr dar-gozasht.","The doctor finally passed away in that same city."],"sources":["N3-02"],"units":[20]},
  {"unit":8,"source":"N3-03","fa":"مناطق گرم و سرد","tr":"manāteq-e garm va sard","en":"hot and cold regions","pos":"گروه اسمی — noun phrase","ex":["عشایر در مناطق گرم و سرد ایران زندگی می‌کنند.","'Ashāyer dar manāteq-e garm va sard-e Irān zendegi mikonand.","Nomads live in the hot and cold regions of Iran."],"sources":["N3-03"],"units":[8]},
  {"unit":19,"source":"SH3-02","fa":"فرودگاه","tr":"forudgāh","en":"airport","pos":"اسم — ism (noun)","ex":["ساعت پنج به فرودگاه رسیدیم.","Sā'at-e panj be forudgāh residim.","We arrived at the airport at five."],"sources":["SH3-02"],"units":[19]},
  {"unit":15,"source":"SH3-05","fa":"پخت‌وپز","tr":"pokht-o-paz","en":"cooking","pos":"اسم — ism (noun)","ex":["مادرم عاشق پخت‌وپز است.","Mādaram 'āsheq-e pokht-o-paz ast.","My mother loves cooking."],"sources":["SH3-05"],"units":[15]},
  {"unit":19,"source":"SH3-07","fa":"آپارتمان","tr":"āpārtemān","en":"apartment","pos":"اسم — ism (noun)","ex":["ما یک آپارتمان دوخوابه در هتل رزرو کردیم.","Mā yek āpārtemān-e do-khābe dar hotel rezerv kardim.","We booked a two-bedroom apartment at the hotel."],"sources":["SH3-07"],"units":[19]},
  {"unit":20,"source":"FA3-20","fa":"دوش (دیشب)","tr":"dush (dishab)","en":"last night (archaic/poetic)","pos":"قید — qeyd (adverb)","ex":["در شعر کهن، «دوش» یعنی دیشب.","Dar she'r-e kohan, «dush» ya'ni dishab.","In classical poetry, «dush» means last night."],"sources":["FA3-20"],"units":[20]},
  {"unit":2,"source":"SH3-08","fa":"درس گذراندن","tr":"dars gozarāndan","en":"to pass (a course); to complete (a course)","pos":"فعل مرکب — compound verb","ms":"درس گذراندن","amr":"—","m":["درس گذراندن در ترم اول برای او آسان نبود.","Dars gozarāndan dar term-e avval barāye u āsān nabud.","Passing the course in the first term was not easy for him."],"a":null,"note":"معمولاً امر مستقیم ندارد؛ برای دستور از «درس را پاس کن» استفاده می‌شود.","sources":["SH3-08"],"units":[2]}
 ];
 let added=0;
 for(const c of CARDS){
  const matches=matchesFor(c.fa);
  if(matches.length) matches.forEach(prior=>merge(prior,c.sources,c.units));
  else {D.push(c);byHeadword.set(norm(c.fa),[c]);added++}
 }
 /* 2. existing cards that also appear on page 1 of another lesson: [headword, lesson, unit] */
 const LINKS=[
  ["صلح","FA3-05",5],
  ["نسل","FA3-05",5],
  ["منقرض شدن","FA3-05",5],
  ["تجربه","FA3-05",5],
  ["معایب","FA3-06",6],
  ["پیوند","FA3-14",14],
  ["منجر شدن","FA3-15",15],
  ["داماد","FA3-15",15],
  ["میزبان","FA3-16",16],
  ["راه‌اندازی","FA3-16",16],
  ["مناسبت","FA3-17",17],
  ["انگار","FA3-19",19],
  ["مفصل","FA3-19",19],
  ["سرمایه‌گذاری","FA3-20",20],
  ["پس‌انداز کردن","KH3-03",3],
  ["در دسترس","KH3-03",3],
  ["پیشرفت","KH3-04",4],
  ["مهاجرت","KH3-04",4],
  ["کیفیت","KH3-09",9],
  ["مصرف کردن","KH3-09",9],
  ["پاداش","KH3-11",11],
  ["حرفه","KH3-11",11],
  ["سخاوتمند","KH3-11",11],
  ["منابع","KH3-12",12],
  ["موجود","KH3-12",12],
  ["گودال","KH3-12",12],
  ["ارتفاع","KH3-13",13],
  ["پستاندار","KH3-13",13],
  ["پنجه","KH3-13",13],
  ["منقرض شدن","KH3-13",13],
  ["منقار","KH3-13",13],
  ["جوندگان","KH3-13",13],
  ["عضوواژه","KH3-13",13],
  ["تمدن","KH3-14",14],
  ["تزیین","KH3-14",14],
  ["مسیر","KH3-14",14],
  ["پیشرفت","KH3-14",14],
  ["فواید","KH3-15",15],
  ["آداب","KH3-15",15],
  ["رسانه","KH3-16",16],
  ["جذب کردن","KH3-16",16],
  ["محدودیت","KH3-16",16],
  ["تیتر","KH3-16",16],
  ["بازدید کردن","KH3-16",16],
  ["دیده","KH3-18",18],
  ["ناامیدی","KH3-18",18],
  ["امامزاده","KH3-18",18],
  ["آداب و رسوم","KH3-18",18],
  ["چهره","KH3-18",18],
  ["اقامت","KH3-18",18],
  ["کتیبه","KH3-19",19],
  ["سفره‌خانه","KH3-19",19],
  ["اقوام","KH3-19",19],
  ["شفاف","KH3-19",19],
  ["سفال","KH3-19",19],
  ["نابغه","KH3-20",20],
  ["خدمات","N3-06",16],
  ["رفت‌وآمد","N3-08",15],
  ["محافظت","N3-08",15],
  ["دفاع","N3-08",15],
  ["دلسوز","N3-08",15],
  ["ترجیح دادن","N3-08",15],
  ["مهریه","N3-08",15],
  ["جهیزیه","N3-08",15],
  ["جزءبه‌جزء","N3-08",15],
  ["منبع","N3-10",20],
  ["مقایسه","N3-10",20],
  ["تأثیر","N3-10",20],
  ["مناسبت","N3-10",20],
  ["جریمه کردن","SH3-03",10],
  ["بزرگراه","SH3-03",10],
  ["جا گذاشتن","SH3-06",1],
  ["شوخی کردن","SH3-06",1],
  ["تحویل گرفتن","SH3-09",7],
  ["تخفیف داشتن","SH3-09",7],
  ["کیفیت","SH3-09",7],
  ["بهبود بخشیدن","SH3-09",7]
 ];
 let linked=0,linkedEntries=0;
 const missingLinks=[];
 for(const [fa,source,unit] of LINKS){
  const matches=matchesFor(fa);
  if(matches.length){matches.forEach(prior=>{merge(prior,[source],[unit]);linkedEntries++});linked++}
  else missingLinks.push({fa,source,unit});
 }
 /* 3. trilingual meanings: [Persian, English, Arabic] */
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const ROWS={
  "جایگزین":["چیزی یا کسی که به‌جای دیگری قرار می‌گیرد و نقش او را برعهده می‌گیرد.","A substitute or alternative; something or someone that takes the place of another.","بديل أو بَدَل؛ شيء أو شخص يحلّ محلّ آخر ويقوم بدوره."],
  "پیچیده":["دارای اجزا و روابط بسیار که فهم یا انجام آن دشوار است؛ در هم‌تنیده و غیرساده.","Complex or complicated; made of many parts or relations and therefore hard to understand or do.","معقَّد؛ مؤلَّف من أجزاء وعلاقات كثيرة يصعب فهمه أو القيام به."],
  "تندرو":["کسی که در اندیشه یا رفتار از حد اعتدال فراتر می‌رود و نظر دیگران را برنمی‌تابد؛ افراطی؛ همچنین کسی که تند حرکت می‌کند.","Extremist or radical; someone who goes beyond moderation in thought or action and will not tolerate other views (also: fast-moving).","متطرّف أو متشدّد؛ من يتجاوز الاعتدال في فكره أو سلوكه ولا يتقبّل آراء الآخرين؛ ويُراد به أيضاً سريع الحركة."],
  "گسترش":["بزرگ‌تر یا پهن‌تر شدن چیزی از نظر قلمرو، اندازه یا دامنهٔ تأثیر؛ رواج یافتن.","Expansion, spread, or development; growth in territory, size, or reach.","توسُّع أو انتشار؛ اتّساع الشيء في المساحة أو الحجم أو دائرة التأثير."],
  "بی‌گناه":["کسی که گناه یا جرمی مرتکب نشده است.","Innocent; not guilty of any crime or wrongdoing.","بريء؛ من لم يرتكب ذنباً أو جريمة."],
  "رقابت":["کوشش دو یا چند نفر یا گروه برای پیشی گرفتن از یکدیگر در رسیدن به هدفی مشترک.","Competition; the effort of two or more people or groups to outdo one another in reaching the same goal.","تنافس أو منافسة؛ سعي شخصين أو أكثر أو جماعتين للتفوّق على بعضهما في بلوغ هدف مشترك."],
  "کاربر":["کسی که از یک وسیله، برنامه یا خدمت (مانند اینترنت یا شبکهٔ اجتماعی) استفاده می‌کند.","User; a person who uses a device, program, or service such as the internet or a social network.","مستخدِم؛ شخص يستعمل جهازاً أو برنامجاً أو خدمة مثل الإنترنت أو الشبكات الاجتماعية."],
  "تناسب":["هماهنگی و برابری درست میان دو یا چند چیز از نظر اندازه، میزان یا ویژگی.","Proportion or suitability; a fitting balance between two or more things in size, amount, or quality.","تناسُب؛ توازن وانسجام مناسب بين شيئين أو أكثر في الحجم أو المقدار أو الصفة."],
  "فعالیت":["کار یا کارهایی که شخص یا گروهی برای رسیدن به هدفی انجام می‌دهد.","Activity; work or tasks that a person or group carries out to reach a goal.","نشاط أو فعالية؛ عمل أو أعمال يقوم بها شخص أو جماعة لبلوغ هدف."],
  "ضروری":["چیزی که بدون آن کار یا زندگی انجام نمی‌شود؛ لازم و ناگزیر.","Necessary or essential; something without which a task or way of life cannot proceed.","ضروري؛ ما لا غنى عنه ولا يتمّ العمل أو الحياة بدونه."],
  "پشیمان":["کسی که از کاری که کرده یا نکرده اندوهگین است و دوست دارد آن را جبران کند یا برگرداند.","Regretful or sorry; feeling sad about something one has done or failed to do.","نادم؛ حزين على أمر فعله أو لم يفعله."],
  "خطرناک":["چیزی که احتمال آسیب یا زیان دیدن از آن وجود دارد.","Dangerous; likely to cause harm or injury.","خطير أو خَطِر؛ يُحتمل أن يسبّب أذى أو ضرراً."],
  "بیهوده":["بی‌فایده و بی‌نتیجه؛ کاری که سودی ندارد.","Futile or pointless; without benefit or result (also: in vain).","عبثي أو بلا جدوى؛ لا فائدة منه ولا نتيجة (ويُستعمل ظرفاً بمعنى عبثاً)."],
  "کارگر":["کسی که با کار بدنی یا فنی در کارگاه، کارخانه یا جای دیگر مزد می‌گیرد.","Worker or labourer; a person who does manual or technical work for wages.","عامل؛ شخص يعمل عملاً يدوياً أو فنياً مقابل أجر."],
  "سیراب":["کسی یا چیزی که به اندازهٔ کافی آب یا غذا خورده و دیگر تشنه یا گرسنه نیست؛ پُرآب.","Quenched, satiated, or well watered; no longer thirsty, hungry, or dry.","مرتوٍ أو مَروِيّ؛ نال كفايته من الماء أو الغذاء فلم يعد عطشان أو جائعاً أو جافاً."],
  "پژوهشگران":["کسانی که با روش علمی دربارهٔ موضوعی بررسی و تحقیق می‌کنند.","Researchers; people who study a subject using scientific methods.","باحثون؛ أشخاص يدرسون موضوعاً ويبحثون فيه بمنهج علمي."],
  "اوقات":["جمع وقت؛ زمان‌ها و ساعت‌های گوناگون؛ در تعبیرهایی مانند «اوقات تلخ» به معنای حال و خلق‌وخو نیز می‌آید.","Times or hours (plural of vaqt); also used for one's mood, as in “owqāt talkh” (bad temper).","أوقات؛ جمع «وقت»، أي الأزمنة والساعات المختلفة؛ وتأتي أيضاً بمعنى المزاج والحال كما في «اوقات تلخ»."],
  "سفارش":["درخواست خرید یا ساخت چیزی از کسی؛ همچنین توصیه و تأکید دربارهٔ انجام کاری.","Order, request, or recommendation; asking for something to be bought or made, or urging someone to do something.","طلب أو وصيّة؛ طلب شراء شيء أو صنعه، وكذلك التوصية والتأكيد على فعل أمر."],
  "مقاله":["نوشته‌ای کوتاه و مستقل دربارهٔ یک موضوع که در مجله، روزنامه یا کتاب چاپ می‌شود.","Article or essay; a short independent piece of writing on a subject, published in a magazine, newspaper, or book.","مقالة؛ نصّ قصير مستقلّ حول موضوع ما يُنشر في مجلة أو صحيفة أو كتاب."],
  "واقعیت":["آنچه واقعاً وجود دارد یا رخ داده است، نه آنچه تصور یا خیال شده.","Reality or fact; what really exists or has happened, as opposed to what is imagined.","واقع أو حقيقة واقعة؛ ما هو موجود أو حاصل فعلاً لا ما يُتخيَّل."],
  "حقیقت":["آنچه درست و مطابق با واقع است؛ راستی؛ ماهیت اصلی چیزی.","Truth; what is correct and in accord with reality; the real nature of something.","حقيقة؛ ما هو صحيح ومطابق للواقع؛ وجوهر الشيء الحقيقي."],
  "اهالی":["مردمی که در یک شهر، روستا یا منطقه زندگی می‌کنند.","Inhabitants or residents; the people who live in a city, village, or region.","أهالي؛ الناس الذين يسكنون مدينة أو قرية أو منطقة."],
  "حوصله":["توانایی تحمل کاری طولانی یا کسالت‌آور؛ همچنین میل و آمادگی روحی برای انجام کاری.","Patience or inclination; the ability to put up with a long or tiresome task, or the mood for doing something.","صبر أو رغبة؛ القدرة على تحمّل عمل طويل أو ممل، والاستعداد النفسي للقيام بشيء."],
  "طرفدار":["کسی که از شخص، گروه، عقیده یا کاری پشتیبانی می‌کند و آن را می‌پسندد.","Supporter or fan; someone who backs and favours a person, group, idea, or activity.","مناصر أو مؤيِّد؛ من يدعم شخصاً أو جماعة أو فكرة أو أمراً ويفضّله."],
  "مخاطبان":["کسانی که پیام، سخن یا نوشته‌ای برای آنان فرستاده می‌شود؛ شنوندگان یا خوانندگان.","Audience or addressees; the people to whom a message, speech, or text is directed.","المخاطَبون؛ الأشخاص الذين يُوجَّه إليهم خطاب أو رسالة أو نص، من مستمعين أو قرّاء."],
  "دریافت":["گرفتن چیزی مانند پیام یا پول؛ همچنین فهم و برداشت از یک موضوع.","Receiving or reception; getting something such as a message or payment, and also understanding or interpretation.","تلقّي أو استلام؛ أخذ شيء كرسالة أو مبلغ، وكذلك الفهم والإدراك لأمر ما."],
  "خمیازه":["باز شدن ناخواستهٔ دهان همراه با نفس عمیق، هنگام خواب‌آلودگی یا خستگی.","Yawn; an involuntary wide opening of the mouth with a deep breath, caused by sleepiness or tiredness.","تثاؤب؛ انفتاح لا إرادي للفم مع نَفَس عميق عند النعاس أو التعب."],
  "عروسی":["جشن و مراسمی که برای ازدواج دو نفر برگزار می‌شود.","Wedding; the celebration or ceremony held for a marriage.","عُرس أو حفل زفاف؛ احتفال ومراسم يُقام بمناسبة زواج شخصين."],
  "باستانی":["مربوط به روزگاران بسیار دور و کهن.","Ancient; belonging to a very distant past.","قديم أو أثري؛ ينتمي إلى عصور سحيقة."],
  "پادشاه":["فرمانروای یک کشور که معمولاً این مقام را از خانوادهٔ خود به ارث می‌برد.","King or monarch; the ruler of a country, usually holding the position by inheritance.","مَلِك؛ حاكم بلد يتولّى المنصب عادةً بالوراثة."],
  "سمت":["مقام یا شغلی که کسی در یک سازمان بر عهده دارد؛ همچنین جهت و سو.","Position, post, or role held in an organisation; also direction.","منصب أو مركز؛ وظيفة أو مقام يشغله شخص في مؤسسة، ويأتي أيضاً بمعنى الجهة."],
  "تأسیس":["بنیان گذاشتن و پدید آوردن یک مؤسسه، سازمان یا مکان.","Establishment or founding; setting up an institution, organisation, or place.","تأسيس؛ إنشاء مؤسسة أو منظمة أو مكان ووضع أسسه."],
  "سرانجام":["در پایان کار یا پس از گذراندن زمان و رویدادهای بسیار؛ بالاخره.","Finally or in the end; after a long process or many events.","أخيراً أو في النهاية؛ بعد مرور زمن أو أحداث كثيرة."],
  "مناطق گرم و سرد":["ناحیه‌هایی از یک کشور که آب‌وهوای گرم یا سرد دارند؛ مانند گرمسیر و سردسیر.","Hot and cold regions; areas of a country with a warm or a cold climate (as in the climate terms garmsir and sardsir).","المناطق الحارّة والباردة؛ نواحٍ من البلد ذات مناخ حارّ أو بارد."],
  "فرودگاه":["جایی که هواپیماها در آن بلند می‌شوند و فرود می‌آیند و مسافران سوار یا پیاده می‌شوند.","Airport; a place where aircraft take off and land and passengers board or leave.","مطار؛ مكان تقلع منه الطائرات وتهبط فيه ويصعد إليه المسافرون وينزلون."],
  "پخت‌وپز":["کار آماده کردن غذا با پختن؛ آشپزی.","Cooking; the activity of preparing food by heating it.","الطبخ؛ إعداد الطعام بالطهي."],
  "آپارتمان":["واحد مسکونی در ساختمانی چندطبقه که چند خانوار در آن زندگی می‌کنند.","Apartment; a residential unit in a multi-storey building.","شقّة؛ وحدة سكنية في بناية متعددة الطوابق."],
  "دوش (دیشب)":["در شعر و نثر کهن، شب گذشته؛ دیشب.","Last night (archaic/poetic); the night just past.","الليلة الماضية (بلفظ شعري قديم)؛ البارحة."],
  "درس گذراندن":["یک درس دانشگاهی را با موفقیت به پایان رساندن و نمرهٔ قبولی گرفتن؛ پاس کردن.","To pass or complete a university course successfully and obtain a passing grade.","اجتاز المقرَّر الدراسي؛ أنهى مادة جامعية بنجاح ونال درجة النجاح."]
 };
 for(const [fa,v] of Object.entries(ROWS)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM03_PAGE1_ADDITIONS={newCards:added,linkedCards:linked,linkedEntries,missingLinks,meanings:Object.keys(ROWS).length};
})();