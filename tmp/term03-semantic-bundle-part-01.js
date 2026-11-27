/* Term 03 additional vocabulary — semantic batch 1. */
(()=> {
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "تشریف بردن":["با لحنی بسیار محترمانه به معنای رفتن یا خارج شدنِ مخاطب یا شخص محترم.","An honorific and deferential expression meaning to go or leave.","تعبير تكريمي مهذّب بمعنى الذهاب أو المغادرة."],
 "میل کردن":["در زبان مؤدبانه به معنای خوردن یا نوشیدن چیزی.","A polite expression meaning to eat or drink something.","تعبير مهذّب بمعنى تناول الطعام أو الشراب."],
 "صفا آوردن":["باعث شادی، دل‌نشینی یا خوشی شدن؛ در گفتار تعارف‌آمیز برای خوش‌آمدگویی نیز به‌کار می‌رود.","To bring pleasure or warmth; also used in welcoming expressions.","جلبَ السرور والأُنس؛ ويُستعمل أيضاً في عبارات الترحيب."],
 "بلافاصله":["بدون فاصله یا تأخیر و درست پس از رویداد قبلی.","Immediately, with no interval or delay.","فوراً ومن دون فاصل أو تأخير."],
 "راهکار":["روش یا اقدام پیشنهادی برای حل یک مشکل یا رسیدن به هدف.","A proposed method or action for solving a problem or reaching a goal.","طريقة أو إجراء مقترح لحل مشكلة أو بلوغ هدف."],
 "دفع":["دور کردن یا برطرف کردن چیزی؛ مانند دفع خطر، بیماری یا مزاحمت.","The act of repelling, removing, or warding something off, such as danger or illness.","إبعاد شيء أو دفعه أو التخلّص منه، كالخطر أو المرض أو الإزعاج."],
 "دلسوز":["کسی که نسبت به دیگران احساس همدردی و نگرانی دارد و برای کمک به آنان می‌کوشد.","Compassionate and caring; concerned about others and willing to help.","مشفق ومهتمّ بالآخرين، يشعر بمعاناتهم ويسعى إلى مساعدتهم."],
 "کودن":["کسی که کندذهن یا کم‌فهم دانسته می‌شود؛ واژه‌ای توهین‌آمیز و نامهربانانه است.","A person described as foolish or slow to understand; an insulting and unkind word.","شخص يُوصف بالغباء أو بطء الفهم؛ وهي كلمة مهينة وغير لطيفة."],
 "تو دل برو":["توصیف کسی یا چیزی که دوست‌داشتنی، جذاب و دلنشین است.","Charming, appealing, or endearing.","جذّاب ومحبوب ويبعث على الارتياح والمودّة."],
 "پابه‌پا":["در کنار هم و با گام‌های هماهنگ؛ همچنین به معنای هم‌زمان و همراه با دیگری.","Side by side with matching steps; also together or in step with someone.","جنباً إلى جنب بخطوات متناسقة؛ ويأتي بمعنى المرافقة ومسايرة الآخر."],
 "خوش‌گذرانی":["گذراندن وقت با سرگرمی و فعالیت‌های لذت‌بخش.","Spending time enjoying leisure activities and having fun.","قضاء الوقت في أنشطة ممتعة وترفيهية."],
 "خنده از ته دل":["خنده‌ای صادقانه و پرشور که از شادی واقعی می‌آید.","A hearty, genuine laugh that comes from real joy.","ضحكة صادقة وعميقة تنبع من الفرح الحقيقي."],
 "تحقیر کردن":["با گفتار یا رفتار، ارزش و شخصیت کسی را پایین آوردن و او را خوار شمردن.","To humiliate someone or make them feel worthless through words or actions.","أهانَ شخصاً وحطّ من قدره بكلام أو أفعال."],
 "خوش‌گذرانی کردن":["وقت خود را با فعالیت‌های سرگرم‌کننده و لذت‌بخش سپری کردن.","To spend time enjoying oneself through pleasant activities.","قضى وقته مستمتعاً بأنشطة لطيفة ومسلّية."],
 "انصراف دادن":["از ادامهٔ شرکت در کاری، مسابقه یا برنامه صرف‌نظر کردن و کنار کشیدن.","To withdraw or pull out of an activity, competition, or plan.","انسحبَ وتراجع عن المشاركة في نشاط أو منافسة أو خطة."],
 "جایگاه اجتماعی":["موقعیت و مرتبه‌ای که فرد یا گروه در ساختار جامعه دارد.","The position or status a person or group holds in society.","المكانة أو المرتبة التي يشغلها شخص أو جماعة في المجتمع."],
 "انگیزه":["دلیل یا نیروی درونی که فرد را به انجام کاری یا رسیدن به هدفی تشویق می‌کند.","A reason or inner drive that encourages someone to act or pursue a goal.","سبب أو دافع داخلي يشجّع الشخص على العمل أو السعي إلى هدف."],
 "دوران حاضر":["زمان کنونی و دوره‌ای که اکنون در آن زندگی می‌کنیم.","The present time or era in which we live.","الوقت أو العصر الحالي الذي نعيش فيه."],
 "عمده":["بخش اصلی یا بزرگ‌تر یک مجموعه؛ همچنین به معنای بیشتر و غالب.","The main or largest part of something; also most or predominant.","الجزء الرئيسي أو الأكبر من الشيء؛ ويأتي بمعنى معظم أو غالب."],
 "لباس دست‌دوم":["لباسی که پیش‌تر شخص دیگری از آن استفاده کرده و دوباره برای فروش یا استفاده عرضه می‌شود.","Clothing that someone else has previously worn and that is resold or reused.","ملابس استعملها شخص آخر من قبل ثم عُرضت للبيع أو لإعادة الاستعمال."],
 "سر زدن":["برای دیداری کوتاه به جایی رفتن؛ همچنین به معنای بررسی یا کنترل کردن.","To drop by for a brief visit; also to check on something.","زارَ مكاناً زيارة قصيرة؛ ويأتي أيضاً بمعنى تفقّد شيء."],
 "راضی بودن":["از وضعیت، نتیجه یا رفتار کسی احساس خشنودی و رضایت داشتن.","To be satisfied or pleased with a situation, result, or someone's behaviour.","كان راضياً أو مسروراً بحالة أو نتيجة أو سلوك شخص."],
 "کادو":["هدیه‌ای که به مناسبت یا برای ابراز محبت به کسی داده می‌شود.","A gift or present given to someone for an occasion or as a gesture of affection.","هدية تُقدّم لشخص في مناسبة أو تعبيراً عن المودّة."],
 "حساب بانکی":["حسابی در بانک که پول در آن نگهداری و واریز یا برداشت می‌شود.","An account at a bank where money is held, deposited, and withdrawn.","حساب في مصرف تُحفظ فيه الأموال وتُودع وتُسحب."],
 "موجودی":["مقدار پول یا کالایی که در یک حساب یا انبار در حال حاضر باقی مانده است.","The amount of money or goods currently remaining in an account or stock.","كمية المال أو البضائع المتبقية حالياً في حساب أو مخزون."],
 "نقد کردن":["چک یا دارایی را به پول نقد تبدیل کردن؛ همچنین به معنای بررسی و ارزیابی انتقادی.","To convert a cheque or asset into cash; also to review or assess critically.","حوّلَ شيكاً أو أصلاً إلى نقد؛ ويأتي أيضاً بمعنى التقييم والنقد."],
 "املاک":["زمین‌ها، خانه‌ها و ساختمان‌هایی که دارایی غیرمنقول به شمار می‌آیند.","Land, houses, and buildings considered real property.","الأراضي والمنازل والمباني التي تُعدّ عقارات."],
 "وارث":["شخصی که پس از مرگ فردی، طبق قانون یا وصیت بخشی از دارایی او را دریافت می‌کند.","A person who receives some of another person's property after their death by law or will.","شخص يرث جزءاً من ممتلكات المتوفّى بموجب القانون أو الوصية."],
 "سرمایه":["پول یا دارایی‌ای که برای راه‌اندازی، اداره یا گسترش فعالیتی به کار گرفته می‌شود.","Money or assets used to start, operate, or expand an activity or business.","مال أو أصول تُستعمل لبدء نشاط أو إدارته أو توسيعه."],
 "زیان":["از دست دادن پول، دارایی یا منفعت؛ نتیجه‌ای منفی در یک فعالیت یا معامله.","A financial or other loss; a negative result in an activity or transaction.","خسارة في المال أو الممتلكات أو المنفعة؛ ونتيجة سلبية لنشاط أو معاملة."]
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH1=Object.keys(rows);
})();

