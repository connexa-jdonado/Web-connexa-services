'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLang } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t } = useLang();
  const nav = t.nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleHashLink = (hash) => {
    if (pathname !== '/') {
      router.push('/' + hash);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const isActive = (path) =>
    pathname === path || pathname.startsWith(path + '/');

  const navClass = scrolled ? 'scrolled' : '';

  return (
    <>
      <nav id="navbar" className={navClass}>
        <div className="nav-inner">
          <Link className="nav-logo" href="/">
            <Image
              src="/assets/connexaAzulP.png"
              alt="Connexa Services"
              width={160}
              height={44}
              priority
            />
          </Link>

          <ul className="nav-links">
            <li>
              <Link
                href="/servicios"
                className={isActive('/servicios') ? 'active' : ''}
              >
                {nav.services}
              </Link>
            </li>
            <li>
              <Link
                href="/productos"
                className={isActive('/productos') ? 'active' : ''}
              >
                {nav.products}
              </Link>
            </li>
            <li>
              <a
                href="/#partnerships"
                onClick={(e) => { e.preventDefault(); handleHashLink('#partnerships'); }}
              >
                {nav.partnerships}
              </a>
            </li>
            <li>
              <a
                href="/#nosotros"
                onClick={(e) => { e.preventDefault(); handleHashLink('#nosotros'); }}
              >
                {nav.about}
              </a>
            </li>
          </ul>

          <div className="nav-cta">
            <a
              className="btn-primary"
              href="/#cta-section"
              onClick={(e) => { e.preventDefault(); handleHashLink('#cta-section'); }}
            >
              {nav.cta}
            </a>
          </div>

          <LanguageSwitcher />

          <button
            className={`nav-hamburger${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menú"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <Link
          href="/servicios"
          className={isActive('/servicios') ? 'active' : ''}
        >
          {nav.services}
        </Link>
        <Link
          href="/productos"
          className={isActive('/productos') ? 'active' : ''}
        >
          {nav.products}
        </Link>
        <a
          href="/#partnerships"
          onClick={(e) => { e.preventDefault(); handleHashLink('#partnerships'); }}
        >
          {nav.partnerships}
        </a>
        <a
          href="/#nosotros"
          onClick={(e) => { e.preventDefault(); handleHashLink('#nosotros'); }}
        >
          {nav.about}
        </a>
        <a
          className="btn-primary"
          href="/#cta-section"
          onClick={(e) => { e.preventDefault(); handleHashLink('#cta-section'); }}
        >
          {nav.cta}
        </a>
        <div style={{ padding: '16px 0' }}>
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
}
