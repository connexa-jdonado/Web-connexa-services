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
      <section id="prod-workflow" style={{ width:'100%', minHeight:'100vh', background:'linear-gradient(135deg, #0d1b3e 0%, #172554 60%, #1a3a2a 100%)', position:'relative', overflow:'hidden', display:'flex', alignItems:'center' }}>
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.15 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots-prod-wb" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#71B136"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-prod-wb)"/>
        </svg>
        <div style={{ position:'absolute', top:'-120px', right:'-120px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(113,177,54,0.18) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ display:'flex', width:'100%', maxWidth:'1400px', margin:'0 auto', padding:'100px 60px', alignItems:'center', gap:'80px', position:'relative', zIndex:2 }}>
          <div style={{ width:'45%' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(113,177,54,0.12)', border:'1px solid rgba(113,177,54,0.3)', borderRadius:'999px', padding:'8px 18px', marginBottom:'28px' }}>
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none"><path d="M10 1l.5 1.75L12.25 3.5l-1.75.5L10 5.75l-.5-1.75L7.75 3.5l1.75-.5z" fill="#71B136"/><path d="M5.5 0l.4 1.4L7.25 2l-1.35.4L5.5 3.75l-.4-1.35L3.75 2l1.35-.4z" fill="#71B136" opacity="0.7"/><path d="M11.5 7l.3 1L13 8.5l-1 .3L11.5 9.75l-.3-1L10 8.5l1-.3z" fill="#71B136" opacity="0.5"/></svg>
              <span style={{ color:'#71B136', fontSize:'12px', fontWeight:600, letterSpacing:'0.08em' }}>{tr('Impulsado por Inteligencia Artificial', 'Powered by Artificial Intelligence')}</span>
            </div>
            <h2 style={{ fontSize:'52px', fontWeight:900, color:'white', lineHeight:1.1, marginBottom:'16px' }}>
              {tr('Workflow Builder ', 'Workflow Builder ')}<span style={{ color:'#71B136' }}>✦ AI</span>
            </h2>
            <p style={{ fontSize:'20px', color:'rgba(255,255,255,0.7)', marginBottom:'20px' }}>
              {tr('Automatizá tus procesos OFSC sin código', 'Automate your OFSC processes without code')}
            </p>
            <p style={{ color:'rgba(255,255,255,0.55)', fontSize:'16px', lineHeight:1.8, marginBottom:'32px', maxWidth:'440px' }}>
              {tr('Workflow Builder es un constructor visual de flujos de trabajo para Oracle Field Service Cloud. Permite diseñar, testear y publicar procesos de campo complejos sin escribir una línea de código.', 'Workflow Builder is a visual workflow builder for Oracle Field Service Cloud. It lets you design, test, and publish complex field processes without writing a single line of code.')}
            </p>
            <div style={{ display:'flex', gap:'40px', marginBottom:'40px' }}>
              <div>
                <div style={{ color:'#71B136', fontSize:'36px', fontWeight:800, lineHeight:1 }}>+40</div>
                <div style={{ color:'rgba(255,255,255,0.5)', fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:'6px' }}>APIs de OFS</div>
              </div>
              <div>
                <div style={{ color:'#71B136', fontSize:'36px', fontWeight:800, lineHeight:1 }}>0</div>
                <div style={{ color:'rgba(255,255,255,0.5)', fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:'6px' }}>{tr('Líneas de código', 'Lines of code')}</div>
              </div>
              <div>
                <div style={{ color:'#71B136', fontSize:'36px', fontWeight:800, lineHeight:1 }}>99+</div>
                <div style={{ color:'rgba(255,255,255,0.5)', fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:'6px' }}>Workflows activos</div>
              </div>
            </div>
            <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
              <Link href="/productos/workflow-builder" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#71B136', color:'white', padding:'14px 28px', borderRadius:'8px', fontWeight:700, fontSize:'15px', textDecoration:'none' }}>
                {tr('Ver más →', 'Learn more →')}
              </Link>
              <Link href="/productos/workflow-builder" style={{ display:'inline-flex', alignItems:'center', background:'transparent', color:'white', padding:'14px 28px', borderRadius:'8px', fontWeight:600, fontSize:'15px', textDecoration:'none', border:'1.5px solid rgba(255,255,255,0.3)' }}>
                {tr('Solicitar acceso', 'Request access')}
              </Link>
            </div>
          </div>
          <div style={{ width:'55%' }}>
            <div style={{ transform:'perspective(1200px) rotateY(-4deg) rotateX(2deg)', boxShadow:'0 50px 120px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)', borderRadius:'14px', overflow:'hidden' }}>
              <div style={{ background:'#1e1e2e', padding:'12px 16px', display:'flex', alignItems:'center', gap:'8px' }}>
                <div style={{ display:'flex', gap:'6px' }}>
                  <span style={{ width:'12px', height:'12px', borderRadius:'50%', background:'#FF5F57', display:'block' }}/>
                  <span style={{ width:'12px', height:'12px', borderRadius:'50%', background:'#FFBD2E', display:'block' }}/>
                  <span style={{ width:'12px', height:'12px', borderRadius:'50%', background:'#28CA41', display:'block' }}/>
                </div>
                <div style={{ flex:1, background:'rgba(255,255,255,0.08)', borderRadius:'6px', padding:'5px 12px', fontSize:'12px', color:'rgba(255,255,255,0.4)', textAlign:'center' }}>newwfbuilder.fsmtool.com/workflows</div>
              </div>
              <img src="/assets/wb-canvas.png" alt="Workflow Builder canvas" style={{ width:'100%', display:'block' }}/>
            </div>
          </div>
        </div>
      </section>

      {/* ── FSMTOOL SHOWCASE (SECOND) ── */}
      <section id="prod-fsmtool" style={{ width:'100%', minHeight:'100vh', background:'#F3F4F6', position:'relative', overflow:'hidden', display:'flex', alignItems:'center' }}>
        <div style={{ display:'flex', width:'100%', maxWidth:'1400px', margin:'0 auto', padding:'100px 60px', alignItems:'center', gap:'80px', position:'relative', zIndex:2 }}>
          <div style={{ width:'55%' }}>
            <div style={{ transform:'perspective(1200px) rotateY(4deg) rotateX(2deg)', boxShadow:'0 50px 120px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)', borderRadius:'14px', overflow:'hidden' }}>
              <div style={{ background:'#e8e8ed', padding:'12px 16px', display:'flex', alignItems:'center', gap:'8px' }}>
                <div style={{ display:'flex', gap:'6px' }}>
                  <span style={{ width:'12px', height:'12px', borderRadius:'50%', background:'#FF5F57', display:'block' }}/>
                  <span style={{ width:'12px', height:'12px', borderRadius:'50%', background:'#FFBD2E', display:'block' }}/>
                  <span style={{ width:'12px', height:'12px', borderRadius:'50%', background:'#28CA41', display:'block' }}/>
                </div>
                <div style={{ flex:1, background:'rgba(0,0,0,0.06)', borderRadius:'6px', padding:'5px 12px', fontSize:'12px', color:'#999', textAlign:'center' }}>app.fsmtool.com/dashboard</div>
              </div>
              <img src="/assets/fsmtool-home.png" alt="FSMTool dashboard" style={{ width:'100%', display:'block' }}/>
            </div>
          </div>
          <div style={{ width:'45%' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#F0FDF4', border:'1px solid #71B136', borderRadius:'999px', padding:'8px 18px', marginBottom:'28px' }}>
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none"><path d="M10 1l.5 1.75L12.25 3.5l-1.75.5L10 5.75l-.5-1.75L7.75 3.5l1.75-.5z" fill="#71B136"/><path d="M5.5 0l.4 1.4L7.25 2l-1.35.4L5.5 3.75l-.4-1.35L3.75 2l1.35-.4z" fill="#71B136" opacity="0.7"/><path d="M11.5 7l.3 1L13 8.5l-1 .3L11.5 9.75l-.3-1L10 8.5l1-.3z" fill="#71B136" opacity="0.5"/></svg>
              <span style={{ color:'#71B136', fontSize:'12px', fontWeight:600, letterSpacing:'0.08em' }}>{tr('Impulsado por Inteligencia Artificial', 'Powered by Artificial Intelligence')}</span>
            </div>
            <h2 style={{ fontSize:'52px', fontWeight:900, color:'#172554', lineHeight:1.1, marginBottom:'16px' }}>
              FSMTool <span style={{ color:'#71B136' }}>✦ AI</span>
            </h2>
            <p style={{ fontSize:'20px', color:'#6B7280', marginBottom:'20px' }}>
              {tr('Administrá Oracle Field Service Cloud sin límites', 'Manage Oracle Field Service Cloud without limits')}
            </p>
            <p style={{ color:'#6B7280', fontSize:'16px', lineHeight:1.8, marginBottom:'32px', maxWidth:'440px' }}>
              {tr('FSMTool es una suite de administración y monitoreo de operaciones construida nativamente sobre Oracle Field Service Cloud. Permite a los equipos de operaciones ejecutar acciones masivas, visualizar el estado en tiempo real y automatizar los procesos del día a día.', 'FSMTool is an operations administration and monitoring suite built natively on Oracle Field Service Cloud. It lets operations teams execute bulk actions, visualize status in real time, and automate day-to-day processes.')}
            </p>
            <div style={{ display:'flex', gap:'40px', marginBottom:'40px' }}>
              <div>
                <div style={{ color:'#71B136', fontSize:'36px', fontWeight:800, lineHeight:1 }}>30+</div>
                <div style={{ color:'#9CA3AF', fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:'6px' }}>{tr('Implementaciones', 'Implementations')}</div>
              </div>
              <div>
                <div style={{ color:'#71B136', fontSize:'36px', fontWeight:800, lineHeight:1 }}>99%</div>
                <div style={{ color:'#9CA3AF', fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:'6px' }}>{tr('Satisfacción', 'Satisfaction')}</div>
              </div>
              <div>
                <div style={{ color:'#71B136', fontSize:'36px', fontWeight:800, lineHeight:1 }}>8+</div>
                <div style={{ color:'#9CA3AF', fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:'6px' }}>{tr('Años de experiencia', 'Years of experience')}</div>
              </div>
            </div>
            <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
              <Link href="/productos/fsmtool" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#71B136', color:'white', padding:'14px 28px', borderRadius:'8px', fontWeight:700, fontSize:'15px', textDecoration:'none' }}>
                {tr('Ver más →', 'Learn more →')}
              </Link>
              <Link href="/productos/fsmtool" style={{ display:'inline-flex', alignItems:'center', background:'transparent', color:'#172554', padding:'14px 28px', borderRadius:'8px', fontWeight:600, fontSize:'15px', textDecoration:'none', border:'1.5px solid #172554' }}>
                {tr('Solicitar acceso', 'Request access')}
              </Link>
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
