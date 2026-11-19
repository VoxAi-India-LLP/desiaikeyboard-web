import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink, Languages, Pause, Play, ScanLine } from 'lucide-react';
import { LANGUAGE_EDITIONS } from '../data/editions';

const SHOWCASE_LANGUAGES = LANGUAGE_EDITIONS.filter((e) => e.bannerPath);
const AUTO_ADVANCE_MS = 4500;
const imageSrc = (slug: string) => `/featured/${slug}.jpg`;

export const LanguageShowcaseSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const count = SHOWCASE_LANGUAGES.length;
  const active = SHOWCASE_LANGUAGES[index];
  const playing = !userPaused && !hovering && !reduceMotion;

  const goTo = useCallback(
    (next: number, dir?: number) => {
      const wrapped = (next + count) % count;
      setDirection(dir ?? (wrapped > index ? 1 : -1));
      setIndex(wrapped);
    },
    [count, index],
  );

  // Auto-advance through languages.
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => goTo(index + 1, 1), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, [playing, index, goTo]);

  // Warm the cache for the next banner so transitions never flash.
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc(SHOWCASE_LANGUAGES[(index + 1) % count].slug);
  }, [index, count]);

  // Keep the active chip visible in the horizontally scrolling strip (without scrolling the page).
  useEffect(() => {
    const tab = tabRefs.current[index];
    const strip = tab?.parentElement;
    if (!tab || !strip) return;
    const target = tab.offsetLeft - strip.clientWidth / 2 + tab.clientWidth / 2;
    strip.scrollTo({ left: target, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [index, reduceMotion]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setUserPaused(true);
      goTo(index + 1, 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setUserPaused(true);
      goTo(index - 1, -1);
    }
  };

  const slide = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: (d: number) => ({ opacity: 0, x: d * 60, scale: 0.98 }),
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: (d: number) => ({ opacity: 0, x: d * -60, scale: 0.98 }),
      };

  return (
    <section
      id="language-editions"
      aria-roledescription="carousel"
      aria-label="Bharat AI Keyboard language editions"
      className="relative overflow-hidden py-20 lg:py-24 bg-gradient-to-br from-[#081A6B] via-[#1534C9] to-[#5B2BC4] text-white"
    >
      {/* Soft glow accents echoing the Play Store artwork */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[#FF9933]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#38BDF8]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-amber-300 border border-white/15 mb-3">
            <Languages className="h-3.5 w-3.5" />
            <span>{count} Language Editions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            A Keyboard That Speaks <span className="text-amber-300">Your</span> Language
          </h2>
          <p className="mt-4 text-base sm:text-lg text-blue-100/85">
            Every edition is tuned for its own script — type phonetically in English, get native words
            instantly, with next-word suggestions and voice typing built in.
          </p>
        </div>

        {/* Language chips */}
        <div
          role="tablist"
          aria-label="Choose a language"
          onKeyDown={onKeyDown}
          className="mt-10 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SHOWCASE_LANGUAGES.map((lang, i) => {
            const isActive = i === index;
            return (
              <button
                key={lang.slug}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`edition-tab-${lang.slug}`}
                aria-selected={isActive}
                aria-controls="edition-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => {
                  setUserPaused(true);
                  goTo(i);
                }}
                className={`relative shrink-0 overflow-hidden rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
                  isActive
                    ? 'bg-white text-[#0B1F7A] border-white shadow-lg'
                    : 'bg-white/5 text-blue-50 border-white/20 hover:bg-white/15'
                }`}
              >
                <span className={`font-bold ${lang.fontClass}`}>{lang.nativeName}</span>
                <span className={`ml-1.5 text-xs ${isActive ? 'text-slate-500' : 'text-blue-200/70'}`}>
                  {lang.name}
                </span>
                {isActive && playing && (
                  <motion.span
                    key={`progress-${index}`}
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#FF9933] via-amber-300 to-[#138808]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Banner stage */}
        <div
          className="relative mx-auto mt-8 max-w-5xl"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocusCapture={() => setHovering(true)}
          onBlurCapture={() => setHovering(false)}
        >
          <div
            id="edition-panel"
            role="tabpanel"
            aria-labelledby={`edition-tab-${active.slug}`}
            aria-live={playing ? 'off' : 'polite'}
            className="relative aspect-[1024/500] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0B1F7A] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/20"
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={active.slug}
                src={imageSrc(active.slug)}
                alt={`Bharat AI ${active.name} keyboard: type in English letters and get ${active.name} script instantly, with next-word suggestions and voice typing`}
                width={1024}
                height={500}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                custom={direction}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: reduceMotion ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                drag={reduceMotion ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) < 60) return;
                  setUserPaused(true);
                  goTo(index + (info.offset.x < 0 ? 1 : -1), info.offset.x < 0 ? 1 : -1);
                }}
                className="absolute inset-0 h-full w-full select-none object-cover cursor-grab active:cursor-grabbing"
              />
            </AnimatePresence>
          </div>

          {/* Prev / next */}
          <button
            type="button"
            aria-label="Previous language"
            onClick={() => {
              setUserPaused(true);
              goTo(index - 1, -1);
            }}
            className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/90 text-[#0B1F7A] shadow-lg hover:bg-white focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next language"
            onClick={() => {
              setUserPaused(true);
              goTo(index + 1, 1);
            }}
            className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/90 text-[#0B1F7A] shadow-lg hover:bg-white focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Download bar for the active edition (hovering pauses the slideshow so the QR stays put while scanning) */}
        <div
          className="mx-auto mt-6 flex max-w-5xl flex-col items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-sm sm:flex-row sm:gap-5 sm:p-5"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* QR: only useful on larger screens — on a phone you can't scan your own screen */}
          <div className="hidden md:block shrink-0 rounded-xl bg-white p-2 shadow-lg">
            <img
              key={active.qrPath}
              src={active.qrPath}
              alt={`QR code to download Bharat AI ${active.name} keyboard from Google Play`}
              width={112}
              height={112}
              className="h-28 w-28"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              {!reduceMotion && (
                <button
                  type="button"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-white/15"
                >
                  {userPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                </button>
              )}
              <span className="text-lg font-bold text-white">
                Bharat AI <span className={active.fontClass}>{active.nativeName}</span>
              </span>
              <span className="text-xs tabular-nums text-blue-200/70">
                {index + 1} / {count}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-blue-100/80">
              <ScanLine className="mr-1 hidden h-4 w-4 align-[-3px] md:inline" />
              <span className="hidden md:inline">Scan with your phone camera to install the {active.name} keyboard.</span>
              <span className="md:hidden">Install the {active.name} keyboard free from Google Play.</span>
            </p>
          </div>

          <a
            href={active.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#FF9933] px-6 py-3 text-sm font-bold text-[#172033] shadow-lg shadow-black/20 transition hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.2V3c0-.5.2-.9.6-1.2Zm11.2 11.2 2.5 2.5-11.8 6.8 9.3-9.3Zm2.5-2.1-2.5 2.5L5.5 4.1l11.8 6.8Zm1.2.7 2.6 1.5c.8.5.8 1.3 0 1.8l-2.6 1.5-2.7-2.6 2.7-2.2Z" />
            </svg>
            Get {active.name} on Google Play
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
};
