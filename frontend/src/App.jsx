import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function ScrollToHash() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const scroll = () => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    // Pequeño delay para asegurar que el contenido de la ruta ya está montado.
    const id = setTimeout(scroll, 60);
    return () => clearTimeout(id);
  }, [hash, pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <ScrollToHash />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
