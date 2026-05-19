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
  const casosSectionRef = useRef(null);
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

  useEffect(() => {
    const section = casosSectionRef.current;
    const container = casosContainerRef.current;
    if (!section || !container) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.9) {
          container.style.overflowY = 'scroll';
          document.body.style.overflow = 'hidden';
        } else {
          container.style.overflowY = 'hidden';
          document.body.style.overflow = '';
        }
      },
      { threshold: 0.9 }
    );
    io.observe(section);
    const onWheel = (e) => {
      const atTop    = container.scrollTop <= 0;
      const atBottom = container.scrollTop >= container.scrollHeight - container.clientHeight - 1;
      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        container.style.overflowY = 'hidden';
        document.body.style.overflow = '';
      }
    };
    container.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      io.disconnect();
      container.removeEventListener('wheel', onWheel);
      document.body.style.overflow = '';
    };
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
              <svg width="1em" height="0.85em" viewBox="0 0 28 24" fill="none" style={{display:'inline-block', verticalAlign:'middle'}}><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg>
              <span style={{ color: '#71B136', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em' }}>
                {tr('Impulsado por Inteligencia Artificial', 'Powered by Artificial Intelligence')}
              </span>
            </div>
            <div style={{ fontSize: '64px', fontWeight: 900, lineHeight: 1.05, color: 'white', marginBottom: '8px' }}>Workflow Builder</div>
            <div style={{ fontSize: '64px', fontWeight: 900, color: '#71B136', marginBottom: '16px' }}><span style={{display:'inline-flex', alignItems:'center', gap:'12px', verticalAlign:'middle'}}><svg width="1em" height="0.85em" viewBox="0 0 28 24" fill="none" style={{display:'inline-block', verticalAlign:'middle'}}><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg>AI</span></div>
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
              <button onClick={() => scrollTo('demo')} style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '16px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: 400, cursor: 'pointer' }}>
                {tr('Solicitar acceso', 'Request access')}
              </button>
            </div>
          </div>
          {/* Columna derecha 52% */}
          <div style={{ flex: '0 0 58%' }}>
            <div style={{ width: '100%', position: 'relative', transform: 'perspective(1200px) rotateY(-4deg) rotateX(2deg)', transformStyle: 'preserve-3d' }}>
              <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(ellipse, rgba(113,177,54,0.15) 0%, transparent 70%)', borderRadius: '20px', zIndex: 0 }} />
              <div style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 50px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)', position: 'relative', zIndex: 1, background: '#F3F4F6' }}>
                <div style={{ height: '40px', background: '#E5E7EB', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '7px' }}>
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
      <section ref={casosSectionRef} id="casos-uso" style={{ position: 'relative' }}>
        <div
          ref={casosContainerRef}
          style={{ height: '100vh', overflowY: 'hidden', scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}
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
      <div>
        {/* BLOQUE 1: HEADER */}
        <div style={{ width:'100%', background:'linear-gradient(135deg, #0d1b3e 0%, #172554 100%)', padding:'80px 60px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.1 }} xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="dots-mod-hdr" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#71B136"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dots-mod-hdr)"/>
          </svg>
          <div style={{ position:'relative', zIndex:2 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(113,177,54,0.12)', border:'1px solid rgba(113,177,54,0.3)', borderRadius:'999px', padding:'8px 20px', marginBottom:'24px' }}>
              <svg width="1em" height="0.85em" viewBox="0 0 28 24" fill="none" style={{display:'inline-block', verticalAlign:'middle'}}><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg>
              <span style={{ color:'#71B136', fontSize:'12px', fontWeight:600, letterSpacing:'0.1em' }}>{tr('Impulsado por Inteligencia Artificial', 'Powered by Artificial Intelligence')}</span>
            </div>
            <h2 style={{ fontSize:'52px', fontWeight:900, color:'white', lineHeight:1.1, marginBottom:'16px' }}>{tr('Todo lo que podés hacer', 'Everything you can do')}</h2>
            <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.6)', maxWidth:'600px', margin:'0 auto 16px', lineHeight:1.7 }}>{tr('Sin conocimiento técnico. Describí lo que necesitás en lenguaje natural y la IA configura todo por vos.', 'No technical knowledge needed. Describe what you need in natural language and AI configures everything for you.')}</p>
            <div style={{ display:'flex', justifyContent:'center', gap:'80px', marginTop:'40px' }}>
              {[{num:'+40',lbl:tr('APIs de OFS','OFS APIs')},{num:'3',lbl:tr('Tipos de trigger','Trigger types')},{num:'8',lbl:tr('Entidades OFS','OFS entities')}].map((s,i) => (
                <div key={i} style={{ textAlign:'center' }}>
                  <div style={{ fontSize:'40px', fontWeight:900, color:'#71B136', lineHeight:1 }}>{s.num}</div>
                  <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:'8px' }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BLOQUE 2: TRIGGERS */}
        <div style={{ width:'100%', background:'#ffffff', padding:'80px 60px' }}>
          <div style={{ maxWidth:'1400px', margin:'0 auto' }}>
            <div style={{ fontSize:'11px', color:'#71B136', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'12px' }}>{tr('TIPOS DE TRIGGER','TRIGGER TYPES')}</div>
            <h3 style={{ fontSize:'36px', fontWeight:800, color:'#172554', marginBottom:'48px' }}>{tr('¿Cuándo se ejecuta tu workflow?','When does your workflow run?')}</h3>
            <div style={{ background:'linear-gradient(135deg, #172554 0%, #1a3a6b 100%)', borderRadius:'12px', padding:'20px 32px', marginBottom:'32px', display:'flex', alignItems:'center', gap:'16px' }}>
              <svg width="1em" height="0.85em" viewBox="0 0 28 24" fill="none" style={{display:'inline-block', verticalAlign:'middle'}}><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg>
              <div>
                <div style={{ color:'white', fontSize:'16px', fontWeight:700, marginBottom:'4px' }}>{tr('Asistente IA','AI Assistant')}</div>
                <div style={{ color:'rgba(255,255,255,0.65)', fontSize:'14px' }}>{tr('Describí en lenguaje natural lo que necesitás y la IA configura el trigger','Describe what you need in natural language and AI configures the trigger')}</div>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px' }}>
              <div style={{ background:'#F8FAFC', borderRadius:'16px', padding:'32px', border:'1px solid #E5E7EB' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></svg>
                <div style={{ fontSize:'20px', fontWeight:700, color:'#172554', marginTop:'16px', marginBottom:'8px' }}>Webhook</div>
                <div style={{ color:'#6B7280', fontSize:'14px', marginBottom:'16px' }}>{tr('Petición HTTP desde un sistema externo','HTTP request from an external system')}</div>
                {[tr('Cualquier sistema puede disparar el workflow','Any system can trigger the workflow'),tr('Configuración de payload personalizado','Custom payload configuration'),tr('URL única por workflow','Unique URL per workflow'),tr('Autenticación segura','Secure authentication')].map((f,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'6px 0', fontSize:'13px', color:'#6B7280', borderBottom:'1px solid #F3F4F6' }}>
                    <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#71B136', flexShrink:0, display:'inline-block' }}/>{f}
                  </div>
                ))}
              </div>
              <div style={{ background:'#F8FAFC', borderRadius:'16px', padding:'32px', border:'1px solid #E5E7EB' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <div style={{ fontSize:'20px', fontWeight:700, color:'#172554', marginTop:'16px', marginBottom:'8px' }}>{tr('Programado','Scheduled')}</div>
                <div style={{ color:'#6B7280', fontSize:'14px', marginBottom:'16px' }}>{tr('Se ejecuta según un horario','Runs on a schedule')}</div>
                {[tr('Cada N minutos u horas','Every N minutes or hours'),tr('Diario, semanal o mensual','Daily, weekly or monthly'),tr('Horario personalizado avanzado','Advanced custom schedule'),tr('Sin intervención manual','No manual intervention')].map((f,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'6px 0', fontSize:'13px', color:'#6B7280', borderBottom:'1px solid #F3F4F6' }}>
                    <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#71B136', flexShrink:0, display:'inline-block' }}/>{f}
                  </div>
                ))}
              </div>
              <div style={{ background:'#F8FAFC', borderRadius:'16px', padding:'32px', border:'1px solid #E5E7EB' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                <div style={{ fontSize:'20px', fontWeight:700, color:'#172554', marginTop:'16px', marginBottom:'8px' }}>{tr('Evento OFS','OFS Event')}</div>
                <div style={{ color:'#6B7280', fontSize:'14px', marginBottom:'16px' }}>{tr('Reacciona a eventos de Oracle Field Service','Reacts to Oracle Field Service events')}</div>
                {[tr('Tiempo real — sin polling','Real time — no polling'),tr('8 entidades disponibles','8 entities available'),tr('Múltiples eventos por trigger','Multiple events per trigger'),tr('Filtros por campo y valor','Filters by field and value')].map((f,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'6px 0', fontSize:'13px', color:'#6B7280', borderBottom:'1px solid #F3F4F6' }}>
                    <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#71B136', flexShrink:0, display:'inline-block' }}/>{f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 3: EVENTOS OFS */}
        <div style={{ width:'100%', background:'#0d1b3e', padding:'80px 60px' }}>
          <div style={{ maxWidth:'1400px', margin:'0 auto' }}>
            <div style={{ fontSize:'11px', color:'#71B136', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'12px' }}>{tr('EVENTOS OFS','OFS EVENTS')}</div>
            <h3 style={{ fontSize:'36px', fontWeight:800, color:'white', lineHeight:1.1, marginBottom:'16px' }}>{tr('Escuchá cualquier evento de tu operación','Listen to any event in your operation')}</h3>
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'16px', marginBottom:'48px' }}>{tr('Suscribite a eventos en tiempo real de estas entidades','Subscribe to real-time events from these entities')}</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
              {[
                {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5" strokeLinecap="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>,name:tr('Actividades','Activities'),desc:tr('14 eventos','14 events')},
                {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,name:tr('Inventario','Inventory'),desc:tr('Eventos de stock','Stock events')},
                {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,name:tr('Recursos','Resources'),desc:tr('Eventos de técnicos','Technician events')},
                {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>,name:tr('Rutas','Routes'),desc:tr('Eventos de routing','Routing events')},
                {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,name:tr('Solicitudes','Requests'),desc:tr('Eventos de requests','Request events')},
                {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,name:tr('Colaboración','Collaboration'),desc:tr('Eventos de chats','Chat events')},
                {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,name:tr('Usuarios','Users'),desc:tr('Eventos de users','User events')},
                {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,name:tr('Otros','Others'),desc:tr('Eventos varios','Various events')},
              ].map((e,i) => (
                <div key={i} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', padding:'24px', textAlign:'center' }}>
                  <div style={{ marginBottom:'12px' }}>{e.icon}</div>
                  <div style={{ color:'white', fontSize:'15px', fontWeight:700, marginBottom:'4px' }}>{e.name}</div>
                  <div style={{ color:'rgba(255,255,255,0.45)', fontSize:'12px' }}>{e.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BLOQUE 4: APIs */}
        <div style={{ width:'100%', background:'#F8FAFC', padding:'80px 60px' }}>
          <div style={{ maxWidth:'1400px', margin:'0 auto' }}>
            <div style={{ fontSize:'11px', color:'#71B136', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'12px' }}>{tr('APIs DE OFS','OFS APIs')}</div>
            <h3 style={{ fontSize:'36px', fontWeight:800, color:'#172554', marginBottom:'16px' }}>{tr('+40 APIs de Oracle Field Service','+40 Oracle Field Service APIs')}</h3>
            <p style={{ color:'#6B7280', fontSize:'16px', marginBottom:'48px' }}>{tr('Todas disponibles como nodos en tu workflow. Sin código.','All available as nodes in your workflow. No code.')}</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px' }}>
              {[
                {cat:'Activities',count:'13',items:['Create','Get activities','Get an activity','Cancel','Stop travel','Complete','Delay','Delete','Move','Reopen','Start','Suspend','Update to enroute','Update to notdone']},
                {cat:'Activity Inventories',count:'6',items:['Create customer inventory','Get customer inventories','Get deinstalled inventories','Get installed inventories','Get required inventories','Set required inventories']},
                {cat:'Resources',count:'6',items:['Get a resource','Get child resources','Get descendants','Get resources','Update a resource','Get resource locations']},
                {cat:'Inventories',count:'10',items:['Create','Deinstall','Delete','Get file property','Get inventory','Install','Set file property','Undo deinstall','Undo install','Update']},
                {cat:'Users',count:'2',items:['Get a user','Get users']},
                {cat:'Events & Capacity',count:'3',items:['Get subscriptions','Get capacity area','Get capacity areas']},
              ].map((card,i) => (
                <div key={i} style={{ background:'white', borderRadius:'16px', padding:'28px', border:'1px solid #E5E7EB', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
                    <span style={{ fontSize:'16px', fontWeight:700, color:'#172554' }}>{card.cat}</span>
                    <span style={{ background:'#F0FDF4', color:'#71B136', fontSize:'12px', fontWeight:600, padding:'4px 10px', borderRadius:'999px' }}>{card.count}</span>
                  </div>
                  {card.items.map((item,j) => (
                    <div key={j} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'8px 0', borderBottom:'1px solid #F3F4F6', fontSize:'13px', color:'#6B7280' }}>
                      <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#71B136', flexShrink:0, display:'inline-block' }}/>{item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BLOQUE 5: CTA IA FINAL */}
        <div style={{ width:'100%', background:'linear-gradient(135deg, #071428 0%, #172554 50%, #1a3a2a 100%)', padding:'80px 60px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.1 }} xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="dots-mod-cta" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#71B136"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dots-mod-cta)"/>
          </svg>
          <div style={{ position:'absolute', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(113,177,54,0.15) 0%, transparent 70%)', top:'-100px', left:'50%', transform:'translateX(-50%)', pointerEvents:'none' }}/>
          <div style={{ position:'relative', zIndex:2 }}>
            <div style={{ marginBottom:'24px' }}>
              <svg width="1em" height="0.85em" viewBox="0 0 28 24" fill="none" style={{display:'inline-block', verticalAlign:'middle'}}><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg>
            </div>
            <h2 style={{ fontSize:'44px', fontWeight:900, color:'white', lineHeight:1.2, maxWidth:'700px', margin:'0 auto 16px' }}>
              {tr('Describí lo que necesitás.','Describe what you need.')}
              <br/>
              <span style={{ color:'#71B136' }}>{tr('La IA lo construye por vos.','AI builds it for you.')}</span>
            </h2>
            <p style={{ color:'rgba(255,255,255,0.55)', fontSize:'18px', maxWidth:'500px', margin:'0 auto 40px', lineHeight:1.7 }}>{tr('Sin conocimiento técnico. Sin código. Solo describí tu proceso en lenguaje natural y el Asistente IA configura todo.','No technical knowledge. No code. Just describe your process in natural language and the AI Assistant configures everything.')}</p>
            <div style={{ display:'flex', justifyContent:'center', gap:'16px', flexWrap:'wrap' }}>
              <a href="#demo" style={{ display:'inline-flex', alignItems:'center', background:'#71B136', color:'white', padding:'16px 40px', borderRadius:'8px', fontSize:'16px', fontWeight:600, textDecoration:'none' }}>{tr('Solicitar acceso','Request access')}</a>
              <a href="#demo" style={{ display:'inline-flex', alignItems:'center', border:'1px solid rgba(255,255,255,0.3)', color:'white', padding:'16px 40px', borderRadius:'8px', fontSize:'16px', textDecoration:'none' }}>{tr('Ver demo','See demo')}</a>
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
