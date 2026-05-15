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
              <div className="page-hero-left">
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

      {/* ── IMPLEMENTACIÓN OFSC ── */}
      <section id="implementacion-ofsc" className="sec-ofsc">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'row', gap: '48px', alignItems: 'center', marginBottom: '48px' }}>
            <div className="section-header fade-up" style={{ flex: 1 }}>
              <div className="section-eyebrow">{tr('IMPLEMENTACIÓN', 'IMPLEMENTATION')}</div>
              <h2>Oracle Field Service Cloud</h2>
              <p>{tr('Somos partner certificado de Oracle con experiencia en implementaciones end-to-end de Oracle Field Service Cloud. Configuramos, parametrizamos e integramos OFSC adaptado 100% a los procesos de tu empresa.', 'We are a certified Oracle partner with experience in end-to-end Oracle Field Service Cloud implementations. We configure, parameterize, and integrate OFSC 100% tailored to your company\'s processes.')}</p>
            </div>
            <div className="hidden md:block" style={{ flexShrink: 0, maxWidth: '560px', width: '100%', background: '#1a1a2e', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
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
          <div style={{ display: 'flex', flexDirection: 'row', gap: '48px', alignItems: 'center', marginBottom: '48px' }}>
            <div style={{ flex: 1 }}>
              <div className="section-header fade-up">
                <div className="section-eyebrow">{tr('IMPLEMENTACIÓN', 'IMPLEMENTATION')}</div>
                <h2>{tr('Zinier — Field Service Inteligente', 'Zinier — Intelligent Field Service')}</h2>
                <p>{tr('Como partner certificado de Zinier implementamos la plataforma de Field Service Management más innovadora del mercado, potenciada por inteligencia artificial.', 'As a certified Zinier partner, we implement the most innovative Field Service Management platform on the market, powered by artificial intelligence.')}</p>
              </div>
              <div className="zinier-badge fade-up d1">
                <div className="zinier-badge-dot"></div>
                <span>{tr('Zinier Certified Partner', 'Zinier Certified Partner')}</span>
              </div>
              <a href="#contacto" className="btn-primary fade-up d2" style={{ width: 'fit-content', display: 'inline-flex', marginTop: '16px' }} onClick={(e) => { e.preventDefault(); scrollTo('contacto'); }}>{tr('Hablar con un experto →', 'Talk to an Expert →')}</a>
            </div>
            <div className="hidden md:block" style={{ flexShrink: 0, maxWidth: '560px', width: '100%', background: '#1a1a2e', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
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
      <section id="integraciones" className="sec-integraciones">
        <div className="container">
          <div className="section-header center fade-up">
            <div className="section-eyebrow light">{tr('INTEGRACIONES', 'INTEGRATIONS')}</div>
            <h2 className="light">{tr('Conectamos OFSC con tu ecosistema', 'We Connect OFSC with Your Ecosystem')}</h2>
            <p className="light">{tr('Tenemos experiencia integrando Oracle Field Service Cloud con los principales sistemas empresariales del mercado.', 'We have experience integrating Oracle Field Service Cloud with the main enterprise systems on the market.')}</p>
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
              <text x="250" y="244" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">OFSC</text>
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
      <section id="consultoria" className="sec-consultoria">
        <div className="container">
          <div className="section-header center fade-up">
            <div className="section-eyebrow">{tr('CONSULTORÍA', 'CONSULTING')}</div>
            <h2>{tr('Consultoría estratégica en Field Service', 'Strategic Field Service Consulting')}</h2>
            <p>{tr('Analizamos tu operación actual y diseñamos la estrategia óptima para maximizar la eficiencia de tu fuerza de trabajo en campo.', 'We analyze your current operation and design the optimal strategy to maximize the efficiency of your field workforce.')}</p>
          </div>
          <div className="consulting-grid">
            {[
              { d: 'd1', num: '01', icon: <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>, title: tr('Diagnóstico', 'Diagnosis'), desc: tr('Relevamos tu operación actual, procesos, sistemas y pain points para entender dónde estás y a dónde querés llegar en Field Service.', 'We survey your current operation, processes, systems, and pain points to understand where you are and where you want to go in Field Service.') },
              { d: 'd2', num: '02', icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>, title: tr('Diseño de solución', 'Solution Design'), desc: tr('Diseñamos la arquitectura de la solución óptima para tu negocio: plataforma, módulos, integraciones y flujos de trabajo.', 'We design the optimal solution architecture for your business: platform, modules, integrations, and workflows.') },
              { d: 'd3', num: '03', icon: <svg viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>, title: tr('Hoja de ruta', 'Roadmap'), desc: tr('Definimos un plan de implementación por etapas, con hitos claros, recursos necesarios y métricas de éxito para cada fase.', 'We define a phased implementation plan with clear milestones, required resources, and success metrics for each phase.') },
            ].map((c, i) => (
              <div key={i} className={`consulting-card fade-up ${c.d}`}>
                <div className="consulting-num">{c.num}</div>
                <div className="consulting-icon">{c.icon}</div>
                <div className="consulting-title">{c.title}</div>
                <div className="consulting-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOPORTE ── */}
      <section id="soporte" className="sec-soporte">
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
                {[tr('Tickets de soporte por email', 'Email support tickets'), tr('SLA 48hs respuesta', '48h response SLA'), tr('Parches y actualizaciones', 'Patches and updates'), tr('Documentación técnica', 'Technical documentation')].map((f, i) => <li key={i} className="soporte-feature"><div className="soporte-check"></div><span>{f}</span></li>)}
              </ul>
              <div className="soporte-cta"><a href="#contacto" className="btn-ghost soporte-btn-ghost" onClick={(e) => { e.preventDefault(); scrollTo('contacto'); }}>{tr('Consultar →', 'Inquire →')}</a></div>
            </div>
            <div className="soporte-card featured fade-up d2">
              <div className="soporte-badge">{tr('Más elegido', 'Most Popular')}</div>
              <div className="soporte-plan">{tr('Professional', 'Professional')}</div>
              <div className="soporte-desc">{tr('Soporte proactivo con un equipo dedicado. Para operaciones en crecimiento que requieren agilidad y mejora continua.', 'Proactive support with a dedicated team. For growing operations that require agility and continuous improvement.')}</div>
              <ul className="soporte-features">
                {[tr('Todo lo del plan Basic', 'Everything in Basic plan'), tr('SLA 8hs respuesta', '8h response SLA'), tr('Reuniones mensuales de revisión', 'Monthly review meetings'), tr('Consultoría funcional incluida', 'Functional consulting included'), tr('Capacitación continua', 'Continuous training'), tr('Acceso prioritario al equipo', 'Priority team access')].map((f, i) => <li key={i} className="soporte-feature"><div className="soporte-check"></div><span>{f}</span></li>)}
              </ul>
              <div className="soporte-cta"><a href="#contacto" className="btn-primary" style={{ fontSize: '14px', padding: '12px 24px' }} onClick={(e) => { e.preventDefault(); scrollTo('contacto'); }}>{tr('Consultar →', 'Inquire →')}</a></div>
            </div>
            <div className="soporte-card fade-up d3">
              <div className="soporte-plan">{tr('Enterprise', 'Enterprise')}</div>
              <div className="soporte-desc">{tr('Soporte full dedicado para operaciones complejas de gran escala con requerimientos críticos de uptime.', 'Full dedicated support for complex, large-scale operations with critical uptime requirements.')}</div>
              <ul className="soporte-features">
                {[tr('Todo lo del plan Professional', 'Everything in Professional plan'), tr('SLA 2hs respuesta', '2h response SLA'), tr('Recurso dedicado Connexa', 'Dedicated Connexa resource'), tr('Monitoreo proactivo 24/7', 'Proactive 24/7 monitoring'), tr('Roadmap de mejoras trimestral', 'Quarterly improvement roadmap'), tr('Horas de desarrollo incluidas', 'Development hours included')].map((f, i) => <li key={i} className="soporte-feature"><div className="soporte-check"></div><span>{f}</span></li>)}
              </ul>
              <div className="soporte-cta"><a href="#contacto" className="btn-ghost soporte-btn-ghost" onClick={(e) => { e.preventDefault(); scrollTo('contacto'); }}>{tr('Consultar →', 'Inquire →')}</a></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESARROLLO ── */}
      <section id="desarrollo" className="sec-desarrollo">
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
      <section id="training" className="sec-training">
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
      <section id="contacto" className="sec-contacto">
        <div className="container">
          <div className="form-wrap">
            <div className="form-left">
              <h2 dangerouslySetInnerHTML={{ __html: tr('¿Listo para transformar<br/>tu <em>Field Service</em>?', 'Ready to transform<br/>your <em>Field Service</em>?') }} />
              <p>{tr('Contactanos y diseñamos juntos la solución ideal para tu empresa.', "Contact us and we'll design together the ideal solution for your company.")}</p>
              <div className="form-trust">
                {[tr('Sin costo. Sin compromiso.', 'No cost. No commitment.'), tr('Respondemos en menos de 24 horas', 'We respond in less than 24 hours'), tr('Partner certificado Oracle y Zinier', 'Certified Oracle and Zinier Partner'), tr('+50 proyectos de Field Service', '+50 Field Service projects')].map((item, i) => (
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

      <button ref={ctaRef} className="cta-flotante" onClick={() => scrollTo('contacto')}>
        {tr('HABLAR CON UN EXPERTO', 'TALK TO AN EXPERT')}
      </button>
    </>
  );
}
