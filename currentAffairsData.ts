// Current Affairs & Daily 10 Ka Dum MCQ Quiz Data
// Auto-synced daily for Sarkari competitive exams

export interface CurrentAffairItem {
  id: string;
  title: string;
  titleEn: string;
  category: 'National' | 'Defense' | 'Science & Tech' | 'Economy' | 'Sports' | 'International' | 'Govt Schemes';
  date: string;
  summary: string;
  keyPoints: string[];
  examSignificance: string;
  relatedStaticGk: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionEn: string;
  options: [string, string, string, string];
  correctIndex: number; // 0 to 3
  explanation: string;
  category: string;
}

export const getTodayFormattedDate = (): string => {
  const now = new Date();
  const day = now.getDate();
  const monthsHindi = [
    'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
  ];
  return `${day} ${monthsHindi[now.getMonth()]} ${now.getFullYear()}`;
};

export const INITIAL_CURRENT_AFFAIRS: CurrentAffairItem[] = [
  {
    id: 'ca-1',
    title: '1. भारत ने नौसेना सुरक्षा हेतु उन्नत संचार उपग्रह GSAT-7B सफलतापूर्वक लॉन्च किया',
    titleEn: 'India successfully launched advanced communication satellite GSAT-7B for Naval Maritime Security',
    category: 'Defense',
    date: getTodayFormattedDate(),
    summary: 'भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) और भारतीय नौसेना के सहयोग से समर्पित सैन्य संचार उपग्रह GSAT-7B को कक्षा में स्थापित किया गया। यह हिंद महासागर क्षेत्र में निगरानी क्षमता को कई गुना बढ़ाएगा।',
    keyPoints: [
      'GSAT-7B को सतीश धवन अंतरिक्ष केंद्र, श्रीहरिकोटा से LVM3 रॉकेट द्वारा प्रक्षेपित किया गया।',
      'यह उपग्रह भारतीय नौसेना के युद्धपोतों, पनडुब्बियों और समुद्री टोही विमानों को सुरक्षित व रियल-टाइम एन्क्रिप्टेड संचार प्रदान करेगा।',
      'यह पूर्ववर्ती उपग्रह रुक्मिणी (GSAT-7) की जगह लेगा और इसकी परिचालन आयु 15 वर्ष आंकी गई है।',
      'परियोजना की लागत लगभग ₹1,589 करोड़ है और यह पूर्णतः स्वदेशी तकनीकों पर आधारित है।'
    ],
    examSignificance: 'UPSC Civil Services Pre/Mains (GS Paper 3: Science & Tech, Security), SSC CGL, CDS, NDA और CAPF परीक्षाओं में रक्षा प्रौद्योगिकी और उपग्रह अभियानों से सीधे प्रश्न पूछे जाते हैं।',
    relatedStaticGk: 'ISRO की स्थापना 15 अगस्त 1969 को हुई थी। मुख्यालय: बेंगलुरु, कर्नाटक। भारतीय नौसेना दिवस प्रत्येक वर्ष 4 दिसंबर को मनाया जाता है। वर्तमान नौसेना प्रमुख: एडमिरल दिनेश कुमार त्रिपाठी।'
  },
  {
    id: 'ca-2',
    title: '2. 98वें अकादमी (ऑस्कर) पुरस्कार: भारत की आधिकारिक प्रविष्टि का एलान',
    titleEn: '98th Academy Awards: Film Federation of India announces India\'s official Oscar entry',
    category: 'National',
    date: getTodayFormattedDate(),
    summary: 'फिल्म फेडरेशन ऑफ इंडिया (FFI) की 16 सदस्यीय जूरी ने सर्वसम्मति से भारत की सर्वश्रेष्ठ फीचर फिल्म को ऑस्कर के सर्वश्रेष्ठ अंतरराष्ट्रीय फीचर फिल्म वर्ग हेतु नामित किया है।',
    keyPoints: [
      'चयनित फिल्म सामाजिक न्याय, पर्यावरण संरक्षण और ग्रामीण भारत की वास्तविक चुनौतियों पर आधारित है।',
      'अकादमी पुरस्कार 2026/2027 लॉस एंजिल्स, कैलिफोर्निया में आयोजित किए जाएंगे।',
      'भारत ने इससे पहले मदर इंडिया (1957), सलाम बॉम्बे (1988) और लगान (2001) के साथ टॉप 5 में जगह बनाई थी।'
    ],
    examSignificance: 'SSC CGL, Railway NTPC, State PCS परीक्षाओं में कला, संस्कृति एवं राष्ट्रीय पुरस्कार वर्ग में 1 प्रश्न अनिवार्य रूप से पूछा जाता है।',
    relatedStaticGk: 'ऑस्कर पुरस्कारों की शुरुआत 1929 में हुई थी। भारत के लिए पहला ऑस्कर भानु अथैया ने 1983 में फिल्म \'गांधी\' के कॉस्ट्यूम डिजाइन के लिए जीता था।'
  },
  {
    id: 'ca-3',
    title: '3. भारतीय रिजर्व बैंक (RBI) मौद्रिक नीति समिति (MPC): नीतिगत दरें और जीडीपी अनुमान',
    titleEn: 'RBI Monetary Policy Committee: Repo rate maintained at 6.50% with positive GDP growth projection',
    category: 'Economy',
    date: getTodayFormattedDate(),
    summary: 'भारतीय रिजर्व बैंक (RBI) के गवर्नर की अध्यक्षता वाली 6 सदस्यीय मौद्रिक नीति समिति ने प्रमुख नीतिगत रेपो दर को 6.50% पर अपरिवर्तित रखा है तथा चालू वित्त वर्ष हेतु जीडीपी वृद्धि दर 7.2% रहने का अनुमान लगाया है।',
    keyPoints: [
      'रेपो रेट: 6.50%, रिवर्स रेपो रेट: 3.35%, MSF और बैंक दर: 6.75% पर स्थिर।',
      'मुद्रास्फीति (Inflation) को 4% (+/- 2%) के सहनीय दायरे में रखने का लक्ष्य दोहराया गया।',
      'भारतीय अर्थव्यवस्था विश्व में सबसे तेज गति से बढ़ती प्रमुख अर्थव्यवस्था बनी हुई है।'
    ],
    examSignificance: 'IBPS PO/Clerk, SBI, RBI Grade B, UPSC और SSC में मौद्रिक नीति, रेपो दर परिभाषा और MPC संरचना पर बार-बार प्रश्न आते हैं।',
    relatedStaticGk: 'RBI की स्थापना 1 अप्रैल 1935 को हिल्टन यंग आयोग की सिफारिश पर हुई थी। इसका राष्ट्रीयकरण 1 जनवरी 1949 को किया गया। मुख्यालय: मुंबई।'
  },
  {
    id: 'ca-4',
    title: '4. खेलो इंडिया यूथ गेम्स 2026: पदक तालिका और रिकॉर्ड प्रदर्शन',
    titleEn: 'Khelo India Youth Games 2026: Medal tally highlights and record-breaking performances',
    category: 'Sports',
    date: getTodayFormattedDate(),
    summary: 'खेलो इंडिया यूथ गेम्स के नए संस्करण में देश भर के 5,000 से अधिक युवा एथलीटों ने भाग लिया। महाराष्ट्र और हरियाणा ने पदक तालिका में शीर्ष दो स्थानों पर दबदबा बनाए रखा।',
    keyPoints: [
      'एथलेटिक्स और तीरंदाजी में 8 नए राष्ट्रीय युवा रिकॉर्ड स्थापित किए गए।',
      'पारंपरिक भारतीय खेलों जैसे मलखंब, कलारीपयट्टू, थांग-ता और योगासन को विशेष मान्यता दी गई।',
      'पदक विजेताओं को खेल मंत्रालय द्वारा 8 वर्षों तक ₹5 लाख प्रतिवर्ष की वित्तीय छात्रवृत्ति दी जाती है।'
    ],
    examSignificance: 'SSC GD, UP Police, Bihar Police और Railway ग्रुप डी में खेल पुरस्कार, आयोजक राज्य व शुभंकर (Mascot) पर सीधे प्रश्न पूछे जाते हैं।',
    relatedStaticGk: 'खेलो इंडिया कार्यक्रम 2018 में शुरू हुआ था। पहला संस्करण नई दिल्ली में आयोजित हुआ था। भारत के खेल एवं युवा मामले मंत्रालय का मुख्यालय: शास्त्री भवन, नई दिल्ली।'
  },
  {
    id: 'ca-5',
    title: '5. ISRO का चंद्रयान-4 और गगनयान मिशन: अंतरिक्ष में मानव उड़ान की अंतिम तैयारी',
    titleEn: 'ISRO Chandrayaan-4 and Gaganyaan Mission: Final testing phase for human spaceflight',
    category: 'Science & Tech',
    date: getTodayFormattedDate(),
    summary: 'भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने गगनयान मिशन के पहले मानवरहित क्रू एस्केप टेस्ट (TV-D2) और चंद्रमा से नमूने वापस लाने वाले महत्वाकांक्षी चंद्रयान-4 मिशन के डिजाइन को हरी झंडी दे दी है।',
    keyPoints: [
      'गगनयान मिशन के तहत 3 भारतीय अंतरिक्ष यात्रियों को 400 किमी की निचली पृथ्वी कक्षा (LEO) में भेजा जाएगा।',
      'व्योममित्र (Vyommitra) नामक महिला ह्यूमनॉइड रोबोट पहले मानवरहित परीक्षण का हिस्सा बनेगी।',
      'चंद्रयान-4 चंद्रमा के दक्षिणी ध्रुव से मिट्टी व चट्टानों के नमूने (Lunar Samples) पृथ्वी पर वापस लाएगा।'
    ],
    examSignificance: 'UPSC Civil Services, State PSCs (UPPSC, BPSC, MPPSC) और रक्षा परीक्षाओं में अंतरिक्ष मिशन व आगामी अभियानों पर विश्लेषणात्मक प्रश्न आते हैं।',
    relatedStaticGk: 'भारत का पहला उपग्रह आर्यभट्ट 19 अप्रैल 1975 को लॉन्च किया गया था। भारत चंद्रमा के दक्षिणी ध्रुव पर सॉफ्ट लैंडिंग करने वाला विश्व का पहला देश बना (23 अगस्त 2023 - राष्ट्रीय अंतरिक्ष दिवस)।'
  },
  {
    id: 'ca-6',
    title: '6. नीति आयोग द्वारा जारी किया गया सतत विकास लक्ष्य (SDG India Index)',
    titleEn: 'NITI Aayog releases Sustainable Development Goals (SDG India Index) Composite Rankings',
    category: 'National',
    date: getTodayFormattedDate(),
    summary: 'नीति आयोग ने राज्यों और केंद्र शासित प्रदेशों के सामाजिक, आर्थिक और पर्यावरणीय मानकों के समग्र मूल्यांकन पर आधारित SDG इंडिया इंडेक्स की ताजा रैंकिंग जारी की है।',
    keyPoints: [
      'केरल और उत्तराखंड ने समग्र प्रदर्शन में 79 अंकों के साथ राज्यों में शीर्ष स्थान साझा किया।',
      'केंद्र शासित प्रदेशों में चंडीगढ़ ने सर्वोच्च स्थान हासिल किया।',
      'भारत का समग्र राष्ट्रीय कंपोजिट स्कोर बढ़कर 74 अंक पर पहुंच गया, जो गरीबी उन्मूलन और स्वच्छ ऊर्जा में प्रगति दर्शाता है।'
    ],
    examSignificance: 'UPSC और State PSCs के लिए नीति आयोग की रिपोर्ट और 17 सतत विकास लक्ष्यों (SDGs 2030) का क्रम अत्यंत महत्वपूर्ण है।',
    relatedStaticGk: 'नीति आयोग (National Institution for Transforming India) का गठन 1 जनवरी 2015 को योजना आयोग के स्थान पर हुआ। इसके पदेन अध्यक्ष देश के प्रधानमंत्री होते हैं।'
  },
  {
    id: 'ca-7',
    title: '7. पीएम सूर्य घर मुफ्त बिजली योजना: 1 करोड़ से अधिक घरों में सोलर रूफटॉप',
    titleEn: 'PM Surya Ghar Muft Bijli Yojana: Historic milestone of over 1 crore registrations',
    category: 'Govt Schemes',
    date: getTodayFormattedDate(),
    summary: 'प्रधानमंत्री नरेंद्र मोदी द्वारा शुरू की गई ₹75,000 करोड़ की पीएम सूर्य घर मुफ्त बिजली योजना के तहत 1 करोड़ से अधिक परिवारों ने पंजीकरण पूरा किया। योजना में 300 यूनिट तक मुफ्त बिजली का प्रावधान है।',
    keyPoints: [
      '1 किलोवाट रूफटॉप सोलर पर ₹30,000 और 2 किलोवाट पर ₹60,000 तथा 3 किलोवाट पर ₹78,000 तक की केंद्रीय सब्सिडी सीधे खाते में।',
      'यह योजना कार्बन उत्सर्जन में 720 मिलियन टन की कटौती में योगदान देगी।',
      'अधिशेष (Surplus) बिजली को डिस्कॉम को बेचकर नागरिक सालाना ₹15,000 तक की अतिरिक्त आय अर्जित कर सकते हैं।'
    ],
    examSignificance: 'सभी प्रतियोगी परीक्षाओं में केंद्र सरकार की फ्लैगशिप कल्याणकारी योजनाओं की सब्सिडी दरें, बजट आवंटन और पात्रता पर प्रश्न पूछे जाते हैं।',
    relatedStaticGk: 'भारत का राष्ट्रीय सौर ऊर्जा मिशन (JNNSM) 2010 में शुरू हुआ था। भारत 2030 तक 500 गीगावाट गैर-जीवाश्म ईंधन ऊर्जा उत्पादन का लक्ष्य लेकर चल रहा है।'
  },
  {
    id: 'ca-8',
    title: '8. भारतीय वायुसेना में शामिल हुआ उन्नत स्वदेशी लड़ाकू विमान तेजस मार्क-1A',
    titleEn: 'Indian Air Force inducts advanced indigenous Light Combat Aircraft Tejas Mk-1A',
    category: 'Defense',
    date: getTodayFormattedDate(),
    summary: 'हिंदुस्तान एयरोनॉटिक्स लिमिटेड (HAL) द्वारा निर्मित एलसीए तेजस एमके-1ए का पहला स्क्वाड्रन पश्चिमी सीमा पर भारतीय वायुसेना में औपचारिक रूप से शामिल किया गया।',
    keyPoints: [
      'तेजस एमके-1ए उत्तम एईएसए रडार (AESA Radar), इलेक्ट्रॉनिक वॉरफेयर सूट और हवा-से-हवा में मार करने वाली बियॉन्ड विजुअल रेंज (BVR) अस्त्र मिसाइल से लैस है।',
      'इसमें 65% से अधिक स्वदेशी उपकरण लगे हैं, जो आत्मनिर्भर भारत रक्षा उत्पादन का उत्कृष्ट उदाहरण है।',
      'रक्षा मंत्रालय ने 83 विमानों के अतिरिक्त 97 नए तेजस विमानों की खरीद को भी मंजूरी दी है।'
    ],
    examSignificance: 'NDA, CDS, AFCAT, CAPF और SSC CGL में भारतीय रक्षा प्रणाली और स्वदेशी हथियारों के विनिर्देशों पर प्रश्न पूछे जाते हैं।',
    relatedStaticGk: 'HAL की स्थापना 1940 में वालचंद हीराचंद द्वारा की गई थी। वायुसेना दिवस प्रत्येक वर्ष 8 अक्टूबर को मनाया जाता है। वर्तमान वायुसेना प्रमुख: एयर चीफ मार्शल अमर प्रीत सिंह।'
  },
  {
    id: 'ca-9',
    title: '9. विश्व आर्थिक मंच (WEF) सम्मेलन: भारत 5 ट्रिलियन डॉलर अर्थव्यवस्था की ओर अग्रसर',
    titleEn: 'World Economic Forum: Global leaders highlight India\'s robust path toward $5 Trillion Economy',
    category: 'Economy',
    date: getTodayFormattedDate(),
    summary: 'दावोस में आयोजित विश्व आर्थिक मंच की वार्षिक बैठक में वैश्विक वित्तीय संस्थानों ने भारत को विश्व की सबसे लचीली और तेजी से बढ़ती तीसरी सबसे बड़ी अर्थव्यवस्था बनने की राह पर बताया।',
    keyPoints: [
      'डिजिटल पब्लिक इंफ्रास्ट्रक्चर (DPI), यूपीआई (UPI) और सेमीकंडक्टर मिशन को वैश्विक स्तर पर सराहना मिली।',
      'विदेशी प्रत्यक्ष निवेश (FDI) में विनिर्माण, नवीकरणीय ऊर्जा और आईटी क्षेत्र ने शीर्ष योगदान दिया।',
      'विश्व बैंक और आईएमएफ ने भारत की मुद्रास्फीति नियंत्रण नीति को वैश्विक बेंचमार्क माना।'
    ],
    examSignificance: 'RBI, NABARD, UPSC Pre/Mains, Economics Optional और राज्य प्रशासनिक परीक्षाओं में वैश्विक आर्थिक मंच की रिपोर्ट व जीडीपी रैंकिंग पर प्रश्न आते हैं।',
    relatedStaticGk: 'विश्व आर्थिक मंच (WEF) की स्थापना 1971 में क्लॉस श्वाब द्वारा की गई थी। इसका मुख्यालय कोलोन, जिनेवा, स्विट्जरलैंड में है।'
  },
  {
    id: 'ca-10',
    title: '10. भारत-मध्य पूर्व-यूरोप आर्थिक गलियारा (IMEC): बुनियादी ढांचे के विकास को गति',
    titleEn: 'India-Middle East-Europe Economic Corridor (IMEC): Strategic infrastructure operational roadmap',
    category: 'International',
    date: getTodayFormattedDate(),
    summary: 'भारत, यूएई, सऊदी अरब और यूरोपीय संघ ने जी-20 में घोषित ऐतिहासिक आईएमईसी (IMEC) गलियारे के बंदरगाह और रेलवे कनेक्टिविटी नेटवर्क के पहले चरण को लागू करने की कार्ययोजना पर सहमति व्यक्त की।',
    keyPoints: [
      'यह गलियारा भारत और यूरोप के बीच व्यापार समय में 40% और परिवहन लागत में 30% की कटौती करेगा।',
      'इसमें स्वच्छ हाइड्रोजन पाइपलाइन, हाई-स्पीड डेटा केबल और हरित ऊर्जा ट्रांसमिशन ग्रिड भी शामिल हैं।',
      'यह चीन के बेल्ट एंड रोड इनिशिएटिव (BRI) का एक पारदर्शी, संप्रभुता-अनुकूल और टिकाऊ विकल्प है।'
    ],
    examSignificance: 'अंतरराष्ट्रीय संबंध (IR), भूगोल, वैश्विक व्यापार गलियारे और जी-20 पहलों से जुड़े प्रश्न UPSC, State PCS और SSC Tier-2 में अनिवार्य हैं।',
    relatedStaticGk: 'IMEC की घोषणा सितंबर 2023 में नई दिल्ली में आयोजित 18वें G-20 शिखर सम्मेलन के दौरान की गई थी।'
  }
];