/* Term 03 additional vocabulary — semantic batch 2. */
(()=> {
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "اولویت":["اهمیت یا تقدم بیشتری که باعث می‌شود کاری زودتر یا پیش از کارهای دیگر انجام شود.","The greater importance or precedence that makes something come before other tasks.","أهمية أو أولوية تجعل أمراً ما يُنجز قبل غيره."],
 "خرج کردن":["پول را برای خرید، خدمت یا نیاز مشخصی پرداخت کردن.","To spend money on a purchase, service, or particular need.","أنفقَ المال على شراء أو خدمة أو حاجة معيّنة."],
 "ضایع کردن حق":["حق یا سهم قانونی و اخلاقی شخصی را نادیده گرفتن یا از او گرفتن.","To disregard or deprive someone of a right or rightful share.","تجاهلَ حق شخص أو حرمه من حقّه أو نصيبه المستحق."],
 "قرارداد":["توافق رسمی میان دو یا چند طرف که تعهدها و شرایط آن‌ها را مشخص می‌کند.","A formal agreement between two or more parties that sets out their obligations and terms.","اتفاق رسمي بين طرفين أو أكثر يحدّد التزاماتهم وشروطهم."],
 "نوسان":["تغییر و بالا و پایین رفتن مقدار یا وضعیت چیزی در طول زمان.","A variation or repeated rise and fall in the level or condition of something.","تغيّر وتقلّب قيمة شيء أو حالته صعوداً وهبوطاً مع الزمن."],
 "پرس‌وجو کردن":["برای به دست آوردن اطلاعات، از افراد سؤال کردن یا دربارهٔ موضوعی تحقیق کردن.","To make enquiries or ask people for information about something.","استفسرَ وسأل الأشخاص للحصول على معلومات عن أمر."],
 "سیستم ایمنی":["مجموعهٔ سلول‌ها، بافت‌ها و اندام‌هایی که از بدن در برابر عوامل بیماری‌زا دفاع می‌کنند.","The cells, tissues, and organs that defend the body against disease-causing agents.","مجموعة الخلايا والأنسجة والأعضاء التي تدافع عن الجسم ضد مسبّبات الأمراض."],
 "آرام‌بخش":["دارو یا چیزی که اضطراب و تنش را کاهش می‌دهد و باعث آرامش می‌شود.","A medicine or substance that reduces anxiety or tension and produces calm.","دواء أو مادة تخفّف القلق أو التوتر وتسبّب الهدوء."],
 "برخورد قانونی":["اقدام رسمی و مطابق قانون در برابر تخلف یا رفتار ممنوع.","An official response taken according to the law against a violation or prohibited conduct.","إجراء رسمي وفق القانون تجاه مخالفة أو سلوك محظور."],
 "نسل‌های آینده":["افرادی که در سال‌ها و دوره‌های پس از زمان حاضر زندگی خواهند کرد.","People who will live in the years and periods after the present.","الأجيال التي ستعيش في السنوات والعصور اللاحقة للحاضر."],
 "آب‌پاش":["وسیله‌ای که آب را به صورت قطره یا پاشش روی گیاهان یا سطحی دیگر می‌پراکند.","A device that sprays or distributes water over plants or another surface.","جهاز يرشّ الماء أو يوزّعه على النباتات أو سطح آخر."],
 "خشک‌کن":["دستگاهی که با گرما یا جریان هوا لباس یا ماده‌ای دیگر را خشک می‌کند.","A machine that dries clothes or another material using heat or airflow.","جهاز يجفّف الملابس أو مادة أخرى باستعمال الحرارة أو تدفّق الهواء."],
 "آب‌بها":["مبلغی که برای مصرف یا تأمین آب پرداخت می‌شود.","The charge or bill paid for water supply or consumption.","المبلغ أو الفاتورة التي تُدفع مقابل إمداد المياه أو استهلاكها."],
 "آب غیرآشامیدنی":["آبی که برای نوشیدن مناسب یا ایمن نیست، اما ممکن است برای شست‌وشو یا آبیاری استفاده شود.","Water that is not safe or suitable to drink but may be used for washing or irrigation.","ماء غير صالح أو غير آمن للشرب، وقد يُستعمل للغسل أو الري."],
 "عوارض":["پیامدها یا اثرهای یک کار یا وضعیت؛ همچنین هزینه‌ها و رسوم قانونی در برخی کاربردها.","Consequences or side effects of an action or condition; also fees or charges in some contexts.","النتائج أو الآثار المترتّبة على فعل أو حالة؛ وتأتي أيضاً بمعنى الرسوم في بعض السياقات."],
 "پولک":["صفحهٔ کوچک و نازکی که سطح بدن ماهی یا برخی خزندگان را می‌پوشاند.","A small, thin plate covering the body of a fish or some reptiles; a scale.","صفيحة صغيرة رقيقة تغطّي جسم السمكة أو بعض الزواحف؛ حرشفة."],
 "نیش":["اندام نوک‌تیز جانور برای گزیدن یا تزریق زهر؛ همچنین اثر گزش.","A sharp part of an animal used to bite or inject venom; also the bite itself.","جزء حادّ في الحيوان يُستعمل للّسع أو حقن السمّ؛ ويعني أيضاً أثر اللدغة."],
 "چنگال":["ناخن‌های خمیده و تیز پرندگان یا جانوران برای گرفتن و پاره کردن؛ همچنین ابزار غذاخوری.","The curved, sharp nails of birds or animals used to grip and tear; also a fork used for eating.","أظافر معقوفة وحادّة للطيور أو الحيوانات للإمساك والتمزيق؛ ويعني أيضاً شوكة الطعام."],
 "زنده‌زا":["جانوری که نوزاد زنده به دنیا می‌آورد، نه اینکه تخم بگذارد.","An animal that gives birth to live young rather than laying eggs.","حيوان يلد صغاراً أحياء بدلاً من وضع البيض."],
 "کوهان":["برآمدگی بزرگ روی پشت برخی جانوران، مانند شتر، که در شتر محل ذخیرهٔ چربی است.","A raised hump on the back of some animals, such as a camel, where fat is stored.","نتوء مرتفع على ظهر بعض الحيوانات كالجمل، ويُخزَّن فيه الدهن عند الجمل."],
 "گرمسیر":["منطقه‌ای با آب‌وهوای گرم، به‌ویژه در بیشتر ماه‌های سال.","A region with a warm climate, especially during most of the year.","منطقة ذات مناخ دافئ، ولا سيّما في معظم أشهر السنة."],
 "خون‌سرد":["در زیست‌شناسی، جانوری که دمای بدنش تا حد زیادی با دمای محیط تغییر می‌کند.","In biology, an animal whose body temperature changes substantially with the surrounding environment.","في علم الأحياء، حيوان تتغيّر حرارة جسمه بدرجة كبيرة تبعاً لحرارة البيئة المحيطة."],
 "دخالت کردن":["بدون دعوت یا ضرورت وارد کار یا مسئلهٔ دیگران شدن و در آن اثر گذاشتن.","To interfere in another person's affairs without invitation or necessity.","تدخّلَ في شؤون الآخرين من دون دعوة أو ضرورة وأثّر فيها."],
 "زاد و ولد":["فرایند تولیدمثل و به وجود آمدن فرزندان در انسان‌ها یا جانوران.","The process of reproduction and producing offspring in humans or animals.","عملية التكاثر وإنجاب الذرية لدى البشر أو الحيوانات."],
 "پناهگاه":["مکانی امن که انسان یا جانور در آن از خطر، آب‌وهوا یا آسیب در امان می‌ماند.","A safe place where a person or animal is protected from danger, weather, or harm.","مكان آمن يحتمي فيه الإنسان أو الحيوان من الخطر أو الطقس أو الأذى."],
 "محدودهٔ جغرافیایی":["منطقه یا گستره‌ای که یک مکان، پدیده یا گونه در آن قرار دارد یا پراکنده شده است.","The area or range in which a place, phenomenon, or species is located or distributed.","المنطقة أو النطاق الذي يوجد فيه مكان أو ظاهرة أو نوع حيّ أو ينتشر ضمنه."],
 "مومیایی":["جسد مرده‌ای که با روش‌های ویژه حفظ شده تا از پوسیدن جلوگیری شود.","A dead body preserved by special methods to prevent decay.","جسد متوفّى حُفظ بطرق خاصة لمنع تحلّله."],
 "قلمرو":["سرزمین یا محدوده‌ای که زیر فرمان یا مالکیت کسی است؛ همچنین حوزهٔ فعالیت یا دانش.","A territory under someone's rule or control; also a field or domain of activity or knowledge.","أرض تخضع لحكم شخص أو سيطرته؛ ويأتي أيضاً بمعنى مجال النشاط أو المعرفة."],
 "مؤسس":["شخصی که سازمان، نهاد یا مجموعه‌ای را پایه‌گذاری می‌کند.","A person who establishes or founds an organisation, institution, or group.","شخص يؤسّس منظمة أو مؤسسة أو مجموعة."],
 "دستاورد":["نتیجه یا موفقیتی ارزشمند که از تلاش، پژوهش یا فعالیت به دست می‌آید.","A valuable result or achievement gained through effort, research, or activity.","نتيجة أو إنجاز ذو قيمة يتحقّق بفضل الجهد أو البحث أو العمل."]
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH2=Object.keys(rows);
})();

/* Term 03 additional vocabulary — semantic batch 3. */
(()=> {
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "مصنوعی":["ساخته‌شده به دست انسان، نه به‌وجودآمده به‌طور طبیعی.","Made by humans rather than occurring naturally.","مصنوع بيد الإنسان وليس موجوداً بصورة طبيعية."],
 "سوگواری":["ابراز اندوه و عزاداری برای درگذشت یا مصیبت کسی.","The expression of grief or mourning for someone's death or a tragedy.","إظهار الحزن والحداد على وفاة شخص أو وقوع مصيبة."],
 "دامداری":["پرورش و نگهداری دام‌هایی مانند گاو، گوسفند و بز برای تولید غذا و محصولات دیگر.","The raising and care of livestock such as cattle, sheep, and goats for food and other products.","تربية المواشي مثل الأبقار والأغنام والماعز لإنتاج الغذاء والمنتجات الأخرى."],
 "خطوط قرمز":["حدود یا اصولی که نباید از آن‌ها عبور کرد یا آن‌ها را نقض کرد.","Limits or principles that must not be crossed or violated.","حدود أو مبادئ لا يجوز تجاوزها أو انتهاكها."],
 "پخش کردن":["چیزی را میان افراد یا مکان‌های مختلف توزیع کردن؛ همچنین انتشار برنامه یا صدا و تصویر.","To distribute something among people or places; also to broadcast audio, video, or a programme.","وزّعَ شيئاً على أشخاص أو أماكن مختلفة؛ ويأتي أيضاً بمعنى بثّ برنامج أو صوت أو صورة."],
 "کفن":["پارچه‌ای که پیکر فرد درگذشته را پیش از دفن با آن می‌پوشانند.","The cloth used to wrap a deceased person before burial.","القماش الذي يُلفّ به جسد المتوفّى قبل الدفن."],
 "پرفروش":["کالا، کتاب یا فیلمی که تعداد زیادی از آن فروخته شده است.","A product, book, or film that has sold in large quantities.","منتج أو كتاب أو فيلم بيع منه عدد كبير."],
 "اشتراک":["عضویت یا پرداخت دوره‌ای برای استفاده از یک خدمت؛ همچنین سهم مشترک یا ویژگی مشترک.","A membership or recurring payment for a service; also a shared part or common feature.","عضوية أو دفع دوري للاستفادة من خدمة؛ ويأتي أيضاً بمعنى حصة أو صفة مشتركة."],
 "به خود اختصاص دادن":["بخش یا سهمی از چیزی را برای خود گرفتن یا در اختیار خود قرار دادن.","To take or occupy a particular share or portion for oneself.","استحوذَ على جزء أو حصة معيّنة وجعلها لنفسه."],
 "سلاح گرم":["سلاحی که با انفجار باروت یا نیروی گاز، گلوله یا پرتابه شلیک می‌کند.","A weapon that fires a bullet or projectile using an explosive charge or expanding gas.","سلاح يطلق رصاصة أو مقذوفاً باستعمال شحنة متفجرة أو غاز متمدّد."],
 "ضربان":["حرکت یا تپش منظم و تکرارشونده، به‌ویژه تپیدن قلب یا نبض.","A regular repeated beat or pulse, especially of the heart or pulse.","نبض أو خفقان منتظم ومتكرر، ولا سيّما ضربات القلب."],
 "افزودن":["چیزی را به مقدار یا مجموعه‌ای اضافه کردن.","To add something to an amount or collection.","أضافَ شيئاً إلى كمية أو مجموعة."],
 "فانوس":["چراغی قابل حمل که برای روشنایی، معمولاً با شیشه یا پوشش محافظ، استفاده می‌شود.","A portable lamp, often with a protective glass or casing, used for illumination.","مصباح محمول يُستعمل للإضاءة، وغالباً يكون له زجاج أو غطاء واقٍ."],
 "ولیمه":["مهمانی غذایی که معمولاً به مناسبت ازدواج یا رویدادی خوشایند برگزار می‌شود.","A celebratory meal or feast, often held for a wedding or happy occasion.","وليمة أو مأدبة احتفالية تُقام غالباً بمناسبة الزواج أو حدث سعيد."],
 "دفترخانه":["محل رسمی ثبت اسناد و انجام امور حقوقی مانند ثبت ازدواج یا معاملات.","An official office where documents and legal matters, such as marriages or transactions, are registered.","مكتب رسمي لتسجيل الوثائق وإتمام المعاملات القانونية كالزواج والعقود."],
 "گرداندن":["چیزی را چرخاندن؛ یا اداره و مدیریت کردن یک کسب‌وکار، سازمان یا فعالیت.","To turn something around; also to run or manage a business, organisation, or activity.","أدارَ شيئاً أو جعله يدور؛ ويأتي أيضاً بمعنى إدارة عمل أو مؤسسة أو نشاط."],
 "بنا شدن":["ساخته شدن یا شکل گرفتن یک ساختمان، نهاد یا ساختار.","To be built or established; for a building or structure to be created.","شُيّدَ أو أُنشئَ مبنى أو كيان أو هيكل."],
 "بددهان":["کسی که عادت دارد از واژه‌های زشت و ناسزا استفاده کند.","A person who habitually uses foul or abusive language.","شخص اعتاد استعمال الألفاظ البذيئة والشتائم."],
 "زشت‌گفتار":["کسی که با واژه‌ها و لحنی ناپسند و بی‌ادبانه صحبت می‌کند.","Someone who speaks in an offensive or impolite manner.","شخص يتكلّم بألفاظ ونبرة قبيحة أو غير مهذّبة."],
 "بدوبیراه":["واژه‌ها و عبارت‌های توهین‌آمیز و ناسزا که برای آزار یا تحقیر دیگری گفته می‌شوند.","Insults and abusive words used to offend or humiliate someone.","شتائم وألفاظ مسيئة تُقال لإيذاء شخص أو إهانته."],
 "گستاخ":["کسی که با بی‌احترامی و جرئت نامناسب رفتار یا صحبت می‌کند.","Rude or disrespectful; showing improper boldness.","وقح أو قليل الاحترام ويتصرّف بجرأة غير لائقة."],
 "شرمسار شدن":["به سبب اشتباه یا رفتار نادرست احساس شرم و خجالت کردن.","To feel ashamed or embarrassed because of a mistake or improper behaviour.","شعرَ بالخجل والعار بسبب خطأ أو تصرّف غير سليم."],
 "ترک تحصیل":["پیش از پایان دورهٔ آموزشی، درس و تحصیل را رها کردن.","To leave school or an educational programme before completing it.","تركَ المدرسة أو البرنامج الدراسي قبل إكماله."],
 "کلمات همگون":["واژه‌هایی که از نظر آوا یا نوشتار به هم شبیه‌اند، اما معناهای متفاوتی دارند.","Words that resemble one another in sound or spelling but have different meanings.","كلمات تتشابه في الصوت أو الكتابة لكن تختلف في المعنى."],
 "واردکننده":["شخص یا شرکتی که کالا را از کشور دیگری وارد می‌کند.","A person or company that brings goods into a country from abroad.","شخص أو شركة تستورد السلع من بلد آخر."],
 "فیزیکدان":["دانشمندی که ماده، انرژی، حرکت و قوانین فیزیکی طبیعت را بررسی می‌کند.","A scientist who studies matter, energy, motion, and the physical laws of nature.","عالِم يدرس المادة والطاقة والحركة والقوانين الفيزيائية للطبيعة."],
 "بمباران":["حمله با بمب یا مواد انفجاری از هوا یا زمین به یک منطقه یا هدف.","An attack on an area or target using bombs or explosive weapons.","هجوم على منطقة أو هدف باستعمال القنابل أو الأسلحة المتفجرة."],
 "تسلیم شدن":["مقاومت را متوقف کردن و خود یا موضع را به طرف مقابل واگذار کردن.","To stop resisting and surrender oneself or one's position to the other side.","أوقفَ المقاومة واستسلمَ أو سلّم موقفه للطرف الآخر."],
 "سرزنش کردن":["کسی را به سبب اشتباه یا رفتار نادرست ملامت کردن.","To blame or reproach someone for a mistake or improper action.","لامَ شخصاً أو وبّخه بسبب خطأ أو تصرّف غير سليم."],
 "سنگ‌تراش":["پیشه‌وری که سنگ را می‌بُرد، شکل می‌دهد یا روی آن نقش و طرح ایجاد می‌کند.","A craftsperson who cuts, shapes, or carves stone.","حِرَفي يقطع الحجر أو يشكّله أو ينحت عليه الزخارف."]
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH3=Object.keys(rows);
})();

