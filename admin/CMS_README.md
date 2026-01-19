# CMS Panel - Blancos Sueños de Escalada

Panel administrativo para gestionar el contenido de la landing page.

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env` y ajusta la URL de la API si es necesario:

```bash
VITE_API_URL=http://localhost:5000
```

### 3. Ejecutar el Proyecto

```bash
npm run dev
```

El panel administrativo estará disponible en: `http://localhost:5174`

## 📋 Credenciales de Acceso

**Email:** admin@blancosuenos.com  
**Password:** admin123

> ⚠️ Recuerda cambiar estas credenciales en producción

## 🎯 Funcionalidades Implementadas

### ✅ Páginas del CMS

- **Hero Section**: Edita el banner principal con título, subtítulo, descripción, CTA y carrusel de imágenes
- **Cabañas**: CRUD completo para gestionar las cabañas (nombre, descripción, capacidad, amenities, imágenes, precios)
- **Actividades**: Gestión de actividades disponibles con categorías y niveles de dificultad
- **Reseñas**: Administración de testimonios y reviews de clientes
- **Galería**: Organización de imágenes por categorías (cabaña, paisaje, actividad, instalación)
- **Configuración**: Información general del sitio (nombre, descripción, contacto, redes sociales, logo)

### 🔐 Autenticación

- Login con JWT
- Sesión persistente
- Rutas protegidas
- Logout automático en caso de token expirado

### 📊 Dashboard

- Vista general con estadísticas
- Accesos rápidos a todas las secciones
- Resumen de contenido

## 🛠️ Tecnologías Utilizadas

- **React 18** con TypeScript
- **Vite** como bundler
- **TailwindCSS v3** para estilos
- **TanStack Query** para gestión de estado y cache
- **React Router** para navegación
- **Axios** para peticiones HTTP
- **Lucide React** para iconos

## 📁 Estructura del Proyecto

```
admin/
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── Layout.tsx     # Layout principal con sidebar
│   │   └── PrivateRoute.tsx  # Protección de rutas
│   ├── context/           # Contextos de React
│   │   └── AuthContext.tsx   # Manejo de autenticación
│   ├── pages/             # Páginas del CMS
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── HeroPage.tsx
│   │   ├── CabanasPage.tsx
│   │   ├── ActividadesPage.tsx
│   │   ├── ResenasPage.tsx
│   │   ├── GaleriaPage.tsx
│   │   └── ConfiguracionPage.tsx
│   ├── services/          # Servicios y APIs
│   │   └── api.ts         # Cliente HTTP con interceptores
│   └── main.tsx           # Punto de entrada
└── package.json
```

## 🔄 Endpoints de la API

El panel consume los siguientes endpoints del backend:

- `POST /api/auth/login` - Autenticación
- `GET /api/heroes` - Obtener hero section
- `PUT /api/heroes/:id` - Actualizar hero section
- `GET /api/cabanas` - Listar cabañas
- `POST /api/cabanas` - Crear cabaña
- `PUT /api/cabanas/:id` - Actualizar cabaña
- `DELETE /api/cabanas/:id` - Eliminar cabaña
- `GET /api/activities` - Listar actividades
- `POST /api/activities` - Crear actividad
- `PUT /api/activities/:id` - Actualizar actividad
- `DELETE /api/activities/:id` - Eliminar actividad
- `GET /api/reviews` - Listar reseñas
- `POST /api/reviews` - Crear reseña
- `PUT /api/reviews/:id` - Actualizar reseña
- `DELETE /api/reviews/:id` - Eliminar reseña
- `GET /api/gallery` - Listar imágenes de galería
- `POST /api/gallery` - Agregar imagen
- `PUT /api/gallery/:id` - Actualizar imagen
- `DELETE /api/gallery/:id` - Eliminar imagen
- `GET /api/config` - Obtener configuración
- `PUT /api/config/:id` - Actualizar configuración

## 📝 Notas Importantes

1. **Backend Requerido**: Este panel necesita que el backend esté ejecutándose en `http://localhost:5000`
2. **Subida de Archivos**: Las imágenes se suben mediante FormData y son procesadas por el backend
3. **Cache Inteligente**: TanStack Query gestiona automáticamente el cache y las refetches
4. **Responsive**: El panel es completamente responsive y funciona en dispositivos móviles

## 🐛 Troubleshooting

### Error: "Cannot connect to API"
- Verifica que el backend esté ejecutándose en el puerto 5000
- Revisa la variable de entorno `VITE_API_URL` en el archivo `.env`

### Error: "Unauthorized"
- Verifica que las credenciales sean correctas
- Limpia el localStorage: `localStorage.clear()` en la consola del navegador

### Imágenes no se cargan
- Verifica que la URL base de la API en `.env` no incluya `/api` al final
- Asegúrate de que el backend esté sirviendo archivos estáticos correctamente

## 📦 Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

## 🤝 Próximos Pasos

Una vez que el CMS esté funcionando correctamente:

1. **Adaptar la Landing**: Modificar la landing page para consumir datos de la API
2. **Testing**: Probar todas las funcionalidades end-to-end
3. **Deployment**: Desplegar backend + admin + landing en el servidor VPS
4. **Configurar Dominios**: 
   - Landing: `blancosuenos.com`
   - Admin: `admin.blancosuenos.com`
   - API: `api.blancosuenos.com`
