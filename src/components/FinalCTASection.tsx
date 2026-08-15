import React from 'react';
import { motion } from 'motion/react';
import { Download, Mail, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import { AshokaChakra } from './AshokaChakra';
import { RippleButton } from './RippleButton';

interface FinalCTAProps {
  onOpenDownloadModal: () => void;
  onOpenContactModal: () => void;
}

export const FinalCTASection: React.FC<FinalCTAProps> = ({
  onOpenDownloadModal,
  onOpenContactModal,
}) => {
  return (
    <section id="download" className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#FFFDF8] to-[#FFF5EB]">
      
      {/* Tricolour Ambient Top Highlight */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Container Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#000080] via-[#0D1530] to-[#172033] p-8 sm:p-12 lg:p-16 text-white shadow-2xl border border-slate-700">
          
          {/* Background Decorative Ashoka Chakra & Tricolour Lighting */}
          <div className="pointer-events-none absolute -right-16 -bottom-16 opacity-35">
            <AshokaChakra size={460} strokeColor="#93C5FD" animate={true} />
          </div>
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#FF9933]/20 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-[#138808]/20 blur-3xl"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-amber-300 border border-white/20 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Ready for Android Smartphones & Tablets</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Ready to Type the Desi Way?
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl">
                Download Desi AI Keyboard and make every conversation smarter, faster and more expressive across all Indian languages.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                
                {/* Google Play CTA */}
                <RippleButton
                  onClick={onOpenDownloadModal}
                  rippleColor="rgba(255, 255, 255, 0.45)"
                  className="w-full sm:w-auto group flex items-center justify-center space-x-3 rounded-2xl bg-gradient-to-r from-[#FF9933] to-[#138808] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-amber-900/30 transition-shadow"
                >
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-semibold text-white/80">Download Free On</div>
                    <div className="text-sm font-extrabold">Google Play Store</div>
                  </div>
                </RippleButton>

                {/* Contact Our Team */}
                <RippleButton
                  onClick={onOpenContactModal}
                  rippleColor="rgba(255, 255, 255, 0.25)"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-2xl bg-white/10 border border-white/25 px-6 py-4 text-sm font-bold text-white hover:bg-white/20 transition-colors"
                >
                  <Mail className="h-4 w-4 text-amber-300" />
                  <span>Contact Our Team</span>
                </RippleButton>

              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> 100% Free on Google Play</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Android 8.0+ Compatible</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> No Intrusive Ads</span>
              </div>

            </div>

            {/* Right: Direct download card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="rounded-3xl bg-white p-6 text-[#172033] shadow-2xl border border-slate-200 text-center max-w-[260px] w-full">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-100 to-emerald-100 border border-amber-200">
                  <Smartphone className="h-10 w-10 text-[#000080]" />
                </div>
                <div className="mt-4 text-base font-extrabold text-[#172033]">
                  Get Desi AI Keyboard
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Available free for Android 8.0+
                </div>
                <button
                  type="button"
                  onClick={onOpenDownloadModal}
                  className="mt-5 w-full rounded-xl bg-[#000080] px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-[#11116f] transition-colors"
                >
                  Open Google Play
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
