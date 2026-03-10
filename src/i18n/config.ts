import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

// Pre-bundle nl (default) and en (fallback + missing-key handler)
import nl from './locales/nl.json';
import en from './locales/en.json';

// Brand name constant - use this everywhere
export const BRAND_NAME = 'GROPPI';

// RTL languages
export const RTL_LANGUAGES = ['ar', 'ur'] as const;

export const languages = [
  { code: 'nl', hreflang: 'nl-BE', name: 'Nederlands (BE)', dir: 'ltr' as const, flag: '🇧🇪' },
  { code: 'en', hreflang: 'en', name: 'English', dir: 'ltr' as const, flag: '🇬🇧' },
  { code: 'fr', hreflang: 'fr', name: 'Français', dir: 'ltr' as const, flag: '🇫🇷' },
  { code: 'de', hreflang: 'de', name: 'Deutsch', dir: 'ltr' as const, flag: '🇩🇪' },
  { code: 'ar', hreflang: 'ar', name: 'العربية', dir: 'rtl' as const, flag: '🇦🇪' },
  { code: 'es', hreflang: 'es', name: 'Español', dir: 'ltr' as const, flag: '🇪🇸' },
  { code: 'it', hreflang: 'it', name: 'Italiano', dir: 'ltr' as const, flag: '🇮🇹' },
  { code: 'pt', hreflang: 'pt', name: 'Português', dir: 'ltr' as const, flag: '🇵🇹' },
  { code: 'pl', hreflang: 'pl', name: 'Polski', dir: 'ltr' as const, flag: '🇵🇱' },
  { code: 'ru', hreflang: 'ru', name: 'Русский', dir: 'ltr' as const, flag: '🇷🇺' },
  { code: 'tr', hreflang: 'tr', name: 'Türkçe', dir: 'ltr' as const, flag: '🇹🇷' },
  { code: 'bn', hreflang: 'bn', name: 'বাংলা', dir: 'ltr' as const, flag: '🇧🇩' },
  { code: 'hi', hreflang: 'hi', name: 'हिन्दी', dir: 'ltr' as const, flag: '🇮🇳' },
  { code: 'ur', hreflang: 'ur', name: 'اردو', dir: 'rtl' as const, flag: '🇵🇰' },
  { code: 'zh', hreflang: 'zh', name: '中文', dir: 'ltr' as const, flag: '🇨🇳' },
] as const;

export type LanguageCode = typeof languages[number]['code'];

/**
 * Release-safety: Never render raw i18n keys in UI.
 *
 * If a key is missing in the active language, we fall back to English.
 * If it's missing in English too, we return a humanized fallback string.
 */
const EN_FALLBACKS: Record<string, string> = {
  // Content Calculator
  'servicePage.contentCalculator.title': 'Calculate your price in 60 sec',
  'servicePage.contentCalculator.subtitle': 'Choose what you need and get an instant estimate.',
  'servicePage.contentCalculator.step1': 'Choose payment type',
  'servicePage.contentCalculator.oneTime': 'One-time project',
  'servicePage.contentCalculator.monthly': 'Monthly subscription',
  'servicePage.contentCalculator.step2': 'Select your deliverables',
  'servicePage.contentCalculator.posters': 'Posters',
  'servicePage.contentCalculator.reels': 'Reels',
  'servicePage.contentCalculator.videos': 'Videos',
  'servicePage.contentCalculator.articles': 'Articles',
  'calculator.subtotal': 'Subtotal',
  'calculator.total': 'Total',
  'pricing.vatExcludedNote': 'All prices excl. VAT. VAT will be added on the invoice.',

  // Pricing FAQ
  'servicePage.pricingFAQ.label': 'Frequently asked questions',
  'servicePage.pricingFAQ.title': 'Pricing FAQ',
};

function humanizeFallback(key: string): string {
  const last = key.split('.').pop() || key;
  const spaced = last
    .replace(/_/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .trim();
  return spaced ? spaced.charAt(0).toUpperCase() + spaced.slice(1) : 'Text';
}

/**
 * Get language direction for a given locale
 */
export function getLanguageDirection(code: string): 'ltr' | 'rtl' {
  const lang = languages.find(l => l.code === code);
  return lang?.dir || 'ltr';
}

/**
 * Check if a language is RTL
 */
export function isRtlLanguage(code: string): boolean {
  return RTL_LANGUAGES.includes(code as any);
}

/**
 * Apply document direction based on language
 */
export function applyDocumentDirection(code: string): void {
  const dir = getLanguageDirection(code);
  document.documentElement.dir = dir;
  document.documentElement.lang = code;
  
  // Add/remove RTL class for CSS targeting
  if (dir === 'rtl') {
    document.documentElement.classList.add('rtl');
  } else {
    document.documentElement.classList.remove('rtl');
  }
}

// Clear any persisted language choice so we always start in nl
try { localStorage.removeItem('i18nextLng'); } catch (_) {}

i18n
  // Dynamic backend: loads other languages on-demand via Vite code-split chunks
  .use(resourcesToBackend((language: string, _namespace: string) => {
    // nl and en are pre-bundled; skip dynamic import for them
    if (language === 'nl' || language === 'en') return Promise.resolve(null);
    return import(`./locales/${language}.json`);
  }))
  .use(initReactI18next)
  .init({
    // nl + en pre-bundled — zero network request for default language
    resources: {
      nl: { translation: nl },
      en: { translation: en },
    },
    partialBundledLanguages: true,
    lng: 'nl',              // Always start in Dutch
    fallbackLng: ['nl', 'en'],
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    returnEmptyString: false,
    returnNull: false,
    // Critical: never show raw keys; fall back to EN (or a humanized string)
    parseMissingKeyHandler: (key) => {
      const enValue = i18n.getResource('en', 'translation', key);
      if (typeof enValue === 'string' && enValue.trim().length > 0) return enValue;

      const mapped = EN_FALLBACKS[key];
      if (mapped) return mapped;

      return humanizeFallback(key);
    },
    // Dev-only: log missing keys
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: (lngs, ns, key, fallbackValue) => {
      if (import.meta.env.DEV) {
        console.warn(
          `[i18n] Missing key: "${key}" for locales [${lngs.join(', ')}] in namespace "${ns}". Fallback: "${fallbackValue}"`
        );
      }
    },
  });

// Apply initial direction
applyDocumentDirection(i18n.language);

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  applyDocumentDirection(lng);
});

export default i18n;