/* Term 03 additional vocabulary — semantic batch 4. */
(()=> {
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "سایه‌بان":["ساختار یا پوششی که از آفتاب، باران یا عوامل محیطی محافظت می‌کند و سایه ایجاد می‌کند.","A structure or covering that provides shade and protection from sunlight, rain, or other environmental conditions.","مظلّة أو غطاء يوفّر الظلّ والحماية من أشعة الشمس أو المطر أو العوامل البيئية."],
 "پیشکار":["فردی که در خانه یا محل کار به شخص دیگری خدمت می‌کند و در انجام امور روزانه یاری می‌رساند.","An attendant or personal assistant who serves and helps someone with daily tasks at home or work.","خادم أو مساعد شخصي يخدم شخصاً آخر ويعينه في الأعمال اليومية في المنزل أو العمل."],
 "چسبیدن":["به سطح یا چیزی متصل ماندن یا به آن پیوستن، به‌گونه‌ای که جدا شدن دشوار باشد.","To stick or adhere to a surface or object, so that separation may be difficult.","التصقَ بسطح أو شيء وبقي متصلاً به بحيث يصعب فصله."],
 "رسید":["برگه یا مدرکی که دریافت پول، کالا یا مدرک دیگری را تأیید می‌کند.","A receipt or written proof that money, goods, or another item has been received.","إيصال أو وثيقة تثبت استلام المال أو البضائع أو شيء آخر."],
 "وام دادن":["پول یا دارایی را با توافق بازپرداخت در آینده در اختیار شخص دیگری گذاشتن.","To lend money or property to another person under an agreement to repay it later.","أقرضَ مالاً أو ممتلكات لشخص آخر باتفاق على ردّها لاحقاً."],
 "بذر":["دانه‌ای که برای روییدن گیاه تازه در خاک کاشته می‌شود.","A seed planted in soil so that a new plant can grow.","بذرة تُزرع في التربة لتنمو منها نبتة جديدة."],
 "شخم":["زیرورو کردن خاک زمین کشاورزی برای آماده‌سازی آن جهت کاشت.","The ploughing or turning of agricultural soil to prepare it for planting.","حراثة التربة الزراعية وتقليبها لتهيئتها للزراعة."],
 "دهقان":["کشاورزی که زمین را کشت می‌کند و معمولاً در روستا زندگی یا کار می‌کند.","A farmer or peasant who cultivates land, often living or working in a rural area.","فلاح أو مزارع يزرع الأرض، ويعيش أو يعمل غالباً في منطقة ريفية."],
 "کشتگاه":["زمینی که برای کاشت و پرورش محصولات کشاورزی آماده شده یا به این کار اختصاص دارد.","A field or cultivated area prepared or designated for growing crops.","أرض زراعية أُعدّت أو خُصّصت لزراعة المحاصيل."],
 "شخم زدن":["با گاوآهن یا ماشین کشاورزی خاک را بریدن و زیرورو کردن تا برای کاشت آماده شود.","To plough a field by cutting and turning the soil with a plough or agricultural machine.","حرثَ الحقل وقلبَ تربته باستعمال المحراث أو آلة زراعية استعداداً للزراعة."],
 "تخلیه":["خالی کردن یک مکان از افراد یا اشیا؛ همچنین بیرون رفتن مردم از منطقه‌ای برای حفظ جان.","The act of emptying a place of people or objects; also, the evacuation of people from an area for safety.","إفراغ مكان من الأشخاص أو الأشياء؛ ويعني أيضاً إجلاء الناس من منطقة حفاظاً على سلامتهم."],
 "تخلیه کردن":["افراد یا وسایل را از مکانی بیرون بردن یا محتویات چیزی را خالی کردن.","To evacuate people or remove items from a place, or to empty the contents of something.","أخلى مكاناً من الأشخاص أو الأشياء، أو أفرغَ محتويات شيء."],
 "ساکن بودن":["در مکانی زندگی کردن و آن را محل اقامت خود قرار دادن.","To live or reside in a particular place.","سكنَ في مكان واتّخذه محلّاً لإقامته."],
 "جملهٔ پایه":["جمله‌ای اصلی که معنای مستقل دارد و جمله یا عبارت وابسته می‌تواند به آن پیوند بخورد.","A main clause that expresses an independent idea and can be joined by a dependent clause or phrase.","جملة رئيسية تحمل معنى مستقلاً ويمكن أن ترتبط بها جملة أو عبارة تابعة."],
 "جملهٔ پیرو":["جمله‌ای وابسته که به‌تنهایی معنای کامل ندارد و از نظر دستوری به جملهٔ پایه وابسته است.","A subordinate clause that does not express a complete independent thought and depends grammatically on a main clause.","جملة تابعة لا تعبّر وحدها عن معنى مستقل كامل، وترتبط نحوياً بجملة رئيسية."],
 "شاد بودن":["احساس شادی، رضایت یا خوشحالی داشتن.","To feel happy, joyful, or content.","كانَ سعيداً أو شعرَ بالفرح والرضا."],
 "اصلاح کردن":["اشتباه یا نقصی را برطرف کردن؛ یا چیزی را برای بهتر شدن تغییر دادن.","To correct an error or defect, or to change something in order to improve it.","أصلحَ خطأً أو عيباً، أو غيّرَ شيئاً لتحسينه."],
 "پیروی کردن":["از دستور، قانون، روش یا راهنمایی شخصی پیروی و مطابق آن عمل کردن.","To follow or comply with an instruction, rule, method, or person's guidance.","اتّبعَ تعليمات أو قانوناً أو منهجاً أو إرشاد شخص وعمل بموجبه."],
 "نیروی جاذبه":["نیرویی طبیعی که اجسام دارای جرم را به سوی یکدیگر جذب می‌کند.","The natural force of gravity that attracts objects with mass toward one another.","قوة الجاذبية الطبيعية التي تجذب الأجسام ذات الكتلة بعضها نحو بعض."],
 "فروتن":["کسی که خود را برتر از دیگران نمی‌داند و با تواضع و احترام رفتار می‌کند.","Humble; someone who does not consider themselves superior to others and behaves modestly.","متواضع؛ شخص لا يرى نفسه أفضل من الآخرين ويتصرّف بتواضع واحترام."],
 "رشته‌کوه":["مجموعه‌ای از کوه‌ها که در امتداد یکدیگر و در یک ناحیهٔ جغرافیایی قرار دارند.","A chain or range of mountains extending across a geographical region.","سلسلة من الجبال تمتدّ على طول منطقة جغرافية."],
 "ابریشم":["الیاف نرم و درخشانی که از پیلهٔ کرم ابریشم به دست می‌آید و برای بافت پارچه استفاده می‌شود.","A soft, lustrous fibre produced by silkworm cocoons and used to weave fabric.","ليف ناعم لامع يُستخرج من شرانق دودة القز ويُستعمل في نسج الأقمشة."],
 "زیستگاه امن":["محیطی که جانور یا گیاه در آن از خطرهای مهم در امان است و می‌تواند به زندگی و رشد ادامه دهد.","A habitat where an animal or plant is protected from major threats and can continue to live and grow.","موطن آمن يحتمي فيه الحيوان أو النبات من الأخطار الرئيسية ويستطيع مواصلة العيش والنمو."],
 "نماد":["نشانه، شکل یا چیزی که نمایندهٔ یک مفهوم، گروه یا معنای دیگر است.","A sign, image, or object that represents an idea, group, or another meaning.","علامة أو صورة أو شيء يرمز إلى فكرة أو جماعة أو معنى آخر."],
 "کمیاب":["چیزی که به مقدار کم یافت می‌شود و به‌آسانی در دسترس نیست.","Rare; existing in small quantities and not easily found or obtained.","نادر؛ يوجد بكميات قليلة ولا يسهل العثور عليه أو الحصول عليه."],
 "میراث":["دارایی، سنت، دانش یا ارزش‌هایی که از نسل‌های پیشین به نسل‌های بعد منتقل می‌شود.","Property, traditions, knowledge, or values passed down from earlier generations.","أموال أو تقاليد أو معارف أو قيم تنتقل من الأجيال السابقة إلى الأجيال اللاحقة."],
 "خط آهن":["مسیر ساخته‌شده از ریل که قطارها برای جابه‌جایی مسافر یا بار روی آن حرکت می‌کنند.","A railway track or rail route on which trains carry passengers or freight.","سكة أو مسار من القضبان تسير عليه القطارات لنقل الركاب أو البضائع."],
 "دریانوردی":["فعالیت سفر و جابه‌جایی با کشتی در دریا؛ همچنین دانش و فن هدایت کشتی.","Seafaring and travel by ship, as well as the skill and practice of navigating vessels at sea.","الملاحة البحرية والسفر بالسفن في البحر، وكذلك علم وفن قيادة السفن."],
 "رایج شدن":["به‌تدریج میان مردم معمول و پذیرفته شدن و کاربرد یا رواج پیدا کردن.","To gradually become common, widely used, or generally accepted.","أصبحَ شائعاً أو واسع الاستعمال أو مقبولاً بين الناس تدريجياً."]
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH4=Object.keys(rows);
})();

