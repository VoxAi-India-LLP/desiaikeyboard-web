import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Mic, 
  Languages, 
  ArrowRight, 
  BrainCircuit, 
  CheckCircle2, 
  Share2, 
  Wifi, 
  Zap,
  Cpu,
  MessageSquareQuote,
  ShieldAlert
} from 'lucide-react';

export const AICommunicationSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const workflowSteps = [
    {
      step: '01',
      title: 'Type or Speak',
      desc: 'Input thoughts using phonetic English, regional script keys, or natural regional speech.',
      example: '"aaj shaam ko milte hain"',
      icon: Mic,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
    },
    {
      step: '02',
      title: 'Understand',
      desc: 'AI analyzes sentence context, tense, dialect nuances, and linguistic conventions.',
      example: 'Context: Casual evening meetup invitation (Hindi)',
      icon: BrainCircuit,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/30',
    },
    {
      step: '03',
      title: 'Correct or Translate',
      desc: 'Converts to perfect native script (आज शाम को मिलते हैं) or translates into any language.',
      example: 'Output: आज शाम को मिलते हैं • "Let us meet this evening"',
      icon: Languages,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
    },
    {
      step: '04',
      title: 'Share',
      desc: 'Send instantly in WhatsApp, Telegram, SMS, or Instagram with one effortless tap.',
      example: 'Sent to chat with custom celebration sticker!',
      icon: Share2,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    },
  ];

  const aiHighlights = [
    {
      title: 'Intelligent Suggestions',
      desc: 'Contextual next-word predictions adapt to your personal writing style and vocabulary.',
      icon: Zap,
    },
    {
      title: 'Context-Aware Autocorrection',
      desc: 'Fixes common Indian typo patterns, missing matras/vowels, and transliteration slips.',
      icon: CheckCircle2,
    },
    {
      title: 'Multilingual Voice Input',
      desc: 'Speaks your language with dialect tolerance across major Indian linguistic accents.',
      icon: Mic,
    },
    {
      title: 'Text & Voice Translation',
      desc: 'Inline bidirectional translation between Indian and international languages.',
      icon: Languages,
    },
    {
      title: 'Faster Transliteration',
      desc: 'Near-zero latency script transformation as fast as you can hit the spacebar.',
      icon: Cpu,
    },
    {
      title: 'Reduced Typing Effort',
      desc: 'Smart emoji predictions and quick-phrase completions cut keystrokes significantly.',
      icon: MessageSquareQuote,
    },
  ];

  return (
    <section id="ai-tools" className="relative py-20 lg:py-28 bg-[#000080] text-white overflow-hidden">
      
      {/* Background Saffron & Green Gradient Halos */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#FF9933]/20 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#138808]/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-navy-900/60 blur-2xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-amber-300 border border-white/20 mb-3 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Next-Generation Neural Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Smarter Communication with AI
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Engineered to bridge thoughts and expressions seamlessly through an intelligent four-stage pipeline.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#autocomplete-sandbox"
              className="inline-flex items-center space-x-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 text-xs font-black shadow-md transition-all active:scale-95"
            >
              <BrainCircuit className="h-4 w-4" />
              <span>Explore Smart Autocomplete</span>
            </a>
          </div>
        </div>

        {/* Visual Workflow: Type/Speak -> Understand -> Correct/Translate -> Share */}
        <div className="mt-14">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Interactive Workflow Pipeline
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              const isCurrent = activeStep === index;

              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStep(index)}
                  className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 cursor-pointer border ${
                    isCurrent
                      ? 'bg-white/15 border-amber-400 shadow-lg scale-102 ring-1 ring-amber-400/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div>
                    {/* Top Row: Step & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-white/30">{step.step}</span>
                      <div className={`p-2.5 rounded-xl ${step.bgColor} ${step.borderColor} border`}>
                        <Icon className={`h-5 w-5 ${step.color}`} />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="mt-4 text-lg font-bold text-white">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Sample Preview */}
                  <div className="mt-4 rounded-xl bg-black/40 p-2.5 border border-white/10 text-[11px] text-amber-200">
                    <span className="text-[10px] text-slate-400 block font-mono">Live Stage Preview:</span>
                    <span className="font-semibold">{step.example}</span>
                  </div>

                  {/* Connecting Arrow for Desktop */}
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full bg-[#FF9933] text-white shadow-xs">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 6 AI Highlights Bento Grid */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">Core AI Intelligence Capabilities</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiHighlights.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/8 backdrop-blur-md p-5 border border-white/10 hover:border-amber-400/40 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF9933]/20 to-[#138808]/20 text-amber-300 border border-white/15">
                      <ItemIcon className="h-5 w-5 text-amber-400" />
                    </div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mandatory Transparency & Connectivity Notice */}
        <div className="mt-12 rounded-2xl bg-black/30 border border-white/15 p-4 sm:p-5 flex items-start space-x-3 text-xs text-slate-300">
          <Wifi className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">Connectivity Disclosure & Implementation Note:</span>
            <span>
              Certain advanced AI capabilities (such as cloud-grounded neural translation, online GIF/sticker catalog retrieval, and continuous smart vocabulary syncing) require an active internet connection. Core keyboard typing, local dictionaries, and cached themes operate offline. Features and latency may vary based on your network and device specifications.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
