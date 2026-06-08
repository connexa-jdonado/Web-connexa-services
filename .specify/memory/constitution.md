<!--
SYNC IMPACT REPORT
==================
Version change: (template, sin versión) → 1.0.0
Bump rationale: Primera ratificación concreta a partir de la plantilla. Se define
  el conjunto completo de principios de gobernanza del proyecto.

Principios definidos (8):
  I.    Especificación como fuente de verdad
  II.   Alcance explícito por paquete (anti-colisión)
  III.  Cambios pequeños y frecuentes
  IV.   Consistencia sobre preferencia personal
  V.    Rama principal sana
  VI.   Calidad verificable
  VII.  Internacionalización obligatoria
  VIII. Separación frontend/backend

Secciones añadidas:
  - Restricciones del Stack
  - Flujo de Trabajo y Calidad
  - Governance

Templates revisados:
  ✅ .specify/templates/plan-template.md — "Constitution Check" es genérico y
     delega los gates a este archivo; compatible, sin cambios.
  ✅ .specify/templates/spec-template.md — genérico; compatible, sin cambios.
  ✅ .specify/templates/tasks-template.md — genérico; compatible, sin cambios.
  ✅ CLAUDE.md — fuente de convenciones referenciada por el Principio IV; alineado.

Follow-up TODOs: ninguno. No quedan tokens sin resolver.
-->

# Connexa Services Constitution

## Core Principles

### I. Especificación como fuente de verdad

Ningún cambio de funcionalidad empieza por el código. Primero DEBE existir una
spec que describa el QUÉ y el PORQUÉ del cambio. Cuando el código y la spec
divergen, se DEBE corregir uno de los dos de forma explícita; está PROHIBIDO
dejar la divergencia en silencio.

**Rationale**: Con 2-3 personas trabajando en paralelo, la spec es el contrato
compartido que evita malentendidos y retrabajo. El código sin spec no tiene
intención documentada y no es auditable.

### II. Alcance explícito por paquete (anti-colisión)

Cada spec DEBE declarar si toca `frontend/`, `backend/` o ambos, y enumerar los
archivos concretos que va a modificar. Dos specs activas NO pueden solaparse en
los mismos archivos sin acordarlo antes entre el equipo.

**Rationale**: Este es el principio clave que nos mantiene a 2-3 personas
trabajando en paralelo sin pisarnos. El repo son dos paquetes JS independientes
(`frontend/` Vite+React+react-router y `backend/` Express); declarar el alcance
por paquete y por archivo hace visibles las colisiones antes de que ocurran.

### III. Cambios pequeños y frecuentes

Una spec = una rama = un PR enfocado. Los refactors grandes DEBEN ir en su propia
spec y NUNCA mezclarse con una feature.

**Rationale**: Los PRs pequeños se revisan mejor, se mergean antes y reducen la
ventana en la que dos ramas pueden colisionar. Mezclar refactor y feature oculta
la intención del cambio y dificulta el rollback.

### IV. Consistencia sobre preferencia personal

Se DEBEN seguir las convenciones de `CLAUDE.md` aunque difieran del gusto
individual. Antes de crear algo nuevo (componente, helper, endpoint), se DEBE
buscar si ya existe y reutilizarlo.

**Rationale**: La coherencia del código colectivo vale más que la preferencia de
cada quien. Reutilizar antes de crear evita duplicación, divergencia de patrones
y deuda técnica.

### V. Rama principal sana

`main` DEBE poder construirse en todo momento. Como NO hay lint ni tests
automatizados, la verificación mínima antes de mergear es:
- El frontend pasa `npm run build` (vite-react-ssg) sin errores.
- Si se tocó el backend, este levanta con `npm start` sin fallar.

**Rationale**: Sin CI que nos respalde, la disciplina manual es la única red de
seguridad. Una `main` rota bloquea a todo el equipo.

### VI. Calidad verificable

