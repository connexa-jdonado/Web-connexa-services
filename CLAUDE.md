# REGLAS DEL PROYECTO — CONNEXA SERVICES (Next.js)

## DESIGN SYSTEM BLOQUEADO
- Color primario: #172554
- Color secundario: #F3F4F6
- Color acento: #71B136
- Tipografía headings: Plus Jakarta Sans
- Tipografía body: Inter
- Variables en styles/globals.css — NO modificar

## ESTRUCTURA DEL PROYECTO
- app/ — páginas Next.js App Router
- app/layout.jsx — layout raíz con Navbar y Footer
- app/page.jsx — Home (Server Component wrapper)
- app/HomeClient.jsx — Home (Client Component)
- app/servicios/ — página Servicios
- app/productos/ — página Productos
- app/productos/fsmtool/ — página FSMTool
- app/productos/workflow-builder/ — página WFBuilder
- components/ — Navbar, Footer, LanguageSwitcher, Providers
- context/LanguageContext.jsx — sistema bilingüe ES/EN
- styles/globals.css — CSS completo del proyecto
- public/assets/ — imágenes y logos

## REGLAS DE MODIFICACIÓN
1. NUNCA reescribir archivos completos
2. Solo usar str_replace para ediciones puntuales
3. Nunca tocar Navbar.jsx ni Footer.jsx sin indicación explícita
4. Nunca cambiar colores ni tipografías del design system
5. Antes de modificar: leer el archivo completo
6. Después de modificar: verificar que el contenido clave existe

## SISTEMA BILINGÜE — OBLIGATORIO
- Todo texto visible debe usar el LanguageContext
- Usar el hook useLanguage() para acceder a traducciones
- Nunca agregar texto hardcodeado sin traducción ES/EN
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