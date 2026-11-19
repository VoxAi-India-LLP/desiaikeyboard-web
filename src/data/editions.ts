// Per-language editions of Bharat AI Keyboard, each with its own Play Store listing.
// QR codes live in /public/QR-Code and encode the same playStoreUrl.

export interface KeyboardEdition {
  slug: string;
  name: string;
  nativeName: string;
  fontClass: string;
  playStoreUrl: string;
  qrPath: string;
  /** Play Store featured graphic (1024x500) in /public/featured, if one exists. */
  bannerPath?: string;
}

const play = (pkg: string) => `https://play.google.com/store/apps/details?id=com.bharataikeyboard.${pkg}`;

const edition = (slug: string, name: string, nativeName: string, fontClass: string): KeyboardEdition => ({
  slug,
  name,
  nativeName,
  fontClass,
  playStoreUrl: play(slug),
  qrPath: `/QR-Code/${slug}_keyboard_qr.png`,
  bannerPath: `/featured/${slug}.jpg`,
});

/** The all-languages app. */
export const MAIN_EDITION: KeyboardEdition = {
  slug: 'all',
  name: 'All Languages',
  nativeName: 'Bharat AI Keyboard',
  fontClass: '',
  playStoreUrl: play('app'),
  qrPath: '/QR-Code/bharat_ai_keyboard_qr.png',
};

export const LANGUAGE_EDITIONS: KeyboardEdition[] = [
  edition('hindi', 'Hindi', 'हिन्दी', 'font-devanagari'),
  edition('bengali', 'Bengali', 'বাংলা', 'font-bengali'),
  edition('tamil', 'Tamil', 'தமிழ்', 'font-tamil'),
  edition('telugu', 'Telugu', 'తెలుగు', 'font-telugu'),
  edition('marathi', 'Marathi', 'मराठी', 'font-devanagari'),
  edition('gujarati', 'Gujarati', 'ગુજરાતી', 'font-gujarati'),
  edition('kannada', 'Kannada', 'ಕನ್ನಡ', 'font-kannada'),
  edition('malayalam', 'Malayalam', 'മലയാളം', 'font-malayalam'),
  edition('odia', 'Odia', 'ଓଡ଼ିଆ', 'font-odia'),
  edition('punjabi', 'Punjabi', 'ਪੰਜਾਬੀ', 'font-gurmukhi'),
  edition('assamese', 'Assamese', 'অসমীয়া', 'font-bengali'),
  edition('nepali', 'Nepali', 'नेपाली', 'font-devanagari'),
];
