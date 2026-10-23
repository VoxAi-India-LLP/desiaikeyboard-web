import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Keyboard, 
  Sparkles, 
  Menu, 
  X, 
  Download, 
  Globe, 
  ChevronRight,
  ShieldCheck,
  Languages
} from 'lucide-react';
import { AshokaChakra } from './AshokaChakra';
import { RippleButton, RippleLink } from './RippleButton';
import { AppConfig } from '../types';
import logoImg from '../../assets/desiai_web_logo.png';

interface HeaderProps {
  config: AppConfig;
  onOpenDownloadModal: () => void;
  onOpenContactModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onOpenDownloadModal,
  onOpenContactModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Languages', href: '#languages' },
    { name: 'AI Tools', href: '#ai-tools' },
    { name: 'Personalization', href: '#personalization' },
    { name: 'Screenshots', href: '#screenshots' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFDF8]/95 backdrop-blur-md shadow-xs border-b border-amber-900/10 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <a
            href="#"
            className="group flex items-center space-x-2.5 focus:outline-hidden"
            aria-label="Desi AI Keyboard Home"
          >
            <div className="relative flex h-10 w-10 overflow-hidden items-center justify-center rounded-xl bg-slate-900 shadow-md transition-transform group-hover:scale-105 border border-slate-700/50">
              <img
                src={logoImg}
                alt="Desi AI Keyboard App Logo"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-extrabold tracking-tight text-[#172033]">
                  Desi AI
                </span>
                <span className="rounded-sm bg-gradient-to-r from-[#FF9933] to-[#138808] px-1.5 py-0.2 text-[10px] font-bold text-white uppercase tracking-wider">
                  Keyboard
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                <AshokaChakra size={10} strokeColor="#000080" />
                Type Smart • Express Desi
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1 text-xs font-semibold text-slate-700 hover:text-[#000080] hover:bg-slate-100 rounded-full transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Language Pill indicator */}
            <a
              href="#languages"
              className="hidden sm:flex items-center space-x-1.5 text-xs font-medium text-slate-600 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1.5 rounded-full hover:bg-amber-500/20 transition-colors"
            >
              <Globe className="h-3.5 w-3.5 text-[#FF9933]" />
              <span className="text-[11px] font-semibold text-[#172033]">12+ Languages</span>
            </a>

            {/* Google Play Download Button */}
            <RippleLink
              href={config.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="header-download-btn"
              rippleColor="rgba(255, 255, 255, 0.4)"
              className="group relative inline-flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-[#000080] via-[#0F172A] to-[#172033] px-4 sm:px-5 py-2 text-xs font-bold text-white shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Subtle Tricolour Edge Highlight */}
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></span>
              <Download className="h-3.5 w-3.5 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
              <span>Get on Play Store</span>
            </RippleLink>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xs focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-200 bg-[#FFFDF8]/98 backdrop-blur-xl px-4 pt-3 pb-6 shadow-xl"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-amber-50 hover:text-[#000080] transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </a>
              ))}

              <div className="pt-3 border-t border-slate-200 flex flex-col space-y-2">
                <RippleLink
                  href={config.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  rippleColor="rgba(255, 255, 255, 0.4)"
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#FF9933] to-[#138808] p-3 text-xs font-bold text-white shadow-md"
                >
                  <Download className="h-4 w-4" />
                  <span>Download for Android (Google Play)</span>
                </RippleLink>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContactModal();
                  }}
                  className="w-full text-center py-2 text-xs font-medium text-slate-600 hover:text-[#000080]"
                >
                  Need Help? Contact Support
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
