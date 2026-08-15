import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Sparkles, ArrowRightLeft, Check, Volume2, Copy } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../data/content';
import { LanguageItem } from '../types';

export const MultilingualSection: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageItem>(SUPPORTED_LANGUAGES[0]);
  const [testInput, setTestInput] = useState<string>('kya haal hai');
  const [copied, setCopied] = useState<boolean>(false);

  // Transliteration dictionary map for interactive quick preview
  const transliterationMap: Record<string, Record<string, string>> = {
    hi: {
      'kya haal hai': 'क्या हाल है',
      'namaste': 'नमस्ते',
      'dhanyavaad': 'धन्यवाद',
      'shubh ratri': 'शुभ रात्रि',
      'aap kaise hain': 'आप कैसे हैं',
    },
    or: {
      'kemiti achanti': 'କେମିତି ଅଛନ୍ତି',
      'namaskar': 'ନମସ୍କାର',
      'dhanyabad': 'ଧନ୍ୟବାଦ',
      'subha sandhya': 'ଶୁଭ ସନ୍ଧ୍ୟା',
      'kya haal hai': 'କେମିତି ଅଛନ୍ତି (Odia)',
    },
    ur: {
      'aap kaise hain': 'آپ کیسے ہیں',
      'salaam': 'سلام',
      'shukriya': 'شکریہ',
      'khuda hafiz': 'خدا حافظ',
      'kya haal hai': 'کیا حال ہے',
    },
    ta: {
      'eppadi irukkinga': 'எப்படி இருக்கீங்க',
      'vanakkam': 'வணக்கம்',
      'nandri': 'நன்றி',
      'kya haal hai': 'எப்படி இருக்கீங்க (Tamil)',
    },
    te: {
      'ela unnaru': 'ఎలా ఉన్నారు',
      'namaskaram': 'నమస్కారం',
      'dhanyavadalu': 'ధన్యవాదాలు',
      'kya haal hai': 'ఎలా ఉన్నారు (Telugu)',
    },
    bn: {
      'kemon achhen': 'কেমন আছেন',
      'nomoshkar': 'নমস্কার',
      'dhonnobad': 'ধন্যবাদ',
      'kya haal hai': 'কেমন আছেন (Bengali)',
    },
    mr: {
      'kase aahat': 'कसे आहात',
      'namaskar': 'नमस्कार',
      'dhanyavaad': 'धन्यवाद',
      'kya haal hai': 'कसे आहात',
    },
    gu: {
      'kem chho': 'કેમ છો',
      'namaste': 'નમસ્તે',
      'aabhar': 'આભાર',
      'kya haal hai': 'કેમ છો (Gujarati)',
    },
    kn: {
      'hegiddira': 'ಹೇಗಿದ್ದೀರಾ',
      'namaskara': 'ನಮಸ್ಕಾರ',
      'dhanyavada': 'ಧನ್ಯವಾದ',
      'kya haal hai': 'ಹೇಗಿದ್ದೀರಾ (Kannada)',
    },
    ml: {
      'sukhamano': 'സുഖമാണോ',
      'namaskaram': 'നമസ്കാരം',
      'nandi': 'നന്ദി',
      'kya haal hai': 'സുഖമാണോ (Malayalam)',
    },
    pa: {
      'ki haal hai': 'ਕੀ ਹਾਲ ਹੈ',
      'sat sri akaal': 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ',
      'dhanvaad': 'ਧੰਨਵਾਦ',
      'kya haal hai': 'ਕੀ ਹਾਲ ਹੈ',
    },
    en: {
      'kya haal hai': 'How are you',
      'namaste': 'Hello / Greetings',
      'dhanyavaad': 'Thank you',
    },
  };

  const getTransliteratedOutput = () => {
    const langMap = transliterationMap[selectedLanguage.id];
    if (langMap && langMap[testInput.toLowerCase().trim()]) {
      return langMap[testInput.toLowerCase().trim()];
    }
    // Fallback display
    return selectedLanguage.sampleOutput;
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(getTransliteratedOutput());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="languages" className="relative py-20 lg:py-28 bg-[#FFFDF8] overflow-hidden">
      
      {/* Background script accents */}
      <div className="pointer-events-none absolute inset-0 select-none opacity-[0.03] text-7xl font-bold flex flex-wrap justify-between p-6">
        <span>ন</span> <span>த</span> <span>చ</span> <span>শ</span> <span>ସ</span> <span>ગ</span> <span>ಕ</span> <span>म</span> <span>س</span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-[#138808] border border-emerald-200 mb-3">
            <Globe className="h-3.5 w-3.5" />
            <span>Inclusive Bharat Multilingual Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033]">
            One Keyboard. Many Indian Languages.
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Communicate naturally in the language that feels like home. Switch seamlessly across Indian scripts with native rendering, accurate ligatures, and contextual transliteration.
          </p>
        </div>

        {/* 12 Language Cards Grid + Coming Soon Card */}
        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage.id === lang.id;
            return (
              <motion.button
                key={lang.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedLanguage(lang);
                  setTestInput(lang.sampleInput);
                }}
                className={`relative flex flex-col items-start rounded-2xl p-4 sm:p-5 text-left transition-all border ${
                  isSelected
                    ? 'bg-white border-[#000080] shadow-md ring-2 ring-[#000080]/15'
                    : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-amber-300 hover:shadow-xs'
                }`}
              >
                {/* Top Badge: Name & Tag */}
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">{lang.name}</span>
                  {lang.isRTL && (
                    <span className="rounded-sm bg-purple-100 px-1.5 py-0.2 text-[9px] font-bold text-purple-700">
                      RTL
                    </span>
                  )}
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-[#138808]"></span>
                  )}
                </div>

                {/* Native Script Greeting Headline */}
                <div
                  className={`mt-2 text-xl sm:text-2xl font-bold text-[#172033] ${lang.scriptFontClass} ${
                    lang.isRTL ? 'w-full text-right' : ''
                  }`}
                  dir={lang.isRTL ? 'rtl' : 'ltr'}
                >
                  {lang.greeting}
                </div>

                {/* Transliterated Subtitle */}
                <div className="mt-1 text-xs text-slate-500">
                  {lang.nativeName} • <span className="italic text-slate-600 font-medium">{lang.greetingTransliteration}</span>
                </div>

                {/* Micro Input Example */}
                <div className="mt-3 w-full border-t border-slate-100 pt-2 text-[11px] text-slate-400">
                  <span className="text-[10px] text-amber-700 font-semibold">Try:</span> "{lang.sampleInput}"
                </div>
              </motion.button>
            );
          })}

          {/* Highlighted "More Languages Coming Soon" Card */}
          <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-amber-500/10 via-[#FFFDF8] to-emerald-500/10 p-4 sm:p-5 border-2 border-dashed border-amber-400/80 text-left">
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#000080]">
                <span>Coming Soon</span>
                <span>🇮🇳</span>
              </div>
              <h3 className="mt-2 text-base font-bold text-[#172033]">
                More Indian Languages
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Assamese, Maithili, Santali, Sanskrit, Kashmiri, Sindhi, and more regional dialects are actively being added.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
              <span>Growing Bharat Coverage</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Transliteration Playground Box */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 sm:p-8 text-white shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center space-x-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Live Transliteration</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Type in English, Output in {selectedLanguage.name} ({selectedLanguage.nativeName})
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Type phonetically in English and see your words convert into authentic {selectedLanguage.name} script without memorizing complex key layouts.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['namaste', 'dhanyavaad', selectedLanguage.sampleInput].map((phrase, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTestInput(phrase)}
                    className="rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-xs text-slate-200 border border-slate-700"
                  >
                    "{phrase}"
                  </button>
                ))}
              </div>
            </div>

            {/* Input & Output Boxes */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* English Input */}
              <div className="flex flex-col rounded-2xl bg-slate-900/90 border border-slate-700 p-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
                  <span>English (Hinglish/Phonetic)</span>
                  <span className="text-[10px] text-amber-400">Editable</span>
                </div>
                <textarea
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  placeholder="Type words like 'kya haal hai' or 'namaste'..."
                  rows={3}
                  className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 outline-hidden resize-none"
                />
                <div className="mt-auto text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                  Phonetic English input
                </div>
              </div>

              {/* Native Script Output */}
              <div className="flex flex-col rounded-2xl bg-gradient-to-br from-amber-950/30 to-emerald-950/30 border border-amber-500/40 p-4">
                <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-2">
                  <span>{selectedLanguage.name} Output</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center space-x-1 text-[11px] text-slate-300 hover:text-white bg-white/10 px-2 py-0.5 rounded-md"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div
                  className={`text-lg sm:text-xl font-bold text-white min-h-[72px] flex items-center ${selectedLanguage.scriptFontClass}`}
                  dir={selectedLanguage.isRTL ? 'rtl' : 'ltr'}
                >
                  {getTransliteratedOutput()}
                </div>
                <div className="mt-auto text-[10px] text-amber-200/80 pt-2 border-t border-amber-500/20 flex items-center justify-between">
                  <span>Script: {selectedLanguage.nativeName}</span>
                  <span className="font-semibold text-emerald-400">AI Verified ✓</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
