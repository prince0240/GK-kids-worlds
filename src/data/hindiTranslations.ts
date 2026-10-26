import { Question, Language } from '../types';

export interface QuestionHindiData {
  questionHi: string;
  optionsHi: string[];
  correctAnswerHi: string;
  explanationHi: string;
}

export const HINDI_QUESTIONS_MAP: Record<string, QuestionHindiData> = {
  // LKG
  'lkg-1': {
    questionHi: 'कौन सा जानवर "म्याऊँ" बोलता है? 🐱',
    optionsHi: ['🐱 बिल्ली', '🐶 कुत्ता', '🐮 गाय', '🦁 शेर'],
    correctAnswerHi: '🐱 बिल्ली',
    explanationHi: 'बिल्ली म्याऊँ बोलती है और दूध पीना पसंद करती है!',
  },
  'lkg-2': {
    questionHi: 'आपकी कितनी आँखें हैं? 👀',
    optionsHi: ['1', '2', '4', '6'],
    correctAnswerHi: '2',
    explanationHi: 'सुंदर दुनिया को देखने के लिए हमारे पास 2 आँखें हैं!',
  },
  'lkg-3': {
    questionHi: 'कौन सा फल लाल और मीठा होता है? 🍎',
    optionsHi: ['🍎 सेब', '🍌 केला', '🍇 अंगूर', '🍋 नींबू'],
    correctAnswerHi: '🍎 सेब',
    explanationHi: 'सेब लाल, कुरकुरा और सेहत के लिए बहुत अच्छा होता है!',
  },
  'lkg-4': {
    questionHi: 'धूप वाले दिन आसमान का रंग कैसा होता है? ☀️',
    optionsHi: ['🔵 नीला', '🟢 हरा', '🔴 लाल', '🟡 पीला'],
    correctAnswerHi: '🔵 नीला',
    explanationHi: 'सूरज की रोशनी में खुला आसमान नीला दिखता है!',
  },
  'lkg-5': {
    questionHi: 'कौन सा जानवर "भौंकता" है? 🐶',
    optionsHi: ['🐶 कुत्ता', '🐸 मेंढक', '🐥 बत्तख', '🐵 बंदर'],
    correctAnswerHi: '🐶 कुत्ता',
    explanationHi: 'कुत्ता भौंकता है और प्यार से पूंछ हिलाता है!',
  },
  'lkg-6': {
    questionHi: 'दिन के समय हमें रोशनी कौन देता है? 🌞',
    optionsHi: ['🌞 सूरज', '🌙 चाँद', '⭐ तारा', '🕯️ मोमबत्ती'],
    correctAnswerHi: '🌞 सूरज',
    explanationHi: 'सूरज हर सुबह चमकता है और रोशनी देता है!',
  },
  'lkg-7': {
    questionHi: 'कौन सा जानवर हमें दूध देता है? 🥛',
    optionsHi: ['🐮 गाय', '🦁 शेर', '🐘 हाथी', '🐰 खरगोश'],
    correctAnswerHi: '🐮 गाय',
    explanationHi: 'गाय हमें स्वादिष्ट और पौष्टिक सफेद दूध देती है!',
  },
  'lkg-8': {
    questionHi: 'चिड़िया के कितने पैर होते हैं? 🐦',
    optionsHi: ['2', '4', '6', '8'],
    correctAnswerHi: '2',
    explanationHi: 'पक्षियों के फुदकने और खड़े होने के लिए 2 छोटे पैर होते हैं!',
  },
  'lkg-9': {
    questionHi: 'कौन सा फल लंबा और पीला होता है? 🍌',
    optionsHi: ['🍌 केला', '🍓 स्ट्रॉबेरी', '🍉 तरबूज', '🍊 संतरा'],
    correctAnswerHi: '🍌 केला',
    explanationHi: 'बंदरों को मीठा पीला केला खाना बहुत पसंद है!',
  },
  'lkg-10': {
    questionHi: 'फूलों की खुशबू सूंघने के लिए हम किसका उपयोग करते हैं? 👃',
    optionsHi: ['👃 नाक', '👂 कान', '👅 जीभ', '✋ हाथ'],
    correctAnswerHi: '👃 नाक',
    explanationHi: 'हमारी नाक हमें फूलों की खुशबू पहचानने में मदद करती है!',
  },
  'lkg-11': {
    questionHi: 'कौन सा जानवर कूदता है और गाजर खाता है? 🥕🐰',
    optionsHi: ['🐰 खरगोश', '🐻 भालू', '🐴 घोड़ा', '🐯 बाघ'],
    correctAnswerHi: '🐰 खरगोश',
    explanationHi: 'प्यारा खरगोश अपने लंबे कानों के साथ तेज़ी से कूदता है!',
  },
  'lkg-12': {
    questionHi: 'रात में अंधेरे आसमान में क्या चमकता है? 🌙',
    optionsHi: ['🌙 चाँद', '⚽ फुटबॉल', '🚗 कार', '🌳 पेड़'],
    correctAnswerHi: '🌙 चाँद',
    explanationHi: 'चाँद रात में चमकता है जब हम सो रहे होते हैं!',
  },

  // UKG
  'ukg-1': {
    questionHi: 'किस जानवर को "जंगल का राजा" कहा जाता है? 👑',
    optionsHi: ['🦁 शेर', '🐘 हाथी', '🐯 बाघ', '🦒 जिराफ़'],
    correctAnswerHi: '🦁 शेर',
    explanationHi: 'शेर अपनी शान और शक्ति के कारण जंगल का राजा कहलाता है!',
  },
  'ukg-2': {
    questionHi: 'घास और पेड़ों की पत्तियों का रंग क्या होता है? 🌿',
    optionsHi: ['🟢 हरा', '🔵 नीला', '🔴 लाल', '🟣 बैंगनी'],
    correctAnswerHi: '🟢 हरा',
    explanationHi: 'क्लोरोफिल के कारण पौधों की पत्तियाँ हरी होती हैं!',
  },
  'ukg-3': {
    questionHi: 'एक सप्ताह (हफ्ते) में कितने दिन होते हैं? 🗓️',
    optionsHi: ['5', '6', '7', '10'],
    correctAnswerHi: '7',
    explanationHi: 'सोमवार, मंगलवार, बुधवार, गुरुवार, शुक्रवार, शनिवार और रविवार - कुल 7 दिन!',
  },
  'ukg-4': {
    questionHi: 'दुनिया का सबसे ऊँचा जानवर कौन सा है? 🦒',
    optionsHi: ['🦒 जिराफ़', '🐘 हाथी', '🐪 ऊँट', '🦓 ज़ेब्रा'],
    correctAnswerHi: '🦒 जिराफ़',
    explanationHi: 'जिराफ़ की गर्दन बहुत लंबी होती है जिससे वह ऊँचे पत्तों तक पहुँचता है!',
  },
  'ukg-5': {
    questionHi: 'कौन सा वाहन आसमान में ऊँचा उड़ता है? ✈️',
    optionsHi: ['✈️ हवाई जहाज़', '🚗 कार', '🚢 पानी का जहाज़', '🚲 साइकिल'],
    correctAnswerHi: '✈️ हवाई जहाज़',
    explanationHi: 'हवाई जहाज़ के पंख होते हैं और वह बादलों के ऊपर उड़ता है!',
  },
  'ukg-6': {
    questionHi: 'शरीर का कौन सा अंग आवाज़ और संगीत सुनने में मदद करता है? 🎵',
    optionsHi: ['👂 कान', '👀 आँखें', '👃 नाक', '🦶 पैर'],
    correctAnswerHi: '👂 कान',
    explanationHi: 'हम अपने 2 कानों से कहानियाँ और गाने सुनते हैं!',
  },
  'ukg-7': {
    questionHi: 'कौन सा पक्षी रंग-बिरंगे पंख फैलाकर बारिश में नाचता है? 🦚',
    optionsHi: ['🦚 मोर', '🦅 चील', '🦆 बत्तख', '🦉 उल्लू'],
    correctAnswerHi: '🦚 मोर',
    explanationHi: 'मोर अपने सुंदर पंख फैलाकर बारिश में खुशी से नाचता है!',
  },
  'ukg-8': {
    questionHi: 'मधुमक्खियाँ क्या बनाती हैं जो बहुत मीठा होता है? 🍯',
    optionsHi: ['🍯 शहद', '🥛 दूध', '🧈 मक्खन', '🧀 पनीर'],
    correctAnswerHi: '🍯 शहद',
    explanationHi: 'मधुमक्खियाँ फूलों से रस लेकर मीठा-मीठा शहद बनाती हैं!',
  },
  'ukg-9': {
    questionHi: 'इंद्रधनुष (Rainbow) में कितने रंग होते हैं? 🌈',
    optionsHi: ['5', '6', '7', '8'],
    correctAnswerHi: '7',
    explanationHi: 'इंद्रधनुष में 7 प्यारे रंग होते हैं: बैंगनी, जामुनी, नीला, हरा, पीला, नारंगी, लाल!',
  },
  'ukg-10': {
    questionHi: 'कौन सा फल बाहर से हरा और अंदर से लाल और रसदार होता है? 🍉',
    optionsHi: ['🍉 तरबूज', '🍍 अनानास', '🥭 आम', '🍏 हरा सेब'],
    correctAnswerHi: '🍉 तरबूज',
    explanationHi: 'तरबूज में भरपूर मीठा पानी होता है और काले बीज होते हैं!',
  },
  'ukg-11': {
    questionHi: 'कौन सा जीव पानी में तैरता है और गलफड़ों (gills) से सांस लेता है? 🐟',
    optionsHi: ['🐟 मछली', '🐈 बिल्ली', '🐿️ गिलहरी', '🐎 घोड़ा'],
    correctAnswerHi: '🐟 मछली',
    explanationHi: 'मछली नदी और समुद्र के पानी में तैरती है!',
  },
  'ukg-12': {
    questionHi: 'किस आकृति में 3 कोने होते हैं? 🔺',
    optionsHi: ['🔺 त्रिभुज (Triangle)', '🟧 वर्ग (Square)', '⚪ वृत्त (Circle)', '⭐ तारा'],
    correctAnswerHi: '🔺 त्रिभुज (Triangle)',
    explanationHi: 'त्रिभुज की तीन भुजाएँ और तीन कोने होते हैं!',
  },

  // Class 1
  'c1-1': {
    questionHi: 'भारत का राष्ट्रीय पशु कौन सा है? 🇮🇳',
    optionsHi: ['🐯 रॉयल बंगाल टाइगर (बाघ)', '🦁 एशियाई शेर', '🐘 भारतीय हाथी', '🐆 तेंदुआ'],
    correctAnswerHi: '🐯 रॉयल बंगाल टाइगर (बाघ)',
    explanationHi: 'बाघ अपनी ताकत और सुंदरता के लिए भारत का राष्ट्रीय पशु है!',
  },
  'c1-2': {
    questionHi: 'भारत का राष्ट्रीय पक्षी कौन सा है? 🦚',
    optionsHi: ['🦚 मोर', '🦜 तोता', '🕊️ कबूतर', '🦅 चील'],
    correctAnswerHi: '🦚 मोर',
    explanationHi: 'भारतीय मोर अपने सुंदर पंखों के साथ हमारा राष्ट्रीय पक्षी है!',
  },
  'c1-3': {
    questionHi: 'भारत का राष्ट्रीय फूल कौन सा है? 🪷',
    optionsHi: ['🪷 कमल', '🌹 गुलाब', '🌻 सूरजमुखी', '🌺 गेंदा'],
    correctAnswerHi: '🪷 कमल',
    explanationHi: 'कमल का फूल तालाब के पानी में शान से खिलता है!',
  },
  'c1-4': {
    questionHi: 'हम सब किस ग्रह पर रहते हैं? 🌍',
    optionsHi: ['🌍 पृथ्वी (Earth)', '🔴 मंगल (Mars)', '🪐 शनि (Saturn)', '🌕 चाँद (Moon)'],
    correctAnswerHi: '🌍 पृथ्वी (Earth)',
    explanationHi: 'पृथ्वी हमारा सुंदर नीला और हरा घर है!',
  },
  'c1-5': {
    questionHi: 'एक वर्ष में कितने महीने होते हैं? 📅',
    optionsHi: ['10', '11', '12', '14'],
    correctAnswerHi: '12',
    explanationHi: 'एक वर्ष में 12 महीने होते हैं, जनवरी से दिसंबर तक!',
  },
  'c1-6': {
    questionHi: 'भारत में "फलों का राजा" किसे कहा जाता है? 🥭',
    optionsHi: ['🥭 आम', '🍎 सेब', '🍌 केला', '🍇 अंगूर'],
    correctAnswerHi: '🥭 आम',
    explanationHi: 'मीठा और रसीला आम सबका पसंदीदा राष्ट्रीय फल है!',
  },
  'c1-7': {
    questionHi: 'फोटो खींचने और फ़ोन कॉल करने के लिए किस उपकरण का उपयोग करते हैं? 📱',
    optionsHi: ['📱 स्मार्टफोन', '📺 टेलीविज़न', '📻 रेडियो', '⏰ अलार्म घड़ी'],
    correctAnswerHi: '📱 स्मार्टफोन',
    explanationHi: 'स्मार्टफोन से हम कॉल कर सकते हैं और पढ़ाई भी कर सकते हैं!',
  },
  'c1-8': {
    questionHi: 'किस खेल में बल्ला, गेंद और विकेट का उपयोग होता है? 🏏',
    optionsHi: ['🏏 क्रिकेट', '⚽ फुटबॉल', '🎾 टेनिस', '🏸 बैडमिंटन'],
    correctAnswerHi: '🏏 क्रिकेट',
    explanationHi: 'क्रिकेट में दो टीमें बल्ले और गेंद से खेलती हैं!',
  },
  'c1-9': {
    questionHi: 'भारत के राष्ट्रीय ध्वज (तिरंगे) में कितने मुख्य रंग हैं? 🇮🇳',
    optionsHi: ['2', '3', '4', '5'],
    correctAnswerHi: '3',
    explanationHi: 'तिरंगे में केसरिया, सफेद और हरा रंग होता है (बीच में नीला चक्र)!',
  },
  'c1-10': {
    questionHi: 'पौधों को बड़ा होने के लिए मुख्य रूप से क्या चाहिए? 🌱',
    optionsHi: ['☀️ धूप और पानी', '🍫 चॉकलेट', '🥤 कोल्ड ड्रिंक', '🎮 वीडियो गेम'],
    correctAnswerHi: '☀️ धूप और पानी',
    explanationHi: 'पौधे धूप और पानी से अपना भोजन बनाते हैं!',
  },
  'c1-11': {
    questionHi: 'आइसक्रीम और फलों का स्वाद चखने में कौन सा अंग मदद करता है? 👅',
    optionsHi: ['👅 जीभ', '👃 नाक', '👂 कान', '👀 आँखें'],
    correctAnswerHi: '👅 जीभ',
    explanationHi: 'जीभ पर मौजूद स्वाद ग्रंथियाँ हमें मीठा, खट्टा और नमकीन बताती हैं!',
  },
  'c1-12': {
    questionHi: 'कौन सा कीट रंग-बिरंगे पंखों से फूलों का रस पीता है? 🦋',
    optionsHi: ['🦋 तितली', '🐜 चींटी', '🪰 मक्खी', '🦟 मच्छर'],
    correctAnswerHi: '🦋 तितली',
    explanationHi: 'तितली कैटरपिलर से एक सुंदर पंखों वाली परी बन जाती है!',
  },

  // Class 2
  'c2-1': {
    questionHi: 'धरती का सबसे बड़ा ज़मीनी जानवर कौन सा है? 🐘',
    optionsHi: ['🐘 अफ्रीकी हाथी', '🦏 गैंडा', '🦛 दरियाई घोड़ा', '🦒 जिराफ़'],
    correctAnswerHi: '🐘 अफ्रीकी हाथी',
    explanationHi: 'अफ्रीकी हाथी धरती पर रहने वाला सबसे भारी और बड़ा जानवर है!',
  },
  'c2-2': {
    questionHi: 'भारत की राजधानी कौन सा शहर है? 🏛️',
    optionsHi: ['नई दिल्ली', 'मुंबई', 'कोलकाता', 'बेंगलुरु'],
    correctAnswerHi: 'नई दिल्ली',
    explanationHi: 'नई दिल्ली हमारे देश भारत की राजधानी है!',
  },
  'c2-3': {
    questionHi: 'आगरा में सफेद संगमरमर से बनी प्रसिद्ध इमारत कौन सी है? 🕌',
    optionsHi: ['ताजमहल', 'लाल किला', 'कुतुब मीनार', 'हवा महल'],
    correctAnswerHi: 'ताजमहल',
    explanationHi: 'ताजमहल यमुना नदी के किनारे स्थित विश्व प्रसिद्ध अजूबा है!',
  },
  'c2-4': {
    questionHi: 'हमारी पृथ्वी का सबसे नजदीकी तारा कौन सा है? ☀️',
    optionsHi: ['सूर्य (Sun)', 'ध्रुव तारा (Polaris)', 'अल्फ़ा सेंटॉरी', 'सीरियस'],
    correctAnswerHi: 'सूर्य (Sun)',
    explanationHi: 'सूर्य वास्तव में एक तारा है जो हमें दिन में रोशनी और गर्मी देता है!',
  },
  'c2-5': {
    questionHi: 'पौधे कौन सी गैस छोड़ते हैं जिसे हम सांस में लेते हैं? 💨',
    optionsHi: ['ऑक्सीजन (Oxygen)', 'कार्बन डाइऑक्साइड', 'हीलियम', 'नाइट्रोजन'],
    correctAnswerHi: 'ऑक्सीजन (Oxygen)',
    explanationHi: 'पेड़-पौधे हमें सांस लेने के लिए ताज़ा ऑक्सीजन देते हैं!',
  },
  'c2-6': {
    questionHi: 'कंप्यूटर के किस भाग को उसका "दिमाग" (Brain) कहा जाता है? 🧠💻',
    optionsHi: ['सीपीयू (CPU)', 'माउस (Mouse)', 'कीबोर्ड (Keyboard)', 'मॉनिटर (Monitor)'],
    correctAnswerHi: 'सीपीयू (CPU)',
    explanationHi: 'CPU (सेंट्रल प्रोसेसिंग यूनिट) कंप्यूटर की सभी गणनाएँ करता है!',
  },
  'c2-7': {
    questionHi: 'लीप वर्ष (Leap Year) में कितने दिन होते हैं? 📆',
    optionsHi: ['366 दिन', '365 दिन', '360 दिन', '370 दिन'],
    correctAnswerHi: '366 दिन',
    explanationHi: 'लीप वर्ष में फ़रवरी में 29 दिन होते हैं, इसलिए कुल 366 दिन होते हैं!',
  },
  'c2-8': {
    questionHi: 'जब पानी जम जाता है तो वह क्या बन जाता है? 🧊',
    optionsHi: ['बर्फ (Ice)', 'भाप (Steam)', 'बादल', 'जूस'],
    correctAnswerHi: 'बर्फ (Ice)',
    explanationHi: '0 डिग्री पर ठंडा होने पर पानी ठोस बर्फ बन जाता है!',
  },
  'c2-9': {
    questionHi: 'दुनिया का सबसे बड़ा महासागर कौन सा है? 🌊',
    optionsHi: ['प्रशांत महासागर (Pacific)', 'अटलांटिक महासागर', 'हिंद महासागर', 'आर्कटिक महासागर'],
    correctAnswerHi: 'प्रशांत महासागर (Pacific)',
    explanationHi: 'प्रशांत महासागर पृथ्वी का सबसे विशाल और गहरा महासागर है!',
  },
  'c2-10': {
    questionHi: 'क्रिकेट टीम में मैदान पर कितने खिलाड़ी खेलते हैं? 🏏',
    optionsHi: ['11', '7', '9', '15'],
    correctAnswerHi: '11',
    explanationHi: 'हर क्रिकेट टीम में मैदान पर 11 खिलाड़ी होते हैं!',
  },
  'c2-11': {
    questionHi: 'कौन सा पक्षी रात में जागता है और अंधेरे में देख सकता है? 🦉',
    optionsHi: ['उल्लू (Owl)', 'तोता', 'गौरैया', 'कौआ'],
    correctAnswerHi: 'उल्लू (Owl)',
    explanationHi: 'उल्लू की बड़ी आँखें होती हैं और वह रात में शिकार करता है!',
  },
  'c2-12': {
    questionHi: 'कुत्ते के छोटे बच्चे को क्या कहते हैं? 🐶',
    optionsHi: ['पिल्ला (Puppy)', 'बिल्ली का बच्चा (Kitten)', 'बछड़ा (Calf)', 'शावक (Cub)'],
    correctAnswerHi: 'पिल्ला (Puppy)',
    explanationHi: 'कुत्ते के प्यारे बच्चे को पिल्ला (पपी) कहा जाता है!',
  },

  // Class 3
  'c3-1': {
    questionHi: 'किस ग्रह को "लाल ग्रह" (Red Planet) कहा जाता है? 🪐',
    optionsHi: ['मंगल (Mars)', 'शुक्र (Venus)', 'बृहस्पति (Jupiter)', 'बुध (Mercury)'],
    correctAnswerHi: 'मंगल (Mars)',
    explanationHi: 'मंगल की सतह पर लौह ऑक्साइड (जंग) की वजह से वह लाल दिखता है!',
  },
  'c3-2': {
    questionHi: 'भारत के पहले प्रधानमंत्री कौन थे? 🇮🇳',
    optionsHi: ['पंडित जवाहरलाल नेहरू', 'महात्मा गांधी', 'डॉ. बी.आर. आंबेडकर', 'सरदार पटेल'],
    correctAnswerHi: 'पंडित जवाहरलाल नेहरू',
    explanationHi: 'पंडित नेहरू बच्चों से बहुत प्यार करते थे और उन्हें "चाचा नेहरू" कहा जाता था!',
  },
  'c3-3': {
    questionHi: 'विश्व का सबसे बड़ा महाद्वीप कौन सा है? 🗺️',
    optionsHi: ['एशिया (Asia)', 'अफ्रीका (Africa)', 'यूरोप (Europe)', 'उत्तरी अमेरिका'],
    correctAnswerHi: 'एशिया (Asia)',
    explanationHi: 'एशिया क्षेत्रफल और जनसंख्या दोनों में दुनिया का सबसे बड़ा महाद्वीप है!',
  },
  'c3-4': {
    questionHi: 'पृथ्वी पर सबसे कठोर प्राकृतिक पदार्थ कौन सा है? 💎',
    optionsHi: ['हीरा (Diamond)', 'सोना (Gold)', 'लोहा (Iron)', 'ग्रेनाइट'],
    correctAnswerHi: 'हीरा (Diamond)',
    explanationHi: 'हीरा अत्यधिक दबाव में कार्बन से बनता है और सबसे कठोर होता है!',
  },
  'c3-5': {
    questionHi: 'किस जानवर को "रेगिस्तान का जहाज" कहा जाता है? 🐪',
    optionsHi: ['ऊँट (Camel)', 'घोड़ा', 'गधा', 'कंगारू'],
    correctAnswerHi: 'ऊँट (Camel)',
    explanationHi: 'ऊँट रेत पर आसानी से चल सकता है और कई दिनों तक बिना पानी रह सकता है!',
  },
  'c3-6': {
    questionHi: 'इंटरनेट में "WWW" का पूर्ण रूप (Full Form) क्या है? 🌐',
    optionsHi: ['World Wide Web', 'World Web Wide', 'Wide World Web', 'Web World Wide'],
    correctAnswerHi: 'World Wide Web',
    explanationHi: 'वर्ल्ड वाइड वेब पूरी दुनिया के कंप्यूटरों को आपस में जोड़ता है!',
  },
  'c3-7': {
    questionHi: 'धरती पर सबसे तेज़ दौड़ने वाला जानवर कौन सा है? 🐆',
    optionsHi: ['चीता (Cheetah)', 'शेर', 'घोड़ा', 'शिकारी कुत्ता'],
    correctAnswerHi: 'चीता (Cheetah)',
    explanationHi: 'चीता 100 किमी/घंटा से भी तेज़ रफ्तार से दौड़ सकता है!',
  },
  'c3-8': {
    questionHi: 'वयस्क मानव शरीर में कुल कितनी हड्डियाँ होती हैं? 🦴',
    optionsHi: ['206', '106', '300', '250'],
    correctAnswerHi: '206',
    explanationHi: 'जन्म के समय 300 के करीब हड्डियाँ होती हैं जो बाद में जुड़कर 206 रह जाती हैं!',
  },
  'c3-9': {
    questionHi: 'भारत में किसे "राष्ट्रपिता" कहा जाता है? 🕊️',
    optionsHi: ['महात्मा गांधी', 'सुभाष चंद्र बोस', 'भगत सिंह', 'रवींद्रनाथ टैगोर'],
    correctAnswerHi: 'महात्मा गांधी',
    explanationHi: 'महात्मा गांधी जी ने सत्य और अहिंसा के मार्ग पर चलकर आज़ादी दिलाई!',
  },
  'c3-10': {
    questionHi: 'लियोनेल मेस्सी किस खेल के विश्व प्रसिद्ध खिलाड़ी हैं? ⚽',
    optionsHi: ['फुटबॉल (Football)', 'बास्केटबॉल', 'क्रिकेट', 'टेनिस'],
    correctAnswerHi: 'फुटबॉल (Football)',
    explanationHi: 'लियोनेल मेस्सी अर्जेंटीना के दिग्गज वर्ल्ड कप विजेता फुटबॉल खिलाड़ी हैं!',
  },
  'c3-11': {
    questionHi: 'वायुमंडल की कौन सी परत हमें सूर्य की हानिकारक किरणों से बचाती है? 🛡️',
    optionsHi: ['ओज़ोन परत (Ozone Layer)', 'कार्बन परत', 'बादल परत', 'ऑक्सीजन चादर'],
    correctAnswerHi: 'ओज़ोन परत (Ozone Layer)',
    explanationHi: 'ओज़ोन परत सूर्य की हानिकारक पराबैंगनी (UV) किरणों को रोकती है!',
  },
  'c3-12': {
    questionHi: 'भारत की सबसे लंबी नदी कौन सी है? 🌊',
    optionsHi: ['गंगा (Ganga)', 'यमुना', 'गोदावरी', 'ब्रह्मपुत्र'],
    correctAnswerHi: 'गंगा (Ganga)',
    explanationHi: 'पवित्र गंगा नदी भारत में 2,500 किलोमीटर से अधिक लंबी बहती है!',
  },

  // Class 4
  'c4-1': {
    questionHi: 'हमारे सौरमंडल का सबसे बड़ा ग्रह कौन सा है? 🪐',
    optionsHi: ['बृहस्पति (Jupiter)', 'शनि (Saturn)', 'वरुण (Neptune)', 'पृथ्वी (Earth)'],
    correctAnswerHi: 'बृहस्पति (Jupiter)',
    explanationHi: 'बृहस्पति इतना विशाल है कि इसमें 1,300 पृथ्वी समा सकती हैं!',
  },
  'c4-2': {
    questionHi: 'विश्व की सबसे ऊँची पर्वत चोटी कौन सी है? 🏔️',
    optionsHi: ['माउंट एवरेस्ट (Mount Everest)', 'के2 (K2)', 'कंचनजंघा', 'माउंट किलिमंजारो'],
    correctAnswerHi: 'माउंट एवरेस्ट (Mount Everest)',
    explanationHi: 'माउंट एवरेस्ट हिमालय में 8,848.86 मीटर ऊँचा है!',
  },
  'c4-3': {
    questionHi: 'कंप्यूटर में "RAM" का पूरा नाम क्या है? 💾',
    optionsHi: ['Random Access Memory', 'Read Access Memory', 'Rapid Action Memory', 'Run Active Module'],
    correctAnswerHi: 'Random Access Memory',
    explanationHi: 'RAM अस्थायी मेमोरी होती है जो कंप्यूटर को तेज़ चलाने में मदद करती है!',
  },
  'c4-4': {
    questionHi: 'भारत का राष्ट्रगान "जन गण मन" किसने लिखा था? 📜',
    optionsHi: ['रवींद्रनाथ टैगोर', 'बंकिम चंद्र चटर्जी', 'सरोजिनी नायडू', 'मुंशी प्रेमचंद'],
    correctAnswerHi: 'रवींद्रनाथ टैगोर',
    explanationHi: 'नोबेल पुरस्कार विजेता गुरुदेव रवींद्रनाथ टैगोर ने राष्ट्रगान रचा था!',
  },
  'c4-5': {
    questionHi: 'पौधे धूप की मदद से भोजन बनाने की प्रक्रिया को क्या कहते हैं? 🍃',
    optionsHi: ['प्रकाश संश्लेषण (Photosynthesis)', 'श्वसन (Respiration)', 'वाष्पीकरण', 'अंकुरण'],
    correctAnswerHi: 'प्रकाश संश्लेषण (Photosynthesis)',
    explanationHi: 'प्रकाश संश्लेषण से पौधे भोजन बनाते हैं और ऑक्सीजन छोड़ते हैं!',
  },
  'c4-6': {
    questionHi: 'भारत के किस शहर को "गुलाबी नगर" (Pink City) कहा जाता है? 🏰',
    optionsHi: ['जयपुर (Jaipur)', 'उदयपुर', 'जोधपुर', 'भोपाल'],
    correctAnswerHi: 'जयपुर (Jaipur)',
    explanationHi: 'राजस्थान की राजधानी जयपुर को 1876 में गुलाबी रंग से रंगा गया था!',
  },
  'c4-7': {
    questionHi: 'ओलंपिक खेलों के प्रतीक चिन्ह में कितने छल्ले (रिंग्स) होते हैं? ⭕',
    optionsHi: ['5', '4', '6', '7'],
    correctAnswerHi: '5',
    explanationHi: '5 रंग-बिरंगे छल्ले दुनिया के 5 महाद्वीपों की खेल एकता को दर्शाते हैं!',
  },
  'c4-8': {
    questionHi: 'तापमान (बुखार) मापने के लिए किस यंत्र का उपयोग किया जाता है? 🌡️',
    optionsHi: ['थर्मामीटर (Thermometer)', 'बैरोमीटर', 'स्पीडोमीटर', 'सिस्मोग्राफ'],
    correctAnswerHi: 'थर्मामीटर (Thermometer)',
    explanationHi: 'थर्मामीटर शरीर या मौसम का तापमान डिग्री में मापता है!',
  },
  'c4-9': {
    questionHi: 'विश्व का सबसे बड़ा गर्म रेगिस्तान कौन सा है? 🏜️',
    optionsHi: ['सहारा रेगिस्तान (Sahara)', 'थार रेगिस्तान', 'गोबी रेगिस्तान', 'कालाहारी'],
    correctAnswerHi: 'सहारा रेगिस्तान (Sahara)',
    explanationHi: 'सहारा रेगिस्तान उत्तरी अफ्रीका के 11 देशों में फैला हुआ है!',
  },
  'c4-10': {
    questionHi: 'पृथ्वी का एकमात्र प्राकृतिक उपग्रह कौन सा है? 🌕',
    optionsHi: ['चंद्रमा (The Moon)', 'टाइटन (Titan)', 'यूरोपा', 'फोबोस'],
    correctAnswerHi: 'चंद्रमा (The Moon)',
    explanationHi: 'चंद्रमा पृथ्वी की परिक्रमा करता है और रात को शीतलता देता है!',
  },
  'c4-11': {
    questionHi: 'हानिकारक रसायनों और प्रदूषण से होने वाली वर्षा को क्या कहते हैं? 🌧️',
    optionsHi: ['अम्लीय वर्षा (Acid Rain)', 'काली वर्षा', 'धुंध वर्षा', 'राख वर्षा'],
    correctAnswerHi: 'अम्लीय वर्षा (Acid Rain)',
    explanationHi: 'हवा में मौजूद सल्फर और नाइट्रोजन ऑक्साइड मिलकर अम्ल वर्षा बनाते हैं!',
  },
  'c4-12': {
    questionHi: 'कंप्यूटर का जनक (Father of Computer) किसे कहा जाता है? 💻',
    optionsHi: ['चार्ल्स बैबेज (Charles Babbage)', 'एलन ट्यूरिंग', 'बिल गेट्स', 'स्टीव जॉब्स'],
    correctAnswerHi: 'चार्ल्स बैबेज (Charles Babbage)',
    explanationHi: 'चार्ल्स बैबेज ने एनालिटिकल इंजन की संकल्पना देकर कंप्यूटर की नींव रखी!',
  },

  // Class 5
  'c5-1': {
    questionHi: 'भारतीय संविधान के मुख्य निर्माता (शिल्पकार) कौन थे? ⚖️',
    optionsHi: ['डॉ. बी.आर. आंबेडकर', 'महात्मा गांधी', 'डॉ. राजेंद्र प्रसाद', 'जवाहरलाल नेहरू'],
    correctAnswerHi: 'डॉ. बी.आर. आंबेडकर',
    explanationHi: 'बाबासाहेब डॉ. भीमराव आंबेडकर संविधान प्रारूप समिति के अध्यक्ष थे!',
  },
  'c5-2': {
    questionHi: '1975 में भारत द्वारा अंतरिक्ष में भेजा गया पहला उपग्रह कौन सा था? 🛰️',
    optionsHi: ['आर्यभट्ट (Aryabhata)', 'चंद्रयान-1', 'मंगलयान', 'इनसैट-1ए'],
    correctAnswerHi: 'आर्यभट्ट (Aryabhata)',
    explanationHi: 'आर्यभट्ट उपग्रह का नाम महान भारतीय खगोलशास्त्री के नाम पर रखा गया था!',
  },
  'c5-3': {
    questionHi: 'मानव शरीर का कौन सा अंग रक्त (खून) को पूरे शरीर में पंप करता है? ❤️',
    optionsHi: ['हृदय (Heart)', 'फेफड़े (Lungs)', 'मस्तिष्क (Brain)', 'गुर्दे (Kidneys)'],
    correctAnswerHi: 'हृदय (Heart)',
    explanationHi: 'मानव हृदय एक दिन में लगभग 1,00,000 बार धड़क कर खून पहुंचाता है!',
  },
  'c5-4': {
    questionHi: 'क्षेत्रफल की दृष्टि से विश्व का सबसे छोटा देश कौन सा है? 🌍',
    optionsHi: ['वेटिकन सिटी (Vatican City)', 'मोनाको', 'मालदीव', 'सैन मैरिनो'],
    correctAnswerHi: 'वेटिकन सिटी (Vatican City)',
    explanationHi: 'वेटिकन सिटी इटली के रोम शहर के बीच स्थित एक स्वतंत्र देश है!',
  },
  'c5-5': {
    questionHi: 'तकनीक में "AI" का पूर्ण रूप (Full Form) क्या है? 🤖',
    optionsHi: ['Artificial Intelligence', 'Automated Internet', 'Active Information', 'Applied Innovation'],
    correctAnswerHi: 'Artificial Intelligence',
    explanationHi: 'आर्टिफिशियल इंटेलिजेंस (कृत्रिम बुद्धिमत्ता) मशीनों को सोचने-सीखने की क्षमता देती है!',
  },
  'c5-6': {
    questionHi: 'किस वर्षावन को "पृथ्वी का फेफड़ा" (Lungs of the Planet) कहा जाता है? 🌳',
    optionsHi: ['अमेज़न वर्षावन (Amazon)', 'कांगो वर्षावन', 'डेन्ट्री वर्षावन', 'सुंदरवन'],
    correctAnswerHi: 'अमेज़न वर्षावन (Amazon)',
    explanationHi: 'अमेज़न के घने जंगल भारी मात्रा में ऑक्सीजन उत्पन्न करते हैं!',
  },
  'c5-7': {
    questionHi: 'चंद्रमा की सतह पर कदम रखने वाले पहले व्यक्ति कौन थे? 👨‍🚀',
    optionsHi: ['नील आर्मस्ट्रांग (Neil Armstrong)', 'बज़ एल्ड्रिन', 'यूरी गागरिन', 'राकेश शर्मा'],
    correctAnswerHi: 'नील आर्मस्ट्रांग (Neil Armstrong)',
    explanationHi: '1969 में अपोलो 11 मिशन के दौरान नील आर्मस्ट्रांग ने चाँद पर कदम रखा!',
  },
  'c5-8': {
    questionHi: 'भारत के किस मिशन ने चंद्रमा के दक्षिणी ध्रुव के पास सफल लैंडिंग की? 🌕',
    optionsHi: ['चंद्रयान-3 (Chandrayaan-3)', 'मंगलयान-2', 'आदित्य-एल1', 'गगनयान'],
    correctAnswerHi: 'चंद्रयान-3 (Chandrayaan-3)',
    explanationHi: 'अगस्त 2023 में इसरो के चंद्रयान-3 ने इतिहास रचा था!',
  },
  'c5-9': {
    questionHi: 'प्रकाश प्रकीर्णन (Raman Effect) के लिए किस भारतीय वैज्ञानिक को नोबेल पुरस्कार मिला? 🔬',
    optionsHi: ['सर सी.वी. रमन', 'होमी भाभा', 'ए.पी.जे. अब्दुल कलाम', 'जगदीश चंद्र बसु'],
    correctAnswerHi: 'सर सी.वी. रमन',
    explanationHi: 'सर सी.वी. रमन की खोज की याद में हर वर्ष 28 फरवरी को राष्ट्रीय विज्ञान दिवस मनाया जाता है!',
  },
  'c5-10': {
    questionHi: 'बास्केटबॉल मैच में एक टीम के कितने खिलाड़ी कोर्ट पर खेलते हैं? 🏀',
    optionsHi: ['5', '6', '7', '11'],
    correctAnswerHi: '5',
    explanationHi: 'बास्केटबॉल मैच में हर टीम से 5-5 खिलाड़ी मैदान पर खेलते हैं!',
  },
  'c5-11': {
    questionHi: 'जापान देश की राजधानी कौन सी है? 🇯🇵',
    optionsHi: ['टोक्यो (Tokyo)', 'क्योटो', 'ओसाका', 'हिरोशिमा'],
    correctAnswerHi: 'टोक्यो (Tokyo)',
    explanationHi: 'टोक्यो जापान की एक आधुनिक और खूबसूरत राजधानी है!',
  },
  'c5-12': {
    questionHi: 'पृथ्वी की सबसे ऊपरी ठोस परत को क्या कहा जाता है जिस पर हम चलते हैं? 🌍',
    optionsHi: ['भूपर्पटी (Crust)', 'मेंटल (Mantle)', 'बाह्य कोर', 'आंतरिक कोर'],
    correctAnswerHi: 'भूपर्पटी (Crust)',
    explanationHi: 'क्रस्ट पृथ्वी की सबसे ऊपरी चट्टानी परत है जिस पर महाद्वीप और समुद्र स्थित हैं!',
  },
};

export const getLocalizedQuestion = (q: Question, lang: Language): Question => {
  if (lang !== 'hi') return q;
  if (q.questionHi && q.optionsHi && q.correctAnswerHi) {
    return {
      ...q,
      question: q.questionHi,
      options: q.optionsHi,
      correctAnswer: q.correctAnswerHi,
      explanation: q.explanationHi || q.explanation,
    };
  }
  const hi = HINDI_QUESTIONS_MAP[q.id];
  if (!hi) return q;
  return {
    ...q,
    question: hi.questionHi || q.question,
    options: hi.optionsHi || q.options,
    correctAnswer: hi.correctAnswerHi || q.correctAnswer,
    explanation: hi.explanationHi || q.explanation,
  };
};
