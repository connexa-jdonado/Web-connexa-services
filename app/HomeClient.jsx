'use client';
import { useEffect, useRef } from 'react';
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
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-dot" />
            <span>{tr('Field Service Management · Experts certificados', 'Field Service Management · Certified Experts')}</span>
          </div>
          <h1 className="hero-headline">
            <span>{tr('Transformamos el Field Service', 'We Transform Field Service')}</span><br />
            <span>{tr('en ', 'into ')}<em>{tr('ventaja competitiva', 'competitive advantage')}</em></span>
          </h1>
          <p className="hero-subheadline">
            {tr('Somos expertos en Oracle Field Service Cloud y Zinier.', 'We are experts in Oracle Field Service Cloud and Zinier.')}<br />
            {tr('Implementación, consultoría, soporte y soluciones propias', 'Implementation, consulting, support and proprietary solutions')}<br />
            {tr('para optimizar cada operación de campo.', 'to optimize every field operation.')}
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => scrollTo('services')} style={{ fontSize: 16, padding: '16px 32px' }}>
              {tr('Conocé nuestras soluciones', 'Explore our solutions')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
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
              <Image key={i} className="carousel-logo" src={`/assets/clients/${c}.png`} alt={c} width={LOGO_DIMS[c]?.w ?? 200} height={LOGO_DIMS[c]?.h ?? 60} sizes="160px" />
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
                <div className="partner-stat-item"><div className="partner-stat-val">30+</div><div className="partner-stat-lbl">{tr('Impl. OFSC', 'OFSC Impl.')}</div></div>
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
              <p className="partner-desc">{tr('Partner certificado de Zinier, la plataforma de inteligencia artificial para Field Service Management de próxima generación. Implementamos flujos de trabajo inteligentes y automatizados.', 'Authorized reseller and official implementation partner of Zinier. Full access to roadmap and dedicated technical support.')}</p>
              <div className="partner-stats">
                <div className="partner-stat-item"><div className="partner-stat-val">20+</div><div className="partner-stat-lbl">{tr('Impl. Zinier', 'Zinier Impl.')}</div></div>
                <div className="partner-stat-item"><div className="partner-stat-val">40%</div><div className="partner-stat-lbl">{tr('Efic. promedio', 'Avg. efficiency')}</div></div>
                <div className="partner-stat-item"><div className="partner-stat-val">5+</div><div className="partner-stat-lbl">{tr('Años de partnership', 'Years of partnership')}</div></div>
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
              { d: 'd1', icon: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" /></>, title: tr('Implementación OFSC', 'OFSC Implementation'), desc: tr('Diseño, configuración y puesta en marcha de Oracle Field Service Cloud. Desde el análisis de procesos hasta el go-live y capacitación de equipos.', 'Design, configuration and deployment of Oracle Field Service Cloud. From process analysis to go-live and team training.') },
              { d: 'd2', icon: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>, title: tr('Implementación Zinier', 'Zinier Implementation'), desc: tr('Configuración de la plataforma Zinier adaptada a tus flujos de trabajo, integraciones con sistemas existentes y deployment en producción.', 'Configuration of the Zinier platform tailored to your workflows, integration with existing systems and production deployment.') },
              { d: 'd3', icon: <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />, title: tr('Consultoría FSM', 'FSM Consulting'), desc: tr('Análisis de madurez operacional, diseño de procesos y estrategia de transformación digital para tu área de Field Service Management.', 'Operational maturity analysis, process design and digital transformation strategy for your Field Service Management area.') },
              { d: 'd1', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />, title: tr('Soporte Post Go-Live', 'Post Go-Live Support'), desc: tr('Servicio de soporte continuo con SLA garantizado, gestión de incidentes, mejoras evolutivas y acompañamiento técnico de primer nivel.', 'Continuous support service with guaranteed SLA, incident management, evolutionary improvements and first-level technical assistance.') },
              { d: 'd2', icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>, title: tr('Desarrollo a Medida', 'Custom Development'), desc: tr('Desarrollo de plugins, extensiones y soluciones personalizadas sobre las plataformas OFSC y Zinier para adaptar la herramienta a tu negocio.', 'Development of plugins, extensions and custom solutions on OFSC and Zinier platforms to adapt the tool to your business.') },
              { d: 'd3', icon: <path d="M18 20V10M12 20V4M6 20v-6" />, title: tr('Integraciones', 'Integrations'), desc: tr('Conectamos OFSC y Zinier con tus sistemas ERP, CRM, GIS o de facturación mediante APIs, middleware y conectores especializados.', 'We connect OFSC and Zinier with your ERP, CRM, GIS or billing systems through APIs, middleware and specialized connectors.') },
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
              <div className="pqc-card-title">{tr('Equipo certificado en Oracle Field Service', 'Team certified in Oracle Field Service')}</div>
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
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section id="metodologia">
        <div className="container">
          <div className="metodologia-header">
            <div className="metodologia-eyebrow fade-up">{tr('NUESTRA METODOLOGÍA', 'OUR METHODOLOGY')}</div>
            <h2 className="metodologia-title fade-up d1">
              {tr('Un proceso probado para', 'A proven process for every implementation')}
              {lang === 'es' && <><br />cada implementación</>}
            </h2>
            <p className="metodologia-subtitle fade-up d2">{tr('Cada proyecto sigue una metodología estructurada que garantiza resultados predecibles y de calidad.', 'Every project follows a structured methodology that guarantees predictable and quality results.')}</p>
          </div>
          <div className="timeline-container fade-up d2">
            <div className="timeline-line" id="timeline-line" />
            <div className="timeline-phases" id="timeline-phases">
              {[
                { n: 1, name: tr('Descubrimiento', 'Discovery'), desc: tr('Relevamiento del negocio, procesos actuales y necesidades operativas del cliente.', "Survey of the business, current processes and client's operational needs.") },
                { n: 2, name: tr('Análisis', 'Analysis'), desc: tr('Evaluación técnica y funcional del entorno OFSC o Zinier para definir el alcance.', 'Technical and functional evaluation of the OFSC or Zinier environment to define scope.') },
                { n: 3, name: tr('Estimación', 'Estimation'), desc: tr('Planificación de tiempos, recursos y costos del proyecto con entregables claros.', 'Planning of project timelines, resources and costs with clear deliverables.') },
                { n: 4, name: tr('Desarrollo', 'Development'), desc: tr('Configuración, parametrización y desarrollo de soluciones sobre la plataforma.', 'Configuration, parameterization and solution development on the platform.') },
                { n: 5, name: tr('Pruebas Internas', 'Internal Testing'), badge: 'QA', desc: tr('Validación funcional y de integración realizada por el equipo técnico de Connexa.', 'Functional and integration validation performed by the Connexa technical team.') },
                { n: 6, name: 'UAT', badge: 'QA', desc: tr('Pruebas de aceptación ejecutadas por los usuarios finales del cliente en su entorno.', "Acceptance testing executed by the client's end users in their environment.") },
                { n: 7, name: 'Go Live', badge: '🚀', desc: tr('Puesta en producción, capacitación de usuarios y acompañamiento en el lanzamiento.', 'Production deployment, user training and launch support.') },
                { n: 8, name: tr('Soporte', 'Support'), badge: '∞', desc: tr('Monitoreo post-implementación, mejora continua y soporte técnico especializado.', 'Post-implementation monitoring, continuous improvement and specialized technical support.') },
              ].map((phase) => (
                <div key={phase.n} className="timeline-phase">
                  {phase.badge && <div className="phase-badge">{phase.badge}</div>}
                  <div className="phase-circle">{phase.n}</div>
                  <div className="phase-content">
                    <div className="phase-name">{phase.name}</div>
                    <div className="phase-divider" />
                    <div className="phase-desc">{phase.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="metodologia-cta fade-up d3">
            <p className="metodologia-cta-text"><strong>{tr('¿Querés conocer cómo aplicamos esta metodología en tu empresa?', 'Want to learn how we apply this methodology in your company?')}</strong></p>
            <button className="btn-primary" onClick={() => scrollTo('cta-section')} style={{ fontSize: 16, padding: '14px 32px' }}>{tr('Hablemos →', "Let's talk →")}</button>
          </div>
        </div>
      </section>

      {/* PRODUCTS PREVIEW */}
      <section id="products">
        <div className="container products-inner">
          <div className="products-header">
            <span className="section-label fade-up" style={{ color: 'var(--accent)' }}>{tr('Innovación propia', 'Proprietary Innovation')}</span>
            <h2 className="section-title fade-up d1" style={{ color: '#fff' }}>{tr('Nuestras soluciones propias', 'Our proprietary solutions')}</h2>
            <p className="section-subtitle fade-up d2" style={{ color: 'rgba(255,255,255,0.6)', margin: '0 auto' }}>{tr('Herramientas desarrolladas internamente sobre las plataformas líderes, diseñadas para resolver los desafíos más comunes del Field Service.', 'Internally developed tools built on leading platforms, designed to solve the most common Field Service challenges.')}</p>
          </div>
          <div className="products-grid">
            <div className="product-card fade-up d1" onClick={() => router.push('/productos/fsmtool')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && router.push('/productos/fsmtool')}>
              <div>
                <div className="product-badge"><div className="product-badge-dot" /><span>{tr('Solución propia', 'Proprietary solution')}</span></div>
                <div className="product-name">FSMTool</div>
                <p className="product-desc">{tr('Suite de herramientas avanzadas de administración y monitoreo para Oracle Field Service Cloud. Operaciones masivas, dashboards en tiempo real y automatización de procesos.', 'Advanced administration and monitoring toolkit for Oracle Field Service Cloud. Bulk operations, real-time dashboards and process automation.')}</p>
                <div className="product-bullets">
                  <div className="product-bullet">{tr('Dashboard de operaciones en tiempo real', 'Real-time operations dashboard')}</div>
                  <div className="product-bullet">{tr('Gestión avanzada de rutas y recursos', 'Advanced route and resource management')}</div>
                  <div className="product-bullet">{tr('Reportería y analytics personalizables', 'Customizable reporting and analytics')}</div>
                </div>
                <button className="product-cta">{tr('Conocer más', 'Learn more')} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg></button>
              </div>
              <div className="product-visual">
                <svg viewBox="0 0 80 80"><rect x="8" y="20" width="64" height="44" rx="6" /><rect x="14" y="28" width="22" height="14" rx="3" /><rect x="14" y="46" width="22" height="8" rx="2" /><rect x="42" y="28" width="22" height="8" rx="2" /><rect x="42" y="40" width="22" height="14" rx="3" /><circle cx="14" cy="14" r="3" /><circle cx="40" cy="14" r="3" /><circle cx="66" cy="14" r="3" /></svg>
              </div>
            </div>
            <div className="product-card fade-up d2" onClick={() => router.push('/productos/workflow-builder')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && router.push('/productos/workflow-builder')}>
              <div>
                <div className="product-badge"><div className="product-badge-dot" /><span>{tr('Solución propia', 'Proprietary solution')}</span></div>
                <div className="product-name">Workflow Builder</div>
                <p className="product-desc">{tr('Constructor visual de flujos de trabajo para Oracle Field Service Cloud. Permite diseñar, testear y publicar workflows sin código, reduciendo el time-to-market de nuevos procesos.', 'Visual workflow builder for Oracle Field Service Cloud. Design, test and publish workflows without code, reducing the time-to-market for new processes.')}</p>
                <div className="product-bullets">
                  <div className="product-bullet">{tr('Editor drag & drop sin código', 'No-code drag & drop editor')}</div>
                  <div className="product-bullet">{tr('Integración nativa con OFSC APIs', 'Native integration with OFSC APIs')}</div>
                  <div className="product-bullet">{tr('Testing y simulación en sandbox', 'Testing and simulation in sandbox')}</div>
                </div>
                <button className="product-cta">{tr('Conocer más', 'Learn more')} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg></button>
              </div>
              <div className="product-visual">
                <svg viewBox="0 0 80 80"><circle cx="20" cy="20" r="8" /><circle cx="60" cy="20" r="8" /><circle cx="20" cy="60" r="8" /><circle cx="60" cy="60" r="8" /><line x1="28" y1="20" x2="52" y2="20" /><line x1="20" y1="28" x2="20" y2="52" /><line x1="28" y1="60" x2="52" y2="60" /><line x1="60" y1="28" x2="60" y2="52" /><circle cx="40" cy="40" r="6" /></svg>
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
            <a href="mailto:contacto@connexaservices.com" className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>{tr('Hablar con un experto', 'Talk to an Expert')}</a>
            <button className="btn-ghost" onClick={() => scrollTo('services')} style={{ fontSize: 16, padding: '16px 36px' }}>{tr('Ver servicios', 'View services')}</button>
          </div>
        </div>
      </section>

      {/* CTA FLOTANTE */}
      <a className="cta-flotante" id="ctaFlotante" href="mailto:contacto@connexaservices.com">
        <span>{tr('Agendar demo', 'Schedule demo')}</span>
      </a>
    </>
  );
}
