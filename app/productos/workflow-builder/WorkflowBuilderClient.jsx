'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLang } from '@/context/LanguageContext';

const WB_CASOS = [
  {
    num: '01',
    titleEs: 'Automatización de actividades OFS', titleEn: 'OFS Activity Automation',
    badgeEs: '✦ Automatización + IA', badgeEn: '✦ Automation + AI',
    descEs: 'Recibí eventos de OFS en tiempo real, ejecutá acciones automáticas y notificá a Slack, Teams o sistemas externos sin escribir una línea de código.',
    descEn: 'Receive OFS events in real time, execute automatic actions and notify Slack, Teams or external systems without writing a single line of code.',
  },
  {
    num: '02',
    titleEs: 'Agente de IA integrado', titleEn: 'Integrated AI Agent',
    badgeEs: '✦ IA nativa', badgeEn: '✦ Native AI',
    descEs: 'Conectá Slack, Teams o WhatsApp con OFS mediante un agente de IA. Consultá horarios, estados y datos de campo en lenguaje natural desde cualquier canal.',
    descEn: 'Connect Slack, Teams or WhatsApp with OFS through an AI agent. Query schedules, statuses and field data in natural language from any channel.',
  },
  {
    num: '03',
    titleEs: 'Backup de chats de Collaboration', titleEn: 'Collaboration Chat Backup',
    badgeEs: '✦ Automatización', badgeEn: '✦ Automation',
    descEs: 'Capturá todos los mensajes de OFS Collaboration automáticamente y guardalos en tu base de datos para auditoría y trazabilidad completa.',
    descEn: 'Automatically capture all OFS Collaboration messages and store them in your database for complete audit and traceability.',
  },
  {
    num: '04',
    titleEs: 'Alerta inteligente de inventarios', titleEn: 'Smart Inventory Alert',
    badgeEs: '✦ IA disponible', badgeEn: '✦ AI available',
    descEs: 'Detectá cuando un técnico no tiene el inventario requerido y enviá alertas instantáneas por Email, Slack o Teams al supervisor.',
    descEn: 'Detect when a technician lacks required inventory and send instant alerts via Email, Slack or Teams to the supervisor.',
  },
  {
    num: '05',
    titleEs: 'Monitoreo de formularios', titleEn: 'Form Monitoring',
    badgeEs: '✦ Automatización', badgeEn: '✦ Automation',
    descEs: 'Cada vez que se guarda un formulario en OFS, enviá la información automáticamente a cualquier sistema externo vía webhook o API.',
    descEn: 'Every time a form is saved in OFS, automatically send the information to any external system via webhook or API.',
  },
];

const WB_TABS = [
  { key: 'constructor', label: 'Constructor visual' },
  { key: 'ejecuciones', label: 'Ejecuciones' },
  { key: 'orquestaciones', label: 'Orquestaciones' },
  { key: 'panel', label: 'Panel principal' },
];

