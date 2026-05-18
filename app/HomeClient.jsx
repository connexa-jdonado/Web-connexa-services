'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLang } from '@/context/LanguageContext';

const ParticlesCanvas = dynamic(
  () => import('@/components/ParticlesCanvas'),
  { ssr: false, loading: () => <canvas id="hero-canvas" /> }
);

function useFadeUp() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

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


const LOGO_DIMS = {
  claro:      { w: 1600, h: 601 },
  telefonica: { w: 478,  h: 124 },
  vodafone:   { w: 495,  h: 143 },
  tim:        { w: 458,  h: 135 },
  prosegur:   { w: 483,  h: 109 },
  simpress:   { w: 488,  h: 126 },
  onnet:      { w: 571,  h: 40  },
};

export default function HomeClient() {
  const { lang } = useLang();
  const router = useRouter();
  const heroRef = useRef(null);
  const heroInnerRef = useRef(null);
  const heroAuroraRef = useRef(null);

  useFadeUp();

  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth < 1400);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const nums = e.target.querySelectorAll('.metric-num');
          const cfg = [{ v: 50, s: '+' }, { v: 12, s: '+' }, { v: 10, s: '+' }];
          nums.forEach((el, i) => { if (cfg[i]) { el.innerHTML = '0'; setTimeout(() => animateCounter(el, cfg[i].v, cfg[i].s, 1800), i * 120); } });
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    const el = document.getElementById('hero-metrics-row');
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          document.getElementById('timeline-line')?.classList.add('visible');
          document.querySelectorAll('.timeline-phase').forEach((p) => p.classList.add('visible'));
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    const el = document.getElementById('timeline-phases');
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = document.getElementById('ctaFlotante');
    const onScroll = () => el?.classList.toggle('visible', window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const tr = (es, en) => (lang === 'en' ? en : es);

  return (
    <>
      {/* HERO */}
      <section id="hero" ref={heroRef}>
        <div className="hero-aurora" ref={heroAuroraRef}>
          <div className="aurora-blob aurora-blob-1" />
          <div className="aurora-blob aurora-blob-2" />
          <div className="aurora-blob aurora-blob-3" />
        </div>
        <ParticlesCanvas heroRef={heroRef} heroInnerRef={heroInnerRef} heroAuroraRef={heroAuroraRef} />
        <div className="hero-inner" ref={heroInnerRef}>
          <div className="hero-eyebrow" style={{whiteSpace:'nowrap'}}>
            {/* <div className="hero-eyebrow-dot" /> */}
            <span>{tr('Field Service Management', 'Field Service Management')}<span style={{margin:'0 8px'}}>·</span>{tr('Experts certificados', 'Certified Experts')}</span>
          </div>
          <h1 className="hero-headline">
            <span>{tr('Transformamos el Field Service', 'We Transform Field Service')}</span><br />
            <span>{tr('en ', 'into ')}<em>{tr('ventaja competitiva', 'competitive advantage')}</em></span>
          </h1>
          <p className="hero-subheadline" style={{marginBottom:'16px'}}>
            {tr('Somos expertos en Oracle Field Service Cloud y Zinier. Implementación, consultoría y soporte especializado.', 'We are experts in Oracle Field Service Cloud and Zinier. Implementation, consulting and specialized support.')}
          </p>
          <p className="hero-subheadline" style={{marginBottom:'24px'}}>
            {tr('Desarrollamos soluciones propias con Inteligencia Artificial para optimizar cada operación de campo.', 'We develop proprietary solutions with Artificial Intelligence to optimize every field operation.')}
          </p>
          <div style={{display:'flex', gap:'12px', flexWrap:'wrap', marginTop:'8px'}}>
            <span style={{display:'inline-flex', alignItems:'center',  background:'rgba(113,177,54,0.12)', border:'1px solid rgba(113,177,54,0.3)', borderRadius:'999px', padding:'5px 14px'}}>
              <svg width="38px" height="35px" viewBox="0 0 28 24" fill="none" style={{display:'inline-block', verticalAlign:'middle'}}>
                <path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/>
                <path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/>
                <path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/>
              </svg>
              <span style={{color:'#71B136', fontSize:'13px', fontWeight:600}}>{tr('Workflow Builder', 'Workflow Builder')}</span>
            </span>
            <span style={{display:'inline-flex', alignItems:'center', background:'rgba(113,177,54,0.12)', border:'1px solid rgba(113,177,54,0.3)', borderRadius:'999px', padding:'5px 14px'}}>
              <svg width="38px" height="35px" viewBox="0 0 28 24" fill="none" style={{display:'inline-block', verticalAlign:'middle'}}>
                <path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/>
                <path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/>
                <path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/>
              </svg>
              <span style={{color:'#71B136', fontSize:'13px', fontWeight:600}}>{tr('FSMTool', 'FSMTool')}</span>
            </span>
          </div>
          <div className="hero-ctas">
            <Link href="/productos" className="btn-primary" style={{ fontSize: 16, padding: '16px 32px' }}>
              {tr('Conocé nuestras soluciones', 'Explore our solutions')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </Link>
          </div>
        </div>
        <div className="hero-trust-bar">
          <span className="trust-label-text">{tr('Partner oficial', 'Official Partner')}</span>
          <div className="trust-sep" />
          <div className="trust-partner">
            <Image src="/assets/OFSC-hq.png" alt="Oracle" width={32} height={32} priority sizes="32px" />
            <div className="trust-partner-text"><span className="trust-partner-name">Oracle</span><span className="trust-partner-caption">Field Service Cloud</span></div>
          </div>
          <div className="trust-sep" />
          <div className="trust-partner">
            <Image src="/assets/zinier-hq.webp" alt="Zinier" width={32} height={32} priority sizes="32px" style={{ background: '#fff', borderRadius: 7 }} />
            <div className="trust-partner-text"><span className="trust-partner-name">Zinier</span><span className="trust-partner-caption">Certified Partner</span></div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section id="hero-metrics-row">
        <div className="metrics-inner">
          <div className="metric-item fade-up"><div className="metric-num">50<span>+</span></div><div className="metric-label">{tr('Proyectos implementados', 'Implemented projects')}</div></div>
          <div className="metric-divider" />
          <div className="metric-item fade-up d1"><div className="metric-num">12<span>+</span></div><div className="metric-label">{tr('Países de operación', 'Countries of operation')}</div></div>
          <div className="metric-divider" />
          <div className="metric-item fade-up d2"><div className="metric-num">10<span>+</span></div><div className="metric-label">{tr('Años de experiencia', 'Years of experience')}</div></div>
        </div>
      </section>

      {/* CLIENTS CAROUSEL */}
      <section id="clients-carousel">
        <div className="clients-eyebrow">{tr('Empresas que confían en Connexa', 'COMPANIES THAT TRUST US')}</div>
        <div className="carousel-container">
          <div className="carousel-track">
            {['claro', 'telefonica', 'vodafone', 'tim', 'prosegur', 'simpress', 'onnet',
              'claro', 'telefonica', 'vodafone', 'tim', 'prosegur', 'simpress', 'onnet'].map((c, i) => (
              <img key={i} className="carousel-logo" src={`/assets/clients/${c}.png`} alt={c} style={c === 'onnet' ? { height: '20px' } : undefined} />
            ))}
          </div>
        </div>
        <div className="clients-separator" />
      </section>

      {/* PARTNERSHIPS */}
      <section id="partnerships">
        <div className="container">
          <div className="partnerships-header">
            <span className="section-label fade-up">{tr('Nuestros Partners', 'PARTNERSHIPS')}</span>
            <h2 className="section-title fade-up d1">
              {tr('Respaldados por los líderes', 'Backed by global Field Service leaders')}
              {lang === 'es' && <><br />globales del Field Service</>}
            </h2>
            <p className="section-subtitle fade-up d2" style={{ margin: '0 auto' }}>{tr('Relaciones de partnership oficial certificado con las dos plataformas líderes del mercado global de Field Service Management.', 'Official certified partnership relationships with the two leading platforms in the global Field Service Management market.')}</p>
          </div>
          <div className="partnerships-grid">
            <div className="partnership-card fade-up d1">
              <div className="partner-logo-area">
                <div className="partner-logo-img"><Image src="/assets/OFSC-hq.png" alt="Oracle" width={44} height={44} sizes="44px" /></div>
                <div className="partner-verified"><div className="partner-verified-icon" /><span className="partner-verified-text">{tr('Partner Certificado', 'Certified Partner')}</span></div>
              </div>
              <div className="partner-name-large">Oracle Field Service Cloud</div>
              <p className="partner-desc">{tr('Partner oficial de Oracle para la implementación y soporte de Oracle Field Service Cloud. Lideramos proyectos de transformación digital para empresas de utilities, telecomunicaciones e industria de servicios.', 'Gold Partner certified by Oracle for Field Service Cloud implementations. Direct access to technical support and the latest platform updates.')}</p>
              <div className="partner-stats">
                <div className="partner-stat-item"><div className="partner-stat-val">30+</div><div className="partner-stat-lbl">{tr('Impl. OFS', 'OFS Impl.')}</div></div>
                <div className="partner-stat-item"><div className="partner-stat-val">99%</div><div className="partner-stat-lbl">{tr('Satisfacción', 'Satisfaction')}</div></div>
                <div className="partner-stat-item"><div className="partner-stat-val">8+</div><div className="partner-stat-lbl">{tr('Años de partnership', 'Years of partnership')}</div></div>
              </div>
            </div>
            <div className="partnership-card fade-up d2">
              <div className="partner-logo-area">
                <div className="partner-logo-img"><Image src="/assets/zinier-hq.webp" alt="Zinier" width={44} height={44} sizes="44px" style={{ background: '#fff', borderRadius: 10 }} /></div>
                <div className="partner-verified"><div className="partner-verified-icon" /><span className="partner-verified-text">{tr('Partner Certificado', 'Certified Partner')}</span></div>
              </div>
              <div className="partner-name-large">Zinier FSM Platform</div>
              <span style={{ fontSize: '12px', color: '#71B136', background: 'rgba(113,177,54,0.1)', borderRadius: '20px', padding: '4px 10px', display: 'inline-block', marginTop: '8px' }}>{tr('+8 implementaciones', '+8 implementations')}</span>
              <p className="partner-desc">{tr('Partner certificado de Zinier, la plataforma de inteligencia artificial para Field Service Management de próxima generación. Implementamos flujos de trabajo inteligentes y automatizados.', 'Authorized reseller and official implementation partner of Zinier. Full access to roadmap and dedicated technical support.')}</p>
              <div className="partner-stats">
                <div className="partner-stat-item"><div className="partner-stat-val">8+</div><div className="partner-stat-lbl">{tr('Impl. Zinier', 'Zinier Impl.')}</div></div>
                <div className="partner-stat-item"><div className="partner-stat-val">88%</div><div className="partner-stat-lbl">{tr('Efic. promedio', 'Avg. efficiency')}</div></div>
                <div className="partner-stat-item"><div className="partner-stat-val">4+</div><div className="partner-stat-lbl">{tr('Años de partnership', 'Years of partnership')}</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <div className="services-header">
            <span className="section-label fade-up">{tr('Capacidades', 'SERVICES')}</span>
            <h2 className="section-title fade-up d1">{tr('Todo lo que necesitás', 'Everything you need')}<br />{tr('para tu Field Service', 'for your Field Service')}</h2>
            <p className="section-subtitle fade-up d2" style={{ margin: '0 auto' }}>{tr('Desde la implementación inicial hasta el soporte continuo, cubrimos todo el ciclo de vida de tu operación de campo.', 'From initial implementation to ongoing support, we cover the entire lifecycle of your field operation.')}</p>
          </div>
          <div className="services-grid">
            {[
              { d: 'd1', icon: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" /></>, title: tr('Implementación OFS', 'OFS Implementation'), desc: tr('Diseño, configuración y puesta en marcha de Oracle Field Service Cloud. Desde el análisis de procesos hasta el go-live y capacitación de equipos.', 'Design, configuration and deployment of Oracle Field Service Cloud. From process analysis to go-live and team training.') },
              { d: 'd2', icon: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>, title: tr('Implementación Zinier', 'Zinier Implementation'), desc: tr('Configuración de la plataforma Zinier adaptada a tus flujos de trabajo, integraciones con sistemas existentes y deployment en producción.', 'Configuration of the Zinier platform tailored to your workflows, integration with existing systems and production deployment.') },
              { d: 'd3', icon: <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />, title: tr('Consultoría FSM', 'FSM Consulting'), desc: tr('Análisis de madurez operacional, diseño de procesos y estrategia de transformación digital para tu área de Field Service Management.', 'Operational maturity analysis, process design and digital transformation strategy for your Field Service Management area.') },
              { d: 'd1', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />, title: tr('Soporte Post Go-Live', 'Post Go-Live Support'), desc: tr('Servicio de soporte continuo con SLA garantizado, gestión de incidentes, mejoras evolutivas y acompañamiento técnico de primer nivel.', 'Continuous support service with guaranteed SLA, incident management, evolutionary improvements and first-level technical assistance.') },
              { d: 'd2', icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>, title: tr('Desarrollo a Medida', 'Custom Development'), desc: tr('Desarrollo de plugins, extensiones y soluciones personalizadas sobre las plataformas OFS y Zinier para adaptar la herramienta a tu negocio.', 'Development of plugins, extensions and custom solutions on OFS and Zinier platforms to adapt the tool to your business.') },
              { d: 'd3', icon: <path d="M18 20V10M12 20V4M6 20v-6" />, title: tr('Integraciones', 'Integrations'), desc: tr('Conectamos OFS y Zinier con tus sistemas ERP, CRM, GIS o de facturación mediante APIs, middleware y conectores especializados.', 'We connect OFS and Zinier with your ERP, CRM, GIS or billing systems through APIs, middleware and specialized connectors.') },
            ].map((s, i) => (
              <div key={i} className={`service-card fade-up ${s.d}`}>
                <div className="service-icon"><svg viewBox="0 0 24 24">{s.icon}</svg></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link className="service-link" href="/servicios">
                  {tr('Ver más', 'Learn more')} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ CONNEXA */}
      <section id="por-que-connexa">
        <div className="container">
          <div className="pqc-header">
            <div className="pqc-eyebrow fade-up">{tr('Por qué elegirnos', 'WHY CHOOSE US')}</div>
            <h2 className="pqc-title fade-up d1">{tr('No somos una consultora genérica', 'We are not a generic consultancy')}</h2>
            <p className="pqc-sub fade-up d2">{tr('Nos especializamos exclusivamente en Field Service Management. Eso marca la diferencia.', 'We specialize exclusively in Field Service Management. That makes the difference.')}</p>
          </div>
          <div className="pqc-grid">
            <div className="pqc-card fade-up d1">
              <div className="pqc-icon"><svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="12" y1="2" x2="12" y2="22" /></svg></div>
              <div className="pqc-card-title">{tr('Soluciones desarrolladas por nosotros', 'Solutions developed by us')}</div>
              <p className="pqc-card-desc">{tr('FSMTool y Workflow Builder son aplicaciones propias que desarrollamos para potenciar Oracle Field Service Cloud. Ninguna otra consultora las tiene.', 'FSMTool and Workflow Builder are proprietary applications we developed to enhance Oracle Field Service Cloud. No other consultancy has them.')}</p>
              <span className="pqc-badge">FSMTool · Workflow Builder</span>
            </div>
            <div className="pqc-card fade-up d2">
              <div className="pqc-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6" /><path d="M8 14l-4 8h16l-4-8" /><line x1="12" y1="14" x2="12" y2="22" /></svg></div>
              <div className="pqc-card-title">{tr('10+ años exclusivos en Field Service', '10+ years exclusively in Field Service')}</div>
              <p className="pqc-card-desc">{tr('No hacemos de todo. Nos dedicamos exclusivamente al Field Service Management. Esa especialización se traduce en resultados más rápidos y proyectos más exitosos.', "We don't do everything. We dedicate ourselves exclusively to Field Service Management. That specialization translates into faster results and more successful projects.")}</p>
              <span className="pqc-badge">{tr('Foco 100% FSM', '100% FSM Focus')}</span>
            </div>
            <div className="pqc-card fade-up d3">
              <div className="pqc-icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg></div>
              <div className="pqc-card-title" data-es="Equipo Certificado en productos de Field Service" data-en="Team Certified in Field Service Products">{tr('Equipo Certificado en productos de Field Service', 'Team Certified in Field Service Products')}</div>
              <p className="pqc-card-desc">{tr('Nuestros consultores están certificados en Oracle Field Service Cloud y Zinier. Implementamos con el conocimiento técnico más profundo del mercado.', 'Our consultants are certified in Oracle Field Service Cloud and Zinier. We implement with the deepest technical knowledge in the market.')}</p>
              <span className="pqc-badge">Oracle Certified · Zinier Partner</span>
            </div>
          </div>
          <div className="pqc-sep" />
          <div className="pqc-cta fade-up">
            <p className="pqc-cta-text">{tr('¿Querés conocer más sobre nuestra metodología y equipo?', 'Want to learn more about our methodology and team?')}</p>
            <button className="btn-primary" onClick={() => scrollTo('metodologia')} style={{ fontSize: 16, padding: '14px 32px' }}>{tr('Conocé nuestro equipo →', 'Meet our team →')}</button>
          </div>
        </div>
      </section>

      {/* EQUIPO Y CASO DE ÉXITO */}
      <section id="nosotros">
        <div className="container">
          {/* SECCIÓN LIDERAZGO Y EXPERIENCIA — temporalmente comentada
          <div className="ec-header">
            <div className="ec-eyebrow fade-up">{tr('LIDERAZGO Y EXPERIENCIA', 'LEADERSHIP & EXPERIENCE')}</div>
            <h2 className="ec-title fade-up d1">{tr('El equipo detrás de cada implementación', 'The team behind every implementation')}</h2>
            <p className="ec-subtitle fade-up d2">{tr('Más de [X] años de experiencia combinada en Field Service Management a nivel internacional.', 'Over [X] years of combined experience in Field Service Management at an international level.')}</p>
            <div className="ec-header-highlight fade-up d3">
              <p>{tr('Nuestros CEOs no solo lideran la empresa — están en los detalles de cada proyecto.', "Our CEOs don't just lead the company — they are involved in every project detail.")}</p>
            </div>
          </div>
          <div className="ec-ceos-grid">
            {[{ role: 'Co-founder & CEO' }, { role: 'Co-founder & CTO' }].map((c, i) => (
              <div key={i} className={`ec-ceo-card fade-up d${i + 1}`}>
                <div className="ec-ceo-photo-placeholder">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 1 0-16 0" /></svg>
                  <span className="ec-ceo-photo-label">{tr(`[ Foto CEO ${i + 1} ]`, `[ CEO ${i + 1} Photo ]`)}</span>
                </div>
                <div className="ec-ceo-name">{tr('[ Nombre del CEO ]', '[ CEO Name ]')}</div>
                <div className="ec-ceo-role">{c.role}</div>
                <p className="ec-ceo-desc">{tr('[ Breve descripción profesional. ]', '[ Brief professional description. ]')}</p>
                <div className="ec-ceo-tags">
                  <span className="ec-ceo-tag">Oracle Certified</span>
                  <span className="ec-ceo-tag">Zinier Partner</span>
                  <span className="ec-ceo-tag ec-tag-placeholder">{tr('[ Industria ]', '[ Industry ]')}</span>
                  <span className="ec-ceo-tag ec-tag-placeholder">{tr('[ País ]', '[ Country ]')}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="ec-sep" />
          */}
          {/* SECCIÓN CASO DE ÉXITO INTERNACIONAL — temporalmente comentada
          <div id="casos" />
          <div className="ec-case-eyebrow fade-up">{tr('CASO DE ÉXITO INTERNACIONAL', 'INTERNATIONAL SUCCESS CASE')}</div>
          <div className="ec-case-layout">
            <div className="ec-case-left fade-up d1">
              <div className="ec-case-location-badge">
                <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>{tr('[ País o región ]', '[ Country or region ]')}</span>
              </div>
              <div className="ec-case-industry">{tr('[ INDUSTRIA ]', '[ INDUSTRY ]')}</div>
              <h3 className="ec-case-title">{tr('[ Título del proyecto ]', '[ Project title ]')}</h3>
              <div className="ec-case-lead-badge">
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                <span>{tr('Proyecto liderado directamente por los co-fundadores de Connexa Services', 'Project directly led by Connexa Services co-founders')}</span>
              </div>
              <p className="ec-case-desc">{tr('[ Descripción del desafío inicial del cliente. ]', "[ Description of the client's initial challenge. ]")}</p>
              <div className="ec-case-impl-label">{tr('SOLUCIÓN IMPLEMENTADA', 'IMPLEMENTED SOLUTION')}</div>
              <p className="ec-case-desc">{tr('[ Descripción de la solución implementada. ]', '[ Description of the implemented solution. ]')}</p>
              <p className="ec-case-closing">{tr('Este proyecto, como todos los de Connexa, fue liderado directamente por nuestros co-fundadores.', "This project, like all Connexa projects, was directly led by our co-founders.")}</p>
              <div className="ec-metrics">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="ec-metric">
                    <div className="ec-metric-number">{tr('[ N ]', '[ N ]')}</div>
                    <div className="ec-metric-desc">{tr(`[ Resultado ${n} ]`, `[ Result ${n} ]`)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ec-case-right fade-up d2">
              <div className="ec-img-placeholder">
                <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                <span className="ec-img-label">{tr('[ Imagen del proyecto ]', '[ Project image ]')}</span>
              </div>
              <div className="ec-img-placeholder">
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                <span className="ec-img-label">{tr('[ Foto del equipo ]', '[ Team photo ]')}</span>
              </div>
            </div>
          </div>
          */}
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section id="metodologia">
        <div style={{width:'100%', background:'#F3F4F6', padding: isNarrow ? '60px 24px' : '100px 40px', position:'relative', overflow:'hidden'}}>
          <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0,pointerEvents:'none',zIndex:0}}>
            <defs>
              <pattern id="dots-met" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#71B136"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-met)"/>
          </svg>

          <div className="metodologia-header" style={{position:'relative', zIndex:2}}>
            <div className="metodologia-eyebrow fade-up" style={{color:'#71B136'}}>{tr('NUESTRA METODOLOGÍA', 'OUR METHODOLOGY')}</div>
            <h2 className="metodologia-title fade-up d1" style={{color:'#172554'}}>
              {tr('Un assessment que convierte dolores en resultados', 'An assessment that turns pain points into results')}
            </h2>
            <p className="metodologia-subtitle fade-up d2" style={{color:'#6B7280'}}>
              {tr('Analizamos tu operación actual para identificar brechas y proponer iniciativas concretas y priorizadas.', 'We analyze your current operation to identify gaps and propose specific, prioritized initiatives.')}
            </p>
          </div>

          <div style={{display:'flex', flexDirection: isNarrow ? 'column' : 'row', gap: isNarrow ? '32px' : '48px', maxWidth:'1600px', margin:'60px auto 0', alignItems:'flex-start', position:'relative', zIndex:2}}>

            {/* Columna izquierda 30% — 3 cards */}
            <div style={{width: isNarrow ? '100%' : '30%', display:'flex', flexDirection: isNarrow ? 'row' : 'column', gap:'16px', flexWrap: isNarrow ? 'wrap' : 'nowrap'}}>

              <div style={{background:'white', border:'1px solid #E5E7EB', borderRadius:'16px', padding:'28px 32px', position:'relative', overflow:'hidden', width: isNarrow ? 'calc(33% - 8px)' : undefined, minWidth: isNarrow ? '280px' : undefined}}>
                <span style={{position:'absolute', right:'-10px', top:'-20px', fontSize:'120px', fontWeight:900, lineHeight:1, userSelect:'none', pointerEvents:'none', color:'rgba(23,37,84,0.04)', WebkitTextStroke:'1.5px rgba(113,177,54,0.25)', letterSpacing:'-4px'}}>01</span>
                <div style={{background:'rgba(113,177,54,0.12)', borderRadius:'10px', padding:'10px', display:'inline-flex', marginBottom:'16px'}}>
                  <svg viewBox="0 0 24 24" style={{width:'24px', height:'24px', stroke:'#71B136', fill:'none', strokeWidth:2, strokeLinecap:'round', strokeLinejoin:'round'}}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                </div>
                <h3 style={{color:'#172554', fontSize:'18px', fontWeight:700, margin:'0 0 16px'}}>{tr('Dolores & Hallazgos', 'Pain Points & Findings')}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    tr('Relevamiento de procesos operativos actuales', 'Survey of current operational processes'),
                    tr('Entrevistas con usuarios clave y equipos de campo', 'Interviews with key users and field teams'),
                    tr('Análisis del nivel de aprovechamiento de la plataforma', 'Analysis of platform utilization level'),
                    tr('Identificación de brechas y limitaciones técnicas', 'Identification of gaps and technical limitations'),
                    tr('Documentación del estado actual de la solución', 'Documentation of the current solution state'),
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '14px', color: '#6B7280', lineHeight: '1.55', fontFamily: 'var(--font-body)' }}>
                      <span style={{ color: '#71B136', flexShrink: 0, marginTop: '1px' }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{background:'white', border:'1px solid #E5E7EB', borderRadius:'16px', padding:'28px 32px', position:'relative', overflow:'hidden', width: isNarrow ? 'calc(33% - 8px)' : undefined, minWidth: isNarrow ? '280px' : undefined}}>
                <span style={{position:'absolute', right:'-10px', top:'-20px', fontSize:'120px', fontWeight:900, lineHeight:1, userSelect:'none', pointerEvents:'none', color:'rgba(23,37,84,0.04)', WebkitTextStroke:'1.5px rgba(113,177,54,0.25)', letterSpacing:'-4px'}}>02</span>
                <div style={{background:'rgba(113,177,54,0.12)', borderRadius:'10px', padding:'10px', display:'inline-flex', marginBottom:'16px'}}>
                  <svg viewBox="0 0 24 24" style={{width:'24px', height:'24px', stroke:'#71B136', fill:'none', strokeWidth:2, strokeLinecap:'round', strokeLinejoin:'round'}}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                </div>
                <h3 style={{color:'#172554', fontSize:'18px', fontWeight:700, margin:'0 0 16px'}}>{tr('Oportunidades de Mejora', 'Improvement Opportunities')}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    tr('Detección de funcionalidades subutilizadas', 'Detection of underutilized features'),
                    tr('Análisis de gaps entre operación actual y potencial de la plataforma', 'Gap analysis between current operation and platform potential'),
                    tr('Evaluación de procesos susceptibles de automatización', 'Evaluation of processes suitable for automation'),
                    tr('Identificación de mejoras de eficiencia operativa', 'Identification of operational efficiency improvements'),
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '14px', color: '#6B7280', lineHeight: '1.55', fontFamily: 'var(--font-body)' }}>
                      <span style={{ color: '#71B136', flexShrink: 0, marginTop: '1px' }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{background:'white', border:'1px solid #E5E7EB', borderRadius:'16px', padding:'28px 32px', position:'relative', overflow:'hidden', width: isNarrow ? 'calc(33% - 8px)' : undefined, minWidth: isNarrow ? '280px' : undefined}}>
                <span style={{position:'absolute', right:'-10px', top:'-20px', fontSize:'120px', fontWeight:900, lineHeight:1, userSelect:'none', pointerEvents:'none', color:'rgba(23,37,84,0.04)', WebkitTextStroke:'1.5px rgba(113,177,54,0.25)', letterSpacing:'-4px'}}>03</span>
                <div style={{background:'rgba(113,177,54,0.12)', borderRadius:'10px', padding:'10px', display:'inline-flex', marginBottom:'16px'}}>
                  <svg viewBox="0 0 24 24" style={{width:'24px', height:'24px', stroke:'#71B136', fill:'none', strokeWidth:2, strokeLinecap:'round', strokeLinejoin:'round'}}><path d="M9.66 17.33c-1.66 1.66-4 2.67-4 2.67s1-2.34 2.67-4c.94-.94 2.34-.94 3.28 0 .94.94.94 2.34.05 3.33z" /><path d="m14 10-4 4" /><path d="M19 5c0 2.5-2 7-7 10l-3-3c3-5 7.5-7 10-7z" /></svg>
                </div>
                <h3 style={{color:'#172554', fontSize:'18px', fontWeight:700, margin:'0 0 16px'}}>{tr('Iniciativas', 'Initiatives')}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    tr('Propuesta de iniciativas concretas y accionables', 'Proposal of concrete and actionable initiatives'),
                    tr('Ponderación por impacto en el negocio y complejidad', 'Weighting by business impact and complexity'),
                    tr('Mapa visual Impacto × Complejidad para priorizar', 'Visual Impact × Complexity map for prioritization'),
                    tr('Roadmap de implementación por fases', 'Phased implementation roadmap'),
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '14px', color: '#6B7280', lineHeight: '1.55', fontFamily: 'var(--font-body)' }}>
                      <span style={{ color: '#71B136', flexShrink: 0, marginTop: '1px' }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Columna derecha 70% — scatter plot */}
            <div style={{width: isNarrow ? '100%' : '70%', background:'rgba(255,255,255,0.97)', borderRadius:'20px', padding:'8px', boxShadow:'0 40px 100px rgba(0,0,0,0.4)', position:'sticky', top:'100px'}}>

          {/* SCATTER PLOT MAPA DE PRIORIZACIÓN */}
          <div className="fade-up d2" style={{ background: '#fff', borderRadius: '16px', padding: '32px 32px 24px', margin: '0', boxShadow: 'none', border: 'none' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#71B136', fontFamily: 'var(--font-body)' }}>
                {tr('Mapa de Priorización de Iniciativas', 'Initiative Prioritization Map')}
              </span>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'24px'}}>
            <div style={{ flex: 1, minWidth: 0 }}>
            <svg viewBox="0 0 1000 600" width="100%" style={{ display: 'block', overflow: 'visible' }}>
              <defs>
                <filter id="tt-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.18)" />
                </filter>
              </defs>
              <style>{`
                .sb { cursor: pointer; }
                .sb circle { transition: transform 0.25s ease, opacity 0.25s ease; transform-box: fill-box; transform-origin: center; }
                .sb:hover circle { transform: scale(1.08); }
                .tt { opacity: 0; pointer-events: none; transition: opacity 0.15s; }
                .sb:hover .tt { opacity: 1; }
                .ax { font-family: var(--font-body); fill: #172554; font-weight: 700; letter-spacing: 0.1em; }
                .ax-tick { font-family: var(--font-body); fill: #9CA3AF; font-size: 10px; }
                .zl { font-family: var(--font-body); font-weight: 700; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; }
                .grid { stroke: #E5E7EB; stroke-width: 0.5; }
              `}</style>

              {/* ── Cuadrantes iguales 410×220 ── */}
              <rect x="60" y="260" width="410" height="220" fill="#F9FAFB" />
              <rect x="470" y="260" width="410" height="220" fill="#F0FDF4" />
              <rect x="470" y="260" width="410" height="220" fill="none" stroke="#71B136" strokeWidth="1.5" strokeDasharray="6,4" />
              <rect x="60" y="40" width="410" height="220" fill="#FEF2F2" />
              <rect x="470" y="40" width="410" height="220" fill="#EFF6FF" />

              {/* ── Grid sutil ── */}
              {[100,160,220,260,320,380,440].map(y => (
                <line key={y} x1="60" y1={y} x2="880" y2={y} className="grid" />
              ))}
              {[120,180,240,310,370,430,490,560,620,680,740,800,860].map(x => (
                <line key={x} x1={x} y1="40" x2={x} y2="480" className="grid" />
              ))}

              {/* ── Divisores centrales ── */}
              <line x1="470" y1="40" x2="470" y2="480" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="5,3" />
              <line x1="60" y1="260" x2="880" y2="260" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="5,3" />

              {/* ── Labels de zona ── */}
              <text x="72" y="62" className="zl" fill="rgba(220,38,38,0.55)">{tr('Descarte', 'Discard')}</text>
              <text x="482" y="62" className="zl" fill="rgba(23,37,84,0.55)">{tr('Proyectos', 'Projects')}</text>
              <text x="72" y="278" className="zl" fill="rgba(107,114,128,0.65)">{tr('Tareas', 'Tasks')}</text>
              <text x="482" y="278" className="zl" fill="rgba(113,177,54,0.9)">{tr('Quick Wins', 'Quick Wins')}</text>

              {/* ── Eje Y (COMPLEJIDAD) ── */}
              <line x1="60" y1="480" x2="60" y2="32" stroke="#172554" strokeWidth="1.5" />
              <polygon points="60,24 55,38 65,38" fill="#172554" />
              <text transform="translate(22,260) rotate(-90)" textAnchor="middle" className="ax" fontSize="10">{tr('COMPLEJIDAD', 'COMPLEXITY')}</text>
              <text x="52" y="48" textAnchor="end" className="ax-tick">{tr('Alta', 'High')}</text>
              <text x="52" y="477" textAnchor="end" className="ax-tick">{tr('Baja', 'Low')}</text>

              {/* ── Eje X (PRIORIDAD) ── */}
              <line x1="60" y1="480" x2="893" y2="480" stroke="#172554" strokeWidth="1.5" />
              <polygon points="900,480 886,475 886,485" fill="#172554" />
              <text x="470" y="518" textAnchor="middle" className="ax" fontSize="10">{tr('PRIORIDAD', 'PRIORITY')}</text>
              <text x="68" y="496" className="ax-tick">{tr('Baja', 'Low')}</text>
              <text x="882" y="496" textAnchor="end" className="ax-tick">{tr('Alta', 'High')}</text>

              {/* ── QUICK WINS — inferior derecho — verde ── */}
              <g className="sb">
                <circle cx="479" cy="414" r="22" fill="#71B136" stroke="#fff" strokeWidth="2" />
                <text x="479" y="419" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">A1</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="405" y="376" width="148" height="28" rx="6" fill="#172554" />
                  <text x="479" y="395" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Segmentación de cuotas', 'Quota segmentation')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="657" cy="396" r="22" fill="#71B136" stroke="#fff" strokeWidth="2" />
                <text x="657" y="401" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">A2</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="583" y="358" width="148" height="28" rx="6" fill="#172554" />
                  <text x="657" y="377" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Optimización de routing', 'Routing optimization')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="531" cy="349" r="22" fill="#71B136" stroke="#fff" strokeWidth="2" />
                <text x="531" y="354" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">B1</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="457" y="311" width="148" height="28" rx="6" fill="#172554" />
                  <text x="531" y="330" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Activar colaboración', 'Activate collaboration')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="759" cy="321" r="22" fill="#71B136" stroke="#fff" strokeWidth="2" />
                <text x="759" y="326" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">E1</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="679" y="283" width="160" height="28" rx="6" fill="#172554" />
                  <text x="759" y="302" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Visibilidad en tiempo real', 'Real-time visibility')}</text>
                </g>
              </g>

              {/* ── PROYECTOS — superior derecho — azul ── */}
              <g className="sb">
                <circle cx="592" cy="115" r="22" fill="#172554" stroke="#fff" strokeWidth="2" />
                <text x="592" y="120" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">D1</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="518" y="77" width="148" height="28" rx="6" fill="#172554" />
                  <text x="592" y="96" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Unificación app móvil', 'Mobile app unification')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="749" cy="77" r="22" fill="#172554" stroke="#fff" strokeWidth="2" />
                <text x="749" y="82" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">D2</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="675" y="48" width="148" height="28" rx="6" fill="#172554" />
                  <text x="749" y="67" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Gestión de inventario', 'Inventory management')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="505" cy="190" r="22" fill="#172554" stroke="#fff" strokeWidth="2" />
                <text x="505" y="195" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">D3</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="431" y="152" width="148" height="28" rx="6" fill="#172554" />
                  <text x="505" y="171" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Integración ERP', 'ERP Integration')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="802" cy="152" r="22" fill="#172554" stroke="#fff" strokeWidth="2" />
                <text x="802" y="157" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">C2</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="728" y="114" width="148" height="28" rx="6" fill="#172554" />
                  <text x="802" y="133" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Analítica avanzada', 'Advanced analytics')}</text>
                </g>
              </g>

              {/* ── TAREAS — inferior izquierdo — gris ── */}
              <g className="sb">
                <circle cx="195" cy="377" r="22" fill="#6B7280" stroke="#fff" strokeWidth="2" />
                <text x="195" y="382" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">B2</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="131" y="339" width="128" height="28" rx="6" fill="#172554" />
                  <text x="195" y="358" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Atributos de skills', 'Skills attributes')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="122" cy="330" r="22" fill="#6B7280" stroke="#fff" strokeWidth="2" />
                <text x="122" y="335" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">A4</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="58" y="292" width="128" height="28" rx="6" fill="#172554" />
                  <text x="122" y="311" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Validación GPS', 'GPS validation')}</text>
                </g>
              </g>

              {/* ── DESCARTE — superior izquierdo — rojo ── */}
              <g className="sb">
                <circle cx="200" cy="134" r="22" fill="#DC2626" stroke="#fff" strokeWidth="2" />
                <text x="200" y="139" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">D8</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="116" y="96" width="168" height="28" rx="6" fill="#172554" />
                  <text x="200" y="115" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Réplica BI en tiempo real', 'Real-time BI replication')}</text>
                </g>
              </g>
            </svg>
            </div>
            {/* Leyenda horizontal 4 columnas */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'16px', padding:'0 8px 8px'}}>
              {[
                { color: '#71B136', title: tr('Quick Wins', 'Quick Wins'), items: [
                  { code: 'A1', name: tr('Segmentar cuotas por zona', 'Segment quotas by zone') },
                  { code: 'A2', name: tr('Gestión de minutos por categoría', 'Manage minutes by category') },
                  { code: 'B1', name: tr('Optimizar planes de routing', 'Optimize routing plans') },
                  { code: 'E1', name: tr('Activar módulo de colaboración', 'Activate collaboration module') },
                ]},
                { color: '#172554', title: tr('Proyectos Estratégicos', 'Strategic Projects'), items: [
                  { code: 'D1', name: tr('Centralizar gestión de inventario', 'Centralize inventory management') },
                  { code: 'D2', name: tr('Validación GPS en campo', 'GPS validation in field') },
                  { code: 'D3', name: tr('Unificar app móvil (OFSC)', 'Unify mobile app (OFSC)') },
                  { code: 'C2', name: tr('Visibilidad en tiempo real', 'Real-time visibility') },
                ]},
                { color: '#6B7280', title: tr('Tareas Menores', 'Minor Tasks'), items: [
                  { code: 'A4', name: tr('Tablero de salud de agenda', 'Agenda health dashboard') },
                  { code: 'B2', name: tr('Reclasificar atributos como skills', 'Reclassify attributes as skills') },
                ]},
                { color: '#EF4444', title: tr('Descarte', 'Discard'), items: [
                  { code: 'D8', name: tr('Réplica de datos BI en tiempo real', 'Real-time BI data replication') },
                ]},
              ].map((group, gi) => (
                <div key={gi}>
                  <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: group.color, fontFamily: 'var(--font-body)', marginBottom: '8px' }}>
                    {group.title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {group.items.map((item, ii) => (
                      <div key={ii} style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: group.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '9px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>{item.code}</span>
                        </div>
                        <span style={{ fontSize: '13px', color: '#374151', fontFamily: 'var(--font-body)', marginLeft: '10px', lineHeight: '1.4', fontWeight: 400 }}>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>

            </div>{/* /columna derecha */}
          </div>{/* /flex 2 columnas */}

          <div style={{ paddingTop: '32px', textAlign: 'center', position:'relative', zIndex:2 }}>
            <p style={{ fontSize: '14px', color: 'rgb(23, 37, 84)', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: '1.6' }}>
              {tr('Cada assessment es único. Los resultados dependen de tu operación, tu plataforma y tus objetivos.', 'Every assessment is unique. Results depend on your operation, your platform, and your goals.')}
            </p>
          </div>
        </div>{/* /wrapper oscuro */}
      </section>

      {/* PRODUCTS PREVIEW */}
      <section id="products">
        <div className="container products-inner">
          <div className="products-header">
            <span className="section-label fade-up" style={{ color: 'var(--accent)' }}>{tr('Innovación propia', 'Proprietary Innovation')}</span>
            <h2 className="section-title fade-up d1" style={{ color: '#fff' }}>{tr('Nuestras soluciones propias', 'Our proprietary solutions')}</h2>
            <p className="section-subtitle fade-up d2" style={{ color: 'rgba(255,255,255,0.6)', margin: '0 auto' }}>{tr('Herramientas desarrolladas internamente con Inteligencia Artificial, diseñadas para que cualquier usuario pueda operar sin conocimiento técnico.', 'Internally developed tools powered by Artificial Intelligence, designed so any user can operate without technical knowledge.')}</p>
          </div>
          <div className="products-grid">
            <div className="product-card fade-up d1" onClick={() => router.push('/productos/workflow-builder')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && router.push('/productos/workflow-builder')}>
              <div>
                <div className="product-badge"><div className="product-badge-dot" /><span>{tr('Solución propia impultada por IA', 'AI powered custom solution')}</span></div>
                <div className="product-name">Workflow Builder</div>
                <p className="product-desc">{tr('Constructor visual de flujos de trabajo para Oracle Field Service Cloud. Permite diseñar, testear y publicar workflows sin código, reduciendo el time-to-market de nuevos procesos. El Agente de IA te ayuda a crear y configurar workflows en lenguaje natural, sin escribir código.', 'Visual workflow builder for Oracle Field Service Cloud. Design, test and publish workflows without code, reducing the time-to-market for new processes. The AI Agent helps you create and configure workflows in natural language, without writing code.')}</p>
                <div className="product-bullets">
                  <div className="product-bullet">{tr('Orquestador de eventos de OFS (Event API) – Gestor de suscripciones', 'OFS Event Orchestrator (Event API) – Subscription Manager')}</div>
                  <div className="product-bullet">{tr('Editor de workflow drag and drop para orquestar procesos', 'Drag and drop workflow editor to orchestrate processes')}</div>
                  <div className="product-bullet">{tr('+40 APIs de OFS disponibles para ejecutar dentro de cada workflow', '+40 OFS APIs available to execute within each workflow')}</div>
                  <div className="product-bullet">{tr('Agente de IA integrado para eficientizar procesos', 'Integrated AI agent to streamline processes')}</div>
                  <div className="product-bullet">{tr('Integración con Slack, Teams, WhatsApp', 'Integration with Slack, Teams, WhatsApp')}</div>
                </div>
                <button className="product-cta">{tr('Conocer más', 'Learn more')} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg></button>
              </div>
              <div className="product-visual">
                <svg viewBox="0 0 80 80"><circle cx="20" cy="20" r="8" /><circle cx="60" cy="20" r="8" /><circle cx="20" cy="60" r="8" /><circle cx="60" cy="60" r="8" /><line x1="28" y1="20" x2="52" y2="20" /><line x1="20" y1="28" x2="20" y2="52" /><line x1="28" y1="60" x2="52" y2="60" /><line x1="60" y1="28" x2="60" y2="52" /><circle cx="40" cy="40" r="6" /></svg>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', marginTop:'16px'}}>
                  <svg width="32" height="27" viewBox="0 0 28 24" fill="none">
                    <path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/>
                    <path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/>
                    <path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/>
                  </svg>
                  <span style={{color:'#71B136', fontSize:'30px', fontWeight:700, letterSpacing:'0.1em'}}>IA</span>
                </div>
              </div>
            </div>
            <div className="product-card fade-up d2" onClick={() => router.push('/productos/fsmtool')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && router.push('/productos/fsmtool')}>
              <div>
                <div className="product-badge"><div className="product-badge-dot" /><span>{tr('Solución propia impultada por IA', 'AI powered custom solution')}</span></div>
                <div className="product-name">FSMTool</div>
                <p className="product-desc">{tr('Suite de herramientas avanzadas de administración para Oracle Field Service Cloud. Operaciones masivas, gestión de inventarios, actividades y recursos. Con IA integrada podés ejecutar operaciones masivas describiendo lo que necesitás en lenguaje natural.', 'Advanced administration suite for Oracle Field Service Cloud. Bulk operations, inventory management, activities and resources. With integrated AI you can execute bulk operations by describing what you need in natural language.')}</p>
                <div className="product-bullets">
                  <div className="product-bullet">{tr('Gestión masiva de actividades y recursos', 'Bulk management of activities and resources')}</div>
                  <div className="product-bullet">{tr('Gestión completa de inventarios', 'Complete inventory management')}</div>
                  <div className="product-bullet">{tr('Descarga y gestión masiva de actividades', 'Download and bulk management of activities')}</div>
                </div>
                <button className="product-cta">{tr('Conocer más', 'Learn more')} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg></button>
              </div>
              <div className="product-visual">
                <svg viewBox="0 0 80 80"><rect x="8" y="20" width="64" height="44" rx="6" /><rect x="14" y="28" width="22" height="14" rx="3" /><rect x="14" y="46" width="22" height="8" rx="2" /><rect x="42" y="28" width="22" height="8" rx="2" /><rect x="42" y="40" width="22" height="14" rx="3" /><circle cx="14" cy="14" r="3" /><circle cx="40" cy="14" r="3" /><circle cx="66" cy="14" r="3" /></svg>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', marginTop:'16px'}}>
                  <svg width="32" height="27" viewBox="0 0 28 24" fill="none">
                    <path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/>
                    <path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/>
                    <path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/>
                  </svg>
                  <span style={{color:'#71B136', fontSize:'30px', fontWeight:700, letterSpacing:'0.1em'}}>IA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="cta-section">
        <div className="container cta-inner">
          <span className="section-label fade-up" style={{ color: 'var(--accent)' }}>{tr('Hablemos', "Let's talk")}</span>
          <h2 className="cta-headline fade-up d1">
            {tr('¿Listo para optimizar tu', 'Ready to optimize your')}<br />
            <em>{tr('operación de campo', 'field operations')}</em>?
          </h2>
          <p className="cta-sub fade-up d2">{tr('Nuestro equipo de expertos está disponible para analizar tu situación actual y proponer la estrategia óptima para tu negocio.', 'Our team of experts is available to analyze your current situation and propose the optimal strategy for your business.')}</p>
          <div className="cta-btns fade-up d3">
            <a href="/servicios#contacto" className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>{tr('Hablar con un experto', 'Talk to an Expert')}</a>
            <button className="btn-ghost" onClick={() => scrollTo('services')} style={{ fontSize: 16, padding: '16px 36px' }}>{tr('Ver servicios', 'View services')}</button>
          </div>
        </div>
      </section>

      {/* CTA FLOTANTE */}
      <a className="cta-flotante" id="ctaFlotante" href="/servicios#contacto">
        <span>{tr('Agendar demo', 'Schedule demo')}</span>
      </a>
    </>
  );
}
