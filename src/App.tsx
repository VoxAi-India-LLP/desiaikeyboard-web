/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { MultilingualSection } from './components/MultilingualSection';
import { AICommunicationSection } from './components/AICommunicationSection';
import { AIAutocompleteSandbox } from './components/AIAutocompleteSandbox';
import { WaysToInputSection } from './components/WaysToInputSection';
import { VoiceTypingSimulation } from './components/VoiceTypingSimulation';
import { ExpressYourselfSection, ThemeGallerySection } from './components/ExpressYourselfSection';
import { ScreenshotsSection, WhyChooseSection } from './components/ScreenshotsSection';
import { PrivacySection, HowToStartSection } from './components/PrivacySection';
import { FAQSection } from './components/TestimonialsSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { AshokaChakra } from './components/AshokaChakra';
import { DownloadModal, ContactModal, LegalModal } from './components/Modals';
import { DEFAULT_CONFIG } from './data/content';
import { AppConfig } from './types';

export default function App() {
  const [config] = useState<AppConfig>(DEFAULT_CONFIG);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'permissions' | 'data-deletion' | null>(null);
  const [globalThemeId, setGlobalThemeId] = useState<string>('tricolour');

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#172033] flex flex-col selection:bg-[#FF9933]/25 selection:text-[#000080]">
      {/* Editorial Tricolour Top Strip with Central Ashoka Chakra */}
      <div className="fixed top-0 left-0 w-full h-[6px] flex items-center z-50 pointer-events-none shadow-xs">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white relative flex items-center justify-center">
          <div className="absolute -top-1.5 flex items-center justify-center h-5 w-5 rounded-full bg-white shadow-md border border-slate-200">
            <AshokaChakra size={14} animate={true} strokeColor="#000080" />
          </div>
        </div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>
      
      {/* Sticky Header */}
      <Header
        config={config}
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
        onOpenContactModal={() => setContactModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          config={config}
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
          themeId={globalThemeId}
        />

        {/* 2. Feature Overview (13 icon-based cards) */}
        <FeaturesSection />

        {/* 3. Multilingual Support (12 Indian languages + Transliteration Playground) */}
        <MultilingualSection />

        {/* 4. AI-Powered Communication (Workflow pipeline & connectivity notice) */}
        <AICommunicationSection />

        {/* 4b. AI Autocomplete Sandbox (Contextual next-word learning and prediction) */}
        <AIAutocompleteSandbox />

        {/* 5. Ways to Input (Type, Speak, Write with interactive Canvas) */}
        <WaysToInputSection />

        {/* 5b. Voice typing experience */}
        <VoiceTypingSimulation />

        {/* 6. Express Yourself (Stickers, GIFs, Emojis, Custom Stickers, Fonts) */}
        <ExpressYourselfSection />

        {/* 7. Theme Gallery (Interactive keyboard theme switcher) */}
        <ThemeGallerySection
          selectedThemeId={globalThemeId}
          onSelectGlobalTheme={(t) => setGlobalThemeId(t)}
        />

        {/* 8. Product Screenshots Gallery (9 screens with 1080x2400 specs) */}
        <ScreenshotsSection />

        {/* 9. Why Choose Desi AI Keyboard (7 benefits) */}
        <WhyChooseSection />

        {/* 10. Privacy and Permissions */}
        <PrivacySection
          config={config}
          onOpenLegalModal={(type) => setLegalModalType(type)}
        />

        {/* 11. How to Get Started (4 Steps) */}
        <HowToStartSection onOpenDownloadModal={() => setDownloadModalOpen(true)} />

        {/* 12. Frequently Asked Questions (10 FAQs accordion) */}
        <FAQSection onOpenContactModal={() => setContactModalOpen(true)} />

        {/* 13. Final Call to Action */}
        <FinalCTASection
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
          onOpenContactModal={() => setContactModalOpen(true)}
        />
      </main>

      {/* 15. Footer */}
      <Footer
        config={config}
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
        onOpenContactModal={() => setContactModalOpen(true)}
        onOpenLegalModal={(type) => setLegalModalType(type)}
      />

      {/* Interactive Modals */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        config={config}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        config={config}
      />

      <LegalModal
        isOpen={legalModalType !== null}
        docType={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

    </div>
  );
}
