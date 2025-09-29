'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface I18nSwitcherProps {
  languages: Language[];
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  className?: string;
  variant?: 'button' | 'dropdown' | 'select';
  size?: 'sm' | 'md' | 'lg';
  showFlag?: boolean;
  showNativeName?: boolean;
  showCode?: boolean;
}

export function I18nSwitcher({
  languages,
  currentLanguage,
  onLanguageChange,
  className,
  variant = 'dropdown',
  size = 'md',
  showFlag = true,
  showNativeName = true,
  showCode = false,
}: I18nSwitcherProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0];

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-4 py-3 text-base';
      default:
        return 'px-3 py-2 text-sm';
    }
  };

  const getFlagSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-3';
      case 'lg':
        return 'w-6 h-4';
      default:
        return 'w-5 h-4';
    }
  };

  if (variant === 'select') {
    return (
      <div className={twMerge('relative', className)}>
        <select
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className={twMerge(
            'w-full bg-cosmic-surface border border-cosmic-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-primary',
            getSizeClasses(),
          )}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {showFlag && `${lang.flag} `}
              {showNativeName ? lang.nativeName : lang.name}
              {showCode && ` (${lang.code})`}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (variant === 'button') {
    const currentIndex = languages.findIndex((lang) => lang.code === currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLang = languages[nextIndex];

    return (
      <Button
        variant="outline"
        onClick={() => onLanguageChange(nextLang.code)}
        className={twMerge('flex items-center space-x-2', getSizeClasses(), className)}
      >
        {showFlag && <span className={getFlagSize()}>{currentLang.flag}</span>}
        <span>
          {showNativeName ? currentLang.nativeName : currentLang.name}
          {showCode && ` (${currentLang.code})`}
        </span>
      </Button>
    );
  }

  // Default dropdown variant
  return (
    <div className={twMerge('relative', className)}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={twMerge('flex items-center space-x-2', getSizeClasses())}
      >
        {showFlag && <span className={getFlagSize()}>{currentLang.flag}</span>}
        <span>
          {showNativeName ? currentLang.nativeName : currentLang.name}
          {showCode && ` (${currentLang.code})`}
        </span>
        <svg
          className={twMerge('transition-transform', isOpen ? 'rotate-180' : '', 'w-4 h-4')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-cosmic-surface border border-cosmic-border rounded-lg shadow-xl z-50">
            <div className="p-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={twMerge(
                    'w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors',
                    currentLanguage === lang.code
                      ? 'bg-cosmic-primary text-white'
                      : 'text-white/70 hover:text-white hover:bg-cosmic-border/50',
                  )}
                >
                  {showFlag && <span className={getFlagSize()}>{lang.flag}</span>}
                  <div className="flex-1 text-left">
                    <div className="font-medium">
                      {showNativeName ? lang.nativeName : lang.name}
                    </div>
                    {showCode && (
                      <div className="text-xs opacity-70">{lang.code.toUpperCase()}</div>
                    )}
                  </div>
                  {currentLanguage === lang.code && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Hook for i18n management
export function useI18n() {
  const [language, setLanguage] = React.useState<string>('fr');

  // Initialize language from localStorage or browser
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      setLanguage(browserLang);
    }
  }, []);

  // Save language to localStorage
  React.useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return {
    language,
    changeLanguage,
  };
}

// Common languages
export const COMMON_LANGUAGES: Language[] = [
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
  },
];

// Language detection utility
export function detectBrowserLanguage(): string {
  if (typeof window === 'undefined') return 'en';

  const browserLang = navigator.language.split('-')[0];
  return browserLang;
}

// Format language name utility
export function formatLanguageName(
  language: Language,
  showNative: boolean = true,
  showCode: boolean = false,
): string {
  let name = showNative ? language.nativeName : language.name;
  if (showCode) {
    name += ` (${language.code.toUpperCase()})`;
  }
  return name;
}
