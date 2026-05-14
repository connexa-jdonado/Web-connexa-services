'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLang } from '@/context/LanguageContext';

const WB_CASOS = [
  { title: 'Automatización de tareas repetitivas', desc: 'Creá workflows que ejecuten automáticamente las tareas que tu equipo repite a diario en OFSC.', metric: '0 horas en tareas manuales repetitivas', disabled: false },
  { title: 'IA Agents integrados', desc: 'Incorporá agentes de IA dentro de tus flujos para tomar decisiones automáticas basadas en datos de campo.', metric: 'Decisiones inteligentes sin intervención humana', disabled: false },
  { title: 'Gestión automática de capacidad', desc: 'Automatizá la distribución de carga según la disponibilidad real de tu fuerza de trabajo por zona.', metric: 'Capacidad optimizada en tiempo real', disabled: false },
  { title: 'Próximamente', desc: 'Nuevo caso de uso en camino.', metric: '', disabled: true },
  { title: 'Próximamente', desc: 'Nuevo caso de uso en camino.', metric: '', disabled: true },
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
  const [videoTitle, setVideoTitle] = useState(WB_CASOS[0].title);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [activeTab, setActiveTab] = useState('constructor');
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
    if (WB_CASOS[idx].disabled) return;
    setVideoOpacity(0);
    setTimeout(() => {
      setActiveCaso(idx);
      setVideoTitle(WB_CASOS[idx].title);
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
            <span className="breadcrumb-cur">Workflow Builder</span>
          </nav>
          <div className="page-hero-eyebrow">
            <div className="page-hero-eyebrow-dot"></div>
            <span>{tr('Solución propia Connexa · Para Oracle Field Service Cloud', 'Connexa Proprietary Solution · For Oracle Field Service Cloud')}</span>
          </div>
          <h1 className="page-hero-h1" dangerouslySetInnerHTML={{ __html: tr('Automatizá tus procesos OFSC<br/><em>sin escribir código</em>', 'Automate your OFSC processes<br/><em>without writing code</em>') }} />
          <p className="page-hero-sub">{tr('Construí y ejecutá workflows programados sobre entidades de Oracle Field Service de forma visual y sencilla. Triggers, condiciones, acciones y notificaciones — todo sin código.', 'Build and execute scheduled workflows on Oracle Field Service entities visually and simply. Triggers, conditions, actions, and notifications — all without code.')}</p>
        </div>
      </div>

      {/* ── HERO VISUAL ── */}
      <div className="hero-visual">
        <div className="container">
          <div className="browser-frame hero-size">
            <div className="browser-toolbar">
              <div className="browser-dots"><span></span><span></span><span></span></div>
              <div className="browser-address">newwfbuilder.fsmtool.com/workflows</div>
            </div>
            <img src="/assets/wb-canvas.png" style={{ width: '100%', display: 'block' }} alt="Workflow Builder canvas" />
          </div>
        </div>
      </div>

      {/* ── VALOR ── */}
      <div className="valor-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label fade-up">{tr('Por qué Workflow Builder', 'Why Workflow Builder')}</span>
            <h2 className="fade-up d1">{tr('Automatización OFSC al alcance de todos', 'OFSC automation within everyone\'s reach')}</h2>
            <p className="fade-up d2">{tr('Diseñado para que los equipos de operaciones puedan automatizar sin depender de IT.', 'Designed so operations teams can automate without depending on IT.')}</p>
          </div>
          <div className="valor-grid">
            <div className="valor-card fade-up d1">
              <div className="valor-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
              <h3>{tr('Sin código', 'No code')}</h3>
              <p>{tr('Cualquier usuario de negocio puede armar workflows sin programar. Interface visual con nodos drag & drop.', 'Any business user can build workflows without programming. Visual interface with drag & drop nodes.')}</p>
              <div className="valor-stat">0</div>
              <div className="valor-stat-lbl">{tr('líneas de código para crear un workflow', 'lines of code to create a workflow')}</div>
            </div>
            <div className="valor-card fade-up d2">
              <div className="valor-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
              <h3>{tr('Visual e intuitivo', 'Visual and intuitive')}</h3>
              <p>{tr('Editor canvas con paleta de nodos: condiciones, switches, loops, acciones OFS y notificaciones.', 'Canvas editor with node palette: conditions, switches, loops, OFS actions, and notifications.')}</p>
              <div className="valor-stat">10+</div>
              <div className="valor-stat-lbl">{tr('tipos de nodos disponibles', 'node types available')}</div>
            </div>
            <div className="valor-card fade-up d3">
              <div className="valor-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>
              <h3>{tr('Potente y confiable', 'Powerful and reliable')}</h3>
              <p>{tr('Automatizaciones complejas sobre cualquier entidad OFSC con historial completo de ejecuciones.', 'Complex automations on any OFSC entity with a complete execution history.')}</p>
              <div className="valor-stat">99+</div>
              <div className="valor-stat-lbl">{tr('workflows activos en producción', 'active workflows in production')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CASOS DE USO ── */}
      <section className="casos-v2-section">
        <div className="container">
          <div className="casos-v2-header fade-up">
            <div className="casos-v2-eyebrow">{tr('CASOS DE USO', 'USE CASES')}</div>
            <h2 className="casos-v2-title">{tr('Mirá Workflow Builder en acción', 'See Workflow Builder in action')}</h2>
            <p className="casos-v2-sub">{tr('Seleccioná un caso y vé cómo automatizar tus procesos OFSC sin escribir código.', 'Select a case and see how to automate your OFSC processes without writing code.')}</p>
          </div>
          <div className="casos-v2-layout">
            <div className="casos-v2-list">
              {WB_CASOS.map((caso, idx) => (
                <div
                  key={idx}
                  className={`caso-item${activeCaso === idx && !caso.disabled ? ' active' : ''}${caso.disabled ? ' disabled' : ''}`}
                  onClick={() => handleCasoClick(idx)}
                >
                  <div className="caso-item-header">
                    <span className="caso-item-num">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="caso-item-title">
                      {caso.title}
                      {caso.disabled && <span className="caso-soon-badge">{tr('Próximamente', 'Coming soon')}</span>}
                    </span>
                  </div>
                  {!caso.disabled && (
                    <div className="caso-item-body">
                      <p className="caso-item-desc">{caso.desc}</p>
                      <span className="caso-item-metric">{caso.metric}</span>
                    </div>
                  )}
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
