# 🚀 Guía de Desarrollo - Blancos Sueños de Escalada

Guía completa para desarrolladores que se unan al proyecto.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: v18.x o superior → [Descargar](https://nodejs.org/)
- **MongoDB**: v5.x o superior → [Descargar](https://www.mongodb.com/try/download/community)
- **Git**: Última versión → [Descargar](https://git-scm.com/downloads)
- **Editor**: VS Code recomendado → [Descargar](https://code.visualstudio.com/)

### Verificar Instalaciones

```bash
node --version   # Debe mostrar v18.x o superior
npm --version    # Debe mostrar v9.x o superior
mongod --version # Debe mostrar v5.x o superior
git --version    # Cualquier versión reciente
```

## 📦 Instalación del Proyecto

### 1. Clonar el Repositorio

```bash
git clone https://github.com/nachofernandez14/landingBlancoEscalada.git
cd landingBlancoEscalada
git checkout feature-admin
```

### 2. Instalar Dependencias

El proyecto tiene 3 partes: Landing, Admin Panel y Backend.

```bash
# Instalar dependencias de la landing (raíz)
npm install

# Instalar dependencias del admin
cd admin
npm install
cd ..

# Instalar dependencias del backend
cd backend
npm install
cd ..
```

### 3. Configurar Variables de Entorno

#### Backend (.env)

Crea el archivo `backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/blancosuenos

# JWT Secret
JWT_SECRET=tu_clave_secreta_super_segura_cambiar_en_produccion
JWT_EXPIRES_IN=7d

# Frontend URLs (CORS)
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174

# Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Google Places API
GOOGLE_PLACES_API_KEY=AIzaSyBB5349oJcl7zB67bVAFgZbNMZ-I_mYx4k
GOOGLE_PLACE_ID=ChIJXbmmomPnfZYRcqgPT3AF1ng
```

#### Landing (.env)

Crea el archivo `.env` en la raíz:

```env
VITE_API_URL=http://localhost:5000
```

#### Admin (.env)

Crea el archivo `admin/.env`:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Inicializar Base de Datos

```bash
# Asegúrate de que MongoDB esté corriendo
# Windows: El servicio debe estar activo
# Mac/Linux: sudo systemctl start mongod

# Ejecutar seed (crea datos de prueba)
cd backend
npm run seed
cd ..
```

El seed creará:
- ✅ Usuario admin: `admin@blancosuenos.com` / `admin123`
- ✅ 3 cabañas (Cabernet, Chardonnay, Malbec)
- ✅ 22 actividades
- ✅ 76 items de galería (imágenes y videos)
- ✅ Hero con 8 imágenes de carrusel
- ✅ Configuración del sitio

## 🚀 Ejecutar en Modo Desarrollo

**Necesitas 3 terminales abiertas simultáneamente:**

### Terminal 1 - Backend (Puerto 5000)

```bash
cd backend
npm run dev
```

Deberías ver:
```
🚀 Servidor corriendo en puerto 5000
📍 Modo: development
✅ MongoDB conectado
```

### Terminal 2 - Landing (Puerto 5173)

```bash
npm run dev
```

Deberías ver:
```
VITE v5.4.21 ready in XXX ms
➜ Local:   http://localhost:5173/
```

### Terminal 3 - Admin Panel (Puerto 5174)

```bash
cd admin
npm run dev
```

Deberías ver:
```
VITE v5.4.21 ready in XXX ms
➜ Local:   http://localhost:5174/
```

## 🌐 URLs de Desarrollo

Una vez que los 3 servidores estén corriendo:

- **Landing**: http://localhost:5173
- **Admin Panel**: http://localhost:5174
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## 🗂️ Estructura del Proyecto

```
landingBlancoEscalada/
├── public/                      # Assets estáticos de la landing
│   ├── img/                    # Imágenes públicas
│   └── videos/                 # Videos de galería
├── src/                        # Código fuente de la landing
│   ├── components/             # Componentes React
│   ├── views/                  # Páginas/Vistas
│   ├── services/               # API clients
│   └── main.tsx               # Entry point
├── admin/                      # Panel de administración
│   ├── src/
│   │   ├── pages/             # Páginas del CMS
│   │   ├── components/        # Componentes del admin
│   │   ├── context/           # Context API (Auth)
│   │   └── services/          # API services
│   └── package.json
├── backend/                    # API Backend
│   ├── src/
│   │   ├── controllers/       # Lógica de negocio
│   │   ├── models/            # Modelos de MongoDB
│   │   ├── routes/            # Definición de rutas
│   │   ├── middleware/        # Auth, uploads, etc.
│   │   ├── config/            # Configuración DB
│   │   ├── server.ts          # Servidor Express
│   │   └── seed.ts            # Datos iniciales
│   └── uploads/               # Archivos subidos
├── package.json               # Deps de la landing
└── README.md
```

## 🔑 Acceso al Admin Panel

1. Ir a http://localhost:5174
2. Login con:
   - **Email**: `admin@blancosuenos.com`
   - **Password**: `admin123`

## 🛠️ Comandos Útiles

### Backend

```bash
cd backend

npm run dev          # Modo desarrollo con nodemon
npm run build        # Compilar TypeScript
npm start            # Ejecutar versión compilada
npm run seed         # Re-ejecutar seed (resetea DB)
```

### Landing

```bash
npm run dev          # Modo desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
```

### Admin

```bash
cd admin

npm run dev          # Modo desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
```

## 📝 Workflows de Desarrollo

### Agregar una Nueva Cabaña

1. Ir a http://localhost:5174/cabanas
2. Click en "Agregar Cabaña"
3. Completar formulario y subir imágenes
4. Verificar en http://localhost:5173/cabanas

### Modificar Hero (Carrusel Principal)

1. Ir a http://localhost:5174/hero
2. Editar título, subtítulo, descripción
3. Agregar/eliminar imágenes del carrusel
4. Verificar cambios en http://localhost:5173

### Agregar Actividad

1. Ir a http://localhost:5174/actividades
2. Crear nueva actividad
3. Seleccionar categoría (Actividades/Excursiones/Entre Nosotras)
4. Verificar en http://localhost:5173/actividades

### Gestionar Galería

1. Ir a http://localhost:5174/galeria
2. Subir imágenes o videos
3. Asignar categoría (Cabañas/Naturaleza)
4. Click en videos para preview
5. Verificar en http://localhost:5173/galeria

## 🔍 Debugging

### El backend no arranca

```bash
# Verificar que MongoDB esté corriendo
# Windows:
services.msc  # Buscar "MongoDB Server" debe estar "Running"

# Mac/Linux:
sudo systemctl status mongod
```

### Puerto en uso

```bash
# Windows - Matar proceso en puerto 5000
netstat -ano | findstr :5000
taskkill /PID [número] /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Las reseñas de Google no cargan

Verificar en `backend/.env`:
- `GOOGLE_PLACES_API_KEY` está configurada
- `GOOGLE_PLACE_ID` es correcto
- API de Google Places está habilitada en Google Cloud Console

### Las imágenes no se ven

1. Verificar que el backend esté corriendo
2. Verificar que `VITE_API_URL` esté configurado en `.env`
3. Las imágenes deben estar en `backend/uploads/img/` o `public/img/`
4. Los videos deben estar en `public/videos/`

## 🧪 Testing

### Probar Endpoints de la API

```bash
# Health check
curl http://localhost:5000/health

# Obtener hero
curl http://localhost:5000/api/hero

# Obtener cabañas
curl http://localhost:5000/api/cabanas

# Obtener reseñas de Google
curl http://localhost:5000/api/google-reviews
```

## 📚 Tecnologías Utilizadas

### Frontend (Landing + Admin)
- **React** 18.3.1
- **TypeScript** 5.6.2
- **Vite** 6.0.7
- **TailwindCSS** 3.4.0
- **React Router** 7.11.0
- **React Query** 5.62.11
- **Axios** - HTTP client

### Backend
- **Node.js** + **Express** 4.21.2
- **TypeScript** 5.x
- **MongoDB** + **Mongoose** 8.9.4
- **JWT** - Autenticación
- **Multer** - Upload de archivos
- **Sharp** - Procesamiento de imágenes
- **Axios** - Google Places API

## 🤝 Contribuir

### Workflow de Git

```bash
# Crear nueva rama para tu feature
git checkout -b feature/nombre-feature

# Hacer cambios y commits
git add .
git commit -m "feat: descripción del cambio"

# Push a GitHub
git push origin feature/nombre-feature

# Crear Pull Request en GitHub
```

### Convenciones de Commits

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `refactor:` Refactorización de código
- `style:` Cambios de estilo (CSS, formato)
- `docs:` Documentación
- `chore:` Tareas de mantenimiento

## 📞 Soporte

Si tienes problemas:

1. Revisar esta guía
2. Verificar que todos los servicios estén corriendo
3. Revisar logs en las terminales
4. Consultar `DEPLOYMENT.md` para deployment
5. Crear issue en GitHub

## ⚡ Tips de Productividad

- **VS Code Extensions recomendadas**:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - MongoDB for VS Code
  - Pretty TypeScript Errors
  - Error Lens

- **Hot Reload**: Los 3 servidores tienen hot reload, no necesitas reiniciar al hacer cambios

- **MongoDB Compass**: Usar MongoDB Compass para visualizar la base de datos
  - URI: `mongodb://localhost:27017`
  - Database: `blancosuenos`

---

**¡Listo para desarrollar! 🎉**

Si encuentras algún error en esta guía, por favor actualízala y haz commit.
