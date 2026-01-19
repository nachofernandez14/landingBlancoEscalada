# 🏔️ Blancos Sueños de Escalada - Quick Start

## 🚀 Deployment Simplificado

Este proyecto ahora funciona con **un solo servidor** en lugar de tres.

### Desarrollo Local (3 servidores)

```bash
# Terminal 1 - Backend (puerto 5000)
npm run dev:backend

# Terminal 2 - Landing (puerto 5173)
npm run dev

# Terminal 3 - Admin (puerto 5174)
npm run dev:admin
```

### Producción (1 solo servidor)

```bash
# 1. Build todo
npm run build:all

# 2. Subir al VPS
rsync -avz --exclude 'node_modules' ./ usuario@vps:/var/www/blancosuenos/

# 3. En el VPS
cd /var/www/blancosuenos/backend
npm install --production
cp .env.production .env
npm run seed  # Solo la primera vez
pm2 start dist/server.js --name blancosuenos
```

### URLs en Producción

- **Landing**: `https://tudominio.com/`
- **Admin**: `https://tudominio.com/admin`
- **API**: `https://tudominio.com/api/*`

Todo desde el puerto 5000.

## 📖 Documentación Completa

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas.

## 🔑 Acceso Admin

Después del seed:
- Email: `admin@blancosuenos.com`
- Password: `admin123`

**⚠️ Cambia esto en producción!**
