/* Term 03 additional vocabulary — semantic batch 41. */
(()=> {
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "دیزی‌سرا":["رستورانی سنتی که در آن دیزی و آبگوشت و غذاهای مشابه سرو می‌شود.","A traditional restaurant specialising in dizi, abgoosht, and similar Iranian dishes.","مطعم تقليدي يختصّ بتقديم الديزي والأبغوشت والأطباق الإيرانية المشابهة."],
 "تله‌کابین":["وسیلهٔ حمل‌ونقل کابلی که کابین‌های آویزان را برای جابه‌جایی مسافران میان دو نقطه، معمولاً در مناطق کوهستانی، به حرکت درمی‌آورد.","A cable car or gondola lift; a cable-powered transport system that carries suspended cabins between two points, often in mountainous areas.","تلفريك؛ وسيلة نقل تعمل بالكابلات وتحمل مقصورات معلّقة بين نقطتين، غالباً في المناطق الجبلية."],
 "اسکی‌باز":["فردی که ورزش اسکی را انجام می‌دهد و با اسکی روی برف حرکت می‌کند.","A skier; a person who practises skiing and moves over snow on skis.","متزلّج؛ شخص يمارس رياضة التزلّج ويتحرّك على الثلج باستخدام الزلاجات."],
 "باایمان و با تقوا":["دارای ایمان دینی و پرهیزکاری؛ کسی که در رفتار خود به ارزش‌ها و دستورهای دینی پایبند است.","Faithful and pious; a person with religious faith who follows moral and religious teachings in conduct.","مؤمن وتقيّ؛ شخص يمتلك إيماناً دينياً ويلتزم بالقيم والتعاليم الدينية في سلوكه."],
 "اهل قرآن":["کسی که به خواندن، یادگیری، فهم و عمل به قرآن علاقه‌مند و پایبند است.","A person devoted to the Qur'an; someone committed to reading, learning, understanding, and practising its teachings.","من أهل القرآن؛ شخص يهتمّ بقراءة القرآن وتعلّمه وفهمه والعمل بتعاليمه."],
 "اهل نماز شب":["کسی که به خواندن نماز شب و عبادت در ساعات پایانی شب عادت و اهتمام دارد.","A person devoted to the night prayer; someone who regularly performs Islamic prayers during the late night.","من أهل صلاة الليل؛ شخص يحرص على أداء صلاة الليل والعبادة في الساعات المتأخرة من الليل."],
 "سیاستمدار":["فردی که در سیاست و ادارهٔ امور عمومی فعالیت می‌کند یا در تصمیم‌گیری‌های حکومتی نقش دارد.","A politician or statesperson; someone active in politics or involved in public and governmental decision-making.","سياسي أو رجل دولة؛ شخص ينشط في السياسة أو يشارك في اتخاذ القرارات العامة والحكومية."],
 "معروف بودن":["شناخته‌شده و مشهور بودن در میان مردم یا در یک زمینهٔ مشخص.","To be well-known or famous among people or within a particular field.","كان معروفاً أو مشهوراً بين الناس أو في مجال معيّن."],
 "یتیم شدن":["پدر یا مادر، یا هر دو را از دست دادن؛ در کاربرد رایج، بی‌پدر شدن کودک.","To become orphaned; to lose one's father or mother, or both, commonly referring to a child who loses a parent.","تيتّمَ؛ فقدَ الأب أو الأم أو كليهما، ويُقال غالباً عن الطفل الذي يفقد أحد والديه."],
 "ظلم و ستم":["رفتار ناعادلانه و آسیب‌رسان که در آن حق دیگران پایمال یا از آنان سوءاستفاده می‌شود.","Oppression and injustice; unfair, harmful treatment in which other people's rights are violated or exploited.","الظلم والاضطهاد؛ معاملة جائرة وضارّة تُنتهك فيها حقوق الآخرين أو يُستغلّون."],
 "مزار":["محل دفن یا زیارتگاه شخصی که مردم برای احترام، یادبود یا زیارت به آنجا می‌روند.","A shrine or tomb; a burial place or sacred site visited for respect, remembrance, or pilgrimage.","مزار أو ضريح؛ مكان دفن أو موضع مقدّس يزوره الناس للتكريم أو التذكّر أو الزيارة."],
 "درجات علمی":["مدارک و رتبه‌های تحصیلی که پس از گذراندن دوره‌های آموزشی و پژوهشی، مانند کارشناسی، کارشناسی ارشد و دکتری، دریافت می‌شوند.","Academic degrees; qualifications awarded after completing educational and research programmes, such as bachelor's, master's, and doctoral degrees.","الدرجات العلمية؛ مؤهلات تُمنح بعد إكمال برامج تعليمية وبحثية، مثل البكالوريوس والماجستير والدكتوراه."],
 "سیاهپوش":["کسی که لباس سیاه پوشیده است؛ معمولاً در مراسم سوگواری یا برای نشان دادن اندوه.","Dressed in black or black-clad; often referring to someone wearing black for mourning or to express grief.","لابس السواد؛ شخص يرتدي ملابس سوداء، غالباً في مراسم العزاء أو تعبيراً عن الحزن."],
 "اشک سرازیر شدن":["جاری شدن اشک از چشم‌ها، معمولاً بر اثر اندوه، شادی یا احساس شدید.","For tears to stream or flow; usually because of sadness, joy, or strong emotion.","انهمار الدموع؛ جريان الدموع من العينين بسبب الحزن أو الفرح أو التأثّر الشديد."],
 "مصلی":["محل یا فضای مخصوص برگزاری نماز جماعت یا نماز عید؛ گاهی ساختمانی بزرگ برای گردهمایی‌های عبادی.","A musalla or prayer ground; a place designated for congregational or Eid prayers, sometimes a large prayer complex.","مصلّى؛ مكان مخصّص لإقامة صلاة الجماعة أو صلاة العيد، وقد يكون مجمّعاً كبيراً للعبادة."],
 "خبر ناگوار":["اطلاعی دربارهٔ رویدادی ناخوشایند یا زیان‌بار که شنیدن آن موجب اندوه یا نگرانی می‌شود.","Bad or distressing news; information about an unpleasant or harmful event that causes sadness or worry.","خبر سيّئ أو محزن؛ معلومات عن حدث غير سار أو ضار يسبّب الحزن أو القلق."],
 "یک عالمه":["مقدار بسیار زیاد از چیزی؛ عبارتی محاوره‌ای به معنی خیلی زیاد یا فراوان.","A whole lot or a great many; an informal expression meaning a very large amount or number.","كمية هائلة أو عدد كبير جداً؛ تعبير محادثي يفيد الكثرة."],
 "روزکی":["صورت ادبی یا کم‌کاربرد برای «روزی» یا «یک روز»؛ معنای دقیق آن به بافت متن بستگی دارد.","A rare or literary form related to 'a day' or 'one day'; its precise meaning depends on the text's context.","صيغة أدبية أو قليلة الاستعمال مرتبطة بمعنى «يوم» أو «ذات يوم»؛ ويتحدّد معناها الدقيق بحسب سياق النص."],
 "سرشار":["بسیار پُر از چیزی، مانند شادی، امید، انرژی یا ویژگی مشخص.","Full of or brimming with something, such as joy, hope, energy, or a particular quality.","مفعم أو مليء بشيء، مثل الفرح أو الأمل أو الطاقة أو صفة معيّنة."],
 "مراقب":["کسی که از شخص یا چیزی نگهداری می‌کند و وضعیت آن را زیر نظر دارد؛ همچنین هوشیار و محتاط.","A caretaker or monitor; someone who looks after or watches over a person or thing; also alert and careful.","مراقب أو مشرف؛ شخص يعتني بشخص أو شيء ويراقب حالته، ويعني أيضاً يقظاً وحذراً."],
 "مصرف نمک":["مقدار نمکی که فرد در غذا یا از طریق خوراکی‌ها دریافت می‌کند.","Salt consumption; the amount of salt a person takes in through food and drinks.","استهلاك الملح؛ كمية الملح التي يتناولها الشخص من الطعام والمواد الغذائية."],
 "آداب":["قواعد و رفتارهای پسندیده و پذیرفته‌شده در یک جامعه، فرهنگ یا موقعیت؛ جمع ادب.","Manners or etiquette; accepted rules of polite behaviour in a society, culture, or situation.","الآداب؛ قواعد السلوك الحسن والمقبول في مجتمع أو ثقافة أو موقف معيّن."],
 "فرهنگ":["مجموعهٔ باورها، ارزش‌ها، زبان، هنر، آداب و شیوه‌های زندگی یک جامعه یا گروه.","Culture; the shared beliefs, values, language, arts, customs, and ways of life of a society or group.","الثقافة؛ مجموعة المعتقدات والقيم واللغة والفنون والعادات وأنماط الحياة المشتركة لمجتمع أو جماعة."],
 "والدین":["پدر و مادر یک فرد؛ کسانی که فرزند را به دنیا آورده یا سرپرستی و پرورش او را بر عهده دارند.","Parents; a person's mother and father or those who raise and care for the child.","الوالدان؛ أمّ الشخص وأبوه، أو من يتولّيان رعايته وتربيته."],
 "پیشرفت جامعه":["بهبود و توسعهٔ وضعیت علمی، اقتصادی، فرهنگی، اجتماعی و رفاهی یک جامعه در طول زمان.","Social progress; improvement in a community's scientific, economic, cultural, social, and living conditions over time.","تقدّم المجتمع؛ تحسّن الأوضاع العلمية والاقتصادية والثقافية والاجتماعية والمعيشية للمجتمع بمرور الزمن."],
 "نقدنویسی":["نوشتن متنی تحلیلی و ارزیابانه دربارهٔ یک کتاب، اثر هنری، فیلم یا موضوع برای بررسی نقاط قوت و ضعف آن.","Review writing or criticism; writing an analytical evaluation of a book, artwork, film, or subject to examine its strengths and weaknesses.","كتابة النقد أو المراجعة؛ كتابة تقييم تحليلي لكتاب أو عمل فني أو فيلم أو موضوع لدراسة نقاط القوة والضعف."],
 "سوءاستفاده":["استفادهٔ نادرست یا زیان‌آور از قدرت، موقعیت، اعتماد یا امکانات برای منفعت شخصی یا آسیب به دیگران.","Abuse or misuse; improper or harmful use of power, position, trust, or resources for personal gain or to harm others.","إساءة الاستعمال أو الاستغلال؛ استخدام السلطة أو المكانة أو الثقة أو الموارد بصورة خاطئة أو ضارّة لتحقيق مصلحة شخصية أو إيذاء الآخرين."],
 "مستهجن":["ناپسند و زشت از نظر اخلاقی یا اجتماعی؛ رفتاری که شایستهٔ نکوهش دانسته می‌شود.","Objectionable or reprehensible; morally or socially offensive and deserving disapproval.","مستهجن أو مرفوض؛ سلوك قبيح أخلاقياً أو اجتماعياً ويستحقّ الاستنكار."],
 "شیوه":["روش یا طریقهٔ انجام دادن کاری یا برخورد با یک موضوع.","Method, manner, or approach; the way in which something is done or handled.","أسلوب أو طريقة أو منهج؛ الكيفية التي يُنجز بها عمل أو يُتعامل بها مع موضوع."],
 "اسراف":["زیاده‌روی و مصرف بیش از اندازهٔ مال، غذا، انرژی یا منابع، بدون رعایت اعتدال.","Wastefulness or extravagance; excessive use of money, food, energy, or resources without moderation.","الإسراف؛ الإفراط في استعمال المال أو الطعام أو الطاقة أو الموارد من دون اعتدال."],
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH41=Object.keys(rows);
})();

