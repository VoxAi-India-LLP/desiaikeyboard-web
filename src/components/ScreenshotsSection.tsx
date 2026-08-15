import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Sparkles, 
  ExternalLink, 
  Check, 
  Layers, 
  Maximize2, 
  Download
} from 'lucide-react';
import { SCREENSHOT_SPECS } from '../data/content';
import { ScreenshotSpec } from '../types';

export const ScreenshotsSection: React.FC = () => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<ScreenshotSpec>(SCREENSHOT_SPECS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const publishedScreenshots = SCREENSHOT_SPECS.filter((spec) => spec.id === 'home-keyboard');
  const categories = ['All'];

  const filteredScreenshots = publishedScreenshots.filter((spec) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Typing & Layout') return spec.id.includes('home') || spec.id.includes('language') || spec.id.includes('drawer');
    if (activeCategory === 'Voice & Handwriting') return spec.id.includes('voice') || spec.id.includes('handwriting');
    if (activeCategory === 'Translation & AI') return spec.id.includes('translation') || spec.id.includes('language');
    if (activeCategory === 'Personalization') return spec.id.includes('theme') || spec.id.includes('emoji') || spec.id.includes('sticker');
    return true;
  });
  const hasRealScreenshot = selectedScreenshot.id === 'home-keyboard';

  return (
    <section id="screenshots" className="relative py-20 lg:py-28 bg-[#FFFDF8] border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-[#138808] border border-emerald-200 mb-3">
            <Smartphone className="h-3.5 w-3.5" />
            <span>High-Resolution Product Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033]">
            See Desi AI Keyboard in Action
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            See the keyboard in a real Android conversation and explore its everyday typing experience.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#000080] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Screenshot Grid & Preview Box */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Screen Selector List */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredScreenshots.map((spec) => {
              const isSelected = selectedScreenshot.id === spec.id;
              return (
                <div
                  key={spec.id}
                  onClick={() => setSelectedScreenshot(spec)}
                  className={`flex flex-col justify-between rounded-2xl p-4 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-white border-[#000080] shadow-md ring-2 ring-[#000080]/15 scale-102'
                      : 'bg-white/70 border-slate-200 hover:bg-white hover:border-amber-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
                        {spec.badge}
                      </span>
                      {isSelected && (
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                      )}
                    </div>
                    <h4 className="mt-2 text-sm font-bold text-[#172033]">{spec.title}</h4>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">{spec.description}</p>
                  </div>

                  <div className="mt-3 border-t border-slate-100 pt-2 text-[10px] font-semibold text-slate-400">
                    {spec.featureKey}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: High-Fidelity Phone Showcase Card */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-2xl border border-slate-800 flex flex-col items-center">
              
              {/* Selected product screen heading */}
              <div className="w-full flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <div>
                  <span className="text-amber-400 font-bold">{selectedScreenshot.title}</span>
                  <div className="text-[10px] text-slate-400 mt-0.5">{selectedScreenshot.featureKey}</div>
                </div>
                <div className="text-right">
                  <span className="rounded bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-bold">
                    {selectedScreenshot.badge}
                  </span>
                </div>
              </div>

              {/* Vector Phone Screen Mockup Representation */}
              <div className="my-6 w-full max-w-[290px] rounded-[36px] bg-[#0A0F1D] p-3 ring-2 ring-slate-700 shadow-2xl border border-slate-800">
                {/* Punch Hole */}
                <div className="mx-auto h-3 w-3 rounded-full bg-black ring-1 ring-slate-700 mb-2"></div>
                
                {hasRealScreenshot ? (
                  <div className="h-[520px] overflow-hidden rounded-[24px] bg-white border border-slate-800">
                    <img
                      src={selectedScreenshot.imagePath}
                      alt="Desi AI Keyboard running in a WhatsApp conversation"
                      className="h-full w-full object-cover object-bottom"
                    />
                  </div>
                ) : (
                /* Simulated Screen Content */
                <div className="h-[400px] rounded-[24px] bg-[#121827] p-3 flex flex-col justify-between text-xs overflow-hidden border border-slate-800">
                  
                  {/* Status & Screen Title */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[10px] text-slate-400">
                    <span className="font-bold text-white">Desi AI: {selectedScreenshot.badge}</span>
                    <span>10:30 • 5G</span>
                  </div>

                  {/* Dynamic Mockup Body */}
                  <div className="flex-1 flex flex-col items-center justify-center p-2 text-center my-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <Smartphone className="h-10 w-10 text-amber-400 mb-2 animate-pulse" />
                    <div className="text-xs font-bold text-white">{selectedScreenshot.title}</div>
                    <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">
                      {selectedScreenshot.description}
                    </p>
                  </div>

                  {/* Bottom Keyboard Strip */}
                  <div className="rounded-xl bg-slate-900 p-2 border border-slate-800 text-center">
                    <div className="flex justify-center space-x-1 text-[9px] text-amber-400 font-bold mb-1">
                      <span>हिन्दी</span> • <span>ଓଡ଼ିଆ</span> • <span>தமிழ்</span> • <span>English</span>
                    </div>
                    <div className="h-1 w-16 mx-auto rounded-full bg-slate-600"></div>
                  </div>

                </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export const WhyChooseSection: React.FC = () => {
  const benefits = [
    {
      title: 'Built for Indian Users',
      desc: 'Designed around regional conversation flow, Hinglish slang, local honorifics, and festival greetings.',
      icon: '🇮🇳',
    },
    {
      title: 'Multiple Indian Scripts',
      desc: 'Native Unicode rendering across 12+ official Indian writing systems with accurate conjuncts.',
      icon: '✍️',
    },
    {
      title: 'Voice, Handwriting & Glide Input',
      desc: 'Three flexible input modes to match whichever style feels quickest in the moment.',
      icon: '🎙️',
    },
    {
      title: 'Translation Inside the Keyboard',
      desc: 'Bridge cross-state and global languages in real-time without leaving your active chat application.',
      icon: '🌐',
    },
    {
      title: 'Personalized Themes and Fonts',
      desc: 'Handcrafted Tricolour, Festive Gold, Cyber Neon, and custom wallpaper background styles.',
      icon: '🎨',
    },
    {
      title: 'Rich Emoji, GIF and Sticker Experience',
      desc: 'Thousands of culturally authentic reaction stickers, Diwali cards, and cricket celebration memes.',
      icon: '✨',
    },
    {
      title: 'One Keyboard for Everyday Communication',
      desc: 'Clean, lightweight, and versatile utility that replaces the need for multiple single-language keyboards.',
      icon: '🚀',
    },
  ];

  return (
    <section id="why-choose" className="relative py-20 lg:py-28 bg-gradient-to-b from-[#FFF9F2] via-[#FFFDF8] to-[#FFFDF8] border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-[#000080]/10 px-3.5 py-1 text-xs font-bold text-[#000080] border border-[#000080]/20 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Product Values & Benefits</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033]">
            Why Choose Desi AI Keyboard
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            A comprehensive, respectful, and thoughtfully engineered keyboard for India's digital generation.
          </p>
        </div>

        {/* 7 Benefits Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-400 transition-all duration-200"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-2xl border border-amber-500/20 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-[#172033]">{item.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-semibold text-emerald-700">
                <Check className="h-3.5 w-3.5 mr-1" />
                <span>Verified Benefit</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