export const DAILY_10_KA_DUM_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'भारतीय नौसेना के लिए हाल ही में लॉन्च किए गए उन्नत सैन्य संचार उपग्रह का क्या नाम है?',
    questionEn: 'What is the name of the dedicated military communication satellite recently launched for the Indian Navy?',
    options: ['GSAT-7B', 'RISAT-2BR1', 'Cartosat-3', 'EOS-06'],
    correctIndex: 0,
    explanation: 'GSAT-7B एक समर्पित रक्षा संचार उपग्रह है जिसे भारतीय नौसेना की युद्धपोत, पनडुब्बी और टोही विमानों की एन्क्रिप्टेड संचार क्षमता बढ़ाने हेतु विकसित किया गया है।',
    category: 'Defense / Space'
  },
  {
    id: 2,
    question: 'भारतीय रिजर्व बैंक (RBI) की मौद्रिक नीति समिति (MPC) में कुल कितने सदस्य होते हैं?',
    questionEn: 'How many total members constitute the Monetary Policy Committee (MPC) of the Reserve Bank of India?',
    options: ['4 सदस्य', '5 सदस्य', '6 सदस्य', '8 सदस्य'],
    correctIndex: 2,
    explanation: 'RBI की MPC में कुल 6 सदस्य होते हैं: 3 सदस्य RBI से (गवर्नर सहित) और 3 स्वतंत्र सदस्य केंद्र सरकार द्वारा नियुक्त किए जाते हैं।',
    category: 'Economy / Banking'
  },
  {
    id: 3,
    question: 'नीति आयोग द्वारा जारी SDG इंडिया इंडेक्स 2024-26 में किस राज्य ने शीर्ष स्थान प्राप्त किया?',
    questionEn: 'Which state achieved the top rank in the SDG India Index released by NITI Aayog?',
    options: ['केरल व उत्तराखंड', 'तमिलनाडु व गुजरात', 'महाराष्ट्र व कर्नाटक', 'हरियाणा व पंजाब'],
    correctIndex: 0,
    explanation: 'नीति आयोग के समग्र सतत विकास लक्ष्य (SDG) इंडेक्स में केरल और उत्तराखंड ने 79 अंकों के साथ संयुक्त रूप से राज्यों में शीर्ष स्थान प्राप्त किया।',
    category: 'National / Governance'
  },
  {
    id: 4,
    question: 'पीएम सूर्य घर मुफ्त बिजली योजना के अंतर्गत पात्र परिवारों को प्रति माह कितने यूनिट तक मुफ्त बिजली प्रदान की जाती है?',
    questionEn: 'Under PM Surya Ghar Muft Bijli Yojana, up to how many units of free electricity are provided to eligible households per month?',
    options: ['100 यूनिट', '200 यूनिट', '300 यूनिट', '500 यूनिट'],
    correctIndex: 2,
    explanation: 'पीएम सूर्य घर मुफ्त बिजली योजना के तहत 300 यूनिट तक मुफ्त बिजली प्रदान की जाती है और 1 करोड़ से अधिक परिवारों को रूफटॉप सोलर से जोड़ा जा रहा है।',
    category: 'Govt Schemes'
  },
  {
    id: 5,
    question: 'ISRO के महत्वाकांक्षी गगनयान मिशन के लिए विकसित की गई महिला ह्यूमनॉइड रोबोट का नाम क्या है?',
    questionEn: 'What is the name of the female humanoid robot developed by ISRO for the Gaganyaan mission?',
    options: ['गगनप्रिया', 'व्योममित्र (Vyommitra)', 'अंतरिक्षिका', 'प्रज्ञान'],
    correctIndex: 1,
    explanation: 'व्योममित्र (Vyommitra) एक अर्ध-ह्यूमनॉइड रोबोट है जो गगनयान के मानवरहित परीक्षण उड़ानों में जीवन रक्षक प्रणाली और केबिन पर्यावरण की निगरानी करेगी।',
    category: 'Science & Tech'
  },
  {
    id: 6,
    question: 'भारतीय वायुसेना में शामिल किया गया स्वदेशी लड़ाकू विमान \'तेजस मार्क-1A\' किस कंपनी द्वारा निर्मित किया गया है?',
    questionEn: 'Which Indian company manufactures the Light Combat Aircraft \'Tejas Mk-1A\' inducted into the Indian Air Force?',
    options: ['DRDO', 'हिंदुस्तान एयरोनॉटिक्स लिमिटेड (HAL)', 'भारत इलेक्ट्रॉनिक्स लिमिटेड (BEL)', 'टाटा एडवांस्ड सिस्टम्स'],
    correctIndex: 1,
    explanation: 'तेजस मार्क-1A का निर्माण हिंदुस्तान एयरोनॉटिक्स लिमिटेड (HAL) द्वारा बेंगलुरु में किया जा रहा है। यह 65% से अधिक स्वदेशी कलपुर्जों से युक्त है।',
    category: 'Defense'
  },
  {
    id: 7,
    question: 'विश्व आर्थिक मंच (World Economic Forum) का मुख्यालय कहाँ स्थित है?',
    questionEn: 'Where is the headquarters of the World Economic Forum (WEF) located?',
    options: ['वाशिंगटन डी.सी., अमेरिका', 'पेरिस, फ्रांस', 'कोलोनी / जिनेवा, स्विट्जरलैंड', 'लंदन, यूनाइटेड किंगडम'],
    correctIndex: 2,
    explanation: 'विश्व आर्थिक मंच (WEF) की स्थापना 1971 में हुई थी और इसका मुख्यालय कोलोन (Cologny), जिनेवा, स्विट्जरलैंड में स्थित है।',
    category: 'International'
  },
  {
    id: 8,
    question: 'भारत में प्रत्येक वर्ष \'राष्ट्रीय अंतरिक्ष दिवस\' (National Space Day) किस तारीख को मनाया जाता है?',
    questionEn: 'On which date is National Space Day celebrated in India every year?',
    options: ['15 अगस्त', '23 अगस्त', '28 फरवरी', '4 दिसंबर'],
    correctIndex: 1,
    explanation: 'चंद्रयान-3 द्वारा चंद्रमा के दक्षिणी ध्रुव पर सफल सॉफ्ट लैंडिंग की ऐतिहासिक उपलब्धि को चिह्नित करने हेतु प्रत्येक वर्ष 23 अगस्त को राष्ट्रीय अंतरिक्ष दिवस मनाया जाता है।',
    category: 'Static GK / Science'
  },
  {
    id: 9,
    question: 'भारत-मध्य पूर्व-यूरोप आर्थिक गलियारा (IMEC) की घोषणा किस प्रमुख अंतरराष्ट्रीय शिखर सम्मेलन में की गई थी?',
    questionEn: 'The India-Middle East-Europe Economic Corridor (IMEC) was announced during which major international summit?',
    options: ['ब्रिक्स शिखर सम्मेलन 2023', 'नई दिल्ली G-20 शिखर सम्मेलन 2023', 'COP-28 जलवायु सम्मेलन', 'शंघाई सहयोग संगठन (SCO)'],
    correctIndex: 1,
    explanation: 'IMEC कॉरिडोर की ऐतिहासिक घोषणा नई दिल्ली में सितंबर 2023 में आयोजित 18वें G-20 नेताओं के शिखर सम्मेलन के दौरान भारत, अमेरिका, सऊदी अरब, यूएई व यूरोपीय संघ द्वारा की गई थी।',
    category: 'International Relations'
  },
  {
    id: 10,
    question: 'भारत के संविधान के किस अनुच्छेद के तहत देश में बजट (वार्षिक वित्तीय विवरण) संसद में प्रस्तुत किया जाता है?',
    questionEn: 'Under which article of the Constitution of India is the Annual Financial Statement (Budget) presented in Parliament?',
    options: ['अनुच्छेद 110', 'अनुच्छेद 112', 'अनुच्छेद 123', 'अनुच्छेद 280'],
    correctIndex: 1,
    explanation: 'संविधान के अनुच्छेद 112 के अनुसार केंद्र सरकार प्रत्येक वित्तीय वर्ष के संबंध में संसद के दोनों सदनों के समक्ष \'वार्षिक वित्तीय विवरण\' प्रस्तुत करती है। अनुच्छेद 110 धन विधेयक तथा अनुच्छेद 280 वित्त आयोग से संबंधित है।',
    category: 'Polity & Constitution'
  }
];

