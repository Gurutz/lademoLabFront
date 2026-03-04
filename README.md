# LaDemo Lab — Frontend

Aplicación web para **LaDemo**, una escuela de baile. Permite consultar horarios de clases, niveles, tarifas, y ponerse en contacto con el equipo a través de un formulario.

🔗 Repositorio: [github.com/Gurutz/lademoLabFront](https://github.com/Gurutz/lademoLabFront.git)

---

## Stack tecnológico

| Categoría | Tecnología |
|---|---|
| Framework UI | React 19 |
| Lenguaje | TypeScript 5.9 |
| Build tool | Vite 7 |
| Estilos | Tailwind CSS 4 |
| Enrutamiento | React Router DOM 7 |
| Formularios | React Hook Form 7 + Yup |
| Animaciones | Framer Motion 12 |
| Iconos | Lucide React |
| Email | EmailJS Browser |
| Utilidades CSS | clsx |

---

## Requisitos previos

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Gurutz/lademoLabFront.git
cd lademoLabFront

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores (ver sección Variables de entorno)

# 4. Iniciar servidor de desarrollo
npm run dev
```

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con HMR |
| `npm run build` | Compila TypeScript y genera el build de producción |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto |

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes claves:

```env
# URLs de los logos alojados en Cloudinary (u otro CDN)
VITE_IMG_LOGO_URL_DARK="https://..."
VITE_IMG_LOGO_URL_LIGHT="https://..."
```

> Todas las variables expuestas al cliente deben comenzar con el prefijo `VITE_`.

---

## Rutas de la aplicación

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `App` | Página de inicio con hero y video |
| `/auth/login` | `LoginPage` | Formulario de inicio de sesión |
| `/auth/register` | `RegisterPage` | Formulario de registro |
| `/about` | `AboutPage` | Información de la escuela y formulario de contacto |
| `/clases/horarios-niveles` | `ScheduleClasses` | Horario de clases por día, hora y nivel |
| `*` | — | Página 404 |

Todas las rutas están envueltas en `HomeLayout`, que incluye la barra de navegación y el aside de enlaces.

---

## Árbol de archivos

```
lademoLabFront/
├── public/
│   └── vite.svg
├── src/
│   ├── app/
│   │   └── routes/
│   │       └── AppRouter.tsx          # Definición de rutas con React Router
│   ├── assets/
│   │   └── fonts/
│   │       └── OverusedGrotesk-*.ttf  # Familia tipográfica completa
│   ├── config/
│   │   ├── Links.ts                   # Links de navegación estáticos
│   │   └── Schedule.ts                # Datos del horario (días, horas, clases)
│   ├── features/
│   │   ├── about/
│   │   │   ├── components/
│   │   │   │   └── ContactForm.tsx    # Formulario de contacto con EmailJS
│   │   │   ├── pages/
│   │   │   │   └── AboutPage.tsx
│   │   │   ├── schema/
│   │   │   │   └── schema.ts          # Validación Yup del formulario de contacto
│   │   │   ├── services/
│   │   │   │   └── EmailService.ts    # Integración con EmailJS
│   │   │   └── types/
│   │   │       └── index.ts
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   └── RegisterPage.tsx
│   │   │   └── schemas/
│   │   │       └── auth.Schema.ts     # Validación Yup de login/registro
│   │   ├── home/
│   │   │   └── components/
│   │   │       ├── HeroWithVideo.tsx  # Hero section con video de fondo
│   │   │       └── SectionComponent.tsx
│   │   └── schedule-classes/
│   │       ├── components/
│   │       │   ├── MobilePriceCard.tsx
│   │       │   └── PriceCard.tsx
│   │       └── pages/
│   │           └── ScheduleClasses.tsx # Grilla de horarios + tarifas
│   ├── shared/
│   │   ├── animations/
│   │   │   └── variants.ts            # Variantes de Framer Motion reutilizables
│   │   ├── forms/
│   │   │   ├── InputComponent.tsx
│   │   │   └── TextAreaComponent.tsx
│   │   ├── layouts/
│   │   │   └── HomeLayout.tsx         # Layout principal (navbar + outlet)
│   │   ├── ApuntateButton.tsx
│   │   ├── AsideLinks.tsx
│   │   ├── LinkComponent.tsx
│   │   └── NavbarComponent.tsx
│   ├── App.tsx                        # Página Home principal
│   ├── index.css                      # Variables CSS globales y fuentes
│   └── main.tsx                       # Punto de entrada de la app
├── .env                               # Variables de entorno (no commitear)
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── eslint.config.js
```

---

## Arquitectura

El proyecto sigue una arquitectura **feature-based** (orientada a funcionalidades):

```
src/
├── app/        → Configuración global: router
├── config/     → Datos estáticos (horarios, links de nav)
├── features/   → Módulos por funcionalidad (about, auth, home, schedule-classes)
│                  Cada feature contiene: components/, pages/, schemas/, services/, types/
├── shared/     → Componentes, layouts, animaciones y formularios reutilizables
```

### Principios aplicados

- **Separación por dominio**: cada feature es autocontenida con sus propios componentes, páginas, schemas y servicios.
- **Shared**: solo contiene piezas genuinamente reutilizables entre features.
- **Config**: datos estáticos o configuración de la aplicación, separados de la lógica de UI.
- **Formularios**: React Hook Form + Yup para validación declarativa con tipado fuerte.
- **Estilos**: Tailwind CSS v4 con variables CSS personalizadas definidas en `index.css`.

---

## Dependencias principales

### Producción

| Paquete | Versión | Uso |
|---|---|---|
| `react` | ^19.2.0 | Framework principal |
| `react-dom` | ^19.2.0 | Renderizado en el DOM |
| `react-router-dom` | ^7.12.0 | Enrutamiento SPA |
| `react-hook-form` | ^7.71.1 | Gestión de formularios |
| `@hookform/resolvers` | ^5.2.2 | Adaptador Yup → React Hook Form |
| `yup` | ^1.7.1 | Esquemas de validación |
| `tailwindcss` | ^4.1.18 | Utilidades CSS |
| `@tailwindcss/vite` | ^4.1.18 | Plugin Vite para Tailwind v4 |
| `framer-motion` | ^12.31.1 | Animaciones declarativas |
| `lucide-react` | ^0.563.0 | Iconos SVG |
| `@emailjs/browser` | ^4.4.1 | Envío de emails desde el cliente |
| `clsx` | ^2.1.1 | Composición condicional de clases CSS |

### Desarrollo

| Paquete | Versión | Uso |
|---|---|---|
| `vite` | ^7.2.4 | Build tool y dev server |
| `@vitejs/plugin-react-swc` | ^4.2.2 | Fast Refresh con SWC |
| `typescript` | ~5.9.3 | Tipado estático |
| `eslint` | ^9.39.1 | Linter |
| `typescript-eslint` | ^8.46.4 | Reglas TypeScript para ESLint |

---

## Tipografía

La aplicación usa la fuente **Overused Grotesk** (incluida localmente en `src/assets/fonts/`), disponible en los pesos: Light, Book, Roman, Medium, SemiBold, Bold, ExtraBold y Black — con sus variantes itálicas.
