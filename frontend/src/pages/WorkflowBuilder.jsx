import { Fragment, useEffect, useRef, useState } from 'react';
import { Head } from 'vite-react-ssg';
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

const CASO1_TEXT = 'Crea un flujo que tome todas las actividades no programadas del recurso Buenos Aires y las programe para mañana';
const CASO1_SEGS = [
  { t: 'Crea un flujo que ', g: false },
  { t: 'tome todas las actividades no programadas ', g: true },
  { t: 'del recurso Buenos Aires y ', g: false },
  { t: 'las programe para mañana', g: true },
];

const CASO2_TEXT = 'Cuántas actividades tiene asignadas el recurso García para mañana en zona norte';

// Duraciones (ms) de cada paso de las escenas animadas de los casos de uso
const S1_DUR = [450, 450, 450, 450, 550, 450, 450, 450, 700];
const S2_DUR = [700, 900, 1000, 800];
const S3_DUR = [650, 500, 650, 500, 650, 500, 700];
const S4_DUR = [500, 500, 750, 850, 700];
const S5_DUR = [550, 550, 550, 500, 800, 600];

const WB_TABS = [
  { key: 'constructor', label: 'Constructor visual' },
  { key: 'ejecuciones', label: 'Ejecuciones' },
  { key: 'orquestaciones', label: 'Orquestaciones' },
  { key: 'panel', label: 'Panel principal' },
];

const HOW_STEPS = [
  {
    titleEs: 'Ocurre un evento', titleEn: 'An event occurs',
    descEs: 'Una actividad se completa, un inventario cambia, un formulario se guarda.',
    descEn: 'An activity completes, inventory changes, a form is saved.',
    icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  },
  {
    titleEs: 'El trigger lo captura', titleEn: 'The trigger catches it',
    descEs: 'Workflow Builder lo recibe en tiempo real. Sin polling.',
    descEn: 'Workflow Builder receives it in real time. No polling.',
    icon: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" fill="var(--accent)" stroke="none" /></>,
  },
  {
    titleEs: 'El workflow se ejecuta', titleEn: 'The workflow runs',
    descEs: 'Condiciones y acciones — con un nodo de IA que analiza y decide.',
    descEn: 'Conditions and actions — with an AI node that analyzes and decides.',
    icon: <><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></>,
  },
  {
    titleEs: 'Se integra con todo', titleEn: 'It integrates with everything',
    descEs: 'Slack, Teams, email, webhooks, APIs y bases de datos.',
    descEn: 'Slack, Teams, email, webhooks, APIs and databases.',
    icon: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></>,
  },
  {
    titleEs: 'OFS queda actualizado', titleEn: 'OFS stays updated',
    descEs: 'El resultado vuelve a Oracle Field Service. Ciclo cerrado.',
    descEn: 'The result goes back to Oracle Field Service. Loop closed.',
    icon: <><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></>,
  },
];

const HOW_LOG = [
  { glyph: '⚡', es: '14:32:05 · OFS — Actividad #4512 «Instalación fibra» completada', en: '14:32:05 · OFS — Activity #4512 “Fiber install” completed' },
  { glyph: '◉', es: 'Trigger «Actividad completada» disparado — filtros verificados', en: 'Trigger “Activity completed” fired — filters verified' },
  { glyph: '✦', es: 'Nodo IA: cliente VIP detectado → notificación prioritaria', en: 'AI node: VIP customer detected → priority notification' },
  { glyph: '→', es: 'Slack #operaciones notificado · CRM actualizado vía API', en: 'Slack #operations notified · CRM updated via API' },
  { glyph: '✓', es: 'OFS actualizado — ciclo completado en 1.2 s', en: 'OFS updated — cycle completed in 1.2 s' },
];

// Reveal helper: opacity/transform según el paso de la escena
const rv = (on, dy = 8) => ({ opacity: on ? 1 : 0, transform: on ? 'none' : `translateY(${dy}px)`, transition: 'opacity 0.25s ease-out, transform 0.25s ease-out' });

// Avanza step según durations; al terminar espera holdMs y reinicia (loop)
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

function WbsHeader({ left, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '14px' }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>{left}</span>
      {right}
    </div>
  );
}

function WbsAiChip({ text }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(113,177,54,0.12)', border: '1px solid rgba(113,177,54,0.35)', borderRadius: '999px', padding: '3px 10px', fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 600, color: 'var(--accent)', whiteSpace: 'nowrap' }}>✦ {text}</span>
  );
}

// Caso 01 — el prompt se escribe, el flujo se construye nodo a nodo y se ejecuta
function SceneFlujo({ active, reduced, tr }) {
  const [chars, setChars] = useState(0);
  const typed = reduced || chars >= CASO1_TEXT.length;
  useEffect(() => {
    if (reduced) return;
    if (!active) { setChars(0); return; }
    if (chars < CASO1_TEXT.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 26);
      return () => clearTimeout(t);
    }
  }, [active, chars, reduced]);
  const raw = useSceneLoop(active && !reduced && typed, S1_DUR, 2600);
  const step = reduced ? S1_DUR.length : raw;
  const nodes = [
    { t: 'Trigger', d: tr('Actividad sin programar', 'Unscheduled activity') },
    { t: tr('Condición', 'Condition'), d: tr('Recurso = Buenos Aires', 'Resource = Buenos Aires') },
    { t: tr('Acción', 'Action'), d: tr('Programar → mañana', 'Schedule → tomorrow') },
    { t: 'Slack', d: tr('Notificar #despacho', 'Notify #dispatch') },
  ];
  return (
    <div style={{ background: '#0f172a', padding: '20px' }}>
      <WbsHeader left={tr('Asistente IA — Constructor', 'AI Assistant — Builder')} right={<WbsAiChip text={tr('construyendo flujo', 'building flow')} />} />
      <div style={{ border: '1px solid rgba(113,177,54,0.4)', borderRadius: '10px', padding: '14px 16px', marginBottom: '16px' }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '13.5px', lineHeight: 1.6, minHeight: '42px' }}>
          {(() => {
            let rem = reduced ? CASO1_TEXT.length : chars;
            return CASO1_SEGS.map((seg, si) => {
              if (rem <= 0) return null;
              const show = seg.t.slice(0, rem);
              rem -= seg.t.length;
              return <span key={si} style={{ color: seg.g ? 'var(--accent)' : '#fff' }}>{show}</span>;
            });
          })()}
          {!reduced && <span style={{ display: 'inline-block', width: '2px', height: '1em', background: 'var(--accent)', marginLeft: '2px', verticalAlign: 'text-bottom', animation: 'blink 1s step-end infinite' }} />}
        </p>
      </div>
      <div className="wbs-flow">
        {nodes.map((n, i) => (
          <Fragment key={i}>
            {i > 0 && (
              <svg className="wbs-flow-conn" width="26" height="10" viewBox="0 0 26 10" fill="none" aria-hidden="true" style={{ opacity: step >= i + 1 ? 1 : 0.15, transition: 'opacity 0.25s ease-out', flexShrink: 0, alignSelf: 'center' }}>
                <line x1="0" y1="5" x2="19" y2="5" stroke="rgba(113,177,54,0.6)" strokeWidth="1.5" strokeDasharray="4 3" />
                <polygon points="19,1.5 26,5 19,8.5" fill="rgba(113,177,54,0.55)" />
              </svg>
            )}
            <div className="wbs-flow-node" style={{ ...rv(step >= i + 1), borderColor: step >= i + 5 ? 'rgba(113,177,54,0.65)' : 'rgba(255,255,255,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11.5px', fontWeight: 700, color: '#fff' }}>{n.t}</span>
                <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: step >= i + 5 ? 'var(--accent)' : 'rgba(255,255,255,0.08)', color: '#0f172a', fontSize: '9px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.25s ease-out' }}>✓</span>
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>{n.d}</div>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ ...rv(step >= 9), marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.35)', borderRadius: '10px', padding: '12px 14px' }}>
        <span style={{ color: 'var(--accent)', fontSize: '15px' }}>✓</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#fff' }}>{tr('12 actividades programadas para mañana — #despacho notificado', '12 activities scheduled for tomorrow — #dispatch notified')}</span>
      </div>
    </div>
  );
}

