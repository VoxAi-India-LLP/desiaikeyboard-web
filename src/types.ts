export interface LanguageItem {
  id: string;
  name: string;
  nativeName: string;
  greeting: string;
  greetingTransliteration: string;
  scriptFontClass: string;
  sampleInput: string;
  sampleOutput: string;
  isRTL?: boolean;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  category: 'Input' | 'AI & Language' | 'Expression & Media' | 'Productivity';
  icon: string;
  badge?: string;
}

export interface ThemeOption {
  id: string;
  name: string;
  description: string;
  category: string;
  keyboardBg: string;
  keyBg: string;
  keyText: string;
  accentBg: string;
  accentText: string;
  previewGradient: string;
  previewBorder: string;
  isDark?: boolean;
}

export interface ScreenshotSpec {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  recommendedDimensions: string;
  badge: string;
  featureKey: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Languages' | 'AI & Features' | 'Privacy & Offline';
}

export interface TestimonialItem {
  id: string;
  quote: string;
  persona: string;
  useCase: string;
  city: string;
  languageUsed: string;
}

export interface PermissionDetail {
  id: string;
  name: string;
  purpose: string;
  isOptional: boolean;
  frequency: string;
  icon: string;
}

export interface AppConfig {
  playStoreUrl: string;
  contactEmail: string;
  privacyPolicyUrl: string;
  termsOfServiceUrl: string;
  permissionGuideUrl: string;
  dataDeletionUrl: string;
}
