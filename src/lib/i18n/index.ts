import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import en from './en';
import ja from './ja';

// Available languages
export type LanguageKey = 'en' | 'ja';

const isLanguageKey = (key: string): key is LanguageKey => {
  return key === 'en' || key === 'ja';
};

export const languages: Record<LanguageKey, { name: string; dict: any }> = {
  en: { name: 'English', dict: en },
  ja: { name: '日本語', dict: ja }
};


// Get initial language from localStorage or browser preference
const getInitialLanguage = () => {
  if (!browser) return 'en';
  
  const storedLang = localStorage.getItem('language');
  if (storedLang && isLanguageKey(storedLang)) return storedLang;
  
  const browserLang = navigator.language.split('-')[0];
  return isLanguageKey(browserLang) ? browserLang : 'en';
};

// Create the language store
export const language = writable(getInitialLanguage());

// Create a derived store for the dictionary (t)
export const t = derived(language, ($language) => languages[$language].dict);

// Function to change language
export function setLanguage(newLanguage: LanguageKey) {
  if (languages[newLanguage]) {
    language.set(newLanguage);
    if (browser) {
      localStorage.setItem('language', newLanguage);
      document.documentElement.lang = newLanguage;
    }
  }
}