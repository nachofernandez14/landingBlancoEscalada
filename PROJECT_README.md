# 🏔️ Blancos Sueños de Escalada - Sistema CMS Completo

Sistema completo de gestión de contenido para landing page de cabañas turísticas en Mendoza, Argentina.

## 📋 Descripción del Proyecto

Transformación de una landing page estática a un **sistema dinámico con CMS** que permite al propietario gestionar todo el contenido de manera autónoma, sin necesidad de conocimientos técnicos.

### 🎯 Objetivo

Permitir la gestión completa de:
- ✅ Textos y descripciones
- ✅ Imágenes y videos
- ✅ Información de cabañas
- ✅ Actividades y servicios
- ✅ Reseñas de clientes
- ✅ Configuración general (WhatsApp, redes sociales, SEO)

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────┐
│              ARQUITECTURA                    │
├─────────────────────────────────────────────┤
│                                             │
│  🌐 blancosuenos.com                        │
│  └─ Landing Page (React + Vite)            │
│     └─ Consume API para datos dinámicos    │
│                                             │
│  🔧 admin.blancosuenos.com                  │
│  └─ Panel CMS (React + TypeScript)         │
│     └─ Gestión completa de contenido       │
│                                             │
│  🔌 api.blancosuenos.com                    │
│  └─ Backend API (Node.js + Express)        │
│     ├─ Endpoints REST                       │
│     ├─ Autenticación JWT                    │
│     ├─ Upload de archivos                   │
│     └─ Gestión de datos                     │
│                                             │
│  💾 MongoDB                                 │
│  └─ Base de datos                           │
│     ├─ Contenido dinámico                   │
│     ├─ Usuarios administradores             │
│     └─ Configuración del sitio              │
│                                             │
└─────────────────────────────────────────────┘
```

## 📦 Estructura del Repositorio

```
landingBlancoEscalada-development/
├── backend/              # API REST (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── server.ts
│   ├── uploads/          # Archivos subidos
│   └── README.md
│
├── admin/                # Panel CMS (React + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── types/
│   └── README.md
│
├── src/                  # Landing Page (React actual)
│   ├── components/
│   ├── views/
│   └── assets/
│
├── public/               # Assets estáticos
│   ├── img/
│   └── videos/
│
├── DEPLOYMENT.md         # Guía de deployment completa
├── branding.md           # Guía de marca
└── README.md             # Este archivo
```

## 🚀 Stack Tecnológico

### Backend API
- **Node.js** + **Express** + **TypeScript**
- **MongoDB** + **Mongoose** (Base de datos)
- **JWT** (Autenticación)
- **Multer** + **Sharp** (Manejo de imágenes)
- **Bcrypt** (Encriptación)

### Panel Admin (CMS)
- **React** 18 + **TypeScript**
- **Vite** (Build tool)
- **TailwindCSS** (Estilos)
- **TanStack Query** (Estado del servidor)
- **React Router** (Navegación)
- **React Hook Form** (Formularios)
- **Axios** (HTTP client)

### Landing Page
- **React** 18 + **TypeScript**
- **Vite** (Build tool)
- **TailwindCSS** (Estilos)
- **Framer Motion** + **GSAP** (Animaciones)
- **React Router** (Navegación)

## 📥 Instalación Local

### Prerrequisitos
- Node.js 18+
- MongoDB 5+
- npm o yarn

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/landingBlancoEscalada.git
cd landingBlancoEscalada-development
```

### 2. Instalar Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus configuraciones
npm run seed  # Inicializar base de datos
npm run dev   # Iniciar en desarrollo (puerto 5000)
```

### 3. Instalar Panel Admin

```bash
cd admin
npm install
cp .env.example .env
# Editar .env
npm run dev   # Iniciar en desarrollo (puerto 5174)
```

### 4. Instalar Landing Page

```bash
cd ..
npm install
npm run dev   # Iniciar en desarrollo (puerto 5173)
```

## 🔐 Acceso al Panel Admin

**Credenciales por defecto:**
- URL: `http://localhost:5174`
- Email: `admin@blancosuenos.com`
- Password: `admin123`

⚠️ **Importante:** Cambiar estas credenciales en producción

## 📡 Endpoints de la API

### Públicos (Sin autenticación)
- `GET /api/hero` - Obtener hero section
- `GET /api/cabanas` - Listar cabañas activas
- `GET /api/activities` - Listar actividades
- `GET /api/reviews` - Listar reseñas
- `GET /api/gallery` - Listar galería
- `GET /api/config` - Obtener configuración