/* Term 03 additional vocabulary — semantic batch 42. */
(()=> {
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "کود":["ماده‌ای آلی یا شیمیایی که به خاک افزوده می‌شود تا مواد غذایی لازم برای رشد گیاهان را فراهم کند.","Fertiliser or fertilizer; an organic or chemical substance added to soil to provide nutrients for plant growth.","سماد؛ مادة عضوية أو كيميائية تُضاف إلى التربة لتوفير العناصر الغذائية اللازمة لنمو النباتات."],
 "تهدید":["سخن، رفتار یا وضعیتی که نشان می‌دهد احتمال آسیب، خطر یا پیامد نامطلوب وجود دارد.","A threat; a statement, action, or situation indicating the possibility of harm, danger, or an undesirable outcome.","تهديد؛ قول أو فعل أو حالة تشير إلى احتمال وقوع ضرر أو خطر أو نتيجة غير مرغوبة."],
 "تفکیک":["جدا کردن چیزها از یکدیگر یا دسته‌بندی آن‌ها بر اساس ویژگی‌های متفاوت.","Separation or sorting; dividing things apart or grouping them according to different characteristics.","فصل أو فرز؛ فصل الأشياء بعضها عن بعض أو تصنيفها بحسب خصائص مختلفة."],
 "خزندگان":["گروهی از جانوران مهره‌دار مانند مار، مارمولک و لاک‌پشت که معمولاً پوست خشک و پولک‌دار دارند.","Reptiles; a group of vertebrate animals such as snakes, lizards, and turtles, usually with dry, scaly skin.","الزواحف؛ مجموعة من الحيوانات الفقارية مثل الأفاعي والسحالي والسلاحف، ولها عادةً جلد جاف مغطّى بالحراشف."],
 "شکم":["بخش میانی بدن انسان یا جانور که بسیاری از اندام‌های گوارشی در آن قرار دارند.","The abdomen or belly; the middle part of the body containing many digestive organs.","البطن؛ الجزء الأوسط من الجسم الذي توجد فيه كثير من أعضاء الجهاز الهضمي."],
 "سُم":["بخش سخت و شاخیِ انتهای انگشتان پای جانورانی مانند اسب، گاو و گوسفند.","A hoof; the hard, horny covering at the end of the toes of animals such as horses, cattle, and sheep.","حافر؛ الغطاء الصلب القرني في نهاية أصابع حيوانات مثل الخيل والأبقار والأغنام."],
 "شاخ":["زائدهٔ سخت و معمولاً نوک‌تیزی روی سر برخی جانوران مانند گاو، بز و گوزن.","A horn; a hard, usually pointed growth on the head of animals such as cattle, goats, and deer.","قرن؛ نتوء صلب وغالباً مدبّب ينمو على رأس حيوانات مثل الأبقار والماعز والغزلان."],
 "دم":["بخش انتهایی و کشیدهٔ بدن برخی جانوران که پشت بدن قرار دارد و در تعادل یا ارتباط نقش دارد.","A tail; the elongated rear part of an animal's body, often used for balance or communication.","ذيل؛ الجزء الخلفي الممتد من جسم بعض الحيوانات، وله دور في التوازن أو التواصل."],
 "بال":["اندام پرواز در پرندگان و برخی جانوران؛ همچنین بخش جانبی هواپیما که برای ایجاد نیروی برآر به کار می‌رود.","A wing; the flight organ of birds and some animals, or the lateral structure of an aircraft that generates lift.","جناح؛ عضو الطيران لدى الطيور وبعض الحيوانات، ويُطلق أيضاً على الجزء الجانبي من الطائرة الذي يولّد قوة الرفع."],
 "زبر":["دارای سطح ناصاف و خشن که هنگام لمس، صاف و نرم احساس نمی‌شود.","Rough or coarse; having an uneven surface that does not feel smooth or soft.","خشن أو وعر؛ ذو سطح غير أملس لا يبدو ناعماً عند لمسه."],
 "انقراض":["از بین رفتن کامل یک گونهٔ جانوری یا گیاهی به‌گونه‌ای که دیگر هیچ فرد زنده‌ای از آن باقی نماند.","Extinction; the complete disappearance of a plant or animal species, with no living individuals remaining.","الانقراض؛ الاختفاء الكامل لنوع من النباتات أو الحيوانات بحيث لا يبقى منه أي فرد حي."],
 "شکار":["تعقیب و گرفتن یا کشتن جانوران برای غذا یا هدف دیگر؛ همچنین جانوری که شکار می‌شود.","Hunting or prey; the pursuit and capture or killing of animals for food or another purpose, or an animal being hunted.","الصيد أو الطريدة؛ مطاردة الحيوانات وإمساكها أو قتلها للطعام أو لغرض آخر، ويُطلق أيضاً على الحيوان المصاد."],
 "لاک":["پوشش سخت و محافظ بدن برخی جانوران مانند لاک‌پشت؛ همچنین ماده‌ای براق برای پوشاندن سطح.","A shell, especially a turtle's shell; also a glossy coating or varnish used on surfaces.","صدفة، ولا سيّما درع السلحفاة؛ ويعني أيضاً طلاءً لامعاً يُوضع على الأسطح."],
 "خام":["پخته‌نشده یا فرآوری‌نشده؛ دربارهٔ مواد غذایی یعنی هنوز با حرارت آماده نشده است.","Raw or uncooked; not yet prepared by cooking or processing.","نيّئ أو غير مطبوخ؛ لم يُحضّر بعد بالحرارة أو المعالجة."],
 "مشکل‌ساز":["چیزی یا کسی که موجب ایجاد مسئله، دردسر یا اختلال در کارها می‌شود.","Problematic or troublesome; causing difficulties, complications, or disruption.","مثير للمشكلات أو مُسبّب للمتاعب؛ ما يخلق صعوبات أو تعقيدات أو اضطراباً."],
 "گناه":["کار یا رفتاری که از نظر دینی یا اخلاقی نادرست و موجب مسئولیت معنوی دانسته می‌شود.","Sin; an action or behaviour considered religiously or morally wrong and spiritually blameworthy.","ذنب أو معصية؛ فعل أو سلوك يُعدّ خاطئاً دينياً أو أخلاقياً ويترتّب عليه لوم معنوي."],
 "تراشیدن موی سر":["کوتاه کردن بسیار زیاد یا از بین بردن موی سر با تیغ یا ماشین اصلاح.","To shave one's head; to remove or cut the hair on the head very short using a razor or clippers.","حلق شعر الرأس؛ إزالة شعر الرأس أو تقصيره جداً باستعمال الشفرة أو آلة الحلاقة."],
 "بنده":["واژه‌ای برای انسان در مقام بندگی خدا؛ همچنین در گفتار محترمانه به معنی من یا اینجانب.","A servant or worshipper of God; also a humble, polite way of referring to oneself in Persian.","عبد أو عابد لله؛ وتُستعمل بالفارسية أيضاً تعبيراً متواضعاً ومحترماً بمعنى «أنا»."],
 "تحمل":["توانایی شکیبایی در برابر درد، دشواری یا فشار؛ همچنین پذیرفتن و تاب آوردن چیزی.","Endurance or tolerance; the ability to bear pain, difficulty, or pressure, or to put up with something.","تحمّل أو صبر؛ القدرة على احتمال الألم أو الصعوبة أو الضغط أو التعايش مع أمر ما."],
 "هزینه":["مقدار پول یا منابعی که برای خرید، انجام کار یا ارائهٔ خدمات مصرف می‌شود.","Cost or expense; the amount of money or resources spent on a purchase, task, or service.","تكلفة أو نفقة؛ مقدار المال أو الموارد التي تُنفق على شراء أو عمل أو خدمة."],
 "خودرو":["وسیلهٔ نقلیهٔ موتوری که برای جابه‌جایی افراد یا بار روی جاده حرکت می‌کند.","A motor vehicle or car; a powered vehicle designed to transport people or goods on roads.","مركبة آلية أو سيارة؛ وسيلة نقل تعمل بمحرك ومخصّصة لنقل الأشخاص أو البضائع على الطرق."],
 "زیرلیوانی":["صفحه یا وسیله‌ای کوچک که زیر لیوان یا فنجان قرار می‌گیرد تا از سطح میز در برابر لکه و رطوبت محافظت کند.","A coaster; a small mat or dish placed under a glass or cup to protect a table from moisture and stains.","قاعدة الكأس؛ قطعة صغيرة توضع تحت الكأس أو الفنجان لحماية سطح الطاولة من الرطوبة والبقع."],
 "سازگار":["هماهنگ و متناسب با شرایط یا محیط؛ توانایی تطبیق یافتن با وضعیت‌های گوناگون را داشتن.","Compatible or adaptable; suited to conditions or an environment, or able to adjust to different circumstances.","متوافق أو قابل للتكيّف؛ ملائم للظروف أو البيئة وقادر على التأقلم مع أوضاع مختلفة."],
 "خاص":["ویژه و متمایز از موارد معمول یا دیگر؛ دارای ویژگی مشخص و اختصاصی.","Special or particular; distinct from ordinary or other things and having a specific characteristic.","خاص أو مميّز؛ مختلف عن الأمور العادية أو غيرها وله صفة محدّدة."],
 "پاشیدن":["مایع یا ذرات ریز را با حرکت دست یا وسیله روی سطح یا در هوا پراکنده کردن.","To sprinkle or spray; to scatter liquid or small particles over a surface or into the air.","رشّ أو نثر؛ نشر سائل أو جسيمات صغيرة على سطح أو في الهواء بحركة اليد أو أداة."],
 "حنا":["ماده‌ای رنگی که از برگ گیاهی به همین نام تهیه می‌شود و برای رنگ کردن مو، پوست و تزیین دست‌وپا به کار می‌رود.","Henna; a dye made from the leaves of the henna plant, used to colour hair and skin and decorate hands and feet.","الحناء؛ صبغة تُستخرج من أوراق نبات الحناء وتُستعمل لتلوين الشعر والجلد وتزيين اليدين والقدمين."],
 "وعده":["قول یا تعهد به انجام کاری در آینده؛ همچنین نوبت مشخص خوردن غذا، مانند وعدهٔ صبحانه.","A promise or commitment to do something in the future; also a meal occasion, such as breakfast.","وعد أو التزام بإنجاز أمر في المستقبل؛ ويعني أيضاً وجبة طعام محدّدة مثل الإفطار."],
 "داغ":["دارای دمای بالا و گرم؛ همچنین در معنای مجازی تازه، شدید یا دردناک.","Hot or warm; figuratively, fresh, intense, or emotionally painful.","ساخن أو حارّ؛ ويأتي مجازاً بمعنى حديث أو شديد أو مؤلم عاطفياً."],
 "تخریب":["آسیب زدن به چیزی یا ویران کردن ساختار، بنا یا محیط؛ نابودسازی یا خرابکاری.","Destruction or damage; harming or demolishing a structure, building, or environment.","تخريب أو تدمير؛ إلحاق الضرر ببنية أو مبنى أو بيئة أو هدمها."],
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH42=Object.keys(rows);
})();