/* Term 03 additional vocabulary — semantic batch 5. */
(()=> {
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "گذار":["عبور یا انتقال از یک مرحله، وضعیت یا دوره به مرحله یا وضعیت دیگر.","A passage or transition from one stage, state, or period to another.","انتقال أو عبور من مرحلة أو حالة أو فترة إلى أخرى."],
 "گزار":["جزئی از برخی واژه‌های فارسی به معنای انجام‌دهنده یا به‌جاآورندهٔ یک کار؛ مانند خدمتگزار.","A word element in Persian compounds referring to someone who performs or carries out an action, as in خدمتگزار (servant).","جزء من بعض الكلمات الفارسية المركّبة يدلّ على من يقوم بعمل، مثل «خدمتگزار» أي الخادم."],
 "میکروب":["موجود زندهٔ بسیار ریزی که معمولاً فقط با میکروسکوپ دیده می‌شود؛ برخی میکروب‌ها بیماری‌زا هستند.","A very small living organism, usually visible only through a microscope; some microbes cause disease.","كائن حيّ دقيق جداً لا يُرى عادةً إلا بالمجهر، وبعض الميكروبات تسبّب الأمراض."],
 "ماندگاری":["مدت یا کیفیت باقی ماندن چیزی بدون از بین رفتن، تغییر زیاد یا فاسد شدن.","The length of time or quality of lasting without being lost, greatly changed, or spoiled.","مدة بقاء الشيء أو قدرته على الاستمرار من دون زوال أو تغيّر كبير أو فساد."],
 "عرق کردن":["از پوست بدن عرق ترشح کردن، معمولاً در اثر گرما، فعالیت بدنی یا اضطراب.","To perspire or sweat, usually because of heat, physical activity, or anxiety.","تعرّقَ؛ أفرزَ العرق من الجلد، عادةً بسبب الحرارة أو النشاط البدني أو القلق."],
 "ابلاغ":["رساندن رسمی یک خبر، دستور، تصمیم یا پیام به فرد یا نهاد مربوط.","The formal communication or delivery of a notice, instruction, decision, or message to the relevant person or organisation.","تبليغ أو إيصال خبر أو أمر أو قرار أو رسالة رسمية إلى الشخص أو الجهة المعنية."],
 "اشک شوق":["اشکی که بر اثر شادی، هیجان یا احساس عمیق خوشحالی از چشم جاری می‌شود.","Tears shed because of joy, excitement, or deep happiness.","دموع تنزل بسبب الفرح أو الحماس أو السعادة العميقة."],
 "حکاکی‌شده":["سطحی که روی آن با ابزار، نقش یا نوشته‌ای کنده و ایجاد شده است.","Engraved; having a design or writing cut into its surface.","منقوش أو محفور؛ نُقشَ رسم أو كتابة على سطحه بأداة."],
 "صلهٔ رحم":["دیدار، رسیدگی و حفظ ارتباط محبت‌آمیز با خویشاوندان و اعضای خانواده.","Maintaining family ties through visiting, caring for, and keeping affectionate contact with relatives.","صلة الأقارب بزيارتهم ورعايتهم والمحافظة على التواصل الودّي معهم."],
 "گنبد":["سقف یا سازه‌ای خمیده و نیم‌کره‌ای که معمولاً بالای ساختمان یا فضای بزرگ قرار می‌گیرد.","A curved, usually dome-shaped roof or structure built over a building or large space.","سقف أو بناء مقوّس يشبه نصف الكرة، يُقام غالباً فوق مبنى أو مساحة واسعة."],
 "یتیم":["کودکی که پدر خود را از دست داده است؛ در کاربرد عمومی گاهی به کودکی بی‌سرپرست نیز گفته می‌شود.","An orphan; a child whose father has died, and more generally a child without parental care.","يتيم؛ طفل توفّي أبوه، ويُستعمل أحياناً بصورة أعمّ للطفل الذي فقد الرعاية الوالدية."],
 "عرفان":["شناخت و معرفت معنوی و باطنی دربارهٔ خدا، انسان و حقیقت؛ همچنین حوزه‌ای از اندیشه و سلوک معنوی.","Spiritual or inner knowledge of God, the human being, and reality; also the tradition of mystical thought and practice.","معرفة روحية وباطنية بالله والإنسان والحقيقة؛ ويُطلق أيضاً على منهج الفكر والسلوك العرفاني."],
 "اقوام":["خویشاوندان و بستگان یک شخص؛ همچنین در معنایی دیگر، ملت‌ها و گروه‌های قومی.","A person's relatives or kin; in another sense, peoples or ethnic groups.","أقارب الشخص وذووه؛ ويأتي أيضاً بمعنى الشعوب والجماعات القومية."],
 "دهکدهٔ توریستی":["روستایی که امکانات و خدماتی برای پذیرایی از گردشگران و بازدیدکنندگان فراهم کرده است.","A village equipped with facilities and services for tourists and visitors.","قرية توفّر مرافق وخدمات لاستقبال السيّاح والزائرين."],
 "روایت کردن":["داستان، رویداد یا مطلبی را به ترتیب و با زبان خود بازگو کردن.","To narrate or recount a story, event, or account in sequence.","روى قصةً أو حدثاً أو خبراً وسرده بتسلسل وبأسلوبه."],
 "زندگی‌نامه":["نوشته‌ای دربارهٔ زندگی یک شخص که رویدادها و مراحل مهم زندگی او را شرح می‌دهد.","A biography: a written account of a person's life and its important events and stages.","سيرة ذاتية للغير؛ نصّ يروي حياة شخص وأحداثها ومراحلها المهمة."],
 "دانشیار":["مرتبه‌ای دانشگاهی برای عضو هیئت علمی که معمولاً پس از استادیاری و پیش از استادی قرار دارد.","An associate professor; an academic rank generally above assistant professor and below full professor.","أستاذ مشارك؛ رتبة أكاديمية تأتي عادةً بعد الأستاذ المساعد وقبل الأستاذ."],
 "بخش اطفال":["بخشی از بیمارستان که برای معاینه، درمان و مراقبت پزشکی از نوزادان و کودکان در نظر گرفته شده است.","The paediatrics department or ward of a hospital, providing medical care for infants and children.","قسم أو جناح طبّ الأطفال في المستشفى، ويقدّم الرعاية الطبية للرضّع والأطفال."],
 "فعالیت علمی":["کاری مانند پژوهش، آزمایش، مطالعه یا انتشار مقاله که برای گسترش دانش انجام می‌شود.","An activity such as research, experimentation, study, or publishing that contributes to the advancement of knowledge.","نشاط مثل البحث أو التجربة أو الدراسة أو نشر المقالات بهدف تطوير المعرفة."],
 "عهده داشتن":["مسئولیت انجام یا پیگیری کاری را بر عهده داشتن.","To be responsible for carrying out or overseeing a task.","تولّى مسؤولية تنفيذ عمل أو متابعته."],
 "از دنیا رفتن":["درگذشتن؛ عبارت مؤدبانه و غیرمستقیم برای گفتن اینکه کسی مرده است.","To pass away; a gentle or indirect expression meaning that someone has died.","توفّي؛ تعبير لطيف وغير مباشر للدلالة على موت شخص."],
 "همکاری داشتن":["برای رسیدن به هدفی مشترک با فرد یا گروه دیگری کار کردن.","To cooperate or work together with another person or group toward a shared goal.","تعاونَ أو عملَ مع شخص أو جماعة لتحقيق هدف مشترك."],
 "به چاپ رسیدن":["منتشر شدن یک کتاب، مقاله یا نوشته به صورت چاپی.","For a book, article, or written work to be published in print.","نُشرَ كتاب أو مقال أو نصّ مطبوع."],
 "به عهده گرفتن":["مسئولیت انجام کاری یا مدیریت آن را پذیرفتن.","To take on or accept responsibility for doing or managing something.","تولّى مسؤولية القيام بعمل أو إدارته وقَبِلَها."],
 "به پایان رساندن":["کاری را کامل کردن و آن را تا آخر پیش بردن.","To bring something to an end by completing it.","أنهى عملاً وأتمّه حتى نهايته."],
 "کوچهٔ بن‌بست":["کوچه‌ای که از یک سمت راه خروج ندارد و به مسیر دیگری متصل نمی‌شود.","A dead-end alley or lane with no through exit at one end.","زقاق مسدود لا يوفّر منفذاً للمرور من أحد طرفيه."],
 "انتهای خیابان":["بخش پایانی خیابان، در نقطه‌ای که مسیر آن تمام می‌شود یا به مسیر دیگری می‌رسد.","The far end of a street, where it finishes or meets another route.","نهاية الشارع، حيث ينتهي مساره أو يلتقي بطريق آخر."],
 "بافته شدن":["با درهم‌تنیدن نخ‌ها یا رشته‌ها، به شکل پارچه، فرش یا بافتی دیگر درآمدن.","To be woven by interlacing threads or strands into fabric, a carpet, or another textile.","نُسجَ بتشابك الخيوط أو الألياف لتكوين قماش أو سجادة أو منسوج آخر."],
 "کانون گرم خانواده":["فضای صمیمی و حمایتگر خانواده که اعضای آن در کنار هم احساس محبت، امنیت و تعلق می‌کنند.","The warm, loving, and supportive family environment in which members feel affection, security, and belonging.","الجوّ الأسري الدافئ والمحبّ والداعم الذي يشعر فيه أفراد الأسرة بالمودّة والأمان والانتماء."],
 "نیازهای روحی":["نیازهای عاطفی، معنوی و روانی انسان، مانند محبت، آرامش، امید و احساس تعلق.","A person's emotional, spiritual, and psychological needs, such as affection, peace, hope, and belonging.","احتياجات الإنسان العاطفية والروحية والنفسية، مثل المحبة والطمأنينة والأمل والشعور بالانتماء."]
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH5=Object.keys(rows);
})();

