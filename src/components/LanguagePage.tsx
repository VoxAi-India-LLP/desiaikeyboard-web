import React from 'react';
import { ArrowRight, Check, ChevronRight, Keyboard, Mic, ScanLine, ShieldCheck, Sparkles, Languages, Palette } from 'lucide-react';
import { KeyboardEdition, LANGUAGE_EDITIONS, MAIN_EDITION, editionPath } from '../data/editions';
import { editionFaqs } from '../data/editionFaqs';

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.2V3c0-.5.2-.9.6-1.2Zm11.2 11.2 2.5 2.5-11.8 6.8 9.3-9.3Zm2.5-2.1-2.5 2.5L5.5 4.1l11.8 6.8Zm1.2.7 2.6 1.5c.8.5.8 1.3 0 1.8l-2.6 1.5-2.7-2.6 2.7-2.2Z" />
  </svg>
);

const PlayButton: React.FC<{ href: string; label: string; className?: string }> = ({ href, label, className = '' }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#172033] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#000080] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${className}`}
  >
    <PlayIcon className="h-4 w-4 text-[#FF9933]" />
    {label}
  </a>
);

export const LanguagePage: React.FC<{ edition: KeyboardEdition }> = ({ edition: e }) => {
  const faqs = editionFaqs(e);
  const others = LANGUAGE_EDITIONS.filter((o) => o.slug !== e.slug);

  const features = [
    {
      icon: Keyboard,
      title: `${e.phoneticStyle} typing`,
      desc: `Type ${e.name} words the way they sound in English letters and get ${e.nativeName} script instantly — no need to learn a new layout.`,
    },
    {
      icon: Sparkles,
      title: 'Smart next-word suggestions',
      desc: `The suggestion bar predicts your next ${e.name} word so you can finish sentences with fewer taps.`,
    },
    {
      icon: Mic,
      title: `${e.name} voice typing`,
      desc: `Tap the mic and speak in ${e.name} — your words appear as ${e.nativeName} text.`,
    },
    {
      icon: Languages,
      title: `${e.name} + English together`,
      desc: `Switch between ${e.name} and English with the globe key, without leaving your chat.`,
    },
    {
      icon: Palette,
      title: 'Themes, emoji & stickers',
      desc: 'Personalise your keyboard with themes and express yourself with emoji, GIFs and stickers.',
    },
    {
      icon: ShieldCheck,
      title: 'Privacy first',
      desc: 'Bharat AI Keyboard never stores your passwords or card numbers. Read our privacy policy for details.',
    },
  ];

  const steps = [
    `Install Bharat AI ${e.name} Keyboard from Google Play.`,
    'Open the app and tap Enable keyboard.',
    `Turn on Bharat AI ${e.name} Keyboard in Android settings.`,
    `Select it as your keyboard and start typing in ${e.name}.`,
  ];

  return (
    <main className="flex-1" lang="en-IN">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#081A6B] via-[#1534C9] to-[#5B2BC4] text-white">
        <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[#FF9933]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#38BDF8]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-32 lg:pb-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-blue-100/80">
            <ol className="flex items-center gap-1.5">
              <li>
                <a href="/" className="hover:text-white">Home</a>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li aria-current="page" className="font-semibold text-white">{e.name} Keyboard</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-bold text-amber-300">
                Free on Android
              </div>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                {e.name} Keyboard for Android
              </h1>
              <p className={`mt-2 text-2xl font-bold text-amber-300 sm:text-3xl ${e.fontClass}`} lang={e.langCode}>
                {e.nativeKeyword}
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-blue-100/90 sm:text-lg">
                Bharat AI {e.name} Keyboard lets you type in {e.phoneticStyle} and get {e.nativeName} script
                instantly — with smart next-word suggestions, {e.name} voice typing and one-tap switching to English.
              </p>

              <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <PlayButton href={e.playStoreUrl} label={`Get ${e.name} Keyboard on Google Play`} className="w-full sm:w-auto" />
                <div className="hidden items-center gap-3 md:flex">
                  <img
                    src={e.qrPath}
                    alt={`QR code to download Bharat AI ${e.name} Keyboard from Google Play`}
                    width={88}
                    height={88}
                    className="h-[88px] w-[88px] rounded-xl bg-white p-1.5 shadow-lg"
                  />
                  <span className="max-w-[9rem] text-xs leading-snug text-blue-100/80">
                    <ScanLine className="mb-1 h-4 w-4" />
                    Scan with your phone camera to install
                  </span>
                </div>
              </div>
            </div>

            {e.bannerPath && (
              <img
                src={e.bannerPath}
                alt={`Bharat AI ${e.name} Keyboard typing "${e.samples[0].input}" as ${e.samples[0].output}, with next-word suggestions`}
                width={1024}
                height={500}
                fetchPriority="high"
                className="w-full rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/20 sm:rounded-3xl"
              />
            )}
          </div>
        </div>
      </section>

      {/* Type in English → get script */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
            Type {e.name} in English letters
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-600 sm:text-lg">
            No {e.script} layout to memorise. Type phonetically and Bharat AI converts it to {e.nativeName} as you go.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm sm:text-base">
              <caption className="sr-only">Examples of typing {e.name} with English letters</caption>
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
                <tr>
                  <th scope="col" className="px-4 py-3 sm:px-6">You type</th>
                  <th scope="col" className="px-4 py-3 sm:px-6">You get</th>
                  <th scope="col" className="hidden px-6 py-3 sm:table-cell">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {e.samples.map((s) => (
                  <tr key={s.input}>
                    <td className="px-4 py-4 font-mono text-slate-700 sm:px-6">{s.input}</td>
                    <td className={`px-4 py-4 text-lg font-bold text-[#000080] sm:px-6 ${e.fontClass}`} lang={e.langCode}>
                      {s.output}
                    </td>
                    <td className="hidden px-6 py-4 text-slate-500 sm:table-cell">{s.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-200/60 bg-[#FFF9F2] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
            Why use Bharat AI {e.name} Keyboard
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#000080]/8 text-[#000080]">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-[#172033]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to install */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
            How to install the {e.name} keyboard
          </h2>
          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s} className="rounded-2xl border border-slate-200 bg-white p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF9933] text-sm font-black text-white">
                  {i + 1}
                </span>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">{s}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 text-center">
            <PlayButton href={e.playStoreUrl} label={`Download ${e.name} Keyboard`} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200/60 bg-[#FFF9F2] py-16 lg:py-20" id="faqs">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
            {e.name} keyboard FAQs
          </h2>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <details
                key={f.question}
                open={i === 0}
                className="group rounded-2xl border border-slate-200 bg-white open:border-[#000080] open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-bold text-[#172033] sm:text-base [&::-webkit-details-marker]:hidden">
                  <h3>{f.question}</h3>
                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="border-t border-slate-100 p-5 pt-3 text-sm leading-relaxed text-slate-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other languages (internal links) */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#172033] sm:text-3xl">
            Keyboards for other Indian languages
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {others.map((o) => (
              <li key={o.slug}>
                <a
                  href={editionPath(o)}
                  className="flex h-full flex-col items-center rounded-xl border border-slate-200 bg-white px-3 py-3 text-center transition hover:border-amber-300 hover:bg-amber-50"
                >
                  <span className={`text-base font-bold text-[#172033] ${o.fontClass}`} lang={o.langCode}>{o.nativeName}</span>
                  <span className="mt-0.5 text-xs text-slate-500">{o.name} Keyboard</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-amber-50 via-white to-emerald-50 p-6 sm:flex-row">
            <div>
              <div className="text-lg font-bold text-[#172033]">Need more than one language?</div>
              <p className="mt-1 text-sm text-slate-600">
                The all-languages Bharat AI Keyboard switches between 14 languages in one keyboard.
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-emerald-700">
                <li className="flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Hindi, Tamil, Bengali & more</li>
                <li className="flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Translation inside the keyboard</li>
              </ul>
            </div>
            <div className="flex flex-col items-center gap-2 sm:items-end">
              <PlayButton href={MAIN_EDITION.playStoreUrl} label="Get the all-languages app" />
              <a href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-[#000080] hover:underline">
                Explore all features <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
