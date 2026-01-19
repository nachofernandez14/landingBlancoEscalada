# Panel Admin - Blancos Sueños de Escalada

Panel de administración (CMS) para gestionar el contenido de la landing page.

## 🚀 Tecnologías

- **React** 18 + **TypeScript**
- **Vite** para desarrollo y build
- **TailwindCSS** para estilos
- **React Router** para navegación
- **TanStack Query** para estado del servidor
- **React Hook Form** para formularios
- **Axios** para peticiones HTTP
- **React Hot Toast** para notificaciones

## 📋 Requisitos previos

- Node.js 18+
- Backend API corriendo (ver `/backend`)

## 🔧 Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   
   Editar `.env`:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Iniciar en desarrollo:**
   ```bash
   npm run dev
   ```
   
   El admin estará disponible en `http://localhost:5174`

## 🎯 Scripts disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview de build
npm run preview
```

## 🔐 Acceso inicial

**Credenciales por defecto:**
- Email: `admin@blancosuenos.com`
- Password: `admin123`

## 🎨 Funcionalidades

### ✅ Implementadas

- ✅ Login con JWT
- ✅ Dashboard con estadísticas
- ✅ Layout responsive con sidebar
- ✅ Protección de rutas privadas
- ✅ Sistema de autenticación

### 🚧 En desarrollo

Las siguientes páginas están en desarrollo y se implementarán próximamente:

- **Hero Section**: Editor de título, subtítulo, descripción y carousel de imágenes
- **Cabañas**: CRUD completo (Crear, Editar, Eliminar cabañas)
- **Actividades**: Gestión de actividades, excursiones y "Entre Nosotras"
- **Reseñas**: Gestión de testimonios de clientes
- **Galería**: Upload y organización de imágenes/videos por categorías
- **Configuración**: WhatsApp, redes sociales, SEO, colores

## 📁 Estructura del proyecto

```
admin/
├── src/
│   ├── components/
│   │   ├── Layout.tsx         # Layout principal con sidebar
│   │   └── PrivateRoute.tsx   # Protección de rutas
│   ├── context/
│   │   └── AuthContext.tsx    # Context de autenticación
│   ├── pages/
│   │   ├── LoginPage.tsx      # Página de login
│   │   └── DashboardPage.tsx  # Dashboard principal
│   ├── services/
│   │   ├── api.ts            # Cliente Axios configurado
│   │   └── auth.service.ts   # Servicios de autenticación
│   ├── types/
│   │   └── index.ts          # Tipos TypeScript
│   ├── App.tsx               # Componente principal
│   ├── main.tsx              # Entry point
│   └── index.css             # Estilos globales
├── public/
├── .env.example
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Gestión de Contenido

El panel permite editar dinámicamente:

### 📝 Textos
- Títulos y descripciones
- Información de cabañas
- Textos de actividades
- Reseñas de clientes
- Configuración general

### 🖼️ Multimedia
- Imágenes del hero carousel
- Fotos de cabañas
- Galería de imágenes/videos
- Logo y favicon

### ⚙️ Configuración
- Número de WhatsApp
- Mensaje predeterminado
- Redes sociales
- URL de Google Maps
- SEO (título, descripción, keywords)
- Colores del tema

## 🚀 Build para producción

```bash
npm run build
```

Los archivos de producción se generan en `/dist`

## 📡 Conexión con la API

El admin se comunica con el backend a través de:
- API REST en `http://localhost:5000/api`
- Autenticación JWT con header `Authorization: Bearer <token>`
- Interceptores Axios para manejo automático de errores

## 🔒 Seguridad

- Todas las rutas protegidas requieren autenticación
- Token JWT almacenado en localStorage
- Redirección automática a login si el token expira
- Validación de permisos en el backend

## 📱 Responsive

El panel es completamente responsive:
- Sidebar colapsable en mobile
- Grid adaptativo para tablets
- Interfaz optimizada para desktop

## 🎨 Temas y Colores

Configurados en `tailwind.config.ts`:
```ts
colors: {
  primary: '#C46A4A',    // Terracota
  secondary: '#B87333',  // Cobre
  accent: '#9E553A',     // Terracota oscuro
  sand: '#EDE6D8',       // Arena
  cream: '#FAF8F4',      // Blanco roto
}
```

## 🐛 Debugging

- React DevTools para componentes
- TanStack Query DevTools para estado del servidor (en desarrollo)
- Console logs en servicios para peticiones HTTP

## 📝 Notas de Desarrollo

- Cada página del CMS se implementará progresivamente
- Se usará React Hook Form para formularios complejos
- TanStack Query maneja cache y sincronización con backend
- Hot Toast muestra notificaciones de éxito/error
