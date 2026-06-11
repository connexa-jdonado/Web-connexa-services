import { useEffect, useRef, useState } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';

// Página EXPERIMENTAL — flujo VERTICAL: un evento real de inventario en OFS
// baja por la columna vertebral del flujo: instalación → trigger → workflow
// ejecutándose → Teams + ERP en paralelo → cierre.

const rv = (on, dy = 10) => ({ opacity: on ? 1 : 0, transform: on ? 'none' : `translateY(${dy}px)`, transition: 'opacity 0.3s ease-out, transform 0.3s ease-out' });

function useSceneLoop(run, durations, holdMs) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!run) { setStep(0); return; }
    const t = step < durations.length
      ? setTimeout(() => setStep((s) => s + 1), durations[step])
      : setTimeout(() => setStep(0), holdMs);
    return () => clearTimeout(t);
  }, [run, step, durations, holdMs]);
  return step;
}

const S1_DUR = [700, 800, 900, 800];
const S2_DUR = [700, 800, 700];
const S3_DUR = [500, 550, 800, 650, 550, 550, 550];
const S4_DUR = [500, 800, 700, 700];

const WBX_ACTS = [
  { es: 'esperando eventos de campo…', en: 'awaiting field events…', lblEs: 'Inicio', lblEn: 'Start' },
  { es: 'evento OFS: inventario instalado', en: 'OFS event: inventory installed', lblEs: 'Evento', lblEn: 'Event' },
  { es: 'trigger disparado · payload validado', en: 'trigger fired · payload validated', lblEs: 'Trigger', lblEn: 'Trigger' },
  { es: 'consultando OFS API · evaluando stock…', en: 'querying OFS API · checking stock…', lblEs: 'Workflow', lblEn: 'Workflow' },
  { es: 'orquestando: Teams + ERP en paralelo', en: 'orchestrating: Teams + ERP in parallel', lblEs: 'Acciones', lblEn: 'Actions' },
  { es: 'ciclo cerrado · stock asegurado', en: 'loop closed · stock secured', lblEs: 'Cierre', lblEn: 'Close' },
];

const Sparkle = ({ size = 16 }) => (
  <svg width={size} height={size * 0.86} viewBox="0 0 28 24" fill="none" aria-hidden="true">
    <path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.4" strokeLinejoin="round" />
    <path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.3" strokeLinejoin="round" opacity="0.7" />
    <path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.3" strokeLinejoin="round" opacity="0.5" />
  </svg>
);

const TeamsLogo = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <circle cx="38" cy="13.5" r="5" fill="#7B83EB" />
    <path d="M32 21.5h12.5a2.5 2.5 0 0 1 2.5 2.5v8.5a8.5 8.5 0 0 1-8.5 8.5h-0.5a9.5 9.5 0 0 1-6-2.1z" fill="#7B83EB" />
    <rect x="1" y="9.5" width="29" height="29" rx="6" fill="#5059C9" />
    <path d="M8.5 18h14v4.1h-4.9V34h-4.2V22.1H8.5z" fill="#fff" />
  </svg>
);

const InvIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const ErpIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="9" height="9" rx="1.5" /><rect x="13" y="3" width="9" height="9" rx="1.5" />
    <rect x="2" y="14" width="9" height="7" rx="1.5" /><path d="M17.5 14v7M14 17.5h7" />
  </svg>
);

