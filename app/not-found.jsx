'use client';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function NotFound() {
  const { lang } = useLang();
  const tr = (es, en) => (lang === 'es' ? es : en);

  return (
    <section style={{
      minHeight: '100vh',
      background: '#172554',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <div style={{ fontSize: 'clamp(6rem, 20vw, 12rem)', fontWeight: 800, color: '#71B136', lineHeight: 1, fontFamily: 'var(--font-jakarta, sans-serif)' }}>
        404
      </div>
      <h1 style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 700, color: '#ffffff', margin: '1rem 0 0.5rem', fontFamily: 'var(--font-jakarta, sans-serif)' }}>
        {tr('Página no encontrada', 'Page not found')}
      </h1>
      <p style={{ color: '#93c5fd', fontSize: '1rem', maxWidth: '400px', margin: '0 0 2rem' }}>
        {tr('La página que buscás no existe o fue movida.', 'The page you are looking for does not exist or has been moved.')}
      </p>
      <Link href="/" style={{
        display: 'inline-block',
        background: '#71B136',
        color: '#ffffff',
        fontWeight: 600,
        padding: '0.75rem 2rem',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        fontSize: '0.95rem',
        fontFamily: 'var(--font-jakarta, sans-serif)',
        transition: 'opacity 0.2s',
      }}>
        {tr('Volver al inicio', 'Back to home')}
      </Link>
    </section>
  );
}
