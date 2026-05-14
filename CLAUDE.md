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

## REGLAS ESPECÍFICAS — WORKTREE PERFORMANCE

PROHIBIDO en este worktree:
- Nunca reescribir archivos completos existentes
- Solo agregar código nuevo o editar líneas puntuales
- Nunca modificar el diseño visual, colores ni tipografías
- Nunca tocar styles/globals.css salvo eliminar CSS 
  claramente sin usar
- Nunca modificar componentes de páginas completas

PERMITIDO en este worktree:
- Crear archivos nuevos (workers, componentes separados)
- Agregar dynamic imports al inicio de archivos
- Agregar atributos width/height a imágenes existentes
- Agregar preload de fuentes en layout.jsx
- Separar el canvas en su propio componente nuevo

ANTES de cada cambio:
1. Leer el archivo completo
2. Confirmar qué líneas exactas se van a tocar
3. Verificar que HomeClient.jsx sigue teniendo 
   la sección de partículas después del cambio