const Tech = ({ width = 76 }) => (
  <svg viewBox="0 0 120 170" width={width} aria-hidden="true" className="wbx-tech">
    <path d="M30 38 a30 26 0 0 1 60 0 z" fill="var(--accent)" />
    <rect x="24" y="36" width="72" height="7" rx="3.5" fill="var(--accent)" />
    <circle cx="60" cy="58" r="17" fill="#E9C39B" />
    <circle cx="54" cy="56" r="1.8" fill="#172554" />
    <circle cx="66" cy="56" r="1.8" fill="#172554" />
    <path d="M54 64 q6 5 12 0" stroke="#172554" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <path d="M38 84 q22 -10 44 0 l-3 48 h-38 z" fill="rgba(113,177,54,0.85)" />
    <rect x="42" y="100" width="36" height="5" rx="2.5" fill="rgba(255,255,255,0.75)" />
    <rect x="42" y="113" width="36" height="5" rx="2.5" fill="rgba(255,255,255,0.75)" />
    <path d="M42 90 q-14 8 -10 26" stroke="#E9C39B" strokeWidth="8" fill="none" strokeLinecap="round" />
    <path d="M78 90 q16 4 14 22" stroke="#E9C39B" strokeWidth="8" fill="none" strokeLinecap="round" />
    <rect x="85" y="105" width="18" height="14" rx="2.5" fill="none" stroke="var(--accent)" strokeWidth="1.6" />
    <rect x="46" y="132" width="11" height="28" rx="5" fill="#172554" />
    <rect x="63" y="132" width="11" height="28" rx="5" fill="#172554" />
    <rect x="44" y="157" width="15" height="8" rx="3" fill="#0d1426" />
    <rect x="61" y="157" width="15" height="8" rx="3" fill="#0d1426" />
  </svg>
);

