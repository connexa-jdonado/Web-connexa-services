# REGLAS DEL PROYECTO — CONNEXA SERVICES (Next.js)

## STACK TÉCNICO (verificado)
- Next.js 16.2.6 — App Router
- React 19.2.4 / react-dom 19.2.4
- TypeScript 5.9.3 — SOLO en archivos de config (next.config.ts,
  next-env.d.ts). El código de la app es JavaScript (.jsx), NO TypeScript.
- Tailwind CSS v4 (vía @tailwindcss/postcss) + CSS custom en styles/globals.css
- ESLint 9 — flat config en eslint.config.mjs
- Gestor de paquetes: npm (lockfile: package-lock.json)
- Tipo de proyecto: sitio de marketing estático. SIN backend, SIN base de
  datos, SIN auth. El único "estado" es el idioma (React Context).

### RIESGO CONOCIDO
- La versión de Node NO está fijada en el repo (no hay .nvmrc ni campo
  "engines" en package.json). El entorno usa la versión de Node que tenga
  instalada. No asumir una versión concreta de Node.

## DESIGN SYSTEM BLOQUEADO
- Color primario: #172554
- Color secundario: #F3F4F6
- Color acento: #71B136
- Tipografía headings: Plus Jakarta Sans
- Tipografía body: Inter
- Variables en styles/globals.css — NO modificar

## ESTRUCTURA DEL PROYECTO
NO existe carpeta /src. El código vive en la raíz del repo.

- app/ — App Router (rutas + layout)
  - layout.jsx — layout raíz (Navbar, Footer, Providers). Server Component.
  - page.jsx — Home (Server Component wrapper, exporta metadata)
  - HomeClient.jsx — Home (Client Component)
  - not-found.jsx — página 404
  - servicios/ — page.jsx + ServiciosClient.jsx
  - productos/ — page.jsx + ProductosClient.jsx
    - fsmtool/ — page.jsx + FSMToolClient.jsx
    - workflow-builder/ — page.jsx + WorkflowBuilderClient.jsx
- components/ — Navbar, Footer, LanguageSwitcher, Providers,
  ParticlesCanvas, AssessmentMethodology (todos .jsx, PascalCase)
- context/LanguageContext.jsx — sistema bilingüe ES/EN
- styles/globals.css — CSS completo del proyecto
- public/assets/ — imágenes y logos (clientes en public/assets/clients/)

## REGLAS DE MODIFICACIÓN
1. NUNCA reescribir archivos completos
2. Solo usar str_replace para ediciones puntuales
3. Nunca tocar Navbar.jsx ni Footer.jsx sin indicación explícita
4. Nunca cambiar colores ni tipografías del design system
5. Antes de modificar: leer el archivo completo
6. Después de modificar: verificar que el contenido clave existe

## SISTEMA BILINGÜE — OBLIGATORIO
- Todo texto visible debe usar el LanguageContext
- Usar el hook useLang() (importado desde @/context/LanguageContext) para
  acceder a las traducciones
- PROHIBIDO hardcodear texto visible. Todo string visible pasa por useLang()
  con su traducción ES/EN
- El idioma persiste en localStorage

## COMPONENTES EXISTENTES — REUTILIZAR SIEMPRE
- Navbar.jsx — navbar con scroll, hamburguesa, ES/EN
- Footer.jsx — footer 4 columnas
- LanguageSwitcher.jsx — selector ES/EN
- Providers.jsx — wrapper client para LanguageProvider

## REGLA CRÍTICA — SECCIONES PROTEGIDAS
En FSMTool y WorkflowBuilder verificar siempre que
existe la sección de casos de uso con video antes
y después de cualquier cambio.

## MOBILE FIRST
- Todo componente debe ser responsive
- Breakpoints: mobile 768px, tablet 1024px

## NAVEGACIÓN
- Usar next/link para navegación interna
- Nunca usar <a href> para rutas internas
- Rutas: / · /servicios · /productos ·
  /productos/fsmtool · /productos/workflow-builder

## IMÁGENES
- Usar next/image para todas las imágenes
- Todas las imágenes en public/assets/
- Logos clientes en public/assets/clients/

