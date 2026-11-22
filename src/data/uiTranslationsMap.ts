import { Language } from '@/types/marketplace';

export interface BiTranslation {
  pa: string;
  hi: string;
}

export const EXACT_UI_TRANSLATIONS: Record<string, BiTranslation> = {
  // Brand & Global Navigation
  'Punjab': { pa: 'ਪੰਜਾਬ', hi: 'पंजाब' },
  'Services': { pa: 'ਸੇਵਾਵਾਂ', hi: 'सेवाएं' },
  'Punjab Services': { pa: 'ਪੰਜਾਬ ਸਰਵਿਸਿਜ਼', hi: 'पंजाब सर्विसेज' },
  'Local Home & Tech Services': { pa: 'ਸਥਾਨਕ ਘਰੇਲੂ ਅਤੇ ਤਕਨੀਕੀ ਸੇਵਾਵਾਂ', hi: 'स्थानीय घरेलू और तकनीकी सेवाएं' },
  'Home': { pa: 'ਮੁੱਖ ਪੰਨਾ', hi: 'होम' },
  'About Us': { pa: 'ਸਾਡੇ ਬਾਰੇ', hi: 'हमारे बारे में' },
  'How it Works': { pa: 'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ', hi: 'यह कैसे काम करता है' },
  'How It Works': { pa: 'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ', hi: 'यह कैसे काम करता है' },
  'For Professionals': { pa: 'ਪੇਸ਼ੇਵਰਾਂ ਲਈ', hi: 'प्रोफेशनल्स के लिए' },
  'Offers': { pa: 'ਆਫ਼ਰਾਂ', hi: 'ऑफ़र' },
  'Support': { pa: 'ਸਹਾਇਤਾ', hi: 'सहायता' },
  'Contact': { pa: 'ਸੰਪਰਕ', hi: 'संपर्क' },
  'Contact Us': { pa: 'ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ', hi: 'हमसे संपर्क करें' },
  'FAQ': { pa: 'ਆਮ ਸਵਾਲ', hi: 'सामान्य प्रश्न' },
  'Login': { pa: 'ਲੌਗਇਨ', hi: 'लॉगिन' },
  'Sign Up': { pa: 'ਸਾਈਨ ਅੱਪ', hi: 'साइन अप' },
  'My Account': { pa: 'ਮੇਰਾ ਖਾਤਾ', hi: 'मेरा खाता' },
  'Provider Portal': { pa: 'ਪ੍ਰੋਵਾਈਡਰ ਪੋਰਟਲ', hi: 'प्रोवाइडर पोर्टल' },
  'Admin Dashboard': { pa: 'ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ', hi: 'एडमिन डैशबोर्ड' },
  'Book Now': { pa: 'ਹੁਣੇ ਬੁੱਕ ਕਰੋ', hi: 'अभी बुक करें' },
  'Book a Service': { pa: 'ਸੇਵਾ ਬੁੱਕ ਕਰੋ', hi: 'सेवा बुक करें' },
  'Book a Service Now': { pa: 'ਹੁਣੇ ਸੇਵਾ ਬੁੱਕ ਕਰੋ', hi: 'अभी सेवा बुक करें' },
  'Book Any Service': { pa: 'ਕੋਈ ਵੀ ਸੇਵਾ ਬੁੱਕ ਕਰੋ', hi: 'कोई भी सेवा बुक करें' },
  'View All Services': { pa: 'ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਵੇਖੋ', hi: 'सभी सेवाएं देखें' },
  'Explore All Services': { pa: 'ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਵੇਖੋ', hi: 'सभी सेवाएं देखें' },
  'Find Services': { pa: 'ਸੇਵਾਵਾਂ ਲੱਭੋ', hi: 'सेवाएं खोजें' },
  'Search': { pa: 'ਖੋਜੋ', hi: 'खोजें' },
  'Search any service (e.g. Fan repair, Pipe leakage, Laptop OS...)': {
    pa: 'ਕੋਈ ਵੀ ਸੇਵਾ ਖੋਜੋ (ਜਿਵੇਂ ਪੱਖਾ ਰਿਪੇਅਰ, ਪਾਈਪ ਲੀਕੇਜ, ਲੈਪਟਾਪ...)',
    hi: 'कोई भी सेवा खोजें (जैसे पंखा रिपेयर, पाइप लीकेज, लैपटॉप...)',
  },
  'e.g. Fan repair, Pipe leakage, Laptop repair': {
    pa: 'ਜਿਵੇਂ ਪੱਖਾ ਰਿਪੇਅਰ, ਪਾਈਪ ਲੀਕੇਜ, ਲੈਪਟਾਪ ਰਿਪੇਅਰ',
    hi: 'जैसे पंखा रिपेयर, पाइप लीकेज, लैपटॉप रिपेयर',
  },
  'Select a Service': { pa: 'ਸੇਵਾ ਚੁਣੋ', hi: 'सेवा चुनें' },
  'Continue': { pa: 'ਅੱਗੇ ਵਧੋ', hi: 'आगे बढ़ें' },
  'Back': { pa: 'ਪਿੱਛੇ', hi: 'पीछे' },
  'Submit': { pa: 'ਜਮ੍ਹਾਂ ਕਰੋ', hi: 'सबमिट करें' },
  'Apply Filters': { pa: 'ਫਿਲਟਰ ਲਾਗੂ ਕਰੋ', hi: 'फ़िल्टर लागू करें' },
  'Clear All': { pa: 'ਸਭ ਸਾਫ਼ ਕਰੋ', hi: 'सभी साफ़ करें' },
  'Reset Filters': { pa: 'ਫਿਲਟਰ ਰੀਸੈੱਟ ਕਰੋ', hi: 'फ़िल्टर रीसेट करें' },
  'Change': { pa: 'ਬਦਲੋ', hi: 'बदलें' },

  // Cities
  'Mohali': { pa: 'ਮੋਹਾਲੀ', hi: 'मोहाली' },
  'Chandigarh': { pa: 'ਚੰਡੀਗੜ੍ਹ', hi: 'चंडीगढ़' },
  'Hoshiarpur': { pa: 'ਹੁਸ਼ਿਆਰਪੁਰ', hi: 'होशियारपुर' },

  // Vertical Groups
  'Home Services': { pa: 'ਘਰੇਲੂ ਸੇਵਾਵਾਂ', hi: 'घरेलू सेवाएं' },
  'Computer & Tech': { pa: 'ਕੰਪਿਊਟਰ ਅਤੇ ਤਕਨੀਕ', hi: 'कंप्यूटर और तकनीक' },
  'Vehicle & Roadside': { pa: 'ਵਾਹਨ ਅਤੇ ਰੋਡਸਾਈਡ', hi: 'वाहन और रोडसाइड' },
  'Other Services': { pa: 'ਹੋਰ ਸੇਵਾਵਾਂ', hi: 'अन्य सेवाएं' },
  'Home Services & Maintenance': { pa: 'ਘਰੇਲੂ ਸੇਵਾਵਾਂ ਅਤੇ ਰੱਖ-ਰਖਾਅ', hi: 'घरेलू सेवाएं और रखरखाव' },
  'Computer & Technology Services': { pa: 'ਕੰਪਿਊਟਰ ਅਤੇ ਤਕਨਾਲੋਜੀ ਸੇਵਾਵਾਂ', hi: 'कंप्यूटर और टेक्नोलॉजी सेवाएं' },
  'Vehicle & Roadside Assistance': { pa: 'ਵਾਹਨ ਅਤੇ ਰੋਡਸਾਈਡ ਸਹਾਇਤਾ', hi: 'वाहन और रोडसाइड सहायता' },
  'Other & Future Services': { pa: 'ਹੋਰ ਅਤੇ ਭਵਿੱਖ ਦੀਆਂ ਸੇਵਾਵਾਂ', hi: 'अन्य और भविष्य की सेवाएं' },

  // Homepage Sections
  'Serving Mohali, Chandigarh & Hoshiarpur': {
    pa: 'ਮੋਹਾਲੀ, ਚੰਡੀਗੜ੍ਹ ਅਤੇ ਹੁਸ਼ਿਆਰਪੁਰ ਵਿੱਚ ਸੇਵਾਵਾਂ',
    hi: 'मोहाली, चंडीगढ़ और होशियारपुर में सेवाएं',
  },
  'Find Trusted Professionals': { pa: 'ਆਪਣੇ ਨੇੜੇ ਭਰੋਸੇਯੋਗ ਪੇਸ਼ੇਵਰ', hi: 'अपने पास विश्वसनीय प्रोफेशनल्स' },
  'Near You': { pa: 'ਲੱਭੋ ਅਤੇ ਬੁੱਕ ਕਰੋ', hi: 'खोजें और बुक करें' },
  'Popular:': { pa: 'ਪ੍ਰਸਿੱਧ:', hi: 'लोकप्रिय:' },
  'Verified Professionals': { pa: 'ਪ੍ਰਮਾਣਿਤ ਪੇਸ਼ੇਵਰ', hi: 'सत्यापित प्रोफेशनल्स' },
  'Background checked & trusted': { pa: 'ਪਿਛੋਕੜ ਜਾਂਚੇ ਅਤੇ ਭਰੋਸੇਯੋਗ', hi: 'पृष्ठभूमि जांच और विश्वसनीय' },
  'Quick & Easy Booking': { pa: 'ਤੇਜ਼ ਅਤੇ ਆਸਾਨ ਬੁਕਿੰਗ', hi: 'तेज़ और आसान बुकिंग' },
  'Book in just a few clicks': { pa: 'ਸਿਰਫ਼ ਕੁਝ ਕਲਿੱਕਾਂ ਵਿੱਚ ਬੁੱਕ ਕਰੋ', hi: 'बस कुछ क्लिक में बुक करें' },
  'Transparent Pricing': { pa: 'ਪਾਰਦਰਸ਼ੀ ਕੀਮਤਾਂ', hi: 'पारदर्शी कीमतें' },
  'No hidden charges': { pa: 'ਕੋਈ ਲੁਕਵੇਂ ਖਰਚੇ ਨਹੀਂ', hi: 'कोई छिपे शुल्क नहीं' },
  'Local Support': { pa: 'ਸਥਾਨਕ ਸਹਾਇਤਾ', hi: 'स्थानीय सहायता' },
  'Real help, in your language': { pa: 'ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਅਸਲੀ ਮਦਦ', hi: 'आपकी भाषा में असली मदद' },
  'Our Services': { pa: 'ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ', hi: 'हमारी सेवाएं' },
  'Choose from a range of professional services at your doorstep': {
    pa: 'ਆਪਣੇ ਦਰਵਾਜ਼ੇ ਤੇ ਕਈ ਤਰ੍ਹਾਂ ਦੀਆਂ ਪੇਸ਼ੇਵਰ ਸੇਵਾਵਾਂ ਵਿੱਚੋਂ ਚੁਣੋ',
    hi: 'अपने दरवाजे पर कई पेशेवर सेवाओं में से चुनें',
  },
  'Get your work done in 4 simple steps': {
    pa: '4 ਆਸਾਨ ਕਦਮਾਂ ਵਿੱਚ ਆਪਣਾ ਕੰਮ ਕਰਵਾਓ',
    hi: '4 आसान चरणों में अपना काम करवाएं',
  },
  'Learn more about Hybrid Estimates & Safety →': {
    pa: 'ਹਾਈਬ੍ਰਿਡ ਅਨੁਮਾਨ ਅਤੇ ਸੁਰੱਖਿਆ ਬਾਰੇ ਹੋਰ ਜਾਣੋ →',
    hi: 'हाइब्रिड एस्टीमेट और सुरक्षा के बारे में और जानें →',
  },
  'Choose a Service': { pa: 'ਸੇਵਾ ਚੁਣੋ', hi: 'सेवा चुनें' },
  'Select what you need': { pa: 'ਚੁਣੋ ਕਿ ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ', hi: 'चुनें कि आपको क्या चाहिए' },
  'Book Instant or Scheduled': { pa: 'ਤੁਰੰਤ ਜਾਂ ਤੈਅ ਸਮੇਂ ਤੇ ਬੁੱਕ ਕਰੋ', hi: 'तुरंत या शेड्यूल बुकिंग करें' },
  'Pick a convenient time slot': { pa: 'ਆਪਣੀ ਸਹੂਲਤ ਅਨੁਸਾਰ ਸਮਾਂ ਚੁਣੋ', hi: 'अपनी सुविधा का समय चुनें' },
  'Approve Upfront Estimate': { pa: 'ਪਹਿਲਾਂ ਅਨੁਮਾਨ ਮਨਜ਼ੂਰ ਕਰੋ', hi: 'पहले एस्टीमेट मंज़ूर करें' },
  'Inspect first, approve digital quote': {
    pa: 'ਪਹਿਲਾਂ ਜਾਂਚ, ਫਿਰ ਡਿਜੀਟਲ ਕੋਟ ਮਨਜ਼ੂਰ ਕਰੋ',
    hi: 'पहले जांच, फिर डिजिटल कोट मंज़ूर करें',
  },
  'Pay & Leave a Review': { pa: 'ਭੁਗਤਾਨ ਕਰੋ ਅਤੇ ਰਿਵਿਊ ਦਿਓ', hi: 'भुगतान करें और रिव्यू दें' },
  'Pay securely & rate the service': {
    pa: 'ਸੁਰੱਖਿਅਤ ਭੁਗਤਾਨ ਕਰੋ ਅਤੇ ਸੇਵਾ ਨੂੰ ਰੇਟ ਕਰੋ',
    hi: 'सुरक्षित भुगतान करें और सेवा को रेट करें',
  },
  'Why Choose Punjab Services?': {
    pa: 'ਪੰਜਾਬ ਸਰਵਿਸਿਜ਼ ਕਿਉਂ ਚੁਣੋ?',
    hi: 'पंजाब सर्विसेज क्यों चुनें?',
  },
  'A trusted platform for your home and device repair needs.': {
    pa: 'ਤੁਹਾਡੇ ਘਰ ਅਤੇ ਡਿਵਾਈਸ ਰਿਪੇਅਰ ਦੀਆਂ ਲੋੜਾਂ ਲਈ ਭਰੋਸੇਯੋਗ ਪਲੇਟਫਾਰਮ।',
    hi: 'आपके घर और डिवाइस रिपेयर की जरूरतों के लिए एक विश्वसनीय प्लेटफॉर्म।',
  },
  'Featured Professionals': { pa: 'ਪ੍ਰਮੁੱਖ ਪੇਸ਼ੇਵਰ', hi: 'प्रमुख प्रोफेशनल्स' },
  'Top-rated verified technicians ready to help you today': {
    pa: 'ਅੱਜ ਤੁਹਾਡੀ ਮਦਦ ਲਈ ਤਿਆਰ ਪ੍ਰਮਾਣਿਤ ਤਕਨੀਸ਼ੀਅਨ',
    hi: 'आज आपकी मदद के लिए तैयार सत्यापित तकनीशियन',
  },
  'View Profile': { pa: 'ਪ੍ਰੋਫਾਈਲ ਵੇਖੋ', hi: 'प्रोफ़ाइल देखें' },
  'What Our Customers Say': { pa: 'ਸਾਡੇ ਗਾਹਕ ਕੀ ਕਹਿੰਦੇ ਹਨ', hi: 'हमारे ग्राहक क्या कहते हैं' },
  'Real experiences from our happy customers across Punjab.': {
    pa: 'ਪੰਜਾਬ ਭਰ ਦੇ ਸਾਡੇ ਖੁਸ਼ ਗਾਹਕਾਂ ਦੇ ਅਸਲੀ ਤਜਰਬੇ।',
    hi: 'पंजाब भर के हमारे खुश ग्राहकों के असली अनुभव।',
  },
  'Hyperlocal Launch Markets in Punjab & Tricity': {
    pa: 'ਪੰਜਾਬ ਅਤੇ ਟਰਾਈਸਿਟੀ ਵਿੱਚ ਹਾਈਪਰਲੋਕਲ ਲਾਂਚ ਬਾਜ਼ਾਰ',
    hi: 'पंजाब और ट्राइसिटी में हाइपरलोकल लॉन्च बाज़ार',
  },
  'Select your city to explore localized professionals, sector-wise coverage, and same-day availability.': {
    pa: 'ਸਥਾਨਕ ਪੇਸ਼ੇਵਰ, ਸੈਕਟਰ-ਵਾਰ ਕਵਰੇਜ ਅਤੇ ਉਸੇ ਦਿਨ ਦੀ ਉਪਲਬਧਤਾ ਵੇਖਣ ਲਈ ਆਪਣਾ ਸ਼ਹਿਰ ਚੁਣੋ।',
    hi: 'स्थानीय प्रोफेशनल्स, सेक्टर-वार कवरेज और सेम-डे उपलब्धता देखने के लिए अपना शहर चुनें।',
  },
  'Set as Active City': { pa: 'ਐਕਟਿਵ ਸ਼ਹਿਰ ਸੈੱਟ ਕਰੋ', hi: 'सक्रिय शहर चुनें' },
  'Selected': { pa: 'ਚੁਣਿਆ ਗਿਆ', hi: 'चयनित' },
  'Are You a Skilled Professional?': {
    pa: 'ਕੀ ਤੁਸੀਂ ਇੱਕ ਹੁਨਰਮੰਦ ਪੇਸ਼ੇਵਰ ਹੋ?',
    hi: 'क्या आप एक कुशल प्रोफेशनल हैं?',
  },
  'Grow your business, get more customers and earn consistently with Punjab Services.': {
    pa: 'ਪੰਜਾਬ ਸਰਵਿਸਿਜ਼ ਨਾਲ ਆਪਣਾ ਕਾਰੋਬਾਰ ਵਧਾਓ, ਵੱਧ ਗਾਹਕ ਪਾਓ ਅਤੇ ਲਗਾਤਾਰ ਕਮਾਈ ਕਰੋ।',
    hi: 'पंजाब सर्विसेज के साथ अपना व्यापार बढ़ाएं, अधिक ग्राहक पाएं और नियमित कमाई करें।',
  },
  'Get genuine service requests': { pa: 'ਅਸਲੀ ਸੇਵਾ ਬੇਨਤੀਆਂ ਪ੍ਰਾਪਤ ਕਰੋ', hi: 'असली सेवा अनुरोध प्राप्त करें' },
  'Work in your preferred area': { pa: 'ਆਪਣੇ ਪਸੰਦੀਦਾ ਖੇਤਰ ਵਿੱਚ ਕੰਮ ਕਰੋ', hi: 'अपने पसंदीदा क्षेत्र में काम करें' },
  'Transparent payouts': { pa: 'ਪਾਰਦਰਸ਼ੀ ਭੁਗਤਾਨ', hi: 'पारदर्शी भुगतान' },
  'Build your professional reputation': { pa: 'ਆਪਣੀ ਪੇਸ਼ੇਵਰ ਸਾਖ ਬਣਾਓ', hi: 'अपनी पेशेवर प्रतिष्ठा बनाएं' },
  'Join as a Partner': { pa: 'ਪਾਰਟਨਰ ਵਜੋਂ ਜੁੜੋ', hi: 'पार्टनर के रूप में जुड़ें' },
  'Explore Partner Benefits & Eligibility →': {
    pa: 'ਪਾਰਟਨਰ ਲਾਭ ਅਤੇ ਯੋਗਤਾ ਵੇਖੋ →',
    hi: 'पार्टनर लाभ और पात्रता देखें →',
  },

  // Services Page & Subcategory Directory
  'All Doorstep Services': { pa: 'ਸਾਰੀਆਂ ਘਰੇਲੂ ਸੇਵਾਵਾਂ', hi: 'सभी डोरस्टेप सेवाएं' },
  'Filter Services': { pa: 'ਸੇਵਾਵਾਂ ਫਿਲਟਰ ਕਰੋ', hi: 'सेवाएं फ़िल्टर करें' },
  'City': { pa: 'ਸ਼ਹਿਰ', hi: 'शहर' },
  'Service Vertical': { pa: 'ਸੇਵਾ ਵਰਗ', hi: 'सेवा वर्ग' },
  'Service Category': { pa: 'ਸੇਵਾ ਸ਼੍ਰੇਣੀ', hi: 'सेवा श्रेणी' },
  'Availability': { pa: 'ਉਪਲਬਧਤਾ', hi: 'उपलब्धता' },
  'Rating': { pa: 'ਰੇਟਿੰਗ', hi: 'रेटिंग' },
  'Sort By': { pa: 'ਕ੍ਰਮਬੱਧ ਕਰੋ', hi: 'क्रमबद्ध करें' },
  'Most Popular': { pa: 'ਸਭ ਤੋਂ ਪ੍ਰਸਿੱਧ', hi: 'सबसे लोकप्रिय' },
  'Visiting Fee: Low to High': { pa: 'ਵਿਜ਼ਿਟਿੰਗ ਫੀਸ: ਘੱਟ ਤੋਂ ਵੱਧ', hi: 'विज़िटिंग शुल्क: कम से अधिक' },
  'Most Verified Professionals': { pa: 'ਸਭ ਤੋਂ ਵੱਧ ਪ੍ਰਮਾਣਿਤ ਪੇਸ਼ੇਵਰ', hi: 'सबसे अधिक सत्यापित प्रोफेशनल्स' },
  'Browse Services': { pa: 'ਸੇਵਾਵਾਂ ਵੇਖੋ', hi: 'सेवाएं ब्राउज़ करें' },
  'Explore our service categories and book the right professional for your needs.': {
    pa: 'ਸਾਡੀਆਂ ਸੇਵਾ ਸ਼੍ਰੇਣੀਆਂ ਵੇਖੋ ਅਤੇ ਆਪਣੀ ਲੋੜ ਅਨੁਸਾਰ ਸਹੀ ਪੇਸ਼ੇਵਰ ਬੁੱਕ ਕਰੋ।',
    hi: 'हमारी सेवा श्रेणियां देखें और अपनी ज़रूरत के अनुसार सही प्रोफेशनल बुक करें।',
  },
  'Featured Service': { pa: 'ਪ੍ਰਮੁੱਖ ਸੇਵਾ', hi: 'प्रमुख सेवा' },
  'Verified Pros': { pa: 'ਪ੍ਰਮਾਣਿਤ ਪੇਸ਼ੇਵਰ', hi: 'सत्यापित प्रोफेशनल्स' },
  'Fast Response': { pa: 'ਤੇਜ਼ ਜਵਾਬ', hi: 'त्वरित प्रतिक्रिया' },
  'On-site Service': { pa: 'ਘਰ ਤੇ ਸੇਵਾ', hi: 'ऑन-साइट सेवा' },
  'Popular Services': { pa: 'ਪ੍ਰਸਿੱਧ ਸੇਵਾਵਾਂ', hi: 'लोकप्रिय सेवाएं' },
  'Most booked services by customers in your area — hover any service to pause.': {
    pa: 'ਤੁਹਾਡੇ ਖੇਤਰ ਵਿੱਚ ਗਾਹਕਾਂ ਵੱਲੋਂ ਸਭ ਤੋਂ ਵੱਧ ਬੁੱਕ ਕੀਤੀਆਂ ਸੇਵਾਵਾਂ — ਰੋਕਣ ਲਈ ਮਾਊਸ ਰੱਖੋ।',
    hi: 'आपके क्षेत्र में ग्राहकों द्वारा सबसे अधिक बुक की गई सेवाएं — रोकने के लिए होवर करें।',
  },
  'Click any specialized service below to view problems covered, upfront visiting charges, FAQs, and available technicians.': {
    pa: 'ਕਵਰ ਕੀਤੀਆਂ ਸਮੱਸਿਆਵਾਂ, ਵਿਜ਼ਿਟਿੰਗ ਫੀਸ, ਸਵਾਲ-ਜਵਾਬ ਅਤੇ ਉਪਲਬਧ ਤਕਨੀਸ਼ੀਅਨ ਵੇਖਣ ਲਈ ਹੇਠਾਂ ਕਿਸੇ ਵੀ ਸੇਵਾ ਤੇ ਕਲਿੱਕ ਕਰੋ।',
    hi: 'कवर की गई समस्याएं, विज़िटिंग शुल्क, प्रश्न और उपलब्ध तकनीशियन देखने के लिए नीचे किसी भी सेवा पर क्लिक करें।',
  },

  // Status & Common Badges
  'Coming Soon': { pa: 'ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ', hi: 'जल्द आ रहा है' },
  'Bookings Paused': { pa: 'ਬੁਕਿੰਗ ਅਸਥਾਈ ਤੌਰ ਤੇ ਬੰਦ', hi: 'बुकिंग अस्थायी रूप से रोकी गई' },
  'Soon': { pa: 'ਜਲਦੀ', hi: 'जल्द' },
  'Verified': { pa: 'ਪ੍ਰਮਾਣਿਤ', hi: 'सत्यापित' },
  'Available Today': { pa: 'ਅੱਜ ਉਪਲਬਧ', hi: 'आज उपलब्ध' },
  'Same Day Service': { pa: 'ਉਸੇ ਦਿਨ ਸੇਵਾ', hi: 'सेम-डे सेवा' },
  'Instant Booking': { pa: 'ਤੁਰੰਤ ਬੁਕਿੰਗ', hi: 'तुरंत बुकिंग' },
  'Standard Inspection / Visit Charge': {
    pa: 'ਮਿਆਰੀ ਜਾਂਚ / ਵਿਜ਼ਿਟ ਚਾਰਜ',
    hi: 'मानक निरीक्षण / विज़िट शुल्क',
  },

  // Booking Wizard
  'Select the service and specific requirement': {
    pa: 'ਸੇਵਾ ਅਤੇ ਆਪਣੀ ਖਾਸ ਲੋੜ ਚੁਣੋ',
    hi: 'सेवा और अपनी विशिष्ट आवश्यकता चुनें',
  },
  'Select Service Type': { pa: 'ਸੇਵਾ ਦੀ ਕਿਸਮ ਚੁਣੋ', hi: 'सेवा का प्रकार चुनें' },
  'Describe Your Requirement': { pa: 'ਆਪਣੀ ਲੋੜ ਦੱਸੋ', hi: 'अपनी आवश्यकता बताएं' },
  'Tell us what work you need, add photos for a quicker and accurate estimate.': {
    pa: 'ਦੱਸੋ ਕਿ ਤੁਹਾਨੂੰ ਕਿਹੜਾ ਕੰਮ ਚਾਹੀਦਾ ਹੈ, ਤੇਜ਼ ਅਤੇ ਸਹੀ ਅਨੁਮਾਨ ਲਈ ਫੋਟੋਆਂ ਸ਼ਾਮਲ ਕਰੋ।',
    hi: 'बताएं कि आपको कौन सा काम चाहिए, तेज़ और सटीक एस्टीमेट के लिए फ़ोटो जोड़ें।',
  },
  'Your Requirement': { pa: 'ਤੁਹਾਡੀ ਲੋੜ', hi: 'आपकी आवश्यकता' },
  'Add Photos (Optional)': { pa: 'ਫੋਟੋਆਂ ਸ਼ਾਮਲ ਕਰੋ (ਵਿਕਲਪਿਕ)', hi: 'फ़ोटो जोड़ें (वैकल्पिक)' },
  'Service Address': { pa: 'ਸੇਵਾ ਦਾ ਪਤਾ', hi: 'सेवा का पता' },
  'Where do you need the service?': {
    pa: 'ਤੁਹਾਨੂੰ ਸੇਵਾ ਕਿੱਥੇ ਚਾਹੀਦੀ ਹੈ?',
    hi: 'आपको सेवा कहाँ चाहिए?',
  },
  'Confirm Booking': { pa: 'ਬੁਕਿੰਗ ਪੱਕੀ ਕਰੋ', hi: 'बुकिंग कन्फर्म करें' },

  // Footer
  'Quick Links': { pa: 'ਤੇਜ਼ ਲਿੰਕ', hi: 'त्वरित लिंक' },
  'Service Cities': { pa: 'ਸੇਵਾ ਸ਼ਹਿਰ', hi: 'सेवा शहर' },
  'Legal & Policies': { pa: 'ਕਾਨੂੰਨੀ ਅਤੇ ਨੀਤੀਆਂ', hi: 'कानूनी और नीतियां' },
  'Newsletter & Updates': { pa: 'ਨਿਊਜ਼ਲੈਟਰ ਅਤੇ ਅੱਪਡੇਟ', hi: 'न्यूज़लेटर और अपडेट' },
  'Subscribe': { pa: 'ਸਬਸਕ੍ਰਾਈਬ ਕਰੋ', hi: 'सब्सक्राइब करें' },
  'Terms & Conditions': { pa: 'ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ', hi: 'नियम और शर्तें' },
  'Privacy Policy': { pa: 'ਗੋਪਨੀਯਤਾ ਨੀਤੀ', hi: 'गोपनीयता नीति' },
  'Cancellation & Refund Policy': { pa: 'ਰੱਦ ਕਰਨ ਅਤੇ ਰਿਫੰਡ ਨੀਤੀ', hi: 'रद्दीकरण और रिफंड नीति' },
  'Refund & Cancellation': { pa: 'ਰਿਫੰਡ ਅਤੇ ਰੱਦ ਕਰਨ ਦੀ ਨੀਤੀ', hi: 'रिफंड और रद्दीकरण' },
  'Provider Terms': { pa: 'ਪ੍ਰੋਵਾਈਡਰ ਨਿਯਮ', hi: 'प्रोवाइडर नियम' },
  'Community Guidelines': { pa: 'ਭਾਈਚਾਰਕ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼', hi: 'समुदाय दिशानिर्देश' },
  'Sitemap': { pa: 'ਸਾਈਟਮੈਪ', hi: 'साइटमैप' },

  // Homepage Steps, Why Choose & Top Pros
  'Find a Professional': { pa: 'ਪੇਸ਼ੇਵਰ ਲੱਭੋ', hi: 'प्रोफेशनल खोजें' },
  'See nearby, verified experts': { pa: 'ਨੇੜਲੇ ਪ੍ਰਮਾਣਿਤ ਮਾਹਿਰ ਵੇਖੋ', hi: 'पास के सत्यापित विशेषज्ञ देखें' },
  'Book & Confirm': { pa: 'ਬੁੱਕ ਅਤੇ ਪੱਕਾ ਕਰੋ', hi: 'बुक और कन्फर्म करें' },
  'Book now or schedule later': { pa: 'ਹੁਣੇ ਬੁੱਕ ਕਰੋ ਜਾਂ ਬਾਅਦ ਲਈ ਤੈਅ ਕਰੋ', hi: 'अभी बुक करें या बाद के लिए शेड्यूल करें' },
  'Get It Done': { pa: 'ਕੰਮ ਕਰਵਾਓ', hi: 'काम पूरा करवाएं' },
  'Work completed, pay & rate': { pa: 'ਕੰਮ ਪੂਰਾ, ਭੁਗਤਾਨ ਅਤੇ ਰੇਟਿੰਗ', hi: 'काम पूरा, भुगतान और रेटिंग' },
  'Trusted & Verified Professionals': { pa: 'ਭਰੋਸੇਯੋਗ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਪੇਸ਼ੇਵਰ', hi: 'विश्वसनीय और सत्यापित प्रोफेशनल्स' },
  'Fast Response & On-Time Service': { pa: 'ਤੇਜ਼ ਜਵਾਬ ਅਤੇ ਸਮੇਂ ਤੇ ਸੇਵਾ', hi: 'तेज़ प्रतिक्रिया और समय पर सेवा' },
  'Fair & Transparent Pricing': { pa: 'ਸਹੀ ਅਤੇ ਪਾਰਦਰਸ਼ੀ ਕੀਮਤਾਂ', hi: 'उचित और पारदर्शी कीमतें' },
  'Safe & Secure Booking': { pa: 'ਸੁਰੱਖਿਅਤ ਬੁਕਿੰਗ', hi: 'सुरक्षित बुकिंग' },
  'Multilingual Support': { pa: 'ਬਹੁ-ਭਾਸ਼ਾਈ ਸਹਾਇਤਾ', hi: 'बहुभाषी सहायता' },
  'English, Punjabi & Hindi': { pa: 'ਅੰਗਰੇਜ਼ੀ, ਪੰਜਾਬੀ ਅਤੇ ਹਿੰਦੀ', hi: 'अंग्रेजी, पंजाबी और हिंदी' },
  'Rated by Local Customers': { pa: 'ਸਥਾਨਕ ਗਾਹਕਾਂ ਵੱਲੋਂ ਰੇਟਡ', hi: 'स्थानीय ग्राहकों द्वारा रेटेड' },
  'Top Rated Professionals Near You': { pa: 'ਤੁਹਾਡੇ ਨੇੜੇ ਸਿਖਰਲੇ ਪ੍ਰਮਾਣਿਤ ਪੇਸ਼ੇਵਰ', hi: 'आपके पास शीर्ष रेटेड प्रोफेशनल्स' },
  'Highly rated and trusted service experts in your area.': {
    pa: 'ਤੁਹਾਡੇ ਖੇਤਰ ਵਿੱਚ ਉੱਚ ਰੇਟਿੰਗ ਵਾਲੇ ਭਰੋਸੇਯੋਗ ਸੇਵਾ ਮਾਹਿਰ।',
    hi: 'आपके क्षेत्र में उच्च रेटेड और विश्वसनीय सेवा विशेषज्ञ।',
  },
  'View All Professionals': { pa: 'ਸਾਰੇ ਪੇਸ਼ੇਵਰ ਵੇਖੋ', hi: 'सभी प्रोफेशनल्स देखें' },

  // Footer Exact Strings
  'Your trusted hyperlocal platform to discover, compare, and book verified electricians, plumbers, carpenters, laptop and mobile repair specialists at your doorstep.': {
    pa: 'ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ ਤੇ ਪ੍ਰਮਾਣਿਤ ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ, ਪਲੰਬਰ, ਤਰਖਾਣ, ਲੈਪਟਾਪ ਅਤੇ ਮੋਬਾਈਲ ਰਿਪੇਅਰ ਮਾਹਿਰ ਲੱਭਣ ਅਤੇ ਬੁੱਕ ਕਰਨ ਲਈ ਤੁਹਾਡਾ ਭਰੋਸੇਯੋਗ ਹਾਈਪਰਲੋਕਲ ਪਲੇਟਫਾਰਮ।',
    hi: 'अपने दरवाजे पर सत्यापित इलेक्ट्रीशियन, प्लंबर, कारपेंटर, लैपटॉप और मोबाइल रिपेयर विशेषज्ञ खोजने और बुक करने का आपका विश्वसनीय हाइपरलोकल प्लेटफॉर्म।',
  },
  'Latest Updates': { pa: 'ਤਾਜ਼ਾ ਅੱਪਡੇਟ', hi: 'ताज़ा अपडेट' },
  'Enter email': { pa: 'ਈਮੇਲ ਦਰਜ ਕਰੋ', hi: 'ईमेल दर्ज करें' },
  'Seasonal offers & Tricity updates.': {
    pa: 'ਮੌਸਮੀ ਆਫ਼ਰ ਅਤੇ ਟਰਾਈਸਿਟੀ ਅੱਪਡੇਟ।',
    hi: 'मौसमी ऑफ़र और ट्राइसिटी अपडेट।',
  },
  'All Services': { pa: 'ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ', hi: 'सभी सेवाएं' },
  'Offers & Deals': { pa: 'ਆਫ਼ਰ ਅਤੇ ਡੀਲਾਂ', hi: 'ऑफ़र और डील्स' },
  'Electrician Services': { pa: 'ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ ਸੇਵਾਵਾਂ', hi: 'इलेक्ट्रीशियन सेवाएं' },
  'Plumber Services': { pa: 'ਪਲੰਬਰ ਸੇਵਾਵਾਂ', hi: 'प्लंबर सेवाएं' },
  'Carpenter Services': { pa: 'ਤਰਖਾਣ ਸੇਵਾਵਾਂ', hi: 'कारपेंटर सेवाएं' },
  'Computer / Laptop Repair': { pa: 'ਕੰਪਿਊਟਰ / ਲੈਪਟਾਪ ਰਿਪੇਅਰ', hi: 'कंप्यूटर / लैपटॉप रिपेयर' },
  'Mobile Repair': { pa: 'ਮੋਬਾਈਲ ਰਿਪੇਅਰ', hi: 'मोबाइल रिपेयर' },
  'Search Professionals': { pa: 'ਪੇਸ਼ੇਵਰ ਖੋਜੋ', hi: 'प्रोफेशनल्स खोजें' },
  'Help Center': { pa: 'ਮਦਦ ਕੇਂਦਰ', hi: 'सहायता केंद्र' },
  'FAQs': { pa: 'ਆਮ ਸਵਾਲ', hi: 'सामान्य प्रश्न' },
  'Track Booking': { pa: 'ਬੁਕਿੰਗ ਟਰੈਕ ਕਰੋ', hi: 'बुकिंग ट्रैक करें' },
  'Launch Cities': { pa: 'ਲਾਂਚ ਸ਼ਹਿਰ', hi: 'लॉन्च शहर' },
  '© 2026 Punjab Services. All Rights Reserved.': {
    pa: '© 2026 ਪੰਜਾਬ ਸਰਵਿਸਿਜ਼। ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।',
    hi: '© 2026 पंजाब सर्विसेज। सर्वाधिकार सुरक्षित।',
  },

  // Services Page & Sub-pages Common UI
  'LIVE': { pa: 'ਲਾਈਵ', hi: 'लाइव' },
  'All': { pa: 'ਸਭ', hi: 'सभी' },
  'Explore': { pa: 'ਵੇਖੋ', hi: 'देखें' },
  'Book': { pa: 'ਬੁੱਕ ਕਰੋ', hi: 'बुक करें' },
  'Filter': { pa: 'ਫਿਲਟਰ', hi: 'फ़िल्टर' },
  'Filters': { pa: 'ਫਿਲਟਰ', hi: 'फ़िल्टर' },
  'Reset': { pa: 'ਰੀਸੈੱਟ', hi: 'रीसेट' },
  'Close': { pa: 'ਬੰਦ ਕਰੋ', hi: 'बंद करें' },
  'Cancel': { pa: 'ਰੱਦ ਕਰੋ', hi: 'रद्द करें' },
  'Save': { pa: 'ਸੁਰੱਖਿਅਤ ਕਰੋ', hi: 'सेव करें' },
  'Reviews': { pa: 'ਰਿਵਿਊ', hi: 'रिव्यू' },
  'Experience': { pa: 'ਤਜਰਬਾ', hi: 'अनुभव' },
  'Visiting Charge': { pa: 'ਵਿਜ਼ਿਟਿੰਗ ਫੀਸ', hi: 'विज़िटिंग शुल्क' },
  'Electrician': { pa: 'ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ', hi: 'इलेक्ट्रीशियन' },
  'Plumber': { pa: 'ਪਲੰਬਰ', hi: 'प्लंबर' },
  'Carpenter': { pa: 'ਤਰਖਾਣ', hi: 'कारपेंटर' },
  'Painting': { pa: 'ਪੇਂਟਿੰਗ', hi: 'पेंटिंग' },
  'Pest Control': { pa: 'ਪੈਸਟ ਕੰਟਰੋਲ', hi: 'पेस्ट कंट्रोल' },
  'Appliance Repair': { pa: 'ਉਪਕਰਨ ਰਿਪੇਅਰ', hi: 'अप्लायंस रिपेयर' },
  'AC Repair & Servicing': { pa: 'ਏ.ਸੀ. ਰਿਪੇਅਰ ਅਤੇ ਸਰਵਿਸਿੰਗ', hi: 'एसी रिपेयर और सर्विसिंग' },
  'Home & Deep Cleaning': { pa: 'ਘਰ ਅਤੇ ਡੀਪ ਕਲੀਨਿੰਗ', hi: 'होम और डीप क्लीनिंग' },
  'Packers & Movers': { pa: 'ਪੈਕਰਸ ਅਤੇ ਮੂਵਰਸ', hi: 'पैकर्स और मूवर्स' },
  'Water Purifier Repair': { pa: 'ਵਾਟਰ ਪਿਊਰੀਫਾਇਰ ਰਿਪੇਅਰ', hi: 'वाटर प्यूरीफायर रिपेयर' },
  'Roadside Assistance': { pa: 'ਰੋਡਸਾਈਡ ਸਹਾਇਤਾ', hi: 'रोडसाइड सहायता' },
  'Vehicle Repair & Servicing': { pa: 'ਵਾਹਨ ਰਿਪੇਅਰ ਅਤੇ ਸਰਵਿਸਿੰਗ', hi: 'वाहन रिपेयर और सर्विसिंग' },
  'CCTV & Networking': { pa: 'ਸੀ.ਸੀ.ਟੀ.ਵੀ. ਅਤੇ ਨੈੱਟਵਰਕਿੰਗ', hi: 'सीसीटीवी और नेटवर्किंग' },
  'Other Local Home Services': { pa: 'ਹੋਰ ਸਥਾਨਕ ਘਰੇਲੂ ਸੇਵਾਵਾਂ', hi: 'अन्य स्थानीय घरेलू सेवाएं' },
};