// Caso 02 — conversación con el agente de IA y respuesta con datos de OFS
function SceneAgente({ active, reduced, tr }) {
  const raw = useSceneLoop(active && !reduced, S2_DUR, 3000);
  const step = reduced ? S2_DUR.length : raw;
  const rows = [
    ['08:30', tr('Instalación — Zona Norte', 'Install — North Zone')],
    ['11:00', tr('Reparación — Zona Norte', 'Repair — North Zone')],
    ['15:30', tr('Mantenimiento — Zona Norte', 'Maintenance — North Zone')],
  ];
  return (
    <div style={{ background: '#0f172a', padding: '20px' }}>
      <WbsHeader left="#operaciones · Slack" right={<WbsAiChip text={tr('Agente Connexa', 'Connexa Agent')} />} />
      <div style={{ ...rv(step >= 1), display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <div style={{ maxWidth: '85%', background: 'rgba(255,255,255,0.08)', borderRadius: '12px 12px 2px 12px', padding: '10px 14px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#fff', lineHeight: 1.5 }}>
          {tr('¿', '')}{tr(CASO2_TEXT, 'How many activities does resource García have tomorrow in the north zone')}?
        </div>
      </div>
      {!reduced && step === 2 && (
        <div style={{ display: 'flex', gap: '4px', padding: '8px 2px', alignItems: 'center' }} aria-hidden="true">
          {[0, 1, 2].map((d) => (
            <span key={d} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(113,177,54,0.7)', animation: `blink 1.2s step-end ${d * 0.35}s infinite` }} />
          ))}
        </div>
      )}
      <div style={{ ...rv(step >= 3), display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <span style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(113,177,54,0.15)', border: '1px solid rgba(113,177,54,0.4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '12px', flexShrink: 0 }}>✦</span>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(113,177,54,0.3)', borderRadius: '2px 12px 12px 12px', padding: '12px 14px' }}>
          <p style={{ margin: '0 0 10px 0', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#fff', lineHeight: 1.5 }}>
            {tr('García tiene 3 actividades mañana en zona norte:', 'García has 3 activities tomorrow in the north zone:')}
          </p>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', padding: '6px 0', borderTop: '1px solid rgba(255,255,255,0.07)', fontFamily: 'var(--font-body)', fontSize: '12.5px' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>{r[0]}</span>
              <span style={{ color: 'rgba(255,255,255,0.75)' }}>{r[1]}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ ...rv(step >= 4), marginTop: '14px', textAlign: 'right' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{tr('Datos en vivo de OFS · respondido en 0.9 s', 'Live OFS data · answered in 0.9 s')}</span>
      </div>
    </div>
  );
}

// Caso 03 — los chats de Collaboration se respaldan en la base de datos
function SceneBackup({ active, reduced, tr }) {
  const raw = useSceneLoop(active && !reduced, S3_DUR, 2800);
  const step = reduced ? S3_DUR.length : raw;
  const msgs = [
    ['García', tr('Llegué al sitio, cliente ausente', 'On site, customer absent'), '14:02'],
    ['Supervisor', tr('Esperá 10 min y reintentá', 'Wait 10 min and retry'), '14:04'],
    ['García', tr('Cliente llegó, iniciando instalación', 'Customer arrived, starting install'), '14:11'],
  ];
  return (
    <div style={{ background: '#0f172a', padding: '20px' }}>
      <WbsHeader left="OFS Collaboration" right={<WbsAiChip text={tr('backup automático', 'auto backup')} />} />
      <div className="wbs-split">
        <div style={{ flex: 1, minWidth: 0 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ ...rv(step >= i * 2 + 1), marginBottom: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '9px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '3px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'var(--accent)' }}>{m[0]}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>{m[2]}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.45 }}>{m[1]}</div>
            </div>
          ))}
        </div>
        <svg className="wbs-split-conn" width="30" height="14" viewBox="0 0 30 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, alignSelf: 'center' }}>
          <line x1="0" y1="7" x2="22" y2="7" stroke="rgba(113,177,54,0.55)" strokeWidth="1.5" strokeDasharray="4 3" className="wfb-how-dash" style={{ animation: 'dashFlow 1.5s linear infinite' }} />
          <polygon points="22,3 30,7 22,11" fill="rgba(113,177,54,0.5)" />
        </svg>
        <div style={{ flex: 1, minWidth: 0, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>backup_collaboration</span>
          </div>
          {msgs.map((m, i) => (
            <div key={i} style={{ ...rv(step >= i * 2 + 2, 4), display: 'flex', gap: '8px', padding: '5px 0', borderTop: '1px solid rgba(255,255,255,0.06)', fontFamily: 'var(--font-body)', fontSize: '10.5px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>#{1042 + i}</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>{m[2]}</span>
              <span style={{ color: 'rgba(255,255,255,0.65)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m[1]}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ ...rv(step >= 7), marginTop: '14px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.35)', borderRadius: '10px', padding: '10px 14px' }}>
        <span style={{ color: 'var(--accent)', fontSize: '14px' }}>✓</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: '#fff' }}>{tr('3/3 mensajes respaldados — trazabilidad completa para auditoría', '3/3 messages backed up — full traceability for audit')}</span>
      </div>
    </div>
  );
}

// Caso 04 — checklist de inventario con faltante que dispara la alerta
function SceneInventario({ active, reduced, tr }) {
  const raw = useSceneLoop(active && !reduced, S4_DUR, 2800);
  const step = reduced ? S4_DUR.length : raw;
  const items = [
    [tr('ONT Router AX-200', 'ONT Router AX-200'), true],
    [tr('Cable drop 50 m', 'Drop cable 50 m'), true],
    [tr('Modem XR-500', 'Modem XR-500'), false],
  ];
  return (
    <div style={{ background: '#0f172a', padding: '20px' }}>
      <WbsHeader left={tr('Inventario — Van 24 · Téc. García', 'Inventory — Van 24 · Tech García')} right={<WbsAiChip text={tr('detección automática', 'auto detection')} />} />
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '6px 14px', marginBottom: '14px' }}>
        {items.map((it, i) => {
          const missing = !it[1];
          const on = step >= i + 1;
          return (
            <div key={i} style={{ ...rv(on, 4), display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '9px 0', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: missing ? '#FF8A80' : 'rgba(255,255,255,0.8)' }}>{it[0]}</span>
              {missing ? (
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.06em', color: '#FF8A80', background: 'rgba(255,95,87,0.12)', border: '1px solid rgba(255,95,87,0.35)', borderRadius: '999px', padding: '2px 9px', whiteSpace: 'nowrap' }}>{tr('FALTANTE', 'MISSING')}</span>
              ) : (
                <span style={{ color: 'var(--accent)', fontSize: '13px' }}>✓</span>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ ...rv(step >= 4), background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderLeft: '3px solid var(--accent)', borderRadius: '10px', padding: '12px 14px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '5px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#fff' }}>Slack · #supervisores</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>{tr('ahora', 'now')}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
          ⚠ {tr('García sin Modem XR-500 para la actividad #4512 de las 09:30', 'García is missing Modem XR-500 for activity #4512 at 09:30')}
        </div>
      </div>
      <div style={{ ...rv(step >= 5), display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>{tr('+ copia por Email al supervisor de zona', '+ Email copy to the zone supervisor')}</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: 'var(--accent)' }}>{tr('Notificado en 0.8 s', 'Notified in 0.8 s')}</span>
      </div>
    </div>
  );
}

// Caso 05 — el formulario se completa, se guarda y viaja al sistema externo
function SceneFormulario({ active, reduced, tr }) {
  const raw = useSceneLoop(active && !reduced, S5_DUR, 2800);
  const step = reduced ? S5_DUR.length : raw;
  const fields = [
    [tr('Cliente', 'Customer'), 'María López'],
    [tr('Dirección', 'Address'), 'Av. Córdoba 1180'],
    [tr('Firma digital', 'Digital signature'), '✓'],
  ];
  return (
    <div style={{ background: '#0f172a', padding: '20px' }}>
      <WbsHeader left={tr('Formulario OFS — Acta de instalación', 'OFS Form — Install report')} right={<WbsAiChip text={tr('sync automático', 'auto sync')} />} />
      <div className="wbs-s5">
        <div style={{ flex: '1 1 55%', minWidth: 0, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px' }}>
          {fields.map((f, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? '10px' : 0 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '3px' }}>{f[0]}</div>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${step >= i + 1 ? 'rgba(113,177,54,0.45)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '7px', padding: '7px 10px', fontFamily: 'var(--font-body)', fontSize: '12.5px', color: step >= i + 1 ? '#fff' : 'rgba(255,255,255,0.2)', minHeight: '17px', transition: 'border-color 0.25s ease-out, color 0.25s ease-out' }}>
                {step >= i + 1 ? f[1] : '—'}
              </div>
            </div>
          ))}
          <div style={{ marginTop: '12px', textAlign: 'right' }}>
            <span style={{ display: 'inline-block', background: step >= 4 ? 'var(--accent)' : 'rgba(113,177,54,0.25)', color: step >= 4 ? '#fff' : 'rgba(255,255,255,0.5)', borderRadius: '7px', padding: '7px 16px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, transform: step === 4 ? 'scale(0.96)' : 'none', transition: 'background 0.2s ease-out, transform 0.15s ease-out' }}>
              {step >= 4 ? tr('Guardado ✓', 'Saved ✓') : tr('Guardar', 'Save')}
            </span>
          </div>
        </div>
        <div className="wbs-s5-mid" style={{ flexShrink: 0, alignSelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <span style={{ ...rv(step >= 5, 0), fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--accent)', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.35)', borderRadius: '6px', padding: '3px 8px', whiteSpace: 'nowrap' }}>{'{ form: #8841 }'}</span>
          <svg width="34" height="14" viewBox="0 0 34 14" fill="none" aria-hidden="true">
            <line x1="0" y1="7" x2="26" y2="7" stroke="rgba(113,177,54,0.55)" strokeWidth="1.5" strokeDasharray="4 3" className="wfb-how-dash" style={{ animation: step >= 5 ? 'dashFlow 1.2s linear infinite' : 'none', opacity: step >= 5 ? 1 : 0.25, transition: 'opacity 0.25s ease-out' }} />
            <polygon points="26,3 34,7 26,11" fill="rgba(113,177,54,0.5)" />
          </svg>
        </div>
        <div style={{ flex: '1 1 32%', minWidth: 0, alignSelf: 'center', background: 'rgba(255,255,255,0.03)', border: `1px solid ${step >= 6 ? 'rgba(113,177,54,0.5)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '10px', padding: '14px', textAlign: 'center', transition: 'border-color 0.25s ease-out' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" aria-hidden="true" style={{ marginBottom: '6px' }}><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{tr('Sistema legado / ERP', 'Legacy system / ERP')}</div>
          <span style={{ ...rv(step >= 6, 4), display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 700, color: 'var(--accent)', background: 'rgba(113,177,54,0.12)', border: '1px solid rgba(113,177,54,0.4)', borderRadius: '999px', padding: '2px 10px' }}>200 OK</span>
        </div>
      </div>
      <div style={{ ...rv(step >= 6), marginTop: '14px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', color: 'rgba(255,255,255,0.45)' }}>{tr('Cada formulario guardado en OFS se sincroniza vía API — sin intervención manual', 'Every form saved in OFS syncs via API — no manual intervention')}</span>
      </div>
    </div>
  );
}

// Capa de inteligencia — pipeline: eventos OFS → base de datos → agente LLM
const INT_PIPE_DUR = [700, 500, 700, 500, 700, 500, 900];
const INT_DEMO_DUR = [800, 900, 900, 1400, 2200, 800, 900, 900, 1400];

function LlmPipeline({ active, reduced, tr }) {
  const raw = useSceneLoop(active && !reduced, INT_PIPE_DUR, 2400);
  const step = reduced ? INT_PIPE_DUR.length : raw;
  const events = [
    { g: '⚡', t: tr('Ruta iniciada · 08:15', 'Route started · 08:15') },
    { g: '✓', t: tr('Actividad completada', 'Activity completed') },
    { g: '▤', t: tr('Formulario guardado', 'Form saved') },
  ];
  const inserts = step >= 6 ? 3 : step >= 4 ? 2 : step >= 2 ? 1 : 0;
  const counts = ['1.248.301', '1.248.302', '1.248.303', '1.248.304'];
  const countsEn = ['1,248,301', '1,248,302', '1,248,303', '1,248,304'];
  const conn = (delay) => (
    <div className="wfb-int-conn" aria-hidden="true">
      <svg width="46" height="14" viewBox="0 0 46 14" fill="none">
        <line x1="0" y1="7" x2="38" y2="7" stroke="rgba(113,177,54,0.5)" strokeWidth="1.5" strokeDasharray="5 4" className="wfb-how-dash" style={{ animation: `dashFlow 2s linear ${delay}s infinite` }} />
        <polygon points="38,3 46,7 38,11" fill="rgba(113,177,54,0.45)" />
      </svg>
    </div>
  );
  return (
    <div className="wfb-int-pipe fade-up d1">
      <div className="wfb-int-node">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: '#fff' }}>{tr('Eventos OFS', 'OFS Events')}</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '10.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{tr('tiempo real', 'real time')}</span>
        </div>
        {events.map((e, i) => (
          <div key={i} className="wfb-int-chip" style={rv(step >= i * 2 + 1, 6)}>
            <span style={{ color: 'var(--accent)', flexShrink: 0 }}>{e.g}</span>{e.t}
          </div>
        ))}
      </div>
      {conn(0)}
      <div className="wfb-int-node">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: '#fff' }}>{tr('Base de datos', 'Database')}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{tr(counts[inserts], countsEn[inserts])}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.45)', margin: '4px 0 12px' }}>{tr('registros guardados', 'stored records')}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {[tr('actividades', 'activities'), tr('rutas', 'routes'), tr('recursos', 'resources'), tr('inventarios', 'inventory')].map((t, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '3px 8px' }}>{t}</span>
          ))}
        </div>
      </div>
      {conn(0.4)}
      <div className="wfb-int-node wfb-int-node--ai" style={{ boxShadow: step >= 7 ? '0 0 36px rgba(113,177,54,0.18)' : 'none', transition: 'box-shadow 0.25s ease-out' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <svg width="20" height="17" viewBox="0 0 28 24" fill="none" aria-hidden="true">
            <path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.4" strokeLinejoin="round" />
            <path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.3" strokeLinejoin="round" opacity="0.7" />
            <path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.3" strokeLinejoin="round" opacity="0.5" />
          </svg>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: '#fff' }}>{tr('Agente de IA', 'AI Agent')}</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em' }}>LLM</span>
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '12px' }}>
          {tr('Lee los datos, entiende el contexto de tu operación y responde al instante.', 'Reads the data, understands your operation’s context and answers instantly.')}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {[tr('consultas', 'queries'), tr('gráficos', 'charts'), tr('alertas', 'alerts')].map((t, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 600, color: 'var(--accent)', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.3)', borderRadius: '999px', padding: '3px 10px' }}>✦ {t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Demo del agente: consultas en chat con gráficos generados sobre los datos
function LlmDemo({ active, reduced, tr }) {
  const raw = useSceneLoop(active && !reduced, INT_DEMO_DUR, 3400);
  const step = reduced ? INT_DEMO_DUR.length : raw;
  const bars1 = [['08:00', 6, false], ['08:15', 14, true], ['08:30', 9, false], ['08:45', 4, false]];
  const bars2 = [['Martínez', 94, true], ['García', 88, false], ['López', 81, false], ['Ruiz', 76, false]];
  const dots = (
    <div style={{ display: 'flex', gap: '4px', padding: '6px 2px 14px', alignItems: 'center' }} aria-hidden="true">
      {[0, 1, 2].map((d) => (
        <span key={d} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(113,177,54,0.7)', animation: `blink 1.2s step-end ${d * 0.35}s infinite` }} />
      ))}
    </div>
  );
  const userBubble = (on, text) => (
    <div style={{ ...rv(on), display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
      <div style={{ maxWidth: '85%', background: 'rgba(255,255,255,0.08)', borderRadius: '12px 12px 2px 12px', padding: '10px 14px', fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#fff', lineHeight: 1.5 }}>{text}</div>
    </div>
  );
  const chartCaption = (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', color: 'rgba(255,255,255,0.35)', marginTop: '10px' }}>
      ✦ {tr('Generado por el agente sobre datos en vivo de OFS', 'Generated by the agent on live OFS data')}
    </div>
  );
  return (
    <div className="wfb-int-demo fade-up d2">
      <div style={{ height: '38px', background: '#1e293b', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '7px' }}>
        <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FFBD2E' }} />
        <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28CA41' }} />
        <span style={{ marginLeft: '10px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Connexa Intelligence</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{tr('conectado a OFS · en vivo', 'connected to OFS · live')}</span>
      </div>
      <div style={{ background: '#0f172a', padding: '22px 24px' }}>
        {userBubble(step >= 1, tr('¿Cuántos técnicos iniciaron ruta a las 8:15?', 'How many technicians started their route at 8:15?'))}
        {!reduced && step === 2 && dots}
        <div style={{ ...rv(step >= 3), display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '18px' }}>
          <span style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(113,177,54,0.15)', border: '1px solid rgba(113,177,54,0.4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '12px', flexShrink: 0 }}>✦</span>
          <div style={{ flex: 1, minWidth: 0, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(113,177,54,0.3)', borderRadius: '2px 12px 12px 12px', padding: '12px 14px' }}>
            <p style={{ margin: '0 0 12px 0', fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#fff', lineHeight: 1.55 }}>
              {tr('14 técnicos iniciaron ruta a las 8:15 — la distribución de la mañana:', '14 technicians started their route at 8:15 — the morning distribution:')}
            </p>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>{tr('Inicios de ruta — hoy', 'Route starts — today')}</div>
              <div style={{ display: 'flex', alignItems: 'stretch', gap: '14px', height: '112px' }}>
                {bars1.map(([lbl, v, hot], i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '5px' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 800, color: hot ? 'var(--accent)' : 'rgba(255,255,255,0.55)', opacity: step >= 4 ? 1 : 0, transition: `opacity 0.3s ease-out ${0.45 + i * 0.09}s` }}>{v}</span>
                    <div style={{ width: '100%', maxWidth: '44px', height: `${Math.round((v / 14) * 62)}px`, borderRadius: '5px 5px 2px 2px', background: hot ? 'var(--accent)' : 'rgba(113,177,54,0.3)', transform: step >= 4 ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'bottom', transition: `transform 0.5s ease-out ${i * 0.09}s` }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', color: hot ? 'var(--accent)' : 'rgba(255,255,255,0.4)', fontWeight: hot ? 700 : 400 }}>{lbl}</span>
                  </div>
                ))}
              </div>
              {chartCaption}
            </div>
          </div>
        </div>
        {userBubble(step >= 6, tr('¿Cuál es el técnico más performante de zona norte?', 'Who is the top performing technician in the north zone?'))}
        {!reduced && step === 7 && dots}
        <div style={{ ...rv(step >= 8), display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(113,177,54,0.15)', border: '1px solid rgba(113,177,54,0.4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '12px', flexShrink: 0 }}>✦</span>
          <div style={{ flex: 1, minWidth: 0, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(113,177,54,0.3)', borderRadius: '2px 12px 12px 12px', padding: '12px 14px' }}>
            <p style={{ margin: '0 0 12px 0', fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#fff', lineHeight: 1.55 }}>
              {tr('Martínez lidera zona norte con 94% de cumplimiento y el mejor tiempo promedio por actividad.', 'Martínez leads the north zone with 94% completion and the best average time per activity.')}
            </p>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>{tr('Performance zona norte — últimos 30 días', 'North zone performance — last 30 days')}</div>
              {bars2.map(([name, v, top], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < 3 ? '9px' : 0 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', fontWeight: top ? 700 : 400, color: top ? 'var(--accent)' : 'rgba(255,255,255,0.6)', width: '64px', flexShrink: 0 }}>{name}{top ? ' ★' : ''}</span>
                  <div style={{ flex: 1, height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <div style={{ width: `${v}%`, height: '100%', borderRadius: '5px', background: top ? 'var(--accent)' : 'rgba(113,177,54,0.35)', transform: step >= 9 ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: `transform 0.55s ease-out ${i * 0.1}s` }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11.5px', fontWeight: 800, color: top ? 'var(--accent)' : 'rgba(255,255,255,0.5)', width: '34px', textAlign: 'right', flexShrink: 0, opacity: step >= 9 ? 1 : 0, transition: `opacity 0.3s ease-out ${0.5 + i * 0.1}s` }}>{v}%</span>
                </div>
              ))}
              {chartCaption}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hero — canvas de workflow animado: el flujo se construye, ejecuta y repite
const HERO_DUR = [600, 600, 600, 700, 900, 800, 900];

function HeroCanvas({ active, reduced, tr }) {
  const raw = useSceneLoop(active && !reduced, HERO_DUR, 3000);
  const step = reduced ? HERO_DUR.length : raw;
  const [runs, setRuns] = useState(1024);
  useEffect(() => { if (step === 7 && !reduced) setRuns((r) => r + 1); }, [step, reduced]);
  const fmt = (n) => `${Math.floor(n / 1000)}${tr('.', ',')}${String(n % 1000).padStart(3, '0')}`;
  const connStroke = (on) => (on ? 'rgba(113,177,54,0.85)' : 'rgba(113,177,54,0.35)');
  const node = (key, pos, on, hot, icon, title, sub, check) => (
    <div key={key} style={{ position: 'absolute', left: pos[0], top: pos[1], width: '22%', ...rv(on, 10), background: '#1e293b', border: `1px solid ${hot ? 'rgba(113,177,54,0.65)' : 'rgba(255,255,255,0.12)'}`, borderRadius: '10px', padding: '10px 12px', boxShadow: hot ? '0 0 26px rgba(113,177,54,0.22)' : '0 8px 24px rgba(0,0,0,0.35)', transition: 'opacity 0.25s ease-out, transform 0.25s ease-out, border-color 0.25s ease-out, box-shadow 0.25s ease-out', zIndex: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '24px', height: '24px', borderRadius: '7px', background: 'rgba(113,177,54,0.12)', border: '1px solid rgba(113,177,54,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</div>
        </div>
        <span style={{ marginLeft: 'auto', width: '15px', height: '15px', borderRadius: '50%', flexShrink: 0, background: check ? 'var(--accent)' : 'rgba(255,255,255,0.08)', color: '#0f172a', fontSize: '9.5px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.25s ease-out' }}>✓</span>
      </div>
    </div>
  );
  const ic = {
    zap: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
    ai: <svg width="14" height="12" viewBox="0 0 28 24" fill="none" aria-hidden="true"><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.4" strokeLinejoin="round" /><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.3" strokeLinejoin="round" opacity="0.7" /></svg>,
    chat: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
    sync: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>,
  };
  return (
    <div style={{ position: 'relative', height: '460px', background: '#0d1426', overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <pattern id="dots-hero-canvas" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(113,177,54,0.25)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-hero-canvas)" />
      </svg>

      {/* Conectores bezier */}
      <svg viewBox="0 0 700 460" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }} aria-hidden="true">
        <path d="M 175 198 C 210 198, 217 191, 252 191" fill="none" stroke={connStroke(step >= 4)} strokeWidth="1.6" strokeDasharray="6 4" className="wfb-how-dash" style={{ animation: 'dashFlow 1.4s linear infinite', opacity: step >= 2 ? 1 : 0, transition: 'opacity 0.3s ease-out, stroke 0.25s ease-out' }} />
        <path d="M 406 185 C 436 185, 425 78, 455 78" fill="none" stroke={connStroke(step >= 6)} strokeWidth="1.6" strokeDasharray="6 4" className="wfb-how-dash" style={{ animation: 'dashFlow 1.4s linear 0.2s infinite', opacity: step >= 3 ? 1 : 0, transition: 'opacity 0.3s ease-out, stroke 0.25s ease-out' }} />
        <path d="M 406 197 C 436 197, 425 308, 455 308" fill="none" stroke={connStroke(step >= 6)} strokeWidth="1.6" strokeDasharray="6 4" className="wfb-how-dash" style={{ animation: 'dashFlow 1.4s linear 0.4s infinite', opacity: step >= 3 ? 1 : 0, transition: 'opacity 0.3s ease-out, stroke 0.25s ease-out' }} />
        {[[175, 198, 2], [252, 191, 2], [406, 191, 3], [455, 78, 3], [455, 308, 3]].map(([cx, cy, s], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill="#0d1426" stroke="var(--accent)" strokeWidth="1.5" style={{ opacity: step >= s ? 1 : 0, transition: 'opacity 0.3s ease-out' }} />
        ))}
      </svg>

      {/* Etiquetas de rama */}
      <span style={{ position: 'absolute', left: '61%', top: '24%', ...rv(step >= 3, 4), fontFamily: 'var(--font-body)', fontSize: '9.5px', fontWeight: 600, color: 'var(--accent)', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.3)', borderRadius: '999px', padding: '2px 8px', zIndex: 2 }}>{tr('prioridad alta', 'high priority')}</span>
      <span style={{ position: 'absolute', left: '61%', top: '57%', ...rv(step >= 3, 4), fontFamily: 'var(--font-body)', fontSize: '9.5px', fontWeight: 600, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px', padding: '2px 8px', zIndex: 2 }}>{tr('estándar', 'standard')}</span>

      {/* Nodos */}
      {node('t', ['3%', '38%'], step >= 1, step >= 4, ic.zap, 'Trigger · OFS', tr('Actividad completada', 'Activity completed'), step >= 4)}
      {node('a', ['36%', '36.5%'], step >= 2, step >= 5, ic.ai, tr('Nodo IA', 'AI Node'), tr('Analiza y decide', 'Analyzes & decides'), step >= 6)}
      {node('s', ['65%', '12%'], step >= 3, step >= 6, ic.chat, 'Slack', tr('Notificar #vip', 'Notify #vip'), step >= 6)}
      {node('o', ['65%', '62%'], step >= 3, step >= 6, ic.sync, 'OFS API', tr('Actualizar actividad', 'Update activity'), step >= 6)}

      {/* Overlay superior */}
      <div style={{ position: 'absolute', top: '12px', left: '14px', right: '14px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 3 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{tr('Constructor visual', 'Visual builder')}</span>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)', fontSize: '10.5px', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '3px 10px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />{tr('activo', 'active')}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 600, color: 'var(--accent)', background: 'rgba(113,177,54,0.1)', border: '1px solid rgba(113,177,54,0.3)', borderRadius: '999px', padding: '3px 10px' }}>
          ▶ {fmt(runs)} {tr('ejecuciones hoy', 'runs today')}
        </span>
      </div>

      {/* Controles de zoom + minimapa */}
      <div style={{ position: 'absolute', left: '14px', bottom: '14px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 3 }} aria-hidden="true">
        {['+', '−', '⤢'].map((g, i) => (
          <span key={i} style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{g}</span>
        ))}
      </div>
      <div style={{ position: 'absolute', right: '14px', bottom: '14px', width: '64px', height: '42px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', zIndex: 3, padding: '6px' }} aria-hidden="true">
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <span style={{ position: 'absolute', left: '4%', top: '40%', width: '14px', height: '6px', borderRadius: '2px', background: 'rgba(113,177,54,0.45)' }} />
          <span style={{ position: 'absolute', left: '40%', top: '38%', width: '14px', height: '6px', borderRadius: '2px', background: 'rgba(113,177,54,0.45)' }} />
          <span style={{ position: 'absolute', left: '74%', top: '10%', width: '14px', height: '6px', borderRadius: '2px', background: 'rgba(113,177,54,0.3)' }} />
          <span style={{ position: 'absolute', left: '74%', top: '64%', width: '14px', height: '6px', borderRadius: '2px', background: 'rgba(113,177,54,0.3)' }} />
        </div>
      </div>

      {/* Toast de ejecución */}
      <div style={{ position: 'absolute', bottom: '16px', left: '50%', opacity: step >= 7 ? 1 : 0, transform: step >= 7 ? 'translateX(-50%)' : 'translateX(-50%) translateY(6px)', transition: 'opacity 0.25s ease-out, transform 0.25s ease-out', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(113,177,54,0.12)', border: '1px solid rgba(113,177,54,0.4)', borderRadius: '999px', padding: '7px 16px', zIndex: 3, whiteSpace: 'nowrap' }}>
        <span style={{ color: 'var(--accent)', fontSize: '12px' }}>✓</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', fontWeight: 600, color: '#fff' }}>{tr('Ejecución', 'Run')} #{fmt(runs)} · 1.2 s</span>
      </div>
    </div>
  );
}

export default function WorkflowBuilderClient() {
  const { lang } = useLang();
  const ctaRef = useRef(null);

  const [activeCaso, setActiveCaso] = useState(0);
  const [activeTab, setActiveTab] = useState('constructor');
  const [formSent, setFormSent] = useState(false);
  const casosSectionRef = useRef(null);
  const caseRefs = useRef([]);
  const activeCasoRef = useRef(0);
  const [dotsVisible, setDotsVisible] = useState(false);
  const [reducedAnim, setReducedAnim] = useState(false);
  const [howStep, setHowStep] = useState(0);
  const [howReduced, setHowReduced] = useState(false);
  const howRef = useRef(null);
  const llmRef = useRef(null);
  const [llmVisible, setLlmVisible] = useState(false);
  const heroRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);

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
    const observers = [];
    caseRefs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.intersectionRatio >= 0.5) setActiveCaso(idx); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  useEffect(() => { activeCasoRef.current = activeCaso; }, [activeCaso]);

  useEffect(() => {
    const section = casosSectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => setDotsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const section = casosSectionRef.current;
    if (!section) return;
    let touchStartY = 0;
    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      const next = delta > 0
        ? Math.min(activeCasoRef.current + 1, WB_CASOS.length - 1)
        : Math.max(activeCasoRef.current - 1, 0);
      scrollToCase(next);
    };
    section.addEventListener('touchstart', onTouchStart, { passive: true });
    section.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      section.removeEventListener('touchstart', onTouchStart);
      section.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  useEffect(() => {
    setReducedAnim(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const el = llmRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setLlmVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = howRef.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setHowReduced(true);
      setHowStep(HOW_LOG.length - 1);
      return;
    }
    let interval = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!interval) interval = setInterval(() => setHowStep((s) => (s + 1) % HOW_LOG.length), 2400);
        } else if (interval) {
          clearInterval(interval);
          interval = null;
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => { io.disconnect(); if (interval) clearInterval(interval); };
  }, []);

  const scrollToCase = (idx) => {
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    caseRefs.current[idx]?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Head>
        <title>Workflow Builder | Connexa Services</title>
        <meta name="description" content="Workflow Builder — Constructor visual de flujos de trabajo para Oracle Field Service Cloud. Automatizá procesos OFSC sin escribir código." />
        <meta name="keywords" content="Oracle Field Service, OFSC, Workflow Builder, Field Service Management, automatización OFSC, no-code" />
      </Head>
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        .wfb-dot-btn { background: none; cursor: pointer; padding: 0; border: none; }
        .wfb-dot-btn:focus-visible { outline: 2px solid #71B136; outline-offset: 3px; border-radius: 50%; }
        .wbs-flow { display: flex; align-items: stretch; gap: 6px; }
        .wbs-flow-node { flex: 1; min-width: 0; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 10px 12px; }
        .wbs-split { display: flex; gap: 12px; align-items: stretch; }
        .wbs-s5 { display: flex; gap: 12px; align-items: stretch; }
        @media (max-width: 768px) {
          .wbs-flow { flex-wrap: wrap; gap: 8px; }
          .wbs-flow-conn { display: none; }
          .wbs-flow-node { flex: 1 1 calc(50% - 4px); min-width: calc(50% - 4px); }
          .wbs-split { flex-direction: column; }
          .wbs-split-conn { transform: rotate(90deg); margin: 2px auto; }
          .wbs-s5 { flex-direction: column; }
          .wbs-s5-mid { transform: rotate(90deg); margin: 2px auto; }
        }
      `}</style>
      <style>{`
        @media (max-width: 768px) {
          .wfb-hero-layout  { flex-direction: column !important; padding: 48px 20px !important; gap: 24px !important; }
          .wfb-hero-left    { flex: none !important; width: 100% !important; }
          .wfb-hero-right   { flex: none !important; width: 100% !important; display: none !important; }
          .wfb-hero-title   { font-size: 36px !important; }
          .wfb-features-wrapper { padding: 24px 20px !important; }
          .wfb-features-bar     { flex-wrap: wrap !important; gap: 16px !important; justify-content: flex-start !important; }
          .wfb-feature-item     { flex: none !important; width: calc(50% - 8px) !important; padding: 0 8px !important; }
          .wfb-casos-container { overflow-x: hidden !important; width: 100% !important; }
          .wfb-caso-wrapper { flex-direction: column !important; width: 100% !important; overflow: hidden !important; min-height: auto !important; height: auto !important; }
          .wfb-caso-left    { width: 100% !important; padding: 32px 20px !important; box-sizing: border-box !important; }
          .wfb-caso-right   { width: 100% !important; padding: 16px 20px 60px 20px !important; box-sizing: border-box !important; order: 2 !important; overflow: visible !important; min-height: 400px !important; }
          .wfb-caso-right img { width: 100% !important; height: auto !important; max-height: none !important; display: block !important; }
          .wfb-caso-numero { font-size: 80px !important; }
          .wfb-triggers-grid { grid-template-columns: 1fr !important; }
          .wfb-eventos-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .wfb-apis-grid     { grid-template-columns: 1fr !important; }
          .wfb-modulos-hdr    { padding: 48px 20px !important; }
          .wfb-modulos-title  { font-size: 28px !important; }
          .wfb-modulos-stats  { gap: 32px !important; flex-wrap: wrap !important; justify-content: center !important; }
          .wfb-triggers-section { padding: 48px 20px !important; }
          .wfb-eventos-section  { padding: 48px 20px !important; }
          .wfb-apis-section     { padding: 48px 20px !important; }
          .wfb-cta-section      { padding: 48px 20px !important; }
          .wfb-cta-title        { font-size: 28px !important; }
          .wfb-nav-dots         { display: none !important; }
        }
      `}</style>
      {/* ── HERO FULLSCREEN ── */}
      <div ref={heroRef} style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #0d1b3e 0%, #172554 60%, #1a3a2a 100%)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '0' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}>
          <defs>
            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#71B136"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(113,177,54,0.12) 0%, transparent 70%)', top: '-100px', right: '20%', pointerEvents: 'none' }} />
        <div className="wfb-hero-layout" style={{ display: 'flex', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '80px 60px', alignItems: 'center', gap: '80px', position: 'relative', zIndex: 2 }}>
          {/* Columna izquierda 48% */}
          <div className="wfb-hero-left" style={{ flex: '0 0 48%' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(113,177,54,0.12)', border: '1px solid rgba(113,177,54,0.3)', borderRadius: '999px', padding: '8px 18px', marginBottom: '32px' }}>
              <svg width="1em" height="0.85em" viewBox="0 0 28 24" fill="none" style={{display:'inline-block', verticalAlign:'middle'}}><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg>
              <span style={{ color: '#71B136', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em' }}>
                {tr('Impulsado por Inteligencia Artificial', 'Powered by Artificial Intelligence')}
              </span>
            </div>
            <div className="wfb-hero-title" style={{ fontSize: '64px', fontWeight: 900, lineHeight: 1.05, color: 'white', marginBottom: '8px' }}>Workflow Builder</div>
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
          <div className="wfb-hero-right" style={{ flex: '0 0 58%' }}>
            <div style={{ width: '100%', position: 'relative', transform: 'perspective(1200px) rotateY(-4deg) rotateX(2deg)', transformStyle: 'preserve-3d' }}>
              <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(ellipse, rgba(113,177,54,0.15) 0%, transparent 70%)', borderRadius: '20px', zIndex: 0 }} />
              <div style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 50px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)', position: 'relative', zIndex: 1, background: '#0d1426' }}>
                <div style={{ height: '40px', background: '#1e293b', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '7px' }}>
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FF5F57' }} />
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FFBD2E' }} />
                  <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28CA41' }} />
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '6px', height: '22px', margin: '0 12px', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>newwfbuilder.fsmtool.com/workflows</span>
                  </div>
                </div>
                <HeroCanvas active={heroVisible} reduced={reducedAnim} tr={tr} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES FRANJA ── */}
      <div className="wfb-features-wrapper" style={{ background: '#0d1b3e', padding: '32px 60px' }}>
        <div className="wfb-features-bar" style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { icon: <svg key="i0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, text: tr('Sin código — solo drag & drop', 'No code — just drag & drop') },
            { icon: <svg key="i1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, text: tr('Editor visual de workflows', 'Visual workflow editor') },
            { icon: <svg key="i2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, text: tr('+40 APIs de OFS nativas', '+40 native OFS APIs') },
            { icon: <svg key="i3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, text: tr('Triggers en tiempo real', 'Real-time triggers') },
            { icon: <svg key="i4" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71B136" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, text: tr('Slack, Teams, email integrado', 'Slack, Teams, email integrated') },
          ].map((f, i) => (
            <div key={i} className="wfb-feature-item" style={{ flex: 1, padding: '0 40px', display: 'flex', alignItems: 'center', gap: '12px', borderRight: i < 4 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              {f.icon}
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 500 }}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── QUÉ ES / CÓMO FUNCIONA / PARA QUIÉN ── */}
      <style>{`
        .wfb-what-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .wfb-what-card { background: #F8FAFC; border: 1px solid #E5E7EB; border-radius: 16px; padding: 32px; }
        .wfb-what-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(113,177,54,0.1); border: 1px solid rgba(113,177,54,0.22); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
        .wfb-how-pipeline { display: flex; align-items: stretch; justify-content: center; gap: 10px; }
        .wfb-how-node { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 22px 18px; min-width: 190px; max-width: 210px; flex: 0 1 auto; text-align: center; transition: border-color 0.25s ease-out, background 0.25s ease-out, box-shadow 0.25s ease-out, transform 0.25s ease-out; }
        .wfb-how-node--active { border-color: rgba(113,177,54,0.55); background: rgba(113,177,54,0.07); box-shadow: 0 0 36px rgba(113,177,54,0.16); transform: translateY(-4px); }
        .wfb-how-node--exec { min-width: 230px; max-width: 250px; }
        .wfb-how-node-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; transition: background 0.25s ease-out; }
        .wfb-how-node--active .wfb-how-node-icon { background: rgba(113,177,54,0.14); }
        .wfb-how-step-num { font-family: var(--font-body); font-size: 11px; font-weight: 800; letter-spacing: 0.14em; color: rgba(255,255,255,0.35); margin-bottom: 10px; transition: color 0.25s ease-out; }
        .wfb-how-node--active .wfb-how-step-num { color: var(--accent); }
        .wfb-how-chips { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin-top: 12px; }
        .wfb-how-chip { font-family: var(--font-body); font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 999px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.7); }
        .wfb-how-chip--ai { background: rgba(113,177,54,0.12); border-color: rgba(113,177,54,0.4); color: var(--accent); }
        .wfb-how-connector { flex-shrink: 0; display: flex; align-items: center; padding: 0 2px; }
        .wfb-how-loop { position: relative; max-width: 1160px; margin: 4px auto 0; }
        .wfb-how-loopchip-m { display: none; }
        .wfb-who-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .wfb-who-card { background: #ffffff; border: 1px solid #E5E7EB; border-radius: 16px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        @media (prefers-reduced-motion: reduce) { .wfb-how-dash { animation: none !important; } }
        @media (max-width: 1100px) {
          .wfb-how-node { min-width: 150px; padding: 18px 12px; }
          .wfb-how-node--exec { min-width: 170px; }
        }
        @media (max-width: 768px) {
          .wfb-what-section, .wfb-how-section, .wfb-who-section { padding: 56px 20px !important; }
          .wfb-what-title, .wfb-how-title, .wfb-who-title { font-size: 28px !important; }
          .wfb-what-grid, .wfb-who-grid { grid-template-columns: 1fr !important; }
          .wfb-how-pipeline { flex-direction: column !important; align-items: stretch !important; gap: 10px !important; }
          .wfb-how-connector { display: none !important; }
          .wfb-how-node { min-width: 0 !important; max-width: none !important; width: 100% !important; }
          .wfb-how-node--exec { min-width: 0 !important; }
          .wfb-how-loop { display: none !important; }
          .wfb-how-loopchip-m { display: inline-flex !important; }
        }
      `}</style>

      {/* ¿Qué es? */}
      <section id="que-es" className="wfb-what-section" style={{ width: '100%', background: '#ffffff', padding: '96px 60px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="fade-up" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '14px' }}>
              {tr('¿Qué es Workflow Builder?', 'What is Workflow Builder?')}
            </div>
            <h2 className="wfb-what-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.15, margin: '0 0 18px 0' }}>
              {tr('El motor de automatización para Oracle Field Service', 'The automation engine for Oracle Field Service')}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--text-body)', lineHeight: 1.75, margin: 0 }}>
              {tr(
                'Una plataforma no-code que convierte los eventos de tu operación en procesos automáticos: escuchá lo que pasa en campo, aplicá tu lógica de negocio y ejecutá acciones en OFS y en todos tus sistemas — sin escribir una línea de código.',
                'A no-code platform that turns your operation’s events into automatic processes: listen to what happens in the field, apply your business logic and execute actions in OFS and across all your systems — without writing a single line of code.'
              )}
            </p>
          </div>
          <div className="wfb-what-grid fade-up d1">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
                t: tr('100% visual', '100% visual'),
                d: tr('Arrastrá, conectá y publicá. El canvas es tu editor: cada flujo se entiende de un vistazo.', 'Drag, connect and publish. The canvas is your editor: every flow is clear at a glance.'),
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>,
                t: tr('Nativo de OFS', 'OFS native'),
                d: tr('Triggers, eventos en tiempo real y +40 APIs de Oracle Field Service integrados de fábrica.', 'Real-time triggers, events and +40 Oracle Field Service APIs built in.'),
              },
              {
                icon: <svg width="22" height="19" viewBox="0 0 28 24" fill="none" aria-hidden="true"><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.4" strokeLinejoin="round" /><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65" /><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45" /></svg>,
                t: tr('IA integrada', 'AI inside'),
                d: tr('Describí el flujo en lenguaje natural o sumá nodos de IA que analizan y deciden por vos.', 'Describe your flow in natural language or add AI nodes that analyze and decide for you.'),
              },
            ].map((p, i) => (
              <div key={i} className="wfb-what-card">
                <div className="wfb-what-icon">{p.icon}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>{p.t}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#6B7280', lineHeight: 1.7 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Cómo funciona? */}
      <section id="como-funciona" ref={howRef} className="wfb-how-section" style={{ width: '100%', background: 'linear-gradient(180deg, #0d1b3e 0%, var(--primary) 55%, #0a1628 100%)', padding: '96px 60px', position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07, pointerEvents: 'none' }} aria-hidden="true">
          <defs>
            <pattern id="dots-how" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#71B136" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-how)" />
        </svg>
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div className="fade-up" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '14px' }}>
              {tr('¿Cómo funciona?', 'How does it work?')}
            </div>
            <h2 className="wfb-how-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: '0 0 18px 0' }}>
              {tr('Del evento en campo a la acción, en segundos', 'From field event to action, in seconds')}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: 0 }}>
              {tr(
                'Un ciclo cerrado: OFS dispara, Workflow Builder orquesta, tus sistemas se enteran y OFS queda actualizado. Sin intervención manual.',
                'A closed loop: OFS fires, Workflow Builder orchestrates, your systems are notified and OFS stays updated. No manual intervention.'
              )}
            </p>
          </div>

          {/* Pipeline */}
          <div className="wfb-how-pipeline fade-up d1">
            {HOW_STEPS.map((st, i) => {
              const active = !howReduced && i === howStep;
              return (
                <Fragment key={i}>
                  {i > 0 && (
                    <div className="wfb-how-connector" aria-hidden="true">
                      <svg width="40" height="14" viewBox="0 0 40 14" fill="none">
                        <line x1="0" y1="7" x2="32" y2="7" stroke="rgba(113,177,54,0.5)" strokeWidth="1.5" strokeDasharray="5 4" className="wfb-how-dash" style={{ animation: `dashFlow 2s linear ${i * 0.3}s infinite` }} />
                        <polygon points="32,3 40,7 32,11" fill="rgba(113,177,54,0.45)" />
                      </svg>
                    </div>
                  )}
                  <div className={`wfb-how-node${active ? ' wfb-how-node--active' : ''}${i === 2 ? ' wfb-how-node--exec' : ''}`}>
                    <div className="wfb-how-step-num">{`0${i + 1}`}</div>
                    <div className="wfb-how-node-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{st.icon}</svg>
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{tr(st.titleEs, st.titleEn)}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>{tr(st.descEs, st.descEn)}</div>
                    {i === 2 && (
                      <div className="wfb-how-chips">
                        <span className="wfb-how-chip">{tr('Condición', 'Condition')}</span>
                        <span className="wfb-how-chip wfb-how-chip--ai">{tr('✦ Nodo IA', '✦ AI node')}</span>
                        <span className="wfb-how-chip">{tr('Acción', 'Action')}</span>
                      </div>
                    )}
                  </div>
                </Fragment>
              );
            })}
          </div>

          {/* Arco de retorno — cierre del ciclo */}
          <div className="wfb-how-loop" aria-hidden="true">
            <svg width="100%" viewBox="0 0 1160 72" fill="none" style={{ display: 'block' }}>
              <path d="M 1110 6 C 1110 58, 50 58, 50 6" stroke="rgba(113,177,54,0.45)" strokeWidth="1.5" strokeDasharray="7 5" className="wfb-how-dash" style={{ animation: 'dashFlow 1.6s linear infinite' }} />
              <polygon points="42,16 50,2 58,16" fill="rgba(113,177,54,0.5)" />
            </svg>
            <div style={{ position: 'absolute', left: '50%', top: '34px', transform: 'translateX(-50%)', display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#0d1b3e', border: '1px solid rgba(113,177,54,0.35)', borderRadius: '999px', padding: '7px 18px', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--accent)', fontSize: '13px' }}>↻</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.04em' }}>
                {tr('El resultado vuelve a OFS — el ciclo se cierra solo', 'The result returns to OFS — the loop closes itself')}
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <span className="wfb-how-loopchip-m" style={{ alignItems: 'center', gap: '8px', background: '#0d1b3e', border: '1px solid rgba(113,177,54,0.35)', borderRadius: '999px', padding: '7px 16px' }}>
              <span style={{ color: 'var(--accent)', fontSize: '13px' }}>↻</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
                {tr('El resultado vuelve a OFS — ciclo cerrado', 'The result returns to OFS — loop closed')}
              </span>
            </span>
          </div>

          {/* Log de ejecución en vivo */}
          <div className="fade-up d2" style={{ maxWidth: '860px', margin: '48px auto 0', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.07)' }}>
            <div style={{ height: '38px', background: '#1e293b', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '7px' }}>
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FF5F57' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28CA41' }} />
              <span style={{ marginLeft: '10px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{tr('Ejecución en vivo', 'Live run')}</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>wf: prioridad-vip</span>
            </div>
            <div style={{ background: '#0f172a', padding: '20px 24px' }}>
              {HOW_LOG.map((l, i) => {
                const shown = howReduced || i <= howStep;
                const current = !howReduced && i === howStep;
                return (
                  <div key={i} style={{ display: 'flex', gap: '12px', padding: '7px 0', opacity: shown ? (current ? 1 : 0.55) : 0.14, transition: 'opacity 0.3s ease-out' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--accent)', width: '16px', flexShrink: 0, textAlign: 'center' }}>{l.glyph}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', lineHeight: 1.5, color: current ? 'var(--accent)' : 'rgba(255,255,255,0.78)', transition: 'color 0.3s ease-out' }}>{tr(l.es, l.en)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ¿Para quién es? */}
      <section id="para-quien" className="wfb-who-section" style={{ width: '100%', background: '#F8FAFC', padding: '96px 60px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="fade-up" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '14px' }}>
              {tr('¿Para quién es?', 'Who is it for?')}
            </div>
            <h2 className="wfb-who-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.15, margin: '0 0 18px 0' }}>
              {tr('Pensado para los equipos que viven en OFS', 'Built for the teams that live in OFS')}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--text-body)', lineHeight: 1.75, margin: 0 }}>
              {tr(
                'Si tu operación corre sobre Oracle Field Service, Workflow Builder le ahorra horas a cada rol del equipo.',
                'If your operation runs on Oracle Field Service, Workflow Builder saves hours for every role on the team.'
              )}
            </p>
          </div>
          <div className="wfb-who-grid fade-up d1">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
                t: tr('Operaciones y supervisores', 'Operations & supervisors'),
                d: tr('Notificaciones, escalados y reasignaciones automáticas, sin depender de IT. Enterate de lo que importa, cuando importa.', 'Automatic notifications, escalations and reassignments without depending on IT. Know what matters, when it matters.'),
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>,
                t: tr('Despacho y back-office', 'Dispatch & back-office'),
                d: tr('La rutina se ejecuta sola: menos tareas repetitivas y más foco en las excepciones que mueven la operación.', 'Routine runs itself: fewer repetitive tasks and more focus on the exceptions that move the operation.'),
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
                t: tr('IT e integraciones', 'IT & integrations'),
                d: tr('Conectá OFS con el resto del stack vía webhooks y APIs, con autenticación segura y sin desarrollos a medida.', 'Connect OFS to the rest of your stack via webhooks and APIs, with secure authentication and no custom development.'),
              },
            ].map((p, i) => (
              <div key={i} className="wfb-who-card">
                <div className="wfb-what-icon">{p.icon}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>{p.t}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#6B7280', lineHeight: 1.7 }}>{p.d}</div>
              </div>
            ))}
          </div>
          <div className="fade-up d2" style={{ textAlign: 'center', marginTop: '48px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--text-body)', margin: '0 0 4px 0' }}>
              {tr('¿Usás Oracle Field Service?', 'Using Oracle Field Service?')}{' '}
              <strong style={{ color: 'var(--primary)' }}>{tr('Entonces Workflow Builder es para tu equipo.', 'Then Workflow Builder is for your team.')}</strong>
            </p>
            <a href="#demo" style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>
              {tr('Agendá una demo →', 'Schedule a demo →')}
            </a>
          </div>
        </div>
      </section>

      {/* ── CASOS DE USO — SCROLL SNAP ── */}
      <section ref={casosSectionRef} id="casos-uso" style={{ position: 'relative' }}>
        <div
          className="wfb-casos-container wfb-casos-section"
          style={{ width: '100%' }}
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
                className="wfb-caso-wrapper"
                style={{ minHeight: '75vh', width: '100%', display: 'flex', position: 'relative', overflow: 'hidden', background: bg }}
              >
                {/* Columna izquierda 40% */}
                <div className="wfb-caso-left" style={{ width: '40%', padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                  <div className="wfb-caso-numero" style={{ position: 'absolute', top: '50%', left: '-20px', transform: 'translateY(-50%)', fontSize: '280px', fontWeight: 900, lineHeight: 1, color: numDeco, userSelect: 'none', zIndex: 1, pointerEvents: 'none' }}>
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
                      <button
                        key={dotIdx}
                        className="wfb-dot-btn"
                        onClick={() => scrollToCase(dotIdx)}
                        aria-label={`${tr('Caso de uso', 'Use case')} ${dotIdx + 1}${dotIdx === activeCaso ? ` (${tr('activo', 'active')})` : ''}`}
                        aria-current={dotIdx === activeCaso ? 'true' : undefined}
                        style={{ width: dotIdx === activeCaso ? '32px' : '8px', height: '4px', borderRadius: '2px', background: dotIdx === activeCaso ? '#71B136' : 'rgba(113,177,54,0.3)', transition: 'all 0.3s ease', flexShrink: 0 }}
                      />
                    ))}
                  </div>
                </div>
                {/* Columna derecha 60% */}
                <div className="wfb-caso-right" style={{ width: '60%', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ width: '100%', maxWidth: '900px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.25)', position: 'relative' }}>
                    <div style={{ height: '40px', background: '#e8e8ed', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '7px' }}>
                      <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FF5F57' }} />
                      <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FFBD2E' }} />
                      <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28CA41' }} />
                    </div>
                    {idx === 0 ? (
                      <SceneFlujo active={activeCaso === 0 && dotsVisible} reduced={reducedAnim} tr={tr} />
                    ) : idx === 1 ? (
                      <SceneAgente active={activeCaso === 1 && dotsVisible} reduced={reducedAnim} tr={tr} />
                    ) : idx === 2 ? (
                      <SceneBackup active={activeCaso === 2 && dotsVisible} reduced={reducedAnim} tr={tr} />
                    ) : idx === 3 ? (
                      <SceneInventario active={activeCaso === 3 && dotsVisible} reduced={reducedAnim} tr={tr} />
                    ) : (
                      <SceneFormulario active={activeCaso === 4 && dotsVisible} reduced={reducedAnim} tr={tr} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Navegación lateral fija */}
        <div
          className="wfb-nav-dots"
          style={{ position: 'fixed', right: '32px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 100, opacity: dotsVisible ? 1 : 0, pointerEvents: dotsVisible ? 'auto' : 'none', transition: 'opacity 0.25s ease' }}
        >
          {WB_CASOS.map((_, idx) => (
            <button
              key={idx}
              className="wfb-dot-btn"
              onClick={() => scrollToCase(idx)}
              aria-label={`${tr('Caso de uso', 'Use case')} ${idx + 1}${idx === activeCaso ? ` (${tr('activo', 'active')})` : ''}`}
              aria-current={idx === activeCaso ? 'true' : undefined}
              style={{ width: idx === activeCaso ? '12px' : '8px', height: idx === activeCaso ? '12px' : '8px', borderRadius: '50%', background: idx === activeCaso ? '#71B136' : 'rgba(113,177,54,0.3)', transition: 'all 0.3s ease', display: 'block' }}
            />
          ))}
        </div>
      </section>

      {/* ── TABS / MÓDULOS ── */}
      <div>
        {/* BLOQUE 1: HEADER */}
        <div className="wfb-modulos-hdr" style={{ width:'100%', background:'linear-gradient(135deg, #0d1b3e 0%, #172554 100%)', padding:'80px 60px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.1 }} xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="dots-mod-hdr" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#71B136"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dots-mod-hdr)"/>
          </svg>
          <div style={{ position:'relative', zIndex:2 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(113,177,54,0.12)', border:'1px solid rgba(113,177,54,0.3)', borderRadius:'999px', padding:'8px 20px', marginBottom:'24px' }}>
              <svg width="1em" height="0.85em" viewBox="0 0 28 24" fill="none" style={{display:'inline-block', verticalAlign:'middle'}}><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg>
              <span style={{ color:'#71B136', fontSize:'12px', fontWeight:600, letterSpacing:'0.1em' }}>{tr('Impulsado por Inteligencia Artificial', 'Powered by Artificial Intelligence')}</span>
            </div>
            <h2 className="wfb-modulos-title" style={{ fontSize:'52px', fontWeight:900, color:'white', lineHeight:1.1, marginBottom:'16px' }}>{tr('Todo lo que podés hacer', 'Everything you can do')}</h2>
            <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.6)', maxWidth:'600px', margin:'0 auto 16px', lineHeight:1.7 }}>{tr('Sin conocimiento técnico. Describí lo que necesitás en lenguaje natural y la IA configura todo por vos.', 'No technical knowledge needed. Describe what you need in natural language and AI configures everything for you.')}</p>
            <div className="wfb-modulos-stats" style={{ display:'flex', justifyContent:'center', gap:'80px', marginTop:'40px' }}>
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
        <div className="wfb-triggers-section" style={{ width:'100%', background:'#ffffff', padding:'80px 60px' }}>
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
            <div className="wfb-triggers-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px' }}>
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
        <div className="wfb-eventos-section" style={{ width:'100%', background:'#0d1b3e', padding:'80px 60px' }}>
          <div style={{ maxWidth:'1400px', margin:'0 auto' }}>
            <div style={{ fontSize:'11px', color:'#71B136', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'12px' }}>{tr('EVENTOS OFS','OFS EVENTS')}</div>
            <h3 style={{ fontSize:'36px', fontWeight:800, color:'white', lineHeight:1.1, marginBottom:'16px' }}>{tr('Escuchá cualquier evento de tu operación','Listen to any event in your operation')}</h3>
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'16px', marginBottom:'48px' }}>{tr('Suscribite a eventos en tiempo real de estas entidades','Subscribe to real-time events from these entities')}</p>
            <div className="wfb-eventos-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
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
        <div className="wfb-apis-section" style={{ width:'100%', background:'#F8FAFC', padding:'80px 60px' }}>
          <div style={{ maxWidth:'1400px', margin:'0 auto' }}>
            <div style={{ fontSize:'11px', color:'#71B136', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'12px' }}>{tr('APIs DE OFS','OFS APIs')}</div>
            <h3 style={{ fontSize:'36px', fontWeight:800, color:'#172554', marginBottom:'16px' }}>{tr('+40 APIs de Oracle Field Service','+40 Oracle Field Service APIs')}</h3>
            <p style={{ color:'#6B7280', fontSize:'16px', marginBottom:'48px' }}>{tr('Todas disponibles como nodos en tu workflow. Sin código.','All available as nodes in your workflow. No code.')}</p>
            <div className="wfb-apis-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px' }}>
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

        {/* ── BLOQUE 4.5: CAPA DE IA/LLM ── */}
        <style>{`
          .wfb-int-pipe { display: flex; align-items: stretch; justify-content: center; gap: 10px; margin-bottom: 56px; }
          .wfb-int-node { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 20px; flex: 0 1 320px; min-width: 0; }
          .wfb-int-node--ai { border-color: rgba(113,177,54,0.45); background: rgba(113,177,54,0.07); }
          .wfb-int-conn { flex-shrink: 0; display: flex; align-items: center; padding: 0 2px; }
          .wfb-int-chip { display: flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 999px; padding: 5px 12px; font-family: var(--font-body); font-size: 11.5px; color: rgba(255,255,255,0.75); margin-bottom: 7px; }
          .wfb-int-demo { max-width: 860px; margin: 0 auto; border-radius: 14px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.07); }
          .wfb-int-caps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 1060px; margin: 48px auto 0; }
          .wfb-int-cap { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; display: flex; gap: 14px; align-items: flex-start; }
          .wfb-int-cap-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(113,177,54,0.1); border: 1px solid rgba(113,177,54,0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
          @media (max-width: 900px) {
            .wfb-int-pipe { flex-direction: column; align-items: stretch; }
            .wfb-int-conn { display: none; }
            .wfb-int-node { flex: 1 1 auto; }
          }
          @media (max-width: 768px) {
            .wfb-llm-section { padding: 48px 20px !important; }
            .wfb-int-caps { grid-template-columns: 1fr; }
          }
        `}</style>
        <div
          id="ia-layer"
          ref={llmRef}
          className="wfb-llm-section"
          style={{ width: '100%', background: 'linear-gradient(180deg, var(--primary) 0%, #0a1628 100%)', padding: '80px 60px', position: 'relative', overflow: 'hidden' }}
        >
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07, pointerEvents: 'none' }} aria-hidden="true">
            <defs>
              <pattern id="dots-llm" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#71B136" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-llm)" />
          </svg>
          <div style={{ position: 'absolute', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(113,177,54,0.06) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} aria-hidden="true" />

          <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

            {/* Intro */}
            <div className="fade-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '14px' }}>
                {tr('CAPA DE INTELIGENCIA', 'INTELLIGENCE LAYER')}
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '44px', fontWeight: 800, color: '#fff', lineHeight: 1.1, margin: '0 0 16px 0' }}>
                {tr('Tu operación, entendida por IA', 'Your operation, understood by AI')}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.7 }}>
                {tr(
                  'Cada evento de campo queda guardado en tu base de datos. El agente de IA los lee, responde consultas en lenguaje natural y genera gráficos al instante — siempre sobre datos reales de tu operación.',
                  'Every field event is stored in your database. The AI agent reads it, answers natural language questions and generates charts instantly — always on your operation’s real data.'
                )}
              </p>
            </div>

            {/* Pipeline: eventos → DB → LLM */}
            <LlmPipeline active={llmVisible} reduced={reducedAnim} tr={tr} />

            {/* Demo: chat con gráficos generados por el agente */}
            <LlmDemo active={llmVisible} reduced={reducedAnim} tr={tr} />

            {/* Capacidades */}
            <div className="wfb-int-caps fade-up d3">
              {[
                {
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
                  t: tr('Consultas en lenguaje natural', 'Natural language queries'),
                  d: tr('Preguntale a tu operación como a un colega: horarios, estados, inventarios, rutas.', 'Ask your operation like a colleague: schedules, statuses, inventory, routes.'),
                },
                {
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>,
                  t: tr('Gráficos al instante', 'Instant charts'),
                  d: tr('Pedí un gráfico y el agente lo arma con datos en vivo: rutas, performance, SLA.', 'Ask for a chart and the agent builds it with live data: routes, performance, SLA.'),
                },
                {
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
                  t: tr('Recomendaciones proactivas', 'Proactive recommendations'),
                  d: tr('El agente vigila la operación y sugiere reasignaciones y alertas antes de que el problema ocurra.', 'The agent watches the operation and suggests reassignments and alerts before problems occur.'),
                },
              ].map((c, i) => (
                <div key={i} className="wfb-int-cap">
                  <div className="wfb-int-cap-icon">{c.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{c.t}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{c.d}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* BLOQUE 5: CTA IA FINAL */}
        <div className="wfb-cta-section" style={{ width:'100%', background:'linear-gradient(135deg, #071428 0%, #172554 50%, #1a3a2a 100%)', padding:'80px 60px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.1 }} xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="dots-mod-cta" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#71B136"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dots-mod-cta)"/>
          </svg>
          <div style={{ position:'absolute', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(113,177,54,0.15) 0%, transparent 70%)', top:'-100px', left:'50%', transform:'translateX(-50%)', pointerEvents:'none' }}/>
          <div style={{ position:'relative', zIndex:2 }}>
            <div style={{ marginBottom:'24px' }}>
              <svg width="1em" height="0.85em" viewBox="0 0 28 24" fill="none" style={{display:'inline-block', verticalAlign:'middle'}}><path d="M16 1.5l.9 3.2 3.2.9-3.2.9L16 9.7l-.9-3.2-3.2-.9 3.2-.9z" fill="#71B136" stroke="#71B136" strokeWidth="0.4" strokeLinejoin="round"/><path d="M7 7l.6 2.2 2.2.6-2.2.6L7 12.6l-.6-2.2-2.2-.6 2.2-.6z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.65"/><path d="M21 14l.5 1.6 1.6.5-1.6.5L21 18.2l-.5-1.6-1.6-.5 1.6-.5z" fill="#71B136" stroke="#71B136" strokeWidth="0.3" strokeLinejoin="round" opacity="0.45"/></svg>
            </div>
            <h2 className="wfb-cta-title" style={{ fontSize:'44px', fontWeight:900, color:'white', lineHeight:1.2, maxWidth:'700px', margin:'0 auto 16px' }}>
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