/* Term 03 trilingual meanings — large batch 43 (100 audited missing headwords). */
(()=>{
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "چرا":["واژهٔ پرسشی برای پرسیدن علت یا دلیل یک کار، رویداد یا وضعیت.","Why; an interrogative word used to ask for the reason or cause of an action, event, or situation.","لماذا؛ أداة استفهام تُستعمل للسؤال عن سبب فعل أو حدث أو حالة."],
 "بله":["واژه‌ای برای پاسخ مثبت و تأیید سخن یا پرسش؛ معادل محترمانهٔ آری.","Yes; a word used to give an affirmative answer or confirm a statement or question.","نعم؛ كلمة تُستعمل للإجابة بالإيجاب أو لتأكيد قول أو سؤال."],
 "کسب":["به دست آوردن یا فراهم کردن چیزی مانند درآمد، دانش، تجربه یا مهارت؛ همچنین درآمد و منفعت حاصل‌شده.","Acquisition or earning; obtaining something such as income, knowledge, experience, or skill, and sometimes the gain itself.","اكتساب أو كسب؛ الحصول على شيء مثل الدخل أو المعرفة أو الخبرة أو المهارة، ويأتي أيضاً بمعنى الربح."],
 "اثر":["نتیجه یا تغییری که چیزی بر شخص یا موضوعی می‌گذارد؛ همچنین نوشته، کتاب یا محصول هنریِ پدیدآمده.","An effect or influence produced by something; also a written, scholarly, or artistic work.","أثر أو تأثير يتركه شيء في شخص أو موضوع؛ ويعني أيضاً مؤلَّفاً أو عملاً فنياً."],
 "دیده":["صورت اسم مفعول از «دیدن»؛ به معنای مشاهده‌شده یا تجربه‌شده، و در ترکیب‌هایی مانند «دیدهٔ بینا» به چشم اشاره دارد.","The past participle of “to see,” meaning seen or observed; in some expressions it refers to the eye or sight.","اسم مفعول من «رأى»، بمعنى ما شوهد أو لوحظ؛ ويُستعمل في بعض التراكيب للدلالة على العين أو البصر."],
 "گوی":["جسمی کروی یا توپ‌مانند؛ در ترکیب‌هایی مانند «گوی زمین» به معنای کره نیز می‌آید.","A ball or sphere; in expressions such as “the globe,” it can refer to a spherical world.","كرة أو جسم كروي؛ ويأتي بمعنى الكرة الأرضية في بعض التراكيب."],
 "ناگاه":["به‌طور ناگهانی و بدون آن‌که انتظارش برود؛ ناگهان.","Suddenly or unexpectedly; without warning or anticipation.","فجأةً أو بغتةً؛ من دون توقّع أو إنذار."],
 "موجود":["چیزی یا کسی که هست و وجود دارد؛ همچنین به معنای در دسترس یا حاضر، مانند کالای موجود.","Existing or present; also available or in stock, as in an available product.","موجود أو حاضر؛ ويأتي أيضاً بمعنى المتوافر أو المتاح، مثل سلعة موجودة."],
 "اسب":["حیوانی پستاندار و نیرومند از خانوادهٔ اسبیان که انسان از آن برای سواری، بارکشی و ورزش استفاده می‌کند.","A horse; a strong mammal of the equine family used for riding, carrying loads, and sport.","الحصان؛ حيوان ثديي قوي من فصيلة الخيليات يُستخدم للركوب وحمل الأثقال والرياضة."],
 "آسوده":["در آرامش و بدون نگرانی، فشار یا دشواری؛ راحت و فارغ از اضطراب.","At ease or comfortable; free from worry, pressure, or difficulty.","مرتاح أو مطمئن؛ خالٍ من القلق أو الضغط أو المشقة."],
 "تور":["پارچه یا شبکه‌ای از نخ یا رشته‌های به‌هم‌بافته با سوراخ‌های منظم؛ برای صید، پوشش یا نگهداری به کار می‌رود.","A net or mesh made of interwoven threads with regular openings, used for fishing, covering, or containment.","شبكة من خيوط متشابكة ذات فتحات منتظمة، تُستعمل للصيد أو التغطية أو الاحتواء."],
 "پژوهش":["بررسی منظم و روشمند یک موضوع برای یافتن پاسخ، تولید دانش یا آزمودن یک فرضیه.","Research; systematic investigation of a subject to find answers, produce knowledge, or test a hypothesis.","بحث أو دراسة منهجية لموضوع بهدف الوصول إلى إجابات أو إنتاج المعرفة أو اختبار فرضية."],
 "بقال":["فروشندهٔ خواربار و مواد غذایی روزمره در مغازه‌ای کوچک؛ در فارسی امروز بیشتر «بقالی» برای مغازه به کار می‌رود.","A grocer; a shopkeeper who sells everyday food and household provisions, usually in a small grocery shop.","بقّال؛ بائع المواد الغذائية والاحتياجات اليومية في متجر صغير."],
 "بزرگوار":["دارای منش والا، بخشندگی و رفتار محترمانه؛ صفتی برای ستایش شخصیت و کرامت فرد.","Noble, generous, or gracious; an adjective praising someone's dignity and considerate character.","كريم أو نبيل أو فاضل؛ صفة تُستعمل لمدح مروءة الشخص وكرم أخلاقه."],
 "بیم":["ترس و نگرانی از احتمال رخ دادن اتفاقی ناخوشایند یا خطرناک.","Fear or apprehension about the possibility of an unpleasant or dangerous event.","خوف أو خشية من احتمال وقوع أمر غير سارّ أو خطير."],
 "فارغ":["خالی یا آزاد از چیزی؛ در ترکیب «فارغ‌التحصیل» به معنای پایان‌دهندهٔ دورهٔ تحصیلی است.","Free from or empty of something; in “graduate,” it refers to someone who has completed a course of study.","خالٍ أو متحرّر من شيء؛ ويُستعمل في كلمة «متخرّج» لمن أتمّ مرحلة دراسية."],
 "گل":["بخش رنگین و معمولاً خوش‌بوی گیاه که در تولیدمثل آن نقش دارد؛ در کاربردهای دیگر به گِلِ رس و گلِ بازی نیز گفته می‌شود.","A flower, the colourful reproductive part of a plant; in other contexts it can mean clay or a goal in sport.","زهرة النبات، وهي الجزء الملوّن الذي يشارك في تكاثره؛ وقد تعني الطين أو هدفاً في الرياضة بحسب السياق."],
 "پارسا":["فردی پرهیزکار و درستکار که از گناه و رفتار ناپسند دوری می‌کند.","A pious or virtuous person who avoids wrongdoing and immoral behaviour.","شخص تقيّ أو ورع يبتعد عن المعاصي والسلوك السيئ."],
 "تأسیس کردن":["بنیان گذاشتن و ایجاد کردن یک سازمان، شرکت، نهاد یا مجموعه برای آغاز فعالیت آن.","To establish or found an organisation, company, institution, or other body.","أسّسَ؛ أنشأ مؤسسة أو شركة أو هيئة وبدأ عملها."],
 "کهنه":["قدیمی و فرسوده بر اثر گذشت زمان یا استفادهٔ زیاد؛ در برابر نو و تازه.","Old, worn, or outdated through age or extensive use; the opposite of new.","قديم أو بالٍ بسبب مرور الزمن أو كثرة الاستعمال؛ وهو ضدّ الجديد."],
 "رنج":["درد، سختی یا اندوه جسمی و روانی که تحمل آن برای فرد دشوار است.","Suffering, pain, or hardship, whether physical or emotional.","معاناة أو ألم أو مشقّة جسدية أو نفسية يصعب على المرء تحمّلها."],
 "کندن":["جدا کردن چیزی از جای خود با کشیدن، بریدن یا حفاری؛ مانند کندن گل، ریشه یا زمین.","To pull, tear, dig, or remove something from where it is fixed, such as a flower, root, or soil.","نزعَ أو اقتلعَ أو حفرَ؛ فصل شيئاً من موضعه، مثل قطف زهرة أو اقتلاع جذر أو حفر الأرض."],
 "کشت":["کاشتن و پرورش گیاهان در زمین؛ همچنین محصول یا گیاهانی که به این روش پرورش یافته‌اند.","Cultivation or farming; growing plants in soil, and sometimes the crops produced.","زراعة؛ غرس النباتات وتنميتها في الأرض، ويُقصد به أحياناً المحصول الناتج."],
 "کاویدن":["با دقت و ژرفا بررسی یا جست‌وجو کردن؛ همچنین در معنای اصلی، زمین را کندن و زیرورو کردن.","To investigate or explore deeply and carefully; literally, to dig or excavate the ground.","بحثَ أو استقصى بعمق ودقّة؛ ويأتي حرفياً بمعنى حفر الأرض ونبشها."],
 "پوران":["نام خاص فارسی، معمولاً نام زن؛ در این مدخل به‌عنوان اسم شخص به کار رفته است.","Pouran; a Persian proper name, commonly used as a woman's given name.","پوران؛ اسم علم فارسي يُستعمل غالباً اسماً للمرأة."],
 "تخم":["دانه یا سلولی که می‌تواند به گیاه یا جاندار تازه‌ای تبدیل شود؛ مانند تخم گیاه یا تخم پرنده.","Seed or egg; a reproductive unit that can develop into a new plant or organism.","بذرة أو بيضة؛ وحدة تكاثر يمكن أن تنمو إلى نبات أو كائن حي جديد."],
 "دادگاه":["مرجع رسمی قضایی که در آن به اختلاف‌ها و اتهام‌ها رسیدگی و بر اساس قانون رأی صادر می‌شود.","A court of law; an official judicial body that hears disputes and charges and issues decisions under the law.","محكمة؛ جهة قضائية رسمية تنظر في النزاعات والاتهامات وتصدر الأحكام وفق القانون."],
 "حمایت":["پشتیبانی و کمک برای حفظ، تقویت یا دفاع از شخص، گروه، حق یا موضوعی.","Support or protection given to preserve, strengthen, or defend a person, group, right, or cause.","دعم أو حماية تُقدَّم لصون شخص أو جماعة أو حق أو قضية وتقويتها أو الدفاع عنها."],
 "موشک":["وسیله‌ای پرنده و پیشران‌دار که با نیروی موتور حرکت می‌کند و می‌تواند برای پژوهش فضایی یا کاربردهای نظامی به کار رود.","A rocket or missile; a powered vehicle propelled by an engine, used in space research or military applications.","صاروخ؛ مركبة ذات محرّك تندفع بقوة الدفع، وتُستخدم في الأبحاث الفضائية أو الأغراض العسكرية."],
 "اطلاعات":["داده‌ها و آگاهی‌هایی دربارهٔ یک موضوع، شخص یا رویداد که برای شناخت یا تصمیم‌گیری به کار می‌روند.","Information; facts or knowledge about a subject, person, or event used for understanding or decision-making.","معلومات؛ بيانات ومعارف عن موضوع أو شخص أو حدث تُستعمل للفهم أو لاتخاذ القرار."],
 "مراقبت":["توجه و رسیدگی پیوسته برای حفظ سلامت، امنیت یا وضعیت مناسب شخص یا چیزی.","Care, attention, or monitoring provided to maintain someone's health, safety, or proper condition.","رعاية أو متابعة مستمرة للحفاظ على صحة شخص أو سلامته أو حالة شيء مناسبة."],
 "دم کردن":["چای یا گیاه خشک را در آب داغ گذاشتن تا رنگ، عطر و مزهٔ آن آزاد شود؛ همچنین پختن آرام غذا با بخار.","To steep tea or dried herbs in hot water so they release colour, aroma, and flavour; also to let food finish cooking by steaming.","نقع الشاي أو الأعشاب المجففة في الماء الساخن لإطلاق اللون والرائحة والنكهة؛ ويعني أيضاً إتمام نضج الطعام بالبخار."],
 "ولایت":["در کاربرد دینی و حقوقی، سرپرستی و اختیار اداره یا هدایت؛ همچنین به معنای ناحیه یا استان در برخی کشورها.","Guardianship or authority in religious and legal contexts; also a province or administrative region in some countries.","ولاية أو سلطة الإشراف والتوجيه في السياقات الدينية والقانونية؛ وتعني أيضاً إقليماً أو محافظة في بعض البلدان."],
 "حلوا زرده":["نوعی شیرینی سنتی ایرانی با رنگ زرد که معمولاً از زردهٔ تخم‌مرغ، شکر و روغن تهیه می‌شود.","Halva-ye zardeh; a traditional Iranian yellow sweet commonly made with egg yolks, sugar, and oil.","حلوى إيرانية تقليدية صفراء تُحضّر عادةً من صفار البيض والسكر والزيت."],
 "ترشی":["خوراکی یا چاشنی‌ای که با سرکه، آب‌نمک یا روش تخمیر طعم ترش پیدا می‌کند؛ مانند خیارترشی.","Pickles or a sour condiment preserved in vinegar, brine, or by fermentation.","مخلّل أو مُقبّل حامض يُحضّر بالخل أو المحلول الملحي أو التخمير."],
 "فوت":["در کاربرد رایج، درگذشتن و پایان یافتن زندگی؛ همچنین به معنای نفس یا واحد اندازه‌گیری طول در برخی متن‌ها.","Death or passing away in common usage; it can also mean a breath or the unit of length “foot,” depending on context.","وفاة أو رحيل في الاستعمال الشائع؛ وقد تعني أيضاً نَفَساً أو وحدة قياس الطول «قدم» بحسب السياق."],
 "مرگ":["پایان زندگی یک موجود زنده و توقف دائمی فعالیت‌های حیاتی بدن.","Death; the permanent end of the life and vital functions of a living organism.","الموت؛ النهاية الدائمة لحياة الكائن الحي وتوقّف وظائفه الحيوية."],
 "دوغ کوچک":["مقدار یا ظرف کوچک دوغ؛ دوغ نوشیدنی سنتی ایرانی از ماست، آب و گاهی نعناع و نمک است.","A small serving or container of doogh, a traditional Iranian yoghurt drink mixed with water and sometimes mint and salt.","كمية أو عبوة صغيرة من الدوغ، وهو شراب إيراني تقليدي من اللبن والماء وأحياناً النعناع والملح."],
 "عوض کردن":["چیزی یا کسی را با چیز یا شخص دیگری جایگزین کردن؛ یا تغییر دادن وضعیت و انتخاب قبلی.","To replace something or someone with another, or to change a previous arrangement or choice.","استبدلَ شيئاً أو شخصاً بآخر، أو غيّر وضعاً أو اختياراً سابقاً."],
 "خدمات هتل":["مجموعهٔ امکانات و کارهایی که هتل برای آسایش مهمانان ارائه می‌کند؛ مانند نظافت، پذیرش و سرویس اتاق.","Hotel services; the facilities and assistance a hotel provides for guests, such as housekeeping, reception, and room service.","خدمات الفندق؛ التسهيلات والمساعدات التي يقدّمها الفندق للنزلاء، مثل التنظيف والاستقبال وخدمة الغرف."],
 "منطقه":["بخشی از یک سرزمین یا محدوده که بر اساس ویژگی جغرافیایی، اداری، طبیعی یا فرهنگی مشخص می‌شود.","A region or area defined by geographical, administrative, natural, or cultural characteristics.","منطقة أو ناحية تُحدَّد بخصائص جغرافية أو إدارية أو طبيعية أو ثقافية."],
 "رشته":["شاخه‌ای از دانش یا تحصیل؛ همچنین تار یا نخ باریک و در برخی کاربردها نوعی خوراک رشته‌ای.","A field or discipline of study; also a thread or strand, and in some contexts a type of noodle.","تخصّص أو فرع دراسي؛ ويعني أيضاً خيطاً أو شريطاً رفيعاً، وقد يدلّ على نوع من المعكرونة."],
 "زیست":["زندگی و شیوهٔ زنده بودن؛ در ترکیب‌هایی مانند «زیست‌بوم» و «زیست‌شناسی» به زندگی و موجودات زنده مربوط است.","Life or living; in compounds such as biology and ecosystem, it relates to living organisms and their existence.","الحياة أو العيش؛ ويَرِد في كلمات مركّبة مثل علم الأحياء والنظام البيئي للدلالة على الكائنات الحية ووجودها."],
 "تقاضا کردن":["با ادب یا به‌صورت رسمی چیزی را خواستن؛ درخواست کردن.","To request or ask for something, often formally or politely.","طلبَ أو التمسَ شيئاً، غالباً بصورة رسمية أو مهذّبة."],
 "مراجعه":["مراجعت یا مراجعه کردن به شخص، اداره یا منبع برای دریافت کمک، اطلاعات یا پیگیری موضوعی.","A visit or referral to a person, office, or source to obtain help, information, or follow up an issue.","مراجعة شخص أو دائرة أو مصدر للحصول على المساعدة أو المعلومات أو متابعة أمر."],
 "گرگ":["جانوری گوشت‌خوار از خانوادهٔ سگ‌سانان که معمولاً به‌صورت گروهی زندگی و شکار می‌کند.","A wolf; a carnivorous member of the dog family that often lives and hunts in packs.","الذئب؛ حيوان لاحم من فصيلة الكلبيات يعيش ويصطاد غالباً في جماعات."],
 "پرخور و شکمو":["کسی که بیش از اندازه غذا می‌خورد یا علاقهٔ زیادی به خوردن دارد؛ عبارتی محاوره‌ای و گاه سرزنش‌آمیز.","A glutton or overeater; someone who eats excessively or is very fond of food, often a colloquial and mildly critical expression.","شره أو نَهِم؛ شخص يأكل بإفراط أو يحب الطعام كثيراً، وهو تعبير عامي قد يحمل معنى اللوم."],
 "ماهانه":["در هر ماه یا مربوط به یک ماه؛ مانند پرداخت ماهانه یا گزارش ماهانه.","Monthly; occurring every month or relating to a month, such as a monthly payment or report.","شهريّ؛ يحدث كل شهر أو يتعلّق بشهر، مثل دفعة شهرية أو تقرير شهري."],
 "دامدار":["فردی که به پرورش و نگهداری دام‌هایی مانند گاو، گوسفند و بز برای تولید محصولات دامی می‌پردازد.","A livestock farmer or herder who raises and cares for animals such as cattle, sheep, and goats.","مربّي ماشية؛ شخص يربّي حيوانات مثل الأبقار والأغنام والماعز ويعتني بها لإنتاج المنتجات الحيوانية."],
 "جابه‌جا کردن":["چیزی یا کسی را از مکانی به مکان دیگر منتقل کردن؛ یا ترتیب و جای دو چیز را تغییر دادن.","To move or transfer something or someone from one place to another; also to rearrange or swap positions.","نقلَ شيئاً أو شخصاً من مكان إلى آخر؛ ويعني أيضاً تبديل موضع شيئين أو ترتيبِهما."],
 "منطقهٔ گرم":["ناحیه‌ای با آب‌وهوای گرم یا دمای بالا در بیشتر یا بخشی از سال.","A warm or hot region; an area with high temperatures for much or part of the year.","منطقة حارّة؛ ناحية ترتفع فيها درجات الحرارة خلال معظم السنة أو جزء منها."],
 "منطقهٔ سرد":["ناحیه‌ای با آب‌وهوای سرد و معمولاً دمای پایین در بیشتر یا بخشی از سال.","A cold region; an area with low temperatures for much or part of the year.","منطقة باردة؛ ناحية تنخفض فيها درجات الحرارة خلال معظم السنة أو جزء منها."],
 "آتش":["پدیده‌ای همراه با شعله و گرما که از سوختن مواد پدید می‌آید و می‌تواند برای پخت‌وپز و گرمایش یا به‌صورت خطرناک به کار رود.","Fire; heat and flames produced by combustion, used for cooking and warmth but also capable of causing harm.","النار؛ ظاهرة من اللهب والحرارة تنتج عن الاحتراق، وتُستخدم للطبخ والتدفئة وقد تكون خطرة."],
 "متعهد":["پایبند به انجام وظیفه، قول یا مسئولیتی که پذیرفته است؛ مسئولیت‌پذیر و وفادار به تعهد.","Committed or responsible; bound to fulfil a duty, promise, or responsibility one has accepted.","ملتزم أو مسؤول؛ يحرص على أداء واجب أو وعد أو مسؤولية قبل بها."],
 "راه‌اندازی":["آغاز به کار کردن یا فعال کردن یک دستگاه، سامانه، کسب‌وکار یا مجموعه.","Launching or setting up; starting or activating a device, system, business, or organisation.","تشغيل أو إطلاق؛ بدء عمل جهاز أو نظام أو مشروع أو مؤسسة أو تفعيلها."],
 "شگفت‌انگیز":["بسیار عجیب، زیبا یا تأثیرگذار به‌گونه‌ای که موجب تعجب و تحسین شود.","Amazing or astonishing; so unusual, beautiful, or impressive that it causes surprise and admiration.","مذهل أو مدهش؛ يثير الدهشة والإعجاب لغرابته أو جماله أو تأثيره."],
 "یادداشت":["نوشته‌ای کوتاه برای ثبت نکته، یادآوری، اطلاعات یا نظر؛ همچنین نوشته‌ای توضیحی در کنار متن.","A note or memo; a short piece of writing used to record information, a reminder, or an opinion.","ملاحظة أو مذكرة؛ كتابة قصيرة لتسجيل معلومة أو تذكير أو رأي."],
 "صداقت":["راستگویی و درستکاری در گفتار و رفتار؛ هماهنگی سخن با واقعیت و پرهیز از فریب.","Honesty or sincerity; truthfulness and integrity in speech and conduct, without deception.","الصدق أو الإخلاص؛ قول الحقيقة والاستقامة في الكلام والسلوك والابتعاد عن الخداع."],
 "گذشتگان":["افرادی که در زمان‌های پیشین زندگی می‌کرده‌اند و اکنون درگذشته‌اند یا متعلق به نسل‌های پیشین‌اند.","People of earlier times or previous generations, especially those who are no longer alive.","السابقون أو الأجيال الماضية؛ أشخاص عاشوا في أزمنة سابقة، ولا سيّما من رحلوا."],
 "جوامع":["جمع واژهٔ «جامعه»؛ گروه‌ها و مجموعه‌های انسانی که در یک ساختار اجتماعی با یکدیگر زندگی و تعامل می‌کنند.","Plural of society; human communities whose members live and interact within a social structure.","جمع «مجتمع»؛ جماعات بشرية يعيش أفرادها ويتفاعلون ضمن بنية اجتماعية."],
 "نهاد":["سازمان یا مؤسسه‌ای رسمی یا اجتماعی؛ همچنین در زبان‌شناسی، بخشی از جمله که دربارهٔ آن خبری داده می‌شود.","An institution or organisation; in linguistics, also the subject of a sentence.","مؤسسة أو هيئة رسمية أو اجتماعية؛ ويعني في علم اللغة أيضاً المبتدأ أو المسند إليه في الجملة."],
 "متمم":["بخش یا واژه‌ای که معنای جمله یا عبارت را کامل می‌کند؛ در دستور زبان، مکملِ فعل یا بخش دیگری از جمله.","A complement; a word or phrase that completes the meaning of a sentence or another expression.","مُتمِّم؛ كلمة أو عبارة تُكمل معنى الجملة أو تعبير آخر."],
 "متناسب":["هماهنگ و سازگار با اندازه، شرایط، نیاز یا هدفی مشخص؛ مناسب و به‌اندازه.","Proportionate or appropriate; matching a particular size, condition, need, or purpose.","متناسب أو ملائم؛ منسجم مع حجم أو ظروف أو حاجة أو هدف معيّن."],
 "کیفیت":["ویژگی‌ها و درجهٔ خوب یا بد بودن یک چیز، خدمت یا فرایند؛ چگونگی و سطح آن.","Quality; the characteristics and degree of excellence of a thing, service, or process.","الجودة؛ خصائص الشيء أو الخدمة أو العملية ومستوى إتقانها."],
 "مراجعه کردن":["برای دریافت راهنمایی، درمان، اطلاعات یا پیگیری موضوعی به شخص، اداره یا منبعی مراجعه کردن.","To visit or consult a person, office, or source for advice, treatment, information, or follow-up.","راجعَ شخصاً أو دائرة أو مصدراً لطلب الإرشاد أو العلاج أو المعلومات أو المتابعة."],
 "فاکتور":["صورت‌حساب یا سندی که کالاها یا خدمات، تعداد و قیمت آن‌ها و مبلغ پرداختی را نشان می‌دهد.","An invoice or bill listing goods or services, quantities, prices, and the amount due.","فاتورة أو مستند يبيّن السلع أو الخدمات وكمياتها وأسعارها والمبلغ المستحق."],
 "ربا":["در اصطلاح فقه اسلامی، دریافت یا پرداخت زیادهٔ نامشروع در برخی مبادلات یا قرض‌ها؛ حکم و مصادیق آن تابع احکام فقهی است.","Riba; in Islamic jurisprudence, an unlawful increase in certain loans or exchanges, as defined by religious legal rulings.","الرِّبا؛ في الفقه الإسلامي زيادة محرّمة في بعض القروض أو المعاملات، وتُحدَّد أحكامه ومصاديقه وفق الضوابط الشرعية."],
 "ممتد":["کشیده‌شده یا ادامه‌یافته در طول، زمان یا محدوده‌ای مشخص؛ دارای امتداد.","Extended or prolonged; continuing over a particular length, period, or area.","ممتد أو متواصل؛ له امتداد في طول أو زمن أو نطاق محدّد."],
 "سبقت":["پیشی گرفتن از دیگری در حرکت، مسابقه یا انجام کاری؛ در ترکیب «سبقت گرفتن» به کار می‌رود.","Overtaking or getting ahead of someone in movement, a race, or an activity; commonly used in the phrase “to overtake.”","تجاوز أو تقدّم على الآخرين في الحركة أو السباق أو أداء عمل؛ ويَرِد غالباً في تركيب «أخذ السبق»."],
 "زیر پا گذاشتن قانون":["قانون یا مقررات را رعایت نکردن و برخلاف آن عمل کردن.","To break or violate the law; to act contrary to legal rules or requirements.","انتهكَ القانون؛ خالف القوانين أو اللوائح ولم يلتزم بها."],
 "مرخصی گرفتن":["برای مدتی مشخص با اجازه از محل کار یا تحصیل غایب شدن و از مرخصی استفاده کردن.","To take leave or time off; to be absent from work or study for an approved period.","أخذ إجازة؛ التغيّب عن العمل أو الدراسة مدة محددة بإذن."],
 "بهبود":["بهتر شدن وضعیت، کیفیت یا سلامت چیزی یا کسی نسبت به گذشته.","Improvement or recovery; a better condition, quality, or state of health than before.","تحسّن أو تعافٍ؛ انتقال حالة أو جودة أو صحة شخص أو شيء إلى وضع أفضل."],
 "درشت":["بزرگ‌تر از اندازهٔ معمول یا دارای دانه‌ها و اجزای بزرگ؛ همچنین در مورد خط، نوشتهٔ بزرگ.","Large or coarse in size or texture; also used for large or bold print.","كبير أو خشن الحبيبات؛ ويُستعمل أيضاً للخط أو الطباعة الكبيرة."],
 "جرم":["عملی که قانون آن را ممنوع کرده و برای آن مجازات تعیین شده است؛ همچنین ماده و تودهٔ یک جسم در علوم.","A crime or offence punishable by law; in science, also the mass of an object or a substance.","جريمة يعاقب عليها القانون؛ ويعني في العلوم أيضاً كتلة جسم أو مادة."],
 "ممنوع":["اجازه‌نداده‌شده و غیرمجاز بر اساس قانون، مقررات یا دستور؛ قدغن.","Forbidden or prohibited; not allowed under a law, regulation, or instruction.","ممنوع أو محظور؛ غير مسموح به وفق قانون أو لائحة أو تعليمات."],
 "شرط‌بندی":["پول یا دارایی را بر سر نتیجهٔ نامطمئن یک مسابقه یا رویداد گذاشتن؛ قمار کردن.","Betting or wagering; staking money or property on the uncertain outcome of a contest or event.","مراهنة؛ وضع المال أو الممتلكات على نتيجة غير مؤكدة لمسابقة أو حدث."],
 "آلات":["جمع «آلت»؛ ابزارها و وسایلی که برای انجام کار، ساختن یا اندازه‌گیری به کار می‌روند.","Plural of instrument or tool; devices and equipment used to perform work, make things, or measure.","جمع آلة؛ أدوات وأجهزة تُستخدم لأداء الأعمال أو التصنيع أو القياس."],
 "قوانین جمهوری اسلامی":["مجموعهٔ قوانین و مقررات مصوب و لازم‌الاجرا در نظام حقوقی جمهوری اسلامی ایران.","The laws and regulations enacted and in force within the legal system of the Islamic Republic of Iran.","مجموعة القوانين واللوائح الصادرة والنافذة في النظام القانوني للجمهورية الإسلامية الإيرانية."],
 "تنوع":["گوناگونی و وجود انواع یا شکل‌های متفاوت در میان افراد، پدیده‌ها یا چیزها.","Diversity or variety; the presence of different types or forms among people, phenomena, or things.","التنوّع؛ وجود أنواع أو أشكال مختلفة بين الأشخاص أو الظواهر أو الأشياء."],
 "لباس‌های مجلسی":["لباس‌هایی رسمی یا شیک که برای مهمانی‌ها، مراسم و مناسبت‌های ویژه پوشیده می‌شوند.","Formal or dress clothes worn to parties, ceremonies, and special occasions.","ملابس سهرة أو ملابس رسمية أنيقة تُرتدى في الحفلات والمناسبات الخاصة."],
 "آشامیدن":["نوشیدن مایعات؛ خوردن آب یا نوشیدنی از راه دهان.","To drink; to take a liquid into the mouth and swallow it.","شربَ؛ تناول سائلاً عن طريق الفم وابتلاعه."],
 "جا گذاشتن مدارک":["مدارک را ناخواسته در مکانی باقی گذاشتن و هنگام ترک آن مکان با خود نبردن.","To leave documents behind accidentally when departing from a place.","تركَ الوثائق خلفه من غير قصد عند مغادرة مكان ما."],
 "احترام":["ارزش و حرمت قائل شدن برای شخص، حق یا عقیده‌ای و رفتار مؤدبانه با آن.","Respect; recognising the worth or dignity of a person, right, or belief and treating it courteously.","احترام؛ تقدير قيمة شخص أو حق أو اعتقاد والتعامل معه بأدب."],
 "مسئولیت":["وظیفه و تعهدی که فرد باید انجام دهد و در برابر نتیجهٔ آن پاسخ‌گو باشد.","Responsibility; a duty or obligation that someone must fulfil and be accountable for.","مسؤولية؛ واجب أو التزام ينبغي للشخص أداؤه وتحمل تبعاته."],
 "رفتار":["شیوهٔ عمل، واکنش و برخورد یک فرد یا گروه در موقعیت‌های گوناگون.","Behaviour or conduct; the way a person or group acts and responds in different situations.","سلوك أو تصرّف؛ الطريقة التي يعمل بها شخص أو جماعة ويستجيبون في المواقف المختلفة."],
 "اخلاق":["مجموعهٔ ویژگی‌ها و اصول رفتاری که خوب و بدِ کردار انسان را مشخص می‌کند؛ همچنین منش و خصلت فرد.","Ethics or morals; principles that distinguish right from wrong, and a person's character or disposition.","الأخلاق؛ مجموعة المبادئ السلوكية التي تميّز الصواب من الخطأ، وتُطلق أيضاً على طباع الشخص."],
 "تصویر":["بازنمایی دیداری یک شخص، شیء یا صحنه، مانند عکس، نقاشی یا شکل؛ همچنین تصور ذهنی.","An image or picture representing a person, object, or scene; also a mental impression.","صورة أو تمثيل بصري لشخص أو شيء أو مشهد، كالصورة الفوتوغرافية أو الرسم؛ وتعني أيضاً تصوّراً ذهنياً."],
 "زاویه":["مقدار بازشدگی میان دو خط یا نیم‌خط که از یک نقطه آغاز می‌شوند؛ همچنین دیدگاه یا جهت نگاه.","An angle formed by two lines or rays meeting at a point; also a viewpoint or perspective.","زاوية تتكوّن من التقاء خطّين أو شعاعين عند نقطة؛ وتعني أيضاً وجهة نظر أو منظوراً."],
 "مسئله":["موضوع یا پرسشی که نیازمند بررسی، حل یا تصمیم‌گیری است؛ همچنین مشکل یا دشواری.","An issue, question, or problem that requires examination, a solution, or a decision.","مسألة أو قضية أو مشكلة تحتاج إلى دراسة أو حل أو اتخاذ قرار."],
 "علت":["دلیل یا عاملی که باعث پدید آمدن یک رویداد، وضعیت یا نتیجه می‌شود.","Cause or reason; a factor that brings about an event, condition, or result.","سبب أو علّة؛ عامل يؤدي إلى وقوع حدث أو نشوء حالة أو نتيجة."],
 "پیامد":["نتیجه یا اثر یک کار، تصمیم یا رویداد که پس از آن پدید می‌آید.","Consequence or outcome; a result or effect that follows an action, decision, or event.","عاقبة أو نتيجة؛ أثر يترتّب على فعل أو قرار أو حدث."],
 "پیشنهاد":["نظر یا راهکاری که برای انجام کاری یا حل مسئله‌ای مطرح می‌شود.","A suggestion or proposal; an idea or course of action put forward to do something or solve a problem.","اقتراح؛ رأي أو طريقة عمل تُطرح لتنفيذ أمر أو حل مشكلة."],
 "محیط":["فضا و شرایط پیرامون انسان یا چیز؛ در علوم، مجموعهٔ عوامل طبیعی و اجتماعی اطراف یک موجود یا پدیده.","Environment or surroundings; the space and conditions around a person or thing, including natural and social factors.","البيئة أو المحيط؛ المكان والظروف المحيطة بشخص أو شيء، بما فيها العوامل الطبيعية والاجتماعية."],
 "حفاظت":["نگهداری و مراقبت از شخص، شیء یا محیط برای جلوگیری از آسیب، نابودی یا خطر.","Protection or preservation; taking care of a person, object, or environment to prevent harm, damage, or destruction.","حماية أو صون؛ رعاية شخص أو شيء أو بيئة لمنع الضرر أو التلف أو الهلاك."],
 "منابع":["جمع «منبع»؛ سرچشمه‌ها یا امکاناتی مانند آب، انرژی، اطلاعات، پول و نیروی انسانی که برای کاری در دسترس‌اند.","Plural of source or resource; supplies such as water, energy, information, money, or human resources available for use.","جمع مصدر أو مورد؛ موارد متاحة مثل الماء والطاقة والمعلومات والمال والموارد البشرية."],
 "زباله":["مواد دورریختنی و بی‌استفاده‌ای که پس از مصرف یا تولید باقی می‌مانند و باید جمع‌آوری یا مدیریت شوند.","Waste or rubbish; discarded materials left after use or production that need to be collected or managed.","نفايات أو قمامة؛ مواد متروكة بعد الاستعمال أو الإنتاج ينبغي جمعها أو إدارتها."],
 "فناوری":["دانش و روش‌های علمی و عملی به‌کاررفته برای ساخت ابزارها، سامانه‌ها و راه‌حل‌های کاربردی.","Technology; the practical application of scientific knowledge and methods to create tools, systems, and solutions.","التكنولوجيا؛ تطبيق المعرفة والأساليب العلمية والعملية لصنع الأدوات والأنظمة والحلول."],
 "تحقیق":["بررسی و جست‌وجوی روشمند برای یافتن حقیقت یا اطلاعات؛ همچنین پژوهش و مطالعهٔ دقیق یک موضوع.","Investigation or research; a systematic search for facts or information and a careful study of a subject.","تحقيق أو بحث؛ تقصٍّ منهجي للوصول إلى الحقائق أو المعلومات ودراسة موضوع بدقّة."],
 "هدف":["نتیجه یا مقصودی که فرد یا گروه برای رسیدن به آن برنامه‌ریزی و تلاش می‌کند.","A goal or objective; the result or purpose that a person or group plans and works to achieve.","هدف أو غاية؛ النتيجة أو المقصد الذي يخطّط شخص أو جماعة للوصول إليه ويسعون لتحقيقه."],
 "پیشرفت":["حرکت به سوی وضعیت بهتر یا مرحله‌ای بالاتر در دانش، مهارت، کار یا زندگی.","Progress or advancement; movement toward a better condition or a higher level of knowledge, skill, work, or life.","تقدّم أو تطوّر؛ انتقال نحو حالة أفضل أو مستوى أعلى في المعرفة أو المهارة أو العمل أو الحياة."],
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH43=Object.keys(rows);
})();

