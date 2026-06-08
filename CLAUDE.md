# REGLAS DEL PROYECTO — CONNEXA SERVICES (React + Express)

## STACK TÉCNICO (verificado)
Repo de DOS PAQUETES INDEPENDIENTES (NO es un monorepo orquestado: no hay
package.json en la raíz, ni npm workspaces ni turborepo). `frontend/`
(Servidor A) y `backend/` (Servidor B) tienen cada uno su propio
package.json y su propio node_modules; se instalan, corren y deployan por
separado.

### Frontend (`frontend/`)
- React 19.2.4 / react-dom 19.2.4 — SOLO React, sin meta-framework.
- Vite 7 como bundler/dev server.
- react-router-dom 6 para el ruteo (SPA).
- vite-react-ssg 0.9 para prerender estático: genera un HTML por ruta en
  build (SEO). El componente `Head` (de vite-react-ssg, envuelve
  react-helmet-async) inyecta title/description/keywords por página.
- Tailwind CSS v4 vía `@tailwindcss/vite` — se mantiene SOLO porque
  `styles/globals.css` hace `@import "tailwindcss"` y define tokens en
  `@theme`. El diseño real usa variables `:root`. NO se usan clases
  utilitarias de Tailwind en el JSX.
- El código es JavaScript (.jsx), NO TypeScript.
- Gestor de paquetes: npm.

### Backend (`backend/`)
- Node.js + Express 4 (ESM, `"type": "module"`).
- Middlewares: helmet, cors (restringido a `FRONTEND_URL`), express-rate-limit.
- nodemailer para el envío del formulario de contacto.
- Sin base de datos ni auth por ahora. Estructura preparada para crecer.
- Solo expone DOS endpoints: `GET /api/health` y `POST /api/contacto`
  (este último con rate-limit + validación + nodemailer). Nada más.

### RIESGO CONOCIDO
- La versión de Node NO está fijada (no hay .nvmrc ni "engines"). No asumir
  una versión concreta de Node.

## COMANDOS POR PAQUETE
Cada paquete se instala y se corre por separado (no hay scripts en la raíz):
- Frontend (`cd frontend`): `npm install`, `npm run dev` (Vite),
  `npm run build` (vite-react-ssg, prerender estático), `npm run preview`.
- Backend (`cd backend`): `npm install`, `npm start` (node src/server.js),
  `npm run dev` (node --watch src/server.js).
- NO hay scripts de lint, test ni typecheck en ningún paquete.

## CONEXIÓN FRONTEND ↔ BACKEND
- El frontend es AUTÓNOMO: todo el sitio es estático/prerenderizado y funciona
  sin el backend.
- ÚNICA dependencia del backend: el formulario de contacto en
  `frontend/src/pages/Servicios.jsx`, que hace `fetch` a
  `VITE_API_URL` + `/api/contacto`. Si el backend está caído, solo falla ese
  envío; el resto del sitio sigue funcionando.
- `VITE_API_URL` se define en `frontend/.env` (fallback `http://localhost:4000`).

## DESIGN SYSTEM BLOQUEADO
- Color primario: #172554
- Color secundario: #F3F4F6
- Color acento: #71B136
- Tipografía headings: Plus Jakarta Sans
- Tipografía body: Inter
- Variables en `frontend/src/styles/globals.css` — NO modificar.
- Las fuentes se cargan vía `<link>` de Google Fonts en `frontend/index.html`;
  los fallbacks de `globals.css` ya apuntan a 'Plus Jakarta Sans' / Inter.

