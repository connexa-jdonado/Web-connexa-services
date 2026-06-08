# Connexa Services — Website

Sitio web de Connexa Services, partner oficial de Oracle Field Service Cloud
y Zinier. Repo de dos paquetes independientes (frontend y backend) que se
deployan en servidores distintos.

## Stack

### frontend/ (Servidor A)
- React 19 + Vite 7 (sin meta-framework).
- react-router-dom 6 (SPA) + vite-react-ssg (prerender estático, un HTML por ruta).
- Tailwind CSS v4 (vía `@tailwindcss/vite`); el diseño real usa variables CSS en `globals.css`.
- JavaScript (.jsx), no TypeScript.
- Sistema bilingüe ES/EN con `LanguageContext` (`useLang()`).

### backend/ (Servidor B)
- Node.js + Express 4 (ESM).
- helmet, cors, express-rate-limit, nodemailer.
- Sin base de datos ni auth. Endpoints: `GET /api/health`, `POST /api/contacto`.

## Desarrollo local

Cada paquete se instala y corre por separado (no hay scripts en la raíz):

```bash
# Frontend
cd frontend && npm install && npm run dev      # Vite dev server

# Backend
cd backend && npm install && npm run dev       # node --watch
```

El frontend funciona de forma autónoma; solo el formulario de contacto usa el
backend (`VITE_API_URL` + `/api/contacto`).

## Documentación

Ver `CLAUDE.md` para las reglas completas del proyecto (stack, convenciones,
design system, i18n, mobile/responsive y proceso de trabajo).
