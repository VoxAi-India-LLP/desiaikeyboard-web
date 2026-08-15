import React from 'react';
import { 
  ShieldCheck, 
  Mic, 
  Image as ImageIcon, 
  Users, 
  Wifi, 
  FileText, 
  Lock, 
  Trash2, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { PERMISSIONS_DATA } from '../data/content';
import { AppConfig } from '../types';

interface PrivacySectionProps {
  config: AppConfig;
  onOpenLegalModal: (docType: 'privacy' | 'terms' | 'permissions' | 'data-deletion') => void;
}

export const PrivacySection: React.FC<PrivacySectionProps> = ({
  config,
  onOpenLegalModal,
}) => {
  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Mic,
    Image: ImageIcon,
    Users,
    Wifi,
  };

  return (
    <section id="privacy" className="relative py-20 lg:py-28 bg-[#FFFDF8] border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-[#138808] border border-emerald-200 mb-3">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Transparency & Data Security</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033]">
            Your Keyboard. Your Control.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            We believe in honest, transparent privacy practices. Learn why specific Android permissions may be requested and how your input preferences are managed.
          </p>
        </div>

        {/* 4 Android Permission Details Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PERMISSIONS_DATA.map((perm) => {
            const Icon = iconMap[perm.icon] || ShieldCheck;
            return (
              <div
                key={perm.id}
                className="flex flex-col justify-between rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#000080]">
                      <Icon className="h-5 w-5 text-[#000080]" />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        perm.isOptional
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {perm.isOptional ? 'Optional' : 'Feature Req'}
                    </span>
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-[#172033]">{perm.name}</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {perm.purpose}
                  </p>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-500">
                  <span className="text-slate-400 block text-[10px]">Usage Cadence:</span>
                  <span className="text-[#172033] font-semibold">{perm.frequency}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legal & Policy Quick Link Buttons */}
        <div className="mt-12 rounded-2xl bg-slate-50 p-6 border border-slate-200 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => onOpenLegalModal('privacy')}
            className="inline-flex items-center space-x-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-800 border border-slate-300 shadow-2xs hover:bg-slate-100 transition-colors"
          >
            <Lock className="h-3.5 w-3.5 text-[#000080]" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => onOpenLegalModal('terms')}
            className="inline-flex items-center space-x-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-800 border border-slate-300 shadow-2xs hover:bg-slate-100 transition-colors"
          >
            <FileText className="h-3.5 w-3.5 text-[#000080]" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => onOpenLegalModal('permissions')}
            className="inline-flex items-center space-x-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-800 border border-slate-300 shadow-2xs hover:bg-slate-100 transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5 text-[#000080]" />
            <span>Permission Guide</span>
          </button>

          <button
            onClick={() => onOpenLegalModal('data-deletion')}
            className="inline-flex items-center space-x-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-800 border border-slate-300 shadow-2xs hover:bg-slate-100 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5 text-red-600" />
            <span>Data Deletion Request</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export const HowToStartSection: React.FC<{ onOpenDownloadModal: () => void }> = ({ onOpenDownloadModal }) => {
  const steps = [
    {
      step: '1',
      title: 'Download App',
      desc: 'Get Desi AI Keyboard free directly from the Google Play Store on your Android device.',
      actionText: 'Install via Play Store',
      icon: '📥',
    },
    {
      step: '2',
      title: 'Enable in Settings',
      desc: 'Open Android Settings ➔ System ➔ Languages & Input ➔ On-screen keyboard and toggle Desi AI Keyboard ON.',
      actionText: 'Android System Settings',
      icon: '⚙️',
    },
    {
      step: '3',
      title: 'Select as Default',
      desc: 'Tap the keyboard switcher or prompt to choose Desi AI Keyboard as your active input method.',
      actionText: 'Set Active Input',
      icon: '📱',
    },
    {
      step: '4',
      title: 'Choose Languages & Theme',
      desc: 'Pick your preferred native scripts (Hindi, Odia, Tamil, Urdu, etc.) and apply your favorite theme.',
      actionText: 'Ready to Express Desi',
      icon: '🎨',
    },
  ];

  return (
    <section id="how-to-start" className="relative py-20 lg:py-28 bg-[#FFFDF8] border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-[#FF9933] border border-amber-500/20 mb-3">
            <span>Quick 60-Second Setup</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033]">
            How to Get Started
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Four simple steps to transform typing on your Android phone or tablet.
          </p>
        </div>

        {/* 4 Step Visual Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-3xl bg-white p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#000080] to-[#172033] text-sm font-black text-white shadow-xs">
                    {item.step}
                  </div>
                  <span className="text-2xl">{item.icon}</span>
                </div>

                <h3 className="mt-4 text-base font-bold text-[#172033]">{item.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-3 text-[11px] font-semibold text-[#000080]">
                {item.actionText}
              </div>
            </div>
          ))}
        </div>

        {/* Setup CTA banner */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenDownloadModal}
            className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-[#FF9933] to-[#138808] px-8 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all"
          >
            <span>Start Step 1: Download from Google Play</span>
          </button>
        </div>

      </div>
    </section>
  );
};
