import { KeyboardEdition } from './editions';

/** Language-page FAQs. Rendered visibly on the page and mirrored in FAQPage JSON-LD. */
export const editionFaqs = (e: KeyboardEdition) => [
  {
    question: `Is the Bharat AI ${e.name} Keyboard free?`,
    answer: `Yes. Bharat AI ${e.name} Keyboard is free to download from the Google Play Store and works on Android 8.0 and newer.`,
  },
  {
    question: `How do I type ${e.name} using English letters?`,
    answer: `Just type how the word sounds in English letters (${e.phoneticStyle}). For example, typing "${e.samples[0].input}" gives you ${e.samples[0].output}. Suggestions appear above the keys so you can pick the right word with one tap.`,
  },
  {
    question: `Can I switch between ${e.name} and English while typing?`,
    answer: `Yes. Tap the globe key next to the space bar to switch between ${e.name} and English at any time without leaving your chat.`,
  },
  {
    question: `Does the ${e.name} keyboard work in WhatsApp, Instagram and other apps?`,
    answer: `Yes. Once you set Bharat AI ${e.name} Keyboard as your keyboard in Android settings, it works in every app where you type, including WhatsApp, Instagram, Facebook, YouTube, Gmail and SMS.`,
  },
  {
    question: `How do I set ${e.name} keyboard as my default keyboard?`,
    answer: `Install the app from Google Play, open it and follow the setup: enable Bharat AI ${e.name} Keyboard in Settings › System › Languages & input › On-screen keyboard, then choose it as your current keyboard.`,
  },
  {
    question: `What is the difference between the ${e.name} edition and the all-languages app?`,
    answer: `The ${e.name} edition is set up for ${e.name} out of the box. The all-languages Bharat AI Keyboard app lets you switch between Hindi, Bengali, Tamil, Telugu and other Indian languages in one keyboard. Both are free.`,
  },
];
