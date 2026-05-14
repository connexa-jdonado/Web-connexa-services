'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  es: {
    nav: {
      services: 'Servicios',
      products: 'Productos',
      partnerships: 'Partnerships',
      successCases: 'Casos de éxito',
      about: 'Nosotros',
      cta: 'Hablar con un experto',
    },
    footer: {
      description:
        'Expertos en Field Service Management. Implementamos, optimizamos y soportamos Oracle Field Service Cloud y Zinier para empresas líderes en América Latina y el mundo.',
      services: 'Servicios',
      products: 'Productos',
      company: 'Empresa',
      contact: 'Contacto',
      privacy: 'Privacidad',
      terms: 'Términos',
      copyright: '© 2026 Connexa Services. Todos los derechos reservados.',
      serviceLinks: {
        ofscImpl: 'Implementación OFSC',
        zinierImpl: 'Implementación Zinier',
        consulting: 'Consultoría FSM',
        support: 'Soporte Post Go-Live',
      },
      companyLinks: {
        about: 'Nosotros',
        successCases: 'Casos de éxito',
      },
    },
  },
  en: {
    nav: {
      services: 'Services',
      products: 'Products',
      partnerships: 'Partnerships',
      successCases: 'Success Stories',
      about: 'About Us',
      cta: 'Talk to an Expert',
    },
    footer: {
      description:
        'Field Service Management experts. We implement, optimize and support Oracle Field Service Cloud and Zinier for leading companies in Latin America and worldwide.',
      services: 'Services',
      products: 'Products',
      company: 'Company',
      contact: 'Contact',
      privacy: 'Privacy',
      terms: 'Terms',
      copyright: '© 2026 Connexa Services. All rights reserved.',
      serviceLinks: {
        ofscImpl: 'OFSC Implementation',
        zinierImpl: 'Zinier Implementation',
        consulting: 'FSM Consulting',
        support: 'Post Go-Live Support',
      },
      companyLinks: {
        about: 'About Us',
        successCases: 'Success Stories',
      },
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const saved = localStorage.getItem('connexa-lang');
    if (saved === 'es' || saved === 'en') setLang(saved);
  }, []);

  const setLanguage = (l) => {
    setLang(l);
    localStorage.setItem('connexa-lang', l);
  };

  const toggleLang = () => setLanguage(lang === 'es' ? 'en' : 'es');
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