## ESTRUCTURA DEL PROYECTO
```
frontend/
  index.html            <link> Google Fonts + div#root
  vite.config.js         alias @ -> src, plugins react + tailwindcss
  .env(.example)         VITE_API_URL (URL del backend)
  public/assets/         imágenes y logos (clientes en public/assets/clients/)
  src/
    main.jsx             entry (ViteReactSSG con las rutas)
    routes.jsx           definición de rutas (array que consume vite-react-ssg)
    App.jsx              layout: LanguageProvider + ScrollToHash + Navbar + <Outlet/> + Footer
    styles/globals.css   CSS completo del proyecto (NO modificar tokens)
    context/LanguageContext.jsx   sistema bilingüe ES/EN
    lib/next-compat.jsx  capa de compat (ver abajo)
    components/          Navbar, Footer, LanguageSwitcher, ParticlesCanvas, AssessmentMethodology
    pages/               Home, Servicios, Productos, FSMTool, WorkflowBuilder, NotFound
backend/
  src/
    server.js            arranque
    app.js               configuración de Express
    config/env.js        lectura de variables de entorno
    routes/              rutas (contacto.js)
    controllers/         lógica de cada endpoint
    middleware/          cors, rateLimit, validateContacto, errorHandler
    services/mailer.js   envío de email (nodemailer)
  .env(.example)         PORT, FRONTEND_URL, CONTACT_TO, SMTP_*
```

## CAPA DE COMPATIBILIDAD (`frontend/src/lib/next-compat.jsx`)
La migración desde Next.js reimplementó sus APIs sobre react-router puro para
preservar el JSX existente sin reescribirlo. Exporta:
- `Link` — envuelve react-router Link (acepta `href`, lo mapea a `to`).
- `Image` — renderiza `<img>` (descarta props propias de Next).
- `useRouter` / `usePathname` — sobre useNavigate / useLocation.
- `dynamic` — React.lazy (+ comportamiento client-only cuando `ssr: false`).
Es 100% React, sin dependencia de Next. Para código nuevo, preferí usar
directamente react-router-dom (`Link to=...`, `useNavigate`) y `<img>`.

## NOTAS — DEUDA TÉCNICA CONOCIDA
- `frontend/src/lib/next-compat.jsx` es un RESIDUO de la migración desde
  Next.js: reimplementa Link/Image/useRouter/usePathname/dynamic sobre
  react-router. Sigue en uso por el JSX migrado. NO arreglarlo ahora. A futuro,
  ir reemplazando sus usos por react-router-dom (`Link to=...`, `useNavigate`)
  y `<img>` directos hasta poder eliminarlo. No introducir nuevos usos.

## REGLAS DE MODIFICACIÓN
1. NUNCA reescribir archivos completos (salvo migración explícita ya acordada).
2. Preferir ediciones puntuales (str_replace / Edit).
3. Nunca tocar Navbar.jsx ni Footer.jsx sin indicación explícita.
4. Nunca cambiar colores ni tipografías del design system.
5. Antes de modificar: leer el archivo completo.
6. Después de modificar: verificar que el contenido clave existe.

## SISTEMA BILINGÜE — OBLIGATORIO
- Todo texto visible debe usar el LanguageContext.
- Usar el hook `useLang()` (importado desde `@/context/LanguageContext`).
- PROHIBIDO hardcodear texto visible. Todo string visible pasa por `useLang()`
  con su traducción ES/EN.
- El idioma persiste en localStorage.

## COMPONENTES EXISTENTES — REUTILIZAR SIEMPRE
- Navbar.jsx — navbar con scroll, hamburguesa, ES/EN.
- Footer.jsx — footer 4 columnas.
- LanguageSwitcher.jsx — selector ES/EN.
- LanguageProvider (en context/LanguageContext.jsx) envuelve la app en App.jsx.
- ParticlesCanvas.jsx — canvas de partículas. NUNCA usar Web Worker ni
  OffscreenCanvas para las partículas (regla heredada: rompe el render).

## REGLA CRÍTICA — SECCIONES PROTEGIDAS
En FSMTool y WorkflowBuilder verificar siempre que existe la sección de casos
de uso con video antes y después de cualquier cambio.

## MOBILE FIRST
- Todo componente debe ser responsive.
- Breakpoints: mobile 768px, tablet 1024px.

## NAVEGACIÓN
- Usar `Link` (react-router-dom, o el de `@/lib/next-compat`) para rutas internas.
- Nunca usar `<a href>` para rutas internas (provoca recarga completa).
- Los enlaces con hash (`/#partnerships`, `/servicios#contacto`) hacen scroll
  suave gracias al helper `ScrollToHash` en App.jsx.
- Rutas: / · /servicios · /productos · /productos/fsmtool ·
  /productos/workflow-builder. El catch-all `*` renderiza NotFound.
- Las rutas se declaran en `frontend/src/routes.jsx`.

