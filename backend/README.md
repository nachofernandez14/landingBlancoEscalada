# Backend API - Blancos Sueños de Escalada

Backend API REST para el CMS de la landing page Blancos Sueños de Escalada.

## 🚀 Tecnologías

- **Node.js** + **Express** + **TypeScript**
- **MongoDB** + **Mongoose**
- **JWT** para autenticación
- **Multer** + **Sharp** para manejo de imágenes
- **Bcrypt** para encriptación de contraseñas

## 📋 Requisitos previos

- Node.js 18+ 
- MongoDB 5+
- npm o yarn

## 🔧 Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   
   Editar `.env` con tus configuraciones:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blancosuenos
   JWT_SECRET=tu_clave_secreta_cambiar_en_produccion
   ```

3. **Inicializar la base de datos con datos de ejemplo:**
   ```bash
   npm run seed
   ```
   
   Esto creará:
   - Usuario admin: `admin@blancosuenos.com` / `admin123`
   - Cabañas de ejemplo
   - Actividades
   - Reseñas
   - Configuración inicial

## 🎯 Scripts disponibles

```bash
# Desarrollo (con hot reload)
npm run dev

# Build de producción
npm run build

# Ejecutar en producción
npm run start

# Build y ejecución
npm run prod

# Inicializar BD
npm run seed
```

## 📡 Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Obtener usuario actual (requiere auth)

### Hero Section
- `GET /api/hero` - Obtener hero (público)
- `PUT /api/hero` - Actualizar hero (requiere auth)

### Cabañas
- `GET /api/cabanas` - Listar cabañas activas (público)
- `GET /api/cabanas/:slug` - Obtener cabaña por slug (público)
- `GET /api/cabanas/admin/all` - Listar todas (requiere auth)
- `POST /api/cabanas` - Crear cabaña (requiere auth)
- `PUT /api/cabanas/:id` - Actualizar cabaña (requiere auth)
- `DELETE /api/cabanas/:id` - Eliminar cabaña (requiere auth)

### Actividades
- `GET /api/activities?category=activity|excursion|entreNosotras` - Listar (público)
- `GET /api/activities/admin/all` - Listar todas (requiere auth)
- `POST /api/activities` - Crear (requiere auth)
- `PUT /api/activities/:id` - Actualizar (requiere auth)
- `DELETE /api/activities/:id` - Eliminar (requiere auth)

### Reseñas
- `GET /api/reviews` - Listar reseñas activas (público)
- `GET /api/reviews/admin/all` - Listar todas (requiere auth)
- `POST /api/reviews` - Crear (requiere auth)
- `PUT /api/reviews/:id` - Actualizar (requiere auth)
- `DELETE /api/reviews/:id` - Eliminar (requiere auth)

### Galería
- `GET /api/gallery?category=todas|cabañas|naturaleza` - Listar (público)
- `GET /api/gallery/admin/all` - Listar todas (requiere auth)
- `POST /api/gallery` - Crear item (requiere auth)
- `PUT /api/gallery/:id` - Actualizar item (requiere auth)
- `DELETE /api/gallery/:id` - Eliminar item (requiere auth)

### Configuración
- `GET /api/config` - Obtener configuración (público)
- `PUT /api/config` - Actualizar configuración (requiere auth)

### Upload
- `POST /api/upload` - Subir archivo (requiere auth)
- `DELETE /api/upload/:filename` - Eliminar archivo (requiere auth)

### Health Check
- `GET /health` - Estado del servidor

## 🔐 Autenticación

Todas las rutas protegidas requieren un header de autorización:

```
Authorization: Bearer <token>
```

## 📁 Estructura del proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── hero.controller.ts
│   │   ├── cabana.controller.ts
│   │   ├── activity.controller.ts
│   │   ├── review.controller.ts
│   │   ├── gallery.controller.ts
│   │   ├── config.controller.ts
│   │   └── upload.controller.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── upload.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Hero.ts
│   │   ├── Cabana.ts
│   │   ├── Activity.ts
│   │   ├── Review.ts
│   │   ├── GalleryItem.ts
│   │   └── Config.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── hero.routes.ts
│   │   ├── cabana.routes.ts
│   │   ├── activity.routes.ts
│   │   ├── review.routes.ts
│   │   ├── gallery.routes.ts
│   │   ├── config.routes.ts
│   │   └── upload.routes.ts
│   ├── seed.ts
│   └── server.ts
├── uploads/
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

## 🚀 Deployment en VPS

1. **Instalar dependencias del sistema:**
   ```bash
   # Instalar Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Instalar MongoDB
   # Ver: https://www.mongodb.com/docs/manual/installation/
   ```

2. **Clonar y configurar:**
   ```bash
   cd /var/www
   git clone <tu-repositorio>
   cd backend
   npm install
   cp .env.example .env
   # Editar .env con configuración de producción
   ```

3. **Instalar PM2:**
   ```bash
   sudo npm install -g pm2
   ```

4. **Iniciar con PM2:**
   ```bash
   npm run build
   pm2 start dist/server.js --name blancosuenos-api
   pm2 save
   pm2 startup
   ```

5. **Configurar Nginx como reverse proxy:**
   ```nginx
   server {
       listen 80;
       server_name api.tudominio.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Instalar certificado SSL:**
   ```bash
   sudo certbot --nginx -d api.tudominio.com
   ```

## 📝 Notas

- Cambiar `JWT_SECRET` en producción
- Configurar límites de CORS según dominios en producción
- Ajustar `MAX_FILE_SIZE` según necesidades
- Configurar backups de MongoDB
