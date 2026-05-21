'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLang } from '@/context/LanguageContext';

export default function ServiciosClient() {
  const { lang } = useLang();
  const router = useRouter();
  const [formSent, setFormSent] = useState(false);
  const ctaRef = useRef(null);

  const tr = (es, en) => (lang === 'es' ? es : en);

  useEffect(() => {
    const els = document.querySelectorAll('.fade-up');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  useEffect(() => {
    const onScroll = () => {
      if (ctaRef.current) {
        ctaRef.current.classList.toggle('visible', window.scrollY > 400);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="page-hero-grid">
              <div className="page-hero-left" style={{ textAlign: 'left' }}>
                <nav className="breadcrumb">
                  <Link href="/">{tr('Inicio', 'Home')}</Link>
                  <span className="breadcrumb-sep">/</span>
                  <span className="breadcrumb-cur">{tr('Servicios', 'Services')}</span>
                </nav>
                <div className="hero-eyebrow">{tr('NUESTROS SERVICIOS', 'OUR SERVICES')}</div>
                <h1 className="hero-h1" dangerouslySetInnerHTML={{ __html: tr('Todo lo que necesitás para<br/>tu Field Service', 'Everything you need for<br/>your Field Service') }} />
                <p className="hero-sub">{tr('Desde la implementación hasta el soporte continuo, acompañamos cada etapa de tu operación de campo.', 'From implementation to ongoing support, we accompany every stage of your field operation.')}</p>
                <div className="hero-ctas">
                  <a href="#contacto" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollTo('contacto'); }}>{tr('Hablar con un experto →', 'Talk to an Expert →')}</a>
                  <a href="#implementacion-ofsc" className="btn-ghost" onClick={(e) => { e.preventDefault(); scrollTo('implementacion-ofsc'); }}>{tr('Ver servicios', 'View Services')}</a>
                </div>
              </div>
              {/*
              <div className="page-hero-right page-hero-illustration">
                <svg viewBox="0 0 440 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '440px', display: 'block', margin: '0 auto' }}>
                  <circle cx="220" cy="180" r="160" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  <circle cx="220" cy="180" r="110" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  <line x1="220" y1="180" x2="80" y2="75" stroke="rgba(113,177,54,0.35)" strokeWidth="1.5" strokeDasharray="5 4"/>
                  <line x1="220" y1="180" x2="360" y2="75" stroke="rgba(113,177,54,0.35)" strokeWidth="1.5" strokeDasharray="5 4"/>
                  <line x1="220" y1="180" x2="55" y2="195" stroke="rgba(113,177,54,0.35)" strokeWidth="1.5" strokeDasharray="5 4"/>
                  <line x1="220" y1="180" x2="385" y2="195" stroke="rgba(113,177,54,0.35)" strokeWidth="1.5" strokeDasharray="5 4"/>
                  <line x1="220" y1="180" x2="115" y2="305" stroke="rgba(113,177,54,0.35)" strokeWidth="1.5" strokeDasharray="5 4"/>
                  <line x1="220" y1="180" x2="325" y2="305" stroke="rgba(113,177,54,0.35)" strokeWidth="1.5" strokeDasharray="5 4"/>
                  <circle cx="80" cy="75" r="30" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
                  <path d="M68 75h24M80 63v24" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="360" cy="75" r="30" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
                  <path d="M348 68l12-5 12 5M348 80l12-5 12 5" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="55" cy="195" r="30" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
                  <path d="M43 189a12 12 0 0 1 24 0v12H43v-12z" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <circle cx="385" cy="195" r="30" fill="rgba(255,255,255,0.05)" stroke="rgba(113,177,54,0.4)" strokeWidth="1.5"/>
                  <path d="M373 195h24M385 183v24" stroke="#71B136" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="115" cy="305" r="30" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
                  <path d="M103 295l12 22 12-22" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <circle cx="325" cy="305" r="30" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
                  <rect x="313" y="293" width="24" height="24" rx="7" stroke="rgba(255,255,255,0.55)" strokeWidth="2" fill="none"/>
                  <circle cx="220" cy="180" r="52" fill="rgba(113,177,54,0.12)" stroke="rgba(113,177,54,0.45)" strokeWidth="2"/>
                  <circle cx="220" cy="180" r="36" fill="rgba(113,177,54,0.15)" stroke="rgba(113,177,54,0.5)" strokeWidth="1.5"/>
                  <text x="220" y="176" textAnchor="middle" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="11" fontWeight="700" fill="rgba(255,255,255,0.9)">Connexa</text>
                  <text x="220" y="191" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9.5" fill="rgba(255,255,255,0.55)">Field Service</text>
                  <circle cx="148" cy="127" r="4" fill="#71B136" opacity="0.75"/>
                  <circle cx="292" cy="127" r="3.5" fill="#71B136" opacity="0.55"/>
                  <circle cx="138" cy="187" r="3" fill="#71B136" opacity="0.65"/>
                  <text x="80" y="118" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="rgba(255,255,255,0.4)">{tr('Implementación', 'Implementation')}</text>
                  <text x="360" y="118" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="rgba(255,255,255,0.4)">{tr('Consultoría', 'Consulting')}</text>
                  <text x="55" y="238" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="rgba(255,255,255,0.4)">{tr('Soporte', 'Support')}</text>
                  <text x="385" y="238" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="rgba(255,255,255,0.4)">{tr('Integraciones', 'Integrations')}</text>
                  <text x="115" y="348" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="rgba(255,255,255,0.4)">{tr('Training', 'Training')}</text>
                  <text x="325" y="348" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="rgba(255,255,255,0.4)">Zinier</text>
                </svg>
              </div>
              */}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .sec-ofsc-layout   { flex-direction: column !important; }
          .sec-zinier-layout { flex-direction: column !important; }
          .srv-mockup-img    { display: none !important; }
          .srv-consultoria-wrapper { padding: 48px 20px !important; }
          .srv-consultoria-layout  { flex-direction: column !important; gap: 24px !important; }
          .srv-consultoria-left    { width: 100% !important; }
          .srv-consultoria-right   { width: 100% !important; position: relative !important; top: 0 !important; }
          .srv-consultoria-legend  { grid-template-columns: repeat(2, 1fr) !important; }
          .srv-integraciones-section { padding: 48px 20px !important; }
          .srv-contacto-section      { padding: 48px 20px !important; }
          .srv-contacto-h2           { font-size: 28px !important; }
          .srv-soporte-section    { padding: 48px 20px !important; }
          .srv-desarrollo-section { padding: 48px 20px !important; }
          .srv-training-section   { padding: 48px 20px !important; }
          .srv-cta-flotante { padding: 16px !important; min-width: 44px !important; }
        }
      `}</style>
      {/* ── IMPLEMENTACIÓN OFSC ── */}
      <section id="implementacion-ofsc" className="sec-ofsc">
        <div className="container">
          <div className="sec-ofsc-layout" style={{ display: 'flex', flexDirection: 'row', gap: '48px', alignItems: 'center', marginBottom: '48px' }}>
            <div style={{ flex: 1 }}>
              <div className="section-header fade-up">
                <div className="section-eyebrow">{tr('IMPLEMENTACIÓN', 'IMPLEMENTATION')}</div>
                <h2>Oracle Field Service Cloud</h2>
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px'}}>
                  <svg width="36px" height="30px" viewBox="0 0 28 24" fill="none">
                    <path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/>
                    <path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/>
                    <path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/>
                  </svg>
                  <span style={{color:'#71B136', fontSize:'13px', fontWeight:600, letterSpacing:'0.06em'}}>{tr('Impulsado por Inteligencia Artificial','Powered by Artificial Intelligence')}</span>
                </div>
                <p>{tr('Somos partner certificado de Oracle con experiencia en implementaciones end-to-end de Oracle Field Service Cloud. Configuramos, parametrizamos e integramos OFSC adaptado 100% a los procesos de tu empresa.', 'We are a certified Oracle partner with experience in end-to-end Oracle Field Service Cloud implementations. We configure, parameterize, and integrate OFSC 100% tailored to your company\'s processes.')}</p>
              </div>
              <div className="zinier-badge fade-up d1">
                <div className="zinier-badge-dot"></div>
                <span>{tr('Oracle Certified Partner', 'Oracle Certified Partner')}</span>
              </div>
            </div>
            <div className="hidden md:block srv-mockup-img" style={{ flexShrink: 0, maxWidth: '560px', width: '100%', background: '#1a1a2e', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
              <div style={{ height: '32px', background: '#e8e8ed', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28CA41' }}></div>
              </div>
              <Image
                src="/assets/ofsc-dispatch-console.png"
                alt="OFSC Dispatch Console"
                width={560}
                height={360}
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="module-grid">
            {[
              { d: 'd1', icon: <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, name: tr('Capacidad y Cuota', 'Capacity and Quota'), desc: tr('Gestión de la capacidad disponible y cuotas de trabajo por zona, recurso y período de tiempo.', 'Management of available capacity and work quotas by zone, resource, and time period.') },
              { d: 'd2', icon: <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>, name: tr('Inventario', 'Inventory'), desc: tr('Control completo del inventario de partes, materiales y equipos asignados a técnicos y depósitos.', 'Complete control of the inventory of parts, materials, and equipment assigned to technicians and warehouses.') },
              { d: 'd3', icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49"/></svg>, name: tr('Enrutamiento', 'Routing'), desc: tr('Optimización automática de rutas para maximizar la eficiencia de tu fuerza de trabajo en campo.', 'Automatic route optimization to maximize the efficiency of your field workforce.') },
              { d: 'd4', icon: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, name: tr('Recursos', 'Resources'), desc: tr('Administración completa de técnicos, vehículos y equipos de trabajo con sus propiedades y calendarios.', 'Complete administration of technicians, vehicles, and work teams with their properties and calendars.') },
              { d: 'd5', icon: <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, name: tr('Habilidades', 'Skills'), desc: tr('Definición y asignación de competencias técnicas para el matching inteligente entre actividad y recurso.', 'Definition and assignment of technical competencies for intelligent matching between activity and resource.') },
              { d: 'd6', icon: <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, name: tr('Usuarios', 'Users'), desc: tr('Gestión de accesos, roles y permisos para todos los perfiles de la plataforma OFSC.', 'Management of access, roles, and permissions for all OFSC platform profiles.') },
              { d: 'd1', icon: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, name: tr('Seguridad', 'Security'), desc: tr('Configuración de políticas de seguridad, autenticación y control de acceso a datos.', 'Configuration of security policies, authentication, and data access control.') },
              { d: 'd2', icon: <svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>, name: tr('Integraciones', 'Integrations'), desc: tr('Conexión de OFSC con sistemas externos mediante APIs REST, webhooks y conectores nativos.', 'Connection of OFSC with external systems via REST APIs, webhooks, and native connectors.') },
              { d: 'd3', icon: <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, name: tr('Subsistemas', 'Subsystems'), desc: tr('Implementación y configuración de los subsistemas de OFSC para operaciones especializadas.', 'Implementation and configuration of OFSC subsystems for specialized operations.') },
            ].map((m, i) => (
              <div key={i} className={`module-card fade-up ${m.d}`}>
                <div className="module-icon">{m.icon}</div>
                <div className="module-name">{m.name}</div>
                <div className="module-desc">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPLEMENTACIÓN ZINIER ── */}
      <section id="implementacion-zinier" className="sec-zinier">
        <div className="container">
          <div className="sec-zinier-layout" style={{ display: 'flex', flexDirection: 'row', gap: '48px', alignItems: 'center', marginBottom: '48px' }}>
            <div style={{ flex: 1 }}>
              <div className="section-header fade-up">
                <div className="section-eyebrow">{tr('IMPLEMENTACIÓN', 'IMPLEMENTATION')}</div>
                <h2>{tr('Zinier — Field Service Inteligente', 'Zinier — Intelligent Field Service')}</h2>
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px'}}>
                  <svg width="36px" height="30px" viewBox="0 0 28 24" fill="none">
                    <path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/>
                    <path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/>
                    <path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/>
                  </svg>
                  <span style={{color:'#71B136', fontSize:'13px', fontWeight:600, letterSpacing:'0.06em'}}>{tr('Impulsado por Inteligencia Artificial','Powered by Artificial Intelligence')}</span>
                </div>
                <p>{tr('Como partner certificado de Zinier implementamos la plataforma de Field Service Management más innovadora del mercado, potenciada por inteligencia artificial.', 'As a certified Zinier partner, we implement the most innovative Field Service Management platform on the market, powered by artificial intelligence.')}</p>
              </div>
              <div className="zinier-badge fade-up d1">
                <div className="zinier-badge-dot"></div>
                <span>{tr('Zinier Certified Partner', 'Zinier Certified Partner')}</span>
              </div>
            </div>
            <div className="hidden md:block srv-mockup-img" style={{ flexShrink: 0, maxWidth: '560px', width: '100%', background: '#1a1a2e', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
              <div style={{ height: '32px', background: '#e8e8ed', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28CA41' }}></div>
              </div>
              <Image
                src="/assets/zinier-calendar-view.png"
                alt="Zinier Calendar View"
                width={560}
                height={360}
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="zinier-cards">
            {[
              { d: 'd1', icon: <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/><path d="M18 2l4 4-4 4"/><path d="M22 2l-4 4"/></svg>, title: tr('Automatización con IA', 'AI Automation'), desc: tr('Flujos de trabajo inteligentes que toman decisiones automáticas basadas en datos de campo en tiempo real.', 'Intelligent workflows that make automatic decisions based on real-time field data.') },
              { d: 'd2', icon: <svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, title: tr('Workflows sin código', 'No-Code Workflows'), desc: tr('Constructor visual para diseñar y publicar procesos complejos sin necesidad de desarrollo de software.', 'Visual builder to design and publish complex processes without software development.') },
              { d: 'd3', icon: <svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, title: tr('Analítica en tiempo real', 'Real-Time Analytics'), desc: tr('Dashboards y reportes operacionales con métricas de campo actualizadas en tiempo real para la toma de decisiones.', 'Operational dashboards and reports with real-time field metrics for decision-making.') },
            ].map((c, i) => (
              <div key={i} className={`zinier-card fade-up ${c.d}`}>
                <div className="zinier-card-icon">{c.icon}</div>
                <div><div className="zinier-card-title">{c.title}</div><div className="zinier-card-desc">{c.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEGRACIONES ── */}
      <section id="integraciones" className="sec-integraciones srv-integraciones-section">
        <div className="container">
          <div className="section-header center fade-up">
            <div className="section-eyebrow light">{tr('INTEGRACIONES', 'INTEGRATIONS')}</div>
            <h2 className="light">{tr('Conectamos tu FSM con cualquier sistema', 'We connect your FSM with any system')}</h2>
            <p className="light">{tr('Integramos tu FSM con los principales sistemas empresariales del mercado.', 'We integrate your FSM with the main enterprise systems on the market.')}</p>
          </div>
          <div className="hub-wrap fade-up d1">
            <svg className="hub-svg" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <line className="hub-line" x1="250" y1="250" x2="250" y2="78"/>
              <line className="hub-line" x1="250" y1="250" x2="401" y2="163"/>
              <line className="hub-line" x1="250" y1="250" x2="401" y2="337"/>
              <line className="hub-line" x1="250" y1="250" x2="250" y2="422"/>
              <line className="hub-line" x1="250" y1="250" x2="99" y2="337"/>
              <line className="hub-line" x1="250" y1="250" x2="99" y2="163"/>
              <circle cx="250" cy="72" r="42" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
              <text x="250" y="68" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">OIC</text>
              <text x="250" y="82" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Inter, sans-serif">Oracle</text>
              <circle cx="401" cy="157" r="42" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
              <text x="401" y="153" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">MuleSoft</text>
              <text x="401" y="167" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Inter, sans-serif">Anypoint</text>
              <circle cx="401" cy="343" r="42" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
              <text x="401" y="339" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">SAP</text>
              <text x="401" y="353" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Inter, sans-serif">ERP</text>
              <circle cx="250" cy="428" r="42" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
              <text x="250" y="424" textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Salesforce</text>
              <text x="250" y="438" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Inter, sans-serif">CRM</text>
              <circle cx="99" cy="343" r="42" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
              <text x="99" y="337" textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Service</text>
              <text x="99" y="349" textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Now</text>
              <text x="99" y="361" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Inter, sans-serif">ITSM</text>
              <circle cx="99" cy="157" r="42" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
              <text x="99" y="151" textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">APIs</text>
              <text x="99" y="163" textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">REST</text>
              <text x="99" y="175" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Inter, sans-serif">Custom</text>
              <circle cx="250" cy="250" r="62" fill="#71B136"/>
              <circle cx="250" cy="250" r="58" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
              <text x="250" y="244" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">FSM</text>
              <text x="250" y="262" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9" fontFamily="Inter, sans-serif">Hub central</text>
            </svg>
          </div>
          <div className="int-cards">
            {[
              { d: 'd1', logo: 'OIC', name: tr('Oracle Integration Cloud', 'Oracle Integration Cloud'), desc: tr('Integración nativa Oracle-to-Oracle con flujos visuales y conectores preconfigurados para OFSC.', 'Native Oracle-to-Oracle integration with visual flows and pre-configured connectors for OFSC.') },
              { d: 'd2', logo: 'MuleSoft', name: tr('MuleSoft Anypoint', 'MuleSoft Anypoint'), desc: tr('Integración enterprise con cualquier sistema mediante la plataforma Anypoint de MuleSoft.', 'Enterprise integration with any system using the MuleSoft Anypoint platform.') },
              { d: 'd3', logo: 'SAP', name: 'SAP', desc: tr('Sincronización bidireccional con SAP para órdenes de trabajo, materiales y datos de clientes.', 'Bidirectional synchronization with SAP for work orders, materials, and customer data.') },
              { d: 'd4', logo: 'CRM', name: 'Salesforce', desc: tr('Integración CRM para sincronizar casos, cuentas y actividades entre Salesforce y OFSC.', 'CRM integration to synchronize cases, accounts, and activities between Salesforce and OFSC.') },
              { d: 'd5', logo: 'ITSM', name: 'ServiceNow', desc: tr('Conexión con ServiceNow para gestión unificada de incidentes y órdenes de campo.', 'Connection with ServiceNow for unified management of incidents and field orders.') },
              { d: 'd6', logo: 'REST', name: tr('APIs REST propias', 'Custom REST APIs'), desc: tr('Desarrollo de integraciones a medida mediante las APIs REST de OFSC y conectores propios.', 'Custom integration development using OFSC REST APIs and proprietary connectors.') },
            ].map((c, i) => (
              <div key={i} className={`int-card fade-up ${c.d}`}>
                <div className="int-card-logo">{c.logo}</div>
                <div className="int-card-name">{c.name}</div>
                <div className="int-card-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULTORÍA ── */}
      <section id="consultoria" className="sec-consultoria" style={{padding:0}}>
        <div className="srv-consultoria-wrapper" style={{width:'100%', background:'#F3F4F6', padding:'100px 40px', position:'relative', overflow:'hidden', overflowX:'auto'}}>
          <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0,pointerEvents:'none',zIndex:0}}>
            <defs>
              <pattern id="dots-cons" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#71B136"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-cons)"/>
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

          <div className="srv-consultoria-layout" style={{display:'flex', gap:'48px', maxWidth:'1600px', margin:'60px auto 0', alignItems:'flex-start', position:'relative', zIndex:2}}>

            {/* Columna izquierda 30% — 3 cards */}
            <div className="srv-consultoria-left" style={{width:'30%', display:'flex', flexDirection:'column', gap:'16px'}}>

              <div style={{background:'white', border:'1px solid #E5E7EB', borderRadius:'16px', padding:'28px 32px', position:'relative', overflow:'hidden'}}>
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

              <div style={{background:'white', border:'1px solid #E5E7EB', borderRadius:'16px', padding:'28px 32px', position:'relative', overflow:'hidden'}}>
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

              <div style={{background:'white', border:'1px solid #E5E7EB', borderRadius:'16px', padding:'28px 32px', position:'relative', overflow:'hidden'}}>
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
            <div className="srv-consultoria-right" style={{width:'70%', background:'rgba(255,255,255,0.97)', borderRadius:'20px', padding:'8px', boxShadow:'0 40px 100px rgba(0,0,0,0.4)', position:'sticky', top:'100px'}}>

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
                <filter id="tt-shadow-svc" x="-10%" y="-10%" width="120%" height="120%">
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
                <g className="tt" filter="url(#tt-shadow-svc)">
                  <rect x="405" y="376" width="148" height="28" rx="6" fill="#172554" />
                  <text x="479" y="395" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Segmentación de cuotas', 'Quota segmentation')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="657" cy="396" r="22" fill="#71B136" stroke="#fff" strokeWidth="2" />
                <text x="657" y="401" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">A2</text>
                <g className="tt" filter="url(#tt-shadow-svc)">
                  <rect x="583" y="358" width="148" height="28" rx="6" fill="#172554" />
                  <text x="657" y="377" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Optimización de routing', 'Routing optimization')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="531" cy="349" r="22" fill="#71B136" stroke="#fff" strokeWidth="2" />
                <text x="531" y="354" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">B1</text>
                <g className="tt" filter="url(#tt-shadow-svc)">
                  <rect x="457" y="311" width="148" height="28" rx="6" fill="#172554" />
                  <text x="531" y="330" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Activar colaboración', 'Activate collaboration')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="759" cy="321" r="22" fill="#71B136" stroke="#fff" strokeWidth="2" />
                <text x="759" y="326" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">E1</text>
                <g className="tt" filter="url(#tt-shadow-svc)">
                  <rect x="679" y="283" width="160" height="28" rx="6" fill="#172554" />
                  <text x="759" y="302" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Visibilidad en tiempo real', 'Real-time visibility')}</text>
                </g>
              </g>

              {/* ── PROYECTOS — superior derecho — azul ── */}
              <g className="sb">
                <circle cx="592" cy="115" r="22" fill="#172554" stroke="#fff" strokeWidth="2" />
                <text x="592" y="120" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">D1</text>
                <g className="tt" filter="url(#tt-shadow-svc)">
                  <rect x="518" y="77" width="148" height="28" rx="6" fill="#172554" />
                  <text x="592" y="96" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Unificación app móvil', 'Mobile app unification')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="749" cy="77" r="22" fill="#172554" stroke="#fff" strokeWidth="2" />
                <text x="749" y="82" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">D2</text>
                <g className="tt" filter="url(#tt-shadow-svc)">
                  <rect x="675" y="48" width="148" height="28" rx="6" fill="#172554" />
                  <text x="749" y="67" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Gestión de inventario', 'Inventory management')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="505" cy="190" r="22" fill="#172554" stroke="#fff" strokeWidth="2" />
                <text x="505" y="195" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">D3</text>
                <g className="tt" filter="url(#tt-shadow-svc)">
                  <rect x="431" y="152" width="148" height="28" rx="6" fill="#172554" />
                  <text x="505" y="171" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Integración ERP', 'ERP Integration')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="802" cy="152" r="22" fill="#172554" stroke="#fff" strokeWidth="2" />
                <text x="802" y="157" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">C2</text>
                <g className="tt" filter="url(#tt-shadow-svc)">
                  <rect x="728" y="114" width="148" height="28" rx="6" fill="#172554" />
                  <text x="802" y="133" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Analítica avanzada', 'Advanced analytics')}</text>
                </g>
              </g>

              {/* ── TAREAS — inferior izquierdo — gris ── */}
              <g className="sb">
                <circle cx="195" cy="377" r="22" fill="#6B7280" stroke="#fff" strokeWidth="2" />
                <text x="195" y="382" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">B2</text>
                <g className="tt" filter="url(#tt-shadow-svc)">
                  <rect x="131" y="339" width="128" height="28" rx="6" fill="#172554" />
                  <text x="195" y="358" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Atributos de skills', 'Skills attributes')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="122" cy="330" r="22" fill="#6B7280" stroke="#fff" strokeWidth="2" />
                <text x="122" y="335" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">A4</text>
                <g className="tt" filter="url(#tt-shadow-svc)">
                  <rect x="58" y="292" width="128" height="28" rx="6" fill="#172554" />
                  <text x="122" y="311" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Validación GPS', 'GPS validation')}</text>
                </g>
              </g>

              {/* ── DESCARTE — superior izquierdo — rojo ── */}
              <g className="sb">
                <circle cx="200" cy="134" r="22" fill="#DC2626" stroke="#fff" strokeWidth="2" />
                <text x="200" y="139" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">D8</text>
                <g className="tt" filter="url(#tt-shadow-svc)">
                  <rect x="116" y="96" width="168" height="28" rx="6" fill="#172554" />
                  <text x="200" y="115" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Réplica BI en tiempo real', 'Real-time BI replication')}</text>
                </g>
              </g>
            </svg>
            </div>
            {/* Leyenda horizontal 4 columnas */}
            <div className="srv-consultoria-legend" style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', padding:'0 8px 8px'}}>
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
        </div>{/* /wrapper F3F4F6 */}
      </section>

      {/* ── SOPORTE ── */}
      <section id="soporte" className="sec-soporte srv-soporte-section">
        <div className="container">
          <div className="section-header center fade-up">
            <div className="section-eyebrow">{tr('SOPORTE', 'SUPPORT')}</div>
            <h2>{tr('Soporte continuo después del lanzamiento', 'Continuous Support After Launch')}</h2>
            <p>{tr('No te dejamos solo después del go-live. Nuestro equipo acompaña la operación con soporte técnico especializado y mejora continua.', "We don't leave you alone after go-live. Our team supports the operation with specialized technical support and continuous improvement.")}</p>
          </div>
          <div className="soporte-grid">
            <div className="soporte-card fade-up d1">
              <div className="soporte-plan">{tr('Basic', 'Basic')}</div>
              <div className="soporte-desc">{tr('Soporte reactivo para incidentes críticos. Ideal para operaciones estabilizadas con equipo interno técnico.', 'Reactive support for critical incidents. Ideal for stabilized operations with an internal technical team.')}</div>
              <ul className="soporte-features">
                {[tr('Soporte correctivo', 'Corrective support'), tr('Revisión de parches y actualizaciones', 'Patch and update review'), tr('Documentación técnica', 'Technical documentation')].map((f, i) => <li key={i} className="soporte-feature"><div className="soporte-check"></div><span>{f}</span></li>)}
              </ul>
              <div className="soporte-cta"><a href="#contacto" className="btn-ghost soporte-btn-ghost" onClick={(e) => { e.preventDefault(); scrollTo('contacto'); }}>{tr('Consultar →', 'Inquire →')}</a></div>
            </div>
            <div className="soporte-card featured fade-up d2">
              <div className="soporte-badge">{tr('Más elegido', 'Most Popular')}</div>
              <div className="soporte-plan">{tr('Professional', 'Professional')}</div>
              <div className="soporte-desc">{tr('Soporte proactivo con un equipo dedicado. Para operaciones en crecimiento que requieren agilidad y mejora continua.', 'Proactive support with a dedicated team. For growing operations that require agility and continuous improvement.')}</div>
              <ul className="soporte-features">
                {[tr('Todo lo del plan básico', 'Everything in Basic plan'), tr('Reuniones de seguimiento y planificación gestionadas por nuestro equipo', 'Follow-up and planning meetings managed by our team'), tr('Consultoría funcional incluida', 'Functional consulting included'), tr('Capacitación continua', 'Continuous training'), tr('Desarrollo de plugins', 'Plugin development')].map((f, i) => <li key={i} className="soporte-feature"><div className="soporte-check"></div><span>{f}</span></li>)}
              </ul>
              <div className="soporte-cta"><a href="#contacto" className="btn-primary" style={{ fontSize: '14px', padding: '12px 24px' }} onClick={(e) => { e.preventDefault(); scrollTo('contacto'); }}>{tr('Consultar →', 'Inquire →')}</a></div>
            </div>
            <div className="soporte-card fade-up d3">
              <div className="soporte-plan">{tr('Enterprise', 'Enterprise')}</div>
              <div className="soporte-desc">{tr('Soporte full dedicado para operaciones complejas de gran escala con requerimientos críticos de uptime.', 'Full dedicated support for complex, large-scale operations with critical uptime requirements.')}</div>
              <ul className="soporte-features">
                {[tr('Todo lo del plan profesional', 'Everything in Professional plan'), tr('Equipo dedicado', 'Dedicated team'), tr('Soporte 24/7', '24/7 support'), tr('Assessment con roadmap de mejoras semestrales', 'Assessment with semi-annual improvement roadmap'), tr('Acceso preferencial a Productos de Connexa Services', 'Preferential access to Connexa Services Products')].map((f, i) => <li key={i} className="soporte-feature"><div className="soporte-check"></div><span>{f}</span></li>)}
              </ul>
              <div className="soporte-cta"><a href="#contacto" className="btn-ghost soporte-btn-ghost" onClick={(e) => { e.preventDefault(); scrollTo('contacto'); }}>{tr('Consultar →', 'Inquire →')}</a></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESARROLLO ── */}
      <section id="desarrollo" className="sec-desarrollo srv-desarrollo-section">
        <div className="container">
          <div className="desarrollo-grid">
            <div>
              <div className="section-header fade-up">
                <div className="section-eyebrow">{tr('DESARROLLO', 'DEVELOPMENT')}</div>
                <h2>{tr('Soluciones desarrolladas para tu operación', 'Solutions Developed for Your Operation')}</h2>
                <p>{tr('Desarrollamos plugins, integraciones y aplicaciones a medida sobre OFSC y Zinier cuando las capacidades nativas no son suficientes.', 'We develop custom plugins, integrations, and applications on OFSC and Zinier when native capabilities are not enough.')}</p>
              </div>
              <p className="fade-up d1" style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '32px' }}>
                {tr('Nuestros productos propios son el mejor ejemplo de nuestra capacidad de desarrollo. FSMTool y Workflow Builder nacieron de necesidades reales de nuestros clientes que ninguna herramienta del mercado resolvía.', 'Our own products are the best example of our development capability. FSMTool and Workflow Builder were born from real customer needs that no tool on the market was solving.')}
              </p>
              <a href="#contacto" className="btn-primary fade-up d2" style={{ width: 'fit-content', display: 'inline-flex' }} onClick={(e) => { e.preventDefault(); scrollTo('contacto'); }}>{tr('Hablar sobre tu proyecto →', 'Talk about your project →')}</a>
            </div>
            <div className="product-showcase-cards">
              <div className="product-showcase-card fade-up d1">
                <div className="product-showcase-tag">{tr('Solución propia · OFSC', 'Proprietary Solution · OFSC')}</div>
                <div className="product-showcase-name">FSMTool</div>
                <div className="product-showcase-desc">{tr('Suite de operaciones masivas construida sobre Oracle Field Service Cloud. Reasignación de órdenes, gestión de inventario, visualización de fuerza de trabajo y más — todo en segundos.', 'Bulk operations suite built on Oracle Field Service Cloud. Order reassignment, inventory management, workforce visibility, and more — all in seconds.')}</div>
                <Link href="/productos/fsmtool" className="product-showcase-link">{tr('Ver FSMTool →', 'View FSMTool →')}</Link>
              </div>
              <div className="product-showcase-card fade-up d2">
                <div className="product-showcase-tag">{tr('Solución propia · OFSC', 'Proprietary Solution · OFSC')}</div>
                <div className="product-showcase-name">Workflow Builder</div>
                <div className="product-showcase-desc">{tr('Constructor visual de flujos de trabajo para Oracle Field Service Cloud. Diseñá, testeá y publicá procesos complejos sin escribir una línea de código.', 'Visual workflow builder for Oracle Field Service Cloud. Design, test, and publish complex processes without writing a single line of code.')}</div>
                <Link href="/productos/workflow-builder" className="product-showcase-link">{tr('Ver Workflow Builder →', 'View Workflow Builder →')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRAINING ── */}
      <section id="training" className="sec-training srv-training-section">
        <div className="container">
          <div className="section-header center fade-up">
            <div className="section-eyebrow">{tr('CAPACITACIÓN', 'TRAINING')}</div>
            <h2>{tr('Capacitación para tu equipo', 'Training for Your Team')}</h2>
            <p>{tr('Formamos a tu equipo técnico y funcional en Oracle Field Service Cloud y Zinier para que operen con autonomía desde el primer día.', 'We train your technical and functional team in Oracle Field Service Cloud and Zinier so they can operate autonomously from day one.')}</p>
          </div>
          <div className="training-grid">
            {[
              { d: 'd1', icon: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: tr('Presencial', 'In-Person'), desc: tr('Capacitación en tus instalaciones con instructores certificados. Ideal para equipos grandes y procesos críticos que requieren práctica intensiva.', 'Training at your facilities with certified instructors. Ideal for large teams and critical processes that require intensive practice.'), tags: [tr('In-company', 'In-company'), tr('Hands-on', 'Hands-on'), tr('Certificación', 'Certification')] },
              { d: 'd2', icon: <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, title: tr('Virtual', 'Virtual'), desc: tr('Sesiones en vivo por videoconferencia con acceso a sandbox real de OFSC. Flexible, eficiente y sin costos de traslado.', 'Live sessions via videoconference with access to a real OFSC sandbox. Flexible, efficient, and without travel costs.'), tags: [tr('Live sessions', 'Live sessions'), tr('Sandbox OFSC', 'OFSC Sandbox'), tr('Grabaciones', 'Recordings')] },
              { d: 'd3', icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>, title: tr('A medida', 'Custom'), desc: tr('Programa personalizado según el rol, nivel técnico y procesos específicos de tu empresa. Contenido 100% adaptado a tu operación.', 'Personalized program based on role, technical level, and specific processes of your company. Content 100% adapted to your operation.'), tags: [tr('Personalizado', 'Personalized'), tr('Por rol', 'By role'), tr('Materiales propios', 'Custom materials')] },
            ].map((c, i) => (
              <div key={i} className={`training-card fade-up ${c.d}`}>
                <div className="training-icon">{c.icon}</div>
                <div className="training-title">{c.title}</div>
                <div className="training-desc">{c.desc}</div>
                <div className="training-tags">{c.tags.map((t, j) => <span key={j} className="training-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULARIO DE CONTACTO ── */}
      <section id="contacto" className="sec-contacto srv-contacto-section">
        <div className="container">
          <div className="form-wrap">
            <div className="form-left">
              <h2 className="srv-contacto-h2" dangerouslySetInnerHTML={{ __html: tr('¿Listo para transformar<br/>tu <em>Field Service</em>?', 'Ready to transform<br/>your <em>Field Service</em>?') }} />
              <p>{tr('Contactanos y diseñamos juntos la solución ideal para tu empresa.', "Contact us and we'll design together the ideal solution for your company.")}</p>
              <div className="form-trust">
                {[tr('Sin costo. Sin compromiso.', 'No cost. No commitment.'), tr('Partner certificado Oracle y Zinier', 'Certified Oracle and Zinier Partner'), tr('+50 proyectos de Field Service', '+50 Field Service projects')].map((item, i) => (
                  <div key={i} className="form-trust-item"><div className="form-trust-check"></div><span>{item}</span></div>
                ))}
              </div>
            </div>
            <div className="form-box">
              <h3>{tr('Envianos tu consulta', 'Send us your inquiry')}</h3>
              {!formSent ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group"><label>{tr('Nombre *', 'Name *')}</label><input type="text" placeholder={tr('Tu nombre', 'Your name')} required /></div>
                    <div className="form-group"><label>{tr('Empresa *', 'Company *')}</label><input type="text" placeholder={tr('Nombre de la empresa', 'Company name')} required /></div>
                  </div>
                  <div className="form-group"><label>{tr('Email *', 'Email *')}</label><input type="email" placeholder="tu@empresa.com" required /></div>
                  <div className="form-group">
                    <label>{tr('Servicio de interés', 'Service of interest')}</label>
                    <select>
                      <option value="">{tr('Seleccioná una opción', 'Select an option')}</option>
                      <option>{tr('Implementación Oracle Field Service Cloud', 'Oracle Field Service Cloud Implementation')}</option>
                      <option>{tr('Implementación Zinier', 'Zinier Implementation')}</option>
                      <option>{tr('Integraciones (OIC, MuleSoft, SAP...)', 'Integrations (OIC, MuleSoft, SAP...)')}</option>
                      <option>{tr('Consultoría FSM', 'FSM Consulting')}</option>
                      <option>{tr('Soporte Post Go-Live', 'Post Go-Live Support')}</option>
                      <option>{tr('Desarrollo a medida', 'Custom Development')}</option>
                      <option>{tr('Capacitación', 'Training')}</option>
                      <option>{tr('Otro', 'Other')}</option>
                    </select>
                  </div>
                  <div className="form-group"><label>{tr('Mensaje', 'Message')}</label><textarea placeholder={tr('Contanos brevemente tu necesidad o proyecto…', 'Tell us briefly about your need or project…')}></textarea></div>
                  <button type="submit" className="btn-primary form-submit">{tr('Enviar consulta', 'Send inquiry')}</button>
                  <p className="form-note">{tr('Tu información es confidencial. No compartimos tus datos con terceros.', 'Your information is confidential. We do not share your data with third parties.')}</p>
                </form>
              ) : (
                <div className="form-success">
                  <div className="form-success-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
                  <h4>{tr('¡Consulta enviada!', 'Inquiry sent!')}</h4>
                  <p>{tr('Nos pondremos en contacto con vos en menos de 24 horas hábiles.', 'We will get in touch with you in less than 24 business hours.')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <button ref={ctaRef} className="cta-flotante srv-cta-flotante" onClick={() => scrollTo('contacto')}>
        {tr('HABLAR CON UN EXPERTO', 'TALK TO AN EXPERT')}
      </button>
    </>
  );
}