const CITY_NAME_TRANSLATIONS: Record<string, BiTranslation> = {
  mohali: { pa: 'ਮੋਹਾਲੀ', hi: 'मोहाली' },
  chandigarh: { pa: 'ਚੰਡੀਗੜ੍ਹ', hi: 'चंडीगढ़' },
  hoshiarpur: { pa: 'ਹੁਸ਼ਿਆਰਪੁਰ', hi: 'होशियारपुर' },
};

export function translateUiString(raw: string, language: Language): string {
  if (language === 'en') return raw;
  const trimmed = raw.trim();
  if (!trimmed) return raw;

  const leading = raw.slice(0, raw.indexOf(trimmed));
  const trailing = raw.slice(raw.indexOf(trimmed) + trimmed.length);

  // 1. Direct dictionary lookup
  const exact = EXACT_UI_TRANSLATIONS[trimmed];
  if (exact) {
    return `${leading}${exact[language]}${trailing}`;
  }

  // 2. Dynamic patterns with counts, prices, and city/category names
  let m: RegExpMatchArray | null = null;

  if ((m = trimmed.match(/^(\d+)\s+Live Categories in\s+(.+)$/i))) {
    const cityKey = m[2].toLowerCase();
    const cityLabel = CITY_NAME_TRANSLATIONS[cityKey]?.[language] || m[2];
    const out =
      language === 'pa'
        ? `${cityLabel} ਵਿੱਚ ${m[1]} ਲਾਈਵ ਸ਼੍ਰੇਣੀਆਂ`
        : `${m[2] && cityLabel} में ${m[1]} लाइव श्रेणियां`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^(\d+)\s+Verified Pros$/i))) {
    const out =
      language === 'pa' ? `${m[1]} ਪ੍ਰਮਾਣਿਤ ਪੇਸ਼ੇਵਰ` : `${m[1]} सत्यापित प्रोफेशनल्स`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^₹(\d+)\s+Visit$/i))) {
    const out = language === 'pa' ? `₹${m[1]} ਵਿਜ਼ਿਟ` : `₹${m[1]} विज़िट`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^Visit\s+₹(\d+)$/i))) {
    const out = language === 'pa' ? `ਵਿਜ਼ਿਟ ₹${m[1]}` : `विज़िट ₹${m[1]}`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^₹(\d+)\s+Visit\s*•\s*(\d+)\s+Pros$/i))) {
    const out =
      language === 'pa'
        ? `₹${m[1]} ਵਿਜ਼ਿਟ • ${m[2]} ਪੇਸ਼ੇਵਰ`
        : `₹${m[1]} विज़िट • ${m[2]} प्रोफेशनल्स`;
    return `${leading}${out}${trailing}`;
  }

  if (
    (m = trimmed.match(
      /^Base Visiting Charge:\s*₹(\d+)\s*•\s*(\d+)\s+Verified Professionals$/i
    ))
  ) {
    const out =
      language === 'pa'
        ? `ਮੁੱਢਲੀ ਵਿਜ਼ਿਟ ਫੀਸ: ₹${m[1]} • ${m[2]} ਪ੍ਰਮਾਣਿਤ ਪੇਸ਼ੇਵਰ`
        : `बेस विज़िटिंग शुल्क: ₹${m[1]} • ${m[2]} सत्यापित प्रोफेशनल्स`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^All Verticals\s*\((\d+)\)$/i))) {
    const out =
      language === 'pa' ? `ਸਾਰੇ ਵਰਗ (${m[1]})` : `सभी वर्ग (${m[1]})`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^Home Services\s*\((\d+)\)$/i))) {
    const out =
      language === 'pa' ? `ਘਰੇਲੂ ਸੇਵਾਵਾਂ (${m[1]})` : `घरेलू सेवाएं (${m[1]})`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^Computer & Tech\s*\((\d+)\)$/i))) {
    const out =
      language === 'pa' ? `ਕੰਪਿਊਟਰ ਅਤੇ ਤਕਨੀਕ (${m[1]})` : `कंप्यूटर और तकनीक (${m[1]})`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^Vehicle & Roadside\s*\((\d+)\)$/i))) {
    const out =
      language === 'pa' ? `ਵਾਹਨ ਅਤੇ ਰੋਡਸਾਈਡ (${m[1]})` : `वाहन और रोडसाइड (${m[1]})`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^Other Services\s*\((\d+)\)$/i))) {
    const out =
      language === 'pa' ? `ਹੋਰ ਸੇਵਾਵਾਂ (${m[1]})` : `अन्य सेवाएं (${m[1]})`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^Browse All\s+(\d+)\s+Categories\s*&\s*(\d+)\s+Services$/i))) {
    const out =
      language === 'pa'
        ? `ਸਾਰੀਆਂ ${m[1]} ਸ਼੍ਰੇਣੀਆਂ ਅਤੇ ${m[2]} ਸੇਵਾਵਾਂ ਵੇਖੋ`
        : `सभी ${m[1]} श्रेणियां और ${m[2]} सेवाएं देखें`;
    return `${leading}${out}${trailing}`;
  }

  if (
    (m = trimmed.match(
      /^Complete Specialized Subcategory Directory\s*\((\d+)\s+Services\)$/i
    ))
  ) {
    const out =
      language === 'pa'
        ? `ਪੂਰੀ ਵਿਸ਼ੇਸ਼ ਸੇਵਾ ਡਾਇਰੈਕਟਰੀ (${m[1]} ਸੇਵਾਵਾਂ)`
        : `पूर्ण विशिष्ट सेवा निर्देशिका (${m[1]} सेवाएं)`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^STAGE\s+(\d+)$/i))) {
    const out = language === 'pa' ? `ਪੜਾਅ ${m[1]}` : `चरण ${m[1]}`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^View\s+(.+)\s+Listing Page$/i))) {
    const out =
      language === 'pa' ? `${m[1]} ਸੂਚੀ ਪੰਨਾ ਵੇਖੋ` : `${m[1]} लिस्टिंग पेज देखें`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^(.+)\s+Subcategories$/i))) {
    const out =
      language === 'pa' ? `${m[1]} ਉਪ-ਸ਼੍ਰੇਣੀਆਂ` : `${m[1]} उप-श्रेणियां`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^Explore\s+(.+)\s+Hub$/i))) {
    const out =
      language === 'pa' ? `${m[1]} ਹੱਬ ਵੇਖੋ` : `${m[1]} हब देखें`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^Explore\s+(.+)$/i))) {
    const label = EXACT_UI_TRANSLATIONS[m[1]]?.[language] || m[1];
    const out =
      language === 'pa' ? `${label} ਵੇਖੋ` : `${label} देखें`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^\((\d+)\s+reviews\)$/i))) {
    const out =
      language === 'pa' ? `(${m[1]} ਰਿਵਿਊ)` : `(${m[1]} रिव्यू)`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^(\d+)\+\s*yrs\s*exp$/i))) {
    const out =
      language === 'pa' ? `${m[1]}+ ਸਾਲ ਤਜਰਬਾ` : `${m[1]}+ वर्ष अनुभव`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^Visit:\s*₹(\d+)$/i))) {
    const out =
      language === 'pa' ? `ਵਿਜ਼ਿਟ: ₹${m[1]}` : `विज़िट: ₹${m[1]}`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^\+(\d+)\s+more$/i))) {
    const out =
      language === 'pa' ? `+${m[1]} ਹੋਰ` : `+${m[1]} और`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^Available Today\s*\((\d+)\)$/i))) {
    const out =
      language === 'pa' ? `ਅੱਜ ਉਪਲਬਧ (${m[1]})` : `आज उपलब्ध (${m[1]})`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^([\d.]+)\s*&\s*above\s*\((\d+)\)$/i))) {
    const out =
      language === 'pa'
        ? `${m[1]} ਅਤੇ ਵੱਧ (${m[2]})`
        : `${m[1]} और अधिक (${m[2]})`;
    return `${leading}${out}${trailing}`;
  }

  if ((m = trimmed.match(/^(.+)\s+\((\d+)\)$/i))) {
    const inner = EXACT_UI_TRANSLATIONS[m[1]]?.[language];
    if (inner) {
      return `${leading}${inner} (${m[2]})${trailing}`;
    }
  }

  return raw;
}
