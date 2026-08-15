# Desi AI Keyboard – Product Launch Website

A modern, premium, responsive product-launch website for **Desi AI Keyboard**—India’s AI-powered multilingual Android mobile keyboard supporting 12+ Indian scripts, handwriting recognition, speech-to-text voice typing, live translation, and rich personalization.

---

## 🇮🇳 Brand Identity & Visual Theme

- **Tagline**: *Type Smart. Speak Freely. Express Desi.*
- **Supporting Line**: *One intelligent keyboard for India’s languages, conversations and creativity.*
- **Tricolour Palette**:
  - **Saffron**: `#FF9933`
  - **White**: `#FFFFFF`
  - **India Green**: `#138808`
  - **Ashoka Chakra Navy**: `#000080`
  - **Dark text**: `#172033`
  - **Light background**: `#FFFDF8`
- **Ashoka Chakra Motif**: Geometric 24-spoke circular vector motif utilized respectfully as subtle animated backdrops and badge accents.

---

## 🚀 Features & Sections Built

1. **Sticky Navigation Bar**: Desi AI Keyboard logo, links to Features, Languages, AI Tools, Personalization, Screenshots, FAQs, Contact, and Google Play download CTA.
2. **Hero Section**: High-impact headline, live interactive Android phone typing mockup, floating native script greeting badges (नमस्ते, வணக்கம், Hello, ନମସ୍କାର, سلام - RTL), and trust badges.
3. **13 Core Features**: Icon cards with category filters (Input, AI & Language, Expression & Media, Productivity) and detail modal.
4. **Multilingual Support**: Interactive showcase of 12 Indian languages with native scripts, RTL Urdu layout, upcoming languages card, and a live Transliteration playground widget.
5. **AI-Powered Communication**: 4-stage visual workflow (*Type/Speak ➔ Understand ➔ Correct/Translate ➔ Share*), 6 core AI capabilities, and connectivity transparency notice.
6. **Ways to Input**: 3 interactive cards for *Type*, *Speak*, and *Write* with interactive stroke handwriting canvas and live audio waveform visualizer.
7. **Express Yourself**: Media hub for Desi stickers, trending GIFs, emoji search, custom sticker creator studio, and stylish font generator.
8. **Theme Gallery**: 6 themes (*Indian Tricolour, Dark Mode, Minimal White, Cyber Neon, Festival of Lights, Custom Photo*) with live keyboard preview.
9. **Product Screenshots Gallery**: 9 mockups with recommended screenshot dimensions (`1080 × 2400 px` Android 9:19.5 aspect ratio) and asset paths.
10. **Why Choose Desi AI Keyboard**: 7 clear, transparent benefits for everyday Indian communicators.
11. **Privacy & Permissions**: Plain-language breakdown of Microphone, Storage, Contacts (future feature), and Internet permissions with dedicated policy modal.
12. **How to Get Started**: 4-step Android onboarding guide with system settings walkthrough.
13. **Testimonials**: 3 user scenario cards with clear placeholder notice for verified post-launch reviews.
14. **Frequently Asked Questions**: Accessible 10-question FAQ accordion with search and category filters.
15. **Final Call to Action**: Bold tricolour gradient banner with Google Play CTA, interactive QR Code scanner card, and contact team button.
16. **Footer**: Navigation, legal links, email (`support@desiaikeyboard.com`), social links, copyright 2026, and website language switcher.
17. **Configuration Panel**: Floating control tool to test Google Play URLs, contact email, and themes in real-time.

---

## 🛠️ Local Development & Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd desi-ai-keyboard-website

# Install dependencies
npm install

# Start local development server (runs on port 3000)
npm run dev
```

Open your browser at `http://localhost:3000`.

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment Instructions

### 1. Deploying to Firebase Hosting

```bash
# Install Firebase CLI globally if not installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project root
firebase init hosting
# - Choose 'dist' as your public directory
# - Configure as a single-page app (rewrite all urls to /index.html): Yes
# - Set up automatic builds and deploys with GitHub: Optional

# Build and Deploy
npm run build
firebase deploy --only hosting
```

### 2. Deploying to Vercel

```bash
# Using Vercel CLI
npm install -g vercel
vercel

# Or via Vercel Dashboard:
# 1. Import your GitHub repository to Vercel
# 2. Framework Preset: Vite
# 3. Build Command: npm run build
# 4. Output Directory: dist
# 5. Click Deploy
```

### 3. Deploying to Netlify

```bash
# Using Netlify CLI
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist

# Or via Netlify Dashboard:
# 1. Connect repository
# 2. Build command: npm run build
# 3. Publish directory: dist
# 4. Click Deploy Site
```

---

## ⚙️ Configuration & Asset Customization

### 1. Setting Google Play Store Link & Support Email
Update the default configuration in `src/data/content.ts` or via the interactive floating settings panel:

```typescript
export const DEFAULT_CONFIG: AppConfig = {
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.AnuvadiniAIWritoKeyboard',
  contactEmail: 'support@desiaikeyboard.com',
  privacyPolicyUrl: '#privacy',
  termsOfServiceUrl: '#terms',
  permissionGuideUrl: '#permissions',
  dataDeletionUrl: '#data-deletion',
};
```

### 2. Replacing Screenshot Placeholders with Real Screenshots
Place your final `1080 × 2400 px` PNG screenshots in the `public/screenshots/` folder matching these filenames:
- `desi_keyboard_home_1080x2400.png`
- `desi_keyboard_languages_1080x2400.png`
- `desi_keyboard_voice_1080x2400.png`
- `desi_keyboard_handwriting_1080x2400.png`
- `desi_keyboard_translation_1080x2400.png`
- `desi_keyboard_emoji_gif_1080x2400.png`
- `desi_keyboard_custom_stickers_1080x2400.png`
- `desi_keyboard_themes_1080x2400.png`
- `desi_keyboard_drawer_1080x2400.png`

---

## 📱 Supported Indian Languages & Scripts

| Language | Script / Native Name | Sample Greeting | Direction |
| :--- | :--- | :--- | :--- |
| **Hindi** | हिन्दी (Devanagari) | नमस्ते (Namaste) | LTR |
| **Odia** | ଓଡ଼ିଆ (Odia) | ନମସ୍କାର (Namaskara) | LTR |
| **Urdu** | اردو (Nastaliq / Arabic) | سلام (Salaam) | **RTL** |
| **Tamil** | தமிழ் (Tamil) | வணக்கம் (Vanakkam) | LTR |
| **Telugu** | తెలుగు (Telugu) | నమస్కారం (Namaskaram) | LTR |
| **Bengali** | বাংলা (Bengali) | নমস্কার (Nomoshkar) | LTR |
| **Marathi** | मराठी (Devanagari) | नमस्कार (Namaskar) | LTR |
| **Gujarati** | ગુજરાતી (Gujarati) | નમસ્તે (Namaste) | LTR |
| **Kannada** | ಕನ್ನಡ (Kannada) | ನಮಸ್ಕಾರ (Namaskara) | LTR |
| **Malayalam** | മലയാളം (Malayalam) | നമസ്കാരം (Namaskaram) | LTR |
| **Punjabi** | ਪੰਜਾਬੀ (Gurmukhi) | ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ (Sat Sri Akaal) | LTR |
| **English** | English (India) | Hello | LTR |

---

## 🛡️ License
Apache-2.0 License. Built for India with pride.
