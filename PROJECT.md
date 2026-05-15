# CONNEXA SERVICES — CONTEXTO DEL PROYECTO

## Stack
- Next.js 16 + React 19 + Tailwind CSS
- Sistema bilingüe ES/EN con LanguageContext
- Worktrees: feature/performance y feature/content

## Repositorio y Deploy
- GitHub: https://github.com/connexa-jdonado/Web-connexa-services
- Vercel: https://web-connexa-services.vercel.app
- Push: git push origin main → Vercel despliega automáticamente

## Carpetas locales
- ~/connexa-nextjs — proyecto principal (main)
- ~/connexa-performance — worktree feature/performance
- ~/connexa-content — worktree feature/content

## Comandos
- Main: npm run dev (puerto 3000)
- Performance: npm run dev -- --port 3001
- Content: npm run dev -- --port 3002

## Design System
- Primario: #172554
- Secundario: #F3F4F6
- Acento: #71B136
- Tipografías: Plus Jakarta Sans + Inter

## Páginas
- / — Home (app/HomeClient.jsx)
- /servicios — Servicios
- /productos — Productos (WFBuilder primero, FSMTool segundo)
- /productos/fsmtool — FSMTool con casos de uso con video
- /productos/workflow-builder — WFBuilder con casos de uso con video

## Componentes críticos
- components/Navbar.jsx — navbar compartida
- components/Footer.jsx — footer compartido
- components/ParticlesCanvas.jsx — canvas de partículas (NO usar Web Worker)
- context/LanguageContext.jsx — sistema bilingüe

## Estado actual de worktrees

### feature/performance
- Optimizaciones aplicadas: next/image, heroGrad CSS, fuentes
- PENDIENTE: reducir partículas en mobile (PARTICLE_COUNT)
- IMPORTANTE: NO usar OffscreenCanvas ni Web Worker para partículas
- Las partículas están en ParticlesCanvas.jsx — funcionan correctamente

### feature/content
- Cambios aplicados: logo Onnet achicado, badge Zinier +8 implementaciones, OFSC→OFS
- PENDIENTE: verificar que los cambios se ven en el navegador

## Reglas críticas
- NUNCA reescribir archivos completos
- NUNCA usar Web Worker para el canvas de partículas
- Verificar siempre que casos-v2-section existe en FSMTool y WFBuilder
- Todo texto nuevo: data-es y data-en obligatorio
- Commits antes de cada cambio importante