/* Term 03 additional vocabulary — semantic batch 6. */
(()=> {
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "تأثیر داشتن":["بر شخص یا چیزی اثر گذاشتن و باعث تغییر در رفتار، وضعیت یا نتیجهٔ آن شدن.","To have an effect on someone or something and influence its behaviour, condition, or outcome.","أثّرَ في شخص أو شيء وتسبّبَ في تغيير سلوكه أو حالته أو نتيجته."],
 "سبزپوش":["کسی یا چیزی که لباس یا پوششی به رنگ سبز دارد.","A person or thing dressed or covered in green.","شخص أو شيء يرتدي لباساً أخضر أو مكسوّاً باللون الأخضر."],
 "به تن کردن":["لباس یا پوششی را پوشیدن.","To put on or wear an item of clothing.","ارتدى لباساً أو غطاءً."],
 "سر از خاک بیرون آوردن":["از زیر خاک بیرون آمدن و رشد کردن؛ معمولاً دربارهٔ جوانه یا گیاه تازه.","To emerge from the soil and begin growing, usually referring to a new shoot or plant.","خرجَ من التراب وبدأ بالنمو، ويُقال غالباً عن البرعم أو النبتة الجديدة."],
 "منجر شدن":["به نتیجه یا پیامدی مشخص رسیدن یا باعث رخ دادن آن شدن.","To lead to or result in a particular outcome or consequence.","أدّى إلى نتيجة أو عاقبة معيّنة أو تسبّبَ في حدوثها."],
 "نقدنویسی کردن":["دربارهٔ یک کتاب، فیلم، اثر هنری یا موضوع، ارزیابی و نظر تحلیلی نوشتن.","To write a review or critical analysis of a book, film, artwork, or subject.","كتبَ مراجعةً أو نقداً تحليلياً لكتاب أو فيلم أو عمل فني أو موضوع."],
 "برنامهٔ کوتاه‌مدت":["برنامه‌ای برای رسیدن به هدف‌هایی که قرار است در آیندهٔ نزدیک انجام شوند.","A plan designed to achieve goals in the near future.","خطة تهدف إلى تحقيق أهداف في المستقبل القريب."],
 "برنامهٔ بلندمدت":["برنامه‌ای برای رسیدن به هدف‌هایی که تحقق آن‌ها به زمان طولانی‌تری نیاز دارد.","A plan for goals whose achievement requires a longer period of time.","خطة لأهداف يتطلّب تحقيقها مدة زمنية أطول."],
 "پای‌بند بودن":["به اصل، قول، قانون یا تعهدی وفادار ماندن و مطابق آن عمل کردن.","To remain committed or faithful to a principle, promise, rule, or obligation.","التزمَ بمبدأ أو وعد أو قانون أو واجب وظلّ وفياً له."],
 "خونگرم":["کسی که در برخورد با دیگران صمیمی، خوش‌برخورد و زودجوش است.","Warm-hearted and sociable; friendly and welcoming toward others.","ودود واجتماعي؛ يتعامل مع الآخرين بألفة وترحاب."],
 "خانه‌تکانی":["تمیزکاری گستردهٔ خانه، معمولاً پیش از نوروز، همراه با گردگیری و مرتب کردن وسایل.","A thorough house-cleaning, often before Nowruz, involving dusting and putting things in order.","تنظيف شامل للمنزل، غالباً قبل عيد النوروز، يتضمّن إزالة الغبار وترتيب الأغراض."],
 "دانشگاه مجازی":["مؤسسهٔ آموزش عالی که کلاس‌ها و بسیاری از خدمات آموزشی آن از راه اینترنت ارائه می‌شود.","A higher-education institution that delivers classes and many educational services online.","مؤسسة للتعليم العالي تقدّم الدروس وكثيراً من خدماتها التعليمية عبر الإنترنت."],
 "برخط":["متصل به اینترنت یا در حال انجام از طریق شبکهٔ اینترنت؛ معادل فارسی «آنلاین».","Connected to the internet or taking place through an internet network; online.","متصل بالإنترنت أو جارٍ عبر شبكة الإنترنت؛ أي متصل أو إلكتروني."],
 "مقطع تحصیلی":["یکی از مرحله‌های مشخص آموزش، مانند ابتدایی، متوسطه، کارشناسی یا کارشناسی ارشد.","A defined stage of education, such as primary school, secondary school, bachelor's, or master's study.","مرحلة محدّدة من التعليم، مثل الابتدائية أو الثانوية أو البكالوريوس أو الماجستير."],
 "کارنامه":["سندی که نمره‌ها و وضعیت تحصیلی دانش‌آموز یا دانشجو را در یک دوره نشان می‌دهد.","A report card or academic record showing a student's grades and progress during a period.","وثيقة دراسية تعرض درجات الطالب ومستواه وتقدّمه خلال فترة دراسية."],
 "واحد درسی":["بخشی از برنامهٔ آموزشی که برای یک درس تعریف می‌شود و معمولاً مقدار مشخصی اعتبار یا ساعت آموزشی دارد.","A course unit or credit in an educational programme, usually representing a defined amount of study.","وحدة دراسية ضمن البرنامج التعليمي، تمثّل عادةً مقداراً محدّداً من الساعات أو الرصيد الدراسي."],
 "انتخاب واحد کردن":["در آغاز نیم‌سال، درس‌های مورد نظر را طبق مقررات دانشگاه برای ثبت‌نام انتخاب کردن.","To register for selected courses at the beginning of a university term, following the institution's rules.","اختارَ المقررات الدراسية وسجّل فيها في بداية الفصل الجامعي وفق أنظمة المؤسسة."],
 "موضوع‌یابی":["جست‌وجو و بررسی برای پیدا کردن موضوعی مناسب برای پژوهش، مقاله یا نوشته.","The process of searching for and identifying a suitable topic for research, an article, or a piece of writing.","عملية البحث والتقصّي لاختيار موضوع مناسب لبحث أو مقال أو كتابة."],
 "موضوع انتخاب کردن":["یک موضوع را از میان گزینه‌های مختلف برای مطالعه، پژوهش یا گفت‌وگو برگزیدن.","To choose a topic from several options for study, research, or discussion.","اختارَ موضوعاً من بين خيارات متعددة للدراسة أو البحث أو النقاش."],
 "پرسش اصلی":["مهم‌ترین سؤال یک پژوهش یا بحث که مسیر بررسی و پاسخ‌گویی را مشخص می‌کند.","The main question of a study or discussion that guides the investigation and its answer.","السؤال الأساسي في بحث أو نقاش، وهو الذي يحدّد مسار الدراسة والإجابة."],
 "پرسش فرعی":["سؤال کوچک‌تر و وابسته‌ای که برای پاسخ دادن به پرسش اصلی یا روشن کردن بخشی از آن مطرح می‌شود.","A smaller, supporting question used to answer or clarify part of the main question.","سؤال فرعي أصغر يُطرح للإجابة عن السؤال الرئيسي أو توضيح جانب منه."],
 "چهره":["صورت و ظاهر فرد؛ همچنین در کاربرد گسترده‌تر، شخصیت یا فرد شناخته‌شده در یک حوزه.","A person's face or appearance; more broadly, a notable person or figure in a field.","وجه الشخص أو مظهره؛ ويأتي بمعنى شخصية بارزة أو معروفة في مجال ما."],
 "تپل":["دارای اندامی نسبتاً گرد و چاق، معمولاً با لحنی محاوره‌ای و گاه محبت‌آمیز.","Chubby or pleasantly plump; an informal description of a somewhat round body shape.","ممتلئ أو ممتلئ الجسم؛ وصف محادثي لقوام مستدير نسبياً وقد يُقال بمودّة."],
 "شیطان":["در باور دینی، موجودی سرکش و گمراه‌کننده که انسان را به بدی وسوسه می‌کند.","In religious belief, a rebellious and misleading being who tempts people toward wrongdoing.","في المعتقد الديني، كائن متمرّد ومضلّل يوسوس للإنسان ويدعوه إلى الشر."],
 "اشک ریختن":["گریه کردن و جاری شدن اشک از چشم‌ها.","To cry or shed tears.","بكى وذرفت عيناه الدموع."],
 "قایم کردن":["چیزی را در جایی پنهان کردن تا دیگران آن را نبینند یا پیدا نکنند.","To hide or conceal something so that others cannot see or find it.","أخفى شيئاً في مكان كي لا يراه الآخرون أو يعثروا عليه."],
 "لجبازی کردن":["با وجود درخواست یا دلیل دیگران، از روی سرسختی بر نظر یا رفتار خود پافشاری کردن.","To act stubbornly by insisting on one's own view or behaviour despite others' requests or reasons.","عاندَ وأصرّ على رأيه أو سلوكه رغم طلبات الآخرين أو حججهم."],
 "گوش به حرف دادن":["به سخن یا راهنمایی کسی توجه کردن و آن را پذیرفتن یا مطابق آن عمل کردن.","To listen to someone's words or advice and heed or follow it.","أصغى إلى كلام شخص أو نصيحته وأخذ بها أو عمل بموجبها."],
 "سالن تحویل بار":["بخش فرودگاه که مسافران در آن چمدان‌های خود را به شرکت هواپیمایی تحویل می‌دهند.","The airport area where passengers check in and hand their luggage to the airline.","منطقة في المطار يسلّم فيها المسافرون أمتعتهم إلى شركة الطيران لإتمام إجراءات شحنها."],
 "اتباع غیرایرانی":["افرادی که تابعیت کشوری غیر از ایران را دارند و شهروند ایران محسوب نمی‌شوند.","People who hold the nationality of a country other than Iran and are not Iranian citizens.","أشخاص يحملون جنسية دولة غير إيران ولا يُعدّون مواطنين إيرانيين."]
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH6=Object.keys(rows);
})();

/* Term 03 additional vocabulary — semantic batch 7. */
(()=> {
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "شاعر":["کسی که شعر می‌سراید و احساس‌ها، اندیشه‌ها یا تجربه‌های خود را با زبان آهنگین و هنری بیان می‌کند.","A poet; a person who writes poetry to express feelings, ideas, or experiences in artistic language.","شاعر؛ شخص ينظم الشعر ويعبّر بلغة فنية وإيقاعية عن مشاعره وأفكاره وتجربته."],
 "مصراع":["نیمی از یک بیت شعر که همراه با نیمهٔ دیگر، ساختار کامل بیت را می‌سازد.","A hemistich; one of the two halves of a verse of poetry.","شطر البيت الشعري؛ أحد النصفين اللذين يتكوّن منهما البيت."],
 "بیت":["یک واحد کامل شعر فارسی که معمولاً از دو مصراع تشکیل می‌شود.","A couplet; a complete unit of Persian verse, usually consisting of two hemistichs.","بيت شعري؛ وحدة كاملة من الشعر الفارسي تتكوّن عادةً من شطرين."],
 "قافیه":["واژه‌ها یا بخش‌های هم‌آوا در پایان مصراع‌ها که نظم آوایی شعر را پدید می‌آورند.","Rhyme; matching sounds at the ends of poetic lines.","القافية؛ أصوات أو كلمات متشابهة في أواخر الأبيات تُحدث انسجاماً صوتياً."],
 "ردیف":["واژه یا عبارت یکسانی که پس از قافیه در پایان مصراع‌ها یا بیت‌ها تکرار می‌شود.","Radif; a word or phrase repeated after the rhyme at the ends of lines in Persian poetry.","الرَّديف؛ كلمة أو عبارة تتكرّر بعد القافية في أواخر الأشطر أو الأبيات في الشعر الفارسي."],
 "پارسایی":["پرهیز از گناه و رفتار نادرست و پایبندی به پاکی و تقوا.","Piety; avoiding sin and wrongdoing and remaining committed to moral and spiritual integrity.","التقوى؛ اجتناب المعاصي والأعمال السيئة والالتزام بالطهارة والاستقامة."],
 "الهام":["اندیشه یا انگیزه‌ای تازه که ناگهان به ذهن می‌رسد و زمینهٔ آفرینش یا انجام کاری را فراهم می‌کند.","Inspiration; a fresh idea or impulse that comes to mind and stimulates creativity or action.","إلهام؛ فكرة أو دافع جديد يخطر في الذهن ويحفّز الإبداع أو العمل."],
 "نبرد":["درگیری و جنگ میان دو فرد یا گروه؛ همچنین مبارزه‌ای سخت برای رسیدن به هدف.","A battle or struggle between people or groups; also a determined fight to achieve a goal.","معركة أو صراع بين شخصين أو جماعتين؛ ويُستعمل أيضاً للكفاح الشديد من أجل هدف."],
 "آویختن":["چیزی را از جایی بلند یا ثابت به گونه‌ای قرار دادن که از آن آویزان بماند.","To hang or suspend something from a raised point or support.","علّقَ شيئاً في موضع مرتفع أو على حامل بحيث يتدلّى منه."],
 "ظاهر شدن":["پدیدار شدن یا دیده شدن پس از آنکه چیزی یا کسی پنهان بوده یا دیده نمی‌شده است.","To appear or become visible after being hidden or unseen.","ظهرَ أو بدا للعيان بعد أن كان خفياً أو غير مرئي."],
 "آشنا شدن":["برای نخستین بار با شخص، موضوع یا محیطی شناخت و ارتباط پیدا کردن.","To become acquainted with a person, subject, or place.","تعرّفَ إلى شخص أو موضوع أو مكان وأصبح على معرفة به."],
 "باایمان":["دارای ایمان و باور دینی و پایبند به اعتقادات خود.","Faithful; having religious faith and holding firmly to one's beliefs.","مؤمن؛ صاحب إيمان ديني ومتمسّك بمعتقداته."],
 "باتقوا":["دارای تقوا؛ کسی که در رفتار و تصمیم‌های خود از گناه دوری می‌کند و خدا را در نظر دارد.","Pious or God-conscious; someone who avoids wrongdoing and remains mindful of God.","تقيّ؛ شخص يتجنّب المعصية ويراعي مراقبة الله في سلوكه وقراراته."],
 "شجاع":["کسی که در برابر خطر یا دشواری ترس خود را کنترل می‌کند و با شهامت عمل می‌کند.","Brave or courageous; able to face danger or difficulty with resolve.","شجاع؛ من يواجه الخطر أو الصعوبات بثبات وشجاعة."],
 "ظلم کردن":["با رفتار ناعادلانه، حق کسی را پایمال کردن یا به او آسیب رساندن.","To oppress or wrong someone by treating them unjustly or violating their rights.","ظلمَ لشخص أو جار عليه بسلوك غير عادل أو بانتهاك حقوقه."],
 "دفن کردن":["پیکر فرد درگذشته یا چیزی را در خاک قرار دادن و با خاک پوشاندن.","To bury a deceased person or an object by placing it in the ground and covering it with soil.","دفنَ شخصاً متوفّى أو شيئاً بوضعه في الأرض وتغطيته بالتراب."],
 "وداع کردن":["هنگام جدا شدن، با کسی خداحافظی کردن؛ به‌ویژه پیش از سفر یا جدایی طولانی.","To say goodbye to someone, especially before a journey or a long separation.","ودّعَ شخصاً عند فراقه، ولا سيّما قبل سفر أو ابتعاد طويل."],
 "داستان‌نویسی":["هنر و فرایند نوشتن داستان با شخصیت‌ها، رویدادها و طرح روایی.","Story writing; the art and process of creating a narrative with characters, events, and a plot.","كتابة القصص؛ فنّ إنشاء سرد يضمّ شخصيات وأحداثاً وحبكة."],
 "عناصر داستان":["اجزای اصلی تشکیل‌دهندهٔ داستان، مانند شخصیت، زمان، مکان، زاویهٔ دید، رویداد و پیرنگ.","Elements of a story, such as character, time, setting, point of view, events, and plot.","عناصر القصة، مثل الشخصيات والزمان والمكان ووجهة النظر والأحداث والحبكة."],
 "جاذبهٔ دیدنی":["ویژگی یا مکان جذابی که توجه بازدیدکنندگان را جلب می‌کند و ارزش دیدن دارد.","An attraction or appealing feature of a place that draws visitors and is worth seeing.","مَعلَم أو ميزة جذّابة في مكان ما تستقطب الزائرين وتستحقّ المشاهدة."],
 "چادر زدن":["چادر را در محل مناسبی برپا کردن تا بتوان در آن اقامت یا استراحت کرد.","To pitch or set up a tent for staying or resting in a place.","نصبَ خيمة في مكان مناسب للإقامة أو الاستراحة."],
 "رکاب زدن":["با فشار دادن پدال‌های دوچرخه و حرکت دادن پاها، دوچرخه‌سواری کردن.","To pedal a bicycle by pressing its pedals with one's feet.","ضغطَ على دواسات الدراجة بقدميه لقيادتها."],
 "تخریب کردن":["به ساختمان، محیط یا چیزی آسیب جدی زدن یا آن را ویران کردن.","To damage severely or destroy a building, environment, or other thing.","خرّبَ مبنى أو بيئة أو شيئاً آخر وألحق به ضرراً كبيراً."],
 "کنار آمدن":["با شخص یا شرایط دشوار سازگار شدن و راهی برای پذیرش یا مدیریت آن پیدا کردن.","To come to terms with a person or difficult situation and find a way to manage it.","تكيّفَ مع شخص أو ظرف صعب ووجد طريقة لتقبّله أو التعامل معه."],
 "میزبان":["شخص یا نهادی که از مهمانان پذیرایی می‌کند یا رویدادی را برگزار می‌کند.","A host; a person or organisation that welcomes guests or organises an event.","مُضيف؛ شخص أو جهة تستقبل الضيوف أو تنظّم مناسبة."],
 "قلعه":["ساختمانی بزرگ و مستحکم که در گذشته برای دفاع و حفاظت از مردم یا یک منطقه ساخته می‌شد.","A castle or fortress; a large, strongly built structure formerly used for defence and protection.","قلعة أو حصن؛ بناء كبير ومتين شُيّد قديماً للدفاع والحماية."],
 "سنگ‌نوشته":["نوشته یا کتیبه‌ای که حروف یا نشانه‌های آن روی سنگ حک شده است.","A stone inscription; writing or an inscription carved into stone.","نقش حجري؛ كتابة أو نقش حُفرت حروفه أو علاماته على الحجر."],
 "گردشگر":["کسی که برای تفریح، آشنایی با فرهنگ یا دیدن مکان‌ها به منطقه‌ای سفر می‌کند.","A tourist; someone who travels to visit places, enjoy recreation, or experience another culture.","سائح؛ شخص يسافر لزيارة الأماكن أو الترفيه أو التعرّف إلى ثقافة أخرى."],
 "راهنمای گردشگری":["فردی آگاه که گردشگران را همراهی می‌کند و دربارهٔ مکان‌ها، تاریخ و جاذبه‌ها توضیح می‌دهد.","A tour guide; a knowledgeable person who accompanies visitors and explains places, history, and attractions.","مرشد سياحي؛ شخص مطّلع يرافق السيّاح ويشرح لهم الأماكن والتاريخ والمعالم."],
 "کارت پرواز":["مدرکی که پس از انجام مراحل پذیرش صادر می‌شود و اطلاعات پرواز و اجازهٔ سوار شدن به هواپیما را نشان می‌دهد.","A boarding pass; a document issued after check-in that gives flight details and authorises boarding.","بطاقة صعود الطائرة؛ وثيقة تصدر بعد إنهاء إجراءات تسجيل الوصول، وتتضمن معلومات الرحلة وتسمح بالصعود."],
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH7=Object.keys(rows);
})();

