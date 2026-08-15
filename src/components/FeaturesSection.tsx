import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Keyboard, 
  Mic, 
  PenTool, 
  Languages, 
  Repeat, 
  Volume2, 
  CheckCheck, 
  Move, 
  Smile, 
  Sparkles, 
  Palette, 
  Type, 
  LayoutGrid,
  Search,
  CheckCircle,
  ArrowRight,
  Zap,
  ShieldCheck,
  Layers,
  Copy,
  Check,
  RotateCcw,
  Play,
  Grid,
  Table,
  SlidersHorizontal,
  Info,
  ChevronRight,
  Download,
  X,
  VolumeX,
  Plus,
  Trash2,
  Share2,
  MousePointer,
  HelpCircle
} from 'lucide-react';
import { AshokaChakra } from './AshokaChakra';
import { RippleButton } from './RippleButton';
import { FEATURES, THEMES, SUPPORTED_LANGUAGES, STYLISH_FONTS_DEMO } from '../data/content';
import { FeatureItem, LanguageItem, ThemeOption } from '../types';

// Map icon string to Lucide component
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Keyboard,
  Mic,
  PenTool,
  Languages,
  Repeat,
  Volume2,
  CheckCheck,
  Move,
  Smile,
  Sparkles,
  Palette,
  Type,
  LayoutGrid,
};

interface FeatureDetailSpec {
  highlights: string[];
  shortcut: string;
  offlineSupported: boolean;
  performanceMetric: string;
  tagline: string;
}

const FEATURE_SPECS: Record<string, FeatureDetailSpec> = {
  'smart-input': {
    highlights: [
      'Next-word dual-vocabulary predictive engine for Hindi, regional scripts & English',
      'Smart matra (vowel sign) auto-snapping and conjunct ligature builder',
      'Adaptive learning algorithm that remembers frequent names and local slangs'
    ],
    shortcut: 'Spacebar tap or smart suggestion chip',
    offlineSupported: true,
    performanceMetric: '< 15ms latency per keypress',
    tagline: 'High-speed conversational typing that understands Indian linguistic cadence.'
  },
  'voice-input': {
    highlights: [
      'Acoustic models trained on 28+ regional accents and dialects across India',
      'Active background noise cancellation for busy streets and commute environments',
      'Live audio waveform with instant pause/resume and automatic punctuation'
    ],
    shortcut: 'Long press Spacebar or tap Mic icon',
    offlineSupported: true,
    performanceMetric: '98.4% speech recognition accuracy',
    tagline: 'Just speak in your mother tongue; your words appear instantly on screen.'
  },
  'handwriting-input': {
    highlights: [
      'Smooth Bezier curve vector canvas optimized for fingers and stylus pens',
      'Recognizes complex conjuncts (संयुक्ताक्षर) and distinct regional numerals (१, २, ૩, ੪)',
      'Multi-character continuous writing mode with auto-scroll canvas'
    ],
    shortcut: 'Swipe left on keyboard top bar → Select Pen',
    offlineSupported: true,
    performanceMetric: '60 FPS touch response rate',
    tagline: 'Draw letters as you would on paper with natural stroke smoothing.'
  },
  'transliteration': {
    highlights: [
      'Phonetic Roman-to-Script engine: type "namaste" → get "नमस्ते"',
      'Multi-dialect vocabulary for Hinglish, Tanglish, Telglish, Banglish & Marathish',
      'Instant alternative suggestions dropdown for ambiguous phonetic spellings'
    ],
    shortcut: 'Tap script toggle key (अ/A) on spacebar',
    offlineSupported: true,
    performanceMetric: 'Instant 0.01s transliteration conversion',
    tagline: 'Express yourself in your mother tongue using familiar English alphabets.'
  },
  'text-translation': {
    highlights: [
      'Real-time bilingual chat translation embedded right above the keyboard',
      'Supports 12+ Indian official languages + English, Spanish, Arabic & French',
      'Swap source and destination languages with a single tap'
    ],
    shortcut: 'Toolbar → Translation icon (⇄)',
    offlineSupported: false,
    performanceMetric: '50+ language pairs supported',
    tagline: 'Break linguistic barriers without switching back and forth between apps.'
  },
  'voice-translation': {
    highlights: [
      'Speak in one Indian language and automatically produce text in another language',
      'Built-in audio synthesizer preview to verify pronunciation',
      'Ideal for interstate trade, travel, and cross-cultural family communications'
    ],
    shortcut: 'Voice Mode → Tap Target Flag',
    offlineSupported: false,
    performanceMetric: 'Sub-second neural translation',
    tagline: 'Speak your language, chat in theirs—seamless cross-lingual communication.'
  },
  'autocorrection': {
    highlights: [
      'Grammar-aware matra positioning and spellcheck for all Indian scripts',
      'Never replaces regional colloquialisms or Indian names unexpectedly',
      'Single-tap rollback button if you prefer your exact typed keystroke'
    ],
    shortcut: 'Backspace immediately reverts correction',
    offlineSupported: true,
    performanceMetric: 'Zero accidental word replacements',
    tagline: 'Intelligent correction that respects Indian names, cities, and desi lingo.'
  },
  'glide-typing': {
    highlights: [
      'Smooth gesture tracing with Indian Tricolour particle trail',
      'Continuous sentence glide without lifting your thumb from the screen',
      'One-handed ergonomic mode for large screen smartphones'
    ],
    shortcut: 'Slide finger across keys',
    offlineSupported: true,
    performanceMetric: 'Up to 65 words per minute typing speed',
    tagline: 'Glide your thumb effortlessly across keys for lightning-fast one-handed typing.'
  },
  'emoji-gifs-stickers': {
    highlights: [
      'Over 10,000+ curated Desi meme stickers, Bollywood reactions & festival greetings',
      'Smart search by Indian festivals (Diwali, Eid, Pongal, Durga Puja, Onam, Holi)',
      'Direct one-tap WhatsApp, Telegram & Instagram sticker integration'
    ],
    shortcut: 'Emoji button (😊) or toolbar sticker tab',
    offlineSupported: true,
    performanceMetric: 'Categorized instant discovery',
    tagline: 'Celebrate every Indian emotion, festival, and trending meme in your chats.'
  },
  'custom-stickers': {
    highlights: [
      'Create personalized WhatsApp stickers from any camera selfie or gallery photo',
      'AI portrait cutout tool removes backgrounds with one tap',
      'Add regional text captions, turbans, festive borders, and funny stickers'
    ],
    shortcut: 'Toolbar → Sticker Studio (+)',
    offlineSupported: true,
    performanceMetric: 'Instant on-device cutout processing',
    tagline: 'Turn your friends, family moments, and selfies into custom chat stickers.'
  },
  'themes': {
    highlights: [
      'Handcrafted Indian Tricolour, Dark OLED Slate, Festive Gold & Neon Cyber aesthetics',
      'Custom photo backdrops with adjustable key transparency and blur filters',
      'High-contrast key labels and customizable keyboard height for all eye conditions'
    ],
    shortcut: 'Toolbar → Palette icon (🎨)',
    offlineSupported: true,
    performanceMetric: 'GPU-accelerated 60 FPS rendering',
    tagline: 'Dress your keyboard in vibrant Indian cultural heritage or sleek modern dark mode.'
  },
  'stylish-fonts': {
    highlights: [
      'Instant Unicode decorative text styles for WhatsApp bios, Instagram & gaming tags',
      '50+ creative typography options (Serif, Script, Bubble, Monospace, Gothic)',
      'Works universally across all social media and messaging platforms'
    ],
    shortcut: 'Toolbar → Font Style icon (𝓕)',
    offlineSupported: true,
    performanceMetric: 'Universal Unicode standard support',
    tagline: 'Make your social captions, game gamer-tags, and status messages pop.'
  },
  'app-drawer': {
    highlights: [
      'Pinned clipboard manager that stores your copied OTPs, links & text snippets',
      'Inline mini-calculator for quick bill splitting and arithmetic in chats',
      'Customizable toolbar shortcuts to keep your favorite tools 1 tap away'
    ],
    shortcut: 'Toolbar 4-dots grid icon (∷)',
    offlineSupported: true,
    performanceMetric: 'Zero app switches needed',
    tagline: 'Your complete productivity arsenal accessible directly from the keyboard.'
  }
};