### Privados (Requieren autenticación)
- `POST /api/auth/login` - Iniciar sesión
- `PUT /api/hero` - Actualizar hero
- `POST /api/cabanas` - Crear cabaña
- `PUT /api/cabanas/:id` - Actualizar cabaña
- `DELETE /api/cabanas/:id` - Eliminar cabaña
- `POST /api/upload` - Subir archivo
- *(Ver documentación completa en `/backend/README.md`)*

## 🎨 Contenido Gestionable

### Desde el Panel Admin puedes editar:

#### 📝 Textos
- Títulos y descripciones del hero
- Información de cada cabaña
- Promociones especiales
- Actividades y excursiones
- Testimonios de clientes
- Configuración general

#### 🖼️ Multimedia
- Carousel principal (hero)
- Imágenes de cabañas
- Galería completa
- Videos promocionales
- Logo y favicon

#### ⚙️ Configuración
- Número de WhatsApp
- Mensaje predeterminado
- Redes sociales
- Google Maps
- SEO (meta tags)
- Colores del tema

## 🚀 Deployment en Producción

Ver la guía completa en [DEPLOYMENT.md](DEPLOYMENT.md)

### Resumen rápido:

1. **Configurar VPS** (Ubuntu 20.04+)
2. **Instalar requisitos** (Node.js, MongoDB, Nginx, PM2)
3. **Clonar proyecto** en `/var/www/blancosuenos`
4. **Configurar backend** y ejecutar con PM2
5. **Buildear admin y landing**
6. **Configurar Nginx** para los 3 dominios
7. **Instalar SSL** con Certbot
8. **Configurar DNS** apuntando a tu VPS

## 📚 Documentación

- **Backend API**: [backend/README.md](backend/README.md)
- **Panel Admin**: [admin/README.md](admin/README.md)
- **Deployment**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Branding**: [branding.md](branding.md)

## 🔧 Scripts Disponibles

### Landing Page
```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run preview  # Preview build
```

### Backend
```bash
npm run dev      # Desarrollo con nodemon
npm run build    # Compilar TypeScript
npm run start    # Producción
npm run seed     # Inicializar DB
```

### Admin
```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run preview  # Preview build
```

## 🌟 Características

- ✅ **100% Dinámico**: Todo el contenido editable desde el CMS
- ✅ **Responsive**: Adaptado a todos los dispositivos
- ✅ **Seguro**: Autenticación JWT, validación de datos
- ✅ **Optimizado**: Imágenes optimizadas automáticamente
- ✅ **SEO Friendly**: Meta tags configurables
- ✅ **Upload de archivos**: Drag & drop de imágenes/videos
- ✅ **Multiidioma**: Preparado para internacionalización
- ✅ **Cache optimizado**: Rendimiento mejorado

## 🔄 Flujo de Trabajo

1. **Administrador** entra al panel CMS (`admin.blancosuenos.com`)
2. **Edita contenido** (textos, imágenes, cabañas, etc.)
3. **Guarda cambios** que se almacenan en MongoDB
4. **Landing page** consume la API y muestra contenido actualizado
5. **Usuarios finales** ven el contenido nuevo instantáneamente

## 🛠️ Mantenimiento

### Actualizar contenido
- Login en el panel admin
- Editar secciones necesarias
- Guardar cambios

### Actualizar código
```bash
git pull origin main
cd backend && npm install && npm run build && pm2 restart blancosuenos-api
cd ../admin && npm install && npm run build
cd .. && npm install && npm run build
sudo systemctl reload nginx
```

### Backup de base de datos
```bash
mongodump --db blancosuenos --out /backup/$(date +%Y%m%d)
```

## 📊 Próximas Mejoras

- [ ] Analytics integrado
- [ ] Sistema de reservas
- [ ] Calendario de disponibilidad
- [ ] Chat en vivo
- [ ] Multiidioma (ES/EN/PT)
- [ ] PWA (Progressive Web App)
- [ ] Notificaciones push

## 🤝 Soporte

Para soporte técnico o consultas:
- Email: soporte@blancosuenos.com
- WhatsApp: +54 9 261 300 1298

## 📄 Licencia

Proyecto privado - Todos los derechos reservados © 2026

---

**Desarrollado con ❤️ para Blancos Sueños de Escalada**