/* Term 03 additional vocabulary — semantic batch 8. */
(()=> {
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "به استقبال آمدن":["برای خوشامدگویی به کسی یا چیزی به سوی او رفتن و از ورودش استقبال کردن.","To go out or come forward to welcome someone or greet an arrival.","خرجَ لاستقبال شخص أو شيء والترحيب بقدومه."],
 "حفظ خونسردی":["در شرایط دشوار یا پراسترس آرامش خود را نگه داشتن و شتاب‌زده رفتار نکردن.","To remain calm and composed in a difficult or stressful situation.","حافظَ على هدوئه ورباطة جأشه في موقف صعب أو مثير للتوتر."],
 "سرعت‌سنج":["وسیله‌ای در خودرو یا وسیلهٔ نقلیه که سرعت حرکت آن را نشان می‌دهد.","A speedometer; an instrument in a vehicle that displays its speed.","مقياس السرعة؛ جهاز في المركبة يعرض سرعتها أثناء السير."],
 "سبقت غیرمجاز":["عبور از خودروی جلویی برخلاف قوانین راهنمایی و رانندگی یا در محلی که سبقت ممنوع است.","Illegal overtaking; passing another vehicle in violation of traffic rules or where passing is prohibited.","تجاوز غير قانوني؛ تخطّي مركبة أخرى خلافاً لقواعد المرور أو في مكان يُمنع فيه التجاوز."],
 "لاستیک زاپاس":["لاستیک اضافی خودرو که برای جایگزینی لاستیک پنچر یا آسیب‌دیده همراه راننده است.","A spare tyre carried in a vehicle to replace a flat or damaged tyre.","إطار احتياطي يُحمل في السيارة لاستبدال إطار مثقوب أو تالف."],
 "توقیف شدن":["به دستور مقام قانونی یا پلیس متوقف یا ضبط شدن؛ دربارهٔ خودرو نیز به معنی از حرکت بازداشته شدن است.","To be detained, impounded, or officially stopped; for a vehicle, to be taken out of use by authorities.","أُوقِف أو حُجِز بأمر جهة قانونية أو الشرطة؛ ويقال عن المركبة حين تُمنع من السير."],
 "علامت دادن":["با دست، چراغ یا وسیله‌ای نشانه‌ای فرستادن تا منظور یا قصد خود را به دیگران بفهمانیم.","To signal or give an indication with a hand, light, or other device.","أشارَ أو أعطى إشارة باليد أو الضوء أو وسيلة أخرى لإيصال قصده."],
 "پاسپورت":["مدرک رسمی هویتی و مسافرتی که دولت صادر می‌کند و برای سفر به کشورهای دیگر به کار می‌رود.","A passport; an official government-issued identity and travel document used for international travel.","جواز سفر؛ وثيقة رسمية للهوية والسفر تصدرها الدولة وتُستعمل للتنقّل بين البلدان."],
 "شناسنامه":["مدرک رسمی ثبت احوال در ایران که اطلاعات هویتی و رویدادهایی مانند تولد و ازدواج را ثبت می‌کند.","An Iranian civil identity booklet recording personal details and life events such as birth and marriage.","وثيقة الأحوال المدنية الإيرانية التي تسجّل بيانات الهوية وأحداثاً مثل الولادة والزواج."],
 "حالت تهوع":["احساس ناخوشایندی در معده که ممکن است با میل به استفراغ همراه باشد.","Nausea; an unpleasant feeling in the stomach that may create an urge to vomit.","الغثيان؛ شعور مزعج في المعدة قد يصاحبه إحساس بالرغبة في التقيؤ."],
 "تحویل گرفتن":["چیزی یا کسی را از فرد یا نهادی دریافت کردن و مسئولیت نگهداری یا ادامهٔ کار آن را پذیرفتن.","To receive or take delivery of something or someone, often accepting responsibility for it.","تسلّمَ شيئاً أو شخصاً من فرد أو جهة، وقَبِلَ مسؤولية حفظه أو متابعته."],
 "از پله افتادن":["هنگام بالا یا پایین رفتن از پله‌ها تعادل خود را از دست دادن و سقوط کردن.","To fall while going up or down a staircase.","سقطَ أثناء صعود الدرج أو نزوله بعد أن فقد توازنه."],
 "رژیم غذایی":["الگوی مشخصی از خوراک و نوشیدنی که فرد برای حفظ سلامتی یا رسیدن به هدفی تغذیه‌ای دنبال می‌کند.","A diet; a planned pattern of food and drink followed for health or nutritional goals.","نظام غذائي؛ نمط محدّد من الطعام والشراب يتّبعه الشخص للحفاظ على الصحة أو تحقيق هدف غذائي."],
 "مواد مغذی":["ترکیب‌ها و موادی در غذا که بدن برای رشد، تولید انرژی و حفظ سلامت به آن‌ها نیاز دارد.","Nutrients; substances in food that the body needs for growth, energy, and good health.","المغذّيات؛ مواد في الطعام يحتاج إليها الجسم للنمو وإنتاج الطاقة والمحافظة على الصحة."],
 "سوخت‌وساز بدن":["مجموعهٔ فرایندهای شیمیایی بدن که مواد غذایی را به انرژی و مواد لازم برای فعالیت و ترمیم تبدیل می‌کند.","The body's metabolism; the chemical processes that convert nutrients into energy and materials needed for bodily functions and repair.","أيض الجسم؛ مجموعة العمليات الكيميائية التي تحوّل المغذّيات إلى طاقة ومواد لازمة لوظائف الجسم وإصلاح أنسجته."],
 "خوش‌طعم":["دارای مزه‌ای دلپذیر و مطبوع.","Tasty or flavourful; having a pleasant taste.","لذيذ أو طيّب المذاق؛ ذو طعم مستساغ."],
 "غذاهای آب‌پز":["خوراک‌هایی که با قرار گرفتن در آب جوش یا مایع در حال جوش پخته می‌شوند.","Boiled foods; dishes cooked in boiling water or another simmering liquid.","أطعمة مسلوقة؛ أطباق تُطهى في الماء المغلي أو سائل يغلي."],
 "ذخیره شدن":["برای استفاده در آینده نگهداری یا انباشته شدن؛ مانند مواد غذایی یا اطلاعات.","To be stored or saved for future use, as with food or information.","خُزّنَ أو حُفظَ للاستعمال في المستقبل، مثل الطعام أو المعلومات."],
 "تفت دادن":["مواد غذایی را با مقدار کمی روغن و حرارت نسبتاً زیاد، کوتاه‌مدت در تابه هم زدن و پختن.","To sauté; to cook food briefly in a pan with a small amount of oil over fairly high heat.","قلّى الطعام سريعاً في مقلاة مع كمية قليلة من الزيت وعلى حرارة مرتفعة نسبياً."],
 "پوست کندن":["پوست میوه، سبزی یا مادهٔ غذایی دیگری را با دست یا ابزار جدا کردن.","To peel; to remove the outer skin of a fruit, vegetable, or other food.","قشّرَ الفاكهة أو الخضار أو طعاماً آخر ونزع قشرته الخارجية."],
 "پرورش دادن":["با مراقبت و فراهم کردن شرایط مناسب، گیاه، جانور یا توانایی و مهارتی را رشد دادن.","To cultivate, raise, or develop a plant, animal, ability, or skill through care and suitable conditions.","ربّى أو نمّى نباتاً أو حيواناً أو قدرةً أو مهارةً بالعناية وتوفير الظروف المناسبة."],
 "پیش‌غذا":["خوراکی کوچکی که پیش از غذای اصلی سرو می‌شود تا اشتها را برانگیزد.","An appetizer or starter served before the main course to stimulate the appetite.","مقبّلات؛ طبق صغير يُقدَّم قبل الوجبة الرئيسية لفتح الشهية."],
 "غذای اصلی":["بخش عمدهٔ یک وعدهٔ غذایی که پس از پیش‌غذا و پیش از دسر خورده می‌شود.","The main course; the central and usually largest dish of a meal, served after the starter and before dessert.","الطبق الرئيسي؛ الوجبة الأساسية التي تُقدَّم عادةً بعد المقبلات وقبل الحلوى."],
 "دسر":["خوراکی شیرین که معمولاً در پایان وعدهٔ غذایی خورده می‌شود.","Dessert; a sweet dish usually eaten at the end of a meal.","الحلوى؛ طبق حلو يُؤكل عادةً في نهاية الوجبة."],
 "سفره‌خانه":["رستوران یا غذاخوری با فضای سنتی ایرانی که معمولاً غذاهای ایرانی و گاهی موسیقی یا برنامهٔ سنتی ارائه می‌کند.","A traditional Iranian restaurant or dining house, often serving Persian dishes in a traditional setting.","مطعم إيراني تقليدي يقدّم غالباً الأطباق الفارسية في أجواء تراثية."],
 "سرو شدن":["برای خوردن یا استفاده به مهمان یا مشتری ارائه شدن؛ معمولاً دربارهٔ غذا و نوشیدنی.","To be served or presented to guests or customers, especially food and drinks.","قُدّمَ للضيوف أو الزبائن لتناوله أو استعماله، ويقال غالباً عن الطعام والشراب."],
 "آماده شدن":["برای انجام کاری یا استفاده، مهیا و حاضر شدن؛ همچنین کامل شدن فرایند تهیهٔ چیزی.","To get ready or become prepared for an activity; also, for something being made to become ready.","تهيّأ أو أصبح جاهزاً لعمل ما؛ ويقال أيضاً عن اكتمال إعداد شيء."],
 "آب‌گرم‌کن":["دستگاهی که آب را برای مصرف خانگی یا کاربردهای دیگر گرم می‌کند.","A water heater; a device that heats water for household or other uses.","سخّان الماء؛ جهاز يُستخدم لتسخين المياه للاستعمال المنزلي أو غيره."],
 "اتاق دو تخته":["اتاق اقامتگاهی که دو تخت خواب جداگانه دارد و معمولاً برای دو نفر در نظر گرفته می‌شود.","A twin room; an accommodation room with two separate beds, usually intended for two guests.","غرفة بسريرين منفصلين؛ غرفة إقامة مخصّصة عادةً لشخصين."],
 "درست شدن":["آماده یا ساخته شدن، یا پس از خرابی تعمیر و قابل استفاده شدن؛ معنای دقیق آن به بافت جمله بستگی دارد.","To be made or prepared, or to be repaired and become usable; the exact meaning depends on context.","أُعِدّ أو صُنع، أو أُصلح بعد تلف فأصبح صالحاً للاستعمال؛ ويتحدّد المعنى الدقيق بحسب السياق."],
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH8=Object.keys(rows);
})();

