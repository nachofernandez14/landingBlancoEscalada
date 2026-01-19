# 🚀 Guía Rápida de Inicio - Sistema CMS Blancos Sueños

Este documento te guiará paso a paso para iniciar el sistema completo.

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- ✅ Node.js (v18 o superior)
- ✅ MongoDB (ejecutándose localmente o conexión remota)
- ✅ Git

## 🎯 Pasos de Inicio

### 1️⃣ Backend (API)

```bash
# Navegar a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Editar .env y configurar tu conexión a MongoDB
# MONGODB_URI=mongodb://localhost:27017/blancos-suenos
# JWT_SECRET=tu-secreto-super-seguro-aqui
# PORT=5000

# Inicializar base de datos con datos de prueba
npm run seed

# Iniciar servidor de desarrollo
npm run dev
```

El backend estará disponible en: `http://localhost:5000`

### 2️⃣ Panel Admin (CMS)

Abre una **nueva terminal** y ejecuta:

```bash
# Navegar a la carpeta del admin
cd admin

# Instalar dependencias
npm install

# El archivo .env ya debería existir con:
# VITE_API_URL=http://localhost:5000

# Iniciar servidor de desarrollo
npm run dev
```

El panel admin estará disponible en: `http://localhost:5174`

### 3️⃣ Acceder al Panel

1. Abre tu navegador en: `http://localhost:5174`
2. Inicia sesión con las credenciales:
   - **Email**: `admin@blancosuenos.com`
   - **Password**: `admin123`

## ✨ ¡Listo para usar!

Ahora puedes:

- 🎨 Editar el Hero Section
- 🏠 Crear y gestionar Cabañas
- 🎯 Administrar Actividades
- ⭐ Gestionar Reseñas
- 🖼️ Organizar la Galería
- ⚙️ Configurar información del sitio

## 🔍 Verificación Rápida

Para verificar que todo funciona correctamente:

1. **Backend**: Abre `http://localhost:5000/api/health` (debería responder OK)
2. **Admin**: Abre `http://localhost:5174` (debería cargar el login)
3. **Base de datos**: Verifica que MongoDB esté ejecutándose

## 🆘 Problemas Comunes

### Backend no inicia
- ✅ Verifica que MongoDB esté ejecutándose
- ✅ Revisa el archivo `.env` en la carpeta `backend`
- ✅ Ejecuta `npm install` nuevamente

### Admin no se conecta al backend
- ✅ Verifica que el backend esté ejecutándose en puerto 5000
- ✅ Revisa el archivo `.env` en la carpeta `admin`
- ✅ Limpia cache del navegador

### Error al iniciar sesión
- ✅ Asegúrate de haber ejecutado `npm run seed` en el backend
- ✅ Verifica las credenciales: admin@blancosuenos.com / admin123

## 📊 Estructura del Sistema

```
landingBlancoEscalada-development/
├── backend/              # API REST + MongoDB
│   ├── src/
│   ├── uploads/          # Imágenes subidas (se crea automáticamente)
│   └── package.json
│
├── admin/                # Panel CMS
│   ├── src/
│   └── package.json
│
└── src/                  # Landing Page (próximo paso)
```

## 🔄 Próximos Pasos

Una vez que el CMS esté funcionando:

1. **Agregar contenido**: Usa el panel admin para crear cabañas, actividades, etc.
2. **Adaptar landing**: Modificar la landing para consumir datos de la API
3. **Probar**: Verificar que todo funcione correctamente
4. **Deployment**: Preparar para subir al servidor VPS

## 💡 Consejos

- Mantén ambas terminales abiertas (backend y admin)
- El backend tiene hot-reload, no necesitas reiniciarlo al hacer cambios
- El admin también recarga automáticamente con Vite
- Las imágenes se guardan en `backend/uploads/`

---

**¿Necesitas ayuda?** Revisa los archivos README.md en cada carpeta para más detalles.
