'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLang } from '@/context/LanguageContext';

export default function ProductosClient() {
  const { lang } = useLang();
  const router = useRouter();
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
      if (ctaRef.current) ctaRef.current.classList.toggle('visible', window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* ── HERO ── */}
      <section className="prod-hero">
        <div className="container prod-hero-inner">
          <nav className="breadcrumb">
            <Link href="/">{tr('Inicio', 'Home')}</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-cur">{tr('Productos', 'Products')}</span>
          </nav>
          <div className="page-hero-eyebrow">
            <div className="page-hero-eyebrow-dot"></div>
            <span>{tr('Soluciones propias · Desarrolladas por Connexa', 'Proprietary Solutions · Built by Connexa')}</span>
          </div>
          <h1 className="page-hero-h1" dangerouslySetInnerHTML={{ __html: tr('Herramientas que potencian<br/>tu plataforma <em>OFSC</em>', 'Tools that power<br/>your <em>OFSC</em> platform') }} />
          <p className="page-hero-sub">{tr('Apps web nativas construidas sobre Oracle Field Service Cloud para resolver los desafíos operacionales más complejos del Field Service, sin fricciones y sin código adicional.', 'Native web apps built on Oracle Field Service Cloud to solve the most complex Field Service operational challenges, without friction and without additional code.')}</p>
        </div>
      </section>

      {/* ── WORKFLOW BUILDER SHOWCASE (FIRST) ── */}
      <section id="prod-workflow" style={{ width:'100%', minHeight:'100vh', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', background:'linear-gradient(135deg, #0d1b3e 0%, #172554 100%)' }}>
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.12 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots-prod-wb" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#71B136"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-prod-wb)"/>
        </svg>
        <div style={{ display:'flex', width:'100%', maxWidth:'1400px', margin:'0 auto', padding:'80px 60px', alignItems:'center', gap:'80px', position:'relative', zIndex:2 }}>
          <div style={{ width:'45%', display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(113,177,54,0.1)', border:'1px solid rgba(113,177,54,0.25)', borderRadius:'999px', padding:'7px 16px', marginBottom:'24px', width:'fit-content' }}>
              <svg width="24" height="20" viewBox="0 0 24 20" fill="none"><path d="M14 1l.8 2.8 2.8.8-2.8.8L14 8l-.8-2.6-2.8-.8 2.8-.8z" stroke="#71B136" strokeWidth="0.8" fill="#71B136"/><path d="M6 6l.5 1.8 1.8.5-1.8.5L6 11l-.5-1.7-1.8-.5 1.8-.5z" stroke="#71B136" strokeWidth="0.6" fill="#71B136" opacity="0.7"/><path d="M19 10l.4 1.4 1.4.4-1.4.4L19 14l-.4-1.3-1.4-.4 1.4-.4z" stroke="#71B136" strokeWidth="0.5" fill="#71B136" opacity="0.5"/></svg>
              <span style={{ color:'#71B136', fontSize:'12px', fontWeight:600, letterSpacing:'0.08em' }}>{tr('Impulsado por Inteligencia Artificial', 'Powered by Artificial Intelligence')}</span>
            </div>
            <h2 className="showcase-name fade-up d1" style={{ fontSize:'52px', fontWeight:900, color:'white', lineHeight:1.1, marginBottom:'16px' }}>Workflow Builder <span style={{ color:'#71B136' }}>✦ AI</span></h2>
            <p className="showcase-tagline fade-up d2" style={{ fontSize:'20px', color:'rgba(255,255,255,0.65)', marginBottom:'20px' }}>{tr('Automatizá tus procesos OFSC sin código', 'Automate your OFSC processes without code')}</p>
            <p className="showcase-desc fade-up d2" style={{ fontSize:'16px', color:'rgba(255,255,255,0.5)', lineHeight:1.8, marginBottom:'36px', maxWidth:'440px' }}>{tr('Workflow Builder es un constructor visual de flujos de trabajo para Oracle Field Service Cloud. Permite diseñar, testear y publicar procesos de campo complejos sin escribir una línea de código.', 'Workflow Builder is a visual workflow builder for Oracle Field Service Cloud. It lets you design, test, and publish complex field processes without writing a single line of code.')}</p>
            <div className="benefits-list fade-up d3" style={{ color:'rgba(255,255,255,0.8)' }}>
              <div className="benefit-row">
                <div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
                <div><div className="benefit-title">Editor drag &amp; drop</div><div className="benefit-desc">{tr('Arrastrá nodos y condiciones para construir cualquier flujo.', 'Drag nodes and conditions to build any workflow.')}</div></div>
              </div>
              <div className="benefit-row">
                <div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>
                <div><div className="benefit-title">{tr('Integración nativa con OFSC', 'Native OFSC integration')}</div><div className="benefit-desc">{tr('Acceso directo a todas las APIs de Oracle Field Service.', 'Direct access to all Oracle Field Service APIs.')}</div></div>
              </div>
              <div className="benefit-row">
                <div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                <div><div className="benefit-title">{tr('Sandbox de testing', 'Testing sandbox')}</div><div className="benefit-desc">{tr('Simulá cada workflow antes de publicarlo en producción.', 'Simulate each workflow before publishing it to production.')}</div></div>
              </div>
              <div className="benefit-row">
                <div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
                <div><div className="benefit-title">{tr('Autonomía para el negocio', 'Business autonomy')}</div><div className="benefit-desc">{tr('Los equipos de operaciones modifican procesos sin IT.', 'Operations teams modify processes without IT.')}</div></div>
              </div>
              <div className="benefit-row">
                <div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="7" width="10" height="10" rx="1"/><path d="M7 12H4"/><path d="M20 12h-3"/><path d="M12 7V4"/><path d="M12 20v-3"/></svg></div>
                <div><div className="benefit-title">{tr('Agente de IA integrado', 'Integrated AI agent')}</div><div className="benefit-desc">{tr('Agente de IA para crear y optimizar tus workflows automáticamente.', 'AI agent to create and optimize your workflows automatically.')}</div></div>
              </div>
            </div>
            <div className="showcase-ctas fade-up d4">
              <Link href="/productos/workflow-builder" className="btn-primary">
                {tr('Ver más', 'Learn more')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </Link>
              <Link href="/productos/workflow-builder" className="btn-secondary">{tr('Solicitar acceso', 'Request access')}</Link>
            </div>
          </div>
          <div style={{ width:'55%' }}>
            <div style={{ transform:'perspective(1200px) rotateY(-5deg) rotateX(2deg)', boxShadow:'0 50px 120px rgba(0,0,0,0.4)', borderRadius:'14px', overflow:'hidden' }}>
              <div className="browser-toolbar">
                <div className="browser-dots"><span></span><span></span><span></span></div>
                <div className="browser-address">newwfbuilder.fsmtool.com/workflows</div>
              </div>
              <img src="/assets/wb-canvas.png" style={{ width: '100%', display: 'block' }} alt="Workflow Builder canvas" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FSMTOOL SHOWCASE (SECOND) ── */}
      <section id="prod-fsmtool" style={{ width:'100%', minHeight:'100vh', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', background:'#ffffff' }}>
        <div style={{ display:'flex', flexDirection:'row-reverse', width:'100%', maxWidth:'1400px', margin:'0 auto', padding:'80px 60px', alignItems:'center', gap:'80px', position:'relative', zIndex:2 }}>
          <div style={{ width:'45%', display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#F0FDF4', border:'1px solid rgba(113,177,54,0.3)', borderRadius:'999px', padding:'7px 16px', marginBottom:'24px', width:'fit-content' }}>
              <svg width="24" height="20" viewBox="0 0 24 20" fill="none"><path d="M14 1l.8 2.8 2.8.8-2.8.8L14 8l-.8-2.6-2.8-.8 2.8-.8z" stroke="#71B136" strokeWidth="0.8" fill="#71B136"/><path d="M6 6l.5 1.8 1.8.5-1.8.5L6 11l-.5-1.7-1.8-.5 1.8-.5z" stroke="#71B136" strokeWidth="0.6" fill="#71B136" opacity="0.7"/><path d="M19 10l.4 1.4 1.4.4-1.4.4L19 14l-.4-1.3-1.4-.4 1.4-.4z" stroke="#71B136" strokeWidth="0.5" fill="#71B136" opacity="0.5"/></svg>
              <span style={{ color:'#71B136', fontSize:'12px', fontWeight:600, letterSpacing:'0.08em' }}>{tr('Impulsado por Inteligencia Artificial', 'Powered by Artificial Intelligence')}</span>
            </div>
            <h2 className="showcase-name fade-up d1" style={{ fontSize:'52px', fontWeight:900, color:'#172554', lineHeight:1.1, marginBottom:'16px' }}>FSMTool <span style={{ color:'#71B136' }}>✦ AI</span></h2>
            <p className="showcase-tagline fade-up d2" style={{ fontSize:'20px', color:'#6B7280', marginBottom:'20px' }}>{tr('Operaciones masivas en OFSC, sin complejidad', 'Bulk OFSC operations, without complexity')}</p>
            <p className="showcase-desc fade-up d2" style={{ fontSize:'16px', color:'#9CA3AF', lineHeight:1.8, marginBottom:'36px', maxWidth:'440px' }}>{tr('FSMTool es una suite de administración y monitoreo de operaciones construida nativamente sobre Oracle Field Service Cloud. Permite a los equipos de operaciones ejecutar acciones masivas, visualizar el estado en tiempo real y automatizar los procesos del día a día.', 'FSMTool is an operations administration and monitoring suite built natively on Oracle Field Service Cloud. It lets operations teams execute bulk actions, visualize status in real time, and automate day-to-day processes.')}</p>
            <div className="benefits-list fade-up d3">
              <div className="benefit-row">
                <div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg></div>
                <div><div className="benefit-title">{tr('Eficiencia operacional ×3', 'Operational efficiency ×3')}</div><div className="benefit-desc">{tr('Ejecutá acciones sobre miles de órdenes en segundos.', 'Execute actions on thousands of orders in seconds.')}</div></div>
              </div>
              <div className="benefit-row">
                <div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                <div><div className="benefit-title">{tr('Visibilidad en tiempo real', 'Real-time visibility')}</div><div className="benefit-desc">{tr('Dashboard operacional con KPIs y alertas automáticas.', 'Operational dashboard with KPIs and automatic alerts.')}</div></div>
              </div>
              <div className="benefit-row">
                <div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
                <div><div className="benefit-title">{tr('Sin riesgo de errores', 'No risk of errors')}</div><div className="benefit-desc">{tr('Validaciones integradas antes de cada acción masiva.', 'Integrated validations before every bulk action.')}</div></div>
              </div>
              <div className="benefit-row">
                <div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
                <div><div className="benefit-title">{tr('Reportería exportable', 'Exportable reporting')}</div><div className="benefit-desc">{tr('Exportá cualquier vista a Excel o PDF con un clic.', 'Export any view to Excel or PDF with one click.')}</div></div>
              </div>
              <div className="benefit-row">
                <div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><polyline points="7 14 10 10 13 12 17 7"/></svg></div>
                <div><div className="benefit-title">{tr('Dashboard inteligente con IA', 'Intelligent AI dashboard')}</div><div className="benefit-desc">{tr('Agente de IA para automatizar la gestión masiva de tu operación.', 'AI agent to automate bulk management of your operation.')}</div></div>
              </div>
            </div>
            <div className="showcase-ctas fade-up d4">
              <Link href="/productos/fsmtool" className="btn-primary">
                {tr('Ver más', 'Learn more')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </Link>
              <Link href="/productos/fsmtool" className="btn-secondary">{tr('Solicitar acceso', 'Request access')}</Link>
            </div>
          </div>
          <div style={{ width:'55%' }}>
            <div style={{ transform:'perspective(1200px) rotateY(5deg) rotateX(2deg)', boxShadow:'0 50px 120px rgba(0,0,0,0.15)', borderRadius:'14px', overflow:'hidden' }}>
              <div className="browser-toolbar" style={{ background:'#e8e8ed' }}>
                <div className="browser-dots"><span></span><span></span><span></span></div>
                <div className="browser-address">app.connexaservices.com/fsmtool</div>
              </div>
              <img src="/assets/fsmtool-home.png" style={{ width: '100%', display: 'block' }} alt="FSMTool dashboard" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contacto" className="prod-cta">
        <div className="container prod-cta-inner">
          <span className="section-label">{tr('Demo en vivo', 'Live demo')}</span>
          <h2 className="cta-headline" dangerouslySetInnerHTML={{ __html: tr('¿Querés ver los productos<br/><em>en acción</em>?', 'Want to see the products<br/><em>in action</em>?') }} />
          <p className="cta-sub">{tr('Agendá una demo personalizada con nuestro equipo.', 'Schedule a personalized demo with our team.')}</p>
          <div className="cta-btns">
            <a href="/servicios#contacto" className="btn-primary cta-btn-lg">{tr('Agendar demo', 'Schedule demo')}</a>
            <a href="#prod-workflow" className="btn-ghost cta-btn-lg" onClick={(e) => { e.preventDefault(); scrollTo('prod-workflow'); }}>{tr('Ver productos', 'View products')}</a>
          </div>
        </div>
      </section>

      <button ref={ctaRef} className="cta-flotante" onClick={() => scrollTo('contacto')}>
        {tr('AGENDAR DEMO', 'SCHEDULE DEMO')}
      </button>
    </>
  );
}
