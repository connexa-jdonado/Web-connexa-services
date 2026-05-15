'use client';
import { useLang } from '@/context/LanguageContext';

export default function AssessmentMethodology() {
  const { lang } = useLang();
  const tr = (es, en) => (lang === 'en' ? en : es);

  return (
    <>
      <div className="services-grid" style={{ marginBottom: '48px' }}>

        <div className="service-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="service-icon">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#71B136', letterSpacing: '0.1em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>01</span>
          </div>
          <h3>{tr('Dolores & Hallazgos', 'Pain Points & Findings')}</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              tr('Relevamiento de procesos operativos actuales', 'Survey of current operational processes'),
              tr('Entrevistas con usuarios clave y equipos de campo', 'Interviews with key users and field teams'),
              tr('Análisis del nivel de aprovechamiento de la plataforma', 'Analysis of platform utilization level'),
              tr('Identificación de brechas y limitaciones técnicas', 'Identification of gaps and technical limitations'),
              tr('Documentación del estado actual de la solución', 'Documentation of the current solution state'),
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '13px', color: '#4B5563', lineHeight: '1.55', fontFamily: 'var(--font-body)' }}>
                <span style={{ color: '#71B136', flexShrink: 0, marginTop: '1px' }}>▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="service-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="service-icon">
              <svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#71B136', letterSpacing: '0.1em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>02</span>
          </div>
          <h3>{tr('Oportunidades de Mejora', 'Improvement Opportunities')}</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              tr('Detección de funcionalidades subutilizadas', 'Detection of underutilized features'),
              tr('Análisis de gaps entre operación actual y potencial de la plataforma', 'Gap analysis between current operation and platform potential'),
              tr('Evaluación de procesos susceptibles de automatización', 'Evaluation of processes suitable for automation'),
              tr('Identificación de mejoras de eficiencia operativa', 'Identification of operational efficiency improvements'),
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '13px', color: '#4B5563', lineHeight: '1.55', fontFamily: 'var(--font-body)' }}>
                <span style={{ color: '#71B136', flexShrink: 0, marginTop: '1px' }}>▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="service-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="service-icon">
              <svg viewBox="0 0 24 24"><path d="M9.66 17.33c-1.66 1.66-4 2.67-4 2.67s1-2.34 2.67-4c.94-.94 2.34-.94 3.28 0 .94.94.94 2.34.05 3.33z" /><path d="m14 10-4 4" /><path d="M19 5c0 2.5-2 7-7 10l-3-3c3-5 7.5-7 10-7z" /></svg>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#71B136', letterSpacing: '0.1em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>03</span>
          </div>
          <h3>{tr('Iniciativas', 'Initiatives')}</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              tr('Propuesta de iniciativas concretas y accionables', 'Proposal of concrete and actionable initiatives'),
              tr('Ponderación por impacto en el negocio y complejidad', 'Weighting by business impact and complexity'),
              tr('Mapa visual Impacto × Complejidad para priorizar', 'Visual Impact × Complexity map for prioritization'),
              tr('Roadmap de implementación por fases', 'Phased implementation roadmap'),
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '13px', color: '#4B5563', lineHeight: '1.55', fontFamily: 'var(--font-body)' }}>
                <span style={{ color: '#71B136', flexShrink: 0, marginTop: '1px' }}>▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="fade-up d2" style={{ background: '#fff', borderRadius: '16px', padding: '32px 32px 24px', margin: '0 0 48px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', border: '1px solid #F3F4F6' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#71B136', fontFamily: 'var(--font-body)' }}>
            {tr('Mapa de Priorización de Iniciativas', 'Initiative Prioritization Map')}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'stretch' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <svg viewBox="0 0 800 600" width="100%" style={{ display: 'block', overflow: 'visible' }}>
              <defs>
                <filter id="tt-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.18)" />
                </filter>
              </defs>
              <style>{`
                .sb { cursor: pointer; }
                .sb circle { transition: transform 0.25s ease, opacity 0.25s ease; transform-box: fill-box; transform-origin: center; }
                .sb:hover circle { transform: scale(1.08); }
                .tt { opacity: 0; pointer-events: none; transition: opacity 0.15s; }
                .sb:hover .tt { opacity: 1; }
                .ax { font-family: var(--font-body); fill: #172554; font-weight: 700; letter-spacing: 0.1em; }
                .ax-tick { font-family: var(--font-body); fill: #9CA3AF; font-size: 10px; }
                .zl { font-family: var(--font-body); font-weight: 700; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; }
                .grid { stroke: #E5E7EB; stroke-width: 0.5; }
              `}</style>

              <rect x="70" y="310" width="295" height="220" fill="#F9FAFB" />
              <rect x="365" y="310" width="295" height="220" fill="#F0FDF4" />
              <rect x="365" y="310" width="295" height="220" fill="none" stroke="#71B136" strokeWidth="1.5" strokeDasharray="6,4" />
              <rect x="70" y="60" width="295" height="250" fill="#EFF6FF" />
              <rect x="365" y="60" width="295" height="250" fill="#FEF2F2" />

              {[130,190,250,310,370,430,490].map(y => (
                <line key={y} x1="70" y1={y} x2="660" y2={y} className="grid" />
              ))}
              {[130,190,250,310,370,430,490,550,610].map(x => (
                <line key={x} x1={x} y1="60" x2={x} y2="530" className="grid" />
              ))}

              <line x1="365" y1="60" x2="365" y2="530" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="5,3" />
              <line x1="70" y1="310" x2="660" y2="310" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="5,3" />

              <text x="82" y="82" className="zl" fill="rgba(23,37,84,0.55)">{tr('Proyectos', 'Projects')}</text>
              <text x="377" y="82" className="zl" fill="rgba(220,38,38,0.55)">{tr('Descarte', 'Discard')}</text>
              <text x="82" y="332" className="zl" fill="rgba(107,114,128,0.65)">{tr('Tareas', 'Tasks')}</text>
              <text x="377" y="332" className="zl" fill="rgba(113,177,54,0.9)">{tr('Quick Wins', 'Quick Wins')}</text>

              <line x1="70" y1="530" x2="70" y2="55" stroke="#172554" strokeWidth="1.5" />
              <polygon points="70,48 65,62 75,62" fill="#172554" />
              <text transform="translate(22,295) rotate(-90)" textAnchor="middle" className="ax" fontSize="10">{tr('COMPLEJIDAD', 'COMPLEXITY')}</text>
              <text x="62" y="65" textAnchor="end" className="ax-tick">{tr('Alta', 'High')}</text>
              <text x="62" y="528" textAnchor="end" className="ax-tick">{tr('Baja', 'Low')}</text>

              <line x1="70" y1="530" x2="665" y2="530" stroke="#172554" strokeWidth="1.5" />
              <polygon points="672,530 658,525 658,535" fill="#172554" />
              <text x="370" y="570" textAnchor="middle" className="ax" fontSize="10">{tr('PRIORIDAD', 'PRIORITY')}</text>
              <text x="78" y="548" className="ax-tick">{tr('Baja', 'Low')}</text>
              <text x="652" y="548" textAnchor="end" className="ax-tick">{tr('Alta', 'High')}</text>

              <g className="sb">
                <circle cx="430" cy="460" r="22" fill="#71B136" stroke="#fff" strokeWidth="2" />
                <text x="430" y="465" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">A1</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="378" y="422" width="148" height="28" rx="6" fill="#172554" />
                  <text x="452" y="441" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Segmentación de cuotas', 'Quota segmentation')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="520" cy="440" r="22" fill="#71B136" stroke="#fff" strokeWidth="2" />
                <text x="520" y="445" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">A2</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="458" y="402" width="148" height="28" rx="6" fill="#172554" />
                  <text x="532" y="421" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Optimización de routing', 'Routing optimization')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="460" cy="390" r="22" fill="#71B136" stroke="#fff" strokeWidth="2" />
                <text x="460" y="395" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">B1</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="398" y="352" width="148" height="28" rx="6" fill="#172554" />
                  <text x="472" y="371" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Activar colaboración', 'Activate collaboration')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="590" cy="360" r="22" fill="#71B136" stroke="#fff" strokeWidth="2" />
                <text x="590" y="365" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">E1</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="490" y="322" width="160" height="28" rx="6" fill="#172554" />
                  <text x="570" y="341" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Visibilidad en tiempo real', 'Real-time visibility')}</text>
                </g>
              </g>

              <g className="sb">
                <circle cx="200" cy="140" r="22" fill="#172554" stroke="#fff" strokeWidth="2" />
                <text x="200" y="145" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">D1</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="138" y="102" width="148" height="28" rx="6" fill="#172554" />
                  <text x="212" y="121" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Unificación app móvil', 'Mobile app unification')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="290" cy="100" r="22" fill="#172554" stroke="#fff" strokeWidth="2" />
                <text x="290" y="105" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">D2</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="228" y="62" width="148" height="28" rx="6" fill="#172554" />
                  <text x="302" y="81" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Gestión de inventario', 'Inventory management')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="150" cy="220" r="22" fill="#172554" stroke="#fff" strokeWidth="2" />
                <text x="150" y="225" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">D3</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="88" y="182" width="148" height="28" rx="6" fill="#172554" />
                  <text x="162" y="201" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Integración ERP', 'ERP Integration')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="320" cy="180" r="22" fill="#172554" stroke="#fff" strokeWidth="2" />
                <text x="320" y="185" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">C2</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="218" y="142" width="148" height="28" rx="6" fill="#172554" />
                  <text x="292" y="161" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Analítica avanzada', 'Advanced analytics')}</text>
                </g>
              </g>

              <g className="sb">
                <circle cx="200" cy="420" r="22" fill="#6B7280" stroke="#fff" strokeWidth="2" />
                <text x="200" y="425" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">B2</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="138" y="382" width="128" height="28" rx="6" fill="#172554" />
                  <text x="202" y="401" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Atributos de skills', 'Skills attributes')}</text>
                </g>
              </g>
              <g className="sb">
                <circle cx="130" cy="370" r="22" fill="#6B7280" stroke="#fff" strokeWidth="2" />
                <text x="130" y="375" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">A4</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="68" y="332" width="128" height="28" rx="6" fill="#172554" />
                  <text x="132" y="351" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Validación GPS', 'GPS validation')}</text>
                </g>
              </g>

              <g className="sb">
                <circle cx="500" cy="160" r="22" fill="#DC2626" stroke="#fff" strokeWidth="2" />
                <text x="500" y="165" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11" fontFamily="var(--font-body)">D8</text>
                <g className="tt" filter="url(#tt-shadow)">
                  <rect x="398" y="122" width="168" height="28" rx="6" fill="#172554" />
                  <text x="482" y="141" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="var(--font-body)">{tr('Réplica BI en tiempo real', 'Real-time BI replication')}</text>
                </g>
              </g>
            </svg>
          </div>
          <div style={{ minWidth: '260px', flexShrink: 0, padding: '24px', background: '#F8FAFC', borderLeft: '2px solid #E5E7EB', borderRadius: '0 8px 8px 0' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#71B136', fontFamily: 'var(--font-body)', marginBottom: '20px' }}>
              {tr('INICIATIVAS', 'INITIATIVES')}
            </div>
            {[
              { color: '#71B136', title: tr('Quick Wins', 'Quick Wins'), items: [
                { code: 'A1', name: tr('Segmentar cuotas por zona', 'Segment quotas by zone') },
                { code: 'A2', name: tr('Gestión de minutos por categoría', 'Manage minutes by category') },
                { code: 'B1', name: tr('Optimizar planes de routing', 'Optimize routing plans') },
                { code: 'E1', name: tr('Activar módulo de colaboración', 'Activate collaboration module') },
              ]},
              { color: '#172554', title: tr('Proyectos Estratégicos', 'Strategic Projects'), items: [
                { code: 'D1', name: tr('Centralizar gestión de inventario', 'Centralize inventory management') },
                { code: 'D2', name: tr('Validación GPS en campo', 'GPS validation in field') },
                { code: 'D3', name: tr('Unificar app móvil (OFSC)', 'Unify mobile app (OFSC)') },
                { code: 'C2', name: tr('Visibilidad en tiempo real', 'Real-time visibility') },
              ]},
              { color: '#6B7280', title: tr('Tareas Menores', 'Minor Tasks'), items: [
                { code: 'A4', name: tr('Tablero de salud de agenda', 'Agenda health dashboard') },
                { code: 'B2', name: tr('Reclasificar atributos como skills', 'Reclassify attributes as skills') },
              ]},
              { color: '#EF4444', title: tr('Descarte', 'Discard'), items: [
                { code: 'D8', name: tr('Réplica de datos BI en tiempo real', 'Real-time BI data replication') },
              ]},
            ].map((group, gi) => (
              <div key={gi}>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: group.color, fontFamily: 'var(--font-body)', marginTop: gi === 0 ? 0 : '16px', marginBottom: '8px' }}>
                  {group.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {group.items.map((item, ii) => (
                    <div key={ii} style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: group.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>{item.code}</span>
                      </div>
                      <span style={{ fontSize: '13px', color: '#374151', fontFamily: 'var(--font-body)', marginLeft: '10px', lineHeight: '1.4', fontWeight: 400 }}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ paddingTop: '32px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#6B7280', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: '1.6' }}>
          {tr('Cada assessment es único. Los resultados dependen de tu operación, tu plataforma y tus objetivos.', 'Every assessment is unique. Results depend on your operation, your platform, and your goals.')}
        </p>
      </div>
    </>
  );
}
