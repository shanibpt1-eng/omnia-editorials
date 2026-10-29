'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, Translations, getTranslation } from '../lib/i18n';

type Theme = 'dark' | 'light';
type Currency = 'AED' | 'SAR';

interface LuxuryContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  toggleLanguage: () => void;
  dir: 'ltr' | 'rtl';
  t: Translations;
  formatPrice: (aed: number, sar?: number) => string;
}

const defaultTranslations = getTranslation('en');

const LuxuryContext = createContext<LuxuryContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
  currency: 'AED',
  setCurrency: () => {},
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  dir: 'ltr',
  t: defaultTranslations,
  formatPrice: (aed) => `AED ${aed}`,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [currency, setCurrencyState] = useState<Currency>('AED');
  const [language, setLanguageState] = useState<Language>('en');

  const applyTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('omnia_theme', t);
    const isDark = t === 'dark';
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.classList.toggle('light', !isDark);
      document.body.classList.toggle('dark', isDark);
      document.body.classList.toggle('light', !isDark);
    }
  };

  const applyLanguage = (l: Language) => {
    setLanguageState(l);
    localStorage.setItem('omnia_lang', l);
    if (typeof document !== 'undefined') {
      const isRtl = l === 'ar';
      document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', l);
      document.documentElement.classList.toggle('rtl', isRtl);
      document.body.classList.toggle('rtl', isRtl);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('omnia_theme') as Theme | null;
    const savedCurrency = localStorage.getItem('omnia_currency') as Currency | null;
    const savedLang = localStorage.getItem('omnia_lang') as Language | null;

    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      applyTheme('dark');
    }
    if (savedCurrency) setCurrencyState(savedCurrency);
    if (savedLang) applyLanguage(savedLang);
  }, []);

  const toggleTheme = () => {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (t: Theme) => {
    applyTheme(t);
  };

  const handleSetCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('omnia_currency', c);
  };

  const handleSetLanguage = (l: Language) => {
    applyLanguage(l);
  };

  const toggleLanguage = () => {
    applyLanguage(language === 'en' ? 'ar' : 'en');
  };

  const formatPrice = (aed: number, sar?: number): string => {
    const isAr = language === 'ar';
    if (currency === 'SAR') {
      const calculatedSar = sar ?? Math.round(aed * 1.02);
      return isAr ? `${calculatedSar.toLocaleString()} ر.س` : `SAR ${calculatedSar.toLocaleString()}`;
    }
    return isAr ? `${aed.toLocaleString()} د.إ` : `AED ${aed.toLocaleString()}`;
  };

  const dir: 'ltr' | 'rtl' = language === 'ar' ? 'rtl' : 'ltr';
  const t = getTranslation(language);

  return (
    <LuxuryContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        currency,
        setCurrency: handleSetCurrency,
        language,
        setLanguage: handleSetLanguage,
        toggleLanguage,
        dir,
        t,
        formatPrice,
      }}
    >
      <div
        dir={dir}
        className={
          theme === 'dark'
            ? 'dark bg-[#0A0D14] text-[#F4F5F8] transition-colors duration-300'
            : 'light bg-[#FDFBF7] text-[#1A1A1A] transition-colors duration-300'
        }
      >
        {children}
      </div>
    </LuxuryContext.Provider>
  );
}

export function useLuxury() {
  return useContext(LuxuryContext);
}
