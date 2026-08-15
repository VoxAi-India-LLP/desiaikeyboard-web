import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smile, 
  Image as ImageIcon, 
  Sparkles, 
  Type, 
  Palette, 
  Search, 
  Heart, 
  Share2, 
  Plus, 
  Check,
  Flame,
  Camera
} from 'lucide-react';
import { STYLISH_FONTS_DEMO, THEMES } from '../data/content';

export const ExpressYourselfSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stickers' | 'gifs' | 'emoji' | 'custom-stickers' | 'fonts'>('stickers');
  const [fontTestText, setFontTestText] = useState('Desi AI Keyboard');
  const [copiedFont, setCopiedFont] = useState<string | null>(null);

  const desiStickers = [
    { title: 'Chai Time ☕', category: 'Daily Life', bg: 'bg-amber-100 border-amber-300', emoji: '☕', tag: 'Chai Peelo' },
    { title: 'Shubh Diwali 🪔', category: 'Festivals', bg: 'bg-yellow-100 border-yellow-300', emoji: '🪔', tag: 'Festival of Lights' },
    { title: 'Sixer! 🏏', category: 'Cricket', bg: 'bg-emerald-100 border-emerald-300', emoji: '🏏', tag: 'Cricket Mania' },
    { title: 'Waah Bhai Waah 👏', category: 'Reactions', bg: 'bg-blue-100 border-blue-300', emoji: '👏', tag: 'Desi Reaction' },
    { title: 'Namaste 🇮🇳', category: 'Greetings', bg: 'bg-orange-100 border-orange-300', emoji: '🙏', tag: 'Desi Respect' },
    { title: 'Balle Balle! 🕺', category: 'Celebration', bg: 'bg-purple-100 border-purple-300', emoji: '🕺', tag: 'Dhamaka' },
  ];

  const desiGifs = [
    { title: 'Celebrating Victory', tag: '#CricketFever', preview: '🏏 🇮🇳 Team India Celebration Wave' },
    { title: 'Dancing in Rain', tag: '#MonsoonVibes', preview: '🌧️ 🦚 Peacock Dance Mood' },
    { title: 'Delicious Samosa & Jalebi', tag: '#FoodieDesi', preview: '🥟 🥨 Hot Jalebi Crispy Samosa' },
    { title: 'Bollywood Dramatic Entry', tag: '#CinemaDesi', preview: '🎬 🕶️ Slow-mo Shades Entry' },
  ];

  const handleCopyFont = (text: string, name: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedFont(name);
    setTimeout(() => setCopiedFont(null), 2000);
  };

  const tabs = [
    { id: 'stickers' as const, label: 'Desi Stickers', icon: Heart },
    { id: 'gifs' as const, label: 'GIF Discovery', icon: ImageIcon },
    { id: 'emoji' as const, label: 'Emoji Search', icon: Smile },
    { id: 'custom-stickers' as const, label: 'Custom Stickers', icon: Sparkles },
    { id: 'fonts' as const, label: 'Stylish Fonts', icon: Type },
  ];

  return (
    <section id="personalization" className="relative py-20 lg:py-28 bg-gradient-to-b from-[#FFFDF8] via-[#FFF9F2] to-[#FFFDF8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-[#FF9933]/10 px-3.5 py-1 text-xs font-bold text-[#FF9933] border border-[#FF9933]/20 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Expressive Media Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033]">
            More Than Just Typing
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Communicate with warmth, humor, and cultural flavor. Discover localized sticker packs, trending Indian memes, custom sticker creation, and stylized typography.
          </p>

          {/* Interactive Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#000080] text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-amber-400' : 'text-[#FF9933]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Content Area */}
        <div className="mt-12 rounded-3xl bg-white p-6 sm:p-10 border border-slate-200/80 shadow-xl">
          <AnimatePresence mode="wait">
            
            {activeTab === 'stickers' && (
              <motion.div
                key="stickers"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#172033]">Desi Sticker Packs & Greetings</h3>
                    <p className="text-xs text-slate-500">Culturally curated reaction packs for WhatsApp, Telegram, and Instagram DMs</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                      1000+ Desi Stickers Built-in
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {desiStickers.map((sticker, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col items-center justify-center rounded-2xl p-4 border text-center transition-transform hover:scale-105 cursor-pointer shadow-xs ${sticker.bg}`}
                    >
                      <span className="text-4xl mb-2">{sticker.emoji}</span>
                      <span className="text-xs font-bold text-[#172033]">{sticker.title}</span>
                      <span className="text-[10px] text-slate-600 mt-1">{sticker.tag}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'gifs' && (
              <motion.div
                key="gifs"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#172033]">Trending Desi GIFs & Memes</h3>
                    <p className="text-xs text-slate-500">Instant GIF search powered by regional Indian entertainment, sports, and festivals</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {desiGifs.map((gif, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-5 text-white border border-slate-800 flex flex-col justify-between h-44 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-amber-500/20 text-amber-300 px-2 py-0.5 text-[10px] font-bold">
                          {gif.tag}
                        </span>
                        <Flame className="h-3.5 w-3.5 text-amber-400" />
                      </div>
                      <div className="my-2 text-center text-sm font-semibold text-slate-200">
                        {gif.preview}
                      </div>
                      <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex items-center justify-between">
                        <span>{gif.title}</span>
                        <span className="text-amber-400 font-bold">GIF</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'emoji' && (
              <motion.div
                key="emoji"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#172033]">Contextual Emoji Search</h3>
                    <p className="text-xs text-slate-500">Type words like "biryani", "cricket", "namaste", "party" and find the right emoji instantly</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200 flex flex-wrap gap-4 items-center justify-center text-3xl">
                  {['🇮🇳', '🪔', '🏏', '☕', '🍛', '🙏', '🦚', '🛺', '🎉', '💃', '🕺', '🥘', '🐘', '🪁', '🥭', '🛵'].map((emoji, i) => (
                    <div
                      key={i}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xs border border-slate-200/80 hover:scale-115 transition-transform cursor-pointer"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'custom-stickers' && (
              <motion.div
                key="custom-stickers"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                <div className="md:col-span-6 space-y-4">
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 border border-purple-200">
                    Creator Studio In Keyboard
                  </span>
                  <h3 className="text-2xl font-bold text-[#172033]">
                    Create Your Own Personalized Stickers
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Turn your selfies, friend photos, or family snapshots into WhatsApp-ready stickers with automatic background cutout and funny caption templates.
                  </p>
                  <ul className="space-y-2 text-xs font-medium text-slate-700">
                    <li className="flex items-center gap-2">✓ Automatic 1-tap background removal</li>
                    <li className="flex items-center gap-2">✓ Add colorful borders and Hindi/Tamil/Bengali captions</li>
                    <li className="flex items-center gap-2">✓ Save to your personal sticker tray permanently</li>
                  </ul>
                </div>

                <div className="md:col-span-6 rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-950 p-6 text-white text-center border border-purple-800 shadow-inner">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 border border-white/20 mb-3">
                    <Camera className="h-8 w-8 text-amber-300" />
                  </div>
                  <div className="text-sm font-bold text-white">Sticker Creator Simulator</div>
                  <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                    Select photo ➔ Auto Cutout ➔ Add Desi Caption ➔ Export to WhatsApp
                  </p>
                  <div className="mt-4 inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-[#FF9933] to-[#138808] px-4 py-2 text-xs font-bold text-white shadow-xs">
                    <Sparkles className="h-4 w-4" />
                    <span>Create a Custom Sticker</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'fonts' && (
              <motion.div
                key="fonts"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#172033]">Stylish Fonts Generator</h3>
                    <p className="text-xs text-slate-500">Transform regular text into eye-catching stylized unicode fonts for bios, captions, and chats</p>
                  </div>
                  <div className="w-full sm:w-64">
                    <input
                      type="text"
                      value={fontTestText}
                      onChange={(e) => setFontTestText(e.target.value)}
                      placeholder="Type custom text..."
                      className="w-full rounded-xl border border-slate-300 px-3 py-1.5 text-xs text-slate-800 outline-hidden focus:border-[#000080]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {STYLISH_FONTS_DEMO.map((font, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between rounded-2xl bg-slate-50 p-4 border border-slate-200"
                    >
                      <div className="text-xs font-semibold text-slate-500 mb-2">{font.name}</div>
                      <div className="text-base font-medium text-[#172033] py-2">{font.preview}</div>
                      <button
                        onClick={() => handleCopyFont(font.preview, font.name)}
                        className="mt-2 flex items-center justify-center space-x-1 rounded-lg bg-white border border-slate-300 px-3 py-1 text-xs font-semibold text-[#000080] hover:bg-slate-100"
                      >
                        {copiedFont === font.name ? <Check className="h-3 w-3 text-emerald-600" /> : null}
                        <span>{copiedFont === font.name ? 'Copied' : 'Copy Style'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export const ThemeGallerySection: React.FC<{
  selectedThemeId?: string;
  onSelectGlobalTheme?: (themeId: string) => void;
}> = ({ selectedThemeId, onSelectGlobalTheme }) => {
  const [localThemeId, setLocalThemeId] = useState<string>('tricolour');
  const activeThemeId = selectedThemeId ?? localThemeId;
  const activeTheme = THEMES.find((theme) => theme.id === activeThemeId) ?? THEMES[0];
  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const themeDescriptions: Record<string, string> = {
    tricolour: 'Heritage Saffron & Green',
    'dark-mode': 'Deep Navy Slate',
    'minimal-white': 'Pristine & Clean',
    'cyber-neon': 'Futuristic Glow',
    'festival-gold': 'Diwali Warm Gold',
    'custom-photo': 'Personal Wallpaper',
  };

  return (
    <section id="theme-gallery" className="relative py-20 lg:py-28 bg-[#FFFDF8] border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-[#FF9933] border border-amber-500/20 mb-3">
            <Palette className="h-3.5 w-3.5" />
            <span>Personalized Visual Styles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033]">
            A Keyboard That Looks Like You
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Express yourself with handcrafted themes celebrating Indian heritage, sleek dark mode, Cyber Neon, or your own personal photography.
          </p>

          <div className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-0.5 text-[11px] font-semibold text-slate-600 border border-slate-200">
            ✨ Choose a theme to update the keyboard instantly
          </div>
        </div>

        {/* 6 Theme Option Cards */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {THEMES.map((theme) => {
            const isSelected = activeThemeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  setLocalThemeId(theme.id);
                  if (onSelectGlobalTheme) onSelectGlobalTheme(theme.id);
                }}
                className={`flex flex-col items-start rounded-2xl p-4 text-left transition-all border ${
                  isSelected
                    ? 'border-[#000080] shadow-md ring-2 ring-[#000080]/20 bg-white scale-103'
                    : 'bg-white/80 border-slate-200 hover:border-amber-300 hover:shadow-xs'
                }`}
              >
                {/* Theme Visual Palette Swatch */}
                <div className={`h-16 w-full rounded-xl bg-gradient-to-br ${theme.previewGradient} border ${theme.previewBorder} shadow-xs mb-3 flex items-end justify-end p-1.5`}>
                  {isSelected && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#000080] text-white text-[10px] shadow-xs">
                      ✓
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-[#172033]">{theme.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{themeDescriptions[theme.id]}</div>
              </button>
            );
          })}
        </div>

        {/* Live Keyboard Theme Preview Display */}
        <motion.div
          key={activeThemeId}
          initial={{ opacity: 0.85, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-10 overflow-hidden rounded-3xl p-5 sm:p-8 shadow-xl border transition-colors duration-300 ${activeTheme.keyboardBg} ${activeTheme.previewBorder}`}
        >
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b text-xs ${activeTheme.isDark ? 'border-white/15' : 'border-slate-900/10'}`}>
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
              <span className={`font-semibold ${activeTheme.isDark ? 'text-slate-300' : 'text-slate-600'}`}>Active Selected Theme:</span>
              <span className={`font-bold ${activeTheme.isDark ? 'text-amber-300' : 'text-[#000080]'}`}>{activeTheme.name}</span>
            </div>
            <span className={`text-[11px] ${activeTheme.isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Live keyboard preview — Android 8.0+ supported
            </span>
          </div>

          {/* Full theme-aware QWERTY keyboard demonstration */}
          <div className={`mx-auto mt-6 max-w-3xl rounded-2xl p-3 sm:p-5 border backdrop-blur-sm ${activeTheme.isDark ? 'bg-black/20 border-white/15' : 'bg-white/35 border-slate-900/10'}`}>
            <div className={`mb-3 text-xs ${activeTheme.isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Live QWERTY theme preview
            </div>

            <div className="space-y-2" aria-label={`${activeTheme.name} keyboard preview`}>
              <div className={`flex items-center justify-around rounded-lg px-2 py-2 text-xs font-semibold ${activeTheme.isDark ? 'bg-black/20' : 'bg-white/35'} ${activeTheme.keyText}`}>
                <span>☰</span><span>सं</span><span>😊</span><span>GIF</span><span>🎨</span><span>⚙</span><span>🎙</span><span>▦</span>
              </div>
              <div className="flex items-center justify-around px-1 text-base sm:text-lg" aria-label="Emoji suggestions">
                {['😀', '😂', '😍', '😊', '🙏', '👍', '❤️', '✨'].map((emoji) => <span key={emoji}>{emoji}</span>)}
              </div>
              <div className="grid grid-cols-10 gap-1 sm:gap-2">
                {['1','2','3','4','5','6','7','8','9','0'].map((key) => (
                  <button key={key} type="button" className={`h-9 sm:h-11 min-w-0 rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold ${activeTheme.keyBg} ${activeTheme.keyText}`}>{key}</button>
                ))}
              </div>
              <div className="grid grid-cols-10 gap-1 sm:gap-2">
                {keyboardRows[0].map((key) => (
                  <button key={key} type="button" className={`h-10 sm:h-12 min-w-0 rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold transition-transform active:scale-95 ${activeTheme.keyBg} ${activeTheme.keyText}`}>
                    {key}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-9 gap-1 sm:gap-2 px-[5%]">
                {keyboardRows[1].map((key) => (
                  <button key={key} type="button" className={`h-10 sm:h-12 min-w-0 rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold transition-transform active:scale-95 ${activeTheme.keyBg} ${activeTheme.keyText}`}>
                    {key}
                  </button>
                ))}
              </div>

              <div className="flex gap-1 sm:gap-2">
                <button type="button" aria-label="Shift" className={`h-10 sm:h-12 basis-[10%] rounded-lg font-bold ${activeTheme.keyBg} ${activeTheme.keyText}`}>⇧</button>
                <div className="grid min-w-0 flex-1 grid-cols-7 gap-1 sm:gap-2">
                  {keyboardRows[2].map((key) => (
                    <button key={key} type="button" className={`h-10 sm:h-12 min-w-0 rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold transition-transform active:scale-95 ${activeTheme.keyBg} ${activeTheme.keyText}`}>
                      {key}
                    </button>
                  ))}
                </div>
                <button type="button" aria-label="Backspace" className={`h-10 sm:h-12 basis-[10%] rounded-lg font-bold ${activeTheme.keyBg} ${activeTheme.keyText}`}>⌫</button>
              </div>

              <div className="grid grid-cols-[auto_auto_minmax(0,1fr)_auto] gap-1 sm:gap-2">
                <button type="button" className={`h-10 sm:h-12 rounded-lg px-2 sm:px-4 text-[10px] sm:text-xs font-bold ${activeTheme.keyBg} ${activeTheme.keyText}`}>?123</button>
                <button type="button" aria-label="Switch language" className={`h-10 sm:h-12 rounded-lg px-3 text-sm ${activeTheme.keyBg} ${activeTheme.keyText}`}>🌐</button>
                <button type="button" className={`h-10 sm:h-12 min-w-0 rounded-lg text-[10px] sm:text-xs font-medium ${activeTheme.keyBg} ${activeTheme.keyText}`}>English (India)</button>
                <button type="button" aria-label="Enter" className={`h-10 sm:h-12 rounded-lg px-3 sm:px-5 font-bold shadow-xs ${activeTheme.accentBg} ${activeTheme.accentText}`}>↵</button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