## SEO
- Cada página tiene export const metadata con:
  title, description y keywords relevantes
- Keywords principales: Oracle Field Service, OFSC,
  Field Service Management, Zinier, implementación OFSC

## CONVENCIONES DE CÓDIGO (verificadas)
- El código es JavaScript (.jsx), NO TypeScript. NO hay reglas de tipado:
  no tipar props, no preocuparse por "any", no convertir .jsx a .tsx.
- Patrón de ruta: cada ruta = page.jsx (Server Component que exporta
  `metadata` para SEO) + [Nombre]Client.jsx con la directiva 'use client'
  y la lógica de UI interactiva, en la misma carpeta.
- layout.jsx y los page.jsx NO llevan 'use client'. Solo los *Client.jsx
  y el contexto/providers son Client Components.
- Componentes en PascalCase. Los Client Components de página llevan el
  sufijo Client (HomeClient, ProductosClient, FSMToolClient, …).
- Imports SIEMPRE con el alias @/* (configurado en tsconfig paths).
  Nunca usar rutas relativas profundas tipo ../../..
- i18n: todo texto visible pasa por el hook useLang() (ver SISTEMA BILINGÜE).

## VERIFICACIÓN ANTES DE PR
- Ejecutar `npm run lint` y que pase sin errores.
- Ejecutar `npm run build` y que compile sin errores.
- NO existe script de typecheck ni de tests en este proyecto: no los
  menciones ni los asumas. Scripts disponibles: dev, build, start, lint.

## PÁGINAS FALTANTES — CREAR CUANDO SE SOLICITE
- app/not-found.jsx — página 404
- app/nosotros/page.jsx — página Nosotros
- app/casos-de-exito/page.jsx — página Casos de éxito

## GIT — OBLIGATORIO ANTES DE CADA CAMBIO
- Antes de cualquier modificación hacer commit de backup
- Nunca trabajar con cambios sin commitear
- Formato de commits: "tipo: descripción breve"
  Tipos: feat, fix, style, refactor, backup
- Después de cada cambio verificar que el build 
  compila sin errores con npm run build

## WORKTREES — TRABAJO EN PARALELO
- Cada worktree trabaja en su propia rama
- Nunca mergear a main sin revisar visualmente
- Cada rama tiene una sola responsabilidad
- Ramas activas:
  main — producción estable
  feature/home — mejoras Home
  feature/productos — mejoras páginas de producto
  feature/servicios — mejoras página servicios
  feature/seo — optimizaciones SEO y metadata

## REGLAS ESPECÍFICAS — WORKTREE CONTENT

PROHIBIDO en este worktree:
- Nunca tocar archivos de performance o animaciones
- Nunca modificar el canvas de partículas
- Nunca cambiar colores ni tipografías del design system
- Nunca reescribir archivos completos

PERMITIDO en este worktree:
- Modificar textos y traducciones ES/EN
- Cambiar orden de secciones
- Agregar imágenes y videos
- Ajustes visuales de layout y espaciado
- Crear páginas nuevas (nosotros, casos de éxito)

ANTES de cada cambio:
1. Leer el archivo completo
2. Confirmar qué líneas exactas se van a tocar
3. Verificar que la sección de casos de uso con video
   existe en FSMTool y WorkflowBuilder después del cambio
4. Confirmar que el build compila sin errores

WORKFLOW:
- Un cambio a la vez
- Commit después de cada cambio exitoso
- Nunca acumular muchos cambios sin commitear

## MOBILE — REGLA CRÍTICA

Prioridad: desktop intacto, mobile funcional.

### PRINCIPIO BASE
Nunca modificar estilos desktop para arreglar mobile.
Todo ajuste mobile va EXCLUSIVAMENTE en media queries
o condiciones responsive, nunca tocando el estilo base.

### OBLIGATORIO EN CADA COMPONENTE NUEVO O MODIFICADO
1. Verificar que el componente se ve en 375px y 768px
2. Agregar estilos mobile SIEMPRE como adición, nunca reemplazando
3. Usar este patrón para responsive inline:
   - Desktop: estilo base en style={{}}
   - Mobile: usar <style> tag con @media (max-width: 768px)
     o estado con useWindowSize hook si es necesario

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

Todo componente, sección o página debe funcionar correctamente
en estos anchos mínimos sin excepción:
- 375px — iPhone SE / móviles pequeños
- 390px — iPhone 14
- 768px — tablets
- 1024px — laptops
- 1280px+ — desktop

### REGLA DE ORO
Ningún cambio se considera terminado hasta que
funciona en los 5 breakpoints. Sin excepción.

### PATRONES OBLIGATORIOS
- Flex rows en desktop → flex column en mobile
- Imágenes: siempre maxWidth 100%, nunca ancho fijo en mobile
- Texto: nunca font-size fijo menor a 14px en mobile
- Padding horizontal en mobile: mínimo 16px en los costados
- Ningún elemento puede causar scroll horizontal

### CÓMO IMPLEMENTAR
- Estilos base (style={{}}) = desktop
- Media queries via <style> tag para mobile/tablet
- Nunca usar px fijos en widths de contenedores principales
- Usar %, vw, o maxWidth con width 100%

## REGLAS DE TRABAJO Y DISEÑO (NO NEGOCIABLES)

### Antes de tocar nada
- Si el cambio toca una sección o componente que aún no conocés, leelo completo primero. No asumas estructura.
- Si una tarea requiere modificar estilos globales, Navbar, Footer u otro componente compartido, DETENETE y avisá antes de hacerlo. No lo hagas por tu cuenta.
- No refactorices, renombres ni "mejores" código que no se pidió tocar.

### Tokens y estilos
- Usá siempre var(--primary), var(--accent), var(--accent-dark), var(--secondary), var(--text-body), var(--font-heading) y var(--font-body). Prohibido hardcodear colores o fuentes nuevos.
- Para sombras, radios y espaciados, reutilizá los valores ya presentes en globals.css. No inventes valores nuevos.
- No modifiques los colores existentes. Si fuera imprescindible, recordá que están duplicados en @theme {} y en :root {} y deben cambiarse en ambos lugares para no desincronizarse.
- Mantené Tailwind solo como está (colores en @theme). El proyecto es CSS custom en globals.css: no introduzcas clases utilitarias de Tailwind en los JSX.

### Animaciones
- Sin librerías nuevas: nada de Framer Motion, GSAP, AOS ni similares.
- Toda animación sigue el patrón existente del proyecto: IntersectionObserver + clase .visible + @keyframes en globals.css. Para reveals usá .fade-up y los delays .d1–.d4.
- Animá solo transform y opacity (nunca propiedades que disparen reflow/layout).
- Duraciones cortas (150–280 ms), easing ease-out. Sin rebotes exagerados.
- Respetá SIEMPRE prefers-reduced-motion: si está activo, desactivá o reducí las animaciones.

### Nombres y convenciones
- Clases con prefijo de sección (hero-*, pqc-*, ec-*, etc.), IDs en kebab-case (#hero, #metodologia), modificadores con sufijo (.alt, .featured, .visible, .active).
- Páginas: page.jsx (Server Component con metadata) + [Nombre]Client.jsx (Client Component con la lógica UI) en la misma carpeta.
- Componentes compartidos en components/PascalCase.jsx. Contexto en context/NombreContext.jsx.

### Features nuevas
- Reutilizá los componentes y patrones existentes antes de crear nuevos. Si creás un componente nuevo, seguí exactamente las convenciones de arriba.
- Mantené la separación Server/Client del App Router. La lógica de UI interactiva va en el *Client.jsx.
- No agregues dependencias nuevas sin justificarlo y consultarme primero.

### Accesibilidad y calidad
- Accesibilidad mínima AA: foco visible, contraste suficiente, navegación por teclado intacta, HTML semántico.
- Responsive obligatorio: verificá en los breakpoints del proyecto (768px y 960px/1024px con max-width).

### Proceso
- Cambios pequeños e incrementales, uno a la vez.
- Tras cada cambio: confirmá que las demás secciones quedan idénticas y que no cambió ningún comportamiento existente. Probá responsive.
- Si algo no está claro o hay ambigüedad, preguntá antes de asumir.