import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Keyboard, 
  Mic, 
  PenTool, 
  Sparkles, 
  Check, 
  RotateCcw, 
  Volume2, 
  Move,
  ArrowRight,
  Info,
  Zap,
  HelpCircle,
  X,
  Command
} from 'lucide-react';

export const WaysToInputSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'type' | 'speak' | 'write'>('type');
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [typedSample, setTypedSample] = useState('aap kaise hain');
  const [convertedText, setConvertedText] = useState('आप कैसे हैं');
  const [showShortcutTooltip, setShowShortcutTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  
  // Close tooltip on outside click or Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showShortcutTooltip) {
        setShowShortcutTooltip(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setShowShortcutTooltip(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShortcutTooltip]);
  
  // Simple interactive drawing state for handwriting pad
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const shortcutsList = [
    {
      keys: ['Spacebar', 'Swipe ↔'],
      action: 'Slide left or right across the spacebar to move the cursor smoothly through text',
      tag: 'Precision Cursor'
    },
    {
      keys: ['Backspace ⌫', 'Swipe ←'],
      action: 'Swipe left from the delete key to instantly erase the previous word',
      tag: 'Fast Erase'
    },
    {
      keys: ['Spacebar', 'Double-Tap'],
      action: 'Double tap spacebar to automatically insert a full-stop (.) and trailing space',
      tag: 'Quick Punctuation'
    },
    {
      keys: ['🌐 Globe Key'],
      action: 'Single tap switches between languages; long-press opens the script picker menu',
      tag: 'Script Switch'
    },
    {
      keys: ['Long Press Key'],
      action: 'Press and hold any consonant to reveal related Matras (मात्राएं), accents & numbers',
      tag: 'Matra Palette'
    }
  ];

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#FF9933';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const tabs = [
    {
      id: 'type' as const,
      title: 'Type',
      icon: Keyboard,
      subtitle: 'Traditional, Glide & Transliteration',
      desc: 'Use standard keyboard typing, swift glide swipe gestures, and phonetic transliteration that adapts to your natural typing pace.',
      badges: ['Glide Typing', 'Transliteration', 'Smart Autocorrect'],
    },
    {
      id: 'speak' as const,
      title: 'Speak',
      icon: Mic,
      subtitle: 'Multilingual Voice to Text',
      desc: 'Dictate messages naturally in Hindi, Tamil, Bengali, Odia, Marathi, and more. High accuracy speech recognition tuned for Indian accents.',
      badges: ['Dialect Aware', 'Hands-free', 'Voice Translation'],
    },
    {
      id: 'write' as const,
      title: 'Write',
      icon: PenTool,
      subtitle: 'Natural Script Handwriting',
      desc: 'Draw characters, conjunct consonants (juktakshara), and numerals directly on screen with fluid stroke smoothing and real-time conversion.',
      badges: ['Complex Ligatures', 'Stylus / Touch', 'Stroke Smoothing'],
    },
  ];

  return (
    <section id="ways-to-input" className="relative py-20 lg:py-28 bg-[#FFFDF8] border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-[#000080]/10 px-3.5 py-1 text-xs font-bold text-[#000080] border border-[#000080]/20 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Versatile Input Modalities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033]">
            Type Your Way
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Switch effortlessly between typing, speaking, and handwriting depending on your mood, context, or language.
          </p>
        </div>

        {/* 3 Main Mode Selectors & Accessible Shortcut Hint Trigger */}
        <div className="mt-8 flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={isSelected}
                  className={`flex items-center justify-center space-x-2.5 rounded-2xl p-3.5 text-sm font-bold transition-all border ${
                    isSelected
                      ? 'bg-[#000080] text-white shadow-md border-[#000080] scale-102'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isSelected ? 'text-amber-400' : 'text-[#FF9933]'}`} />
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>

          {/* Subtle Accessible Text Hint & Tooltip Trigger */}
          <div className="relative mt-4" ref={tooltipRef}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/80 text-xs text-slate-600 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-[#138808]"></span>
              <span className="font-medium">
                Quick tip: Swipe spacebar to move cursor, swipe backspace to erase words
              </span>
              <button
                type="button"
                onClick={() => setShowShortcutTooltip(!showShortcutTooltip)}
                onFocus={() => setShowShortcutTooltip(true)}
                aria-expanded={showShortcutTooltip}
                aria-haspopup="dialog"
                aria-controls="shortcuts-tooltip"
                aria-label="View all keyboard shortcuts for quick typing"
                className="inline-flex items-center gap-1 font-bold text-[#000080] hover:text-blue-900 underline underline-offset-2 ml-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#000080]/40 rounded px-1"
              >
                <Info className="h-3.5 w-3.5 inline" />
                <span>Shortcuts</span>
              </button>
            </div>

            {/* Accessible Shortcuts Popover Tooltip */}
            <AnimatePresence>
              {showShortcutTooltip && (
                <motion.div
                  id="shortcuts-tooltip"
                  role="tooltip"
                  aria-label="Common keyboard shortcuts guide"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[340px] sm:w-[460px] max-w-[92vw] z-40 rounded-2xl bg-white p-4 sm:p-5 shadow-2xl border border-slate-200 text-slate-800 text-left"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-lg bg-[#000080]/10 text-[#000080]">
                        <Zap className="h-4 w-4" />
                      </div>
                      <h4 className="text-sm font-bold text-[#172033]">
                        Quick Typing Shortcuts & Gestures
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowShortcutTooltip(false)}
                      aria-label="Close shortcuts tooltip"
                      className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <ul className="mt-3 space-y-2.5 text-xs">
                    {shortcutsList.map((item, idx) => (
                      <li key={idx} className="flex items-start justify-between gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors">
                        <div className="space-y-0.5 flex-1">
                          <span className="font-semibold text-slate-900 block">{item.tag}</span>
                          <span className="text-slate-600 text-[11px] leading-relaxed block">{item.action}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 pt-0.5">
                          {item.keys.map((k, kIdx) => (
                            <kbd
                              key={kIdx}
                              className="px-2 py-0.5 text-[10px] font-semibold font-mono bg-white text-slate-800 border border-slate-300 rounded-md shadow-2xs whitespace-nowrap"
                            >
                              {k}
                            </kbd>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Press <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px]">Esc</kbd> to close</span>
                    <span className="text-emerald-700 font-medium font-mono text-[10px]">Works in all 12 scripts</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Mode Interactive Showcase Card */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            {activeTab === 'type' && (
              <motion.div
                key="type-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200/80 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#FF9933] uppercase tracking-wider">
                    <Keyboard className="h-4 w-4" />
                    <span>Mode 01 • Smart Text & Glide Input</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
                    Type in English, Render in Native Scripts
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Use traditional typing, transliteration, autocorrection, and glide input. Swipe from key to key without lifting your finger for blazingly fast one-handed messaging.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Glide Gesture Typing', 'Smart Transliteration', 'Typo Autocorrect', 'Next-Word Prediction'].map((badge, i) => (
                      <span key={i} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 border border-amber-200">
                        ✓ {badge}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-500">Supported Scripts:</span>
                      <span className="font-bold text-[#000080]">Devanagari, Tamil, Telugu, Odia, Bengali, Urdu & 6 more</span>
                    </div>

                    {/* Inline Quick Shortcuts Hint */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-[11px] text-slate-600 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        <Zap className="h-3 w-3 text-[#FF9933]" /> Quick Shortcuts:
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white border border-slate-300 rounded-sm shadow-2xs font-semibold text-slate-700">Space</kbd>
                        <span>Swipe ↔ Cursor</span>
                      </span>
                      <span className="text-slate-300 hidden sm:inline">•</span>
                      <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white border border-slate-300 rounded-sm shadow-2xs font-semibold text-slate-700">⌫ Del</kbd>
                        <span>Swipe ← Word Erase</span>
                      </span>
                      <span className="text-slate-300 hidden sm:inline">•</span>
                      <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white border border-slate-300 rounded-sm shadow-2xs font-semibold text-slate-700">2× Space</kbd>
                        <span>Period (.)</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-white border border-slate-800 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                    <span className="font-semibold text-emerald-400">● Glide & Transliteration</span>
                    <span>Android 14 Ready</span>
                  </div>

                  <div className="my-4 rounded-xl bg-slate-800/80 p-4 border border-slate-700/60">
                    <div className="text-[11px] text-slate-400">Glide Path Input (Swiped):</div>
                    <div className="text-lg font-mono text-amber-400 font-bold mt-1">k-y-a h-a-a-l h-a-i</div>
                    <div className="mt-2 text-[11px] text-slate-400">Desi AI Resolved Native Output:</div>
                    <div className="text-2xl font-bold text-white font-devanagari mt-0.5">क्या हाल है ✓</div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-800/40 rounded-lg p-2.5">
                    <span>Transliteration Speed: <strong>12ms</strong></span>
                    <span className="text-emerald-400 font-semibold">Zero Lag</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'speak' && (
              <motion.div
                key="speak-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200/80 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    <Mic className="h-4 w-4" />
                    <span>Mode 02 • Voice Speech-to-Text</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
                    Speak Naturally in Your Language
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Convert voice to text and communicate more quickly. Whether you speak pure regional languages or mix with English, the acoustic model captures your words accurately.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Dialect Accent Recognition', 'Audio Noise Filtering', 'Live Punctuation Insertion', 'Voice Translation'].map((badge, i) => (
                      <span key={i} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 border border-emerald-200">
                        ✓ {badge}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setIsVoiceRecording(!isVoiceRecording)}
                      className={`inline-flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all shadow-xs ${
                        isVoiceRecording ? 'bg-red-600 animate-pulse ring-2 ring-red-400' : 'bg-[#138808] hover:bg-emerald-700'
                      }`}
                    >
                      <Mic className="h-4 w-4" />
                      <span>{isVoiceRecording ? 'रिकॉर्डिंग चालू है... (Listening - Tap to Stop)' : 'Start Hindi Voice Typing'}</span>
                    </button>

                    <a
                      href="#voice-typing-demo"
                      className="inline-flex items-center space-x-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-[#000080] bg-[#000080]/10 hover:bg-[#000080]/20 transition-colors"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Launch Full Voice Studio</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-6 text-white border border-emerald-900/40 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                    <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${isVoiceRecording ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`}></span>
                      Live Hindi Speech Visualizer
                    </span>
                    <span className="text-[11px] font-mono text-amber-300">hi-IN (हिंदी)</span>
                  </div>

                  <div className="my-6 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center space-x-1.5 h-12 mb-3">
                      {[12, 28, 45, 18, 38, 52, 24, 40, 16, 32, 22, 48, 30, 14].map((height, i) => (
                        <span
                          key={i}
                          style={{ height: isVoiceRecording ? `${height}px` : '8px' }}
                          className={`w-1.5 rounded-full transition-all duration-150 ${
                            isVoiceRecording ? 'bg-gradient-to-t from-emerald-400 to-amber-300 animate-pulse' : 'bg-slate-700'
                          }`}
                        ></span>
                      ))}
                    </div>
                    <div className="text-base font-bold text-white min-h-[32px] flex items-center justify-center">
                      {isVoiceRecording ? (
                        <span className="text-amber-300">"नमस्ते! आज मौसम बहुत अच्छा है, चलिए चाय पीने चलते हैं।"</span>
                      ) : (
                        <span className="text-slate-400 text-sm">Tap "Start Hindi Voice Typing" and begin speaking</span>
                      )}
                    </div>
                    <div className="text-xs text-emerald-300 mt-2">
                      {isVoiceRecording ? '✓ 100% On-Device Neural Speech Engine • 0ms Cloud Latency' : 'Microphone is activated only during active speech dictation.'}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'write' && (
              <motion.div
                key="write-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200/80 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
                    <PenTool className="h-4 w-4" />
                    <span>Mode 03 • Natural Handwriting Input</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
                    Write Characters by Hand Directly on Screen
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Use handwriting input for natural script entry. Draw complex Indian conjuncts, vowels, and numerals with your finger or stylus, recognized smoothly in real-time.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Finger & Stylus Support', 'Complex Conjuncts Recognition', 'Stroke Smoothing', 'Clear & Undo'].map((badge, i) => (
                      <span key={i} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 border border-amber-200">
                        ✓ {badge}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 text-xs text-slate-500">
                    💡 <em>Interactive: Try sketching a character like "अ", "க", or "କ" on the canvas to the right!</em>
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-white border border-slate-800 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                    <span className="font-semibold text-amber-400">● Interactive Handwriting Pad</span>
                    <button
                      onClick={clearCanvas}
                      className="flex items-center space-x-1 text-xs text-slate-300 hover:text-white bg-slate-800 px-2.5 py-1 rounded-md"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Clear Canvas</span>
                    </button>
                  </div>

                  <div className="my-3 flex justify-center">
                    <canvas
                      ref={canvasRef}
                      width={300}
                      height={160}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="rounded-xl border-2 border-dashed border-amber-400/60 bg-black/40 cursor-crosshair touch-none"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-800/40 rounded-lg p-2.5">
                    <span>{hasDrawn ? 'Recognizing hand-drawn glyph...' : 'Draw with mouse or finger inside the box'}</span>
                    <span className="text-amber-400 font-semibold">{hasDrawn ? 'अ / ॐ (Recognized)' : 'Ready'}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