## IMÁGENES
- Usar `<img>` (o el `Image` de la capa de compat) para todas las imágenes.
- Todas las imágenes en `frontend/public/assets/`.
- Logos clientes en `frontend/public/assets/clients/`.

## SEO
- Cada página inyecta su metadata con `<Head>` de vite-react-ssg:
  title, description y keywords relevantes.
- El prerender genera un HTML por ruta con esos meta tags ya resueltos.
- NO poner un `<title>` estático en index.html (duplicaría el de `<Head>`).
- Keywords principales: Oracle Field Service, OFSC, Field Service Management,
  Zinier, implementación OFSC.

## CONVENCIONES DE CÓDIGO (verificadas)
- El código es JavaScript (.jsx), NO TypeScript. No tipar props, no convertir a .tsx.
- Cada página vive en `frontend/src/pages/[Nombre].jsx` y se registra en routes.jsx.
- Componentes en PascalCase, en `frontend/src/components/`.
- Imports del frontend SIEMPRE con el alias `@/*` (configurado en vite.config.js).
  Nunca usar rutas relativas profundas tipo ../../..
- i18n: todo texto visible pasa por `useLang()` (ver SISTEMA BILINGÜE).
- El frontend no usa la directiva 'use client' (era de Next; ya no aplica).

## VERIFICACIÓN ANTES DE PR
- Frontend: `cd frontend && npm run build` y que compile + prerendere sin errores.
- Backend: `cd backend && npm start` y verificar `/api/health` y `/api/contacto`.
- NO hay script de lint ni de tests configurado actualmente: no los asumas.
  Scripts frontend: dev, build, preview. Scripts backend: start, dev.

## PÁGINAS FALTANTES — CREAR CUANDO SE SOLICITE
- frontend/src/pages/Nosotros.jsx — página Nosotros (+ ruta en routes.jsx).
- frontend/src/pages/CasosDeExito.jsx — página Casos de éxito (+ ruta).

## GIT — OBLIGATORIO ANTES DE CADA CAMBIO
- Antes de cualquier modificación hacer commit de backup.
- Nunca trabajar con cambios sin commitear.
- Formato de commits: "tipo: descripción breve"
  Tipos: feat, fix, style, refactor, backup.
- Después de cada cambio verificar que el build del frontend compila.

## MOBILE — REGLA CRÍTICA

Prioridad: desktop intacto, mobile funcional.

### PRINCIPIO BASE
Nunca modificar estilos desktop para arreglar mobile. Todo ajuste mobile va
EXCLUSIVAMENTE en media queries o condiciones responsive, nunca tocando el
estilo base.

### OBLIGATORIO EN CADA COMPONENTE NUEVO O MODIFICADO
1. Verificar que el componente se ve en 375px y 768px.
2. Agregar estilos mobile SIEMPRE como adición, nunca reemplazando.
3. Patrón para responsive inline:
   - Desktop: estilo base en style={{}}
   - Mobile: `<style>` tag con @media (max-width: 768px).

### BREAKPOINTS DEL PROYECTO
- Mobile: max-width 768px
- Tablet: max-width 1024px
- Desktop: todo lo demás (estilo base)

### CHECKLIST ANTES DE CADA COMMIT
- [ ] El diseño desktop no cambió visualmente
- [ ] El componente es usable en 375px (iPhone SE)
- [ ] El componente es usable en 768px (tablet)
- [ ] Las animaciones no bloquean el scroll en mobile
- [ ] Los textos no se cortan ni desbordan
- [ ] Los botones tienen mínimo 44px de alto (touch target)
- [ ] Las imágenes no desbordan su contenedor
- [ ] El overflow horizontal está controlado (no hay scroll horizontal)

### SECCIONES CONOCIDAS CON PROBLEMAS MOBILE
Verificar y reparar en este orden de prioridad:
1. Casos de uso WFBuilder — scroll snap en mobile
2. Typing effect casos de uso — layout en pantalla angosta
3. Collage de imágenes productos — posicionamiento absoluto
4. Hero de productos — flex row en mobile debe ser column
5. Cards WFBuilder y FSMTool — imagen y texto en columna