/* Term 03 additional vocabulary — semantic batch 9. */
(()=> {
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "قطع شدن":["متوقف یا جدا شدن چیزی از حالت پیوسته؛ مانند قطع شدن برق، تماس یا جریان آب.","To be cut off, interrupted, or disconnected, as with electricity, a call, or a water supply.","انقطعَ أو توقّفَ أو انفصل، مثل انقطاع الكهرباء أو الاتصال أو تدفّق الماء."],
 "تذکر دادن":["به کسی دربارهٔ رفتار یا کاری یادآوری یا هشدار کردن تا آن را اصلاح کند یا به آن توجه داشته باشد.","To remind or warn someone about an action or behaviour so that they pay attention or correct it.","نبّهَ شخصاً أو ذكّره بسلوك أو عمل لكي ينتبه إليه أو يصحّحه."],
 "معدل ترم":["میانگین نمره‌های دانش‌آموز یا دانشجو در یک نیم‌سال یا دورهٔ تحصیلی.","A term GPA; the average of a student's grades for one academic term or semester.","المعدّل الفصلي؛ متوسط درجات الطالب خلال فصل أو فترة دراسية واحدة."],
 "کارشناسی":["مقطع دانشگاهی پس از دورهٔ متوسطه که معمولاً به دریافت مدرک لیسانس می‌انجامد.","Undergraduate or bachelor's-level study; the university level that usually leads to a bachelor's degree.","مرحلة الدراسة الجامعية الأولى التي تؤدّي عادةً إلى شهادة البكالوريوس."],
 "انتخاب واحد":["فرایند انتخاب و ثبت‌نام درس‌هایی که دانشجو قصد دارد در یک نیم‌سال بگذراند.","Course registration; the process of selecting and enrolling in courses for an academic term.","تسجيل المقررات؛ عملية اختيار المواد الدراسية والتسجيل فيها خلال فصل جامعي."],
 "حذف اضطراری":["حذف یک درس از برنامهٔ دانشجو در مهلت و شرایط ویژه، معمولاً به دلیل مشکل یا وضعیت پیش‌بینی‌نشده.","An emergency course withdrawal; dropping a course under special conditions, usually because of an unexpected difficulty.","حذف اضطراري لمقرر دراسي ضمن شروط ومدة خاصة، غالباً بسبب ظرف أو مشكلة غير متوقّعة."],
 "مشروط شدن":["در نظام آموزشی، به دلیل پایین بودن معدل از حد تعیین‌شده، با محدودیت‌هایی برای ادامهٔ تحصیل روبه‌رو شدن.","To be placed on academic probation because one's GPA falls below the required threshold.","وُضعَ تحت الإنذار الأكاديمي بسبب انخفاض المعدّل عن الحدّ المطلوب."],
 "ترک تحصیل کردن":["ادامهٔ تحصیل را پیش از پایان دوره متوقف کردن و از مدرسه یا دانشگاه خارج شدن.","To drop out or discontinue one's studies before completing the programme.","تركَ الدراسة أو انقطع عنها قبل إكمال البرنامج التعليمي."],
 "تاریخ مصرف":["آخرین تاریخی که تا آن زمان یک ماده یا محصول، طبق شرایط درج‌شده، برای مصرف مناسب دانسته می‌شود.","An expiry or use-by date; the last date a product is considered suitable for use under the stated conditions.","تاريخ انتهاء الصلاحية أو آخر موعد يُعدّ فيه المنتج صالحاً للاستعمال وفق الشروط المحدّدة."],
 "گارانتی":["تعهد سازنده یا فروشنده برای تعمیر، تعویض یا پشتیبانی محصول در مدت و شرایط مشخص.","A warranty or guarantee; a seller's or manufacturer's commitment to repair, replace, or support a product under stated conditions.","ضمان؛ تعهّد البائع أو المصنّع بإصلاح المنتج أو استبداله أو دعمه ضمن مدة وشروط محدّدة."],
 "حراج":["فروش کالا با قیمت کاهش‌یافته یا از طریق رقابت خریداران برای پیشنهاد قیمت؛ بسته به بافت.","A sale or auction; selling goods at reduced prices or through competing bids, depending on context.","تخفيضات أو مزاد؛ بيع السلع بأسعار مخفّضة أو بالمزايدة بين المشترين بحسب السياق."],
 "آب رفتن":["کوچک‌تر شدن پارچه یا لباس پس از شست‌وشو یا حرارت؛ همچنین کم شدن اندازه یا مقدار چیزی.","For fabric or clothing to shrink after washing or heat; more generally, for something to decrease in size.","انكمشَ القماش أو اللباس بعد الغسل أو الحرارة؛ ويُستعمل عموماً لنقصان حجم شيء."],
 "بازگرداندن":["چیزی را دوباره به صاحب، محل یا وضعیت قبلی برگرداندن.","To return or restore something to its owner, place, or previous state.","أعادَ شيئاً إلى صاحبه أو مكانه أو حالته السابقة."],
 "بزغاله":["بچهٔ بز که هنوز جوان است.","A young goat; a kid.","جدي؛ صغير الماعز."],
 "خورجین":["کیسه یا جفت کیسه‌ای که بر پشت چهارپا یا دوچرخه قرار می‌دهند و برای حمل بار استفاده می‌کنند.","A saddlebag or pannier placed over an animal or bicycle to carry goods.","خرج؛ كيس أو كيسان يوضعان على ظهر دابة أو دراجة لحمل الأمتعة."],
 "راهزن":["دزد یا فرد مسلحی که در راه‌ها به مسافران حمله می‌کند و دارایی آنان را می‌رباید.","A highway robber or bandit who attacks travellers and steals their belongings.","قاطع طريق أو لصّ مسلّح يهاجم المسافرين ويسلب ممتلكاتهم."],
 "بقچه":["پارچه‌ای که وسایل را در آن می‌پیچند و گره می‌زنند تا به شکل بسته‌ای قابل حمل درآید.","A cloth bundle made by wrapping belongings in a piece of fabric and tying it.","صُرّة؛ قطعة قماش تُلفّ فيها الأغراض وتُربط لتصبح حزمة قابلة للحمل."],
 "نقاب":["پوششی برای پنهان کردن بخشی یا همهٔ صورت؛ همچنین پوششی نمادین برای ناشناس ماندن.","A veil or face covering that conceals part or all of the face; also a disguise.","نقاب أو غطاء للوجه يستر بعضه أو كلّه؛ ويُستعمل أيضاً للتنكّر وإخفاء الهوية."],
 "غارت کردن":["به مکانی حمله کردن و اموال آن را با زور یا خشونت برداشتن و بردن.","To loot or plunder a place by taking its property through force or violence.","نهبَ مكاناً وسلب ممتلكاته بالقوة أو العنف."],
 "نقاب زدن":["برای پوشاندن صورت یا پنهان کردن هویت، نقاب بر چهره گذاشتن.","To put on or wear a veil or mask to cover one's face or conceal one's identity.","وضعَ نقاباً على وجهه لتغطيته أو لإخفاء هويته."],
 "سراغ چیزی رفتن":["برای پیدا کردن، بررسی یا استفاده از چیزی به دنبال آن رفتن یا به آن مراجعه کردن.","To go looking for something, seek it out, or turn to it for help or use.","بحثَ عن شيء أو قصده أو رجع إليه للاستفادة منه أو فحصه."],
 "هدررفت":["از دست رفتن یا مصرف بی‌فایدهٔ منابعی مانند آب، انرژی، زمان یا پول.","Waste or loss of resources such as water, energy, time, or money.","هدر أو ضياع موارد مثل الماء والطاقة والوقت والمال."],
 "ابداع":["پدید آوردن روش، اندیشه یا چیزی تازه و ابتکاری که پیش‌تر به این شکل وجود نداشته است.","Innovation or origination; creating a new and original idea, method, or thing.","ابتكار؛ إيجاد فكرة أو طريقة أو شيء جديد وأصيل لم يكن موجوداً بهذه الصورة من قبل."],
 "بنا کردن":["ساختمان یا سازه‌ای را ساختن؛ همچنین چیزی مانند یک رابطه یا استدلال را پایه‌گذاری کردن.","To build or construct a structure; also, to establish something such as a relationship or an argument.","بنى أو شيّد مبنى أو منشأة؛ ويُستعمل أيضاً لتأسيس علاقة أو حُجّة."],
 "به‌روز کردن":["اطلاعات، نرم‌افزار یا وسیله‌ای را با تازه‌ترین تغییرات و نسخه‌ها هماهنگ کردن.","To update information, software, or a device so that it reflects the latest changes or version.","حدّثَ المعلومات أو البرنامج أو الجهاز ليتوافق مع أحدث التغييرات أو الإصدارات."],
 "موجود افسانه‌ای":["موجودی خیالی که در اسطوره‌ها، افسانه‌ها یا داستان‌های سنتی توصیف می‌شود.","A mythical or legendary creature described in myths, legends, or traditional stories.","كائن أسطوري أو خرافي تصفه الأساطير والحكايات والقصص التراثية."],
 "خلوتگه":["جای خلوت و دور از رفت‌وآمد که شخص برای تنهایی، آرامش یا عبادت در آن می‌ماند؛ واژه‌ای ادبی.","A secluded retreat or private place used for solitude, quiet, reflection, or worship; a literary term.","خلوة أو مكان منعزل يقصده المرء للوحدة والهدوء والتأمّل أو العبادة؛ لفظ أدبي."],
 "دیوان":["مجموعهٔ شعرهای یک شاعر؛ همچنین در کاربرد تاریخی، دفتر یا دستگاه اداری حکومت.","A divan: a poet's collected works; historically, also a government office or administrative council.","ديوان؛ مجموعة أشعار شاعر، ويأتي تاريخياً أيضاً بمعنى مكتب أو جهاز إداري في الدولة."],
 "کارگه":["کارگاه یا محل انجام کار و تولید؛ صورتی ادبی یا کهن از «کارگاه».","A workshop or workplace where work or production takes place; a literary or archaic form of the word.","ورشة أو مكان للعمل والإنتاج؛ صيغة أدبية أو قديمة لكلمة «ورشة»."],
 "خموش":["خاموش و ساکت؛ کسی یا چیزی که سخن نمی‌گوید یا صدایی از آن برنمی‌آید؛ واژه‌ای ادبی.","Silent or quiet; not speaking or making a sound; a literary or archaic word.","صامت أو ساكن؛ لا يتكلّم ولا يصدر عنه صوت؛ لفظ أدبي أو قديم."],
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH9=Object.keys(rows);
})();

