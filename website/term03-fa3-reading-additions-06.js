/* Term 03 FA3 reading-passage reviewed compound verbs and expressions — batch 06.
   Selected only after reading the source contexts; ordinary noun+verb fragments are excluded. */
(()=>{
 const D=window.TERM3_DATA||(window.TERM3_DATA=[]);
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const norm=x=>String(x||"").normalize("NFKC").replace(/[يى]/g,"ی").replace(/ك/g,"ک")
  .replace(/[\u064B-\u065F\u0670\u0640]/g,"").replace(/[\u200c\sـ]/g,"")
  .replace(/[،؛؟,.!?«»()[\]{}]/g,"").toLowerCase();
 const cards=[
  {fa:"خودداری کردن",tr:"khod-dāri kardan",en:"to refrain from; to abstain from",sources:["FA3-06"],unit:6,units:[6],pos:"فعل مرکب — compound verb",ms:"خودداری کردن",amr:"خودداری کن",
   m:["خودداری کردن از انتشار اطلاعات شخصی، امنیت را افزایش می‌دهد.","Khod-dāri kardan az enteshār-e ettelā'āt-e shakhsī, amniyat rā afzāyesh midahad.","Refraining from sharing personal information improves security."],
   a:["از فرستادن رمز بانکی خودداری کن.","Az ferestādan-e ramz-e bānkī khod-dāri kon.","Refrain from sending your bank password."],
   meaning:["از انجام دادن یا گفتن کاری پرهیز کردن.","To refrain from doing or saying something; to abstain from an action.","امتنع عن؛ أحجم عن."]
  },
  {fa:"دعا کردن",tr:"do'ā kardan",en:"to pray; to supplicate",sources:["FA3-09","FA3-18"],unit:9,units:[9,18],pos:"فعل مرکب — compound verb",ms:"دعا کردن",amr:"دعا کن",
   m:["دعا کردن برای دیگران، دل را آرام می‌کند.","Do'ā kardan barāye dīgārān, del rā ārām mikonad.","Praying for others brings peace to the heart."],
   a:["برای موفقیت دوستانت دعا کن.","Barāye movaffaqiyat-e dustānat do'ā kon.","Pray for your friends' success."],
   meaning:["از خداوند برای برآورده شدن خواسته یا خیر دیگری درخواست کردن.","To pray to God for a request or for another person's well-being.","دعا؛ ابتهل إلى الله."]
  },
  {fa:"دریافت کردن",tr:"daryāft kardan",en:"to receive; to obtain",sources:["FA3-07","FA3-17"],unit:7,units:[7,17],pos:"فعل مرکب — compound verb",ms:"دریافت کردن",amr:"دریافت کن",
   m:["دریافت کردن پیام، چند ثانیه طول کشید.","Daryāft kardan-e payām, chand sāniye tul keshid.","Receiving the message took a few seconds."],
   a:["پس از پرداخت، رسید را دریافت کن.","Pas az pardākht, resid rā daryāft kon.","After paying, receive the receipt."],
   meaning:["چیزی را گرفتن یا به دست آوردن؛ مانند پیام، کالا یا وجه.","To receive or obtain something, such as a message, item or payment.","تلقّى؛ استلم."]
  },
  {fa:"نگهداری کردن",tr:"negahdāri kardan",en:"to keep; to maintain; to take care of",sources:["FA3-13","FA3-17"],unit:13,units:[13,17],pos:"فعل مرکب — compound verb",ms:"نگهداری کردن",amr:"نگهداری کن",
   m:["نگهداری کردن از حیوانات، مسئولیت می‌خواهد.","Negahdāri kardan az heyavānāt, mas'uliyat mikhāhad.","Taking care of animals requires responsibility."],
   a:["از این گیاه در برابر سرما نگهداری کن.","Az in گیاه dar barābar-e sarmā negahdāri kon.","Protect this plant from the cold."],
   meaning:["از شخص، حیوان یا چیزی مراقبت کردن و آن را در وضعیت مناسب حفظ کردن.","To take care of a person, animal or thing and keep it in good condition.","حافظ على؛ اعتنى بـ."]
  },
  {fa:"مرتب کردن",tr:"morattab kardan",en:"to arrange; to organize; to tidy",sources:["FA3-03","FA3-20"],unit:3,units:[3,20],pos:"فعل مرکب — compound verb",ms:"مرتب کردن",amr:"مرتب کن",
   m:["مرتب کردن میز، شروع کار را آسان می‌کند.","Morattab kardan-e miz, shoru'-e kār rā āsān mikonad.","Tidying the desk makes it easier to begin working."],
   a:["کتاب‌ها را بر اساس موضوع مرتب کن.","Ketābhā rā bar asās-e mozoo' morattab kon.","Arrange the books by subject."],
   meaning:["چیزی را منظم و در جای مناسب قرار دادن.","To put things in order or arrange them neatly.","رتّب؛ نظّم."]
  },
  {fa:"جمع کردن",tr:"jam' kardan",en:"to gather; to collect; to save",sources:["FA3-10","FA3-11"],unit:10,units:[10,11],pos:"فعل مرکب — compound verb",ms:"جمع کردن",amr:"جمع کن",
   m:["جمع کردن کتاب‌ها پس از مطالعه، اتاق را منظم می‌کند.","Jam' kardan-e ketābhā pas az motāle'e, otāq rā monazzam mikonad.","Collecting the books after studying keeps the room tidy."],
   a:["حواست را جمع کن و به نشانه‌ها دقت کن.","Havāset rā jam' kon va be neshānehā deqqat kon.","Pay attention and look carefully at the signs."],
   meaning:["چیزها را گرد آوردن یا کنار هم قرار دادن؛ در ترکیب «حواس را جمع کردن» یعنی توجه کردن.","To gather or collect things; in the expression «حواس را جمع کردن», to pay attention.","جمع؛ ادّخر؛ ركّز انتباهه."]
  },
  {fa:"وصل کردن",tr:"vasl kardan",en:"to connect; to join; to link",sources:["FA3-02","FA3-07"],unit:2,units:[2,7],pos:"فعل مرکب — compound verb",ms:"وصل کردن",amr:"وصل کن",
   m:["وصل کردن دو دستگاه، به کابل مناسب نیاز دارد.","Vasl kardan-e do dastgāh, be kābel-e monāseb niyāz dārad.","Connecting two devices requires a suitable cable."],
   a:["دو نقطه را با یک خط وصل کن.","Do noghte rā bā yek khatt vasl kon.","Connect the two points with a line."],
   meaning:["دو چیز را به هم پیوند دادن.","To connect, join or link two things.","وصل؛ ربط."]
  },
  {fa:"تقسیم شدن",tr:"taqsim shodan",en:"to be divided; to be split",sources:["FA3-06","FA3-10"],unit:6,units:[6,10],pos:"فعل مرکب — compound verb",ms:"تقسیم شدن",amr:"—",
   m:["تقسیم شدن مسئولیت‌ها میان اعضا، کار را آسان می‌کند.","Taqsim shodan-e mas'uliyat-hā miyān-e a'zā, kār rā āsān mikonad.","Dividing responsibilities among members makes the work easier."],
   a:null,note:"این فعل حالتِ تقسیم شدن را بیان می‌کند و در کاربرد معمول، امر مستقیم طبیعی ندارد.",
   meaning:["به بخش‌ها یا سهم‌های جداگانه تبدیل شدن.","To be divided or split into separate parts or shares.","انقسم؛ قُسّم."]
  },
  {fa:"حل شدن",tr:"hal shodan",en:"to be solved; to be resolved; to dissolve",sources:["FA3-07","FA3-19"],unit:7,units:[7,19],pos:"فعل مرکب — compound verb",ms:"حل شدن",amr:"—",
   m:["حل شدن مسئله، به بررسی دقیق نیاز دارد.","Hal shodan-e mas'ale, be barrasi-ye daqiq niyāz dārad.","Solving the problem requires careful examination."],
   a:null,note:"این فعل نتیجهٔ برطرف شدن مشکل را بیان می‌کند و امر مستقیم آن در این معنا طبیعی نیست.",
   meaning:["پاسخ یا راه‌حل پیدا کردن برای مشکل؛ همچنین در مایع حل شدن.","For a problem to be solved; also, for a substance to dissolve in a liquid.","انحلّ؛ ذاب."]
  },
  {fa:"روشن شدن",tr:"rowshan shodan",en:"to turn on; to light up; to become clear",sources:["FA3-09","FA3-17"],unit:9,units:[9,17],pos:"فعل مرکب — compound verb",ms:"روشن شدن",amr:"—",
   m:["روشن شدن چراغ، اتاق را روشن می‌کند.","Rowshan shodan-e cherāgh, otāq rā roshan mikonad.","The lamp turning on lights up the room."],
   a:null,note:"این فعل تغییر حالت یا آغاز روشنایی را بیان می‌کند؛ برای دستور دادن معمولاً از «روشن کردن» استفاده می‌شود.",
   meaning:["نورانی شدن یا شروع به کار کردن چراغ و دستگاه؛ همچنین آشکار شدن.","For a light or device to turn on or illuminate; also, for something to become clear.","أضاء؛ اشتغل؛ اتّضح."]
  },
  {fa:"نابود شدن",tr:"nābud shodan",en:"to be destroyed; to perish",sources:["FA3-12"],unit:12,units:[12],pos:"فعل مرکب — compound verb",ms:"نابود شدن",amr:"—",
   m:["نابود شدن جنگل‌ها، زیست‌بوم جانوران را تهدید می‌کند.","Nābud shodan-e jangal-hā, zist-bum-e heyavānāt rā تهدید mikonad.","The destruction of forests threatens animal habitats."],
   a:null,note:"این فعل از بین رفتن یا ویران شدن را بیان می‌کند و امر مستقیم طبیعی ندارد.",
   meaning:["از بین رفتن یا به‌کلی ویران شدن.","To be destroyed or completely ruined; to perish.","هلك؛ دُمّر."]
  },
  {fa:"متولد شدن",tr:"motavalled shodan",en:"to be born",sources:["FA3-20"],unit:20,units:[20],pos:"فعل مرکب — compound verb",ms:"متولد شدن",amr:"—",
   m:["متولد شدن یک کودک، شادی تازه‌ای به خانواده می‌آورد.","Motavalled shodan-e yek kudak, shādi-ye tāze'i be khānevāde miāvarad.","The birth of a child brings new joy to a family."],
   a:null,note:"این فعل رویداد تولد را بیان می‌کند و امر مستقیم آن در کاربرد عادی طبیعی نیست.",
   meaning:["به دنیا آمدن.","To come into the world; to be born.","وُلد."]
  },
  {fa:"غافل شدن",tr:"ghāfel shodan",en:"to overlook; to neglect; to be unaware of",sources:["FA3-04"],unit:4,units:[4],pos:"فعل مرکب — compound verb",ms:"غافل شدن",amr:"غافل نشو",
   m:["غافل شدن از جزئیات، ممکن است باعث خطا شود.","Ghāfel shodan az joz'iyāt, momken ast bā'es-e khatā shavad.","Overlooking details may cause an error."],
   a:["از فرصت‌های کوچک غافل نشو.","Az forsathā-ye kuchak ghāfel nasho.","Do not overlook small opportunities."],
   meaning:["از چیزی یا کسی بی‌توجه شدن؛ آن را از یاد بردن یا نادیده گرفتن.","To overlook, neglect or fail to notice someone or something.","غفل عن؛ أهمل."]
  },
  {fa:"تکرار شدن",tr:"tekrār shodan",en:"to be repeated; to recur",sources:["FA3-14"],unit:14,units:[14],pos:"فعل مرکب — compound verb",ms:"تکرار شدن",amr:"—",
   m:["تکرار شدن یک خطا، نشانهٔ نیاز به بازبینی است.","Tekrār shodan-e yek khatā, neshāne-ye niyāz be bāzbinī ast.","An error recurring is a sign that the process needs review."],
   a:null,note:"این فعل وقوع دوبارهٔ یک رویداد را بیان می‌کند و امر مستقیم طبیعی ندارد.",
   meaning:["دوباره رخ دادن یا انجام شدن.","To happen or occur again; to be repeated.","تكرّر؛ أُعيد."]
  },
  {fa:"به شمار رفتن",tr:"be shomār raftan",en:"to be considered; to count as",sources:["FA3-10"],unit:10,units:[10],pos:"اصطلاح فعلی — verbal expression",ms:"به شمار رفتن",amr:"—",
   m:["به شمار رفتن این اثر در میان آثار مهم ادبی، به ارزش هنری آن مربوط است.","Be shomār raftan-e in asar dar miyān-e āthār-e mohem-e adabī, be arzesh-e honari-ye ān marbut ast.","This work being regarded as an important literary work is related to its artistic value."],
   a:null,note:"این اصطلاح برای بیانِ محسوب شدن یا در دسته‌ای قرار گرفتن به کار می‌رود و امر مستقیم ندارد.",
   meaning:["در گروه یا دسته‌ای قرار گرفتن و به‌عنوان چیزی محسوب شدن.","To be regarded or considered as belonging to a group or category.","يُعَدّ؛ يُعتبر."]
  },
  {fa:"به ذهنم رسیدن",tr:"be zehnam residan",en:"to occur to me; to come to mind",sources:["FA3-09"],unit:9,units:[9],pos:"اصطلاح فعلی — verbal expression",ms:"به ذهنم رسیدن",amr:"—",
   m:["به ذهنم رسیدن این راه‌حل، مسیر کار را تغییر داد.","Be zehnam residan-e in rāh-e hal, masir-e kār rā taghyir dād.","This solution occurring to me changed the course of the work."],
   a:null,note:"این عبارت تجربهٔ ذهنیِ گوینده را بیان می‌کند و امر مستقیم طبیعی ندارد.",
   meaning:["ناگهان به فکر من آمدن یا به خاطرم خطور کردن.","For an idea or thought to occur to me; to come to my mind.","خطر ببالي."]
  },
  {fa:"به آرزویش رسیدن",tr:"be ārzu-yeš residan",en:"to achieve one's wish; to attain one's dream",sources:["FA3-05"],unit:5,units:[5],pos:"اصطلاح فعلی — verbal expression",ms:"به آرزویش رسیدن",amr:"به آرزویت برس",
   m:["به آرزویش رسیدن، سال‌ها تلاش می‌خواهد.","Be ārzu-yeš residan, sālhā talāsh mikhāhad.","Achieving one's dream can take years of effort."],
   a:["برای رسیدن به هدفت تلاش کن و به آرزویت برس.","Barāye residan be hadafat talāsh kon va be ārzu-yat beres.","Work toward your goal and achieve your dream."],
   meaning:["پس از تلاش، خواسته یا هدفی را به دست آوردن.","To achieve a wish or attain a dream after effort.","حقّق أمنيته."]
  },
  {fa:"در ارتباط بودن",tr:"dar ertebāt budan",en:"to be in contact; to stay in touch",sources:["FA3-17"],unit:17,units:[17],pos:"اصطلاح فعلی — verbal expression",ms:"در ارتباط بودن",amr:"در ارتباط باش",
   m:["در ارتباط بودن با آموزگار، پرسیدن سؤال‌ها را آسان می‌کند.","Dar ertebāt budan bā āmozegār, porsidan-e so'āl-hā rā āsān mikonad.","Being in contact with the teacher makes it easier to ask questions."],
   a:["با آموزگارت در ارتباط باش.","Bā āmozegārat dar ertebāt bāsh.","Stay in touch with your teacher."],
   meaning:["با شخص یا گروهی تماس و پیوند داشتن.","To be in contact or maintain communication with a person or group.","كان على تواصل؛ تواصل مع."]
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
 window.TERM03_FA3_READING_BATCH06={added,linked,headwords:cards.map(x=>x.fa)};
})();
