import { useEffect, useRef, useState } from 'react';
import { Head } from 'vite-react-ssg';
import { Image, Link } from '@/lib/next-compat';
import { useLang } from '@/context/LanguageContext';

export default function ProductosClient() {
  const { lang } = useLang();
  const ctaRef = useRef(null);
  const wfImgRef = useRef(null);
  const fsmImgRef = useRef(null);
  const [wfPrimaryHover, setWfPrimaryHover] = useState(false);
  const [wfSecondaryHover, setWfSecondaryHover] = useState(false);
  const [fsmPrimaryHover, setFsmPrimaryHover] = useState(false);
  const [fsmSecondaryHover, setFsmSecondaryHover] = useState(false);

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

  useEffect(() => {
    const targets = [wfImgRef.current, fsmImgRef.current].filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.animation = 'mockupSlideIn 0.75s cubic-bezier(0.22,0.61,0.36,1) forwards';
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Head>
        <title>Productos | Connexa Services</title>
        <meta name="description" content="FSMTool y Workflow Builder — soluciones propias de Connexa construidas sobre Oracle Field Service Cloud para operaciones masivas y automatización de procesos." />
        <meta name="keywords" content="Oracle Field Service, OFSC, Field Service Management, FSMTool, Workflow Builder, implementación OFSC" />
      </Head>
      <style>{`
        @keyframes mockupSlideIn {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
      `}</style>
      {/* ── HERO ── */}
      <section className="prod-hero prod-hero-section">
        <div className="container prod-hero-inner" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '58%' }}>
          <nav className="breadcrumb">
            <Link href="/">{tr('Inicio', 'Home')}</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-cur">{tr('Productos', 'Products')}</span>
          </nav>
          <div className="page-hero-eyebrow">
            <div className="page-hero-eyebrow-dot"></div>
            <span>{tr('Soluciones propias · Desarrolladas por Connexa', 'Proprietary Solutions · Built by Connexa')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <h1 className="page-hero-h1" style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: tr('Herramientas que potencian<br/>tu plataforma <em>Oracle Field Service</em>', 'Tools that power<br/>your <em>Oracle Field Service</em> platform') }} />
            <Image src="/assets/OFSC-hq.png" alt="Oracle Field Service" width={44} height={44} sizes="44px" style={{ borderRadius: '10px', flexShrink: 0 }} />
          </div>
          <p className="page-hero-sub">{tr('Apps web nativas construidas sobre Oracle Field Service Cloud para resolver los desafíos operacionales más complejos del Field Service, sin fricciones y sin código adicional.', 'Native web apps built on Oracle Field Service Cloud to solve the most complex Field Service operational challenges, without friction and without additional code.')}</p>
          </div>
          <div className="prod-hero-svg" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="420" height="320" viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
              <g style={{ animation: 'heroFloat 3.5s ease-in-out infinite', filter: 'drop-shadow(0 0 18px #71B136)' }}>
                <rect x="20" y="20" width="175" height="115" rx="14" fill="#1e3a5f" stroke="#71B136" strokeWidth="1"/>
                <svg x="32" y="30" width="32" height="28" viewBox="0 0 28 24" fill="none">
                  <path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/>
                  <path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/>
                  <path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/>
                </svg>
                <text x="32" y="90" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="15" fontWeight="700" fill="white">Workflow</text>
                <text x="32" y="110" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="15" fontWeight="700" fill="white">Builder</text>
              </g>
              <g style={{ animation: 'heroFloat 3.5s ease-in-out 1.2s infinite', filter: 'drop-shadow(0 0 18px #71B136)' }}>
                <rect x="225" y="185" width="165" height="115" rx="14" fill="#1e3a5f" stroke="#71B136" strokeWidth="1"/>
                <svg x="237" y="197" width="32" height="28" viewBox="0 0 28 24" fill="none">
                  <path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/>
                  <path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/>
                  <path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/>
                </svg>
                <text x="237" y="265" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="15" fontWeight="700" fill="white">FSMTool</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .prod-hero-svg     { display: none !important; }
          .prod-hero-section { padding-bottom: 24px !important; }

          .prod-wfb-layout   { flex-direction: column !important; padding: 48px 20px !important; }
          .prod-wfb-text     { display: contents !important; }
          .prod-wfb-layout .showcase-name    { order: 1 !important; }
          .prod-wfb-layout .showcase-tagline { order: 2 !important; }
          .prod-wfb-image    { order: 3 !important; max-width: 100% !important; margin-left: 0 !important; margin-top: 16px !important; }
          .prod-wfb-layout .showcase-desc    { order: 4 !important; margin-top: 16px !important; }
          .prod-wfb-layout .benefits-list    { order: 5 !important; }
          .prod-wfb-layout .showcase-ctas    { order: 6 !important; }

          .prod-fsm-layout   { flex-direction: column !important; padding: 48px 20px !important; }
          .prod-fsm-text     { display: contents !important; }
          .prod-fsm-layout .showcase-name    { order: 1 !important; }
          .prod-fsm-layout .showcase-tagline { order: 2 !important; }
          .prod-fsm-image    { order: 3 !important; max-width: 100% !important; margin-left: 0 !important; margin-top: 16px !important; }
          .prod-fsm-layout .showcase-desc    { order: 4 !important; margin-top: 16px !important; }
          .prod-fsm-layout .benefits-list    { order: 5 !important; }
          .prod-fsm-layout .showcase-ctas    { order: 6 !important; }
        }
      `}</style>

      {/* ── WORKFLOW BUILDER SHOWCASE (FIRST) ── */}
      <div className="showcase alt" id="prod-workflow">
        <div className="container" style={{ maxWidth: '100%', width: '100%' }}>
          <div className="showcase-grid mirror prod-wfb-layout" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '0', padding: '48px 64px', marginTop: '40px' }}>
            <div className="fade-up d2 prod-wfb-image" style={{ maxWidth: '55%', marginLeft: '40px' }}>
              <div className="browser-frame" ref={wfImgRef} style={{ opacity: 0 }}>
                <div className="browser-toolbar">
                  <div className="browser-dots"><span></span><span></span><span></span></div>
                  <div className="browser-address">newwfbuilder.fsmtool.com/workflows</div>
                </div>
                <img src="/assets/WFBuilder01.png" style={{ width: '100%', display: 'block', borderRadius: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }} alt="Workflow Builder canvas" />
              </div>
            </div>
            <div className="showcase-text prod-wfb-text" style={{ alignSelf: 'flex-start', paddingTop: '0', flex: 1 }}>
              <h2 className="showcase-name fade-up d1" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Workflow Builder <span style={{color:'#172554', fontSize:'0.7em', fontWeight:700, display:'inline-flex', alignItems:'center', gap:'4px'}}>
                <svg width="58" height="54" viewBox="0 0 28 24" fill="none"><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg> AI</span></h2>
              <p className="showcase-tagline fade-up d2">{tr('Automatizá tus procesos OFSC sin código', 'Automate your OFSC processes without code')}</p>
              <p className="showcase-desc fade-up d2">{tr('Workflow Builder es un constructor visual de flujos de trabajo para Oracle Field Service Cloud. Permite diseñar, testear y publicar procesos de campo complejos sin escribir una línea de código.', 'Workflow Builder is a visual workflow builder for Oracle Field Service Cloud. It lets you design, test, and publish complex field processes without writing a single line of code.')}</p>
              <div className="benefits-list fade-up d3">
                <div className="benefit-row">
                  <div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="7" width="10" height="10" rx="1"/><path d="M7 12H4"/><path d="M20 12h-3"/><path d="M12 7V4"/><path d="M12 20v-3"/></svg></div>
                  <div><div className="benefit-title">{tr('Agente de IA integrado', 'Integrated AI agent')}</div><div className="benefit-desc">{tr('Agente de IA para crear y optimizar tus workflows automáticamente.', 'AI agent to create and optimize your workflows automatically.')}</div></div>
                </div>
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
              </div>
              <div className="showcase-ctas fade-up d4">
                <Link href="/productos/workflow-builder" className="btn-primary"
                  onMouseEnter={() => setWfPrimaryHover(true)}
                  onMouseLeave={() => setWfPrimaryHover(false)}
                  style={wfPrimaryHover
                    ? { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(23,37,84,0.28)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }
                    : { transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>
                  {tr('Ver más', 'Learn more')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </Link>
                <Link href="/productos/workflow-builder" className="btn-secondary"
                  onMouseEnter={() => setWfSecondaryHover(true)}
                  onMouseLeave={() => setWfSecondaryHover(false)}
                  style={wfSecondaryHover
                    ? { transform: 'translateY(-2px)', boxShadow: '0 4px 16px rgba(23,37,84,0.18)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }
                    : { transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>{tr('Solicitar acceso', 'Request access')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FSMTOOL SHOWCASE (SECOND) ── */}
      <div className="showcase" id="prod-fsmtool">
        <div className="container" style={{ maxWidth: '100%', width: '100%' }}>
          <div className="showcase-grid prod-fsm-layout" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '0', padding: '48px 64px', marginTop: '40px' }}>
            <div className="showcase-text prod-fsm-text" style={{ alignSelf: 'flex-start', paddingTop: '0', flex: 1 }}>
              <h2 className="showcase-name fade-up d1" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>FSMTool <span style={{color:'#172554', fontSize:'0.7em', fontWeight:700, display:'inline-flex', alignItems:'center', gap:'4px'}}><svg width="28" height="24" viewBox="0 0 28 24" fill="none"><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg> AI</span></h2>
              <p className="showcase-tagline fade-up d2">{tr('Operaciones masivas en OFSC, sin complejidad', 'Bulk OFSC operations, without complexity')}</p>
              <p className="showcase-desc fade-up d2">{tr('FSMTool es una suite de administración y monitoreo de operaciones construida nativamente sobre Oracle Field Service Cloud. Permite a los equipos de operaciones ejecutar acciones masivas, visualizar el estado en tiempo real y automatizar los procesos del día a día.', 'FSMTool is an operations administration and monitoring suite built natively on Oracle Field Service Cloud. It lets operations teams execute bulk actions, visualize status in real time, and automate day-to-day processes.')}</p>
              <div className="benefits-list fade-up d3">
                <div className="benefit-row">
                  <div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="7" width="10" height="10" rx="1"/><path d="M7 12H4"/><path d="M20 12h-3"/><path d="M12 7V4"/><path d="M12 20v-3"/></svg></div>
                  <div><div className="benefit-title">{tr('Agente de IA integrado', 'Integrated AI agent')}</div><div className="benefit-desc">{tr('Agente de IA para crear y optimizar tus operaciones automáticamente.', 'AI agent to create and optimize your operations automatically.')}</div></div>
                </div>
                <div className="benefit-row">
                  <div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><polyline points="7 14 10 10 13 12 17 7"/></svg></div>
                  <div><div className="benefit-title">{tr('Dashboard inteligente con IA', 'Intelligent AI dashboard')}</div><div className="benefit-desc">{tr('Agente de IA para automatizar la gestión masiva de tu operación.', 'AI agent to automate bulk management of your operation.')}</div></div>
                </div>
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
              </div>
              <div className="showcase-ctas fade-up d4">
                <Link href="/productos/fsmtool" className="btn-primary"
                  onMouseEnter={() => setFsmPrimaryHover(true)}
                  onMouseLeave={() => setFsmPrimaryHover(false)}
                  style={fsmPrimaryHover
                    ? { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(23,37,84,0.28)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }
                    : { transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>
                  {tr('Ver más', 'Learn more')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </Link>
                <Link href="/productos/fsmtool" className="btn-secondary"
                  onMouseEnter={() => setFsmSecondaryHover(true)}
                  onMouseLeave={() => setFsmSecondaryHover(false)}
                  style={fsmSecondaryHover
                    ? { transform: 'translateY(-2px)', boxShadow: '0 4px 16px rgba(23,37,84,0.18)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }
                    : { transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>{tr('Solicitar acceso', 'Request access')}</Link>
              </div>
            </div>
            <div className="fade-up d2 prod-fsm-image" style={{ maxWidth: '55%', marginLeft: '40px' }}>
              <div className="browser-frame" ref={fsmImgRef} style={{ opacity: 0 }}>
                <div className="browser-toolbar">
                  <div className="browser-dots"><span></span><span></span><span></span></div>
                  <div className="browser-address">app.connexaservices.com/fsmtool</div>
                </div>
                <img src="/assets/fsmtool-home.png" style={{ width: '100%', display: 'block', borderRadius: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }} alt="FSMTool dashboard" />
              </div>
            </div>
          </div>
        </div>
      </div>

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