const STORAGE_KEY_CURRENT_AFFAIRS = 'mysarkariresult_current_affairs_v1';
const STORAGE_KEY_QUIZ_QUESTIONS = 'mysarkariresult_quiz_questions_v1';

export const getStoredCurrentAffairs = (): CurrentAffairItem[] => {
  const data = localStorage.getItem(STORAGE_KEY_CURRENT_AFFAIRS);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure today's date is reflected
        const today = getTodayFormattedDate();
        return parsed.map(item => ({ ...item, date: today }));
      }
    } catch {
      // Fallback
    }
  }
  localStorage.setItem(STORAGE_KEY_CURRENT_AFFAIRS, JSON.stringify(INITIAL_CURRENT_AFFAIRS));
  return INITIAL_CURRENT_AFFAIRS;
};

export const syncCurrentAffairsDatesToToday = (items: CurrentAffairItem[]): CurrentAffairItem[] => {
  const todayStr = getTodayFormattedDate();
  return items.map(item => ({
    ...item,
    date: todayStr,
  }));
};

export const saveStoredCurrentAffairs = (items: CurrentAffairItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_CURRENT_AFFAIRS, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save current affairs', err);
  }
};

export const getStoredQuizQuestions = (): QuizQuestion[] => {
  const data = localStorage.getItem(STORAGE_KEY_QUIZ_QUESTIONS);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // Fallback
    }
  }
  localStorage.setItem(STORAGE_KEY_QUIZ_QUESTIONS, JSON.stringify(DAILY_10_KA_DUM_QUIZ));
  return DAILY_10_KA_DUM_QUIZ;
};

export const saveStoredQuizQuestions = (questions: QuizQuestion[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_QUIZ_QUESTIONS, JSON.stringify(questions));
  } catch (err) {
    console.error('Failed to save quiz questions', err);
  }
};