/* Term 03 additional vocabulary — semantic batch 10. */
(()=> {
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "خروش":["صدای بلند و پرقدرت، مانند غرش آب یا فریاد؛ همچنین جوشش و هیجان شدید.","A loud, powerful roar or outcry; also a surge or intense commotion.","هدير أو صياح قوي مرتفع؛ ويأتي أيضاً بمعنى فوران أو اضطراب شديد."],
 "رصد":["مشاهده و بررسی دقیق و پیوستهٔ پدیده‌ای برای گردآوری اطلاعات؛ مانند رصد ستارگان.","Systematic observation or monitoring of a phenomenon to collect information, such as observing stars.","رصد ومراقبة دقيقة ومستمرة لظاهرة ما لجمع المعلومات، مثل مراقبة النجوم."],
 "درویش":["فردی زاهد یا سالک در سنت‌های عرفانی که به سادگی زندگی می‌کند و به امور مادی وابستگی کمی دارد.","A dervish; an ascetic or spiritual seeker in Sufi traditions who lives simply and has little attachment to worldly possessions.","درويش؛ زاهد أو سالك في التقاليد الصوفية يعيش ببساطة ولا يتعلّق كثيراً بالماديات."],
 "سوداگر":["بازرگان یا کسی که به خریدوفروش کالا برای کسب سود می‌پردازد؛ واژه‌ای ادبی.","A merchant or trader who buys and sells goods for profit; a literary term.","تاجر أو متعامل يشتري السلع ويبيعها طلباً للربح؛ لفظ أدبي."],
 "طاس":["ظرفی کم‌عمق و معمولاً فلزی برای شست‌وشو یا نگهداری آب و مواد؛ در برخی بافت‌ها به معنی کاسهٔ بزرگ.","A shallow bowl or basin, often metal, used for washing or holding water and other items.","طَسْت أو وعاء ضحل، غالباً معدني، يُستعمل للغسل أو لحفظ الماء وأشياء أخرى."],
 "طشت":["ظرفی نسبتاً بزرگ و کم‌عمق، معمولاً از فلز یا پلاستیک، برای شستن یا نگهداری چیزها.","A large, shallow basin or tub, commonly used for washing or holding things.","طَسْت كبير وضحل، يُستعمل عادةً لغسل الأشياء أو حفظها."],
 "جاذبهٔ زیارتی":["مکان یا ویژگی‌ای که زائران را به دلیل ارزش دینی یا معنوی به سوی خود جذب می‌کند.","A religious or spiritual attraction that draws pilgrims or visitors.","مَعلَم ديني أو روحي يجذب الزائرين والوافدين."],
 "غریبه":["فردی که برای شخص یا جمعی آشنا نیست؛ بیگانه یا ناشناس.","A stranger; someone unfamiliar or unknown to a person or group.","غريب؛ شخص غير معروف أو غير مألوف لدى فرد أو جماعة."],
 "افطار":["غذایی که روزه‌دار هنگام غروب آفتاب برای پایان دادن به روزه می‌خورد.","Iftar; the meal with which a fasting person breaks the fast at sunset.","الإفطار؛ الطعام الذي يتناوله الصائم عند غروب الشمس لإنهاء صومه."],
 "چادر":["پارچه یا پوشش بزرگی که برای ساختن سرپناه موقت برپا می‌شود؛ همچنین پوشش سنتی زنان در ایران.","A tent made from fabric for temporary shelter; also, a traditional full-body outer covering worn by women in Iran.","خيمة تُنصب من القماش لتوفير مأوى مؤقت؛ ويُطلق أيضاً على غطاء تقليدي ترتديه النساء في إيران."],
 "حفظ آثار":["مراقبت و نگهداری از بناها، اشیا و نشانه‌های تاریخی یا فرهنگی برای جلوگیری از آسیب و نابودی آن‌ها.","The preservation and protection of historical or cultural buildings, objects, and remains from damage or destruction.","صيانة الآثار والمباني والأشياء التاريخية أو الثقافية وحمايتها من التلف والاندثار."],
 "دامنه":["بخش شیب‌دار زمین در پایین یا کنار کوه؛ همچنین گستره یا محدودهٔ یک موضوع یا فعالیت.","A mountain slope or foothill; also the range, scope, or extent of a subject or activity.","سفح الجبل أو منحدره؛ ويأتي أيضاً بمعنى نطاق موضوع أو نشاط أو مداه."],
 "به‌یادماندنی":["چیزی که به دلیل اهمیت، زیبایی یا تأثیر عاطفی در حافظه می‌ماند و فراموش نمی‌شود.","Memorable; something that remains in one's memory because of its importance, beauty, or emotional impact.","لا يُنسى؛ شيء يبقى في الذاكرة لأهميته أو جماله أو أثره العاطفي."],
 "جشن فانوس‌ها":["جشنی که در آن فانوس‌ها و چراغ‌های رنگارنگ روشن می‌شوند و مردم با برنامه‌ها و آیین‌های ویژه آن را برگزار می‌کنند.","A lantern festival in which colourful lanterns and lights are displayed as part of special celebrations and customs.","مهرجان الفوانيس؛ احتفال تُضاء فيه الفوانيس والمصابيح الملوّنة وتُقام خلاله فعاليات وطقوس خاصة."],
 "جشن مردگان":["آیین یا جشنی فرهنگی که در آن یاد درگذشتگان گرامی داشته می‌شود؛ نام و شیوهٔ آن در فرهنگ‌های مختلف متفاوت است.","A festival or cultural observance honouring the dead; its name and customs vary across cultures.","احتفال أو طقس ثقافي لإحياء ذكرى الموتى؛ وتختلف تسميته وعاداته بين الثقافات."],
 "سرزنده":["شاداب، پرانرژی و بانشاط؛ کسی یا فضایی که شور و تحرک دارد.","Lively, cheerful, and energetic; full of vitality and animation.","مفعم بالحيوية والنشاط والبهجة؛ شخص أو مكان يتّسم بالحركة والمرح."],
 "نحس":["بدیُمن یا شوم؛ چیزی که در باور عامیانه با بدشانسی یا اتفاق ناخوشایند پیوند داده می‌شود.","Ill-omened or unlucky; associated in popular belief with misfortune or an unpleasant event.","مشؤوم أو نذير سوء؛ يرتبط في المعتقدات الشعبية بالنحس أو بحدث غير سار."],
 "عاقد":["شخصی که عقد ازدواج را جاری می‌کند و پیوند رسمی ازدواج را ثبت یا اعلام می‌کند.","A marriage officiant who conducts or solemnises a marriage ceremony.","عاقد؛ الشخص الذي يُجري عقد الزواج ويُعلن أو يوثّق الارتباط الرسمي."],
 "رنگ پاشیدن":["رنگ را به صورت قطره یا ذرات ریز روی سطحی پاشیدن تا آن را رنگ‌آمیزی یا تزئین کند.","To spray or splatter paint or colour onto a surface for painting or decoration.","رشّ الطلاء أو اللون على سطح على هيئة قطرات أو ذرات صغيرة لتلوينه أو تزيينه."],
 "محاسبه":["انجام عملیات ریاضی برای به دست آوردن نتیجه؛ همچنین سنجش و برآورد مقدار یا هزینه.","Calculation; performing mathematical operations to obtain a result, or estimating an amount or cost.","حساب؛ إجراء عمليات رياضية للوصول إلى نتيجة، أو تقدير مقدار أو تكلفة."],
 "امنیت":["وضعیتی که در آن افراد، دارایی‌ها یا جامعه از خطر، تهدید و آسیب در امان باشند.","Security or safety; a state in which people, property, or a community are protected from danger and threats.","الأمن أو السلامة؛ حالة يكون فيها الأشخاص أو الممتلكات أو المجتمع محميّين من الأخطار والتهديدات."],
 "سرگرم‌کننده":["چیزی که موجب شادی، علاقه یا مشغول شدن ذهن و وقت افراد می‌شود.","Entertaining or enjoyable; something that amuses or engages people's attention.","ممتع أو مسلٍّ؛ شيء يبعث على السرور أو يشغل انتباه الناس."],
 "بی‌محتوا":["فاقد اطلاعات، معنا یا ارزش فکری قابل توجه؛ کم‌مایه و سطحی.","Contentless or lacking substance; having little meaningful information or intellectual value.","خاوٍ من المحتوى أو المضمون؛ يفتقر إلى معلومات ذات معنى أو قيمة فكرية."],
 "سازگار با محیط زیست":["ویژگی چیزی که در تولید یا استفاده، آسیب کمتری به طبیعت و منابع محیطی وارد می‌کند.","Environmentally friendly; causing relatively little harm to nature and environmental resources during production or use.","صديق للبيئة؛ ما يسبّب ضرراً أقل نسبياً للطبيعة والموارد البيئية أثناء إنتاجه أو استعماله."],
 "تمام و کمال":["به طور کامل و بی‌کم‌وکاست؛ بدون آنکه بخشی حذف یا ناقص باشد.","Completely and in full; without anything missing or incomplete.","كاملاً وعلى أتمّ وجه؛ من دون نقص أو حذف لأي جزء."],
 "ضدمیکروب":["دارای خاصیتی که رشد یا فعالیت میکروب‌ها را مهار می‌کند یا آن‌ها را از بین می‌برد.","Antimicrobial; capable of inhibiting the growth or activity of microorganisms or destroying them.","مضاد للميكروبات؛ قادر على تثبيط نمو الكائنات الدقيقة أو نشاطها أو القضاء عليها."],
 "خودشویندگی":["ویژگی سطح یا ماده‌ای که به کمک خاصیت خود، آلودگی را کمتر جذب می‌کند یا آن را آسان‌تر از بین می‌برد.","Self-cleaning; a property of a surface or material that reduces dirt build-up or helps remove it without extensive manual cleaning.","ذاتيّ التنظيف؛ خاصية في سطح أو مادة تقلّل تراكم الأوساخ أو تساعد على إزالتها من دون تنظيف يدوي مكثّف."],
 "بو گرفتن":["بوی ناخوشایند یا مشخصی پیدا کردن؛ معمولاً بر اثر ماندگی، رطوبت یا آلودگی.","To develop or acquire an odour, often an unpleasant one due to staleness, moisture, or contamination.","اكتسبَ رائحة، وغالباً رائحة كريهة بسبب القِدم أو الرطوبة أو التلوّث."],
 "از بین بردن":["چیزی را نابود یا حذف کردن، یا اثر و وجود آن را کاملاً برطرف کردن.","To destroy, eliminate, or remove something completely.","قضى على شيء أو أزاله تماماً ومَحا أثره أو وجوده."],
 "دور انداختن":["چیزی را که دیگر لازم نیست کنار گذاشتن و به عنوان زباله یا چیز بی‌استفاده دفع کردن.","To throw something away or discard it because it is no longer needed.","رمى شيئاً أو تخلّص منه لأنه لم يعد ضرورياً أو نافعاً."],
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH10=Object.keys(rows);
})();