export default function WorkflowBuilderClient() {
  const { lang } = useLang();
  const router = useRouter();
  const ctaRef = useRef(null);

  const [activeCaso, setActiveCaso] = useState(0);
  const [activeTab, setActiveTab] = useState('constructor');
  const [formSent, setFormSent] = useState(false);
  const casosContainerRef = useRef(null);
  const caseRefs = useRef([]);

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

  useEffect(() => {
    const container = casosContainerRef.current;
    if (!container) return;
    const observers = [];
    caseRefs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.intersectionRatio >= 0.5) setActiveCaso(idx); },
        { root: container, threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollToCase = (idx) => {
    const container = casosContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' });
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* ── HERO FULLSCREEN ── */}
      <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #0d1b3e 0%, #172554 60%, #1a3a2a 100%)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '0' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}>
          <defs>
            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#71B136"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(113,177,54,0.12) 0%, transparent 70%)', top: '-100px', right: '20%', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '80px 60px', alignItems: 'center', gap: '80px', position: 'relative', zIndex: 2 }}>
          {/* Columna izquierda 48% */}
          <div style={{ flex: '0 0 48%' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(113,177,54,0.12)', border: '1px solid rgba(113,177,54,0.3)', borderRadius: '999px', padding: '8px 18px', marginBottom: '32px' }}>
              <svg width="16" height="14" viewBox="0 0 32 28" fill="none">
                <path d="M23 2l1.2 4L28.5 7.5l-4.3 1.2L23 13l-1.2-4.3L17.5 7.5l4.3-1.2z" fill="#71B136"/>
                <path d="M12 0l.9 3.2L16 4.8l-3.1.9L12 8.8l-.9-3.1L8 4.8l3.1-.9z" fill="#71B136" opacity="0.7"/>
                <path d="M26 17l.7 2.3L29 21l-2.3.7L26 24l-.7-2.3L23 21l2.3-.7z" fill="#71B136" opacity="0.5"/>
              </svg>
              <span style={{ color: '#71B136', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em' }}>
                {tr('Impulsado por Inteligencia Artificial', 'Powered by Artificial Intelligence')}
              </span>
            </div>
            <div style={{ fontSize: '64px', fontWeight: 900, lineHeight: 1.05, color: 'white', marginBottom: '8px' }}>Workflow Builder</div>
            <div style={{ fontSize: '64px', fontWeight: 900, color: '#71B136', marginBottom: '16px' }}>✦ AI</div>
            <div style={{ fontSize: '22px', color: 'rgba(255,255,255,0.7)', fontWeight: 400, marginBottom: '24px', lineHeight: 1.5 }}>
              {tr('Automatizá tus procesos OFSC sin código', 'Automate your OFSC processes without code')}
            </div>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: '0 0 40px 0', maxWidth: '460px' }}>
              {tr('Construí y ejecutá workflows programados sobre entidades de Oracle Field Service de forma visual y sencilla. Triggers, condiciones, acciones y notificaciones — todo sin código.', 'Build and execute scheduled workflows on Oracle Field Service entities visually and simply. Triggers, conditions, actions and notifications — all without code.')}
            </p>
            <div style={{ display: 'flex', gap: '40px', marginBottom: '48px' }}>
              {[
                { num: '+40', lbl: tr('APIs de OFS', 'OFS APIs') },
                { num: '0',   lbl: tr('Líneas de código', 'Lines of code') },
                { num: '99+', lbl: tr('Workflows activos', 'Active workflows') },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '36px', fontWeight: 800, color: '#71B136' }}>{s.num}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.lbl}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button onClick={() => scrollTo('casos-uso')} style={{ background: '#71B136', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
                {tr('Ver más →', 'Learn more →')}
              </button>
              <button onClick={() => scrollTo('demo')} style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '16px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: 400, cursor: 'pointer' }}>
                {tr('Solicitar acceso', 'Request access')}
              </button>
            </div>
          </div>
          {/* Columna derecha 52% */}
          <div style={{ flex: '0 0 52%' }}>
            <div style={{ width: '100%', position: 'relative', transform: 'perspective(1200px) rotateY(-4deg) rotateX(2deg)', transformStyle: 'preserve-3d' }}>
              <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(ellipse, rgba(113,177,54,0.15) 0%, transparent 70%)', borderRadius: '20px', zIndex: 0 }} />
              <div style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 50px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)', position: 'relative', zIndex: 1 }}>
                <div style={{ height: '40px', background: '#1e1e2e', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '7px' }}>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FF5F57' }} />
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FFBD2E' }} />
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28CA41' }} />
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '6px', height: '22px', margin: '0 12px', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>newwfbuilder.fsmtool.com/workflows</span>
                  </div>
                </div>
                <img src="/assets/wb-canvas.png" style={{ width: '100%', display: 'block', objectFit: 'cover' }} alt="Workflow Builder" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES FRANJA ── */}
      <div style={{ background: '#0d1b3e', padding: '32px 60px' }}>
        <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { icon: <svg key="i0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, text: tr('Sin código — solo drag & drop', 'No code — just drag & drop') },
            { icon: <svg key="i1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, text: tr('Editor visual de workflows', 'Visual workflow editor') },
            { icon: <svg key="i2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, text: tr('+40 APIs de OFS nativas', '+40 native OFS APIs') },
            { icon: <svg key="i3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, text: tr('Triggers en tiempo real', 'Real-time triggers') },
            { icon: <svg key="i4" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, text: tr('Slack, Teams, email integrado', 'Slack, Teams, email integrated') },
          ].map((f, i) => (
            <div key={i} style={{ flex: 1, padding: '0 40px', display: 'flex', alignItems: 'center', gap: '12px', borderRight: i < 4 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              {f.icon}
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 500 }}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CASOS DE USO — SCROLL SNAP ── */}
      <section id="casos-uso" style={{ position: 'relative' }}>
        <div
          ref={casosContainerRef}
          style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}
        >
          {WB_CASOS.map((caso, idx) => {
            const isDark = idx % 2 === 0;
            const bg = isDark ? '#172554' : '#F3F4F6';
            const fg = isDark ? 'white' : '#172554';
            const fgSub = isDark ? 'rgba(255,255,255,0.6)' : '#6B7280';
            const badgeBg = isDark ? 'rgba(113,177,54,0.2)' : '#F0FDF4';
            const numDeco = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(23,37,84,0.05)';
            const mockupBg = isDark ? '#1e3a5f' : '#172554';
            return (
              <div
                key={idx}
                ref={(el) => { caseRefs.current[idx] = el; }}
                style={{ height: '100vh', width: '100%', scrollSnapAlign: 'start', scrollSnapStop: 'always', display: 'flex', position: 'relative', overflow: 'hidden', background: bg }}
              >
                {/* Columna izquierda 40% */}
                <div style={{ width: '40%', padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ position: 'absolute', top: '50%', left: '-20px', transform: 'translateY(-50%)', fontSize: '280px', fontWeight: 900, lineHeight: 1, color: numDeco, userSelect: 'none', zIndex: 1, pointerEvents: 'none' }}>
                    {caso.num}
                  </div>
                  <div style={{ color: '#71B136', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', marginBottom: '20px', zIndex: 2, position: 'relative' }}>
                    {tr('CASOS DE USO', 'USE CASES')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '20px', zIndex: 2, position: 'relative' }}>
                    <span style={{ fontSize: '56px', fontWeight: 900, color: '#71B136', lineHeight: 1 }}>{caso.num}</span>
                    <h2 style={{ fontSize: '32px', fontWeight: 800, lineHeight: 1.2, color: fg, margin: 0 }}>{tr(caso.titleEs, caso.titleEn)}</h2>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, marginBottom: '24px', zIndex: 2, background: badgeBg, color: '#71B136', alignSelf: 'flex-start', position: 'relative' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" fill="#71B136"/>
                    </svg>
                    {tr(caso.badgeEs, caso.badgeEn)}
                  </div>
                  <p style={{ fontSize: '17px', lineHeight: 1.7, maxWidth: '400px', color: fgSub, zIndex: 2, margin: 0, position: 'relative' }}>
                    {tr(caso.descEs, caso.descEn)}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '48px', zIndex: 2, position: 'relative' }}>
                    {WB_CASOS.map((_, dotIdx) => (
                      <div
                        key={dotIdx}
                        onClick={() => scrollToCase(dotIdx)}
                        style={{ width: dotIdx === activeCaso ? '32px' : '8px', height: '4px', borderRadius: '2px', background: dotIdx === activeCaso ? '#71B136' : 'rgba(113,177,54,0.3)', transition: 'all 0.3s ease', cursor: 'pointer' }}
                      />
                    ))}
                  </div>
                </div>
                {/* Columna derecha 60% */}
                <div style={{ width: '60%', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ width: '100%', maxWidth: '760px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.25)', position: 'relative' }}>
                    <div style={{ height: '40px', background: '#e8e8ed', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '7px' }}>
                      <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FF5F57' }} />
                      <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FFBD2E' }} />
                      <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28CA41' }} />
                    </div>
                    <div style={{ background: mockupBg, height: '520px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', fontSize: '320px', fontWeight: 900, color: 'rgba(255,255,255,0.03)', userSelect: 'none', lineHeight: 1 }}>
                        {caso.num}
                      </div>
                      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ position: 'relative', zIndex: 2 }}>
                        <rect x="4" y="10" width="48" height="36" rx="6" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
                        <circle cx="18" cy="24" r="4" fill="rgba(255,255,255,0.2)"/>
                        <path d="M4 38l14-10 10 7 8-6 20 13" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none"/>
                      </svg>
                      <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '20px', fontWeight: 700, textAlign: 'center', maxWidth: '360px', position: 'relative', zIndex: 2 }}>
                        {tr(caso.titleEs, caso.titleEn)}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', letterSpacing: '0.08em', position: 'relative', zIndex: 2 }}>
                        {tr('Imagen próximamente', 'Image coming soon')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Navegación lateral fija */}
        <div style={{ position: 'fixed', right: '32px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 100 }}>
          {WB_CASOS.map((_, idx) => (
            <div
              key={idx}
              onClick={() => scrollToCase(idx)}
              style={{ width: idx === activeCaso ? '12px' : '8px', height: idx === activeCaso ? '12px' : '8px', borderRadius: '50%', background: idx === activeCaso ? '#71B136' : 'rgba(113,177,54,0.3)', cursor: 'pointer', transition: 'all 0.3s ease' }}
            />
          ))}
        </div>
      </section>

      {/* ── TABS / MÓDULOS ── */}
      <div className="valor-section white">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label fade-up">{tr('Módulos', 'Modules')}</span>
            <h2 className="fade-up d1">{tr('Todo lo que podés hacer', 'Everything you can do')}</h2>
          </div>
          <div className="func-tabs fade-up d1">
            {WB_TABS.map((tab) => (
              <button key={tab.key} className={`func-tab${activeTab === tab.key ? ' active' : ''}`} onClick={() => setActiveTab(tab.key)}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className={`func-panel${activeTab === 'constructor' ? ' active' : ''} fade-up d2`}>
            <div className="func-text">
              <div className="func-module-badge"><span>{tr('Editor de workflows','Workflow editor')}</span></div>
              <h3>{tr('Constructor visual drag & drop','Visual drag & drop builder')}</h3>
              <p>{tr('Diseñá workflows complejos arrastrando nodos al canvas. Conectá condiciones, acciones sobre OFSC, loops y notificaciones en una interfaz clara y poderosa.','Design complex workflows by dragging nodes onto the canvas. Connect conditions, OFSC actions, loops, and notifications in a clear and powerful interface.')}</p>
              <div className="func-actions">
                {[tr('Paleta de nodos: If, Switch, Loop, Wait, Try/Catch','Node palette: If, Switch, Loop, Wait, Try/Catch'), tr('Acciones directas sobre APIs de Oracle Field Service','Direct actions on Oracle Field Service APIs'), tr('Nodo Notify: webhooks a Slack, Teams, email','Notify node: webhooks to Slack, Teams, email'), tr('Nodo AI Agent: consultas inteligentes sobre OFSC','AI Agent node: intelligent queries on OFSC'), tr('Botón "Probar" para ejecutar en sandbox','"Test" button to run in sandbox')].map((item, i) => (
                  <div key={i} className="func-action-item"><div className="func-action-dot"></div>{item}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="browser-frame"><div className="browser-toolbar"><div className="browser-dots"><span></span><span></span><span></span></div><div className="browser-address">Workflow Builder · {tr('Editor','Editor')}</div></div>
              <img src="/assets/wb-canvas.png" style={{ width: '100%', display: 'block' }} alt="Workflow Builder editor" /></div>
            </div>
          </div>

          <div className={`func-panel${activeTab === 'ejecuciones' ? ' active' : ''}`}>
            <div className="func-text">
              <div className="func-module-badge"><span>{tr('Monitoreo en tiempo real','Real-time monitoring')}</span></div>
              <h3>{tr('Historial y logs de ejecuciones','Execution history and logs')}</h3>
              <p>{tr('Monitoreá cada ejecución de tus workflows en tiempo real. Filtrá por estado, revisá los logs detallados de cada paso y exportá para auditoría.','Monitor every execution of your workflows in real time. Filter by status, review detailed logs of each step, and export for auditing.')}</p>
              <div className="func-actions">
                {[tr('Vista en tiempo real de todas las ejecuciones','Real-time view of all executions'), tr('Filtros: Running · Success · Error · Pending','Filters: Running · Success · Error · Pending'), tr('Panel lateral con logs JSON detallados','Side panel with detailed JSON logs'), tr('Exportación completa para auditoría','Full export for auditing')].map((item, i) => (
                  <div key={i} className="func-action-item"><div className="func-action-dot"></div>{item}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="browser-frame"><div className="browser-toolbar"><div className="browser-dots"><span></span><span></span><span></span></div><div className="browser-address">Workflow Builder · {tr('Ejecuciones','Executions')}</div></div>
              <img src="/assets/wb-ejecuciones.png" style={{ width: '100%', display: 'block' }} alt="Workflow Builder ejecuciones" /></div>
            </div>
          </div>

          <div className={`func-panel${activeTab === 'orquestaciones' ? ' active' : ''}`}>
            <div className="func-text">
              <div className="func-module-badge"><span>{tr('Automatización reactiva','Reactive automation')}</span></div>
              <h3>{tr('Orquestaciones: trigger → workflow','Orchestrations: trigger → workflow')}</h3>
              <p>{tr('Conectá triggers de eventos OFSC con tus workflows para ejecutarlos automáticamente.','Connect OFSC event triggers to your workflows to run them automatically.')}</p>
              <div className="func-actions">
                {[tr('Vinculación de cualquier trigger a cualquier workflow','Link any trigger to any workflow'), tr('Toggle de activación/pausa sin borrar configuración','Activation/pause toggle without deleting configuration'), tr('Ejecución reactiva: trigger recibido → workflow disparado','Reactive execution: trigger received → workflow fired')].map((item, i) => (
                  <div key={i} className="func-action-item"><div className="func-action-dot"></div>{item}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="browser-frame"><div className="browser-toolbar"><div className="browser-dots"><span></span><span></span><span></span></div><div className="browser-address">Workflow Builder · {tr('Orquestaciones','Orchestrations')}</div></div>
              <img src="/assets/wb-orquestaciones.png" style={{ width: '100%', display: 'block' }} alt="Workflow Builder orquestaciones" /></div>
            </div>
          </div>

          <div className={`func-panel${activeTab === 'panel' ? ' active' : ''}`}>
            <div className="func-text">
              <div className="func-module-badge"><span>{tr('Visibilidad operacional','Operational visibility')}</span></div>
              <h3>{tr('Panel principal de actividad','Main activity panel')}</h3>
              <p>{tr('Visión completa del estado de tu plataforma: ejecuciones recientes, tasa de éxito, errores en las últimas 24h y estado de todos tus workflows.','Complete view of your platform status: recent executions, success rate, errors in the last 24h, and status of all your workflows.')}</p>
              <div className="func-actions">
                {[tr('KPIs en tiempo real: ejecuciones, tasa de éxito, errores','Real-time KPIs: executions, success rate, errors'), tr('Gráfico de actividad: 24h · 7d · 30d','Activity chart: 24h · 7d · 30d'), tr('Estado de workflows activos vs pausados','Status of active vs paused workflows')].map((item, i) => (
                  <div key={i} className="func-action-item"><div className="func-action-dot"></div>{item}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="browser-frame"><div className="browser-toolbar"><div className="browser-dots"><span></span><span></span><span></span></div><div className="browser-address">Workflow Builder · {tr('Panel Principal','Main Panel')}</div></div>
              <img src="/assets/wb-panel.png" style={{ width: '100%', display: 'block' }} alt="Workflow Builder panel" /></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FORMULARIO ── */}
      <div className="form-cta-section" id="demo">
        <div className="container">
          <div className="form-inner">
            <div className="form-left">
              <span className="section-label">{tr('Demo gratuita', 'Free demo')}</span>
              <h2 dangerouslySetInnerHTML={{ __html: tr('Empezá a automatizar<br/>tu operación <em>OFSC hoy</em>', 'Start automating<br/>your <em>OFSC operation today</em>') }} />
              <p>{tr('Agendá una demo. Te mostramos Workflow Builder construyendo un caso de uso real de tu operación.', "Schedule a demo. We'll show you Workflow Builder building a real use case from your operation.")}</p>
              <div className="form-trust">
                {[tr('Sin costo. Sin compromiso.','No cost. No commitment.'), tr('Demo con tu caso de uso real en OFSC','Demo with your real OFSC use case'), tr('Respondemos en menos de 24hs hábiles','We respond in less than 24 business hours')].map((item, i) => (
                  <div key={i} className="form-trust-item"><div className="form-trust-check"></div><span>{item}</span></div>
                ))}
              </div>
            </div>
            <div className="form-right">
              <h3>{tr('Solicitá tu demo de Workflow Builder', 'Request your Workflow Builder demo')}</h3>
              {!formSent ? (
                <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}>
                  <div className="form-row">
                    <div className="form-group"><label>{tr('Nombre *','First name *')}</label><input type="text" placeholder={tr('Tu nombre','Your name')} required /></div>
                    <div className="form-group"><label>{tr('Apellido *','Last name *')}</label><input type="text" placeholder={tr('Tu apellido','Your last name')} required /></div>
                  </div>
                  <div className="form-group"><label>{tr('Empresa *','Company *')}</label><input type="text" placeholder={tr('Nombre de tu empresa','Your company name')} required /></div>
                  <div className="form-group"><label>{tr('Email corporativo *','Corporate email *')}</label><input type="email" placeholder="tu@empresa.com" required /></div>
                  <div className="form-group">
                    <label>{tr('¿Qué proceso querés automatizar?','What process do you want to automate?')}</label>
                    <select>
                      <option value="">{tr('Seleccioná una opción','Select an option')}</option>
                      <option>{tr('Notificaciones automáticas','Automatic notifications')}</option>
                      <option>{tr('Asignación automática de técnicos','Automatic technician assignment')}</option>
                      <option>{tr('Escalados por SLA','SLA escalations')}</option>
                      <option>{tr('Actualización de inventario','Inventory update')}</option>
                      <option>{tr('Otro proceso','Other process')}</option>
                    </select>
                  </div>
                  <div className="form-group"><label>{tr('Contanos tu caso de uso','Tell us your use case')}</label><textarea placeholder={tr('Describí el proceso que querés automatizar...','Describe the process you want to automate...')}></textarea></div>
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
