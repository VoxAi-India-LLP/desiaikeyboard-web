import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Mic, 
  Languages, 
  Smile, 
  Palette, 
  Copy, 
  Send, 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical, 
  Globe, 
  CheckCheck,
  Volume2,
  PenTool,
  CornerDownLeft,
  Delete
} from 'lucide-react';
import { THEMES, SUPPORTED_LANGUAGES } from '../data/content';
import { ThemeOption, LanguageItem } from '../types';

interface InteractivePhoneMockupProps {
  initialThemeId?: string;
  initialLanguageId?: string;
  initialInputMode?: 'type' | 'speak' | 'write';
  activeFeaturePreview?: string;
  showToolbar?: boolean;
  className?: string;
  onSelectTheme?: (themeId: string) => void;
}

export const InteractivePhoneMockup: React.FC<InteractivePhoneMockupProps> = ({
  initialThemeId = 'tricolour',
  initialLanguageId = 'hi',
  initialInputMode = 'type',
  activeFeaturePreview,
  className = '',
}) => {
  const [themeId, setThemeId] = useState(initialThemeId);
  const [langId, setLangId] = useState(initialLanguageId);
  const [inputMode, setInputMode] = useState<'type' | 'speak' | 'write'>(initialInputMode);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [typedMessage, setTypedMessage] = useState('kya haal hai bhai');
  const [transliteratedText, setTransliteratedText] = useState('क्या हाल है भाई');
  const [englishTranslation, setEnglishTranslation] = useState('How are you brother?');
  const [activeSuggestion, setActiveSuggestion] = useState('सब बढ़िया');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'other'; text: string; subtext?: string; time: string }>>([
    { sender: 'other', text: 'Hey! Are you using the new Desi AI Keyboard?', time: '10:28 AM' },
    { sender: 'user', text: 'Haan bilkul! It types in all Indian languages super fast 🚀', subtext: 'हाँ बिल्कुल! It types in all Indian languages super fast 🚀', time: '10:29 AM' },
  ]);

  // Sync prop changes
  useEffect(() => {
    if (initialThemeId) setThemeId(initialThemeId);
  }, [initialThemeId]);

  useEffect(() => {
    if (initialLanguageId) setLangId(initialLanguageId);
  }, [initialLanguageId]);

  useEffect(() => {
    if (initialInputMode) setInputMode(initialInputMode);
  }, [initialInputMode]);

  const activeTheme: ThemeOption = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const activeLang: LanguageItem = SUPPORTED_LANGUAGES.find((l) => l.id === langId) || SUPPORTED_LANGUAGES[0];

  // Language change update
  useEffect(() => {
    if (activeLang.id === 'hi') {
      setTypedMessage('kya haal hai bhai');
      setTransliteratedText('क्या हाल है भाई');
      setEnglishTranslation('How are you brother?');
    } else if (activeLang.id === 'ta') {
      setTypedMessage('eppadi irukkinga');
      setTransliteratedText('எப்படி இருக்கீங்க');
      setEnglishTranslation('How are you doing?');
    } else if (activeLang.id === 'or') {
      setTypedMessage('kemiti achanti');
      setTransliteratedText('କେମିତି ଅଛନ୍ତି');
      setEnglishTranslation('How are you doing?');
    } else if (activeLang.id === 'ur') {
      setTypedMessage('aap kaise hain');
      setTransliteratedText('آپ کیسے ہیں');
      setEnglishTranslation('How are you?');
    } else if (activeLang.id === 'bn') {
      setTypedMessage('kemon achhen');
      setTransliteratedText('কেমন আছেন');
      setEnglishTranslation('How are you?');
    } else if (activeLang.id === 'te') {
      setTypedMessage('ela unnaru');
      setTransliteratedText('ఎలా ఉన్నారు');
      setEnglishTranslation('How are you?');
    } else if (activeLang.id === 'gu') {
      setTypedMessage('kem chho');
      setTransliteratedText('કેમ છો');
      setEnglishTranslation('How are you?');
    } else {
      setTypedMessage(activeLang.sampleInput);
      setTransliteratedText(activeLang.sampleOutput);
      setEnglishTranslation('Greeting in ' + activeLang.name);
    }
  }, [activeLang]);

  // Voice simulation
  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      setInputMode('speak');
      setTimeout(() => {
        setTypedMessage('Voice input captured in ' + activeLang.name);
        setTransliteratedText(activeLang.greeting + ' — आवाज से टाइप किया गया!');
        setIsListening(false);
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  const handleSendMessage = () => {
    if (!transliteratedText.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: transliteratedText,
        subtext: isTranslating ? englishTranslation : undefined,
        time: '10:30 AM',
      },
    ]);
    setTypedMessage('');
    setTransliteratedText('');
  };

  const handleKeyPress = (char: string) => {
    if (char === 'BACK') {
      setTypedMessage((prev) => prev.slice(0, -1));
      setTransliteratedText((prev) => prev.slice(0, -1));
    } else if (char === 'SPACE') {
      setTypedMessage((prev) => prev + ' ');
      setTransliteratedText((prev) => prev + ' ');
    } else {
      setTypedMessage((prev) => prev + char);
      setTransliteratedText((prev) => prev + char);
    }
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  return (
    <div id="interactive-phone-mockup" className={`relative mx-auto w-full max-w-[340px] sm:max-w-[370px] ${className}`}>
      {/* Android Device Outer Frame */}
      <div className="relative rounded-[42px] bg-[#121826] p-3 shadow-2xl ring-1 ring-slate-800/80 shadow-slate-900/30">
        
        {/* Antenna / Volume Button Accents on Bezel */}
        <div className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l-sm bg-slate-700"></div>
        <div className="absolute -left-[3px] top-38 h-10 w-[3px] rounded-l-sm bg-slate-700"></div>
        <div className="absolute -right-[3px] top-28 h-14 w-[3px] rounded-r-sm bg-slate-700"></div>

        {/* Screen Bezel */}
        <div className="relative flex h-[680px] flex-col overflow-hidden rounded-[32px] bg-[#0C111D] text-slate-100 shadow-inner">
          
          {/* Top Status Bar */}
          <div className="flex h-8 items-center justify-between px-5 text-xs text-slate-400">
            <span className="font-semibold text-slate-200">10:30</span>
            {/* Center Punch-hole Camera */}
            <div className="h-3.5 w-3.5 rounded-full bg-[#000000] ring-1 ring-slate-700"></div>
            <div className="flex items-center space-x-1.5 text-[11px]">
              <span className="text-[10px] font-bold text-emerald-400">5G</span>
              <span>●●●●</span>
              <span>98%</span>
            </div>
          </div>

          {/* App Header (Desi Chat / WhatsApp-style mock) */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-[#161F30] px-3.5 py-2.5">
            <div className="flex items-center space-x-2.5">
              <button aria-label="Go back" className="text-slate-400 hover:text-white">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF9933] to-[#138808] text-xs font-bold text-white shadow-xs">
                🇮🇳
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#161F30] bg-emerald-500"></span>
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  Desi Chat
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">AI Live</span>
                </div>
                <div className="text-[10px] text-emerald-400">
                  {activeLang.name} • AI Transliteration ON
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <button aria-label="Call" className="p-1 hover:text-white"><Phone className="h-3.5 w-3.5" /></button>
              <button aria-label="Video" className="p-1 hover:text-white"><Video className="h-3.5 w-3.5" /></button>
              <button aria-label="Menu" className="p-1 hover:text-white"><MoreVertical className="h-3.5 w-3.5" /></button>
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 space-y-2.5 overflow-y-auto bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] p-3 text-xs">
            <div className="my-1 text-center">
              <span className="rounded-full bg-slate-800/80 px-2.5 py-0.5 text-[9px] text-slate-400 border border-slate-700/50">
                End-to-End Encrypted • Powered by Desi AI
              </span>
            </div>

            {chatMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3 py-2 ${
                    msg.sender === 'user'
                      ? 'rounded-tr-xs bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs'
                      : 'rounded-tl-xs bg-slate-800/90 text-slate-100 border border-slate-700/60'
                  }`}
                >
                  <p className={`text-xs ${msg.sender === 'user' && activeLang.isRTL ? 'font-urdu text-right' : ''}`}>
                    {msg.text}
                  </p>
                  {msg.subtext && (
                    <p className="mt-1 border-t border-amber-500/30 pt-1 text-[10px] text-amber-200/90 italic">
                      🌐 {msg.subtext}
                    </p>
                  )}
                  <div className="mt-0.5 flex items-center justify-end space-x-1 text-[9px] text-slate-300">
                    <span>{msg.time}</span>
                    {msg.sender === 'user' && <CheckCheck className="h-2.5 w-2.5 text-sky-300" />}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Live Typing / Translation Banner above keyboard */}
            {isTranslating && (
              <div className="rounded-xl border border-sky-500/30 bg-sky-950/70 p-2 text-[11px] text-sky-200">
                <div className="flex items-center justify-between text-[10px] text-sky-400 font-semibold mb-1">
                  <span className="flex items-center gap-1"><Languages className="h-3 w-3" /> Live Translation</span>
                  <span>{activeLang.name} ➔ English</span>
                </div>
                <div className="font-medium text-white">{englishTranslation}</div>
              </div>
            )}
          </div>

          {/* Active Input Line in Chat */}
          <div className="border-t border-slate-800 bg-[#161F30] px-2.5 py-1.5">
            <div className="flex items-center space-x-2">
              <div className="flex flex-1 items-center rounded-full bg-slate-800/90 px-3 py-1.5 text-xs text-white border border-slate-700/70">
                <input
                  type="text"
                  value={transliteratedText || typedMessage}
                  onChange={(e) => {
                    setTypedMessage(e.target.value);
                    setTransliteratedText(e.target.value);
                  }}
                  placeholder={`Type in ${activeLang.name} or Hinglish...`}
                  className={`w-full bg-transparent text-xs text-slate-100 placeholder-slate-400 outline-hidden ${activeLang.isRTL ? 'text-right font-urdu' : ''}`}
                />
              </div>
              <button
                onClick={handleSendMessage}
                aria-label="Send message"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF9933] text-white shadow-xs hover:bg-amber-600 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Desi AI Keyboard Unit */}
          <div className={`relative flex flex-col ${activeTheme.keyboardBg} p-2 transition-all duration-300 select-none border-t border-slate-800/30`}>
            
            {/* Keyboard Top AI Toolbar */}
            <div className="flex items-center justify-between px-1 py-1 text-[11px] border-b border-black/5 dark:border-white/5 mb-1.5">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsTranslating(!isTranslating)}
                  className={`flex items-center space-x-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold transition-all ${
                    isTranslating ? 'bg-[#000080] text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-black/5'
                  }`}
                  title="Toggle Instant Translation"
                >
                  <Languages className="h-3 w-3 text-amber-500" />
                  <span>Translate</span>
                </button>

                <button
                  onClick={handleVoiceToggle}
                  className={`flex items-center space-x-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold transition-all ${
                    isListening ? 'bg-red-600 text-white animate-pulse' : 'text-slate-600 dark:text-slate-300 hover:bg-black/5'
                  }`}
                  title="Multilingual Voice Typing"
                >
                  <Mic className={`h-3 w-3 ${isListening ? 'text-white' : 'text-emerald-500'}`} />
                  <span>{isListening ? 'Listening...' : 'Voice'}</span>
                </button>

                <button
                  onClick={() => setInputMode(inputMode === 'write' ? 'type' : 'write')}
                  className={`flex items-center space-x-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold transition-all ${
                    inputMode === 'write' ? 'bg-amber-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-black/5'
                  }`}
                  title="Handwriting Pad"
                >
                  <PenTool className="h-3 w-3 text-amber-600" />
                  <span>Write</span>
                </button>
              </div>

              {/* Theme & Script Quick Badges */}
              <div className="flex items-center space-x-1">
                <span className="rounded bg-amber-500/20 px-1 py-0.2 text-[9px] font-bold text-amber-700 dark:text-amber-300">
                  {activeLang.greeting}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {activeLang.nativeName}
                </span>
              </div>
            </div>

            {/* Smart Suggestion Candidates Strip */}
            <div className="grid grid-cols-3 gap-1 px-1 py-1 mb-1 bg-black/5 dark:bg-white/5 rounded-lg text-center text-xs font-medium">
              <button
                onClick={() => {
                  setTransliteratedText(activeLang.greeting);
                  setActiveSuggestion(activeLang.greeting);
                }}
                className={`truncate px-1 py-0.5 rounded transition-all hover:bg-white/30 ${activeTheme.keyText}`}
              >
                1. {activeLang.greeting}
              </button>
              <button
                onClick={() => {
                  setTransliteratedText(activeLang.sampleOutput);
                  setActiveSuggestion(activeLang.sampleOutput);
                }}
                className={`truncate px-1 py-0.5 rounded font-bold text-amber-600 dark:text-amber-400 bg-amber-500/15`}
              >
                2. {activeLang.sampleOutput.split(' ')[0]} ✓
              </button>
              <button
                onClick={() => {
                  setTransliteratedText(activeLang.name + ' AI');
                }}
                className={`truncate px-1 py-0.5 rounded transition-all hover:bg-white/30 ${activeTheme.keyText}`}
              >
                3. {activeLang.greetingTransliteration}
              </button>
            </div>

            {/* Handwriting Pad Overlay Mode */}
            {inputMode === 'write' ? (
              <div className="h-44 rounded-xl border-2 border-dashed border-amber-500/50 bg-black/10 dark:bg-white/5 flex flex-col items-center justify-center p-3 text-center">
                <PenTool className="h-7 w-7 text-amber-500 mb-1 animate-bounce" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Handwriting Canvas Active
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Draw {activeLang.nativeName} letters with finger or stylus
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setTransliteratedText((prev) => prev + ' ' + activeLang.greeting);
                    }}
                    className="rounded bg-amber-500 px-2 py-0.5 text-[10px] text-white font-medium shadow-xs"
                  >
                    Insert "{activeLang.greeting}"
                  </button>
                  <button
                    onClick={() => setInputMode('type')}
                    className="rounded bg-slate-700 px-2 py-0.5 text-[10px] text-white"
                  >
                    Back to Keys
                  </button>
                </div>
              </div>
            ) : isListening ? (
              /* Voice Input Waveform Mode */
              <div className="h-44 rounded-xl bg-gradient-to-r from-red-950/40 via-amber-950/40 to-emerald-950/40 border border-red-500/30 flex flex-col items-center justify-center p-3 text-center">
                <div className="flex items-center space-x-1 mb-2">
                  <span className="h-3 w-1 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="h-6 w-1 rounded-full bg-amber-500 animate-pulse delay-75"></span>
                  <span className="h-9 w-1 rounded-full bg-emerald-500 animate-pulse delay-150"></span>
                  <span className="h-5 w-1 rounded-full bg-red-400 animate-pulse delay-100"></span>
                  <span className="h-8 w-1 rounded-full bg-amber-400 animate-pulse"></span>
                  <span className="h-4 w-1 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-xs font-bold text-white">Listening in {activeLang.name}...</p>
                <p className="text-[10px] text-slate-300 mt-1">"बोलिए, कीबोर्ड सुन रहा है..."</p>
                <button
                  onClick={() => setIsListening(false)}
                  className="mt-2 rounded-full bg-red-600 px-3 py-1 text-[10px] text-white font-semibold"
                >
                  Done Speaking
                </button>
              </div>
            ) : (
              /* Standard Virtual QWERTY Keyboard Keys */
              <div className="space-y-1.5 py-1">
                {/* Emoji and Number Rows from the production keyboard layout */}
                <div className="flex items-center justify-around px-1 text-sm" aria-label="Emoji suggestions">
                  {['😀', '😂', '😍', '😊', '🙏', '👍', '❤️', '✨'].map((emoji) => (
                    <button key={emoji} type="button" className="rounded p-0.5 hover:bg-black/10">{emoji}</button>
                  ))}
                </div>
                <div className="grid grid-cols-10 gap-1">
                  {['1','2','3','4','5','6','7','8','9','0'].map((key) => (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(key)}
                      className={`h-8 min-w-0 rounded-lg text-xs font-semibold active:scale-95 transition-all flex items-center justify-center ${activeTheme.keyBg} ${activeTheme.keyText}`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
                {/* Row 1 */}
                <div className="flex justify-center space-x-1">
                  {keyboardRows[0].map((key) => (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(key.toLowerCase())}
                      className={`h-9 flex-1 rounded-lg text-xs font-semibold active:scale-95 transition-all flex items-center justify-center ${activeTheme.keyBg} ${activeTheme.keyText}`}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                {/* Row 2 */}
                <div className="flex justify-center space-x-1 px-2">
                  {keyboardRows[1].map((key) => (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(key.toLowerCase())}
                      className={`h-9 flex-1 rounded-lg text-xs font-semibold active:scale-95 transition-all flex items-center justify-center ${activeTheme.keyBg} ${activeTheme.keyText}`}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                {/* Row 3 (Shift, Keys, Backspace) */}
                <div className="flex justify-center space-x-1">
                  <button
                    onClick={() => {}}
                    aria-label="Shift key"
                    className={`h-9 w-8 rounded-lg text-[10px] font-bold active:scale-95 transition-all flex items-center justify-center bg-black/10 dark:bg-white/10 ${activeTheme.keyText}`}
                  >
                    ⇧
                  </button>
                  {keyboardRows[2].map((key) => (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(key.toLowerCase())}
                      className={`h-9 flex-1 rounded-lg text-xs font-semibold active:scale-95 transition-all flex items-center justify-center ${activeTheme.keyBg} ${activeTheme.keyText}`}
                    >
                      {key}
                    </button>
                  ))}
                  <button
                    onClick={() => handleKeyPress('BACK')}
                    aria-label="Backspace"
                    className={`h-9 w-9 rounded-lg text-[10px] active:scale-95 transition-all flex items-center justify-center bg-black/10 dark:bg-white/10 ${activeTheme.keyText}`}
                  >
                    <Delete className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Row 4 (123, Globe/Language Switcher, Spacebar, Return) */}
                <div className="flex justify-center space-x-1.5 pt-0.5">
                  <button
                    className={`h-9 w-9 rounded-lg text-[10px] font-bold flex items-center justify-center bg-black/10 dark:bg-white/10 ${activeTheme.keyText}`}
                  >
                    ?123
                  </button>
                  
                  {/* Language Switcher Button */}
                  <button
                    onClick={() => {
                      const nextIndex = (SUPPORTED_LANGUAGES.findIndex((l) => l.id === langId) + 1) % SUPPORTED_LANGUAGES.length;
                      setLangId(SUPPORTED_LANGUAGES[nextIndex].id);
                    }}
                    title="Switch Language"
                    className="h-9 w-8 rounded-lg text-xs flex items-center justify-center bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40"
                  >
                    <Globe className="h-3.5 w-3.5" />
                  </button>

                  {/* Spacebar */}
                  <button
                    onClick={() => handleKeyPress('SPACE')}
                    className={`h-9 flex-2 rounded-lg text-[11px] font-medium active:scale-98 transition-all flex items-center justify-center ${activeTheme.keyBg} ${activeTheme.keyText}`}
                  >
                    <span>{activeLang.nativeName} ({activeLang.name})</span>
                  </button>

                  <button
                    onClick={handleSendMessage}
                    aria-label="Enter / Submit"
                    className={`h-9 w-10 rounded-lg text-xs font-bold flex items-center justify-center shadow-xs active:scale-95 transition-all ${activeTheme.accentBg} ${activeTheme.accentText}`}
                  >
                    <CornerDownLeft className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Android Navigation Pill */}
            <div className="flex justify-center py-1">
              <div className="h-1 w-24 rounded-full bg-slate-400/40"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
