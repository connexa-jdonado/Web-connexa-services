import { useEffect } from 'react';
import { Head } from 'vite-react-ssg';
import { Image, Link } from '@/lib/next-compat';
import { useLang } from '@/context/LanguageContext';

function animateCounter(el, target, suffix, duration) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function NosotrosClient() {
  const { lang } = useLang();
  const tr = (es, en) => (lang === 'en' ? en : es);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const nums = e.target.querySelectorAll('.nosotros-stat-num');
          const cfg = [{ v: 13, s: '+' }, { v: 35, s: '+' }];
          nums.forEach((el, i) => { if (cfg[i]) { el.textContent = '0'; setTimeout(() => animateCounter(el, cfg[i].v, cfg[i].s, 1600), i * 150); } });
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    const el = document.getElementById('nosotros-stats');
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>{tr('Nosotros | Connexa Services', 'About Us | Connexa Services')}</title>
        <meta name="description" content={tr('Consultora especializada en Field Service Management. Más de 13 años de experiencia y 35+ implementaciones con Oracle Field Service y Zinier.', 'Consultancy specialized in Field Service Management. Over 13 years of experience and 35+ implementations with Oracle Field Service and Zinier.')} />
        <meta name="keywords" content="Connexa Services, Field Service Management, Oracle Field Service, Zinier, consultora FSM" />
      </Head>
      {/* NOSOTROS */}
      <section id="nosotros" style={{ paddingTop: '160px' }}>
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">{tr('Inicio', 'Home')}</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-cur">{tr('Nosotros', 'About Us')}</span>
          </nav>
          <div className="ec-header">
            <div className="ec-eyebrow fade-up">{tr('NOSOTROS', 'ABOUT US')}</div>
            <h2 className="ec-title fade-up d1">{tr('Consultora especializada en Field Service Management', 'Consultancy specialized in Field Service Management')}</h2>
            <p className="ec-subtitle fade-up d2" style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.55)' }}>
              {tr('Más de una década acompañando a empresas de utilities, telecomunicaciones e industria a transformar su operación de campo con Oracle Field Service y Zinier.', 'Over a decade helping utilities, telecom and industrial companies transform their field operations with Oracle Field Service and Zinier.')}
            </p>
          </div>
          <div className="nosotros-layout">
            <div className="nosotros-stats" id="nosotros-stats">
              <div className="nosotros-stat fade-up d1">
                <div className="nosotros-stat-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div>
                <div className="nosotros-stat-num">13+</div>
                <div className="nosotros-stat-label">{tr('Años de experiencia', 'Years of experience')}</div>
              </div>
              <div className="nosotros-stat fade-up d2">
                <div className="nosotros-stat-icon"><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg></div>
                <div className="nosotros-stat-num">35+</div>
                <div className="nosotros-stat-label">{tr('Implementaciones de FSM', 'FSM implementations')}</div>
              </div>
              <div className="nosotros-stat fade-up d3">
                <div className="nosotros-stat-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6" /><path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5" /></svg></div>
                <div className="nosotros-stat-cert">
                  <Image src="/assets/OFSC-hq.png" alt="Oracle Field Service" width={36} height={36} sizes="36px" style={{ borderRadius: '8px' }} />
                  <Image src="/assets/zinier-hq.webp" alt="Zinier" width={36} height={36} sizes="36px" style={{ borderRadius: '8px', background: '#fff' }} />
                </div>
                <div className="nosotros-stat-label">{tr('Certificados en Oracle Field Service y Zinier', 'Certified in Oracle Field Service and Zinier')}</div>
              </div>
              <div className="nosotros-stat fade-up d4">
                <div className="nosotros-stat-icon"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
                <div className="nosotros-stat-num">100%</div>
                <div className="nosotros-stat-label">{tr('Equipo especializado en Field Service Management', 'Team specialized in Field Service Management')}</div>
              </div>
            </div>
            <div className="nosotros-orbit fade-up d3">
              <div className="nosotros-orbit-ring nosotros-orbit-ring1">
                <div className="nosotros-orbit-anchor">
                  <div className="nosotros-orbit-badge nosotros-orbit-badge1">
                    <Image src="/assets/OFSC-hq.png" alt="Oracle Field Service" width={40} height={40} sizes="40px" style={{ borderRadius: '50%', width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
              <div className="nosotros-orbit-ring nosotros-orbit-ring2">
                <div className="nosotros-orbit-anchor">
                  <div className="nosotros-orbit-badge nosotros-orbit-badge2">
                    <Image src="/assets/zinier-hq.webp" alt="Zinier" width={40} height={40} sizes="40px" style={{ borderRadius: '50%', width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
              <div className="nosotros-orbit-core">
                <span className="nosotros-orbit-num">+13</span>
                <span className="nosotros-orbit-sub">{tr('años en FSM', 'years in FSM')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
