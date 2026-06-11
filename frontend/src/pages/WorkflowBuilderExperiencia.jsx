import { useEffect, useRef, useState } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';

// Página EXPERIMENTAL — scrollytelling cinemático del Workflow Builder.
// El scroll del usuario es el scrubber: 0 → 1 reproduce la historia completa.

const seg = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));
const eo = (t) => 1 - (1 - t) * (1 - t);

const WBX_MSG_ES = 'Listo! Instalación terminada y probada ✅';
const WBX_MSG_EN = 'Done! Install finished and tested ✅';

const WBX_ACTS = [
  { at: 0.0, es: 'sistemas en línea · esperando eventos', en: 'systems online · awaiting events', lblEs: 'Inicio', lblEn: 'Start' },
  { at: 0.08, es: 'escuchando · canal WhatsApp', en: 'listening · WhatsApp channel', lblEs: 'Evento', lblEn: 'Event' },
  { at: 0.22, es: 'interpretando lenguaje natural…', en: 'parsing natural language…', lblEs: 'IA', lblEn: 'AI' },
  { at: 0.4, es: 'orquestando plan de ejecución…', en: 'orchestrating execution plan…', lblEs: 'Orquestación', lblEn: 'Orchestration' },
  { at: 0.62, es: 'sincronizando OFS y sistemas…', en: 'syncing OFS & systems…', lblEs: 'Sistemas', lblEn: 'Systems' },
  { at: 0.8, es: 'ciclo cerrado · aprendiendo del resultado', en: 'loop closed · learning from outcome', lblEs: 'Cierre', lblEn: 'Close' },
];

const Sparkle = ({ size = 16, opacity = 1 }) => (
  <svg width={size} height={size * 0.86} viewBox="0 0 28 24" fill="none" aria-hidden="true" style={{ opacity }}>
    <path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.4" strokeLinejoin="round" />
    <path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.3" strokeLinejoin="round" opacity="0.7" />
    <path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.3" strokeLinejoin="round" opacity="0.5" />
  </svg>
);