Cada spec DEBE incluir criterios de aceptación claros y comprobables. Los tests
automatizados son OPCIONALES a futuro (aún no hay infraestructura de tests) y NO
son un requisito hoy.

**Rationale**: "Funciona" tiene que ser una afirmación verificable, no una
opinión. Reconocemos la ausencia de tests como un hecho del estado actual sin
convertirla en bloqueo, pero exigimos criterios de aceptación explícitos.

### VII. Internacionalización obligatoria

Todo texto visible del frontend se gestiona vía el hook `useLang()` con
traducciones ES/EN. Está PROHIBIDO hardcodear texto visible en la UI.

**Rationale**: El sitio es bilingüe por diseño. Un solo string hardcodeado rompe
la experiencia en uno de los dos idiomas y es difícil de detectar después.

### VIII. Separación frontend/backend

El frontend es autónomo (sitio estático/prerenderizado) salvo el formulario de
contacto, que consume `VITE_API_URL` + `/api/contacto`. NO se introducen
dependencias del frontend hacia el backend más allá de esa frontera sin una spec
que lo justifique.

**Rationale**: Los dos paquetes se deployan en servidores distintos. Mantener la
frontera fina y explícita permite que el frontend siga funcionando aunque el
backend esté caído, y evita acoplamientos que compliquen el deploy independiente.

## Restricciones del Stack

- Repo de DOS PAQUETES INDEPENDIENTES (no es un monorepo orquestado): `frontend/`
  y `backend/`, cada uno con su `package.json` y su `node_modules`; se instalan,
  corren y deployan por separado.
- Frontend: React + Vite + react-router-dom + vite-react-ssg. JavaScript (`.jsx`),
  NO TypeScript. Estilos vía variables CSS en `globals.css` (Tailwind solo como
  infraestructura). i18n vía `LanguageContext`/`useLang()`.
- Backend: Node.js + Express 4 (ESM). Sin base de datos y sin auth. Solo expone
  `GET /api/health` y `POST /api/contacto`.
- La versión de Node NO está fijada (no hay `.nvmrc` ni `engines`): no se asume
  una versión concreta de Node.
- No se agregan dependencias nuevas sin justificarlo en una spec y acordarlo con
  el equipo.

## Flujo de Trabajo y Calidad

- Toda funcionalidad sigue el flujo Spec-Driven: spec → (clarify opcional) →
  plan → tasks → implement.
- Una spec se traduce en una rama y un PR enfocado (Principio III).
- Antes de abrir PR se ejecuta la verificación mínima del Principio V sobre los
  paquetes afectados.
- Las convenciones detalladas (design system, mobile-first, responsive,
  animaciones, navegación, SEO) viven en `CLAUDE.md` y son de cumplimiento
  obligatorio (Principio IV).
- Los criterios de aceptación de cada spec (Principio VI) se revisan en el PR
  como parte de la aprobación.

## Governance

Esta constitución prevalece sobre las preferencias individuales y sobre prácticas
no escritas. En caso de conflicto entre esta constitución y `CLAUDE.md`, manda la
constitución; `CLAUDE.md` desarrolla el detalle operativo dentro de estos
principios.

- **Enmiendas**: cualquier cambio a esta constitución DEBE proponerse en un PR,
  documentar la motivación y ser acordado por el equipo (2-3 personas) antes de
  mergear.
- **Versionado** (semver):
  - MAJOR: eliminación o redefinición incompatible de principios/gobernanza.
  - MINOR: nuevo principio/sección o ampliación material de una guía.
  - PATCH: aclaraciones, redacción, correcciones no semánticas.
- **Cumplimiento**: cada PR verifica el cumplimiento de los principios aplicables.
  Las desviaciones justificadas se documentan en el PR (y, si afectan al plan, en
  la tabla de Complexity Tracking del plan correspondiente).

**Version**: 1.0.0 | **Ratified**: 2026-06-08 | **Last Amended**: 2026-06-08