/* Term 03 trilingual meanings — completion batch 44 (114 remaining audited headwords). */
(()=>{
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "ارتباط":["پیوند و رابطه‌ای که میان اشخاص، گروه‌ها، چیزها یا اندیشه‌ها برقرار می‌شود؛ همچنین فرایند انتقال پیام و اطلاعات.","Connection or communication; a relationship between people, groups, things, or ideas, and the process of exchanging messages or information.","ارتباط أو صلة؛ علاقة تقوم بين أشخاص أو جماعات أو أشياء أو أفكار، وكذلك عملية تبادل الرسائل والمعلومات."],
 "آرامش":["وضعیت آسوده و بی‌تنش که در آن نگرانی، آشفتگی یا درگیری وجود ندارد.","Peace, calm, or tranquillity; a state without anxiety, disturbance, or conflict.","السكينة أو الهدوء؛ حالة تخلو من القلق والاضطراب والنزاع."],
 "احساس":["حالتی درونی مانند شادی، غم، ترس یا محبت؛ همچنین توانایی دریافت محرک‌ها از راه حواس.","Feeling or emotion, such as joy, sadness, fear, or affection; also the ability to perceive stimuli through the senses.","شعور أو إحساس داخلي مثل الفرح أو الحزن أو الخوف أو المحبة؛ ويعني أيضاً القدرة على إدراك المؤثرات بالحواس."],
 "قانون":["قاعده‌ای رسمی و الزام‌آور که مرجع قانونی تصویب می‌کند و رفتار افراد و نهادها را تنظیم می‌کند.","A law; a formal, binding rule enacted by a lawful authority to regulate the conduct of people and institutions.","قانون؛ قاعدة رسمية ملزمة تضعها سلطة مختصة لتنظيم سلوك الأفراد والمؤسسات."],
 "انرژی":["توانایی انجام کار یا ایجاد تغییر؛ در علوم شکل‌های گوناگونی مانند گرمایی، الکتریکی و شیمیایی دارد.","Energy; the capacity to do work or cause change, occurring in forms such as heat, electricity, and chemical energy.","الطاقة؛ القدرة على إنجاز عمل أو إحداث تغيير، ولها أشكال مثل الطاقة الحرارية والكهربائية والكيميائية."],
 "مصرف":["استفاده از کالا، ماده یا منبع برای برآوردن نیاز؛ همچنین مقدار چیزی که استفاده می‌شود.","Consumption or use of a product, substance, or resource to meet a need; also the amount used.","استهلاك أو استعمال سلعة أو مادة أو مورد لتلبية حاجة؛ ويعني أيضاً مقدار ما يُستهلك."],
 "تغییر":["دگرگون شدن یا دگرگون کردن حالت، شکل، مقدار یا ویژگی چیزی نسبت به گذشته.","Change; the process of becoming or making something different in state, form, amount, or quality.","تغيير؛ تحوّل حالة شيء أو شكله أو مقداره أو صفته عمّا كان عليه."],
 "نوآوری":["ایجاد یا به‌کارگیری ایده، روش یا محصولی تازه که ارزش یا فایده‌ای جدید پدید می‌آورد.","Innovation; creating or applying a new idea, method, or product that provides new value or benefit.","ابتكار؛ إنشاء فكرة أو طريقة أو منتج جديد أو تطبيقه بما يقدّم قيمة أو فائدة جديدة."],
 "سفر":["حرکت از محل زندگی یا مبدأ به مکانی دیگر، معمولاً برای مدتی محدود و با هدفی مشخص.","A journey or trip from one's home or starting point to another place, usually for a limited time and a purpose.","سفر؛ الانتقال من مكان الإقامة أو نقطة الانطلاق إلى مكان آخر، غالباً لمدة محدودة ولغاية معينة."],
 "شعر":["گونه‌ای از ادبیات که با آهنگ، تصویر، خیال و زبان فشرده احساس و اندیشه را بیان می‌کند.","Poetry; a literary form that expresses feelings and ideas through rhythm, imagery, imagination, and condensed language.","الشعر؛ فن أدبي يعبّر عن المشاعر والأفكار بالإيقاع والصور والخيال واللغة المكثّفة."],
 "نقد":["بررسی سنجیدهٔ ویژگی‌ها، قوت‌ها و ضعف‌های یک اثر یا اندیشه؛ همچنین پول رایج و غیرنسیه در کاربرد دیگر.","Criticism or review: a reasoned examination of the strengths and weaknesses of a work or idea; in another sense, cash.","نقد أو تقويم؛ دراسة متأنية لمزايا عمل أو فكرة ونقاط ضعفها؛ ويعني أيضاً المال النقدي في استعمال آخر."],
 "زندگی":["وضعیت زنده بودن و مجموعهٔ تجربه‌ها، فعالیت‌ها و روابط یک موجود در مدت حیاتش.","Life; the state of being alive and the experiences, activities, and relationships of a living being.","الحياة؛ حالة الكائن الحي ومجموع تجاربه وأنشطته وعلاقاته طوال مدة عيشه."],
 "استفاده":["به‌کار بردن چیزی برای رسیدن به هدف یا برآوردن نیاز؛ بهره‌گیری.","Use or utilisation; employing something to achieve a purpose or meet a need.","استعمال أو استفادة؛ توظيف شيء لتحقيق غاية أو تلبية حاجة."],
 "توضیح":["شرح دادن یک موضوع برای روشن و قابل‌فهم کردن آن؛ همچنین شرح یا بیانِ ارائه‌شده.","Explanation; making a subject clear and understandable, or the account given to explain it.","توضيح أو شرح؛ بيان موضوع لجعله واضحاً ومفهوماً، وكذلك الشرح المقدَّم."],
 "بررسی":["نگاه و مطالعهٔ دقیق یک موضوع، مسئله یا وضعیت برای شناخت، ارزیابی یا تصمیم‌گیری.","Examination or review; careful study of a subject, issue, or situation for understanding, evaluation, or decision-making.","فحص أو مراجعة؛ دراسة دقيقة لموضوع أو مسألة أو حالة بهدف الفهم أو التقييم أو اتخاذ القرار."],
 "معرفی":["شناساندن شخص، چیز یا موضوع به دیگران و ارائهٔ اطلاعات اصلی دربارهٔ آن.","Introduction or presentation; making a person, thing, or subject known and providing basic information about it.","تعريف أو تقديم؛ إطلاع الآخرين على شخص أو شيء أو موضوع وتقديم المعلومات الأساسية عنه."],
 "نتیجه":["آنچه در پایان یک کار، فرایند یا استدلال به دست می‌آید؛ حاصل یا پیامد.","Result or outcome; what is obtained at the end of an activity, process, or line of reasoning.","نتيجة أو حصيلة؛ ما يتم التوصل إليه في نهاية عمل أو عملية أو استدلال."],
 "نمونه":["فرد یا چیزی که برای نشان دادن ویژگی یک گروه یا روشن کردن یک مفهوم انتخاب می‌شود؛ مثال.","An example or sample; a person or thing selected to illustrate a group or clarify a concept.","مثال أو عيّنة؛ شخص أو شيء يُختار لتوضيح خصائص مجموعة أو شرح مفهوم."],
 "اهمیت":["ارزش، اثر یا جایگاه قابل‌توجه یک موضوع که باعث می‌شود به آن توجه ویژه شود.","Importance or significance; the value, impact, or standing that makes something worthy of particular attention.","أهمية أو شأن؛ قيمة أمر أو تأثيره أو مكانته التي تجعله جديراً باهتمام خاص."],
 "حفظ":["نگهداری و صیانت از چیزی برای جلوگیری از نابودی یا آسیب؛ همچنین به خاطر سپردن مطلب.","Preservation or protection; keeping something safe from loss or damage, and also memorising information.","حفظ أو صيانة؛ إبقاء شيء مصوناً من الضياع أو الضرر، ويعني أيضاً استظهار المعلومات."],
 "آیه":["بخشی از متن قرآن کریم که با نشانه‌ای از بخش‌های دیگر جدا می‌شود؛ همچنین نشانه و دلیل روشن.","A verse of the Holy Qur'an, separated from other verses by a marker; also a sign or clear indication.","آية من القرآن الكريم تتميّز بعلامة عن غيرها؛ وتعني أيضاً علامة أو دليلاً واضحاً."],
 "معنا":["مفهوم یا مقصودی که یک واژه، جمله، نشانه یا رفتار به آن اشاره می‌کند.","Meaning; the concept or intention conveyed by a word, sentence, sign, or action.","معنى؛ المفهوم أو المقصود الذي تدلّ عليه كلمة أو جملة أو إشارة أو فعل."],
 "توصیف":["بیان ویژگی‌ها و جزئیات شخص، مکان، رویداد یا چیزی با واژه‌ها؛ شرح دادن چگونگی آن.","Description; expressing the features and details of a person, place, event, or thing in words.","وصف؛ بيان خصائص وتفاصيل شخص أو مكان أو حدث أو شيء بالكلمات."],
 "سوره":["یکی از بخش‌های مستقل قرآن کریم که از چند آیه تشکیل شده و نام و شمارهٔ مشخص دارد.","A surah; one of the chapters of the Holy Qur'an, consisting of verses and having its own name and number.","سورة؛ فصل من فصول القرآن الكريم يتكوّن من آيات وله اسم ورقم محدّدان."],
 "جامعه":["گروهی از انسان‌ها که در یک چارچوب اجتماعی زندگی می‌کنند و روابط، نهادها و قواعد مشترکی دارند.","Society; a community of people living within a social structure and sharing relationships, institutions, and norms.","مجتمع؛ جماعة من الناس تعيش ضمن إطار اجتماعي وتشترك في العلاقات والمؤسسات والقواعد."],
 "آموزش":["فرایند یاد دادن و یاد گرفتن دانش، مهارت یا نگرش از راه درس، تمرین و تجربه.","Education or instruction; the process of teaching and learning knowledge, skills, or attitudes through lessons, practice, and experience.","تعليم أو تدريب؛ عملية تعليم المعارف والمهارات والاتجاهات وتعلّمها بالدروس والممارسة والخبرة."],
 "بیان":["به زبان آوردن یا روشن کردن اندیشه و احساس؛ همچنین شیوهٔ گفتار یا نوشتار.","Expression or statement; communicating an idea or feeling clearly, and the manner of speaking or writing.","بيان أو تعبير؛ إظهار فكرة أو شعور بوضوح، وكذلك أسلوب الكلام أو الكتابة."],
 "خدمت":["کاری که برای کمک به دیگران یا برآوردن نیازی انجام می‌شود؛ همچنین ارائهٔ خدمات در یک شغل یا نهاد.","Service; work done to help others or meet a need, including services provided by a profession or organisation.","خدمة؛ عمل يُقدَّم لمساعدة الآخرين أو تلبية حاجة، ويشمل الخدمات التي توفرها مهنة أو مؤسسة."],
 "شناخت":["آگاهی و فهمی که از راه مشاهده، تجربه، مطالعه یا اندیشیدن دربارهٔ چیزی به دست می‌آید.","Knowledge or understanding gained through observation, experience, study, or thought.","معرفة أو إدراك يُكتسب بالملاحظة أو الخبرة أو الدراسة أو التفكير."],
 "قرآن":["کتاب مقدس مسلمانان که به باور آنان کلام خداوند و وحی نازل‌شده بر پیامبر اسلام، حضرت محمد(ص)، است.","The Qur'an; the holy scripture of Muslims, believed to be God's word revealed to Prophet Muhammad.","القرآن؛ الكتاب المقدّس للمسلمين، ويؤمنون بأنه كلام الله الذي أُنزل على النبي محمد صلى الله عليه وآله."],
 "تفاوت":["ویژگی یا فاصله‌ای که یک شخص یا چیز را از شخص یا چیز دیگر متمایز می‌کند.","Difference; a feature or distinction that makes one person or thing unlike another.","اختلاف أو تفاوت؛ صفة تميّز شخصاً أو شيئاً عن غيره."],
 "مقایسه":["سنجیدن دو یا چند چیز در کنار هم برای شناخت شباهت‌ها و تفاوت‌های آن‌ها.","Comparison; examining two or more things together to identify their similarities and differences.","مقارنة؛ دراسة شيئين أو أكثر معاً لمعرفة أوجه الشبه والاختلاف بينها."],
 "مقدمه":["بخش آغازین نوشته، سخنرانی یا کتاب که موضوع، زمینه و هدف آن را معرفی می‌کند.","Introduction; the opening section of a text, speech, or book that presents its subject, context, and purpose.","مقدمة؛ الجزء الافتتاحي من نص أو خطاب أو كتاب يعرّف بموضوعه وسياقه وهدفه."],
 "تلاش":["کوشش و به‌کارگیری نیرو و زمان برای رسیدن به هدف یا انجام کاری دشوار.","Effort or endeavour; using energy and time to reach a goal or complete a difficult task.","جهد أو سعي؛ بذل الطاقة والوقت للوصول إلى هدف أو إنجاز عمل صعب."],
 "کاهش":["کم شدن مقدار، اندازه، شدت یا تعداد چیزی؛ یا فرایند کم کردن آن.","Reduction or decrease; a fall in the amount, size, intensity, or number of something.","انخفاض أو تقليل؛ نقص مقدار شيء أو حجمه أو شدّته أو عدده."],
 "ارزش":["اهمیت، فایده یا بهایی که برای شخص، چیز، رفتار یا اندیشه‌ای در نظر گرفته می‌شود.","Value or worth; the importance, usefulness, or price attributed to a person, thing, action, or idea.","قيمة؛ الأهمية أو الفائدة أو الثمن الذي يُنسب إلى شخص أو شيء أو سلوك أو فكرة."],
 "مراسم":["مجموعه‌ای از کارها و آیین‌های برنامه‌ریزی‌شده که به مناسبت ویژه‌ای برگزار می‌شود.","Ceremony or observance; a set of planned acts and rituals held for a special occasion.","مراسم أو احتفال؛ مجموعة أعمال وطقوس منظّمة تُقام بمناسبة خاصة."],
 "مسیر":["راه یا خطی که برای رفتن از مبدأ به مقصد یا برای پیشرفت یک فرایند دنبال می‌شود.","Route or path; the way followed from a starting point to a destination or through a process.","مسار أو طريق؛ السبيل المتّبع للانتقال من نقطة بداية إلى مقصد أو للتقدّم في عملية."],
 "پیوند":["رابطه یا اتصالی که دو یا چند شخص، چیز یا بخش را به هم وصل می‌کند.","Link or bond; a connection joining two or more people, things, or parts.","رابط أو صلة؛ اتصال يجمع شخصين أو شيئين أو أكثر."],
 "طبیعت":["جهان طبیعی شامل گیاهان، جانوران، زمین، آب، هوا و پدیده‌هایی که ساختهٔ انسان نیستند.","Nature; the natural world of plants, animals, land, water, air, and phenomena not made by humans.","الطبيعة؛ العالم الطبيعي بما فيه النباتات والحيوانات والأرض والماء والهواء والظواهر غير المصنوعة بشرياً."],
 "پرسش":["جمله یا سخنی که برای دریافت پاسخ، اطلاعات یا روشن شدن موضوعی مطرح می‌شود؛ سؤال.","Question or inquiry; a statement made to obtain an answer or information or clarify a subject.","سؤال أو استفسار؛ قول يُطرح للحصول على إجابة أو معلومات أو لتوضيح موضوع."],
 "ترتیب":["نظم و چیدمان چیزها یا کارها بر اساس قاعده، زمان، اهمیت یا توالی مشخص.","Order or arrangement; organising things or actions according to a rule, time, importance, or sequence.","ترتيب أو تنظيم؛ وضع الأشياء أو الأعمال وفق قاعدة أو زمن أو أهمية أو تسلسل محدّد."],
 "یادگیری":["فرایند به دست آوردن دانش، مهارت یا نگرش تازه از راه آموزش، تمرین، مشاهده و تجربه.","Learning; the process of acquiring new knowledge, skills, or attitudes through teaching, practice, observation, and experience.","تعلّم؛ عملية اكتساب معارف أو مهارات أو اتجاهات جديدة بالتعليم والممارسة والملاحظة والخبرة."],
 "موفقیت":["رسیدن به هدف یا نتیجهٔ مطلوب پس از کوشش؛ کامیابی در کار یا زندگی.","Success; achieving a desired goal or outcome through effort, in work or life.","نجاح؛ بلوغ هدف أو نتيجة مرغوبة بعد بذل الجهد في العمل أو الحياة."],
 "پیام":["محتوا یا خبری که از راه گفتار، نوشتار، تصویر یا ابزار ارتباطی به دیگری منتقل می‌شود.","Message; information or content conveyed to another person through speech, writing, images, or communication tools.","رسالة؛ محتوى أو خبر يُنقل إلى شخص آخر بالكلام أو الكتابة أو الصور أو وسائل الاتصال."],
 "اصلاح":["درست کردن یا بهتر کردن چیزی که نقص، خطا یا کاستی دارد؛ همچنین بهبود رفتار یا وضعیت.","Correction or reform; fixing or improving something with a defect or error, or improving behaviour or a situation.","إصلاح؛ تصحيح شيء فيه خلل أو خطأ أو نقص، أو تحسين سلوك أو وضع."],
 "علم":["دانش منظم دربارهٔ جهان و پدیده‌ها که با مشاهده، استدلال و روش‌های پژوهشی به دست می‌آید؛ همچنین آگاهی.","Science or knowledge; systematic understanding of the world and its phenomena gained through observation, reasoning, and research.","علم أو معرفة؛ فهم منظّم للعالم وظواهره يُكتسب بالملاحظة والاستدلال والبحث."],
 "نیاز":["چیزی که برای زندگی، انجام کار یا رسیدن به هدف ضروری یا لازم است؛ احتیاج.","Need or necessity; something required for life, an activity, or achieving a goal.","حاجة أو ضرورة؛ أمر يلزم للحياة أو لإنجاز عمل أو بلوغ هدف."],
 "پاسخ":["گفتار یا نوشته‌ای که در برابر پرسش، درخواست یا مسئله ارائه می‌شود؛ جواب.","Answer or response; something said or written in reply to a question, request, or issue.","جواب أو استجابة؛ قول أو كتابة تُقدَّم رداً على سؤال أو طلب أو مسألة."],
 "روشن":["دارای نور کافی و قابل دیدن؛ همچنین واضح و بی‌ابهام در گفتار یا اندیشه.","Bright or illuminated; also clear and unambiguous in speech or thought.","مضيء أو منير؛ ويعني أيضاً واضحاً وغير ملتبس في الكلام أو التفكير."],
 "دقیق":["درست و با جزئیات کافی، بدون خطای قابل‌توجه؛ همچنین با توجه و دقت زیاد انجام‌شده.","Accurate or precise; correct and sufficiently detailed, with little or no significant error.","دقيق أو مضبوط؛ صحيح ومفصّل بما يكفي وخالٍ من الخطأ الملحوظ."],
 "ارزشمند":["دارای ارزش، فایده یا اهمیت زیاد؛ شایستهٔ نگهداری یا توجه.","Valuable or worthwhile; having considerable value, usefulness, or importance.","قيّم أو جدير بالاهتمام؛ ذو قيمة أو فائدة أو أهمية كبيرة."],
 "مسئولانه":["به شیوه‌ای که با تعهد، دقت و توجه به پیامدهای رفتار همراه باشد.","Responsibly; in a way that shows commitment, care, and awareness of the consequences of one's actions.","بمسؤولية؛ بطريقة تُظهر الالتزام والعناية والانتباه إلى عواقب السلوك."],
 "فرهنگی":["مربوط به فرهنگ، آداب، هنر، زبان، باورها و شیوهٔ زندگی یک جامعه.","Cultural; relating to the culture, customs, arts, language, beliefs, and way of life of a society.","ثقافي؛ متعلق بثقافة المجتمع وعاداته وفنونه ولغته ومعتقداته وأسلوب حياته."],
 "بچه‌دار شدن":["صاحب فرزند شدن؛ به دنیا آمدن یا پذیرفتن فرزندی در خانواده.","To have a child or become a parent; to welcome or adopt a child into a family.","أن يُرزق بطفل أو يصبح والدًا؛ أن يأتي طفل إلى الأسرة أو يُضمّ إليها بالتبنّي."],
 "تغییر شغل دادن":["شغل فعلی را ترک کردن و حرفه یا موقعیت کاری دیگری را انتخاب کردن.","To change jobs or careers; to leave one's current work and take another occupation or position.","غيّر عمله أو مهنته؛ ترك وظيفته الحالية واختار مهنة أو منصباً آخر."],
 "دعوا کردن":["با کسی به‌صورت لفظی یا فیزیکی درگیر شدن؛ مشاجره یا نزاع کردن.","To quarrel or fight with someone, verbally or physically.","تشاجرَ أو تقاتلَ مع شخص، بالكلام أو بالفعل."],
 "به کناری انداختن":["چیزی را به یک طرف گذاشتن یا کنار زدن؛ در معنای مجازی، نادیده گرفتن یا کنار گذاشتن موضوعی.","To put or throw something aside; figuratively, to set an issue aside or disregard it.","ألقى شيئاً جانباً أو نحّاه؛ ومجازاً ترك أمراً جانباً أو تجاهله."],
 "رفت‌وآمد کردن":["به‌طور مکرر میان دو مکان رفتن و برگشتن؛ یا با شخصی دیدار و معاشرت داشتن.","To travel back and forth regularly between places; also to visit or socialise with someone.","تردّد بين مكانين ذهاباً وإياباً بصورة متكررة؛ ويعني أيضاً زيارة شخص أو معاشرته."],
 "دور زدن":["در اطراف چیزی چرخیدن یا مسیر را به‌صورت حلقه‌ای طی کردن؛ همچنین از راه غیرمستقیم عبور کردن یا قانون را نادیده گرفتن.","To go around or circle something; also to bypass a route, procedure, or rule.","دارَ حول شيء أو التفّ عليه؛ ويعني أيضاً تجاوز طريق أو إجراء أو قاعدة بطريقة ملتوية."],
 "تمام کردن بنزین":["سوخت خودرو را به‌طور کامل مصرف کردن، به‌گونه‌ای که بنزین باک تمام شود.","To run out of petrol or use up all the fuel in a vehicle's tank.","نفدَ البنزين؛ استهلك وقود السيارة حتى فرغ خزانها تماماً."],
 "آلوده کردن":["چیزی مانند آب، هوا، خاک یا سطحی را با مواد زیان‌آور یا ناپاک کثیف و ناسالم کردن.","To pollute or contaminate something, such as water, air, soil, or a surface, with harmful or dirty substances.","لوّثَ شيئاً كالماء أو الهواء أو التربة أو سطحاً بمواد ضارة أو قذرة."],
 "آتش روشن کردن":["با استفاده از سوخت و منبع جرقه یا گرما، شعله و آتش ایجاد کردن.","To light or start a fire by using fuel and a source of heat or sparks.","أشعلَ ناراً باستعمال الوقود ومصدر للحرارة أو الشرر."],
 "نجات پیدا کردن":["از خطر، آسیب یا وضعیت دشوار رهایی یافتن و به امنیت رسیدن.","To be rescued or escape; to get out of danger, harm, or a difficult situation and reach safety.","نجا أو تخلّص من الخطر؛ خرج من حالة خطرة أو صعبة ووصل إلى الأمان."],
 "از بین رفتن":["نابود شدن، محو شدن یا دیگر وجود نداشتن؛ همچنین از دست رفتن یک فرصت یا امکان.","To disappear, perish, or be destroyed; also, for an opportunity or possibility to be lost.","زَالَ أو هَلَكَ أو فَنِيَ؛ ويعني أيضاً ضياع فرصة أو إمكانية."],
 "به نمایش گذاشتن":["چیزی را برای دیدن دیگران عرضه کردن؛ نشان دادن یا ارائه کردن.","To display or exhibit something for others to see; to present or show.","عرضَ شيئاً ليراه الآخرون؛ أظهره أو قدّمه."],
 "سلام کردن":["با واژه یا رفتاری دوستانه ورود، دیدار یا آغاز ارتباط با کسی را اعلام کردن.","To greet or say hello to someone as a friendly way of beginning an interaction.","سلّمَ على شخص؛ حيّاه بكلمة أو تصرّف ودّي عند اللقاء أو بدء التواصل."],
 "خداحافظی کردن":["هنگام جدا شدن از کسی، با گفتار یا رفتار مناسب پایان دیدار را اعلام کردن.","To say goodbye or take leave of someone when parting.","ودّعَ شخصاً؛ أنهى اللقاء معه بكلام أو تصرّف مناسب عند الافتراق."],
 "طی کردن":["مسافت یا مرحله‌ای را پیمودن و از آن گذشتن؛ همچنین دوره یا فرایندی را پشت سر گذاشتن.","To cover or travel a distance; also to go through or complete a stage, period, or process.","قطعَ مسافة أو اجتاز مرحلة؛ ويعني أيضاً المرور بفترة أو إتمام عملية."],
 "خمیازه کشیدن":["با باز شدن غیرارادی دهان و دم عمیق، معمولاً بر اثر خستگی یا خواب‌آلودگی، خمیازه انجام دادن.","To yawn; to open the mouth involuntarily and take a deep breath, often because of tiredness or sleepiness.","تثاءبَ؛ فتح فمه بصورة لا إرادية وأخذ نفس عميق غالباً بسبب التعب أو النعاس."],
 "دستگیر کردن":["شخصی را به‌دست مأموران قانون بازداشت کردن؛ در کاربرد دیگر، به کسی کمک کردن یا یاری رساندن.","To arrest someone by taking them into legal custody; in another expression, to help or assist someone.","قبضَ على شخص واعتقله قانونياً؛ ويأتي في تعبير آخر بمعنى أعان شخصاً وساعده."],
 "متحد شدن":["چند شخص، گروه یا کشور برای هدفی مشترک با یکدیگر یکی و هم‌پیمان شدن.","To unite or join together; for people, groups, or countries to form an alliance for a common purpose.","اتّحدَ؛ اجتمع أشخاص أو جماعات أو دول في تحالف لتحقيق غاية مشتركة."],
 "سپری شدن":["از زمان یا دوره‌ای گذشتن و به پایان رسیدن؛ مانند سپری شدن روزها یا سال‌ها.","To pass or elapse; for a period of time to go by and come to an end.","مضى أو انقضى؛ مرور فترة زمنية وانتهاؤها، مثل الأيام أو السنوات."],
 "به شهادت رسیدن":["در راه عقیده یا هدفی مقدس کشته شدن؛ در کاربرد اسلامی به مقام شهادت نائل شدن.","To be martyred; to be killed for a faith, belief, or sacred cause.","استُشهدَ؛ قُتل في سبيل عقيدة أو إيمان أو قضية مقدّسة."],
 "تبعید کردن":["شخصی را به اجبار از محل زندگی یا کشور خود دور و به مکان دیگری فرستادن.","To exile or deport someone; to force a person away from their home or country to another place.","نفى أو أبعدَ شخصاً؛ أجبره على مغادرة موطنه أو بلده إلى مكان آخر."],
 "بدوبیراه گفتن":["با واژه‌های توهین‌آمیز و زشت به کسی ناسزا گفتن.","To insult or swear at someone using offensive or abusive language.","شتمَ أو سبّ شخصاً باستعمال ألفاظ مهينة وبذيئة."],
 "اشتباه گرفتن":["دو شخص یا چیز را به‌دلیل شباهت یا بی‌دقتی با یکدیگر عوضی دانستن.","To mistake one person or thing for another because of similarity or lack of attention.","خلطَ بين شخصين أو شيئين بسبب التشابه أو قلّة الانتباه."],
 "به زمین افتادن":["از حالت ایستاده یا نشسته تعادل خود را از دست دادن و روی زمین قرار گرفتن.","To fall to the ground after losing one's balance from a standing or seated position.","سقطَ على الأرض بعد أن فقد توازنه من وضع الوقوف أو الجلوس."],
 "پافشاری کردن":["با وجود مخالفت یا دشواری بر خواسته، نظر یا تصمیم خود اصرار ورزیدن.","To insist or persist; to continue firmly holding to an opinion, request, or decision despite opposition or difficulty.","أصرّ أو ثابر؛ تمسّك برأيه أو طلبه أو قراره رغم المعارضة أو الصعوبة."],
 "مانع شدن":["جلوی انجام کاری یا رخ دادن اتفاقی را گرفتن؛ سد راه شدن.","To prevent or obstruct something; to stop an action or event from happening.","منعَ أو أعاقَ؛ حال دون وقوع أمر أو تنفيذ عمل."],
 "مشخص کردن":["هویت، مقدار، ویژگی یا حدود چیزی را روشن و معین کردن.","To specify or identify; to make the identity, amount, feature, or limits of something clear.","حدّدَ أو عيّنَ؛ أوضح هوية شيء أو مقداره أو صفته أو حدوده."],
 "مراقبت کردن":["با توجه و رسیدگی منظم از شخص یا چیزی نگهداری کردن و وضعیت آن را زیر نظر داشتن.","To care for or look after someone or something, providing regular attention and monitoring.","اعتنى بشخص أو شيء؛ قدّم له الرعاية المنتظمة وتابع حالته."],
 "به وجود آوردن":["چیزی را ایجاد کردن یا باعث پدید آمدن وضعیت، رویداد یا نتیجه‌ای شدن.","To create or bring about something; to cause a condition, event, or result to arise.","أنشأَ أو أحدثَ شيئاً؛ تسبّب في ظهور حالة أو حدث أو نتيجة."],
 "وصیت کردن":["در زمان زندگی، خواسته‌ها و دستورهای خود را برای اجرا پس از مرگ به‌صورت وصیت بیان کردن.","To make a will; to state one's wishes and instructions during life for them to be carried out after death.","أوصى؛ بيّن وصاياه وتعليماته في حياته لتنفيذها بعد وفاته."],
 "بیرون کردن":["کسی یا چیزی را از داخل یک مکان خارج کردن؛ اخراج کردن.","To take or drive someone or something out of a place; to expel or remove.","أخرجَ شخصاً أو شيئاً من مكان؛ طرده أو أزاله."],
 "پاره‌پوره شدن":["به چندین تکهٔ نامنظم و کوچک‌تر تقسیم شدن؛ از هم دریدن و بسیار پاره شدن.","To be torn or shredded into many irregular, smaller pieces.","تمزّقَ إلى قطع صغيرة وغير منتظمة؛ تفتّت أو تشقّق بشدة."],
 "شاگردی کردن":["زیر نظر استاد یا فرد باتجربه کار و مهارتی را به‌صورت عملی آموختن.","To apprentice or work as a trainee under a teacher or experienced person to learn a practical skill.","تدرّبَ أو عمل متعلّماً تحت إشراف معلّم أو شخص خبير لاكتساب مهارة عملية."],
 "مشغول به کار شدن":["کار یا شغلی را آغاز کردن و به فعالیت حرفه‌ای یا کاری پرداختن.","To start working or become employed; to begin a job or professional activity.","بدأ العمل أو توظّف؛ شرع في وظيفة أو نشاط مهني."],
 "تجدیدنظر کردن":["دربارهٔ نظر، تصمیم یا حکم قبلی دوباره فکر و بررسی کردن و در صورت لزوم آن را تغییر دادن.","To reconsider or review; to examine a previous opinion, decision, or ruling again and change it if necessary.","أعاد النظر أو راجع؛ فحص رأياً أو قراراً أو حكماً سابقاً من جديد وغيّره عند الحاجة."],
 "ارتباط دادن":["میان دو یا چند موضوع، شخص یا رویداد رابطه برقرار کردن یا آن‌ها را به هم مربوط دانستن.","To connect or relate two or more subjects, people, or events to one another.","ربطَ أو وصلَ موضوعين أو شخصين أو حدثين أو أكثر بعضهم ببعض."],
 "جستجو کردن":["برای یافتن شخص، چیز یا اطلاعاتی به‌صورت هدفمند گشتن و بررسی کردن.","To search or look for someone, something, or information in a purposeful way.","بحثَ أو فتّشَ عن شخص أو شيء أو معلومات بصورة مقصودة."],
 "نفوذ کردن":["به درون مکان یا گروهی وارد شدن؛ یا بر اندیشه، رفتار و تصمیم دیگران اثر گذاشتن.","To penetrate or infiltrate a place or group; also to exert influence on others' thoughts, behaviour, or decisions.","تسلّلَ أو اخترقَ مكاناً أو جماعة؛ ويعني أيضاً التأثير في أفكار الآخرين وسلوكهم وقراراتهم."],
 "خیس شدن":["بر اثر تماس با آب یا مایع دیگر، رطوبت گرفتن و خشک نبودن.","To get wet; to become soaked or damp through contact with water or another liquid.","ابتلّ؛ صار رطباً أو مبلّلاً بسبب ملامسة الماء أو سائل آخر."],
 "معرفی کردن":["شخص یا چیزی را به دیگران شناساندن و نام، ویژگی یا کارکرد آن را بیان کردن.","To introduce or present someone or something by stating its name, features, or function.","عرّفَ أو قدّمَ شخصاً أو شيئاً للآخرين بذكر اسمه أو صفاته أو وظيفته."],
 "رهبری کردن":["گروهی از افراد یا یک سازمان را هدایت کردن و برای رسیدن به هدف، تصمیم‌گیری و هماهنگی انجام دادن.","To lead or direct a group or organisation by guiding, making decisions, and coordinating efforts toward a goal.","قادَ أو ترأّسَ جماعة أو مؤسسة بتوجيهها واتخاذ القرارات وتنسيق الجهود نحو هدف."],
 "نظم دادن":["چیزها یا فعالیت‌ها را بر اساس قاعده و برنامه مرتب و هماهنگ کردن.","To organise or arrange things or activities according to a system or plan.","نظّمَ أو رتّبَ الأشياء أو الأنشطة وفق نظام أو خطة."],
 "عوض کردن چرخ":["چرخ خودرو یا وسیله را باز کردن و با چرخ دیگری جایگزین کردن.","To change a wheel or tyre by removing it and fitting another one.","غيّر عجلة المركبة أو إطارها بنزعها وتركيب أخرى مكانها."],
 "زندانی شدن":["به حکم مرجع قانونی یا در نتیجهٔ بازداشت، از آزادی محروم و در زندان نگهداری شدن.","To be imprisoned or jailed; to be deprived of freedom and held in prison under legal authority.","سُجنَ؛ حُرم من الحرية وأُودع السجن بأمر قانوني أو نتيجة الاعتقال."],
 "نو شدن":["تازه شدن یا به حالت جدید درآمدن؛ جایگزین شدن چیز کهنه با چیز تازه.","To become new or renewed; to take on a fresh state or be replaced by something new.","تجدّدَ أو صار جديداً؛ اكتسب حالة حديثة أو استُبدل بشيء جديد."],
 "تحت تأثیر قرار دادن":["بر احساس، اندیشه، رفتار یا تصمیم شخص یا گروهی اثر گذاشتن.","To influence or affect someone's feelings, thoughts, behaviour, or decisions.","أثّرَ في مشاعر شخص أو أفكاره أو سلوكه أو قراراته."],
 "زمان‌بندی کردن":["برای انجام فعالیت‌ها زمان مشخص تعیین کردن و ترتیب زمانی آن‌ها را برنامه‌ریزی کردن.","To schedule or time activities by assigning specific times and planning their sequence.","جدولَ الأنشطة زمنياً؛ حدّد أوقاتاً لها وخطّط لتسلسلها."],
 "محدود کردن":["دامنه، مقدار، زمان یا آزادی چیزی را کاهش دادن و برای آن حد تعیین کردن.","To limit or restrict something by reducing its scope, amount, duration, or freedom.","قيّدَ أو حدّدَ شيئاً بتقليل نطاقه أو مقداره أو مدته أو حريته."],
 "کنار گذاشتن":["چیزی را از جریان کار خارج کردن یا به آن نپرداختن؛ همچنین ترک کردن یک عادت یا تصمیم.","To set aside, put away, or abandon something, such as a task, habit, or decision.","تركَ أو نحّى جانباً شيئاً، مثل مهمة أو عادة أو قرار."],
 "بگومگو کردن":["با کسی دربارهٔ موضوعی به‌صورت لفظی و معمولاً همراه با اختلاف و تندی بحث کردن.","To argue or quarrel verbally with someone, usually with disagreement or irritation.","تجادلَ أو تشاجرَ بالكلام مع شخص، غالباً مع خلاف أو حدّة."],
 "اجازه گرفتن":["پیش از انجام کاری از شخص یا مرجع مسئول رضایت یا مجوز خواستن.","To ask for permission or obtain approval from the responsible person or authority before doing something.","استأذنَ أو طلبَ الإذن من الشخص أو الجهة المسؤولة قبل القيام بعمل."],
 "چرخ کردن":["چیزی را با چرخ یا دستگاه آسیاب به قطعات ریز تبدیل کردن؛ مانند چرخ کردن گوشت.","To grind or mince something with a grinder or machine, such as mincing meat.","فرمَ أو طحنَ شيئاً باستعمال آلة الطحن، مثل فرم اللحم."],
 "آبکش کردن":["مواد غذایی پخته‌شده را در آبکش ریختن تا آب اضافی آن جدا شود.","To drain food by pouring it into a colander so that excess water runs off.","صفّى الطعام بوضعه في مصفاة للتخلّص من الماء الزائد."],
 "کباب کردن":["گوشت، سبزی یا خوراکی دیگری را با حرارت مستقیم یا روی آتش پختن.","To grill or roast meat, vegetables, or other food over direct heat or fire.","شوى اللحم أو الخضار أو غيرهما باستعمال الحرارة المباشرة أو النار."],
 "آب‌پز کردن":["مواد غذایی را در آب جوشاندن تا با حرارت آب پخته شوند.","To boil food by cooking it in hot or boiling water.","سلقَ الطعام؛ طبخه في الماء الساخن أو المغلي."],
 "نظافت کردن":["یک مکان یا وسیله را با برداشتن گردوغبار، آلودگی و زباله تمیز کردن.","To clean or tidy a place or object by removing dust, dirt, and rubbish.","نظّفَ مكاناً أو شيئاً بإزالة الغبار والأوساخ والنفايات."],
 "حمل کردن":["شخص یا چیزی را از جایی به جای دیگر بردن؛ جابه‌جا کردن یا انتقال دادن.","To carry or transport a person or thing from one place to another.","حملَ أو نقلَ شخصاً أو شيئاً من مكان إلى آخر."],
 "پس گرفتن":["چیزی را که قبلاً داده یا واگذار شده دوباره دریافت کردن؛ بازپس‌گیری کردن.","To take back or reclaim something that was previously given, handed over, or lost.","استردّ أو استعادَ شيئاً سبق أن أعطاه أو سلّمه أو فقده."],
 "صادر کردن":["کالا را برای فروش یا انتقال به کشور یا منطقه‌ای دیگر فرستادن؛ همچنین فرمان، حکم یا سندی رسمی انتشار دادن.","To export goods to another country or region; also to issue an official order, ruling, or document.","صدّرَ سلعة إلى بلد أو منطقة أخرى؛ ويعني أيضاً أصدر أمراً أو حكماً أو وثيقة رسمية."],
 "پاره شدن":["بر اثر کشش، فشار یا برخورد، از هم گسیختن و به دو یا چند بخش تبدیل شدن.","To tear or split apart into two or more pieces because of pulling, pressure, or impact.","تمزّقَ أو انشقّ إلى جزأين أو أكثر بسبب الشدّ أو الضغط أو الاصطدام."],
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={...(S[fa]||{}),faMeaning:v[0],enMeaning:v[1],arMeaning:v[2],faSynonyms:(S[fa]||{}).faSynonyms||[],enSynonyms:(S[fa]||{}).enSynonyms||[],arSynonyms:(S[fa]||{}).arSynonyms||[]};
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH44=Object.keys(rows);
})();

