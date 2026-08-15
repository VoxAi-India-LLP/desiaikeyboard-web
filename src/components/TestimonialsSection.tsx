import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ChevronDown, 
  HelpCircle, 
  Search, 
  CheckCircle2,
  Mail
} from 'lucide-react';
import { FAQ_LIST } from '../data/content';
import { FAQItem } from '../types';

export const FAQSection: React.FC<{ onOpenContactModal: () => void }> = ({ onOpenContactModal }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_LIST[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Languages', 'AI & Features', 'Privacy & Offline'];

  const filteredFaqs = FAQ_LIST.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faqs" className="relative py-20 lg:py-28 bg-[#FFFDF8] border-t border-slate-200/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-[#000080]/10 px-3.5 py-1 text-xs font-bold text-[#000080] border border-[#000080]/20 mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033]">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Everything you need to know about Desi AI Keyboard, supported Indian languages, permissions, and offline availability.
          </p>

          {/* Search bar & Category filters */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs (e.g. offline, permissions)..."
                className="w-full rounded-full border border-slate-300 bg-white py-2 pl-10 pr-4 text-xs text-slate-800 outline-hidden focus:border-[#000080] focus:ring-1 focus:ring-[#000080]"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#000080] text-white shadow-2xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="mt-12 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500 border border-slate-200">
              No matching questions found. Try searching for "languages", "voice", or "offline".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? 'bg-white border-[#000080] shadow-md ring-1 ring-[#000080]/15'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-[#172033] focus:outline-hidden"
                    aria-expanded={isOpen}
                  >
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#000080]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="border-t border-slate-100 p-5 pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {faq.answer}
                          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                            <span className="rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                              Category: {faq.category}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-[#172033]">Have more questions or feedback on language scripts?</h4>
            <p className="text-xs text-slate-600 mt-0.5">Our dedicated support and linguistics team is happy to help.</p>
          </div>
          <button
            onClick={onOpenContactModal}
            className="inline-flex items-center space-x-2 rounded-xl bg-[#000080] px-5 py-2.5 text-xs font-bold text-white hover:bg-navy-900 transition-colors shadow-xs shrink-0"
          >
            <Mail className="h-4 w-4" />
            <span>Contact Support Team</span>
          </button>
        </div>

      </div>
    </section>
  );
};