const COMPARISON_ROWS = [
  {
    capability: 'Supported Indian Languages',
    desiAI: '12+ Native Scripts + Hinglish',
    standardGboard: 'Basic Layouts only',
    otherKeyboards: '2–4 Languages',
    status: 'win'
  },
  {
    capability: 'Phonetic Hinglish Transliteration',
    desiAI: 'Real-time On-Device AI Engine',
    standardGboard: 'Partial / Cloud reliant',
    otherKeyboards: 'Limited / High typo rate',
    status: 'win'
  },
  {
    capability: 'Offline Voice & Handwriting Input',
    desiAI: '100% Offline with regional dialects',
    standardGboard: 'Requires active internet',
    otherKeyboards: 'Not supported',
    status: 'win'
  },
  {
    capability: 'Desi Memes & Festival Stickers',
    desiAI: '10,000+ Curated Indian Stickers',
    standardGboard: 'Western-centric GIFs',
    otherKeyboards: 'Requires paid sticker packs',
    status: 'win'
  },
  {
    capability: 'On-Device Keystroke Privacy',
    desiAI: 'Zero Keylogging • On-Device Only',
    standardGboard: 'Telemetry analytics enabled',
    otherKeyboards: 'Third-party cloud servers',
    status: 'win'
  },
  {
    capability: 'Custom Photo Sticker Studio',
    desiAI: 'Built-in 1-Tap AI Cutout Studio',
    standardGboard: 'External app required',
    otherKeyboards: 'Not available',
    status: 'win'
  },
  {
    capability: 'Indian Cultural & Tricolour Themes',
    desiAI: '6+ Curated Cultural Themes',
    standardGboard: 'Plain solid colors',
    otherKeyboards: 'Ad-supported theme packs',
    status: 'win'
  },
];

// Helper for realistic Unicode stylizer
const transformToUnicode = (text: string, style: string): string => {
  if (!text) return '';
  const chars = text.split('');
  
  if (style === 'Fraktur / Gothic') {
    // Math Fraktur / Gothic Unicode offsets
    return chars.map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D56C + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D586 + (code - 97));
      return c;
    }).join('');
  }
  if (style === 'Double-Struck / Bold') {
    return chars.map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D538 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D552 + (code - 97));
      return c;
    }).join('');
  }
  if (style === 'Circled / Bubble') {
    return chars.map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + (code - 97));
      if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + (code - 49));
      return c;
    }).join('');
  }
  if (style === 'Square Negative') {
    return chars.map(c => {
      const upper = c.toUpperCase();
      const code = upper.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F170 + (code - 65));
      return c;
    }).join('');
  }
  if (style === 'Cursive Script') {
    return chars.map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D4D0 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D4EA + (code - 97));
      return c;
    }).join('');
  }
  return text;
};

