/* Source-aligned Term 03 Newestan chapter outcomes and guided practice.
   The OCR-derived curriculum is kept separate from the original textbook text.
   Each chapter has one short formative task; the learner can reveal feedback immediately. */
(()=>{
 const chapters={
  1:{title:"Paragraph structure and punctuation",fa:"ساختار بند و نشانه‌گذاری",outcomes:["تشخیص جملهٔ موضوع، جمله‌های پشتیبان و جملهٔ پایانی","نوشتن یک بند دربارهٔ یک موضوع واحد","استفادهٔ درست از تورفتگی و نشانه‌های اصلی نگارشی"],example:{fa:"برای یادگیری زبان فارسی تمرین لازم است. من هر روز واژه‌ها را مرور می‌کنم و با دوستانم گفت‌وگو می‌کنم. بنابراین، تمرین روزانه به پیشرفت من کمک می‌کند.",en:"Topic sentence → supporting sentences → closing sentence."},task:"در بند نمونه، کدام جمله نقش جملهٔ موضوع را دارد؟",options:["برای یادگیری زبان فارسی تمرین لازم است.","من هر روز واژه‌ها را مرور می‌کنم.","بنابراین، تمرین روزانه به پیشرفت من کمک می‌کند."],answer:0,why:"جملهٔ نخست، ایدهٔ اصلی بند را معرفی می‌کند؛ جملهٔ دوم آن را توضیح می‌دهد و جملهٔ سوم بند را جمع‌بندی می‌کند.",activity:"پس از پاسخ، یک بند سه‌جمله‌ای دربارهٔ «اهمیت مطالعه» بنویسید و نقش هر جمله را مشخص کنید.",source:"N3-01 · OCR pp. 4–6"},
  2:{title:"Biography and temporal connectors",fa:"زندگی‌نامه و عوامل ربط زمانی",outcomes:["پیش بردن زندگی‌نامه در سه مرحلهٔ تحقیق، تحلیل و نگارش","ساختن جدول زمانی از رویدادهای مهم زندگی","تمایز رابطهٔ ترتیبی، هم‌زمانی، ارجاعی و انجامی"],example:{fa:"او در شهر خود تحصیل کرد؛ سپس به دانشگاه رفت. هم‌زمان با تحصیل، به تدریس نیز پرداخت. پیش از آنکه به کشورش بازگردد، پژوهش‌های خود را کامل کرد و بالاخره کتابش را منتشر کرد.",en:"ترتیبی: سپس · هم‌زمانی: هم‌زمان با · ارجاعی: پیش از آنکه · انجامی: بالاخره"},task:"در جملهٔ «احمد هم‌زمان با تحصیل در دانشگاه، به تدریس مشغول بود»، کدام رابطه بیان شده است؟",options:["ترتیبی","هم‌زمانی","ارجاعی","انجامی"],answer:1,why:"عبارت «هم‌زمان با» نشان می‌دهد دو فعالیت در یک بازهٔ زمانی انجام می‌شدند.",activity:"زندگی‌نامهٔ کوتاهی بنویسید و دست‌کم از یک رابط ترتیبی، یک رابط هم‌زمانی، یک رابط ارجاعی و یک رابط انجامی استفاده کنید.",source:"N3-02 · OCR pp. 4–6",caution:"فهرست برخی رابط‌های انجامی در OCR آسیب‌دیده است؛ «بالاخره» در مثال منبع دیده می‌شود. گزینه‌های دیگر باید با نسخهٔ چاپی مقابله شوند."},
  3:{title:"Point of view and past tenses",fa:"زاویهٔ دید و زمان‌های گذشته",outcomes:["تمایز زاویهٔ دید درونی (من/ما) و بیرونی (او)","بازنویسی یک توصیف از زاویهٔ دید دیگر","انتخاب گذشتهٔ ساده، استمراری، نقلی یا بعید بر اساس زمان رویداد"],example:{fa:"درونی: من خانهٔ مادربزرگم را به یاد دارم.\nبیرونی: او خانهٔ مادربزرگش را به یاد داشت.",en:"The narrator is inside the story in the first version and outside it in the second."},task:"«من هر تابستان به خانهٔ مادربزرگم می‌رفتم.» از کدام زاویهٔ دید است؟",options:["درونی؛ راوی از ضمیر من استفاده می‌کند.","بیرونی؛ راوی دربارهٔ شخص دیگری حرف می‌زند."],answer:0,why:"راوی خودش یکی از افراد تجربه‌کننده است و با «من» سخن می‌گوید.",activity:"دو جمله دربارهٔ یک خاطره بنویسید: یکی با «من» و دیگری با «او». سپس فعل‌های گذشته را مشخص کنید.",source:"N3-03 · OCR pp. 4–6"},
  4:{title:"Social issues, causes and present forms",fa:"مسائل اجتماعی، علت و معلول و مضارع",outcomes:["تعریف روشن یک مسئلهٔ اجتماعی","تفکیک علت‌ها از پیامدها و دسته‌بندی آن‌ها","تشخیص مضارع ساده، اخباری و التزامی در بافت"],example:{fa:"شاید دانش‌آموزان کمتر مطالعه کنند؛ زیرا استفادهٔ بی‌برنامه از تلفن همراه وقت زیادی می‌گیرد.",en:"شاید کمتر مطالعه کنند = subjunctive after a marker of possibility; وقت می‌گیرد = indicative."},task:"در جملهٔ «شاید فردا به کتابخانه بروم»، فعل «بروم» چه وجهی دارد؟",options:["مضارع اخباری","مضارع التزامی","گذشتهٔ ساده"],answer:1,why:"«شاید» نشانهٔ احتمال است و در این جمله مضارع التزامی «بروم» آمده است.",activity:"دربارهٔ یک مسئلهٔ اجتماعی، سه علت و دو پیامد بنویسید. سپس یک بند منسجم بسازید و علت‌ها را با دلیل توضیح دهید.",source:"N3-04 · OCR pp. 5–6"},
  5:{title:"Descriptive writing and agreement",fa:"توصیف و مطابقت نهاد و فعل",outcomes:["پیروی از مراحل انتخاب موضوع تا پاک‌نویس","سازمان‌دهی توصیف از ویژگی کلی به جزئیات","به‌کارگیری تشبیه و جان‌بخشی در جای مناسب","تطبیق فعل با نوع نهاد"],example:{fa:"باد آرام در گوش درختان زمزمه می‌کرد. گنجشک‌ها از شاخه‌ها پریدند.",en:"«زمزمه می‌کرد» personifies the wind; «گنجشک‌ها ... پریدند» shows a plural animate subject."},task:"کدام جمله مطابقت فعل و نهاد را درست نشان می‌دهد؟",options:["گنجشک‌ها از شاخه پرید.","گنجشک‌ها از شاخه پریدند.","گنجشک‌ها از شاخه می‌پرد."],answer:1,why:"در این مثال، نهاد جمع جان‌دار است و فعل جمع «پریدند» به‌کار رفته است.",activity:"یک مکان طبیعی را از کلیات به جزئیات توصیف کنید. دست‌کم یک تشبیه و یک جان‌بخشی به کار ببرید و فعل‌ها را بازبینی کنید.",source:"N3-05 · OCR pp. 4–6"},
  6:{title:"Media literacy and fair criticism",fa:"سواد رسانه‌ای و نقد منصفانه",outcomes:["سنجش فایده‌ها و آسیب‌های رسانه یا اینترنت","بیان نقاط قوت و ضعف همراه با دلیل","نقد اثر به‌جای حمله به نویسنده یا استفاده‌کننده","استفاده از جمله‌های شرطی ممکن"],example:{fa:"این کتاب از نظر موضوع مفید است؛ اما بعضی بخش‌های آن به مثال‌های بیشتری نیاز دارد.",en:"A balanced critique names a strength, then a specific limitation and a reason."},task:"کدام جمله نمونهٔ نقد منصفانه‌تری است؟",options:["نویسنده هیچ چیزی نمی‌فهمد.","این کتاب بی‌ارزش است.","ساختار کتاب روشن است، اما بعضی ادعاها به منبع دقیق‌تری نیاز دارند."],answer:2,why:"گزینهٔ سوم دربارهٔ خود اثر داوری مشخص و قابل بررسی می‌کند و دلیل می‌آورد؛ به شخص حمله نمی‌کند.",activity:"یک کتاب، وب‌سایت یا خدمت اینترنتی را در یک بند نقد کنید: دو نقطهٔ قوت، یک محدودیت و یک پیشنهاد سازنده.",source:"N3-06 · OCR pp. 4–6"},
  7:{title:"Planning and coherent paragraphs",fa:"برنامه‌ریزی و انسجام بند",outcomes:["تعیین هدف‌های کوتاه‌مدت و بلندمدت","اولویت‌بندی و تخصیص واقع‌بینانهٔ زمان","ساختن بند با یک موضوع مرکزی و جمله‌های مرتبط","تشخیص ساختار شرطی غیرممکن پس از مقابله با متن چاپی"],example:{fa:"هدف: آمادگی برای امتحان.\nاولویت: مرور درس‌های دشوار.\nبرنامه: مطالعهٔ روزانه، تمرین و زمان جبرانی.",en:"A plan connects a goal to priorities, realistic time blocks and review."},task:"کدام جمله به انسجام یک بند دربارهٔ برنامه‌ریزی کمک نمی‌کند؟",options:["ابتدا هدفم را مشخص می‌کنم.","سپس درس‌ها را بر اساس دشواری مرتب می‌کنم.","رنگ مورد علاقهٔ من آبی است."],answer:2,why:"رنگ مورد علاقه ارتباطی با موضوع برنامه‌ریزی تحصیلی ندارد و باید از این بند حذف شود.",activity:"یک برنامهٔ هفت‌روزه برای آمادگی امتحان یا سفر بسازید. سپس آن را به یک بند منسجم تبدیل کنید.",source:"N3-07 · OCR pp. 3–6",caution:"جدول صرف و ساختار شرطی غیرممکن در OCR آسیب‌دیده است؛ این ابزار تا بررسی نسخهٔ چاپی، آن را به‌صورت قاعدهٔ قطعی آموزش نمی‌دهد."},
  8:{title:"Comparison and summarising",fa:"مقایسه و خلاصه‌نویسی",outcomes:["مقایسهٔ دو فرهنگ یا موضوع با معیارهای روشن","تمایز روش کلی و جزءبه‌جزء در مقایسه","به‌کارگیری صفت برتر و عبارت‌های از نظر/از لحاظ","خلاصه‌نویسی به مفهوم و به حذف"],example:{fa:"از نظر خوراک، هر دو کشور غذاهای محلی متنوعی دارند؛ اما در روش پخت و مواد اصلی تفاوت‌هایی دیده می‌شود.",en:"Whole-block: describe A, then B. Point-by-point: compare the same feature of A and B together."},task:"اگر ابتدا همهٔ آداب کشور الف و سپس همهٔ آداب کشور ب را بنویسید، از کدام روش استفاده کرده‌اید؟",options:["روش کلی","روش جزءبه‌جزء"],answer:0,why:"در روش کلی، ویژگی‌های یک موضوع به‌صورت یک مجموعه می‌آید و سپس موضوع دوم توصیف می‌شود.",activity:"دو کشور را از نظر خوراک یا آداب ماه رمضان مقایسه کنید. سپس یک متن کوتاه را با روش خلاصه به مفهوم یا خلاصه به حذف خلاصه کنید.",source:"N3-08 · OCR pp. 4–7"},
  9:{title:"Virtual universities and scientific writing",fa:"دانشگاه مجازی و نوشتار علمی",outcomes:["مقایسهٔ آموزش حضوری و مجازی","به‌کارگیری روش‌های مؤثر مطالعه و یادداشت‌برداری","نوشتن رسمی، روشن، دقیق و مستند","تشخیص فعل امر و التزامی بر اساس بافت"],example:{fa:"برای فهم بهتر موضوع، منابع معتبر را بررسی کنید و نکته‌های اصلی را با زبان خود یادداشت کنید.",en:"Scientific style is precise, explicit, evidence-based and avoids unnecessary digressions."},task:"کدام ویژگی با نوشتار علمی سازگارتر است؟",options:["پراکنده‌گویی و زبان محاوره‌ای","اصطلاحات دقیق و ادعاهای مستند","تکرار مترادف‌ها برای یک مفهوم تخصصی"],answer:1,why:"متن علمی باید دقیق و مستند باشد و برای یک مفهوم واحد، اصطلاحات را بی‌دلیل تغییر ندهد.",activity:"یک بند دربارهٔ فواید دانشگاه مجازی بنویسید؛ سپس آن را رسمی‌تر کنید و یک ادعا را با منبع معتبر پشتیبانی کنید.",source:"N3-09 · OCR pp. 4–7"},
  10:{title:"Research questions and project writing",fa:"پرسش پژوهش و سازمان‌دهی تحقیق",outcomes:["انتخاب موضوع محدود و قابل بررسی","ساختن پرسش اصلی و پرسش‌های فرعی","یادداشت‌برداری و ثبت مشخصات منابع","سازمان‌دهی عنوان‌ها، چکیده و ۵ تا ۸ کلیدواژه"],example:{fa:"موضوع: یادگیری زبان فارسی\nپرسش اصلی: چه عواملی به یادگیری مؤثر زبان فارسی کمک می‌کنند؟\nپرسش فرعی: تمرین روزانه چه نقشی دارد؟",en:"The main question is explanatory, not a yes/no question."},task:"کدام گزینه پرسش پژوهشی توضیحی و قابل گسترش است؟",options:["آیا فارسی زبان خوبی است؟","چه عواملی بر یادگیری زبان فارسی تأثیر می‌گذارند؟","آیا باید مطالعه کنیم؟"],answer:1,why:"این پرسش پاسخ بله/خیر ندارد و می‌توان آن را با پرسش‌های فرعی، شواهد و منابع بررسی کرد.",activity:"یک موضوع انتخاب کنید، یک پرسش اصلی و سه پرسش فرعی بنویسید، دو منبع ثبت کنید و در پایان چکیده و ۵ تا ۸ کلیدواژه آماده کنید.",source:"N3-10 · OCR pp. 2–9"}
 };
 const esc=s=>typeof window.esc==="function"?window.esc(String(s??"")):String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
 const worksheets={
  1:{title:"Paragraph plan and job-application form · طرح بند و فرم درخواست کار",fields:[
   ["topic","جملهٔ موضوع","موضوع اصلی بند را در یک جمله بنویسید."],
   ["support","جمله‌های پشتیبان","دو یا سه توضیح مرتبط بنویسید؛ همه باید از یک موضوع پشتیبانی کنند."],
   ["closing","جملهٔ پایانی","بند را با یک نکتهٔ مهم جمع‌بندی کنید."],
   ["applicant","مشخصات و تحصیلات متقاضی","نام، تحصیلات و مهارت‌های مرتبط را یادداشت کنید."],
   ["experience","سوابق و هدف درخواست","تجربهٔ مرتبط و دلیل درخواست این شغل را بنویسید."]
  ]},
  2:{title:"Biography research and timeline · تحقیق و جدول زمانی زندگی‌نامه",fields:[
   ["person","شخص مورد نظر","نام فرد و دلیل انتخاب او را بنویسید."],
   ["sources","منابع قابل بررسی","کتاب، مقاله، وب‌سایت معتبر یا مصاحبه را ثبت کنید."],
   ["timeline","جدول زمانی","هر رویداد را همراه با تاریخ و منبع آن در یک خط بنویسید."],
   ["turning","نقطه‌های عطف و دستاوردها","مهم‌ترین تغییرها، آثار یا دستاوردها را مشخص کنید."],
   ["interview","پرسش مصاحبه","سه پرسش باز بنویسید که پاسخ آن‌ها فقط بله یا خیر نباشد."]
  ]},
  3:{title:"Description and point-of-view planner · طرح توصیف و زاویهٔ دید",fields:[
   ["subject","مکان یا خاطره","چه مکان، شیء یا خاطره‌ای را توصیف می‌کنید؟"],
   ["inside","زاویهٔ دید درونی","اگر راوی «من» باشد، چه می‌بیند، می‌شنود یا احساس می‌کند؟"],
   ["outside","زاویهٔ دید بیرونی","همان صحنه را با ضمیر «او» چگونه توصیف می‌کنید؟"],
   ["details","جزئیات حسی و رویدادها","رنگ، صدا، بو، احساس و ترتیب رویدادها را یادداشت کنید."],
   ["tenses","زمان فعل‌ها","مشخص کنید کجا گذشتهٔ ساده، استمراری، نقلی یا بعید لازم است."]
  ]},
  4:{title:"Social-issue analysis · پرسش‌نامه و تحلیل مسئلهٔ اجتماعی",fields:[
   ["issue","تعریف مسئله","مسئله را دقیق و بدون قضاوت شخصی تعریف کنید."],
   ["questions","پرسش‌های بررسی","سه پرسش روشن برای شناخت مسئله بنویسید."],
   ["causes","علت‌ها","علت‌های فردی، خانوادگی و اجتماعی را دسته‌بندی کنید."],
   ["effects","پیامدها","پیامدهای مسئله بر سلامت، خانواده یا جامعه را توضیح دهید."],
   ["conclusion","جمع‌بندی و راه‌حل","یک راه‌حل واقع‌بینانه و دلیل آن را بنویسید."]
  ]},
  5:{title:"Observation notebook · دفتر مشاهده برای نوشتن توصیفی",fields:[
   ["general","ویژگی‌های کلی","ابتدا شکل، موقعیت یا فضای کلی موضوع را توصیف کنید."],
   ["specific","جزئیات مشخص","سه جزئیات دقیق و قابل مشاهده بنویسید."],
   ["senses","جزئیات حسی","آنچه می‌بینید، می‌شنوید، بو می‌کنید یا لمس می‌کنید ثبت کنید."],
   ["simile","تشبیه","یک تشبیه مناسب و روشن بسازید."],
   ["personification","جان‌بخشی","به یک شیء یا پدیده ویژگی انسانی بدهید."]
  ]},
  6:{title:"Fair media critique · کاربرگ نقد منصفانهٔ رسانه",fields:[
   ["work","اثر یا رسانهٔ مورد نقد","نام کتاب، متن، وب‌سایت یا خدمت اینترنتی را بنویسید."],
   ["strengths","نقاط قوت","دو نقطهٔ قوت را با شاهد یا مثال توضیح دهید."],
   ["weaknesses","نقاط ضعف","یک یا دو محدودیت مشخص را بدون حمله به نویسنده بیان کنید."],
   ["evidence","شواهد و دلیل‌ها","برای هر داوری، شاهد یا دلیل قابل بررسی بیاورید."],
   ["suggestion","پیشنهاد سازنده","یک راه بهبود عملی پیشنهاد دهید."]
  ]},
  7:{title:"Weekly planning table · برنامه‌ریزی هفتگی",fields:[
   ["goal","هدف هفته","هدف روشن و قابل سنجش خود را بنویسید."],
   ["priorities","اولویت‌ها","کارها را از مهم‌ترین تا کم‌اهمیت‌ترین مرتب کنید."],
   ["schedule","تقسیم زمان","روز، ساعت و فعالیت هر بازه را در خط‌های جداگانه بنویسید."],
   ["review","مرور و تکرار","زمان مرور درس‌ها و تمرین‌های ناقص را مشخص کنید."],
   ["backup","زمان جبرانی","اگر برنامه‌ای انجام نشد، چه زمانی آن را جبران می‌کنید؟"]
  ]},
  8:{title:"Comparison and summary worksheet · کاربرگ مقایسه و خلاصه",fields:[
   ["subjects","دو موضوع مورد مقایسه","نام کشورها، فرهنگ‌ها یا دو موضوع را بنویسید."],
   ["criteria","معیارهای مقایسه","سه معیار مشترک مانند غذا، آداب یا هزینه انتخاب کنید."],
   ["method","روش نگارش","انتخاب کنید: روش کلی یا روش جزءبه‌جزء؛ دلیل انتخاب را بنویسید."],
   ["connectors","واژه‌ها و حروف ربط","از عبارت‌هایی مانند از نظر، از لحاظ، اما، درحالی‌که استفاده کنید."],
   ["summary","خلاصهٔ متن","موضوع اصلی و نکات مهم را با روش مفهوم یا حذف خلاصه کنید."]
  ]},
  9:{title:"Academic study and scientific writing · کاربرگ مطالعه و نوشتار علمی",fields:[
   ["comparison","دانشگاه حضوری و مجازی","دو شباهت و دو تفاوت را یادداشت کنید."],
   ["study","روش مطالعه","پیش‌مطالعه، هدف‌گذاری، مرور و یادداشت‌برداری خود را برنامه‌ریزی کنید."],
   ["claim","ادعای علمی","یک ادعای روشن و محدود دربارهٔ موضوع بنویسید."],
   ["evidence","شاهد و منبع","منبع معتبر و شاهدی را که ادعا را پشتیبانی می‌کند ثبت کنید."],
   ["revision","بازبینی زبان علمی","عبارت‌های محاوره‌ای، مبهم یا تکراری را با عبارت دقیق جایگزین کنید."]
  ]},
  10:{title:"Research-plan worksheet · فرم برنامهٔ تحقیق",fields:[
   ["topic","موضوع محدود تحقیق","موضوعی خاص و قابل بررسی انتخاب کنید؛ از موضوع بسیار کلی بپرهیزید."],
   ["main","پرسش اصلی","موضوع را به پرسشی توضیحی تبدیل کنید؛ نه پرسش بله/خیر."],
   ["sub","پرسش‌های فرعی","سه پرسش بنویسید که با پاسخ آن‌ها بتوانید پرسش اصلی را پاسخ دهید."],
   ["sources","یادداشت منابع","نویسنده، سال، عنوان، ناشر و صفحه یا نشانی منبع را ثبت کنید."],
   ["abstract","طرح چکیده","موضوع، روش، نکات اصلی و یافته‌های مورد انتظار را خلاصه کنید."],
   ["keywords","کلیدواژه‌ها","۵ تا ۸ واژه یا عبارت کلیدی بنویسید."]
  ]}
 };
 window.TERM03_NEWESTAN_CHAPTER_GUIDE=chapters;
 window.TERM03_NEWESTAN_WORKSHEETS=worksheets;
 window.renderNewestanChapterGuide=(lessonNo)=>{
  const c=chapters[Number(lessonNo)];if(!c)return "";
  const ws=worksheets[Number(lessonNo)]||{title:"Guided practice",fields:[]};
  let saved={};try{saved=JSON.parse(localStorage.getItem("newestan-chapter-worksheet-v1")||"{}")[String(lessonNo)]||{}}catch(e){}
  const worksheet='<div class="newestan-guide-worksheet"><b>Guided worksheet · کاربرگ تکمیلی</b><h4>'+esc(ws.title)+'</h4><p class="mut">Supplementary practice based on this chapter. Your notes are saved locally in this browser.</p>'+ws.fields.map(([id,label,placeholder])=>'<label class="newestan-guide-field"><span>'+esc(label)+'</span><textarea rows="2" data-guide-field="'+esc(id)+'" placeholder="'+esc(placeholder)+'">'+esc(saved[id]||"")+'</textarea></label>').join("")+'<small class="newestan-guide-worksheet-status" aria-live="polite">Saved locally on this device.</small></div>';
  return '<section class="newestan-chapter-guide panel" data-guide-lesson="'+Number(lessonNo)+'">'+
   '<div class="newestan-guide-kicker">CHAPTER LEARNING GUIDE · راهنمای یادگیری فصل</div>'+
   '<h3>'+esc(c.fa)+' · '+esc(c.title)+'</h3>'+
   '<div class="newestan-guide-block"><b>By the end of this chapter · در پایان این درس</b><ul>'+c.outcomes.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul></div>'+
   '<div class="newestan-guide-block"><b>Worked example · نمونهٔ توضیح‌دار</b><p class="fa-block" dir="rtl">'+esc(c.example.fa).replace(/\n/g,"<br>")+'</p><p>'+esc(c.example.en)+'</p></div>'+
   '<div class="newestan-guide-practice"><b>Quick understanding check · سنجش یادگیری</b><p>'+esc(c.task)+'</p><div class="newestan-guide-options">'+c.options.map((x,i)=>'<label><input type="radio" name="newestanGuideAnswer" value="'+i+'"> <span>'+esc(x)+'</span></label>').join("")+'</div><button type="button" class="newestan-guide-check">Check answer · بررسی پاسخ</button><p class="newestan-guide-feedback" aria-live="polite" hidden></p></div>'+
   '<div class="newestan-guide-block"><b>Now practise · تمرین تکمیلی</b><p>'+esc(c.activity)+'</p></div>'+worksheet+
   (c.caution?'<p class="newestan-guide-caution"><b>Source caution · نکتهٔ منبع:</b> '+esc(c.caution)+'</p>':'')+
   '<div class="newestan-guide-source">'+esc(c.source)+' · Supplementary teaching aid based on the chapter OCR; examples are instructional, not quotations.</div>'+
   '</section>';
 };
 window.bindNewestanChapterGuide=()=>{
  const root=document.querySelector(".newestan-chapter-guide");if(!root)return;
  const button=root.querySelector(".newestan-guide-check"),feedback=root.querySelector(".newestan-guide-feedback");
  root.querySelectorAll("textarea[data-guide-field]").forEach(field=>field.addEventListener("input",()=>{
   const lesson=String(root.dataset.guideLesson);let all={};try{all=JSON.parse(localStorage.getItem("newestan-chapter-worksheet-v1")||"{}")}catch(e){}
   all[lesson]=all[lesson]||{};all[lesson][field.dataset.guideField]=field.value;
   try{localStorage.setItem("newestan-chapter-worksheet-v1",JSON.stringify(all))}catch(e){}
   const status=root.querySelector(".newestan-guide-worksheet-status");if(status)status.textContent="Saved locally · یادداشت شما ذخیره شد.";
  }));
  if(!button||!feedback)return;
  button.onclick=()=>{
   const chosen=root.querySelector('input[name="newestanGuideAnswer"]:checked');
   if(!chosen){feedback.hidden=false;feedback.textContent="Choose an answer first · ابتدا یک پاسخ انتخاب کنید.";return;}
   const c=chapters[Number(root.dataset.guideLesson)];
   const correct=Number(chosen.value)===c.answer;
   feedback.hidden=false;feedback.className="newestan-guide-feedback "+(correct?"is-correct":"is-review");
   feedback.textContent=(correct?"Correct · آفرین! ":"Review · دوباره فکر کنید. ")+c.why;
  };
 };
})();
