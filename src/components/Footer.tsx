import React, { useState } from 'react';
import { 
  Keyboard, 
  Sparkles, 
  Globe, 
  Mail, 
  Download, 
  ExternalLink, 
  Heart,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { AshokaChakra } from './AshokaChakra';
import { AppConfig } from '../types';
import logoImg from '../../assets/desiai_web_logo.png';

interface FooterProps {
  config: AppConfig;
  onOpenDownloadModal: () => void;
  onOpenContactModal: () => void;
  onOpenLegalModal: (docType: 'privacy' | 'terms' | 'permissions' | 'data-deletion') => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenDownloadModal,
  onOpenContactModal,
  onOpenLegalModal,
}) => {
  const [siteLanguage, setSiteLanguage] = useState<string>('en');

  const siteLanguages = [
    { code: 'en', label: 'English (India)' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'ur', label: 'اردو (Urdu)' },
  ];

  return (
    <footer id="main-footer" className="relative bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      
      {/* Subtle Top Tricolour Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            
            <div className="flex items-center space-x-2.5">
              <div className="relative flex h-10 w-10 overflow-hidden items-center justify-center rounded-xl bg-slate-900 shadow-md border border-slate-700">
                <img
                  src={logoImg}
                  alt="Desi AI Keyboard Logo"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-extrabold text-white tracking-tight">Desi AI</span>
                <span className="rounded bg-gradient-to-r from-[#FF9933] to-[#138808] px-1.5 py-0.2 text-[9px] font-bold text-white uppercase">
                  Keyboard
                </span>
              </div>
            </div>

            <p className="text-xs text-amber-400 font-semibold tracking-wide">
              Type Smart. Speak Freely. Express Desi.
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              One intelligent Android keyboard for India’s languages, conversations and creativity. Designed with pride to make regional communication fluid and expressive.
            </p>

            {/* Google Play Download Pill */}
            <div className="pt-2">
              <button
                onClick={onOpenDownloadModal}
                className="inline-flex items-center space-x-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition-colors"
              >
                <Download className="h-4 w-4 text-emerald-400" />
                <span>Get Desi AI Keyboard on Play Store</span>
              </button>
            </div>

          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Features</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">Smart Text & Transliteration</a></li>
              <li><a href="#ways-to-input" className="hover:text-white transition-colors">Multilingual Voice Typing</a></li>
              <li><a href="#ways-to-input" className="hover:text-white transition-colors">Handwriting Recognition</a></li>
              <li><a href="#ai-tools" className="hover:text-white transition-colors">Inline Translation Bar</a></li>
              <li><a href="#personalization" className="hover:text-white transition-colors">Desi Stickers & Memes</a></li>
              <li><a href="#theme-gallery" className="hover:text-white transition-colors">Tricolour & Custom Themes</a></li>
            </ul>
          </div>

          {/* Languages Supported */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Supported Languages</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#languages" className="hover:text-white transition-colors">Hindi (हिन्दी) & English</a></li>
              <li><a href="#languages" className="hover:text-white transition-colors">Odia (ଓଡ଼ିଆ) & Bengali (বাংলা)</a></li>
              <li><a href="#languages" className="hover:text-white transition-colors">Tamil (தமிழ்) & Telugu (తెలుగు)</a></li>
              <li><a href="#languages" className="hover:text-white transition-colors">Marathi (मराठी) & Gujarati (ગુજરાતી)</a></li>
              <li><a href="#languages" className="hover:text-white transition-colors">Kannada (ಕನ್ನಡ) & Malayalam (മലയാളം)</a></li>
              <li><a href="#languages" className="hover:text-white transition-colors">Punjabi (ਪੰਜਾਬੀ) & Urdu (اردو)</a></li>
            </ul>
          </div>

          {/* Legal & Trust Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Trust & Support</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onOpenLegalModal('privacy')} className="hover:text-white transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegalModal('terms')} className="hover:text-white transition-colors text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegalModal('permissions')} className="hover:text-white transition-colors text-left">
                  Permission Guide
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegalModal('data-deletion')} className="hover:text-white transition-colors text-left">
                  Data Deletion Request
                </button>
              </li>
              <li>
                <button onClick={onOpenContactModal} className="hover:text-white transition-colors text-left">
                  Help & Feedback
                </button>
              </li>
              <li className="pt-1 text-[11px] text-slate-500 font-mono">
                {config.contactEmail}
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          <div className="flex items-center space-x-2">
            <span>© 2026 Desi AI Keyboard. All rights reserved.</span>
            <span>•</span>
            <span className="text-slate-400 flex items-center gap-1.5">
              <AshokaChakra size={14} animate={true} strokeColor="#93C5FD" />
              Made for Bharat
            </span>
          </div>

          {/* Language Selector for Website Localisation */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 bg-slate-800/80 rounded-xl px-3 py-1.5 border border-slate-700">
              <Globe className="h-3.5 w-3.5 text-amber-400" />
              <select
                value={siteLanguage}
                onChange={(e) => setSiteLanguage(e.target.value)}
                className="bg-transparent text-xs text-white outline-hidden cursor-pointer"
                aria-label="Website display language selector"
              >
                {siteLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Social Placeholders */}
            <div className="flex items-center space-x-2 text-slate-400">
              <a href="#" aria-label="Twitter / X" className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                𝕏
              </a>
              <a href="#" aria-label="YouTube" className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                ▶
              </a>
              <a href="#" aria-label="Instagram" className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                📸
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
