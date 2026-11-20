/* Term 03 FA3 reviewed additions — batch 01.
   Curated from FA3 first-page vocabulary lists and checked against the OCR reading context.
   Existing canonical cards receive additional source/unit links; new items receive trilingual examples and meanings.
*/
(()=>{
 const D=window.TERM3_DATA||(window.TERM3_DATA=[]);
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const norm=x=>String(x||"").normalize("NFKC")
  .replace(/[يى]/g,"ی").replace(/ك/g,"ک")
  .replace(/[\u064B-\u065F\u0670\u0640]/g,"")
  .replace(/[\u200c\sـ]/g,"").replace(/[،؛؟,.!?«»()[\]{}]/g,"").toLowerCase();

 const links=[
  [1,"تشریف آوردن"],[1,"جبران کردن"],[1,"خون‌سرد"],[1,"بلافاصله"],
  [2,"سخاوتمند"],[2,"بی‌ملاحظه"],[2,"از کوره در رفتن"],
  [3,"انصراف"],[3,"نقطهٔ عطف"],[3,"جایگاه اجتماعی"],[3,"دوران حاضر"],[3,"صرفه‌جویی"],
  [4,"سر زدن"],[4,"کیف داشتن"],[4,"فدای سرت"],[4,"سرطان"],
  [6,"وام گرفتن"],[6,"ماهانه"],[6,"سرمایه‌گذاری"],
  [7,"املاک"],[7,"اختلاف طبقاتی"],[7,"سرمایه"],[7,"اسراف کردن"],[7,"زیر پا گذاشتن قانون"],
  [8,"مشاور املاک"],
  [9,"مرخصی گرفتن"],[9,"دل مثل سیر و سرکه جوشیدن"],[9,"نشأت گرفتن"],[9,"پشت سر گذاشتن"],[9,"سرگیجه"],[9,"مشکلات گوارشی"],[9,"خمیازه کشیدن"],
  [10,"تهیهٔ دارو"],[10,"شرط‌بندی"],[10,"اجازه نداشتن"],[10,"قوانین جمهوری اسلامی"],
  [11,"هدر رفتن"],[11,"بستگی داشتن"],[11,"صرفه‌جویی"],[11,"اسراف"],[11,"غیرضروری"],[11,"به تعویق انداختن"],[11,"عقب انداختن"],[11,"کاشتن"],
  [12,"سم"],[12,"بی‌رویه"],
  [13,"سردسیر"],[13,"خون‌سردی"],[13,"به دام انداختن"],[13,"بی‌رویه"],
  [14,"محدودهٔ جغرافیایی"],[14,"رواج داشتن"],[14,"گسترش"],[14,"مبتلا بودن"],
  [15,"در آغوش گرفتن"],[15,"زیورآلات"],
  [16,"سرمقاله"],[16,"مقاله"],[16,"سرگرمی"],[16,"گونهٔ خبری"],[16,"شکستن رکورد"],[16,"از مرز گذشتن"],[16,"منتشر شدن"],[16,"اشتراک"],
  [17,"سرگرم‌کننده"],[17,"سلاح گرم"],[17,"تمام و کامل"],[17,"ضربان"],[17,"اعلام کردن"],
  [18,"شرکت کردن"],[18,"سرزنده"],[18,"دفترخانه"],
  [19,"گرم گرفتن"],
  [20,"تخصص داشتن"],[20,"دوش"]
 ];

 const cards=[
  {unit:2,source:"FA3-02",fa:"در معرض قرار گرفتن",tr:"dar ma'raz qarār gereftan",en:"to be exposed to; to be at risk of",pos:"فعل مرکب — compound verb",ms:"در معرض قرار گرفتن",amr:"در معرض قرار بگیر",m:["در معرض قرار گرفتنِ بدن در برابر آلودگی می‌تواند به سلامت آسیب بزند.","Dar ma'raz qarār gereftan-e badan dar barābar-e āludegi mitavānad be salāmat āsib bezanad.","Being exposed to pollution can harm health."],a:["خود را در معرض خطر قرار نده.","Khod rā dar ma'raz-e khatar qarār nadeh.","Do not put yourself at risk."],meaning:["در موقعیتی قرار گرفتن که شخص یا چیز در برابر خطر، بیماری یا تأثیری قرار داشته باشد.","To be in a situation where someone or something is exposed to a risk, illness, or influence.","تعرّضَ لخطر أو مرض أو تأثير؛ أصبح في موضع يواجهه."]},
  {unit:5,source:"FA3-05",fa:"تحقق",tr:"tahaqqoq",en:"fulfilment; realisation; achievement",pos:"اسم — noun",ex:["تحقق آرزوها به تلاش و برنامه‌ریزی نیاز دارد.","Tahaqqoq-e ārzuha be talāsh va barnāme-rizi niyāz dārad.","Fulfilling wishes requires effort and planning."],meaning:["واقعی و عملی شدن یک خواسته، هدف یا برنامه.","The process of becoming real or being successfully achieved; fulfilment or realisation.","تحقّق؛ إنجاز أمر أو هدف وجعله واقعاً."]},
  {unit:6,source:"FA3-06",fa:"مدارک",tr:"madārek",en:"documents; records; paperwork",pos:"اسم — noun",ex:["برای افتتاح حساب، مدارک شناسایی لازم است.","Barāye eftetāh-e hesāb, madārek-e shenāsāyi lāzem ast.","Identification documents are required to open an account."],meaning:["نوشته‌ها یا سندهای رسمی که برای اثبات هویت یا انجام کاری لازم‌اند.","Official documents or records needed to prove identity or complete a procedure.","وثائق ومستندات رسمية تُطلب لإثبات الهوية أو إتمام معاملة."]},
  {unit:6,source:"FA3-06",fa:"گذرواژه",tr:"gozarvāje",en:"password; passphrase",pos:"اسم — noun",ex:["برای امنیت حساب، گذرواژهٔ قوی انتخاب کنید.","Barāye amniyat-e hesāb, gozarvāje-ye qavi entekhāb konid.","Choose a strong password to secure your account."],meaning:["واژه یا رشته‌ای محرمانه که برای ورود به حساب یا سامانه به کار می‌رود.","A secret word or character sequence used to access an account or system.","كلمة مرور سرّية تُستخدم للدخول إلى حساب أو نظام."]},
  {unit:7,source:"FA3-07",fa:"شریک",tr:"sharik",en:"partner; business partner; associate",pos:"اسم — noun",ex:["او شریک تجاری من در این کارگاه است.","U sharik-e tejāri-ye man dar in kārgāh ast.","He is my business partner in this workshop."],meaning:["کسی که در یک کار، شرکت یا دارایی با شخص دیگری سهم و همکاری دارد.","A person who shares ownership, responsibility, or work with another person.","شريك؛ شخص يشارك غيره في عمل أو شركة أو ملكية."]},
  {unit:7,source:"FA3-07",fa:"حلال",tr:"halāl",en:"permissible; lawful; halal",pos:"صفت — adjective",ex:["درآمد حلال در فرهنگ اسلامی اهمیت دارد.","Dāramad-e halāl dar farhang-e eslāmi ahammiyat dārad.","Lawful income is important in Islamic culture."],meaning:["از نظر شرع و اخلاق اسلامی مجاز و روا؛ در برابر حرام.","Permitted under Islamic law and ethics; not forbidden.","مباح وجائز شرعاً؛ غير محرّم."]},
  {unit:7,source:"FA3-07",fa:"مالی",tr:"māli",en:"financial; monetary",pos:"صفت — adjective",ex:["بانک خدمات مالی گوناگونی ارائه می‌دهد.","Bānk khadamāt-e māli-ye gonāguni erā'e midahad.","The bank provides various financial services."],meaning:["مربوط به پول، درآمد، هزینه یا امور اقتصادی.","Relating to money, income, expenses, or finance.","ماليّ؛ متعلّق بالمال أو الدخل أو النفقات أو الشؤون المالية."]},
  {unit:7,source:"FA3-07",fa:"بابت",tr:"bābat",en:"for; regarding; on account of",pos:"حرف اضافه — preposition",ex:["بابت کمک شما بسیار سپاسگزارم.","Bābat-e komak-e shomā besyār sepāsgozāram.","I am very grateful for your help."],meaning:["برای بیان علت، موضوع یا چیزی که در برابر آن پرداخت یا تشکر می‌شود.","Used to indicate the reason, subject, or matter for which something is given or acknowledged.","بشأن؛ مقابل؛ تُستعمل لبيان السبب أو الموضوع أو ما يُقدَّم الشكر أو المقابل من أجله."]},
  {unit:10,source:"FA3-10",fa:"قمار",tr:"qemār",en:"gambling; wagering",pos:"اسم — noun",ex:["قمار می‌تواند به زندگی خانوادگی آسیب بزند.","Qemār mitavānad be zendegi-ye khānevādegi āsib bezanad.","Gambling can harm family life."],meaning:["بازی یا شرط‌بندی با پول یا دارایی که در آن برد و باخت به شانس وابسته است.","A game or wager involving money or property in which winning and losing depend on chance.","قمار؛ مراهنة بالمال أو الممتلكات يعتمد ربحها وخسارتها على الحظ."]},
  {unit:10,source:"FA3-10",fa:"مشروبات",tr:"mashrubāt",en:"beverages; drinks",pos:"اسم — noun",ex:["فروش مشروبات الکلی در این مکان ممنوع است.","Forush-e mashrubāt-e alkoholi dar in makān mamnu ast.","The sale of alcoholic beverages is prohibited in this place."],meaning:["نوشیدنی‌ها؛ در ترکیب «مشروبات الکلی» به نوشیدنی‌های دارای الکل گفته می‌شود.","Beverages or drinks; in the phrase “alcoholic beverages,” drinks containing alcohol.","مشروبات؛ وفي تركيب «المشروبات الكحولية» تعني المشروبات التي تحتوي على الكحول."]},
  {unit:10,source:"FA3-10",fa:"آلات",tr:"ālāt",en:"tools; instruments; equipment",pos:"اسم — noun",ex:["این کارگاه با آلات و ابزار دقیق کار می‌کند.","In kārgāh bā ālāt va abzār-e daqiq kār mikonad.","This workshop uses precise tools and equipment."],meaning:["ابزارها و وسایلی که برای انجام کار یا ساخت چیزی به کار می‌روند.","Tools or instruments used to perform a task or make something.","آلات وأدوات تُستخدم لأداء عمل أو لصنع شيء."]},
  {unit:11,source:"FA3-11",fa:"پایان‌ناپذیر",tr:"pāyān-nāpazir",en:"inexhaustible; endless",pos:"صفت — adjective",ex:["خورشید منبعی پایان‌ناپذیر از انرژی برای زندگی روی زمین فراهم می‌کند.","Khorshid manba'i pāyān-nāpazir az enerji barāye zendegi ru-ye zamin farāham mikonad.","The sun provides an inexhaustible source of energy for life on Earth."],meaning:["چیزی که تمام نمی‌شود یا پایان و حدّ مشخصی ندارد.","Something that does not run out or has no definite end.","لا ينفد؛ شيء لا ينتهي ولا يبلغ حدّاً نهائياً."]},
  {unit:11,source:"FA3-11",fa:"رشد",tr:"roshd",en:"growth; development",pos:"اسم — noun",ex:["رشد صنعتی باید با حفاظت از محیط زیست همراه باشد.","Roshd-e san'ati bāyad bā hefāzat az mohite zist hamrāh bāshad.","Industrial growth should go hand in hand with environmental protection."],meaning:["بزرگ‌تر، بیشتر یا پیشرفته‌تر شدن؛ افزایش و توسعه.","The process of becoming larger, greater, or more developed.","نموّ؛ ازدياد وتطوّر في الحجم أو العدد أو المستوى."]},
  {unit:12,source:"FA3-12",fa:"بدهی",tr:"bedehi",en:"debt; liability; money owed",pos:"اسم — noun",ex:["او برای پرداخت بدهی خود برنامه‌ریزی کرد.","U barāye pardākht-e bedehi-ye khod barnāme-rizi kard.","He made a plan to repay his debt."],meaning:["مقدار پول یا تعهدی که شخص باید به دیگری بپردازد.","Money or an obligation that a person owes and must repay.","دَين؛ مبلغ من المال أو التزام يجب على الشخص سداده."]},
  {unit:12,source:"FA3-12",fa:"دنیا روی سرم خراب شدن",tr:"donyā ru-ye saram kharāb shodan",en:"to feel that one's world has fallen apart",pos:"اصطلاح — idiom",ex:["وقتی خبر بد را شنیدم، احساس کردم دنیا روی سرم خراب شد.","Vaqti khabar-e bad rā shenidam, ehsās kardam donyā ru-ye saram kharāb shod.","When I heard the bad news, I felt that my world had fallen apart."],meaning:["در فارسی برای بیان شوک، اندوه یا ناامیدی بسیار شدید؛ گویی همه‌چیز ناگهان از هم پاشیده است.","An idiom expressing intense shock, grief, or disappointment, as if everything has suddenly fallen apart.","تعبير اصطلاحي يدلّ على صدمة أو حزن أو خيبة شديدة، كأنّ العالم قد انهار فجأة."]},
  {unit:12,source:"FA3-12",fa:"بی‌رویه",tr:"bi-raviyye",en:"excessively; without control or limits",pos:"قید — adverb",ex:["مصرف بی‌رویهٔ آب به محیط زیست آسیب می‌زند.","Masraf-e bi-raviyye-ye āb be mohite zist āsib mizanad.","Excessive water consumption harms the environment."],meaning:["بدون اندازه، کنترل یا رعایت حد مناسب؛ بیش از مقدار لازم.","Without proper limits or control; excessive or unchecked.","بلا حدود أو ضبط مناسب؛ بإفراط ومن دون مراعاة الحدّ اللازم."]},
  {unit:13,source:"FA3-13",fa:"دخالت",tr:"dekhālat",en:"interference; intervention",pos:"اسم — noun",ex:["دخالت انسان در زیستگاه جانوران می‌تواند خطرناک باشد.","Dekhālat-e ensān dar zistgāh-e jānvarān mitavānad khatarnāk bāshad.","Human interference in animal habitats can be dangerous."],meaning:["وارد شدن در کار یا موضوعی که مستقیماً به شخص مربوط نیست؛ مداخله.","Involvement in or interference with a matter that does not directly concern someone.","تدخّل؛ دخول شخص في أمر لا يخصّه مباشرةً أو التأثير فيه."]},
  {unit:14,source:"FA3-14",fa:"نژاد",tr:"nejād",en:"race; breed; lineage",pos:"اسم — noun",ex:["در این موزه دربارهٔ نژادها و تمدن‌های گوناگون می‌خوانیم.","Dar in muze dar bāre-ye nejādhā va tamaddonhā-ye gonāgun mikhanim.","At this museum, we learn about different peoples and civilisations."],meaning:["گروه انسانی با ویژگی‌های تاریخی یا تبار مشترک؛ دربارهٔ جانوران، گونه یا تبار.","A human group associated with shared ancestry or historical traits; for animals, a breed or lineage.","عِرق أو سلالة؛ جماعة ذات أصل أو خصائص تاريخية مشتركة، ويُقال للحيوانات أيضاً سلالة."]},
  {unit:14,source:"FA3-14",sources:["FA3-14","FA3-20"],units:[14,20],fa:"نبرد",tr:"nabard",en:"battle; fight; conflict",pos:"اسم — noun",ex:["نبرد میان دو سپاه سال‌ها در تاریخ آن منطقه باقی ماند.","Nabard miyān-e do sepāh sāl-hā dar tārix-e ān manteqe bāqi mānd.","The battle between the two armies remained part of the region's history for years."],meaning:["درگیری و جنگ میان دو گروه یا نیرو؛ مبارزهٔ سخت.","A fight or battle between two groups or forces; a severe struggle.","معركة أو قتال بين جماعتين أو قوّتين؛ صراع شديد."]},
  {unit:14,source:"FA3-14",fa:"پایه‌گذاری",tr:"pāye-gozāri",en:"founding; establishment; laying the foundation",pos:"اسم — noun",ex:["پایه‌گذاری این شهر به چند قرن پیش بازمی‌گردد.","Pāye-gozāri-ye in shahr be chand qarn pish bāz migardad.","The founding of this city dates back several centuries."],meaning:["آغاز و بنیان نهادن یک سازمان، شهر، نهاد یا فعالیت.","The act of founding or establishing an organisation, city, institution, or activity.","تأسيس؛ وضع أساس منظمة أو مدينة أو مؤسسة أو نشاط."]},
  {unit:15,source:"FA3-15",fa:"روبوسی",tr:"rubusi",en:"cheek-kissing greeting; kissing on the cheeks",pos:"اسم — noun",ex:["در برخی فرهنگ‌ها، روبوسی شیوه‌ای رایج برای سلام کردن است.","Dar barxi farhanghā, rubusi shive'i rāyej barāye salām kardan ast.","In some cultures, cheek-kissing is a common way to greet people."],meaning:["سلام کردن با بوسیدن گونهٔ یکدیگر، معمولاً به نشانهٔ صمیمیت و احترام.","A greeting in which people kiss each other's cheeks, usually as a sign of affection or respect.","تقبيل الخدّين عند التحية، غالباً تعبيراً عن المودّة والاحترام."]},
  {unit:15,source:"FA3-15",fa:"تراشیدن مو",tr:"tarāshidan-e mu",en:"to shave or cut hair close",pos:"فعل مرکب — compound verb",ms:"تراشیدن مو",amr:"موها را بتراش",m:["تراشیدن مو در بعضی آیین‌ها بخشی از یک رسم فرهنگی است.","Tarāshidan-e mu dar ba'zi āyin-hā baxshi az yek rasm-e farhangi ast.","Shaving the hair is part of a cultural custom in some traditions."],a:["اگر لازم است، موها را بتراش.","Agar lāzem ast, mu-hā rā betarāsh.","If necessary, shave the hair."],meaning:["کوتاه کردن مو با تیغ یا ابزار مخصوص تا نزدیک پوست.","To cut hair very short or remove it with a razor or other tool.","حلق الشعر أو تقصيره كثيراً باستعمال شفرة أو أداة مخصّصة."]},
  {unit:16,source:"FA3-16",fa:"پسته",tr:"peste",en:"pistachio",pos:"اسم — noun",ex:["پسته از محصولات مهم کشاورزی کرمان است.","Peste az mahsulāt-e mohem-e keshāvarzi-ye Kermān ast.","Pistachios are an important agricultural product of Kerman."],meaning:["مغز خوراکی درخت پسته که معمولاً به رنگ سبز و درون پوسته‌ای سخت است.","The edible green kernel of the pistachio tree, usually enclosed in a hard shell.","فُستق؛ ثمرة شجرة الفستق ذات اللبّ الأخضر داخل قشرة صلبة."]},
  {unit:16,source:"FA3-16",fa:"تیتر",tr:"titr",en:"headline; title",pos:"اسم — noun",ex:["تیتر خبر باید کوتاه، روشن و دقیق باشد.","Titr-e xabar bāyad kutāh, rowshan va daqiq bāshad.","A news headline should be short, clear, and accurate."],meaning:["عنوان کوتاهی که موضوع اصلی خبر یا نوشته را بیان می‌کند.","A short title that states the main subject of a news story or text.","عنوان موجز يبيّن الموضوع الرئيسي للخبر أو النص."]},
  {unit:16,source:"FA3-16",fa:"دنبال کردن اخبار",tr:"donbāl kardan-e axbār",en:"to follow the news; to keep up with current events",pos:"فعل مرکب — compound verb",ms:"دنبال کردن اخبار",amr:"اخبار را دنبال کن",m:["دنبال کردن اخبار به ما کمک می‌کند از رویدادهای روز آگاه شویم.","Donbāl kardan-e axbār be mā komak mikonad az ruydādhā-ye ruz āgāh shavim.","Following the news helps us stay informed about current events."],a:["اخبار را از منابع معتبر دنبال کن.","Ax bār rā az manābe'-e mo'tabar donbāl kon.","Follow the news from reliable sources."],meaning:["خبرها و رویدادهای روز را به طور منظم پیگیری کردن.","To regularly follow reports and current events.","تابع الأخبار والأحداث الجارية بانتظام."]},
  {unit:17,source:"FA3-17",fa:"شارژ کردن",tr:"shārzh kardan",en:"to charge (a battery or device)",pos:"فعل مرکب — compound verb",ms:"شارژ کردن",amr:"شارژ کن",m:["شارژ کردن تلفن همراه پیش از سفر کار مفیدی است.","Shārzh kardan-e telefon-e hamrāh pish az safar kār-e mofidi ast.","Charging a mobile phone before a trip is useful."],a:["باتری را پیش از سفر شارژ کن.","Bāteri rā pish az safar shārzh kon.","Charge the battery before the trip."],meaning:["برق یا انرژی ذخیره‌شده به باتری یا دستگاه وارد کردن.","To supply electrical energy to a battery or device.","شحن البطارية أو الجهاز بالطاقة الكهربائية."]},
  {unit:17,source:"FA3-17",fa:"شارژ شدن",tr:"shārzh shodan",en:"to become charged; to be recharged",pos:"فعل مرکب — compound verb",ms:"شارژ شدن",amr:"—",m:["باتری پس از چند دقیقه شارژ شدن آمادهٔ استفاده می‌شود.","Bāteri pas az chand daqiqe shārzh shodan āmāde-ye estefāde mishavad.","The battery becomes ready to use after a few minutes of charging."],a:null,note:"این ساخت مجهول/ناگذر است و امر مستقیم طبیعی ندارد؛ برای درخواست می‌توان گفت «باتری را شارژ کن».",meaning:["انرژی الکتریکی دریافت کردن و دوباره دارای شارژ شدن.","To receive electrical energy and become charged again.","شُحِنَ بالطاقة الكهربائية وأصبح مشحوناً من جديد."]},
  {unit:20,source:"FA3-20",fa:"برآورد",tr:"barāvard",en:"estimate; estimation; assessment",pos:"اسم — noun",ex:["برآورد هزینه‌ها پیش از آغاز پروژه ضروری است.","Barāvard-e hazinehā pish az āghāz-e proje zaruri ast.","Estimating costs before starting a project is essential."],meaning:["محاسبه یا سنجش تقریبی مقدار، هزینه یا نتیجهٔ چیزی.","An approximate calculation or assessment of an amount, cost, or outcome.","تقدير تقريبي لمقدار شيء أو تكلفته أو نتيجته."]},
  {unit:20,source:"FA3-20",fa:"شکست",tr:"shekast",en:"defeat; failure; breakage",pos:"اسم — noun",ex:["شکست در یک مسابقه همیشه پایان راه نیست.","Shekast dar yek mosābeqe hamishe pāyān-e rāh nist.","Defeat in a competition is not always the end of the road."],meaning:["موفق نشدن در رسیدن به هدف؛ یا مغلوب شدن در رقابت و نبرد.","Failure to achieve a goal, or being defeated in a contest or battle.","هزيمة أو إخفاق في بلوغ هدف؛ أو خسارة منافسة أو معركة."]},
  {unit:20,source:"FA3-20",fa:"افسانه‌ای",tr:"afsāne'i",en:"legendary; mythical; fabulous",pos:"صفت — adjective",ex:["این داستان دربارهٔ پهلوانی افسانه‌ای است.","In dāstān dar bāre-ye pahlavāni afsāne'i ast.","This story is about a legendary hero."],meaning:["مربوط به افسانه؛ یا بسیار شگفت‌انگیز و نامدار.","Relating to a legend, or extraordinarily famous or remarkable.","أسطوري؛ منسوب إلى الأساطير أو مشهور على نحو خارق."]}
 ];

 const byKey=new Map();
 for(const item of D){const k=norm(item.fa);if(!byKey.has(k))byKey.set(k,[]);byKey.get(k).push(item);}
 let linked=0, added=0;
 for(const [unit,fa] of links){
  const key=norm(fa), matches=byKey.get(key)||[];
  if(!matches.length) throw new Error("FA3 reviewed source link has no canonical card: "+fa+" (FA3-"+String(unit).padStart(2,"0")+")");
  for(const item of matches){
   item.sources=Array.from(new Set([...(item.sources||[item.source]).filter(Boolean),"FA3-"+String(unit).padStart(2,"0")]));
   item.units=Array.from(new Set([...(item.units||[item.unit]),unit]));
  }
  linked++;
 }
 for(const card of cards){
  const key=norm(card.fa);
  if(byKey.has(key)){
   const matches=byKey.get(key);
   for(const item of matches){
    item.sources=Array.from(new Set([...(item.sources||[item.source]).filter(Boolean),card.source,...(card.sources||[])]));
    item.units=Array.from(new Set([...(item.units||[item.unit]),card.unit,...(card.units||[])]));
   }
   continue;
  }
  const {meaning,...cardData}=card;
  const item={...cardData,sources:Array.from(new Set([card.source,...(card.sources||[])])),units:Array.from(new Set([card.unit,...(card.units||[])]))};
  D.push(item);byKey.set(key,[item]);added++;
 }
 for(const card of cards){
  const m=card.meaning;
  S[card.fa]={...(S[card.fa]||{}),faMeaning:m[0],enMeaning:m[1],arMeaning:m[2],faSynonyms:(S[card.fa]||{}).faSynonyms||[],enSynonyms:(S[card.fa]||{}).enSynonyms||[],arSynonyms:(S[card.fa]||{}).arSynonyms||[]};
 }
 window.TERM03_FA3_REVIEWED_BATCH01={linked,added,headwords:cards.map(x=>x.fa)};
})();