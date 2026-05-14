'use client';
import { useLang } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
  const { lang, setLanguage } = useLang();

  return (
    <div className="lang-switcher">
      <button
        className={`lang-btn${lang === 'es' ? ' active' : ''}`}
        onClick={() => setLanguage('es')}
      >
        ES
      </button>
      <span className="lang-divider">|</span>
      <button
        className={`lang-btn${lang === 'en' ? ' active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}