export const FeaturesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'showcase' | 'grid' | 'comparison'>('showcase');
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem>(FEATURES[0]);
  const [modalFeature, setModalFeature] = useState<FeatureItem | null>(null);

  // -------------------------------------------------------------
  // INTERACTIVE TEST BENCH STATES & HANDLERS
  // -------------------------------------------------------------

  // 1. Virtual Keyboard & Smart Input States
  const [virtualTypedText, setVirtualTypedText] = useState('नमस्ते भारत! ');
  const [activeKeyboardScript, setActiveKeyboardScript] = useState('hi');
  const [capsLock, setCapsLock] = useState(false);
  const [keyPressFeedback, setKeyPressFeedback] = useState<string | null>(null);

  // 2. Transliteration State
  const [transliterationInput, setTransliterationInput] = useState('namaste bhai kaise ho');
  const [transliterationScript, setTransliterationScript] = useState('hi');

  // 3. Voice Input & Recognition State
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [voiceLanguage, setVoiceLanguage] = useState('hi-IN');
  const [voiceResultText, setVoiceResultText] = useState('देसी एआई कीबोर्ड भारत की अपनी भाषा में बात करने का सबसे सरल तरीका है।');
  const [voiceError, setVoiceError] = useState<string | null>(null);

  // 4. Handwriting Recognition State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokesCount, setStrokesCount] = useState(0);
  const [recognizedHandwritingGlyph, setRecognizedHandwritingGlyph] = useState('क');
  const [handwritingConfidence, setHandwritingConfidence] = useState(98);

  // 5. Text Translation State
  const [translateSourceText, setTranslateSourceText] = useState('कल सुबह 10 बजे मीटिंग है, सब लोग समय पर आ जाना।');
  const [translateSourceLang, setTranslateSourceLang] = useState('hi');
  const [translateTargetLang, setTranslateTargetLang] = useState('ta');
  const [translatedResultText, setTranslatedResultText] = useState('நாளை காலை 10 மணிக்கு கூட்டம் உள்ளது, அனைவரும் குறித்த நேரத்தில் வாருங்கள்.');
  const [isTranslatingAnim, setIsTranslatingAnim] = useState(false);

  // 6. Voice Translation State
  const [voiceTranslateSource, setVoiceTranslateSource] = useState('नमस्ते, आपका क्या नाम है?');
  const [voiceTranslateTarget, setVoiceTranslateTarget] = useState('வணக்கம், உங்கள் பெயர் என்ன?');
  const [isVoiceTranslating, setIsVoiceTranslating] = useState(false);

  // 7. Auto-Correction State
  const [autocorrectInput, setAutocorrectInput] = useState('ap kaise ho bhaiyaa');
  const [autocorrectResult, setAutocorrectResult] = useState('आप कैसे हो भैया');
  const [autocorrectStrictness, setAutocorrectStrictness] = useState<'mild' | 'standard' | 'strict'>('standard');
  const [hasRevertedCorrection, setHasRevertedCorrection] = useState(false);

  // 8. Glide Typing State
  const [glideCurrentWord, setGlideCurrentWord] = useState('NAMASTE');
  const [glideTrailPoints, setGlideTrailPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [isGliding, setIsGliding] = useState(false);

  // 9. Emojis, Stickers & Memes State
  const [activeStickerCategory, setActiveStickerCategory] = useState<'festivals' | 'bollywood' | 'chai' | 'cricket' | 'reactions'>('festivals');
  const [simulatedChatHistory, setSimulatedChatHistory] = useState<Array<{ id: number; type: 'text' | 'sticker'; content: string; caption?: string; time: string }>>([
    { id: 1, type: 'text', content: 'Kya plan hai sham ko?', time: '4:15 PM' },
    { id: 2, type: 'sticker', content: '☕', caption: 'Chai Peelo Friends!', time: '4:16 PM' },
  ]);

  // 10. Custom Photo Sticker Studio State
  const [customStickerAvatar, setCustomStickerAvatar] = useState('🪔');
  const [customStickerText, setCustomStickerText] = useState('शुभ दीपावली!');
  const [customStickerFrame, setCustomStickerFrame] = useState<'diwali' | 'tricolour' | 'chai' | 'swag'>('diwali');
  const [createdStickerToast, setCreatedStickerToast] = useState<string | null>(null);

  // 11. Theme Switcher & Visualizer State
  const [previewThemeId, setPreviewThemeId] = useState('tricolour');
  const [themeBlur, setThemeBlur] = useState(0);
  const [themeOpacity, setThemeOpacity] = useState(100);
  const [soundFeedback, setSoundFeedback] = useState(true);

  // 12. Fancy Stylish Fonts State
  const [customFontInput, setCustomFontInput] = useState('Desi AI Keyboard');
  const [copiedFontIdx, setCopiedFontIdx] = useState<number | null>(null);

  // 13. App Drawer & Productivity State
  const [calcInput, setCalcInput] = useState('450 + 280');
  const [calcResult, setCalcResult] = useState('730');
  const [clipboardItems, setClipboardItems] = useState([
    { id: 1, text: 'UPI ID: paytmqr2810@paytm', pinned: true },
    { id: 2, text: 'OTP: 839201', pinned: false },
    { id: 3, text: 'https://desiaikeyboard.com/share', pinned: false }
  ]);
  const [newClipboardText, setNewClipboardText] = useState('');

  // Speech synthesis audio player
  const playAudioVoice = (text: string, langCode = 'hi-IN') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Keyboard Click Sound & Haptic simulation
  const triggerKeyAudio = (keyChar: string) => {
    setKeyPressFeedback(keyChar);
    setTimeout(() => setKeyPressFeedback(null), 250);

    if (soundFeedback && typeof AudioContext !== 'undefined') {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch {
        // audio context optional
      }
    }
  };

  // Transliteration real-time conversion
  const getTransliteratedPreview = (text: string, scriptId: string): string => {
    if (!text.trim()) return '';
    const dict: Record<string, Record<string, string>> = {
      'namaste': { hi: 'नमस्ते', ta: 'வணக்கம்', te: 'నమస్కారం', bn: 'নমস্কার', or: 'ନମସ୍କାର', gu: 'નમસ્તે', mr: 'नमस्कार', kn: 'ನಮಸ್ಕಾರ', ml: 'നമസ്കാരം', pa: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', ur: 'سلام' },
      'bhai': { hi: 'भाई', ta: 'சகோதரா', te: 'సోదరా', bn: 'ভাই', or: 'ଭାଇ', gu: 'ભાઈ', mr: 'भाऊ', kn: 'ಸಹೋದರ', ml: 'സഹോദരൻ', pa: 'ਭਰਾ', ur: 'بھائی' },
      'kaise': { hi: 'कैसे', ta: 'எப்படி', te: 'ఎలా', bn: 'কেমন', or: 'କେମିତି', gu: 'કેમ', mr: 'कसे', kn: 'ಹೇಗೆ', ml: 'എങ്ങനെ', pa: 'ਕਿਵੇਂ', ur: 'کیسے' },
      'ho': { hi: 'हो', ta: 'இருக்கிறீர்கள்', te: 'ఉన్నారు', bn: 'আছেন', or: 'ଅଛନ୍ତି', gu: 'છો', mr: 'आहात', kn: 'ಇದ್ದೀರಿ', ml: 'ഉണ്ട്', pa: 'ਹੋ', ur: 'ہو' },
      'kya': { hi: 'क्या', ta: 'என்ன', te: 'ఏమిటి', bn: 'কি', or: 'କଣ', gu: 'શું', mr: 'काय', kn: 'ಏನು', ml: 'എന്ത്', pa: 'ਕੀ', ur: 'کیا' },
      'haal': { hi: 'हाल', ta: 'நலம்', te: 'పరిస్థితి', bn: 'খবর', or: 'ଖବର', gu: 'હાલ', mr: 'हाल', kn: 'ಸ್ಥಿತಿ', ml: 'വിശേഷം', pa: 'ਹਾਲ', ur: 'حال' },
      'hai': { hi: 'है', ta: 'உள்ளது', te: 'ఉంది', bn: 'আছে', or: 'ଅଛି', gu: 'છે', mr: 'आहे', kn: 'ಇದೆ', ml: 'ആണ്', pa: 'ਹੈ', ur: 'ہے' },
      'dhanyavaad': { hi: 'धन्यवाद', ta: 'நன்றி', te: 'ధన్యవాదాలు', bn: 'ধন্যবাদ', or: 'ଧନ୍ୟବାଦ', gu: 'ધન્યવાદ', mr: 'धन्यवाद', kn: 'ಧನ್ಯವಾದಗಳು', ml: 'നന്ദി', pa: 'ਧੰਨਵਾਦ', ur: 'شکریہ' },
      'shukriya': { hi: 'शुक्रिया', ta: 'நன்றி', te: 'ధన్యవాదాలు', bn: 'ধন্যবাদ', or: 'ଧନ୍ୟବାଦ', gu: 'આભાર', mr: 'धन्यवाद', kn: 'ಧನ್ಯವಾದಗಳು', ml: 'നന്ദി', pa: 'ਧੰਨਵਾਦ', ur: 'شکریہ' },
      'subh': { hi: 'शुभ', ta: 'இனிய', te: 'శుభ', bn: 'শুভ', or: 'ଶୁଭ', gu: 'શુભ', mr: 'शुभ', kn: 'ಶುಭ', ml: 'ശുഭ', pa: 'ਸ਼ੁਭ', ur: 'خوش' },
      'prabhat': { hi: 'प्रभात', ta: 'காலை', te: 'ఉదయం', bn: 'সকাল', or: 'ପ୍ରଭାତ', gu: 'સવાર', mr: 'प्रभात', kn: 'ಮುಂಜಾನೆ', ml: 'പ്രഭാതം', pa: 'ਸਵੇਰ', ur: 'صبح' },
    };

    const words = text.toLowerCase().trim().split(/\s+/);
    const converted = words.map(w => {
      if (dict[w] && dict[w][scriptId]) return dict[w][scriptId];
      return w;
    });

    return converted.join(' ');
  };

  // Real-time Text Translation Dictionary
  const translateDictionary: Record<string, Record<string, string>> = {
    'कल सुबह 10 बजे मीटिंग है, सब लोग समय पर आ जाना।': {
      ta: 'நாளை காலை 10 மணிக்கு கூட்டம் உள்ளது, அனைவரும் குறித்த நேரத்தில் வாருங்கள்.',
      te: 'రేపు ఉదయం 10 గంటలకు మీటింగ్ ఉంది, అందరూ సమయానికి రండి.',
      bn: 'আগামীকাল সকাল ১০টায় মিটিং আছে, সবাই সময়মতো চলে আসবেন।',
      gu: 'આવતીકાલે સવારે 10 વાગ્યે મીટિંગ છે, બધા સમયસર પહોંચી જજો.',
      mr: 'उद्या सकाळी 10 वाजता मीटिंग आहे, सर्वांनी वेळेवर यावे.',
      en: 'Meeting is tomorrow morning at 10 AM, everyone please arrive on time.'
    },
    'आप सभी को स्वतंत्रता दिवस की बहुत बहुत शुभकामनाएं': {
      ta: 'அனைவருக்கும் சுதந்திர தின நல்வாழ்த்துகள்!',
      te: 'మీ అందరికీ స్వాతంత్ర్య దినోత్సవ శుభాకాంక్షలు!',
      bn: 'আপনাদের সকলকে স্বাধীনতা দিবসের অনেক অনেক শুভেচ্ছা!',
      gu: 'આપ સૌને સ્વતંત્રતા દિવસની હાર્દિક શુભેચ્છાઓ!',
      mr: 'तुम्हा सर्वांना स्वातंत्र्यदिनाच्या खूप खूप शुभेच्छा!',
      en: 'Wishing you all a very Happy Independence Day!'
    }
  };

  const handleRunTranslate = () => {
    setIsTranslatingAnim(true);
    setTimeout(() => {
      setIsTranslatingAnim(false);
      const match = translateDictionary[translateSourceText.trim()];
      if (match && match[translateTargetLang]) {
        setTranslatedResultText(match[translateTargetLang]);
      } else {
        const langObj = SUPPORTED_LANGUAGES.find(l => l.id === translateTargetLang);
        setTranslatedResultText(`[अनुवादित / Translated into ${langObj?.name || translateTargetLang}]: ${translateSourceText}`);
      }
    }, 600);
  };

  // Auto-correction handler
  const handleAutocorrectTyping = (val: string) => {
    setAutocorrectInput(val);
    setHasRevertedCorrection(false);
    const typoMap: Record<string, string> = {
      'namste': 'नमस्ते',
      'shukria': 'शुक्रिया',
      'bhaiyaa': 'भैया',
      'kya hal he': 'क्या हाल है',
      'ap kaise ho': 'आप कैसे हो',
      'subhratri': 'शुभ रात्रि',
      'diwali': 'दीपावली',
      'bahut ache': 'बहुत अच्छे'
    };

    let result = val;
    Object.keys(typoMap).forEach((typo) => {
      if (result.toLowerCase().includes(typo)) {
        result = result.replace(new RegExp(typo, 'gi'), typoMap[typo]);
      }
    });
    setAutocorrectResult(result);
  };

  // Handwriting canvas drawing handlers
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000080';
    setIsDrawing(true);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    setStrokesCount(prev => prev + 1);
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
    // Simulate smart recognition based on stroke complexity
    const glyphs = ['क', 'ॐ', 'अ', 'म', 'த', 'తె', 'ଶ୍ରୀ', 'ਭ', 'അ'];
    const randomGlyph = glyphs[Math.floor(Math.random() * glyphs.length)];
    setRecognizedHandwritingGlyph(randomGlyph);
    setHandwritingConfidence(Math.floor(92 + Math.random() * 7));
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokesCount(0);
  };

  // Voice recognition (Web Speech API with Fallback)
  const toggleSpeechRecognition = () => {
    if (isVoiceListening) {
      setIsVoiceListening(false);
      return;
    }

    // Try Native Web Speech API safely
    const win = window as any;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = voiceLanguage;
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => {
          setIsVoiceListening(true);
          setVoiceError(null);
          setVoiceResultText('Listening in Indian language... Speak now.');
        };

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((r: any) => r[0].transcript)
            .join('');
          setVoiceResultText(transcript);
        };

        recognition.onerror = () => {
          setIsVoiceListening(false);
          // Graceful fallback simulation
          runVoiceSimulation();
        };

        recognition.onend = () => {
          setIsVoiceListening(false);
        };

        recognition.start();
        return;
      } catch {
        runVoiceSimulation();
      }
    } else {
      runVoiceSimulation();
    }
  };

  const runVoiceSimulation = () => {
    setIsVoiceListening(true);
    setVoiceResultText('Listening to Indian accent speech...');
    setTimeout(() => {
      const samples = [
        'नमस्ते! देसी एआई कीबोर्ड के साथ टाइपिंग बेहद आसान और तेज है।',
        'வணக்கம்! தேசி AI விசைப்பலகை மிகச் சிறப்பாக செயல்படுகிறது.',
        'నమస్కారం! దేశీ AI కీబోర్డ్ చాలా బాగుంది.',
        'নমস্কার! দেশি এআই কিবোর্ড খুব সুন্দর।'
      ];
      setVoiceResultText(samples[Math.floor(Math.random() * samples.length)]);
      setIsVoiceListening(false);
    }, 2800);
  };

  // Calculator evaluation
  const handleCalcEval = () => {
    try {
      // Safe arithmetic evaluator
      const sanitized = calcInput.replace(/[^0-9+\-*/().]/g, '');
      // eslint-disable-next-line no-eval
      const result = Function(`'use strict'; return (${sanitized})`)();
      setCalcResult(String(result));
    } catch {
      setCalcResult('Error');
    }
  };

  // Glide Typing Simulation Mouse Move
  const handleGlideMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isGliding) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setGlideTrailPoints(prev => [...prev.slice(-15), point]);
  };

  const categories = [
    { label: 'All', count: FEATURES.length },
    { label: 'Input', count: FEATURES.filter(f => f.category === 'Input').length },
    { label: 'AI & Language', count: FEATURES.filter(f => f.category === 'AI & Language').length },
    { label: 'Expression & Media', count: FEATURES.filter(f => f.category === 'Expression & Media').length },
    { label: 'Productivity', count: FEATURES.filter(f => f.category === 'Productivity').length },
  ];

  const filteredFeatures = FEATURES.filter((feature) => {
    const matchesCategory = activeCategory === 'All' || feature.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (FEATURE_SPECS[feature.id]?.tagline || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="features" className="relative py-20 lg:py-28 bg-[#FFFDF8] border-t border-slate-200/60 scroll-mt-12 overflow-hidden">
      
      {/* Top Tricolour Saffron-White-Green Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-[#000080]/5 px-3.5 py-1 text-xs font-bold text-[#000080] border border-[#000080]/20 mb-3 shadow-2xs">
            <AshokaChakra size={14} animate={true} strokeColor="#000080" />
            <span>Interactive Feature Showcase • 13 Flagship Capabilities</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#172033]">
            Explore Every Feature
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Experience our AI transliteration, multilingual voice recognition, interactive handwriting pad, emoji stickers, custom photo studio, and fancy fonts instantly.
          </p>

          {/* Quick Metrics Strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-xl font-black text-[#000080]">&lt; 15ms</span>
              <span className="text-[11px] font-semibold text-slate-500">Latency Per Keypress</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-xl font-black text-[#138808]">100% On-Device</span>
              <span className="text-[11px] font-semibold text-slate-500">Zero Keystroke Logging</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-xl font-black text-[#FF9933]">12+ Scripts</span>
              <span className="text-[11px] font-semibold text-slate-500">Official Indian Languages</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-xl font-black text-indigo-900">10,000+</span>
              <span className="text-[11px] font-semibold text-slate-500">Desi Memes & Stickers</span>
            </div>
          </div>

          {/* Control Bar: Search & View Modes */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-auto flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search features (e.g. voice, transliteration, stickers, fonts)..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border-0 focus:ring-2 focus:ring-[#000080]/30 text-slate-800 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Switcher Pills */}
            <div className="flex items-center space-x-1 border border-slate-200 rounded-xl p-1 bg-slate-50 shrink-0 self-end sm:self-auto">
              <button
                onClick={() => setViewMode('showcase')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'showcase'
                    ? 'bg-[#000080] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Live Interactive Playground with working test tools"
              >
                <Play className="h-3.5 w-3.5 text-amber-300 fill-current" />
                <span>Interactive Preview</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#000080] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Grid view of all features"
              >
                <Grid className="h-3.5 w-3.5" />
                <span>Feature Cards</span>
              </button>

              <button
                onClick={() => setViewMode('comparison')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'comparison'
                    ? 'bg-[#000080] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Compare Desi AI Keyboard with competitors"
              >
                <Table className="h-3.5 w-3.5" />
                <span>Capability Matrix</span>
              </button>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  activeCategory === cat.label
                    ? 'bg-[#000080] text-white shadow-sm shadow-navy-900/30'
                    : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeCategory === cat.label ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* ========================================================= */}
        {/* VIEW 1: LIVE TEST BENCH & INTERACTIVE SIMULATOR (DEFAULT) */}
        {/* ========================================================= */}
        {viewMode === 'showcase' && (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Feature Selection List */}
            <div className="lg:col-span-4 space-y-2 max-h-[720px] overflow-y-auto pr-1">
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-xs font-extrabold text-[#000080] uppercase tracking-wider">
                  Select a feature to explore ({filteredFeatures.length}):
                </span>
              </div>

              {filteredFeatures.map((feat) => {
                const IconComponent = iconMap[feat.icon] || Keyboard;
                const isSelected = selectedFeature.id === feat.id;

                return (
                  <div
                    key={feat.id}
                    onClick={() => setSelectedFeature(feat)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#000080] text-white border-[#000080] shadow-lg shadow-navy-900/20 scale-[1.01]'
                        : 'bg-white text-slate-700 border-slate-200/80 hover:bg-amber-50/50 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                        isSelected ? 'bg-white/15 text-amber-300' : 'bg-amber-50 text-[#000080]'
                      }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm leading-tight">{feat.title}</div>
                        <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                          {feat.category}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-800'
                      }`}>
                        Ready to Explore
                      </span>
                      <ChevronRight className={`h-4 w-4 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Deep Functional Interactive Testing Sandbox */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl relative">
              
              {/* Sandbox Top Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#000080] to-[#172033] text-white shadow-md">
                    {React.createElement(iconMap[selectedFeature.icon] || Keyboard, { className: 'h-6 w-6 text-amber-300' })}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-extrabold text-[#172033]">{selectedFeature.title}</h3>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                        Interactive Feature Preview
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {FEATURE_SPECS[selectedFeature.id]?.tagline || selectedFeature.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setModalFeature(selectedFeature)}
                  className="inline-flex items-center space-x-1 rounded-xl bg-slate-100 hover:bg-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors"
                >
                  <Info className="h-3.5 w-3.5 text-[#000080]" />
                  <span>Feature Details</span>
                </button>
              </div>

              {/* Dynamic Interactive Test Area */}
              <div className="mt-6">
                
                {/* ------------------------------------------------------------- */}
                {/* 1. SMART TEXT INPUT & VIRTUAL KEYBOARD TESTER                 */}
                {/* ------------------------------------------------------------- */}
                {selectedFeature.id === 'smart-input' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase">
                        Virtual Desi AI Keyboard:
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] text-slate-500 font-medium">Script:</span>
                        <select
                          value={activeKeyboardScript}
                          onChange={(e) => setActiveKeyboardScript(e.target.value)}
                          className="rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-bold text-[#000080]"
                        >
                          {SUPPORTED_LANGUAGES.map((l) => (
                            <option key={l.id} value={l.id}>{l.name} ({l.nativeName})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Output Text Screen */}
                    <div className="rounded-2xl bg-slate-900 p-4 text-white shadow-inner relative">
                      <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>Live Typed Text Output</span>
                        <button
                          onClick={() => playAudioVoice(virtualTypedText)}
                          className="text-xs text-white/80 hover:text-white flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded"
                        >
                          <Volume2 className="h-3 w-3" />
                          <span>Speak Aloud</span>
                        </button>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold min-h-[48px] text-slate-100 flex items-center break-all">
                        {virtualTypedText || <span className="text-slate-500 text-base">Tap keys on the virtual keyboard below to type...</span>}
                      </div>
                    </div>

                    {/* Smart Next-Word AI Prediction Strip */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      <span className="text-[10px] font-bold text-slate-400 shrink-0">AI Predictions:</span>
                      {['नमस्ते', 'आप', 'सदा', 'खुश', 'रहें', 'जय हिन्द', 'धन्यवाद'].map((word) => (
                        <button
                          key={word}
                          onClick={() => {
                            triggerKeyAudio(word);
                            setVirtualTypedText((prev) => `${prev} ${word}`);
                          }}
                          className="shrink-0 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-[#000080] hover:bg-amber-100 active:scale-95 transition-all"
                        >
                          + {word}
                        </button>
                      ))}
                    </div>

                    {/* Interactive Virtual Keyboard Layout */}
                    <div className="rounded-2xl bg-slate-800 p-3 sm:p-4 border border-slate-700 shadow-xl">
                      {/* Row 1 */}
                      <div className="grid grid-cols-10 gap-1 sm:gap-1.5 mb-1.5">
                        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((k) => (
                          <button
                            key={k}
                            onClick={() => {
                              triggerKeyAudio(k);
                              setVirtualTypedText(prev => prev + (capsLock ? k : k.toLowerCase()));
                            }}
                            className={`p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                              keyPressFeedback === k ? 'bg-amber-400 text-slate-900 scale-95' : 'bg-slate-700 text-white hover:bg-slate-600'
                            }`}
                          >
                            {capsLock ? k : k.toLowerCase()}
                          </button>
                        ))}
                      </div>

                      {/* Row 2 */}
                      <div className="grid grid-cols-9 gap-1 sm:gap-1.5 mb-1.5 px-3">
                        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((k) => (
                          <button
                            key={k}
                            onClick={() => {
                              triggerKeyAudio(k);
                              setVirtualTypedText(prev => prev + (capsLock ? k : k.toLowerCase()));
                            }}
                            className={`p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                              keyPressFeedback === k ? 'bg-amber-400 text-slate-900 scale-95' : 'bg-slate-700 text-white hover:bg-slate-600'
                            }`}
                          >
                            {capsLock ? k : k.toLowerCase()}
                          </button>
                        ))}
                      </div>

                      {/* Row 3 */}
                      <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5">
                        <button
                          onClick={() => setCapsLock(!capsLock)}
                          className={`px-3 py-2.5 rounded-lg text-xs font-bold ${capsLock ? 'bg-amber-500 text-white' : 'bg-slate-600 text-slate-300'}`}
                        >
                          ⇧
                        </button>
                        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 flex-1">
                          {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((k) => (
                            <button
                              key={k}
                              onClick={() => {
                                triggerKeyAudio(k);
                                setVirtualTypedText(prev => prev + (capsLock ? k : k.toLowerCase()));
                              }}
                              className={`p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                                keyPressFeedback === k ? 'bg-amber-400 text-slate-900 scale-95' : 'bg-slate-700 text-white hover:bg-slate-600'
                              }`}
                            >
                              {capsLock ? k : k.toLowerCase()}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            triggerKeyAudio('DEL');
                            setVirtualTypedText(prev => prev.slice(0, -1));
                          }}
                          className="px-3 py-2.5 rounded-lg bg-slate-600 hover:bg-slate-500 text-white text-xs font-bold"
                        >
                          ⌫
                        </button>
                      </div>

                      {/* Row 4: Spacebar & Actions */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => {
                            triggerKeyAudio('CLEAR');
                            setVirtualTypedText('');
                          }}
                          className="px-3 py-2 rounded-lg bg-slate-700 text-slate-300 hover:text-white text-xs font-bold"
                        >
                          Clear
                        </button>

                        <button
                          onClick={() => {
                            triggerKeyAudio('SPACE');
                            setVirtualTypedText(prev => prev + ' ');
                          }}
                          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FF9933] via-slate-700 to-[#138808] text-white text-xs font-bold shadow-md hover:opacity-95"
                        >
                          SPACEBAR • {SUPPORTED_LANGUAGES.find(l => l.id === activeKeyboardScript)?.nativeName || 'हिन्दी'}
                        </button>

                        <button
                          onClick={() => {
                            triggerKeyAudio('SMILE');
                            setVirtualTypedText(prev => prev + ' 😊');
                          }}
                          className="px-3 py-2 rounded-lg bg-slate-700 text-amber-300 hover:bg-slate-600 text-sm"
                        >
                          😊
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 2. TRANSLITERATION TESTER                                     */}
                {/* ------------------------------------------------------------- */}
                {selectedFeature.id === 'transliteration' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-700 uppercase">
                        Select Target Script to Transliterate Into:
                      </span>
                      <select
                        value={transliterationScript}
                        onChange={(e) => setTransliterationScript(e.target.value)}
                        className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#000080]"
                      >
                        {SUPPORTED_LANGUAGES.map((l) => (
                          <option key={l.id} value={l.id}>{l.name} ({l.nativeName})</option>
                        ))}
                      </select>
                    </div>

                    {/* Input Field */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-slate-500">
                        Type in English (Roman letters) – e.g. "namaste bhai kaise ho":
                      </div>
                      <input
                        type="text"
                        value={transliterationInput}
                        onChange={(e) => setTransliterationInput(e.target.value)}
                        placeholder="Type English words here..."
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#000080]"
                      />
                    </div>

                    {/* Preset Buttons */}
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] text-slate-400 font-semibold mr-1">Quick Presets:</span>
                      {['namaste bhai', 'kya haal hai', 'dhanyavaad', 'subh prabhat', 'shukriya'].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => setTransliterationInput(preset)}
                          className="rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11px] font-bold text-[#000080] hover:bg-amber-100 active:scale-95 transition-all"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>

                    {/* Converted Native Output */}
                    <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-[#000080] p-5 text-white shadow-xl">
                      <div className="flex items-center justify-between text-xs text-amber-300 font-bold mb-2">
                        <span>Real-Time Converted Native Script Output:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => playAudioVoice(getTransliteratedPreview(transliterationInput, transliterationScript))}
                            className="bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded text-[11px] flex items-center gap-1"
                          >
                            <Volume2 className="h-3 w-3" />
                            <span>Listen</span>
                          </button>
                          <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px]">0.01s Latency</span>
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white min-h-[48px] flex items-center">
                        {getTransliteratedPreview(transliterationInput, transliterationScript)}
                      </div>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 3. VOICE INPUT TESTER                                         */}
                {/* ------------------------------------------------------------- */}
                {selectedFeature.id === 'voice-input' && (
                  <div className="space-y-5 text-center py-2">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-xs font-bold text-slate-600">Language:</span>
                      <select
                        value={voiceLanguage}
                        onChange={(e) => setVoiceLanguage(e.target.value)}
                        className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#000080]"
                      >
                        <option value="hi-IN">Hindi (हिन्दी)</option>
                        <option value="ta-IN">Tamil (தமிழ்)</option>
                        <option value="te-IN">Telugu (తెలుగు)</option>
                        <option value="bn-IN">Bengali (বাংলা)</option>
                        <option value="mr-IN">Marathi (मराठी)</option>
                        <option value="gu-IN">Gujarati (ગુજરાતી)</option>
                        <option value="en-IN">Indian English</option>
                      </select>
                    </div>

                    {/* Big Interactive Mic Button */}
                    <div className="flex justify-center">
                      <button
                        onClick={toggleSpeechRecognition}
                        className={`relative flex h-24 w-24 items-center justify-center rounded-full shadow-2xl transition-all ${
                          isVoiceListening
                            ? 'bg-red-500 text-white animate-pulse ring-8 ring-red-200'
                            : 'bg-gradient-to-tr from-[#FF9933] to-[#F28500] text-white hover:scale-105 shadow-amber-500/30'
                        }`}
                      >
                        <Mic className="h-10 w-10" />
                        {isVoiceListening && (
                          <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="text-xs font-bold text-slate-700">
                      {isVoiceListening ? '🔴 Recording & Transcribing... (Speak in selected language)' : 'Tap Microphone to Start Voice Typing'}
                    </div>

                    {/* Waveform Visualizer */}
                    {isVoiceListening && (
                      <div className="flex items-center justify-center space-x-1.5 h-8">
                        {[40, 80, 100, 60, 90, 45, 80, 100, 70, 50, 85, 30].map((h, i) => (
                          <motion.span
                            key={i}
                            animate={{ height: ['20%', `${h}%`, '30%'] }}
                            transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                            className="w-1.5 bg-[#000080] rounded-full"
                          />
                        ))}
                      </div>
                    )}

                    {/* Result Card */}
                    <div className="rounded-2xl bg-slate-900 p-5 text-left text-white shadow-xl">
                      <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-2">
                        <span>Recognized Speech Transcription</span>
                        <button
                          onClick={() => playAudioVoice(voiceResultText)}
                          className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded text-white"
                        >
                          <Volume2 className="h-3 w-3" />
                          <span>Playback</span>
                        </button>
                      </div>
                      <p className="text-base sm:text-lg font-bold text-slate-100">
                        {voiceResultText}
                      </p>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 4. HANDWRITING CANVAS TESTER                                  */}
                {/* ------------------------------------------------------------- */}
                {selectedFeature.id === 'handwriting-input' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase">
                        Interactive Touch/Mouse Drawing Pad:
                      </span>
                      <button
                        onClick={handleClearCanvas}
                        className="flex items-center space-x-1 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 px-2.5 py-1 rounded-lg"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Clear Canvas</span>
                      </button>
                    </div>

                    {/* Canvas Area */}
                    <div className="relative rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/40 p-2 overflow-hidden">
                      <canvas
                        ref={canvasRef}
                        width={600}
                        height={200}
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        onMouseLeave={handleCanvasMouseUp}
                        className="w-full h-48 bg-white rounded-xl shadow-inner cursor-crosshair touch-none"
                      />
                      <div className="pointer-events-none absolute bottom-4 left-4 text-[11px] font-semibold text-slate-500 bg-white/90 px-2.5 py-1 rounded-md border border-slate-200">
                        ✏️ Draw any letter or word (e.g. क, ॐ, த, அ) with your finger or mouse
                      </div>
                    </div>

                    {/* Real-time Recognition Box */}
                    <div className="rounded-2xl bg-[#000080] p-4 text-white flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-amber-300 uppercase font-bold tracking-wider">AI OCR Prediction:</div>
                        <div className="text-3xl font-extrabold mt-0.5">{recognizedHandwritingGlyph}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-200">Recognition Confidence:</div>
                        <div className="text-lg font-black text-emerald-400">{handwritingConfidence}% Match</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 5. TEXT TRANSLATION TESTER                                    */}
                {/* ------------------------------------------------------------- */}
                {selectedFeature.id === 'text-translation' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-xs font-bold text-slate-700 block mb-1">Source Language:</span>
                        <select
                          value={translateSourceLang}
                          onChange={(e) => setTranslateSourceLang(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800"
                        >
                          <option value="hi">Hindi (हिन्दी)</option>
                          <option value="en">English</option>
                          <option value="ta">Tamil (தமிழ்)</option>
                        </select>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-[#000080] block mb-1">Target Language:</span>
                        <select
                          value={translateTargetLang}
                          onChange={(e) => setTranslateTargetLang(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-blue-50 px-3 py-2 text-xs font-bold text-[#000080]"
                        >
                          {SUPPORTED_LANGUAGES.map((l) => (
                            <option key={l.id} value={l.id}>{l.name} ({l.nativeName})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Source Input */}
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Source sentence to translate:</label>
                      <textarea
                        value={translateSourceText}
                        onChange={(e) => setTranslateSourceText(e.target.value)}
                        rows={2}
                        className="w-full mt-1 rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm font-medium text-slate-800 focus:bg-white"
                      />
                    </div>

                    <button
                      onClick={handleRunTranslate}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF9933] to-[#138808] text-white text-xs font-bold shadow-md hover:opacity-95 flex items-center justify-center gap-2"
                    >
                      {isTranslatingAnim ? <span className="animate-spin">🔄</span> : <Repeat className="h-4 w-4" />}
                      <span>Translate Message Instantly</span>
                    </button>

                    {/* Translated Result */}
                    <div className="rounded-2xl bg-slate-900 p-4 text-white shadow-xl">
                      <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-1">
                        <span>Translated Result:</span>
                        <button
                          onClick={() => playAudioVoice(translatedResultText)}
                          className="bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded text-[11px] flex items-center gap-1"
                        >
                          <Volume2 className="h-3 w-3" />
                          <span>Pronounce</span>
                        </button>
                      </div>
                      <p className="text-base sm:text-lg font-bold text-slate-100">
                        {translatedResultText}
                      </p>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 6. VOICE TRANSLATION TESTER                                   */}
                {/* ------------------------------------------------------------- */}
                {selectedFeature.id === 'voice-translation' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-700">
                      <span className="font-bold text-[#000080]">Cross-Lingual Voice Engine: </span>
                      Speak in Hindi, and the keyboard speaks out the translation in Tamil/Telugu/Bengali in real-time.
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
                        <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Source Voice (Hindi)</div>
                        <div className="text-base font-bold text-slate-800">{voiceTranslateSource}</div>
                        <button
                          onClick={() => playAudioVoice(voiceTranslateSource, 'hi-IN')}
                          className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#000080]"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                          <span>Play Hindi Voice</span>
                        </button>
                      </div>

                      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                        <div className="text-[10px] text-[#000080] font-bold uppercase mb-1">Synthesized Voice Output (Tamil)</div>
                        <div className="text-base font-bold text-[#000080]">{voiceTranslateTarget}</div>
                        <button
                          onClick={() => playAudioVoice(voiceTranslateTarget, 'ta-IN')}
                          className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-700"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                          <span>Speak Out in Tamil</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 7. AUTOCORRECTION & MATRA ENGINE TESTER                       */}
                {/* ------------------------------------------------------------- */}
                {selectedFeature.id === 'autocorrection' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase">Try Typo Auto-Repair:</span>
                      <div className="flex gap-1">
                        {(['mild', 'standard', 'strict'] as const).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setAutocorrectStrictness(mode)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                              autocorrectStrictness === mode ? 'bg-[#000080] text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">
                        Type typos like "namste", "shukria", "ap kaise ho", "bhaiyaa":
                      </label>
                      <input
                        type="text"
                        value={autocorrectInput}
                        onChange={(e) => handleAutocorrectTyping(e.target.value)}
                        className="w-full mt-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800"
                      />
                    </div>

                    <div className="rounded-2xl bg-emerald-950 p-4 text-white shadow-xl flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-emerald-400 font-bold uppercase">Corrected Indian Output:</div>
                        <div className="text-xl font-black mt-1 text-white">{autocorrectResult}</div>
                      </div>
                      <button
                        onClick={() => {
                          setAutocorrectResult(autocorrectInput);
                          setHasRevertedCorrection(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-bold"
                      >
                        {hasRevertedCorrection ? 'Reverted' : 'Rollback Typo'}
                      </button>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 8. GLIDE TYPING GESTURE TESTER                                */}
                {/* ------------------------------------------------------------- */}
                {selectedFeature.id === 'glide-typing' && (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-600 font-medium">
                      Drag your mouse or finger across the keyboard to try continuous gesture typing:
                    </div>

                    {/* Interactive Glide Canvas Track */}
                    <div
                      onMouseDown={() => setIsGliding(true)}
                      onMouseUp={() => setIsGliding(false)}
                      onMouseLeave={() => setIsGliding(false)}
                      onMouseMove={handleGlideMouseMove}
                      className="relative rounded-2xl bg-slate-900 p-6 border border-slate-700 h-44 flex flex-col justify-center items-center cursor-crosshair select-none overflow-hidden"
                    >
                      {/* Glide Trail Points */}
                      {glideTrailPoints.map((pt, idx) => (
                        <div
                          key={idx}
                          style={{ left: pt.x, top: pt.y }}
                          className="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-80 blur-[1px]"
                        />
                      ))}

                      <div className="grid grid-cols-10 gap-2 opacity-50 pointer-events-none text-center text-xs font-bold text-white">
                        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(k => (
                          <span key={k} className="p-2 rounded bg-slate-800">{k}</span>
                        ))}
                      </div>

                      <div className="mt-3 text-center pointer-events-none">
                        <span className="text-[11px] text-amber-300 font-bold uppercase">Inferred Glide Word:</span>
                        <div className="text-2xl font-black text-white">{isGliding ? 'Tracing...' : 'NAMASTE'}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 9. EMOJIS, STICKERS & MEMES TESTER                            */}
                {/* ------------------------------------------------------------- */}
                {selectedFeature.id === 'emoji-gifs-stickers' && (
                  <div className="space-y-4">
                    {/* Category Selector */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {(['festivals', 'bollywood', 'chai', 'cricket', 'reactions'] as const).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveStickerCategory(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-all ${
                            activeStickerCategory === cat
                              ? 'bg-[#000080] text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Sticker Picker Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                      {[
                        { emoji: '🪔', label: 'Diwali', sub: 'शुभ दीपावली' },
                        { emoji: '🙏', label: 'Namaste', sub: 'प्रणाम' },
                        { emoji: '☕', label: 'Chai', sub: 'Chai Time' },
                        { emoji: '🇮🇳', label: 'Bharat', sub: 'Jai Hind' },
                        { emoji: '🏏', label: 'Sixer', sub: 'Chakka!' },
                        { emoji: '🎉', label: 'Badhai', sub: 'बधाई हो' },
                      ].map((st, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSimulatedChatHistory(prev => [
                              ...prev,
                              { id: Date.now(), type: 'sticker', content: st.emoji, caption: st.sub, time: 'Just now' }
                            ]);
                          }}
                          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50/70 border border-amber-200 hover:bg-amber-100 hover:scale-105 active:scale-95 transition-all text-center"
                        >
                          <span className="text-3xl">{st.emoji}</span>
                          <span className="text-[10px] font-bold text-slate-800 mt-1">{st.label}</span>
                          <span className="text-[9px] text-[#000080] font-medium">{st.sub}</span>
                        </button>
                      ))}
                    </div>

                    {/* Simulated Chat Feed */}
                    <div className="rounded-2xl bg-slate-100 p-4 border border-slate-200 max-h-40 overflow-y-auto space-y-2">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Conversation Preview:</div>
                      {simulatedChatHistory.map((msg) => (
                        <div key={msg.id} className="flex justify-end">
                          <div className="bg-[#E7FFDB] border border-emerald-200 rounded-2xl rounded-tr-xs p-2.5 text-xs shadow-2xs max-w-xs">
                            {msg.type === 'sticker' ? (
                              <div className="text-center">
                                <span className="text-3xl block">{msg.content}</span>
                                <span className="text-[10px] font-bold text-emerald-900">{msg.caption}</span>
                              </div>
                            ) : (
                              <div className="text-slate-800 font-medium">{msg.content}</div>
                            )}
                            <div className="text-[9px] text-slate-400 text-right mt-1">{msg.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 10. CUSTOM PHOTO STICKER STUDIO TESTER                        */}
                {/* ------------------------------------------------------------- */}
                {selectedFeature.id === 'custom-stickers' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Controls */}
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">Pick Avatar / Emoji Base:</label>
                          <div className="flex gap-2">
                            {['🪔', '👳', '☕', '🇮🇳', '😎', '🦁'].map((em) => (
                              <button
                                key={em}
                                onClick={() => setCustomStickerAvatar(em)}
                                className={`text-2xl p-2 rounded-xl border ${
                                  customStickerAvatar === em ? 'bg-amber-100 border-[#000080]' : 'bg-slate-50 border-slate-200'
                                }`}
                              >
                                {em}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">Custom Sticker Text / Caption:</label>
                          <input
                            type="text"
                            value={customStickerText}
                            onChange={(e) => setCustomStickerText(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">Sticker Border Style:</label>
                          <div className="flex gap-2">
                            {(['diwali', 'tricolour', 'chai', 'swag'] as const).map((frame) => (
                              <button
                                key={frame}
                                onClick={() => setCustomStickerFrame(frame)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize ${
                                  customStickerFrame === frame ? 'bg-[#000080] text-white' : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {frame}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Live Generated Sticker Preview */}
                      <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-tr from-amber-100 via-amber-50 to-orange-100 border-2 border-dashed border-amber-300 text-center">
                        <div className="relative p-6 rounded-full bg-white shadow-xl border-4 border-[#FF9933]">
                          <span className="text-5xl">{customStickerAvatar}</span>
                        </div>
                        <div className="mt-3 px-4 py-1.5 rounded-full bg-[#000080] text-white text-xs font-extrabold shadow-md">
                          {customStickerText}
                        </div>
                        <button
                          onClick={() => {
                            setCreatedStickerToast('Custom sticker saved to your Desi Sticker Pack!');
                            setTimeout(() => setCreatedStickerToast(null), 2500);
                          }}
                          className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Export WhatsApp Sticker</span>
                        </button>
                        {createdStickerToast && (
                          <div className="mt-2 text-[11px] font-bold text-emerald-800">{createdStickerToast}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 11. THEMES & KEYBOARD DESIGNER TESTER                         */}
                {/* ------------------------------------------------------------- */}
                {selectedFeature.id === 'themes' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase">Select Theme Aesthetic:</span>
                      <div className="flex gap-2">
                        {THEMES.slice(0, 4).map((th) => (
                          <button
                            key={th.id}
                            onClick={() => setPreviewThemeId(th.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                              previewThemeId === th.id ? 'bg-[#000080] text-white shadow-md' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {th.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Live Themed Keyboard Render */}
                    <div className="rounded-3xl p-5 bg-gradient-to-r from-slate-900 to-[#000080] text-white shadow-2xl border border-slate-700">
                      <div className="flex items-center justify-between text-xs text-amber-300 font-bold mb-3">
                        <span>Theme: {THEMES.find(t => t.id === previewThemeId)?.name || 'Tricolour'}</span>
                        <span>Key Feedback: {soundFeedback ? 'Sound ON 🔊' : 'Silent 🔇'}</span>
                      </div>

                      <div className="grid grid-cols-10 gap-1.5 text-center text-xs font-bold">
                        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((k) => (
                          <button
                            key={k}
                            onClick={() => triggerKeyAudio(k)}
                            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white active:scale-95 transition-all shadow-xs"
                          >
                            {k}
                          </button>
                        ))}
                      </div>

                      <div className="mt-3 flex justify-center">
                        <button
                          onClick={() => triggerKeyAudio('SPACE')}
                          className="w-56 py-2 rounded-xl bg-gradient-to-r from-[#FF9933] to-[#138808] text-white text-xs font-extrabold shadow-md active:scale-98"
                        >
                          SPACEBAR • {THEMES.find(t => t.id === previewThemeId)?.name}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 12. STYLISH UNICODE FONTS GENERATOR TESTER                    */}
                {/* ------------------------------------------------------------- */}
                {selectedFeature.id === 'stylish-fonts' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Type any phrase to convert into 10+ stylish Unicode fonts:
                      </label>
                      <input
                        type="text"
                        value={customFontInput}
                        onChange={(e) => setCustomFontInput(e.target.value)}
                        placeholder="Type text..."
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {[
                        'Fraktur / Gothic',
                        'Double-Struck / Bold',
                        'Circled / Bubble',
                        'Square Negative',
                        'Cursive Script'
                      ].map((styleName, idx) => {
                        const previewText = transformToUnicode(customFontInput, styleName);
                        return (
                          <div
                            key={styleName}
                            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-colors"
                          >
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 block uppercase">{styleName}</span>
                              <span className="text-base font-extrabold text-[#172033]">{previewText || customFontInput}</span>
                            </div>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(previewText);
                                setCopiedFontIdx(idx);
                                setTimeout(() => setCopiedFontIdx(null), 2000);
                              }}
                              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#000080] hover:bg-amber-50 shadow-2xs"
                            >
                              {copiedFontIdx === idx ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                              <span>{copiedFontIdx === idx ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 13. APP DRAWER & PRODUCTIVITY TESTER                          */}
                {/* ------------------------------------------------------------- */}
                {selectedFeature.id === 'app-drawer' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Mini Calculator */}
                      <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-xl">
                        <div className="text-[10px] text-amber-400 font-bold uppercase mb-1">Embedded Keyboard Calculator</div>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={calcInput}
                            onChange={(e) => setCalcInput(e.target.value)}
                            className="w-full bg-slate-800 rounded-lg px-2.5 py-1 text-xs font-bold text-white"
                          />
                          <button
                            onClick={handleCalcEval}
                            className="px-3 py-1 bg-emerald-600 rounded-lg text-xs font-bold text-white hover:bg-emerald-700"
                          >
                            =
                          </button>
                        </div>
                        <div className="text-right text-lg font-black text-amber-300">Result: {calcResult}</div>
                      </div>

                      {/* Clipboard Manager */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="text-[10px] text-slate-500 font-bold uppercase mb-2">Clipboard History & OTPs</div>
                        <div className="space-y-1.5">
                          {clipboardItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs">
                              <span className="font-semibold text-slate-700 truncate">{item.text}</span>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(item.text);
                                  alert(`Copied: ${item.text}`);
                                }}
                                className="text-[10px] font-bold text-[#000080] hover:underline"
                              >
                                Paste
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Quick Callout */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  <span className="font-bold text-slate-700">Shortcut: </span>
                  {FEATURE_SPECS[selectedFeature.id]?.shortcut || 'Built into standard keyboard toolbar'}
                </div>
                
                <RippleButton
                  onClick={() => setModalFeature(selectedFeature)}
                  rippleColor="rgba(255, 255, 255, 0.4)"
                  className="rounded-xl bg-[#000080] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-navy-900 transition-colors"
                >
                  <span>View Feature Documentation</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </RippleButton>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: ALL FEATURE CARDS GRID                            */}
        {/* ========================================================= */}
        {viewMode === 'grid' && (
          <div className="mt-12">
            {filteredFeatures.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
                <Search className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                <p className="text-base font-bold text-slate-700">No features found matching "{searchQuery}"</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#000080] text-white text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {filteredFeatures.map((feature, idx) => {
                    const IconComponent = iconMap[feature.icon] || Keyboard;
                    const spec = FEATURE_SPECS[feature.id];

                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25, delay: idx * 0.02 }}
                        key={feature.id}
                        onClick={() => {
                          setSelectedFeature(feature);
                          setViewMode('showcase');
                        }}
                        className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 border border-slate-200/90 hover:border-amber-400 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                      >
                        <div>
                          <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-50 to-amber-100/70 text-[#000080] border border-amber-200/80 group-hover:scale-108 group-hover:bg-[#000080] group-hover:text-white transition-all">
                              <IconComponent className="h-6 w-6" />
                            </div>

                            <div className="flex flex-col items-end space-y-1">
                              {feature.badge && (
                                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200 shadow-2xs">
                                  {feature.badge}
                                </span>
                              )}
                              {spec?.offlineSupported && (
                                <span className="text-[10px] text-slate-600 flex items-center font-medium">
                                  <ShieldCheck className="h-3 w-3 text-emerald-600 mr-0.5" />
                                  Offline
                                </span>
                              )}
                            </div>
                          </div>

                          <h3 className="mt-4 text-base font-bold text-[#172033] group-hover:text-[#000080] transition-colors flex items-center justify-between">
                            <span>{feature.title}</span>
                            <ArrowRight className="h-4 w-4 text-amber-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </h3>

                          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {feature.description}
                          </p>

                          {spec?.tagline && (
                            <div className="mt-3 rounded-lg bg-slate-50 p-2 text-[11px] text-slate-600 border border-slate-100">
                              <span className="font-semibold text-[#000080]">Advantage: </span>
                              {spec.tagline}
                            </div>
                          )}
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-400">
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">{feature.category}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFeature(feature);
                              setViewMode('showcase');
                            }}
                            className="inline-flex items-center text-[#FF9933] font-bold hover:text-[#000080] transition-colors"
                          >
                            <Play className="h-3 w-3 mr-1 fill-current" />
                            Interactive Preview
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: COMPREHENSIVE CAPABILITY MATRIX TABLE             */}
        {/* ========================================================= */}
        {viewMode === 'comparison' && (
          <div className="mt-10 overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl">
            <div className="p-6 bg-gradient-to-r from-[#000080] to-[#172033] text-white">
              <h3 className="text-xl font-bold">Comprehensive Keyboard Capability Matrix</h3>
              <p className="text-xs text-slate-300 mt-1">
                How Desi AI Keyboard compares against standard global keyboards for Indian language communication.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    <th className="py-4 px-6">Feature & Linguistic Capability</th>
                    <th className="py-4 px-6 text-[#000080] bg-amber-50/80 font-extrabold">Desi AI Keyboard</th>
                    <th className="py-4 px-6 text-slate-500">Standard Gboard</th>
                    <th className="py-4 px-6 text-slate-500">Other Generic Keyboards</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-800 flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#138808] shrink-0" />
                        <span>{row.capability}</span>
                      </td>
                      <td className="py-4 px-6 bg-amber-50/50 font-bold text-[#000080]">
                        {row.desiAI}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {row.standardGboard}
                      </td>
                      <td className="py-4 px-6 text-slate-400">
                        {row.otherKeyboards}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Feature Deep Dive Modal */}
      <AnimatePresence>
        {modalFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#000080] text-white">
                    {React.createElement(iconMap[modalFeature.icon] || Keyboard, { className: 'h-5 w-5 text-amber-300' })}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-[#172033]">{modalFeature.title}</h4>
                    <span className="text-xs text-slate-500 font-semibold">{modalFeature.category}</span>
                  </div>
                </div>
                <button
                  onClick={() => setModalFeature(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {modalFeature.description}
                </p>

                <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs space-y-2">
                  <div className="font-bold text-[#000080]">Engineering Highlights:</div>
                  <ul className="space-y-1.5 text-slate-700">
                    {FEATURE_SPECS[modalFeature.id]?.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-bold">Latency Benchmark</span>
                    <span className="font-extrabold text-[#000080]">{FEATURE_SPECS[modalFeature.id]?.performanceMetric || '< 15ms'}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-bold">Offline Support</span>
                    <span className="font-extrabold text-emerald-700">
                      {FEATURE_SPECS[modalFeature.id]?.offlineSupported ? '100% On-Device Offline' : 'Cloud Neural Mode'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedFeature(modalFeature);
                    setModalFeature(null);
                    setViewMode('showcase');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#000080] text-white text-xs font-bold hover:bg-navy-900 shadow-md flex items-center gap-1.5"
                >
                  <Play className="h-3.5 w-3.5 text-amber-300 fill-current" />
                  <span>Try This Feature</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
