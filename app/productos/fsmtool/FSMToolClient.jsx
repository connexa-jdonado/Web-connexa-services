'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLang } from '@/context/LanguageContext';

const FSM_CASOS = [
  { title: 'Reasignación masiva de órdenes', desc: 'Seleccioná cientos de órdenes y reasignálas a nuevos técnicos en segundos, sin hacerlo una por una.', metric: 'De 2 horas a 3 minutos' },
  { title: 'Visualización de fuerza de trabajo', desc: 'Extraé y visualizá todos los técnicos, estados y disponibilidad en tiempo real desde un solo lugar.', metric: 'Visibilidad 100% del equipo en campo' },
  { title: 'Transferencia masiva de inventarios', desc: 'Mové inventario entre técnicos, depósitos y zonas de forma masiva sin procesar cada item.', metric: 'Gestión de miles de items en minutos' },
  { title: 'Reasignación masiva de zonas', desc: 'Reorganizá las zonas de trabajo de tu fuerza laboral completa de forma simultánea.', metric: 'Reorganización territorial en un clic' },
  { title: 'Actualización masiva de estados', desc: 'Cambiá el estado de cientos de actividades simultáneamente — completadas, canceladas, reprogramadas.', metric: 'Miles de actualizaciones en segundos' },
];

const FSM_TABS = [
  { key: 'actividades', label: 'Actividades' },
  { key: 'recursos', label: 'Recursos' },
  { key: 'inventario', label: 'Inventario' },
  { key: 'descargas', label: 'Descargas' },
];

