// Route table + per-page SEO (title, meta, Open Graph, JSON-LD).
// Used by the client (to keep document.title in sync) and by scripts/prerender.mjs
// (to write fully-formed static HTML for every route at build time).

import { FAQ_LIST } from './data/content';
import { LANGUAGE_EDITIONS, MAIN_EDITION, KeyboardEdition, editionPath, findEditionByPath } from './data/editions';
import { editionFaqs } from './data/editionFaqs';

export const SITE_URL = 'https://bharataikeyboard.com';
const BRAND = 'Bharat AI Keyboard';
const DEFAULT_OG_IMAGE = '/featured/hindi.jpg';

export type Route =
  | { kind: 'home'; path: '/' }
  | { kind: 'privacy'; path: '/privacy-policy' }
  | { kind: 'language'; path: string; edition: KeyboardEdition }
  | { kind: 'notfound'; path: string };

export const normalizePath = (pathname: string) => {
  const p = pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '');
  return p === '' ? '/' : p;
};

export const resolveRoute = (pathname: string): Route => {
  const path = normalizePath(pathname);
  if (path === '/') return { kind: 'home', path: '/' };
  if (path === '/privacy-policy') return { kind: 'privacy', path: '/privacy-policy' };
  const edition = findEditionByPath(path);
  if (edition) return { kind: 'language', path, edition };
  return { kind: 'notfound', path };
};

/** Every indexable route, in sitemap priority order. */
export const INDEXABLE_PATHS: string[] = ['/', ...LANGUAGE_EDITIONS.map(editionPath), '/privacy-policy'];

export interface PageHead {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogImage: string;
  ogImageAlt: string;
  ogImageWidth: number;
  ogImageHeight: number;
  lang: string;
  jsonLd: object[];
}

const abs = (p: string) => (p.startsWith('http') ? p : `${SITE_URL}${p}`);

const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: BRAND,
  url: `${SITE_URL}/`,
  logo: abs('/logo.png'),
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@bharataikeyboard.com',
    contactType: 'customer support',
    availableLanguage: ['English', 'Hindi'],
  },
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: BRAND,
  inLanguage: 'en-IN',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

const offer = { '@type': 'Offer', price: '0', priceCurrency: 'INR' };

