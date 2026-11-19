// Per-language editions of Bharat AI Keyboard, each with its own Play Store listing,
// landing page (/<slug>-keyboard), QR code (/public/QR-Code) and featured graphic (/public/featured).

export interface SamplePhrase {
  input: string;
  output: string;
  meaning: string;
}

export interface KeyboardEdition {
  slug: string;
  name: string;
  nativeName: string;
  fontClass: string;
  playStoreUrl: string;
  qrPath: string;
  /** Play Store featured graphic (1024x500) in /public/featured, if one exists. */
  bannerPath?: string;
  /** BCP-47 language code. */
  langCode: string;
  /** "Hindi keyboard" written in the language itself, e.g. हिंदी कीबोर्ड. */
  nativeKeyword: string;
  /** What people call typing this language in English letters, e.g. Hinglish. */
  phoneticStyle: string;
  /** Script the language is written in. */
  script: string;
  samples: SamplePhrase[];
}

const play = (pkg: string) => `https://play.google.com/store/apps/details?id=com.bharataikeyboard.${pkg}`;

type EditionInput = Omit<KeyboardEdition, 'playStoreUrl' | 'qrPath' | 'bannerPath'>;

const edition = (e: EditionInput): KeyboardEdition => ({
  ...e,
  playStoreUrl: play(e.slug),
  qrPath: `/QR-Code/${e.slug}_keyboard_qr.png`,
  bannerPath: `/featured/${e.slug}.jpg`,
});

/** The all-languages app. */
export const MAIN_EDITION = {
  slug: 'all',
  name: 'All Languages',
  nativeName: 'Bharat AI Keyboard',
  fontClass: '',
  playStoreUrl: play('app'),
  qrPath: '/QR-Code/bharat_ai_keyboard_qr.png',
} as const;

export type EditionOption = KeyboardEdition | typeof MAIN_EDITION;