// Conector vertical curvo entre secciones, con chip que baja
const Spine = ({ active, label }) => (
  <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', height: '120px' }} aria-hidden="true">
    <svg viewBox="0 0 60 120" width="60" height="120" fill="none">
      <path d="M 30 0 C 48 30, 12 60, 30 90 C 38 105, 34 112, 30 120" stroke={active ? 'rgba(113,177,54,0.7)' : 'rgba(113,177,54,0.25)'} strokeWidth="2" strokeDasharray="7 6" strokeLinecap="round" style={{ animation: 'dashFlow 1.2s linear infinite', transition: 'stroke 0.4s ease-out' }} />
    </svg>
    {label && (
      <span style={{ position: 'absolute', top: '44px', left: 'calc(50% + 26px)', fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, color: active ? 'var(--accent)' : 'rgba(255,255,255,0.3)', background: 'rgba(6,13,31,0.9)', border: `1px solid ${active ? 'rgba(113,177,54,0.45)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '999px', padding: '3px 10px', whiteSpace: 'nowrap', transition: 'color 0.4s ease-out, border-color 0.4s ease-out' }}>{label}</span>
    )}
  </div>
);

export default function WorkflowBuilderExperiencia() {
  const { lang } = useLang();
  const tr = (es, en) => (lang === 'es' ? es : en);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(0);
  const secRefs = useRef([]);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const obs = [];
    secRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(([e]) => { if (e.intersectionRatio >= 0.45) setActive(i); }, { threshold: 0.45 });
      io.observe(el);
      obs.push(io);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, [reduced]);

  // Escenas
  const s1 = useSceneLoop(active === 1 && !reduced, S1_DUR, 2600);
  const s2 = useSceneLoop(active === 2 && !reduced, S2_DUR, 2600);
  const s3 = useSceneLoop(active === 3 && !reduced, S3_DUR, 3000);
  const s4 = useSceneLoop(active === 4 && !reduced, S4_DUR, 3000);
  const f1 = reduced ? S1_DUR.length : s1;
  const f2 = reduced ? S2_DUR.length : s2;
  const f3 = reduced ? S3_DUR.length : s3;
  const f4 = reduced ? S4_DUR.length : s4;

  const jump = (i) => secRefs.current[i]?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });

  const stepHeader = (n, sub) => (
    <div style={{ textAlign: 'center', marginBottom: '28px' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.35)', borderRadius: '999px', padding: '6px 16px', marginBottom: '12px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
          {tr('Paso', 'Step')} {n} · {tr(WBX_ACTS[n].lblEs, WBX_ACTS[n].lblEn)}
        </span>
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.65)', margin: '0 auto', maxWidth: '480px', lineHeight: 1.6 }}>{sub}</p>
    </div>
  );

  const panel = { background: 'rgba(9,16,34,0.92)', border: '1px solid rgba(113,177,54,0.22)', borderRadius: '18px', boxShadow: '0 30px 70px rgba(0,0,0,0.5)' };

  return (
    <>
      <Head>
        <title>{tr('Workflow Builder — Experiencia | Connexa Services', 'Workflow Builder — Experience | Connexa Services')}</title>
        <meta name="description" content="Un flujo real de inventario ejecutándose de punta a punta en Workflow Builder." />
        <meta name="robots" content="noindex" />
      </Head>
      <style>{`
        @keyframes wbxBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(7px); } }
        @keyframes wbxDrift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes wbxFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes wbxFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .wbx-tech { animation: wbxFloat 3.2s ease-in-out infinite; transform-origin: center bottom; }
        .wbx-hud-line { animation: wbxFadeIn 0.4s ease-out; }
        .wbx-rail-btn { display: flex; align-items: center; justify-content: flex-end; gap: 9px; background: none; border: none; padding: 6px 4px; cursor: pointer; min-height: 30px; width: 100%; }
        .wbx-rail-btn:focus-visible { outline: 2px solid #71B136; outline-offset: 3px; border-radius: 6px; }
        .wbx-rail-lbl { font-family: var(--font-body); font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; transition: color 0.25s ease-out; }
        .wbx-canvas-conn { transition: stroke 0.3s ease-out, opacity 0.3s ease-out; }
        @media (prefers-reduced-motion: reduce) { .wbx-tech, .wbx-bob, .wbx-drift { animation: none !important; } }
        @media (max-width: 980px) { .wbx-rail { display: none; } .wbx-canvas-desk { display: none !important; } .wbx-canvas-mob { display: flex !important; } }
        @media (min-width: 981px) { .wbx-canvas-mob { display: none !important; } }
        @media (max-width: 768px) {
          .wbx-title-h1 { font-size: 32px !important; }
          .wbx-s1-row { flex-direction: column !important; align-items: center !important; }
          .wbx-s4-row { flex-direction: column !important; }
        }
      `}</style>

      <div style={{ background: 'radial-gradient(ellipse 130% 60% at 50% 0%, #0c1834 0%, #060d1f 60%)', position: 'relative' }}>
        {/* fondo */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4, pointerEvents: 'none' }} aria-hidden="true">
          <defs><pattern id="wbx-dots" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.9" fill="rgba(113,177,54,0.15)" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#wbx-dots)" />
        </svg>
        {[['8vw', '12%', 12, '6s'], ['90vw', '22%', 9, '8s'], ['12vw', '55%', 10, '7s'], ['86vw', '78%', 9, '9s']].map(([x, y, s, d], i) => (
          <span key={i} className="wbx-drift" style={{ position: 'absolute', left: x, top: y, animation: `wbxDrift ${d} ease-in-out infinite`, opacity: 0.4, pointerEvents: 'none' }} aria-hidden="true"><Sparkle size={s} /></span>
        ))}

        {/* riel derecho */}
        {!reduced && (
          <div className="wbx-rail" style={{ position: 'fixed', right: '18px', top: '50%', transform: 'translateY(-50%)', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {WBX_ACTS.map((a, i) => (
              <button key={i} type="button" className="wbx-rail-btn" onClick={() => jump(i)} aria-label={tr(a.lblEs, a.lblEn)}>
                <span className="wbx-rail-lbl" style={{ color: active === i ? 'var(--accent)' : 'rgba(255,255,255,0.3)' }}>{tr(a.lblEs, a.lblEn)}</span>
                <span style={{ width: active === i ? '11px' : '7px', height: active === i ? '11px' : '7px', borderRadius: '50%', background: active === i ? 'var(--accent)' : 'rgba(113,177,54,0.3)', transition: 'all 0.25s ease-out', flexShrink: 0 }} />
              </button>
            ))}
          </div>
        )}

        {/* HUD orquestador */}
        {!reduced && (
          <div style={{ position: 'fixed', left: '50%', bottom: '18px', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(6,13,31,0.88)', border: '1px solid rgba(113,177,54,0.3)', borderRadius: '999px', padding: '8px 18px', zIndex: 50, maxWidth: '92vw' }}>
            <Sparkle size={12} />
            <span className="wbx-hud-line" key={active} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.8)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {tr('ORQUESTADOR', 'ORCHESTRATOR')} · {tr(WBX_ACTS[active].es, WBX_ACTS[active].en)}
            </span>
          </div>
        )}

        {/* ── HERO ── */}
        <section ref={(el) => { secRefs.current[0] = el; }} style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '110px 20px 40px', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', maxWidth: '840px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.35)', borderRadius: '999px', padding: '7px 18px' }}>
              <Sparkle size={14} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>{tr('Experiencia interactiva', 'Interactive experience')}</span>
            </div>
            <h1 className="wbx-title-h1" style={{ fontFamily: 'var(--font-heading)', fontSize: '52px', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '0 0 18px' }}>
              {tr('Un flujo real,', 'A real flow,')}<br />
              <span style={{ color: 'var(--accent)' }}>{tr('de punta a punta', 'end to end')}</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.7 }}>
              {tr('Un técnico instala el último modem de su camioneta. Mirá cómo Workflow Builder se entera, decide y resuelve — antes de que sea un problema.', 'A technician installs the last modem in his van. Watch Workflow Builder find out, decide and solve it — before it becomes a problem.')}
            </p>
            <div className="wbx-bob" style={{ marginTop: '40px', animation: 'wbxBob 1.6s ease-in-out infinite', color: 'var(--accent)', fontSize: '22px' }} aria-hidden="true">▾</div>
          </div>
        </section>

        <div style={{ position: 'relative', zIndex: 2 }}><Spine active={active >= 1} label={tr('el evento baja al flujo', 'the event enters the flow')} /></div>

        {/* ── PASO 1 — EVENTO EN OFS ── */}
        <section ref={(el) => { secRefs.current[1] = el; }} style={{ minHeight: '86vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 20px', position: 'relative', zIndex: 2 }}>
          {stepHeader(1, tr('García instala el equipo en el cliente y lo registra en OFS Mobile. Ese registro ES el evento.', 'García installs the unit at the customer site and logs it in OFS Mobile. That log IS the event.'))}
          <div className="wbx-s1-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '28px' }}>
            <Tech width={86} />
            <div style={{ ...panel, width: 'min(340px, 88vw)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 14px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" /></svg>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, color: '#fff' }}>OFS Mobile</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{tr('Actividad #4512', 'Activity #4512')}</span>
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: '12px', padding: '4px 0 10px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>{tr('Cliente', 'Customer')}</span><span style={{ color: 'rgba(255,255,255,0.8)' }}>María López</span>
                </div>
                <div style={{ ...rv(f1 >= 1, 6), display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(113,177,54,0.08)', border: '1px solid rgba(113,177,54,0.35)', borderRadius: '11px', padding: '11px 13px' }}>
                  <InvIcon size={22} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '12.5px', fontWeight: 700, color: '#fff' }}>Modem XR-500</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', color: 'rgba(255,255,255,0.5)' }}>{tr('Serie MX-88412', 'Serial MX-88412')}</div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, color: f1 >= 2 ? 'var(--accent)' : 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: `1px solid ${f1 >= 2 ? 'rgba(113,177,54,0.5)' : 'rgba(255,255,255,0.12)'}`, borderRadius: '999px', padding: '3px 10px', transition: 'color 0.25s ease-out, border-color 0.25s ease-out' }}>
                    {f1 >= 2 ? tr('✓ INSTALADO', '✓ INSTALLED') : tr('instalando…', 'installing…')}
                  </span>
                </div>
                <div style={{ ...rv(f1 >= 3, 6), marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 700, color: '#0f172a', background: 'var(--accent)', borderRadius: '999px', padding: '4px 12px' }}>⚡ {tr('evento emitido', 'event emitted')}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', color: 'var(--accent)' }}>install_inventory</span>
                </div>
                <div style={{ ...rv(f1 >= 4, 4), marginTop: '10px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '10.5px', color: 'rgba(255,255,255,0.45)' }}>
                  {tr('OFS lo publica en tiempo real — sin polling', 'OFS publishes it in real time — no polling')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={{ position: 'relative', zIndex: 2 }}><Spine active={active >= 2} label={tr('0.2 s después…', '0.2 s later…')} /></div>

        {/* ── PASO 2 — LLEGA AL WF BUILDER ── */}
        <section ref={(el) => { secRefs.current[2] = el; }} style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 20px', position: 'relative', zIndex: 2 }}>
          {stepHeader(2, tr('Workflow Builder estaba suscripto a ese evento. El trigger se dispara al instante.', 'Workflow Builder was subscribed to that event. The trigger fires instantly.'))}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ ...panel, width: 'min(420px, 90vw)', padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Sparkle size={15} />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 800, color: '#fff' }}>Workflow Builder</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, color: 'var(--accent)', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.35)', borderRadius: '999px', padding: '3px 10px' }}>wf: stock-inteligente</span>
              </div>
              <div style={{ ...rv(f2 >= 1, 6), display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${f2 >= 2 ? 'rgba(113,177,54,0.6)' : 'rgba(255,255,255,0.12)'}`, borderRadius: '12px', padding: '12px 14px', boxShadow: f2 >= 2 ? '0 0 22px rgba(113,177,54,0.18)' : 'none', transition: 'border-color 0.3s ease-out, box-shadow 0.3s ease-out' }}>
                <span style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(113,177,54,0.12)', border: '1px solid rgba(113,177,54,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '13px', flexShrink: 0 }}>⚡</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, color: '#fff' }}>Trigger · {tr('Evento OFS', 'OFS Event')}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>install_inventory · {tr('recurso: García', 'resource: García')}</div>
                </div>
                <span style={{ width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, background: f2 >= 2 ? 'var(--accent)' : 'rgba(255,255,255,0.08)', color: '#0f172a', fontSize: '9px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.25s ease-out' }}>✓</span>
              </div>
              <div style={{ ...rv(f2 >= 3, 4), marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: '10.5px', color: 'rgba(255,255,255,0.45)' }}>
                <span>{tr('payload validado ✓', 'payload validated ✓')}</span>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{tr('latencia: 0.2 s', 'latency: 0.2 s')}</span>
              </div>
            </div>
          </div>
        </section>

        <div style={{ position: 'relative', zIndex: 2 }}><Spine active={active >= 3} label={tr('el workflow toma el control', 'the workflow takes over')} /></div>

        {/* ── PASO 3 — EL WORKFLOW EJECUTA ── */}
        <section ref={(el) => { secRefs.current[3] = el; }} style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 20px', position: 'relative', zIndex: 2 }}>
          {stepHeader(3, tr('El flujo consulta el inventario restante del técnico. Cero unidades: la condición elige la rama de alerta.', 'The flow checks the technician’s remaining stock. Zero units: the condition picks the alert branch.'))}

          {/* Canvas desktop */}
          <div className="wbx-canvas-desk" style={{ ...panel, maxWidth: '880px', margin: '0 auto', width: '100%', position: 'relative', height: '380px', overflow: 'hidden' }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.45 }} aria-hidden="true">
              <defs><pattern id="wbx-cdots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.8" fill="rgba(113,177,54,0.2)" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#wbx-cdots)" />
            </svg>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
              <path className="wbx-canvas-conn" d="M 22 36 C 28 36, 26 22, 32 20" fill="none" stroke={f3 >= 2 ? 'rgba(113,177,54,0.8)' : 'rgba(113,177,54,0.3)'} strokeWidth="0.45" strokeDasharray="2 1.6" strokeLinecap="round" style={{ animation: 'dashFlow 1.3s linear infinite', opacity: f3 >= 1 ? 1 : 0.15 }} />
              <path className="wbx-canvas-conn" d="M 50 24 C 56 26, 52 48, 45 55" fill="none" stroke={f3 >= 4 ? 'rgba(113,177,54,0.8)' : 'rgba(113,177,54,0.3)'} strokeWidth="0.45" strokeDasharray="2 1.6" strokeLinecap="round" style={{ animation: 'dashFlow 1.3s linear 0.2s infinite', opacity: f3 >= 2 ? 1 : 0.15 }} />
              <path className="wbx-canvas-conn" d="M 60 58 C 68 56, 66 36, 73 30" fill="none" stroke={f3 >= 6 ? 'rgba(113,177,54,0.85)' : 'rgba(113,177,54,0.3)'} strokeWidth="0.45" strokeDasharray="2 1.6" strokeLinecap="round" style={{ animation: 'dashFlow 1.3s linear 0.4s infinite', opacity: f3 >= 5 ? 1 : 0.15 }} />
              <path className="wbx-canvas-conn" d="M 60 66 C 68 70, 66 82, 73 84" fill="none" stroke={f3 >= 7 ? 'rgba(113,177,54,0.85)' : 'rgba(113,177,54,0.3)'} strokeWidth="0.45" strokeDasharray="2 1.6" strokeLinecap="round" style={{ animation: 'dashFlow 1.3s linear 0.6s infinite', opacity: f3 >= 5 ? 1 : 0.15 }} />
            </svg>

            {/* etiqueta de rama */}
            <span style={{ position: 'absolute', left: '63%', top: '40%', ...rv(f3 >= 5, 4), fontFamily: 'var(--font-body)', fontSize: '9.5px', fontWeight: 700, color: '#FF8A80', background: 'rgba(255,95,87,0.1)', border: '1px solid rgba(255,95,87,0.4)', borderRadius: '999px', padding: '2px 9px', zIndex: 3 }}>{tr('stock = 0 → alerta', 'stock = 0 → alert')}</span>

            {/* nodos */}
            {[
              { x: '3%', y: '28%', on: f3 >= 1, hot: f3 >= 1, g: '⚡', t: 'Trigger', d: 'install_inventory', w: '19%' },
              { x: '32%', y: '10%', on: f3 >= 2, hot: f3 >= 3, g: '☷', t: 'OFS API', d: tr('Consultar inventario', 'Query inventory'), w: '21%' },
              { x: '34%', y: '50%', on: f3 >= 4, hot: f3 >= 5, g: '◇', t: tr('Condición', 'Condition'), d: tr('¿Stock > 0? → NO', 'Stock > 0? → NO'), w: '22%' },
              { x: '73%', y: '18%', on: f3 >= 5, hot: f3 >= 6, g: 'T', t: 'Teams', d: tr('Avisar supervisor', 'Notify supervisor'), w: '22%', teams: true },
              { x: '73%', y: '74%', on: f3 >= 5, hot: f3 >= 7, g: '⊞', t: 'ERP', d: tr('Reservar 5 unidades', 'Reserve 5 units'), w: '22%', erp: true },
            ].map((n, i) => (
              <div key={i} style={{ position: 'absolute', left: n.x, top: n.y, width: n.w, minWidth: '150px', ...rv(n.on, 8), background: '#101c33', border: `1px solid ${n.hot ? 'rgba(113,177,54,0.65)' : 'rgba(255,255,255,0.13)'}`, borderRadius: '11px', padding: '10px 12px', boxShadow: n.hot ? '0 0 24px rgba(113,177,54,0.2)' : '0 10px 30px rgba(0,0,0,0.4)', transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, border-color 0.25s ease-out, box-shadow 0.25s ease-out', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {n.teams ? <TeamsLogo size={24} /> : n.erp ? <ErpIcon size={22} /> : (
                    <span style={{ width: '24px', height: '24px', borderRadius: '7px', background: 'rgba(113,177,54,0.12)', border: '1px solid rgba(113,177,54,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '12px', flexShrink: 0 }}>{n.g}</span>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{n.t}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.d}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', width: '14px', height: '14px', borderRadius: '50%', flexShrink: 0, background: n.hot ? 'var(--accent)' : 'rgba(255,255,255,0.08)', color: '#0f172a', fontSize: '8.5px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.25s ease-out' }}>✓</span>
                </div>
              </div>
            ))}

            {/* resultado de la consulta */}
            <div style={{ position: 'absolute', left: '32%', top: '27%', ...rv(f3 >= 3, 5), zIndex: 3 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, color: '#FF8A80', background: 'rgba(255,95,87,0.1)', border: '1px solid rgba(255,95,87,0.4)', borderRadius: '999px', padding: '3px 10px' }}>
                ⚠ {tr('XR-500 restantes: 0', 'XR-500 remaining: 0')}
              </span>
            </div>
          </div>

          {/* Canvas mobile: columna */}
          <div className="wbx-canvas-mob" style={{ ...panel, width: 'min(360px, 90vw)', margin: '0 auto', padding: '16px', display: 'none', flexDirection: 'column', gap: '10px' }}>
            {[
              { on: f3 >= 1, hot: f3 >= 1, icon: <span style={{ color: 'var(--accent)' }}>⚡</span>, t: 'Trigger', d: 'install_inventory' },
              { on: f3 >= 2, hot: f3 >= 3, icon: <InvIcon size={18} />, t: 'OFS API', d: tr('Inventario restante: 0 ⚠', 'Remaining stock: 0 ⚠') },
              { on: f3 >= 4, hot: f3 >= 5, icon: <span style={{ color: 'var(--accent)' }}>◇</span>, t: tr('Condición', 'Condition'), d: tr('¿Stock > 0? → NO', 'Stock > 0? → NO') },
              { on: f3 >= 5, hot: f3 >= 6, icon: <TeamsLogo size={20} />, t: 'Teams', d: tr('Avisar supervisor', 'Notify supervisor') },
              { on: f3 >= 5, hot: f3 >= 7, icon: <ErpIcon size={18} />, t: 'ERP', d: tr('Reservar 5 unidades', 'Reserve 5 units') },
            ].map((n, i) => (
              <div key={i} style={{ ...rv(n.on, 6), display: 'flex', alignItems: 'center', gap: '9px', background: '#101c33', border: `1px solid ${n.hot ? 'rgba(113,177,54,0.6)' : 'rgba(255,255,255,0.12)'}`, borderRadius: '11px', padding: '10px 12px', transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, border-color 0.25s ease-out' }}>
                <span style={{ width: '24px', display: 'inline-flex', justifyContent: 'center', flexShrink: 0 }}>{n.icon}</span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, color: '#fff' }}>{n.t}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', color: 'rgba(255,255,255,0.5)' }}>{n.d}</div>
                </div>
                <span style={{ width: '14px', height: '14px', borderRadius: '50%', flexShrink: 0, background: n.hot ? 'var(--accent)' : 'rgba(255,255,255,0.08)', color: '#0f172a', fontSize: '8.5px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ position: 'relative', zIndex: 2 }}><Spine active={active >= 4} label={tr('dos acciones, un instante', 'two actions, one instant')} /></div>

        {/* ── PASO 4 — TEAMS + ERP EN PARALELO ── */}
        <section ref={(el) => { secRefs.current[4] = el; }} style={{ minHeight: '86vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 20px', position: 'relative', zIndex: 2 }}>
          {stepHeader(4, tr('El supervisor se entera por Teams y el ERP ya está reservando stock. Nadie levantó un teléfono.', 'The supervisor finds out via Teams and the ERP is already reserving stock. Nobody picked up a phone.'))}
          <div className="wbx-s4-row" style={{ display: 'flex', justifyContent: 'center', gap: '22px', alignItems: 'stretch', maxWidth: '880px', margin: '0 auto', width: '100%' }}>
            {/* Teams */}
            <div style={{ ...panel, flex: 1, minWidth: 0, padding: '16px 18px', ...rv(f4 >= 1, 10) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <TeamsLogo size={30} />
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 800, color: '#fff' }}>Microsoft Teams</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>{tr('Canal · Supervisión Zona Norte', 'Channel · North Zone Supervision')}</div>
                </div>
                <span style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: f4 >= 2 ? 'var(--accent)' : 'rgba(255,255,255,0.15)', transition: 'background 0.25s ease-out' }} />
              </div>
              <div style={{ ...rv(f4 >= 2, 6), background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderLeft: '3px solid #5059C9', borderRadius: '10px', padding: '11px 13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '5px' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(113,177,54,0.2)', border: '1px solid rgba(113,177,54,0.45)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '9px', fontWeight: 800 }}>WB</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#fff' }}>Workflow Builder</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.35)' }}>{tr('ahora', 'now')}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.55 }}>
                  ⚠ {tr('García se quedó sin Modem XR-500 (próxima actividad 09:30). Ya reservé 5 unidades en el ERP — retiro mañana 07:00.', 'García is out of Modem XR-500 (next activity 09:30). I already reserved 5 units in the ERP — pickup tomorrow 07:00.')}
                </div>
              </div>
              <div style={{ ...rv(f4 >= 4, 4), marginTop: '10px', textAlign: 'right', fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
                {tr('visto por el supervisor ✓', 'seen by supervisor ✓')}
              </div>
            </div>
            {/* ERP */}
            <div style={{ ...panel, flex: 1, minWidth: 0, padding: '16px 18px', ...rv(f4 >= 1, 10) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><ErpIcon size={19} /></span>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 800, color: '#fff' }}>ERP · {tr('Logística', 'Logistics')}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>{tr('vía API · webhook seguro', 'via API · secure webhook')}</div>
                </div>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '9.5px', fontWeight: 700, color: 'var(--accent)', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.35)', borderRadius: '999px', padding: '2px 8px', opacity: f4 >= 3 ? 1 : 0, transition: 'opacity 0.25s ease-out' }}>200 OK</span>
              </div>
              <div style={{ ...rv(f4 >= 3, 6), background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '11px 13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: '11.5px', padding: '3px 0' }}>
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>{tr('Orden de reserva', 'Reservation order')}</span><span style={{ color: '#fff', fontWeight: 700 }}>#R-2291</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: '11.5px', padding: '3px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>{tr('Ítem', 'Item')}</span><span style={{ color: '#fff' }}>5 × Modem XR-500</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: '11.5px', padding: '3px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>{tr('Retiro', 'Pickup')}</span><span style={{ color: 'var(--accent)', fontWeight: 700 }}>{tr('mañana 07:00', 'tomorrow 07:00')}</span>
                </div>
              </div>
              <div style={{ ...rv(f4 >= 4, 4), marginTop: '10px', textAlign: 'right', fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
                {tr('stock asegurado para la ruta de mañana', 'stock secured for tomorrow’s route')}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <span style={{ ...rv(f4 >= 4, 6), display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.4)', borderRadius: '999px', padding: '7px 16px' }}>
              <Sparkle size={12} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', fontWeight: 600, color: '#fff' }}>{tr('Ejecutadas en paralelo — 1.8 s desde el evento', 'Run in parallel — 1.8 s from the event')}</span>
            </span>
          </div>
        </section>

        <div style={{ position: 'relative', zIndex: 2 }}><Spine active={active >= 5} label={tr('y el ciclo se cierra', 'and the loop closes')} /></div>

        {/* ── CIERRE ── */}
        <section ref={(el) => { secRefs.current[5] = el; }} style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 20px 120px', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '38px', fontWeight: 900, color: '#fff', lineHeight: 1.15, margin: '0 0 12px', textAlign: 'center' }}>
            {tr('Nadie llamó. Nadie esperó.', 'Nobody called. Nobody waited.')}<br />
            <span style={{ color: 'var(--accent)' }}>{tr('El flujo lo resolvió.', 'The flow solved it.')}</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.6)', margin: '0 0 36px', textAlign: 'center', maxWidth: '520px', lineHeight: 1.7 }}>
            {tr('Esto corre miles de veces por día, con tus reglas y tus sistemas.', 'This runs thousands of times a day, with your rules and your systems.')}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {[
              ['1.8 s', tr('del evento a la acción', 'from event to action')],
              ['2', tr('sistemas sincronizados', 'systems synced')],
              ['0', tr('llamadas y planillas', 'calls & spreadsheets')],
            ].map((m, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(113,177,54,0.3)', borderRadius: '14px', padding: '18px 26px', minWidth: '160px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '34px', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>{m[0]}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '6px' }}>{m[1]}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/productos/workflow-builder#demo" style={{ background: 'var(--accent)', color: '#fff', padding: '15px 36px', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>
              {tr('Quiero esto en mi operación →', 'I want this in my operation →')}
            </Link>
            <Link to="/productos/workflow-builder" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '15px 36px', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '15px', textDecoration: 'none' }}>
              {tr('Ver la página del producto', 'See the product page')}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