### PROHIBIDO
- Nunca tocar lógica de animaciones desktop
- Nunca cambiar valores de style={{}} existentes
- Nunca modificar colores ni tipografías
- Nunca reescribir archivos completos
- Nunca mergear a main sin revisar en mobile real o DevTools

## RESPONSIVE — OBLIGATORIO EN TODO EL PROYECTO

Todo componente, sección o página debe funcionar correctamente en estos anchos
mínimos sin excepción:
- 375px — iPhone SE / móviles pequeños
- 390px — iPhone 14
- 768px — tablets
- 1024px — laptops
- 1280px+ — desktop

### REGLA DE ORO
Ningún cambio se considera terminado hasta que funciona en los 5 breakpoints.

### PATRONES OBLIGATORIOS
- Flex rows en desktop → flex column en mobile
- Imágenes: siempre maxWidth 100%, nunca ancho fijo en mobile
- Texto: nunca font-size fijo menor a 14px en mobile
- Padding horizontal en mobile: mínimo 16px en los costados
- Ningún elemento puede causar scroll horizontal

### CÓMO IMPLEMENTAR
- Estilos base (style={{}}) = desktop
- Media queries via `<style>` tag para mobile/tablet
- Nunca usar px fijos en widths de contenedores principales
- Usar %, vw, o maxWidth con width 100%

## REGLAS DE TRABAJO Y DISEÑO (NO NEGOCIABLES)

### Antes de tocar nada
- Si el cambio toca una sección o componente que aún no conocés, leelo completo primero. No asumas estructura.
- Si una tarea requiere modificar estilos globales, Navbar, Footer u otro componente compartido, DETENETE y avisá antes de hacerlo.
- No refactorices, renombres ni "mejores" código que no se pidió tocar.

### Tokens y estilos
- Usá siempre var(--primary), var(--accent), var(--accent-dark), var(--secondary), var(--text-body), var(--font-heading) y var(--font-body). Prohibido hardcodear colores o fuentes nuevos.
- Para sombras, radios y espaciados, reutilizá los valores ya presentes en globals.css. No inventes valores nuevos.
- No modifiques los colores existentes. Si fuera imprescindible, recordá que están duplicados en @theme {} y en :root {} y deben cambiarse en ambos lugares.
- Mantené Tailwind solo como está (colores en @theme). El proyecto es CSS custom en globals.css: no introduzcas clases utilitarias de Tailwind en los JSX.

### Animaciones
- Sin librerías nuevas: nada de Framer Motion, GSAP, AOS ni similares.
- Toda animación sigue el patrón del proyecto: IntersectionObserver + clase .visible + @keyframes en globals.css. Para reveals usá .fade-up y los delays .d1–.d4.
- Animá solo transform y opacity (nunca propiedades que disparen reflow/layout).
- Duraciones cortas (150–280 ms), easing ease-out. Sin rebotes exagerados.
- Respetá SIEMPRE prefers-reduced-motion.

### Nombres y convenciones
- Clases con prefijo de sección (hero-*, pqc-*, ec-*, etc.), IDs en kebab-case (#hero, #metodologia), modificadores con sufijo (.alt, .featured, .visible, .active).
- Páginas en frontend/src/pages/[Nombre].jsx, registradas en routes.jsx.
- Componentes compartidos en frontend/src/components/PascalCase.jsx. Contexto en frontend/src/context/NombreContext.jsx.

### Features nuevas
- Reutilizá los componentes y patrones existentes antes de crear nuevos.
- Lógica de UI interactiva en el componente de página (en pages/).
- No agregues dependencias nuevas sin justificarlo y consultarme primero.
- Si una feature necesita backend, agregá ruta/controlador/middleware en backend/ siguiendo la estructura existente y exponé la URL al frontend vía VITE_API_URL.

### Accesibilidad y calidad
- Accesibilidad mínima AA: foco visible, contraste suficiente, navegación por teclado intacta, HTML semántico.
- Responsive obligatorio: verificá en los breakpoints del proyecto.

### Proceso
- Cambios pequeños e incrementales, uno a la vez.
- Tras cada cambio: confirmá que las demás secciones quedan idénticas y que no cambió ningún comportamiento existente. Probá responsive.
- Si algo no está claro o hay ambigüedad, preguntá antes de asumir.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
