import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t } = useLang();
  const nav = t.nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (path) =>
    pathname === path || pathname.startsWith(path + '/');

  const navClass = scrolled ? 'scrolled' : '';

  return (
    <>
      <nav id="navbar" className={navClass}>
        <div className="nav-inner">
          <Link className="nav-logo" to="/">
            <img
              src="/assets/connexaAzulP.png"
              alt="Connexa Services"
              width={160}
              height={44}
            />
          </Link>

          <ul className="nav-links">
            <li>
              <Link
                to="/servicios"
                className={isActive('/servicios') ? 'active' : ''}
              >
                {nav.services}
              </Link>
            </li>
            <li>
              <Link
                to="/productos"
                className={isActive('/productos') ? 'active' : ''}
              >
                {nav.products}
              </Link>
            </li>
            <li>
              <Link to="/#partnerships">{nav.partnerships}</Link>
            </li>
            <li>
              <Link
                to="/nosotros"
                className={isActive('/nosotros') ? 'active' : ''}
              >
                {nav.about}
              </Link>
            </li>
          </ul>

          <div className="nav-cta">
            <Link className="btn-primary" to="/servicios#contacto">
              {nav.cta}
            </Link>
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
          to="/servicios"
          className={isActive('/servicios') ? 'active' : ''}
        >
          {nav.services}
        </Link>
        <Link
          to="/productos"
          className={isActive('/productos') ? 'active' : ''}
        >
          {nav.products}
        </Link>
        <Link to="/#partnerships">{nav.partnerships}</Link>
        <Link
          to="/nosotros"
          className={isActive('/nosotros') ? 'active' : ''}
        >
          {nav.about}
        </Link>
        <Link className="btn-primary" to="/servicios#contacto">
          {nav.cta}
        </Link>
        <div style={{ padding: '16px 0' }}>
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
}