/* Term 03 trilingual meanings — completion batch 45 (13 remaining audited headwords).
   Meanings are checked against the Term 03 source-linked vocabulary records. */
(()=>{
 const S=window.PERSIAN_SEMANTICS||(window.PERSIAN_SEMANTICS={});
 const rows={
 "فرارسیدن":{
  faMeaning:"زمان، فصل یا رویدادی از راه رسیدن و آغاز شدن؛ معمولاً برای زمان‌ها و مناسبت‌ها به‌کار می‌رود.",
  enMeaning:"For a time, season, or event to arrive or come around; commonly used for occasions and periods.",
  arMeaning:"حانَ وقتٌ أو موسمٌ أو حدثٌ وبدأ؛ ويُستعمل غالباً للأوقات والمناسبات.",
  faSynonyms:["از راه رسیدن","فرا رسیدن","آمدن"],
  enSynonyms:["arrive","come around","approach"],
  arSynonyms:["حان","أتى","حلّ"]
 },
 "گوشتخوار":{
  faMeaning:"جانوری که غذای اصلی آن گوشتِ جانوران دیگر است.",
  enMeaning:"A carnivorous animal that mainly feeds on the flesh of other animals.",
  arMeaning:"حيوانٌ لاحمٌ يتغذّى أساساً على لحوم الحيوانات الأخرى.",
  faSynonyms:["گوشت‌خوار","شکارچی"],
  enSynonyms:["carnivore","meat-eater","predator"],
  arSynonyms:["آكل اللحوم","لاحم","مفترس"]
 },
 "صاحبخانه":{
  faMeaning:"مالک خانه یا ملکی که آن را در اختیار دارد؛ در رابطهٔ اجاره، معمولاً کسی که خانه را به مستأجر اجاره می‌دهد.",
  enMeaning:"The owner of a house or property; in a rental arrangement, usually the person who lets the property to a tenant.",
  arMeaning:"مالك المنزل أو العقار؛ وفي علاقة الإيجار هو غالباً الشخص الذي يؤجّر العقار للمستأجر.",
  faSynonyms:["مالک خانه","موجر"],
  enSynonyms:["landlord","homeowner","property owner"],
  arSynonyms:["مالك المنزل","صاحب العقار","المؤجّر"]
 },
 "همراه بانک":{
  faMeaning:"خدمت یا برنامهٔ بانکی روی تلفن همراه که امکان انجام کارهایی مانند انتقال وجه، پرداخت قبض و مشاهدهٔ موجودی را فراهم می‌کند.",
  enMeaning:"A mobile banking service or app that lets users perform tasks such as transferring money, paying bills, and checking balances.",
  arMeaning:"خدمة أو تطبيق مصرفي على الهاتف المحمول يتيح تحويل الأموال ودفع الفواتير والاطّلاع على الرصيد.",
  faSynonyms:["بانکداری همراه","اپلیکیشن بانکی"],
  enSynonyms:["mobile banking","mobile banking app"],
  arSynonyms:["الخدمات المصرفية عبر الهاتف","تطبيق مصرفي"]
 },
 "فراموشکاری":{
  faMeaning:"ویژگی یا حالتِ زود یا مکرر فراموش کردن؛ ناتوانی یا بی‌دقتی در به یاد آوردن چیزها.",
  enMeaning:"Forgetfulness; a tendency or recurring difficulty to remember things.",
  arMeaning:"النسيان؛ ميلٌ إلى نسيان الأشياء أو صعوبة متكرّرة في تذكّرها.",
  faSynonyms:["فراموشی","از یاد بردن"],
  enSynonyms:["forgetfulness","absent-mindedness","poor memory"],
  arSynonyms:["النسيان","شرود الذهن","ضعف الذاكرة"]
 },
 "به هیچ وجه":{
  faMeaning:"در هیچ حالت یا شرایطی؛ عبارتی برای تأکید بر نفی کامل یا مخالفت قاطع.",
  enMeaning:"By no means or under no circumstances; an expression used for strong or absolute negation.",
  arMeaning:"مطلقاً أو بأيّ حالٍ من الأحوال؛ تعبيرٌ يُستعمل لتوكيد النفي التام أو الرفض القاطع.",
  faSynonyms:["اصلاً","ابداً","به هیچ صورت"],
  enSynonyms:["by no means","not at all","under no circumstances"],
  arSynonyms:["مطلقاً","على الإطلاق","بأيّ حال"]
 },
 "خونسرد":{
  faMeaning:"کسی که در موقعیت دشوار یا هیجان‌انگیز آرامش و کنترل خود را حفظ می‌کند؛ همچنین به معنای بی‌هیجان یا کم‌واکنش.",
  enMeaning:"Calm and composed, especially in a difficult or exciting situation; sometimes emotionally detached or unflustered.",
  arMeaning:"هادئٌ ومتّزن، ولا سيّما في المواقف الصعبة أو المثيرة؛ وقد يدلّ أيضاً على قلّة الانفعال.",
  faSynonyms:["آرام","خویشتن‌دار","متین"],
  enSynonyms:["calm","composed","unflustered"],
  arSynonyms:["هادئ","متّزن","رباطة الجأش"]
 },
 "پناه‌گاه":{
  faMeaning:"مکانی امن که انسان یا جانور برای دور ماندن از خطر، آسیب یا شرایط نامساعد به آن پناه می‌برد.",
  enMeaning:"A safe place where a person or animal can find protection from danger, harm, or harsh conditions.",
  arMeaning:"مكانٌ آمنٌ يلجأ إليه الإنسان أو الحيوان طلباً للحماية من الخطر أو الأذى أو الظروف القاسية.",
  faSynonyms:["مأمن","جای امن","سرپناه"],
  enSynonyms:["refuge","shelter","sanctuary"],
  arSynonyms:["ملجأ","مأوى","محمية"]
 },
 "سنگتراش":{
  faMeaning:"کسی که سنگ را با ابزار می‌بُرد، شکل می‌دهد یا برای ساخت‌وساز و کارهای هنری آماده می‌کند.",
  enMeaning:"A person who cuts, shapes, or carves stone for construction or artistic work.",
  arMeaning:"شخصٌ يقطع الحجر أو يشكّله أو ينحته لأعمال البناء أو الأعمال الفنية.",
  faSynonyms:["سنگ‌تراش","حجّار"],
  enSynonyms:["stonemason","stonecutter","stone carver"],
  arSynonyms:["حجّار","نحّات الحجر"]
 },
 "ماهیتابه":{
  faMeaning:"ظرفی کم‌عمق و معمولاً دسته‌دار که برای سرخ کردن یا پختن غذا روی اجاق استفاده می‌شود.",
  enMeaning:"A shallow, usually handled pan used for frying or cooking food on a stove.",
  arMeaning:"مِقلاةٌ ضحلةٌ ذاتُ مقبضٍ غالباً، تُستعمل لقلي الطعام أو طهيه على الموقد.",
  faSynonyms:["تابه","ظرف سرخ‌کردن"],
  enSynonyms:["frying pan","skillet","pan"],
  arSynonyms:["مقلاة","طاسة"]
 },
 "آبگرمکن":{
  faMeaning:"دستگاهی که آب را برای مصرف خانگی، مانند حمام و شست‌وشو، گرم می‌کند.",
  enMeaning:"A device that heats water for domestic use, such as bathing and washing.",
  arMeaning:"جهازٌ يسخّن الماء للاستعمال المنزلي، مثل الاستحمام والغسل.",
  faSynonyms:["دستگاه گرم‌کن آب"],
  enSynonyms:["water heater","hot-water heater"],
  arSynonyms:["سخّان الماء","سخّان المياه"]
 },
 "بنیانگذار":{
  faMeaning:"فردی که سازمان، مؤسسه، جنبش یا مجموعه‌ای را پایه‌گذاری و ایجاد می‌کند.",
  enMeaning:"A person who establishes or founds an organisation, institution, movement, or enterprise.",
  arMeaning:"شخصٌ يؤسّس منظمةً أو مؤسسةً أو حركةً أو مشروعاً وينشئها.",
  faSynonyms:["مؤسس","پایه‌گذار","بنیان‌گذار"],
  enSynonyms:["founder","establisher","co-founder"],
  arSynonyms:["مؤسّس","منشئ","مؤسّس مشارك"]
 },
 "به‌جا نیاوردن":{
  faMeaning:"کسی یا چیزی را با وجود دیدن یا روبه‌رو شدن، نشناختن یا به یاد نیاوردن؛ معمولاً دربارهٔ چهره یا شخص.",
  enMeaning:"To fail to recognise or remember someone or something, especially a face or a person one has encountered before.",
  arMeaning:"لم يتعرّفْ إلى شخصٍ أو شيءٍ ولم يتذكّره، ولا سيّما وجهَ شخصٍ سبق أن رآه.",
  faSynonyms:["نشناختن","تشخیص ندادن","به یاد نیاوردن"],
  enSynonyms:["fail to recognise","not remember","not identify"],
  arSynonyms:["لم يتعرّف إلى","لم يتذكّر","لم يميّز"]
 }
 };
 for(const [fa,v] of Object.entries(rows)) S[fa]={
  ...(S[fa]||{}),
  faMeaning:v.faMeaning,enMeaning:v.enMeaning,arMeaning:v.arMeaning,
  faSynonyms:v.faSynonyms,enSynonyms:v.enSynonyms,arSynonyms:v.arSynonyms
 };
 window.TERM3_ADDITIONAL_SEMANTICS_BATCH45=Object.keys(rows);
})();

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
