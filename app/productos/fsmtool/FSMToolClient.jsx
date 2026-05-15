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
      {/* ── HERO ── */}
      <div className="page-hero">
        <div className="container page-hero-inner">
          <nav className="breadcrumb">
            <Link href="/">{tr('Inicio', 'Home')}</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href="/productos">{tr('Productos', 'Products')}</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-cur">FSMTool</span>
          </nav>
          <div className="page-hero-eyebrow">
            <div className="page-hero-eyebrow-dot"></div>
            <span>{tr('Solución propia Connexa · Para Oracle Field Service Cloud', 'Connexa Proprietary Solution · For Oracle Field Service Cloud')}</span>
          </div>
          <h1 className="page-hero-h1" dangerouslySetInnerHTML={{ __html: tr('Operaciones masivas en OFSC,<br/><em>sin complejidad</em>', 'Bulk OFSC operations,<br/><em>without complexity</em>') }} />
          <p className="page-hero-sub">{tr('FSMTool es la herramienta web que permite gestionar de forma masiva actividades, recursos e inventarios en Oracle Field Service Cloud de manera fácil e intuitiva.', 'FSMTool is the web tool that lets you manage activities, resources, and inventories in Oracle Field Service Cloud in bulk, easily and intuitively.')}</p>
        </div>
      </div>

      {/* ── HERO VISUAL (comentado) ── */}
      {/*
      <div className="hero-visual">
        <div className="container">
          <div className="browser-frame hero-size">
            <div className="browser-toolbar">
              <div className="browser-dots"><span></span><span></span><span></span></div>
              <div className="browser-address">app.connexaservices.com/fsmtool</div>
            </div>
            <img src="/assets/fsmtool-home.png" style={{ width: '100%', display: 'block' }} alt="FSMTool dashboard" />
          </div>
        </div>
      </div>
      */}

      {/* ── VALOR ── */}
      <div className="valor-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label fade-up">{tr('Por qué FSMTool', 'Why FSMTool')}</span>
            <h2 className="fade-up d1">{tr('Lo que ninguna otra herramienta te da', 'What no other tool gives you')}</h2>
            <p className="fade-up d2">{tr('Construido por expertos OFSC para resolver los problemas reales de las operaciones de campo a escala.', 'Built by OFSC experts to solve real problems in field operations at scale.')}</p>
          </div>
          <div className="valor-grid">
            <div className="valor-card fade-up d1">
              <div className="valor-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
              <h3>{tr('Velocidad operacional', 'Operational speed')}</h3>
              <p>{tr('Ejecutá acciones sobre miles de órdenes en segundos desde una sola pantalla.', 'Execute actions on thousands of orders in seconds from a single screen.')}</p>
              <div className="valor-stat">×10</div>
              <div className="valor-stat-lbl">{tr('más rápido que la operación manual', 'faster than manual operation')}</div>
            </div>
            <div className="valor-card fade-up d2">
              <div className="valor-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
              <h3>{tr('Interfaz intuitiva', 'Intuitive interface')}</h3>
              <p>{tr('Diseñada para operadores que no son técnicos. Sin curva de aprendizaje. Funciona desde el día uno.', 'Designed for non-technical operators. No learning curve. Works from day one.')}</p>
              <div className="valor-stat">0</div>
              <div className="valor-stat-lbl">{tr('horas de capacitación técnica', 'hours of technical training')}</div>
            </div>
            <div className="valor-card fade-up d3">
              <div className="valor-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>
              <h3>{tr('Escala ilimitada', 'Unlimited scale')}</h3>
              <p>{tr('Desde 10 hasta 100.000 órdenes por operación con validación previa.', 'From 10 to 100,000 orders per operation with prior validation.')}</p>
              <div className="valor-stat">100k</div>
              <div className="valor-stat-lbl">{tr('registros por operación', 'records per operation')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CASOS DE USO ── */}
      <section className="casos-v2-section">
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
      </section>

      {/* ── TABS / MÓDULOS ── */}
      <div className="valor-section white">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label fade-up">{tr('Módulos', 'Modules')}</span>
            <h2 className="fade-up d1">{tr('Todo lo que podés hacer', 'Everything you can do')}</h2>
            <p className="fade-up d2">{tr('Cinco módulos integrados que cubren cada aspecto de la operación masiva sobre Oracle Field Service Cloud.', 'Five integrated modules covering every aspect of bulk operations on Oracle Field Service Cloud.')}</p>
          </div>
          <div className="func-tabs fade-up d1">
            {FSM_TABS.map((tab) => (
              <button key={tab.key} className={`func-tab${activeTab === tab.key ? ' active' : ''}`} onClick={() => setActiveTab(tab.key)}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className={`func-panel${activeTab === 'actividades' ? ' active' : ''} fade-up d2`}>
            <div className="func-text">
              <div className="func-module-badge"><span>{tr('Módulo Actividades', 'Activities Module')}</span></div>
              <h3>{tr('Gestión masiva de actividades', 'Bulk activity management')}</h3>
              <p>{tr('Creá, actualizá, reasigná y cerrá miles de actividades de OFSC en una sola operación.', 'Create, update, reassign, and close thousands of OFSC activities in a single operation.')}</p>
              <div className="func-actions">
                {[tr('Creación masiva desde plantilla Excel','Bulk creation from Excel template'), tr('Actualización de propiedades por lote','Batch property updates'), tr('Cambio de estado (pendiente → en curso → cerrada)','Status change (pending → in progress → closed)'), tr('Reasignación de recurso o fecha','Resource or date reassignment'), tr('Validación previa con preview de errores','Prior validation with error preview')].map((item, i) => (
                  <div key={i} className="func-action-item"><div className="func-action-dot"></div>{item}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="browser-frame"><div className="browser-toolbar"><div className="browser-dots"><span></span><span></span><span></span></div><div className="browser-address">FSMTool · {tr('Actividades','Activities')}</div></div>
              <img src="/assets/fsmtool-actividades.png" style={{ width: '100%', display: 'block' }} alt="FSMTool actividades" /></div>
            </div>
          </div>

          <div className={`func-panel${activeTab === 'recursos' ? ' active' : ''}`}>
            <div className="func-text">
              <div className="func-module-badge"><span>{tr('Módulo Recursos','Resources Module')}</span></div>
              <h3>{tr('Administración masiva de recursos','Bulk resource administration')}</h3>
              <p>{tr('Gestioná técnicos, vehículos y equipos de tu organización OFSC de forma masiva.','Manage technicians, vehicles, and equipment in your OFSC organization in bulk.')}</p>
              <div className="func-actions">
                {[tr('Creación de recursos en lote','Batch resource creation'), tr('Actualización de habilidades y certificaciones','Skills and certifications update'), tr('Asignación masiva de zonas de trabajo','Bulk work zone assignment'), tr('Gestión de calendarios y horarios','Calendar and schedule management')].map((item, i) => (
                  <div key={i} className="func-action-item"><div className="func-action-dot"></div>{item}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="browser-frame"><div className="browser-toolbar"><div className="browser-dots"><span></span><span></span><span></span></div><div className="browser-address">FSMTool · {tr('Recursos','Resources')}</div></div>
              <img src="/assets/fsmtool-config.png" style={{ width: '100%', display: 'block' }} alt="FSMTool recursos" /></div>
            </div>
          </div>

          <div className={`func-panel${activeTab === 'inventario' ? ' active' : ''}`}>
            <div className="func-text">
              <div className="func-module-badge"><span>{tr('Módulo Inventario','Inventory Module')}</span></div>
              <h3>{tr('Gestión y transferencia de inventario','Inventory management and transfer')}</h3>
              <p>{tr('Controlá el stock de materiales asignados a técnicos y almacenes.','Control the stock of materials assigned to technicians and warehouses.')}</p>
              <div className="func-actions">
                {[tr('Transferencia masiva entre recursos','Bulk transfer between resources'), tr('Carga masiva de stock inicial','Bulk initial stock loading'), tr('Exportación completa para auditoría','Full export for audit')].map((item, i) => (
                  <div key={i} className="func-action-item"><div className="func-action-dot"></div>{item}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="browser-frame"><div className="browser-toolbar"><div className="browser-dots"><span></span><span></span><span></span></div><div className="browser-address">FSMTool · {tr('Inventario','Inventory')}</div></div>
              <img src="/assets/fsmtool-config.png" style={{ width: '100%', display: 'block' }} alt="FSMTool inventario" /></div>
            </div>
          </div>

          <div className={`func-panel${activeTab === 'descargas' ? ' active' : ''}`}>
            <div className="func-text">
              <div className="func-module-badge"><span>{tr('Módulo Descargas','Downloads Module')}</span></div>
              <h3>{tr('Exportación avanzada de datos OFSC','Advanced OFSC data export')}</h3>
              <p>{tr('Descargá actividades con filtros avanzados por recurso, fecha, estado y condiciones personalizadas.','Download activities with advanced filters by resource, date, status, and custom conditions.')}</p>
              <div className="func-actions">
                {[tr('Filtros por árbol jerárquico de recursos','Filters by hierarchical resource tree'), tr('Condiciones personalizables por campo','Customizable conditions by field'), tr('Favoritos para consultas recurrentes','Favorites for recurring queries'), tr('Exportación a Excel con campos configurables','Excel export with configurable fields')].map((item, i) => (
                  <div key={i} className="func-action-item"><div className="func-action-dot"></div>{item}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="browser-frame"><div className="browser-toolbar"><div className="browser-dots"><span></span><span></span><span></span></div><div className="browser-address">FSMTool · {tr('Descargas','Downloads')}</div></div>
              <img src="/assets/fsmtool-descarga.png" style={{ width: '100%', display: 'block' }} alt="FSMTool descargas" /></div>
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