export const LANGUAGE_EDITIONS: KeyboardEdition[] = [
  edition({
    slug: 'hindi', name: 'Hindi', nativeName: 'हिन्दी', fontClass: 'font-devanagari', langCode: 'hi',
    nativeKeyword: 'हिंदी कीबोर्ड', phoneticStyle: 'Hinglish', script: 'Devanagari',
    samples: [
      { input: 'kya haal hai', output: 'क्या हाल है', meaning: 'How are you?' },
      { input: 'namaste', output: 'नमस्ते', meaning: 'Hello' },
      { input: 'dhanyavaad', output: 'धन्यवाद', meaning: 'Thank you' },
    ],
  }),
  edition({
    slug: 'bengali', name: 'Bengali', nativeName: 'বাংলা', fontClass: 'font-bengali', langCode: 'bn',
    nativeKeyword: 'বাংলা কিবোর্ড', phoneticStyle: 'Banglish', script: 'Bengali',
    samples: [
      { input: 'kemon achhen', output: 'কেমন আছেন', meaning: 'How are you?' },
      { input: 'nomoshkar', output: 'নমস্কার', meaning: 'Hello' },
      { input: 'dhonnobad', output: 'ধন্যবাদ', meaning: 'Thank you' },
    ],
  }),
  edition({
    slug: 'tamil', name: 'Tamil', nativeName: 'தமிழ்', fontClass: 'font-tamil', langCode: 'ta',
    nativeKeyword: 'தமிழ் கீபோர்டு', phoneticStyle: 'Tanglish', script: 'Tamil',
    samples: [
      { input: 'vanakkam', output: 'வணக்கம்', meaning: 'Hello' },
      { input: 'eppadi irukkinga', output: 'எப்படி இருக்கீங்க', meaning: 'How are you?' },
      { input: 'nandri', output: 'நன்றி', meaning: 'Thank you' },
    ],
  }),
  edition({
    slug: 'telugu', name: 'Telugu', nativeName: 'తెలుగు', fontClass: 'font-telugu', langCode: 'te',
    nativeKeyword: 'తెలుగు కీబోర్డ్', phoneticStyle: 'Tenglish', script: 'Telugu',
    samples: [
      { input: 'ela unnaru', output: 'ఎలా ఉన్నారు', meaning: 'How are you?' },
      { input: 'namaskaram', output: 'నమస్కారం', meaning: 'Hello' },
      { input: 'dhanyavadalu', output: 'ధన్యవాదాలు', meaning: 'Thank you' },
    ],
  }),
  edition({
    slug: 'marathi', name: 'Marathi', nativeName: 'मराठी', fontClass: 'font-devanagari', langCode: 'mr',
    nativeKeyword: 'मराठी कीबोर्ड', phoneticStyle: 'Marathi in English letters', script: 'Devanagari',
    samples: [
      { input: 'kase aahat', output: 'कसे आहात', meaning: 'How are you?' },
      { input: 'namaskar', output: 'नमस्कार', meaning: 'Hello' },
      { input: 'dhanyavaad', output: 'धन्यवाद', meaning: 'Thank you' },
    ],
  }),
  edition({
    slug: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', fontClass: 'font-gujarati', langCode: 'gu',
    nativeKeyword: 'ગુજરાતી કીબોર્ડ', phoneticStyle: 'Gujarati in English letters', script: 'Gujarati',
    samples: [
      { input: 'kem chho', output: 'કેમ છો', meaning: 'How are you?' },
      { input: 'namaste', output: 'નમસ્તે', meaning: 'Hello' },
      { input: 'aabhar', output: 'આભાર', meaning: 'Thank you' },
    ],
  }),
  edition({
    slug: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ', fontClass: 'font-kannada', langCode: 'kn',
    nativeKeyword: 'ಕನ್ನಡ ಕೀಬೋರ್ಡ್', phoneticStyle: 'Kanglish', script: 'Kannada',
    samples: [
      { input: 'hegiddira', output: 'ಹೇಗಿದ್ದೀರಾ', meaning: 'How are you?' },
      { input: 'namaskara', output: 'ನಮಸ್ಕಾರ', meaning: 'Hello' },
      { input: 'dhanyavada', output: 'ಧನ್ಯವಾದ', meaning: 'Thank you' },
    ],
  }),
  edition({
    slug: 'malayalam', name: 'Malayalam', nativeName: 'മലയാളം', fontClass: 'font-malayalam', langCode: 'ml',
    nativeKeyword: 'മലയാളം കീബോർഡ്', phoneticStyle: 'Manglish', script: 'Malayalam',
    samples: [
      { input: 'sukhamano', output: 'സുഖമാണോ', meaning: 'How are you?' },
      { input: 'namaskaram', output: 'നമസ്കാരം', meaning: 'Hello' },
      { input: 'nanni', output: 'നന്ദി', meaning: 'Thank you' },
    ],
  }),
  edition({
    slug: 'odia', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', fontClass: 'font-odia', langCode: 'or',
    nativeKeyword: 'ଓଡ଼ିଆ କିବୋର୍ଡ', phoneticStyle: 'Odia in English letters', script: 'Odia',
    samples: [
      { input: 'kemiti achanti', output: 'କେମିତି ଅଛନ୍ତି', meaning: 'How are you?' },
      { input: 'namaskar', output: 'ନମସ୍କାର', meaning: 'Hello' },
      { input: 'dhanyabad', output: 'ଧନ୍ୟବାଦ', meaning: 'Thank you' },
    ],
  }),
  edition({
    slug: 'punjabi', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', fontClass: 'font-gurmukhi', langCode: 'pa',
    nativeKeyword: 'ਪੰਜਾਬੀ ਕੀਬੋਰਡ', phoneticStyle: 'Punjabi in English letters', script: 'Gurmukhi',
    samples: [
      { input: 'ki haal hai', output: 'ਕੀ ਹਾਲ ਹੈ', meaning: 'How are you?' },
      { input: 'sat sri akaal', output: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', meaning: 'Hello' },
      { input: 'dhanvaad', output: 'ਧੰਨਵਾਦ', meaning: 'Thank you' },
    ],
  }),
  edition({
    slug: 'assamese', name: 'Assamese', nativeName: 'অসমীয়া', fontClass: 'font-bengali', langCode: 'as',
    nativeKeyword: 'অসমীয়া কিবোর্ড', phoneticStyle: 'Assamese in English letters', script: 'Assamese (Bengali–Assamese)',
    samples: [
      { input: 'kene asa', output: 'কেনে আছা', meaning: 'How are you?' },
      { input: 'nomoskar', output: 'নমস্কাৰ', meaning: 'Hello' },
      { input: 'dhonyobad', output: 'ধন্যবাদ', meaning: 'Thank you' },
    ],
  }),
  edition({
    slug: 'nepali', name: 'Nepali', nativeName: 'नेपाली', fontClass: 'font-devanagari', langCode: 'ne',
    nativeKeyword: 'नेपाली किबोर्ड', phoneticStyle: 'Roman Nepali', script: 'Devanagari',
    samples: [
      { input: 'k xa', output: 'के छ', meaning: "What's up?" },
      { input: 'kasto chha', output: 'कस्तो छ', meaning: 'How are you?' },
      { input: 'dhanyabad', output: 'धन्यवाद', meaning: 'Thank you' },
    ],
  }),
];

export const editionPath = (e: KeyboardEdition) => `/${e.slug}-keyboard`;

export const findEditionByPath = (path: string) =>
  LANGUAGE_EDITIONS.find((e) => editionPath(e) === path);