export default function WorkflowBuilderExperiencia() {
  const { lang } = useLang();
  const tr = (es, en) => (lang === 'es' ? es : en);
  const trackRef = useRef(null);
  const [p, setP] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const passed = Math.min(Math.max(-rect.top, 0), total);
      setP(passed / total);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const msg = tr(WBX_MSG_ES, WBX_MSG_EN);
  let act = 0;
  WBX_ACTS.forEach((a, i) => { if (p >= a.at) act = i; });

  const jumpTo = (frac) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.offsetTop + frac * (el.offsetHeight - window.innerHeight) + 2;
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  };

  // ── timeline ──
  const tTitle = (1 - seg(p, 0.05, 0.09));
  const tPhone = eo(seg(p, 0.08, 0.13));
  const chars = Math.floor(seg(p, 0.11, 0.19) * msg.length);
  const sent = p >= 0.2;
  const tChip = eo(seg(p, 0.22, 0.3));
  const chipOp = p < 0.22 ? 0 : 1 - seg(p, 0.3, 0.33);
  const tConf = seg(p, 0.28, 0.38);
  const anaOut = seg(p, 0.4, 0.44);
  const tOfs = eo(seg(p, 0.62, 0.68));
  const ofsDone = p >= 0.7;
  const tSlack = eo(seg(p, 0.72, 0.76));
  const tEnd = seg(p, 0.8, 0.88);
  const tMet = seg(p, 0.82, 0.94);
  const coreSpeed = act === 2 ? '3.5s' : act === 3 ? '5s' : '11s';

  const nodes = [
    { x: 22, y: 76, g: '⚡', t: 'Trigger', d: tr('Mensaje recibido', 'Message received') },
    { x: 39, y: 83, g: '✦', t: tr('Nodo IA', 'AI Node'), d: tr('Intención confirmada', 'Intent confirmed') },
    { x: 56, y: 83, g: '↻', t: 'OFS API', d: tr('Completar #4512', 'Complete #4512') },
    { x: 73, y: 76, g: '💬', t: 'Slack', d: tr('Avisar supervisión', 'Notify supervision') },
  ];
  const anaChips = [
    { y: 28, hdr: tr('Intención', 'Intent'), val: 'completar_actividad', conf: true },
    { y: 43, hdr: tr('Entidad', 'Entity'), val: tr('actividad #4512', 'activity #4512') },
    { y: 58, hdr: tr('Plan generado', 'Generated plan'), val: tr('OFS + Slack · 2 pasos', 'OFS + Slack · 2 steps') },
  ];

  const phoneMsgs = (
    <>
      <div style={{ alignSelf: 'flex-start', maxWidth: '88%', background: 'rgba(255,255,255,0.07)', borderRadius: '10px 10px 10px 2px', padding: '7px 10px', fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.45, opacity: p >= 0.1 || reduced ? 1 : 0, transition: 'opacity 0.25s ease-out' }}>
        {tr('Hola García 👋 ¿novedades de la actividad #4512?', 'Hi García 👋 any updates on activity #4512?')}
      </div>
      <div style={{ alignSelf: 'flex-end', maxWidth: '88%', background: 'rgba(113,177,54,0.16)', border: '1px solid rgba(113,177,54,0.3)', borderRadius: '10px 10px 2px 10px', padding: '7px 10px', fontFamily: 'var(--font-body)', fontSize: '11px', color: '#fff', lineHeight: 1.45, opacity: chars > 0 || reduced ? 1 : 0 }}>
        {reduced ? msg : msg.slice(0, chars)}
        <span style={{ display: 'block', textAlign: 'right', fontSize: '9px', color: sent || reduced ? 'var(--accent)' : 'rgba(255,255,255,0.35)' }}>✓✓</span>
      </div>
      <div style={{ alignSelf: 'flex-start', maxWidth: '88%', background: 'rgba(255,255,255,0.07)', borderRadius: '10px 10px 10px 2px', padding: '7px 10px', fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.45, opacity: p >= 0.84 || reduced ? 1 : 0, transition: 'opacity 0.25s ease-out' }}>
        ✓ {tr('OFS actualizado — #4512 completada. ¡Buen trabajo!', 'OFS updated — #4512 completed. Nice work!')}
      </div>
    </>
  );

  return (
    <>
      <Head>
        <title>{tr('Workflow Builder — Experiencia | Connexa Services', 'Workflow Builder — Experience | Connexa Services')}</title>
        <meta name="description" content="Experiencia interactiva de Workflow Builder — la IA que orquesta tu operación de campo." />
        <meta name="robots" content="noindex" />
      </Head>
      <style>{`
        @keyframes wbxSpin { to { transform: rotate(360deg); } }
        @keyframes wbxSpinR { to { transform: rotate(-360deg); } }
        @keyframes wbxFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes wbxBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(7px); } }
        @keyframes wbxDrift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .wbx-hud-line { animation: wbxFadeIn 0.4s ease-out; }
        .wbx-rail-btn { display: flex; align-items: center; gap: 10px; background: none; border: none; padding: 6px 4px; cursor: pointer; min-height: 30px; }
        .wbx-rail-btn:focus-visible { outline: 2px solid #71B136; outline-offset: 3px; border-radius: 6px; }
        .wbx-rail-lbl { font-family: var(--font-body); font-size: 10.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.25s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .wbx-spin, .wbx-spin-r, .wbx-bob, .wbx-drift { animation: none !important; }
        }
        @media (max-width: 900px) {
          .wbx-rail-lbl { display: none; }
          .wbx-title-h1 { font-size: 30px !important; }
          .wbx-phone { width: 168px !important; left: 3vw !important; }
          .wbx-ofs { width: 215px !important; left: auto !important; right: 2vw !important; }
          .wbx-node { width: 138px !important; }
          .wbx-ana { left: 56vw !important; width: 36vw !important; }
          .wbx-met-num { font-size: 34px !important; }
        }
      `}</style>

      {reduced ? (
        /* ── Fallback estático (reduced motion) ── */
        <div style={{ background: 'linear-gradient(180deg, #060d1f 0%, #0d1b3e 100%)', padding: '120px 20px 80px' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>{tr('Workflow Builder · Experiencia', 'Workflow Builder · Experience')}</div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '38px', fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: '0 0 40px' }}>{tr('La IA que orquesta tu operación', 'The AI that orchestrates your operation')}</h1>
            {WBX_ACTS.slice(1).map((a, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '18px 22px', marginBottom: '12px', textAlign: 'left', display: 'flex', gap: '14px', alignItems: 'center' }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>{i + 1}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700, color: '#fff' }}>{tr(a.lblEs, a.lblEn)}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>✦ {tr(a.es, a.en)}</div>
                </div>
              </div>
            ))}
            <Link to="/productos/workflow-builder" style={{ display: 'inline-block', marginTop: '24px', background: 'var(--accent)', color: '#fff', padding: '14px 32px', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>{tr('Ver la página del producto', 'See the product page')}</Link>
          </div>
        </div>
      ) : (
        <div ref={trackRef} style={{ height: '680vh', position: 'relative', background: '#060d1f' }}>
          <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'radial-gradient(ellipse 120% 90% at 50% 40%, #0d1b3e 0%, #060d1f 70%)' }}>

            {/* Fondo: grilla + glows + sparkles */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5 }} aria-hidden="true">
              <defs>
                <pattern id="wbx-dots" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.9" fill="rgba(113,177,54,0.16)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#wbx-dots)" />
            </svg>
            <div style={{ position: 'absolute', width: '70vw', height: '70vw', borderRadius: '50%', background: `radial-gradient(circle, rgba(113,177,54,${0.05 + 0.07 * seg(p, 0.22, 0.4)}) 0%, transparent 65%)`, left: '50%', top: '45vh', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} aria-hidden="true" />
            {[['12vw', '18vh', 13, '6s'], ['86vw', '30vh', 10, '8s'], ['18vw', '78vh', 9, '7s']].map(([x, y, s, d], i) => (
              <span key={i} className="wbx-drift" style={{ position: 'absolute', left: x, top: y, animation: `wbxDrift ${d} ease-in-out infinite`, opacity: 0.5 }} aria-hidden="true"><Sparkle size={s} /></span>
            ))}

            {/* Capa principal (se atenúa en el cierre) */}
            <div style={{ position: 'absolute', inset: 0, opacity: 1 - 0.7 * tEnd, transform: `scale(${1 - 0.05 * tEnd})`, transition: 'opacity 0.1s linear' }}>

              {/* Hilos de la IA */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
                <line x1="24" y1="44" x2="45" y2="45" stroke="rgba(113,177,54,0.5)" strokeWidth="0.16" strokeDasharray="1.4 1.1" style={{ animation: 'dashFlow 1.6s linear infinite', opacity: p >= 0.13 && p < 0.45 ? 1 : 0, transition: 'opacity 0.3s ease-out' }} />
                {anaChips.map((c, i) => (
                  <line key={i} x1="54" y1="45" x2="61" y2={c.y + 4} stroke="rgba(113,177,54,0.45)" strokeWidth="0.14" strokeDasharray="1.2 1" style={{ animation: `dashFlow 1.4s linear ${i * 0.2}s infinite`, opacity: p >= 0.26 + i * 0.03 && anaOut < 1 ? 1 - anaOut : 0, transition: 'opacity 0.3s ease-out' }} />
                ))}
                {nodes.map((n, i) => (
                  <line key={`n${i}`} x1="50" y1="50" x2={n.x + 6} y2={n.y - 2} stroke="rgba(113,177,54,0.5)" strokeWidth="0.16" strokeDasharray="1.4 1.1" style={{ animation: `dashFlow 1.3s linear ${i * 0.15}s infinite`, opacity: p >= 0.48 + i * 0.03 && p < 0.78 ? 1 : 0, transition: 'opacity 0.3s ease-out' }} />
                ))}
                <line x1="54" y1="42" x2="76" y2="30" stroke="rgba(113,177,54,0.55)" strokeWidth="0.18" strokeDasharray="1.4 1.1" style={{ animation: 'dashFlow 1.2s linear infinite', opacity: p >= 0.64 && p < 0.95 ? 1 : 0, transition: 'opacity 0.3s ease-out' }} />
              </svg>

              {/* Núcleo IA */}
              <div style={{ position: 'absolute', left: '50vw', top: '45vh', transform: 'translate(-50%, -50%)', width: '180px', height: '180px' }} aria-hidden="true">
                <svg className="wbx-spin" viewBox="0 0 180 180" style={{ position: 'absolute', inset: 0, animation: `wbxSpin ${coreSpeed} linear infinite` }}>
                  <circle cx="90" cy="90" r="84" fill="none" stroke="rgba(113,177,54,0.25)" strokeWidth="1" strokeDasharray="10 14" />
                </svg>
                <svg className="wbx-spin-r" viewBox="0 0 180 180" style={{ position: 'absolute', inset: 0, animation: `wbxSpinR ${coreSpeed} linear infinite` }}>
                  <circle cx="90" cy="90" r="62" fill="none" stroke="rgba(113,177,54,0.4)" strokeWidth="1" strokeDasharray="4 9" />
                </svg>
                <svg className="wbx-spin" viewBox="0 0 180 180" style={{ position: 'absolute', inset: 0, animation: `wbxSpin ${coreSpeed} linear infinite`, animationDelay: '-2s' }}>
                  <circle cx="90" cy="90" r="42" fill="none" stroke="rgba(113,177,54,0.55)" strokeWidth="1.2" strokeDasharray="2 6" />
                </svg>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.5)', boxShadow: `0 0 ${28 + 36 * seg(p, 0.22, 0.4)}px rgba(113,177,54,0.35)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkle size={26} />
                </div>
                <div style={{ position: 'absolute', left: '50%', top: 'calc(100% + 8px)', transform: 'translateX(-50%)', fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(113,177,54,0.8)', whiteSpace: 'nowrap' }}>
                  Connexa AI
                </div>
              </div>

              {/* Teléfono */}
              <div className="wbx-phone" style={{ position: 'absolute', left: '6vw', top: '22vh', width: '218px', opacity: tPhone, transform: `translateX(${-40 * (1 - tPhone)}px)`, borderRadius: '20px', background: '#0b1220', border: '1px solid rgba(255,255,255,0.14)', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(113,177,54,0.2)', border: '1px solid rgba(113,177,54,0.45)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '10px', fontWeight: 800, flexShrink: 0 }}>C</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '10.5px', fontWeight: 700, color: '#fff' }}>Connexa Field Bot</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'var(--accent)' }}>{tr('en línea', 'online')}</div>
                  </div>
                </div>
                <div style={{ padding: '11px 9px', minHeight: '168px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {phoneMsgs}
                </div>
                <div style={{ textAlign: 'center', padding: '0 0 8px', fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{tr('Técnico · García', 'Technician · García')}</div>
              </div>

              {/* Chip mensaje viajando al núcleo */}
              <div style={{ position: 'absolute', left: '24vw', top: '46vh', opacity: chipOp, transform: `translate(${(22 * tChip).toFixed(2)}vw, ${(-1.5 * tChip).toFixed(2)}vh) scale(${1 - 0.1 * tChip})`, zIndex: 3 }} aria-hidden="true">
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 600, color: 'var(--accent)', background: '#060d1f', border: '1px solid rgba(113,177,54,0.5)', borderRadius: '999px', padding: '4px 11px', whiteSpace: 'nowrap', boxShadow: '0 0 18px rgba(113,177,54,0.25)' }}>💬 {tr('mensaje del técnico', 'technician message')}</span>
              </div>

              {/* Chips de análisis IA */}
              {anaChips.map((c, i) => {
                const t = eo(seg(p, 0.26 + i * 0.03, 0.32 + i * 0.03));
                return (
                  <div key={i} className="wbx-ana" style={{ position: 'absolute', left: '61vw', top: `${c.y}vh`, width: '240px', opacity: t * (1 - anaOut), transform: `translateX(${-6 * (1 - t)}vw)`, background: 'rgba(10,18,38,0.9)', border: '1px solid rgba(113,177,54,0.35)', borderRadius: '10px', padding: '10px 13px', zIndex: 2 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '3px' }}>✦ {c.hdr}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: '#fff' }}>{c.val}</div>
                    {c.conf && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '7px' }}>
                        <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: '98%', background: 'var(--accent)', transform: `scaleX(${tConf})`, transformOrigin: 'left' }} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 800, color: 'var(--accent)' }}>{Math.round(98 * tConf)}%</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Nodos del workflow */}
              {nodes.map((n, i) => {
                const t = eo(seg(p, 0.4 + i * 0.025, 0.47 + i * 0.025));
                const check = p >= 0.52 + i * 0.03;
                return (
                  <div key={i} className="wbx-node" style={{ position: 'absolute', left: `${n.x}vw`, top: `${n.y}vh`, width: '168px', opacity: t, transform: `translate(${((50 - n.x) * (1 - t)).toFixed(2)}vw, ${((45 - n.y) * (1 - t)).toFixed(2)}vh) scale(${0.6 + 0.4 * t})`, background: '#101c33', border: `1px solid ${check ? 'rgba(113,177,54,0.65)' : 'rgba(255,255,255,0.14)'}`, borderRadius: '11px', padding: '10px 12px', boxShadow: check ? '0 0 24px rgba(113,177,54,0.2)' : '0 10px 30px rgba(0,0,0,0.4)', transition: 'border-color 0.25s ease-out, box-shadow 0.25s ease-out', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(113,177,54,0.12)', border: '1px solid rgba(113,177,54,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '11px', flexShrink: 0 }}>{n.g}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '11.5px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{n.t}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '9.5px', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.d}</div>
                      </div>
                      <span style={{ marginLeft: 'auto', width: '14px', height: '14px', borderRadius: '50%', flexShrink: 0, background: check ? 'var(--accent)' : 'rgba(255,255,255,0.08)', color: '#0f172a', fontSize: '8.5px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.25s ease-out' }}>✓</span>
                    </div>
                  </div>
                );
              })}

              {/* Panel OFS */}
              <div className="wbx-ofs" style={{ position: 'absolute', left: '71vw', top: '20vh', width: '286px', opacity: tOfs, transform: `translateX(${5 * (1 - tOfs)}vw)`, background: '#0d1426', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', padding: '14px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '11px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" /></svg>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, color: '#fff' }}>Oracle Field Service</span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, color: 'var(--accent)', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.35)', borderRadius: '999px', padding: '2px 8px', opacity: p >= 0.74 ? 1 : 0, transition: 'opacity 0.25s ease-out' }}>200 OK</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '11px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 800, color: '#fff' }}>#4512</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', color: 'rgba(255,255,255,0.55)' }}>{tr('Instalación fibra', 'Fiber install')}</span>
                    <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, borderRadius: '999px', padding: '3px 8px', whiteSpace: 'nowrap', background: ofsDone ? 'rgba(113,177,54,0.15)' : 'rgba(255,255,255,0.07)', border: `1px solid ${ofsDone ? 'rgba(113,177,54,0.5)' : 'rgba(255,255,255,0.15)'}`, color: ofsDone ? 'var(--accent)' : 'rgba(255,255,255,0.6)', transition: 'background 0.3s ease-out, color 0.3s ease-out, border-color 0.3s ease-out' }}>
                      {ofsDone ? tr('✓ COMPLETADA', '✓ COMPLETED') : tr('EN CURSO', 'IN PROGRESS')}
                    </span>
                  </div>
                  {[[tr('Cliente', 'Customer'), 'María López'], [tr('Recurso', 'Resource'), 'García']].map((f, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', padding: '4px 0', borderTop: '1px solid rgba(255,255,255,0.06)', fontFamily: 'var(--font-body)', fontSize: '10.5px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.4)' }}>{f[0]}</span>
                      <span style={{ color: 'rgba(255,255,255,0.75)' }}>{f[1]}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: '7px', fontFamily: 'var(--font-body)', fontSize: '9.5px', color: 'var(--accent)', opacity: p >= 0.72 ? 1 : 0, transition: 'opacity 0.25s ease-out' }}>
                    ✦ {tr('Cerrada por Workflow Builder · hace 1 s', 'Closed by Workflow Builder · 1 s ago')}
                  </div>
                </div>
              </div>

              {/* Toast Slack */}
              <div style={{ position: 'absolute', left: '66vw', top: '62vh', opacity: tSlack, transform: `translateY(${10 * (1 - tSlack)}px)`, background: '#101c33', border: '1px solid rgba(255,255,255,0.14)', borderLeft: '3px solid var(--accent)', borderRadius: '10px', padding: '10px 14px', width: '250px', zIndex: 2, boxShadow: '0 14px 40px rgba(0,0,0,0.45)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, color: '#fff', marginBottom: '3px' }}>Slack · #supervisores</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>✓ {tr('#4512 completada por García — cerrada automáticamente', '#4512 completed by García — auto-closed')}</div>
              </div>
            </div>

            {/* Título inicial */}
            <div style={{ position: 'absolute', left: '50%', top: '40vh', transform: `translate(-50%, ${-20 * (1 - tTitle)}px)`, opacity: tTitle, textAlign: 'center', zIndex: 4, width: 'min(820px, 92vw)', pointerEvents: tTitle > 0.5 ? 'auto' : 'none' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.35)', borderRadius: '999px', padding: '7px 18px' }}>
                <Sparkle size={14} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>{tr('Experiencia interactiva', 'Interactive experience')}</span>
              </div>
              <h1 className="wbx-title-h1" style={{ fontFamily: 'var(--font-heading)', fontSize: '54px', fontWeight: 900, color: '#fff', lineHeight: 1.08, margin: '0 0 18px' }}>
                {tr('Mirá a la IA', 'Watch the AI')}<br />
                <span style={{ color: 'var(--accent)' }}>{tr('orquestar tu operación', 'orchestrate your operation')}</span>
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.7 }}>
                {tr('Una ejecución real de Workflow Builder, contada por la propia IA.', 'A real Workflow Builder run, narrated by the AI itself.')}<br />
                <strong style={{ color: '#fff' }}>{tr('Tu scroll es el play.', 'Your scroll is the play button.')}</strong>
              </p>
              <div className="wbx-bob" style={{ marginTop: '36px', animation: 'wbxBob 1.6s ease-in-out infinite', color: 'var(--accent)', fontSize: '22px' }} aria-hidden="true">▾</div>
            </div>

            {/* Cierre: métricas + CTA */}
            <div style={{ position: 'absolute', left: '50%', top: '34vh', transform: `translate(-50%, ${24 * (1 - tEnd)}px)`, opacity: tEnd, textAlign: 'center', zIndex: 4, width: 'min(880px, 92vw)', pointerEvents: tEnd > 0.5 ? 'auto' : 'none' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '40px', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '0 0 10px' }}>
                {tr('La IA cerró el ciclo.', 'The AI closed the loop.')}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.6)', margin: '0 0 36px' }}>
                {tr('Sin despacho. Sin código. Sin esperas.', 'No dispatch. No code. No waiting.')}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', flexWrap: 'wrap', marginBottom: '40px' }}>
                {[
                  [(2.1 * tMet).toFixed(1) + ' s', tr('de mensaje a OFS', 'from message to OFS')],
                  [String(Math.round(8 * (1 - tMet))), tr('pasos manuales (eran 8)', 'manual steps (was 8)')],
                  [Math.round(100 * tMet) + '%', tr('trazable y auditable', 'traceable & auditable')],
                ].map((m, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(113,177,54,0.3)', borderRadius: '14px', padding: '20px 28px', minWidth: '170px' }}>
                    <div className="wbx-met-num" style={{ fontFamily: 'var(--font-heading)', fontSize: '40px', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>{m[0]}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', color: 'rgba(255,255,255,0.55)', marginTop: '6px' }}>{m[1]}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', opacity: p >= 0.92 ? 1 : 0, transition: 'opacity 0.3s ease-out' }}>
                <Link to="/productos/workflow-builder#demo" style={{ background: 'var(--accent)', color: '#fff', padding: '15px 36px', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>
                  {tr('Quiero esto en mi operación →', 'I want this in my operation →')}
                </Link>
                <Link to="/productos/workflow-builder" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '15px 36px', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '15px', textDecoration: 'none' }}>
                  {tr('Ver la página del producto', 'See the product page')}
                </Link>
              </div>
            </div>

            {/* HUD del orquestador */}
            <div style={{ position: 'absolute', left: '50%', bottom: '3vh', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(6,13,31,0.85)', border: '1px solid rgba(113,177,54,0.3)', borderRadius: '999px', padding: '9px 20px', zIndex: 5, maxWidth: '92vw' }}>
              <Sparkle size={13} />
              <span className="wbx-hud-line" key={act} style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.8)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {tr('ORQUESTADOR', 'ORCHESTRATOR')} · {tr(WBX_ACTS[act].es, WBX_ACTS[act].en)}
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 800, color: 'var(--accent)', flexShrink: 0 }}>{Math.round(p * 100)}%</span>
            </div>

            {/* Riel de capítulos */}
            <div style={{ position: 'absolute', right: '2vw', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '2px', zIndex: 5 }}>
              {WBX_ACTS.map((a, i) => (
                <button key={i} type="button" className="wbx-rail-btn" onClick={() => jumpTo(a.at + 0.005)} aria-label={tr(a.lblEs, a.lblEn)}>
                  <span className="wbx-rail-lbl" style={{ color: act === i ? 'var(--accent)' : 'rgba(255,255,255,0.35)' }}>{tr(a.lblEs, a.lblEn)}</span>
                  <span style={{ width: act === i ? '11px' : '7px', height: act === i ? '11px' : '7px', borderRadius: '50%', background: act === i ? 'var(--accent)' : 'rgba(113,177,54,0.3)', transition: 'all 0.25s ease-out', flexShrink: 0, marginLeft: 'auto' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