const faqPage = (url: string, items: { question: string; answer: string }[]) => ({
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

const graph = (...nodes: object[]) => [{ '@context': 'https://schema.org', '@graph': nodes }];

export const getHead = (route: Route): PageHead => {
  const base = {
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogImage: abs(DEFAULT_OG_IMAGE),
    ogImageAlt: 'Bharat AI Keyboard – type in English letters and get Indian-language script instantly',
    ogImageWidth: 1024,
    ogImageHeight: 500,
    lang: 'en-IN',
  };

  if (route.kind === 'language') {
    const e = route.edition;
    const url = abs(route.path);
    return {
      ...base,
      title: `${e.name} Keyboard for Android – Type ${e.name} in English | Bharat AI`,
      description: `Free ${e.name} keyboard for Android. Type in ${e.phoneticStyle} and get ${e.nativeName} script instantly, with smart next-word suggestions and voice typing. Download Bharat AI ${e.name} Keyboard (${e.nativeKeyword}).`,
      canonical: url,
      ogImage: abs(e.bannerPath ?? DEFAULT_OG_IMAGE),
      ogImageAlt: `Bharat AI ${e.name} Keyboard – type "${e.samples[0].input}" and get ${e.samples[0].output}`,
      jsonLd: graph(
        organization,
        website,
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: `${e.name} Keyboard for Android`,
          inLanguage: 'en-IN',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': `${url}#app` },
          primaryImageOfPage: abs(e.bannerPath ?? DEFAULT_OG_IMAGE),
          breadcrumb: { '@id': `${url}#breadcrumb` },
        },
        {
          '@type': 'MobileApplication',
          '@id': `${url}#app`,
          name: `Bharat AI ${e.name} Keyboard`,
          alternateName: [`${e.name} Keyboard`, e.nativeKeyword],
          operatingSystem: 'Android',
          applicationCategory: 'UtilitiesApplication',
          applicationSubCategory: 'Keyboard',
          inLanguage: [e.langCode, 'en'],
          description: `Android keyboard for ${e.name} (${e.nativeName}) with ${e.phoneticStyle} transliteration, next-word suggestions and voice typing.`,
          downloadUrl: e.playStoreUrl,
          installUrl: e.playStoreUrl,
          image: abs(e.bannerPath ?? DEFAULT_OG_IMAGE),
          offers: offer,
          publisher: { '@id': `${SITE_URL}/#organization` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${url}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: `${e.name} Keyboard`, item: url },
          ],
        },
        faqPage(url, editionFaqs(e)),
      ),
    };
  }

  if (route.kind === 'privacy') {
    const url = abs('/privacy-policy');
    return {
      ...base,
      title: 'Privacy Policy | Bharat AI Keyboard',
      description:
        'How Bharat AI Keyboard handles your data: what is processed on your device, what is never collected, permissions explained and how to request deletion.',
      canonical: url,
      jsonLd: graph(organization, website, {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: 'Privacy Policy',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      }),
    };
  }

  if (route.kind === 'notfound') {
    return {
      ...base,
      robots: 'noindex, follow',
      title: 'Page not found | Bharat AI Keyboard',
      description: 'This page does not exist. Explore Bharat AI Keyboard for Hindi, Tamil, Bengali and more Indian languages.',
      canonical: `${SITE_URL}/`,
      jsonLd: [],
    };
  }

  // Home
  const url = `${SITE_URL}/`;
  return {
    ...base,
    title: 'Bharat AI Keyboard – Indian Language Keyboard for Android | Hindi, Tamil, Bengali',
    description:
      'Free AI keyboard for Android in 14 languages: Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Odia, Punjabi, Assamese, Nepali, Urdu & English. Hinglish typing, voice typing, translation and stickers.',
    canonical: url,
    jsonLd: graph(
      organization,
      website,
      {
        '@type': 'MobileApplication',
        '@id': `${url}#app`,
        name: BRAND,
        operatingSystem: 'Android 8.0 or later',
        applicationCategory: 'UtilitiesApplication',
        applicationSubCategory: 'Keyboard',
        description:
          'Multilingual Android keyboard for Indian languages with phonetic (Hinglish) transliteration, voice typing, handwriting, in-keyboard translation, themes and stickers.',
        inLanguage: ['en', 'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'or', 'pa', 'as', 'ne', 'ur'],
        downloadUrl: MAIN_EDITION.playStoreUrl,
        installUrl: MAIN_EDITION.playStoreUrl,
        image: abs('/logo.png'),
        screenshot: abs('/screenshots/bharat-keyboard-whatsapp-1080x2400.jpg'),
        offers: offer,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#editions`,
        name: 'Bharat AI Keyboard language editions',
        itemListElement: LANGUAGE_EDITIONS.map((e, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${e.name} Keyboard`,
          url: abs(editionPath(e)),
        })),
      },
      faqPage(url, FAQ_LIST),
    ),
  };
};

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Serialises the head for injection into static HTML. */
export const renderHeadTags = (h: PageHead) =>
  [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<meta name="robots" content="${h.robots}" />`,
    `<link rel="canonical" href="${h.canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:url" content="${h.canonical}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:image" content="${h.ogImage}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="${h.ogImageWidth}" />`,
    `<meta property="og:image:height" content="${h.ogImageHeight}" />`,
    `<meta property="og:image:alt" content="${esc(h.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${h.ogImage}" />`,
    `<meta name="twitter:image:alt" content="${esc(h.ogImageAlt)}" />`,
    ...h.jsonLd.map(
      (j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`,
    ),
  ].join('\n    ');