export default function FSMToolClient() {
  const { lang } = useLang();
  const router = useRouter();
  const ctaRef = useRef(null);

  const [activeCaso, setActiveCaso] = useState(0);
  const [videoTitle, setVideoTitle] = useState(FSM_CASOS[0].title);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [activeTab, setActiveTab] = useState('actividades');
  const [formSent, setFormSent] = useState(false);

  const tr = (es, en) => (lang === 'es' ? es : en);

  useEffect(() => {
    const els = document.querySelectorAll('.fade-up');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang, activeTab]);

  useEffect(() => {
    const onScroll = () => {
      if (ctaRef.current) ctaRef.current.classList.toggle('visible', window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCasoClick = (idx) => {
    setVideoOpacity(0);
    setTimeout(() => {
      setActiveCaso(idx);
      setVideoTitle(FSM_CASOS[idx].title);
      setVideoOpacity(1);
    }, 150);
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .fsm-hero-layout    { flex-direction: column !important; padding: 48px 20px !important; gap: 24px !important; }
          .fsm-hero-left      { flex: none !important; width: 100% !important; }
          .fsm-hero-right     { display: none !important; }
          .fsm-hero-title     { font-size: 36px !important; }
          .fsm-hero-subtitle  { font-size: 36px !important; }
          .fsm-features-wrapper { padding: 24px 20px !important; }
          .fsm-features-bar   { flex-wrap: wrap !important; gap: 16px !important; }
          .fsm-feature-item   { flex: none !important; width: calc(50% - 8px) !important; padding: 0 8px !important; }
          .fsm-modulos-hdr    { padding: 48px 20px !important; }
          .fsm-modulos-title  { font-size: 28px !important; }
          .fsm-modulos-stats  { gap: 32px !important; flex-wrap: wrap !important; justify-content: center !important; }
          .fsm-modulos-cards  { padding: 48px 20px !important; }
          .fsm-modulos-grid   { grid-template-columns: 1fr !important; }
          .fsm-apis-section   { padding: 48px 20px !important; }
          .fsm-apis-grid      { grid-template-columns: 1fr !important; }
          .fsm-cta-section    { padding: 48px 20px !important; }
          .fsm-cta-line       { font-size: 28px !important; }
        }
      `}</style>
      <style>{`
        @media (max-width: 768px) {
          .fsm-hero-right  { flex: none !important; width: 100% !important; display: none !important; }
          .fsm-hero-stats  { gap: 24px !important; flex-wrap: wrap !important; }
        }
        @media (min-width: 769px) and (max-width: 1023px) {
          .fsm-hero-layout   { padding: 60px 40px !important; gap: 40px !important; }
          .fsm-hero-left     { flex: 0 0 50% !important; }
          .fsm-hero-right    { flex: 0 0 45% !important; }
          .fsm-features-bar  { flex-wrap: wrap !important; gap: 8px !important; }
          .fsm-feature-item  { padding: 0 20px !important; }
        }
      `}</style>
      {/* ── HERO FULLSCREEN ── */}
      <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #0d1b3e 0%, #172554 60%, #1a3a2a 100%)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '0' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}>
          <defs>
            <pattern id="dots-fsm" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#71B136"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-fsm)"/>
        </svg>
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(113,177,54,0.12) 0%, transparent 70%)', top: '-100px', right: '20%', pointerEvents: 'none' }} />
        <div className="fsm-hero-layout" style={{ display: 'flex', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '80px 60px', alignItems: 'center', gap: '80px', position: 'relative', zIndex: 2 }}>
          {/* Columna izquierda 48% */}
          <div className="fsm-hero-left" style={{ flex: '0 0 48%' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(113,177,54,0.12)', border: '1px solid rgba(113,177,54,0.3)', borderRadius: '999px', padding: '8px 18px', marginBottom: '32px' }}>
              <svg width="1em" height="0.85em" viewBox="0 0 28 24" fill="none" style={{display:'inline-block', verticalAlign:'middle'}}><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg>
              <span style={{ color: '#71B136', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em' }}>
                {tr('Impulsado por Inteligencia Artificial', 'Powered by Artificial Intelligence')}
              </span>
            </div>
            <div className="fsm-hero-title" style={{ fontSize: '64px', fontWeight: 900, lineHeight: 1.05, color: 'white', marginBottom: '8px' }}>FSMTool</div>
            <div className="fsm-hero-subtitle" style={{ fontSize: '64px', fontWeight: 900, color: '#71B136', marginBottom: '16px' }}><span style={{display:'inline-flex', alignItems:'center', gap:'12px', verticalAlign:'middle'}}><svg width="1em" height="0.85em" viewBox="0 0 28 24" fill="none" style={{display:'inline-block', verticalAlign:'middle'}}><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg>AI</span></div>
            <div style={{ fontSize: '22px', color: 'rgba(255,255,255,0.7)', fontWeight: 400, marginBottom: '24px', lineHeight: 1.5 }}>
              {tr('Administrá Oracle Field Service Cloud sin límites', 'Manage Oracle Field Service Cloud without limits')}
            </div>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: '0 0 40px 0', maxWidth: '460px' }}>
              {tr('FSMTool es la herramienta web que permite gestionar de forma masiva actividades, recursos e inventarios en Oracle Field Service Cloud de manera fácil e intuitiva.', 'FSMTool is the web tool that lets you manage activities, resources, and inventories in Oracle Field Service Cloud in bulk, easily and intuitively.')}
            </p>
            <div className="fsm-hero-stats" style={{ display: 'flex', gap: '40px', marginBottom: '48px' }}>
              {[
                { num: '30+', lbl: tr('Implementaciones OFS', 'OFS Implementations') },
                { num: '99%', lbl: tr('Satisfacción', 'Satisfaction') },
                { num: '8+',  lbl: tr('Años de experiencia', 'Years of experience') },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '36px', fontWeight: 800, color: '#71B136' }}>{s.num}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.lbl}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button onClick={() => scrollTo('demo')} style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '16px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: 400, cursor: 'pointer' }}>
                {tr('Solicitar acceso', 'Request access')}
              </button>
            </div>
          </div>
          {/* Columna derecha 58% */}
          <div className="fsm-hero-right" style={{ flex: '0 0 58%' }}>
            <div style={{ width: '100%', position: 'relative', transform: 'perspective(1200px) rotateY(-4deg) rotateX(2deg)', transformStyle: 'preserve-3d' }}>
              <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(ellipse, rgba(113,177,54,0.15) 0%, transparent 70%)', borderRadius: '20px', zIndex: 0 }} />
              <div style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 50px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)', position: 'relative', zIndex: 1, background: '#F3F4F6' }}>
                <div style={{ height: '40px', background: '#E5E7EB', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '7px' }}>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FF5F57' }} />
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FFBD2E' }} />
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28CA41' }} />
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '6px', height: '22px', margin: '0 12px', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>app.fsmtool.com/dashboard</span>
                  </div>
                </div>
                <img src="/assets/fsmtool-home.png" style={{ width: '100%', display: 'block', objectFit: 'cover' }} alt="FSMTool dashboard" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES FRANJA ── */}
      <div className="fsm-features-wrapper" style={{ background: '#0d1b3e', padding: '32px 60px' }}>
        <div className="fsm-features-bar" style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { icon: <svg key="f0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, text: tr('×10 más rápido que operación manual', '×10 faster than manual operation') },
            { icon: <svg key="f1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, text: tr('Interfaz sin curva de aprendizaje', 'Zero-learning-curve interface') },
            { icon: <svg key="f2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, text: tr('Hasta 100k registros por operación', 'Up to 100k records per operation') },
            { icon: <svg key="f3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, text: tr('Operaciones masivas nativas OFSC', 'Native bulk OFSC operations') },
            { icon: <svg key="f4" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, text: tr('Soporte de expertos certificados OFSC', 'Certified OFSC expert support') },
          ].map((f, i) => (
            <div key={i} className="fsm-feature-item" style={{ flex: 1, padding: '0 40px', display: 'flex', alignItems: 'center', gap: '12px', borderRight: i < 4 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              {f.icon}
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 500 }}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CASOS DE USO ── */}
      {/* <section className="casos-v2-section">
        <div className="container">
          <div className="casos-v2-header fade-up">
            <div className="casos-v2-eyebrow">{tr('CASOS DE USO', 'USE CASES')}</div>
            <h2 className="casos-v2-title">{tr('Mirá FSMTOOL en acción', 'See FSMTOOL in action')}</h2>
            <p className="casos-v2-sub">{tr('Seleccioná un caso de uso y vé cómo FSMTool lo resuelve en segundos.', 'Select a use case and see how FSMTool solves it in seconds.')}</p>
          </div>
          <div className="casos-v2-layout">
            <div className="casos-v2-list">
              {FSM_CASOS.map((caso, idx) => (
                <div
                  key={idx}
                  className={`caso-item${activeCaso === idx ? ' active' : ''}`}
                  onClick={() => handleCasoClick(idx)}
                >
                  <div className="caso-item-header">
                    <span className="caso-item-num">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="caso-item-title">{caso.title}</span>
                  </div>
                  <div className="caso-item-body">
                    <p className="caso-item-desc">{caso.desc}</p>
                    <span className="caso-item-metric">{caso.metric}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="casos-v2-video">
              <div className="video-frame">
                <div className="video-toolbar">
                  <div className="video-dots"><span></span><span></span><span></span></div>
                </div>
                <div className="video-area" style={{ opacity: videoOpacity, transition: 'opacity 0.3s ease' }}>
                  <div className="video-placeholder">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    <p className="video-title">{videoTitle}</p>
                    <span className="video-soon">{tr('Próximamente — demo en vivo', 'Coming soon — live demo')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── MÓDULOS ── */}

      {/* BLOQUE 1: HEADER */}
      <div className="fsm-modulos-hdr" style={{ width:'100%', background:'linear-gradient(135deg, #0d1b3e 0%, #172554 100%)', padding:'80px 60px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.1, pointerEvents:'none' }} aria-hidden="true">
          <defs><pattern id="dots-fsm-mod" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#71B136"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#dots-fsm-mod)"/>
        </svg>
        <div style={{ position:'relative', zIndex:2 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(113,177,54,0.12)', border:'1px solid rgba(113,177,54,0.3)', borderRadius:'999px', padding:'8px 20px', marginBottom:'24px' }}>
            <svg width="1em" height="0.85em" viewBox="0 0 28 24" fill="none" style={{ display:'inline-block', verticalAlign:'middle', fontSize:'16px' }}><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg>
            <span style={{ color:'#71B136', fontSize:'12px', fontWeight:600, letterSpacing:'0.1em' }}>{tr('Impulsado por Inteligencia Artificial', 'Powered by Artificial Intelligence')}</span>
          </div>
          <h2 className="fsm-modulos-title" style={{ fontSize:'52px', fontWeight:900, color:'white', lineHeight:1.1, marginBottom:'16px', position:'relative', zIndex:2 }}>{tr('Todo lo que podés hacer', 'Everything you can do')}</h2>
          <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.6)', maxWidth:'600px', margin:'0 auto 16px', lineHeight:1.7, position:'relative', zIndex:2 }}>{tr('Gestioná tu operación de Oracle Field Service de forma masiva, sin límites y con IA.', 'Manage your Oracle Field Service operation massively, without limits and with AI.')}</p>
          <div className="fsm-modulos-stats" style={{ display:'flex', justifyContent:'center', gap:'80px', marginTop:'40px', position:'relative', zIndex:2 }}>
            {[['4', tr('Módulos','Modules')], ['17', tr('APIs disponibles','Available APIs')], ['100%', tr('Gestión masiva','Bulk management')]].map(([num, label]) => (
              <div key={label} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'40px', fontWeight:900, color:'#71B136' }}>{num}</div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', letterSpacing:'0.1em', textTransform:'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BLOQUE 2: MÓDULOS CARDS */}
      <div className="fsm-modulos-cards" style={{ width:'100%', background:'#ffffff', padding:'80px 60px' }}>
        <div style={{ maxWidth:'1400px', margin:'0 auto' }}>
          <div style={{ marginBottom:'8px' }}>
            <span style={{ color:'#71B136', fontSize:'11px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase' }}>{tr('MÓDULOS','MODULES')}</span>
          </div>
          <h3 style={{ fontSize:'36px', fontWeight:800, color:'#172554', marginBottom:'16px' }}>{tr('Módulos de gestión masiva','Bulk management modules')}</h3>
          <p style={{ color:'#6B7280', fontSize:'16px', marginBottom:'48px' }}>{tr('Operaciones masivas sobre actividades, recursos e inventarios de OFS.','Bulk operations on OFS activities, resources and inventories.')}</p>
          <div className="fsm-modulos-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'24px' }}>

            {/* Card ACTIVIDADES */}
            <div style={{ background:'#F8FAFC', borderRadius:'16px', padding:'32px', border:'1px solid #E5E7EB' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <div style={{ fontSize:'20px', fontWeight:700, color:'#172554', marginTop:'16px', marginBottom:'8px' }}>{tr('Actividades','Activities')}</div>
              <div style={{ color:'#6B7280', fontSize:'14px', lineHeight:1.6, marginBottom:'16px' }}>{tr('Creá, actualizá y gestioná el estado de actividades de forma masiva.','Create, update and manage activity status in bulk.')}</div>
              <span style={{ background:'#F0FDF4', color:'#71B136', fontSize:'11px', fontWeight:600, padding:'4px 12px', borderRadius:'999px', display:'inline-block' }}>{tr('Gestión masiva','Bulk management')}</span>
            </div>

            {/* Card RECURSOS */}
            <div style={{ background:'#F8FAFC', borderRadius:'16px', padding:'32px', border:'1px solid #E5E7EB' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              <div style={{ fontSize:'20px', fontWeight:700, color:'#172554', marginTop:'16px', marginBottom:'8px' }}>{tr('Recursos','Resources')}</div>
              <div style={{ color:'#6B7280', fontSize:'14px', lineHeight:1.6, marginBottom:'16px' }}>{tr('Actualizá propiedades, zonas de trabajo, skills y horarios de técnicos masivamente.','Update properties, work zones, skills and schedules of technicians in bulk.')}</div>
              <span style={{ background:'#F0FDF4', color:'#71B136', fontSize:'11px', fontWeight:600, padding:'4px 12px', borderRadius:'999px', display:'inline-block' }}>{tr('Gestión masiva','Bulk management')}</span>
            </div>

            {/* Card INVENTARIOS */}
            <div style={{ background:'#F8FAFC', borderRadius:'16px', padding:'32px', border:'1px solid #E5E7EB' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5" strokeLinecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              <div style={{ fontSize:'20px', fontWeight:700, color:'#172554', marginTop:'16px', marginBottom:'8px' }}>{tr('Inventarios','Inventories')}</div>
              <div style={{ color:'#6B7280', fontSize:'14px', lineHeight:1.6, marginBottom:'16px' }}>{tr('Gestioná y transferí inventarios entre técnicos y ubicaciones de forma masiva.','Manage and transfer inventories between technicians and locations in bulk.')}</div>
              <span style={{ background:'#F0FDF4', color:'#71B136', fontSize:'11px', fontWeight:600, padding:'4px 12px', borderRadius:'999px', display:'inline-block' }}>{tr('Gestión masiva','Bulk management')}</span>
            </div>

            {/* Card DESCARGAS */}
            <div style={{ background:'#F8FAFC', borderRadius:'16px', padding:'32px', border:'1px solid #E5E7EB' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <div style={{ fontSize:'20px', fontWeight:700, color:'#172554', marginTop:'16px', marginBottom:'8px' }}>{tr('Descargas','Downloads')}</div>
              <div style={{ color:'#6B7280', fontSize:'14px', lineHeight:1.6, marginBottom:'16px' }}>{tr('Descargá actividades masivamente para reportes, análisis y procesamiento externo.','Download activities in bulk for reports, analysis and external processing.')}</div>
              <span style={{ background:'#F0FDF4', color:'#71B136', fontSize:'11px', fontWeight:600, padding:'4px 12px', borderRadius:'999px', display:'inline-block' }}>{tr('Exportación masiva','Bulk export')}</span>
            </div>

          </div>
        </div>
      </div>

      {/* BLOQUE 3: APIs */}
      <div className="fsm-apis-section" style={{ width:'100%', background:'#F8FAFC', padding:'80px 60px' }}>
        <div style={{ maxWidth:'1400px', margin:'0 auto' }}>
          <div style={{ marginBottom:'8px' }}>
            <span style={{ color:'#71B136', fontSize:'11px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase' }}>{tr('APIs DE OFS','OFS APIs')}</span>
          </div>
          <h3 style={{ fontSize:'36px', fontWeight:800, color:'#172554', marginBottom:'16px' }}>{tr('+17 APIs de Oracle Field Service','17+ Oracle Field Service APIs')}</h3>
          <p style={{ color:'#6B7280', fontSize:'16px', marginBottom:'48px' }}>{tr('Todas disponibles para gestión masiva. Sin límites de volumen.','All available for bulk management. No volume limits.')}</p>

          <div style={{ background:'linear-gradient(135deg, #172554 0%, #1a3a6b 100%)', borderRadius:'12px', padding:'20px 32px', marginBottom:'32px', display:'flex', alignItems:'center', gap:'16px' }}>
            <svg width="1em" height="0.85em" viewBox="0 0 28 24" fill="none" style={{ display:'inline-block', verticalAlign:'middle', fontSize:'24px', flexShrink:0 }}><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg>
            <div>
              <div style={{ color:'white', fontSize:'16px', fontWeight:700 }}>{tr('100% Gestión Masiva','100% Bulk Management')}</div>
              <div style={{ color:'rgba(255,255,255,0.65)', fontSize:'14px' }}>{tr('Todas las operaciones soportan procesamiento masivo de registros sin límite.','All operations support unlimited bulk record processing.')}</div>
            </div>
          </div>

          <div className="fsm-apis-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px' }}>
            {[
              { name:'Activities', count:'6', endpoints:[tr('Create activities','Create activities'), tr('Update activities','Update activities'), tr('Change activity status','Change activity status'), tr('Change activity date','Change activity date'), tr('Change activity resource','Change activity resource'), tr('Download activities','Download activities')] },
              { name:'Resources', count:'5', endpoints:[tr('Create resources','Create resources'), tr('Update resource properties','Update resource properties'), tr('Update resources work zones','Update resources work zones'), tr('Update resources work skills','Update resources work skills'), tr('Update resources work schedules','Update resources work schedules')] },
              { name:'Inventories', count:'6', endpoints:[tr('Get an inventory','Get an inventory'), tr('Install an inventory','Install an inventory'), tr('Delete an inventory','Delete an inventory'), tr('Update an inventory','Update an inventory'), tr('Undo deinstall an inventory','Undo deinstall an inventory'), tr('Undo install an inventory','Undo install an inventory')] },
            ].map((cat) => (
              <div key={cat.name} style={{ background:'white', borderRadius:'16px', padding:'28px', border:'1px solid #E5E7EB', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
                  <span style={{ fontSize:'16px', fontWeight:700, color:'#172554' }}>{cat.name}</span>
                  <span style={{ background:'#F0FDF4', color:'#71B136', fontSize:'12px', fontWeight:600, padding:'4px 10px', borderRadius:'999px' }}>{cat.count} APIs</span>
                </div>
                {cat.endpoints.map((ep, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'8px 0', borderBottom: i < cat.endpoints.length - 1 ? '1px solid #F3F4F6' : 'none', fontSize:'13px', color:'#6B7280' }}>
                    <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#71B136', flexShrink:0, display:'inline-block' }}></span>
                    {ep}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BLOQUE 4: CTA IA FINAL */}
      <div className="fsm-cta-section" style={{ width:'100%', background:'linear-gradient(135deg, #071428 0%, #172554 50%, #1a3a2a 100%)', padding:'80px 60px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.1, pointerEvents:'none' }} aria-hidden="true">
          <defs><pattern id="dots-fsm2" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#71B136"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#dots-fsm2)"/>
        </svg>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'500px', height:'500px', background:'radial-gradient(circle, rgba(113,177,54,0.12) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }}></div>
        <div style={{ position:'relative', zIndex:2 }}>
          <svg width="48" height="40" viewBox="0 0 28 24" fill="none" style={{ display:'block', margin:'0 auto 24px' }}><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg>
          <div className="fsm-cta-line" style={{ color:'white', fontSize:'44px', fontWeight:900, lineHeight:1.1 }}>{tr('Gestioná tu operación','Manage your operation')}</div>
          <div className="fsm-cta-line" style={{ color:'#71B136', fontSize:'44px', fontWeight:900, lineHeight:1.1, marginBottom:'16px' }}>{tr('de forma masiva con IA.','massively with AI.')}</div>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:'18px', maxWidth:'500px', margin:'0 auto 40px', lineHeight:1.7 }}>{tr('Sin límites de volumen. Sin código. Con el poder de la Inteligencia Artificial.','No volume limits. No code. With the power of Artificial Intelligence.')}</p>
          <div style={{ display:'flex', justifyContent:'center', gap:'16px', flexWrap:'wrap' }}>
            <a href="#demo" style={{ background:'#71B136', color:'white', padding:'16px 40px', borderRadius:'8px', fontSize:'16px', fontWeight:600, textDecoration:'none', display:'inline-block' }}>{tr('Solicitar acceso','Request access')}</a>
            <a href="#demo" style={{ border:'1px solid rgba(255,255,255,0.3)', color:'white', padding:'16px 40px', borderRadius:'8px', fontSize:'16px', textDecoration:'none', display:'inline-block' }}>{tr('Ver más','Learn more')}</a>
          </div>
        </div>
      </div>

      {/* ── FORMULARIO ── */}
      <div className="form-cta-section" id="demo">
        <div className="container">
          <div className="form-inner">
            <div className="form-left">
              <span className="section-label">{tr('Demo gratuita', 'Free demo')}</span>
              <h2 dangerouslySetInnerHTML={{ __html: tr('Probá FSMTool en tu<br/><em>entorno OFSC</em>', 'Try FSMTool in your<br/><em>OFSC environment</em>') }} />
              <p>{tr('Agendá una demo personalizada. Te mostramos FSMTool funcionando con tus propios datos y casos de uso reales.', "Schedule a personalized demo. We'll show you FSMTool working with your own data and real use cases.")}</p>
              <div className="form-trust">
                {[tr('Sin costo. Sin compromiso.','No cost. No commitment.'), tr('Demo con tu ambiente OFSC real','Demo with your real OFSC environment'), tr('Respondemos en menos de 24hs hábiles','We respond in less than 24 business hours'), tr('Expertos certificados en OFSC','Certified OFSC experts')].map((item, i) => (
                  <div key={i} className="form-trust-item"><div className="form-trust-check"></div><span>{item}</span></div>
                ))}
              </div>
            </div>
            <div className="form-right">
              <h3>{tr('Solicitá tu demo de FSMTool', 'Request your FSMTool demo')}</h3>
              {!formSent ? (
                <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}>
                  <div className="form-row">
                    <div className="form-group"><label>{tr('Nombre *','First name *')}</label><input type="text" placeholder={tr('Tu nombre','Your name')} required /></div>
                    <div className="form-group"><label>{tr('Apellido *','Last name *')}</label><input type="text" placeholder={tr('Tu apellido','Your last name')} required /></div>
                  </div>
                  <div className="form-group"><label>{tr('Empresa *','Company *')}</label><input type="text" placeholder={tr('Nombre de tu empresa','Your company name')} required /></div>
                  <div className="form-group"><label>{tr('Email corporativo *','Corporate email *')}</label><input type="email" placeholder="tu@empresa.com" required /></div>
                  <div className="form-group">
                    <label>{tr('¿Cómo usás Oracle Field Service Cloud?','How do you use Oracle Field Service Cloud?')}</label>
                    <select>
                      <option value="">{tr('Seleccioná una opción','Select an option')}</option>
                      <option>Utilities</option>
                      <option>{tr('Telecomunicaciones','Telecommunications')}</option>
                      <option>{tr('Servicios de campo','Field services')}</option>
                      <option>{tr('Logística','Logistics')}</option>
                      <option>{tr('Otro','Other')}</option>
                    </select>
                  </div>
                  <div className="form-group"><label>{tr('¿Qué problema querés resolver?','What problem do you want to solve?')}</label><textarea placeholder={tr('Contanos tu caso de uso...','Tell us your use case...')}></textarea></div>
                  <button type="submit" className="btn-primary form-submit">{tr('Solicitar demo gratuita →','Request free demo →')}</button>
                  <p className="form-note">{tr('Tus datos están seguros. No enviamos spam.','Your data is safe. We don\'t send spam.')}</p>
                </form>
              ) : (
                <div className="form-success">
                  <div className="form-success-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
                  <h4>{tr('¡Solicitud recibida!','Request received!')}</h4>
                  <p>{tr('Nos pondremos en contacto en menos de 24hs hábiles.','We will get in touch in less than 24 business hours.')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button ref={ctaRef} className="cta-flotante" onClick={() => scrollTo('demo')}>
        {tr('AGENDAR DEMO', 'SCHEDULE DEMO')}
      </button>
    </>
  );
}
