import React from 'react';
import { motion } from 'motion/react';
import { 
  Download, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Globe2, 
  Smartphone, 
  Heart,
  CheckCircle2
} from 'lucide-react';
import { AshokaChakra } from './AshokaChakra';
import { InteractivePhoneMockup } from './InteractivePhoneMockup';
import { RippleButton, RippleLink } from './RippleButton';
import { AppConfig } from '../types';

interface HeroSectionProps {
  config: AppConfig;
  onOpenDownloadModal: () => void;
  themeId?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onOpenDownloadModal,
  themeId = 'tricolour',
}) => {
  const floatingChips = [
    { text: 'नमस्ते', lang: 'Hindi', position: 'top-8 -left-6 sm:-left-10', delay: 0, dotColor: 'bg-[#138808]' },
    { text: 'வணக்கம்', lang: 'Tamil', position: 'top-28 -right-4 sm:-right-8', delay: 0.3, dotColor: 'bg-[#FF9933]' },
    { text: 'Hello', lang: 'English', position: 'bottom-48 -left-4 sm:-left-8', delay: 0.6, dotColor: 'bg-[#000080]' },
    { text: 'ନମସ୍କାର', lang: 'Odia', position: 'bottom-16 -right-6 sm:-right-10', delay: 0.9, dotColor: 'bg-emerald-600' },
    { text: 'سلام', lang: 'Urdu (RTL)', position: 'top-1/2 -left-6 sm:-left-12 font-urdu', delay: 1.2, isRTL: true, dotColor: 'bg-[#FF9933]' },
  ];

  const trustLabels = [
    { label: 'Made for India', icon: '🇮🇳', desc: 'Culturally crafted' },
    { label: 'Multilingual', icon: '🗣️', desc: '12+ Indian scripts' },
    { label: 'AI-Powered', icon: '✨', desc: 'Smart transliteration' },
    { label: 'Android 8.0+', icon: '📱', desc: 'Universal compatibility' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-[#FFF9F2] via-[#FFFDF8] to-[#F7FAFC]"
    >
      {/* Background Subtle Tricolour Lighting, Rotating Ashoka Chakra & Script Watermarks */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft Saffron Ambient Glow at Top Left */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#FF9933]/12 blur-3xl"></div>
        {/* Soft Green Ambient Glow at Bottom Right */}
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#138808]/10 blur-3xl"></div>
        {/* Subtle Navy Center Gradient */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#000080]/5 blur-3xl"></div>

        {/* Large, Semi-Transparent, Rotating Ashoka Chakra Decorative Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-10 lg:opacity-12 pointer-events-none z-0">
          <AshokaChakra
            size={760}
            strokeColor="#000080"
            className="animate-spin-slow max-w-none w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] lg:w-[780px] lg:h-[780px] drop-shadow-sm"
          />
        </div>

        {/* Subtle Indian Script Background Decorative Characters */}
        <div className="absolute inset-0 select-none opacity-[0.03] text-6xl font-bold flex flex-wrap gap-12 p-8 text-slate-800">
          <span>क</span> <span>த</span> <span>చ</span> <span>ব</span> <span>ଶ</span> <span>ગ</span> <span>ਕ</span> <span>ಕ</span> <span>മ</span> <span>س</span> <span>ॐ</span> <span>अ</span> <span>ત</span> <span>ర</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Heading, Value Prop, CTAs, and Trust Badges */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left">
            
            {/* Tagline Announcement Badges in Editorial Style */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2 mb-6"
            >
              <span className="bg-[#138808]/10 text-[#138808] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#138808] animate-pulse"></span>
                Made for Bharat
              </span>
              <span className="bg-slate-100 text-slate-600 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                12+ Indian Scripts
              </span>
            </motion.div>

            {/* Main Hero Headline in Editorial Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#172033]"
            >
              India’s AI Keyboard for{' '}
              <span className="text-[#000080] italic font-serif">
                Every Language
              </span>{' '}
              and Expression.
            </motion.h1>

            {/* Supporting Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal"
            >
              Type, speak, write, translate and express yourself in your preferred language-all from one intelligent Android keyboard built specifically for the rhythm of Indian conversations.
            </motion.p>

            {/* Primary & Secondary Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              {/* Main Saffron Download Button */}
              <RippleButton
                onClick={onOpenDownloadModal}
                id="hero-playstore-cta"
                rippleColor="rgba(255, 255, 255, 0.4)"
                className="w-full sm:w-auto group flex items-center justify-center space-x-3 rounded-2xl bg-[#FF9933] hover:bg-[#F28500] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#FF9933]/25 transition-colors"
              >
                <div className="flex h-5 w-5 items-center justify-center">
                  <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.361-.24-.61-.649-.61-1.186V3c0-.537.249-.946.609-1.186zm11.233 11.233l2.482 2.482-11.83 6.83 9.348-9.312zm2.482-2.094l-2.482 2.482L5.494 4.12l11.83 6.833zm1.196 1.185l3.87 2.234c.81.468.81 1.23 0 1.698l-3.87 2.235-2.28-2.28 2.28-3.887z" />
                  </svg>
                </div>
                <span>Download on Google Play</span>
              </RippleButton>

              {/* Explore Features Secondary Button */}
              <RippleLink
                href="#features"
                id="hero-explore-features-cta"
                rippleColor="rgba(0, 0, 128, 0.12)"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-2xl border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-8 py-4 text-sm font-bold shadow-xs transition-colors"
              >
                <span>Explore Features</span>
                <ArrowRight className="h-4 w-4 text-[#000080]" />
              </RippleLink>
            </motion.div>

            {false && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-200/80 pt-6 w-full"
            >
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Supported Scripts
                </span>
                <div className="flex gap-2.5 mt-1 font-serif text-2xl text-[#172033]/70">
                  <span>अ</span>
                  <span>த</span>
                  <span>ക</span>
                  <span>ব</span>
                  <span>శ</span>
                  <span>ଗ</span>
                </div>
              </div>

              <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="text-left">
                  <div className="text-xs font-bold text-[#172033]">12+ Languages</div>
                  <div className="text-[10px] text-slate-500">Native Transliteration</div>
                </div>
                <div className="h-4 w-[1px] bg-slate-200"></div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#172033]">100% Private</div>
                  <div className="text-[10px] text-slate-500">On-Device Security</div>
                </div>
                <div className="h-4 w-[1px] bg-slate-200"></div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#172033]">Voice & Handwriting</div>
                  <div className="text-[10px] text-slate-500">Multi-Modal Input</div>
                </div>
              </div>
            </motion.div>
            )}

          </div>

          {/* Right Column: Phone Mockup with Floating Script Chips */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Lighting Behind Phone */}
            <div className="absolute -z-10 flex items-center justify-center pointer-events-none">
              <div className="h-[380px] w-[380px] sm:h-[460px] sm:w-[460px] rounded-full bg-radial from-[#FF9933]/15 via-[#000080]/5 to-transparent blur-2xl"></div>
            </div>

            {/* Floating Indian Script Language Chips */}
            {floatingChips.map((chip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: chip.delay }}
                className={`absolute z-20 ${chip.position} hidden sm:flex items-center space-x-2.5 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-lg border border-slate-200/90 text-slate-800`}
              >
                <span className={`flex h-2.5 w-2.5 rounded-full ${chip.dotColor || 'bg-[#FF9933]'}`}></span>
                <span className={`text-base font-bold text-[#172033] ${chip.isRTL ? 'font-urdu' : ''}`}>
                  {chip.text}
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  {chip.lang}
                </span>
              </motion.div>
            ))}

            {/* Live Interactive Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full flex justify-center"
            >
              <InteractivePhoneMockup initialThemeId={themeId} initialLanguageId="hi" />
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
