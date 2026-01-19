# 🚀 Guía de Deployment - Blancos Sueños de Escalada

## ⚡ Sistema Unificado - Un Solo Servidor

Este proyecto está configurado para servir **todo desde un único servidor** en el puerto 5000:
- **Landing** → `http://tudominio.com/`
- **Admin Panel** → `http://tudominio.com/admin`
- **API** → `http://tudominio.com/api/*`

## 📋 Arquitectura del Sistema

```
VPS (Tu Servidor) - Puerto 5000
├── /                           # Landing Page (Frontend estático)
├── /admin                      # Panel CMS (React SPA)
├── /api/*                      # Backend API (Express)
├── /uploads                    # Archivos subidos
├── /img                        # Imágenes
└── /videos                     # Videos
```

**Ventaja**: Solo necesitas levantar 1 proceso en lugar de 3.

## 🛠️ Requisitos del Servidor

- **OS**: Ubuntu 20.04+ / Debian 11+
- **Node.js**: v18+
- **MongoDB**: v5+
- **Nginx**: última versión
- **PM2**: gestor de procesos Node.js
- **Certbot**: para certificados SSL

## 📦 Paso 1: Preparar el Servidor

### 1.1 Actualizar el sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Instalar Node.js 18+

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node -v  # Verificar instalación
npm -v
```

### 1.3 Instalar MongoDB

```bash
# Importar clave GPG
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Agregar repositorio
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Instalar
sudo apt update
sudo apt install -y mongodb-org

# Iniciar y habilitar
sudo systemctl start mongod
sudo systemctl enable mongod
sudo systemctl status mongod
```

### 1.4 Instalar Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 1.5 Instalar PM2

```bash
sudo npm install -g pm2
```

### 1.6 Instalar Certbot (SSL)

```bash
sudo apt install -y certbot python3-certbot-nginx
```

## 📁 Paso 2: Preparación Local (En tu PC)

### 2.1 Instalar dependencias

```bash
# En la raíz del proyecto
npm install
cd admin && npm install
cd ../backend && npm install
cd ..
```

### 2.2 Construir todo el proyecto

```bash
npm run build:all
```

Esto generará:
- `dist/` - Landing page compilada
- `admin/dist/` - Admin panel compilado
- `backend/dist/` - Backend TypeScript compilado

### 2.3 Configurar variables de entorno de producción

Edita `backend/.env.production`:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blancosuenos

# JWT - CAMBIAR ESTE SECRET POR UNO SEGURO
JWT_SECRET=genera_un_jwt_secret_muy_largo_y_aleatorio_aqui

# URLs de tu dominio
FRONTEND_URL=http://tudominio.com
ADMIN_URL=http://tudominio.com/admin
```

## 📤 Paso 3: Subir al VPS

### 3.1 Crear directorio en el VPS

```bash
# Conectar por SSH
ssh usuario@tu-vps

# Crear directorio
sudo mkdir -p /var/www/blancosuenos
sudo chown -R $USER:$USER /var/www/blancosuenos
```

### 3.2 Subir archivos

Desde tu PC, sube los archivos necesarios:

```bash
# Opción 1: rsync (recomendado)
rsync -avz --exclude 'node_modules' --exclude '.git' \
  ./ usuario@tu-vps:/var/www/blancosuenos/

# Opción 2: scp
scp -r dist/ usuario@tu-vps:/var/www/blancosuenos/
scp -r admin/dist/ usuario@tu-vps:/var/www/blancosuenos/admin/
scp -r backend/ usuario@tu-vps:/var/www/blancosuenos/backend/
scp -r public/ usuario@tu-vps:/var/www/blancosuenos/public/
```

## 🔧 Paso 4: Configurar en el VPS

```bash
# Conectar al VPS
ssh usuario@tu-vps
cd /var/www/blancosuenos

# Instalar solo dependencias de producción del backend
cd backend
npm install --production

# Copiar .env de producción
cp .env.production .env

# Seed inicial de la base de datos (solo la primera vez)
npm run seed
```

## 🚀 Paso 5: Iniciar con PM2

```bash
cd /var/www/blancosuenos/backend

# Iniciar el servidor con PM2
pm2 start dist/server.js --name blancosuenos

# Guardar configuración de PM2
pm2 save

# Configurar PM2 para que inicie al arrancar el VPS
pm2 startup
# Ejecutar el comando que te muestra PM2

# Ver logs
pm2 logs blancosuenos

# Ver estado
pm2 status
```

**¡Listo!** Tu aplicación ahora está corriendo en `http://tu-ip:5000`

## 🌐 Paso 6: Configurar Nginx (Proxy Inverso)

Crear archivo de configuración de Nginx:

```bash
sudo nano /etc/nginx/sites-available/blancosuenos
```

Agregar:

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    # Aumentar límite de tamaño de archivos
    client_max_body_size 20M;

    # Proxy para la API y todo el sistema
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activar sitio:

```bash
# Crear enlace simbólico
sudo ln -s /etc/nginx/sites-available/blancosuenos /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

## 🔒 Paso 7: Configurar SSL con Certbot

```bash
# Obtener certificado SSL gratis
sudo certbot --nginx -d tudominio.com -d www.tudominio.com

# Seguir las instrucciones en pantalla

# Verificar renovación automática
sudo certbot renew --dry-run
```

## ✅ Verificación Final

Visita las siguientes URLs:

1. **Landing**: `https://tudominio.com` ✅
2. **Admin**: `https://tudominio.com/admin` ✅
3. **API Health**: `https://tudominio.com/health` ✅
4. **API Test**: `https://tudominio.com/api/hero` ✅

## 📝 Comandos Útiles

### PM2

```bash
# Ver logs en tiempo real
pm2 logs blancosuenos

# Reiniciar app
pm2 restart blancosuenos

# Detener app
pm2 stop blancosuenos

# Ver recursos usados
pm2 monit
```

### MongoDB

```bash
# Conectar a MongoDB
mongosh

# Usar base de datos
use blancosuenos

# Ver colecciones
show collections

# Backup
mongodump --db blancosuenos --out /backups/$(date +%Y%m%d)

# Restaurar
mongorestore --db blancosuenos /backups/20260119/blancosuenos
```

### Actualizaciones

Cuando hagas cambios en el código:

```bash
# En tu PC local
npm run build:all

# Subir al VPS
rsync -avz dist/ usuario@vps:/var/www/blancosuenos/dist/
rsync -avz admin/dist/ usuario@vps:/var/www/blancosuenos/admin/dist/
rsync -avz backend/dist/ usuario@vps:/var/www/blancosuenos/backend/dist/

# En el VPS
pm2 restart blancosuenos
```

## 🎯 Resumen

**Antes (3 servidores):**
```bash
Terminal 1: npm run dev:backend    # Puerto 5000
Terminal 2: npm run dev             # Puerto 5173
Terminal 3: npm run dev:admin       # Puerto 5174
```

**Ahora (1 servidor):**
```bash
pm2 start dist/server.js --name blancosuenos  # Solo puerto 5000
```

**URLs:**
- Landing: `/`
- Admin: `/admin`
- API: `/api/*`

Todo servido desde el mismo proceso Node.js en el puerto 5000.

# Configurar variables de entorno
cp .env.example .env
nano .env
```

Editar `.env`:
```env
VITE_API_URL=https://api.blancosuenos.com/api
```

```bash
# Build para producción
npm run build
```

## 🌐 Paso 5: Configurar Landing Page

```bash
cd /var/www/blancosuenos

# Instalar dependencias
npm install

# Build para producción
npm run build
```

## ⚙️ Paso 6: Configurar Nginx

### 6.1 Backend API

```bash
sudo nano /etc/nginx/sites-available/api.blancosuenos.com
```

Contenido:
```nginx
server {
    listen 80;
    server_name api.blancosuenos.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Servir archivos subidos
    location /uploads {
        alias /var/www/blancosuenos/backend/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### 6.2 Panel Admin

```bash
sudo nano /etc/nginx/sites-available/admin.blancosuenos.com
```

Contenido:
```nginx
server {
    listen 80;
    server_name admin.blancosuenos.com;
    root /var/www/blancosuenos/admin/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 6.3 Landing Page

```bash
sudo nano /etc/nginx/sites-available/blancosuenos.com
```

Contenido:
```nginx
server {
    listen 80;
    server_name blancosuenos.com www.blancosuenos.com;
    root /var/www/blancosuenos/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Servir archivos estáticos (imágenes, videos)
    location /img {
        alias /var/www/blancosuenos/public/img;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /videos {
        alias /var/www/blancosuenos/public/videos;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 6.4 Activar sitios

```bash
sudo ln -s /etc/nginx/sites-available/api.blancosuenos.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/admin.blancosuenos.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/blancosuenos.com /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Recargar Nginx
sudo systemctl reload nginx
```

## 🔒 Paso 7: Instalar Certificados SSL

```bash
sudo certbot --nginx -d blancosuenos.com -d www.blancosuenos.com
sudo certbot --nginx -d admin.blancosuenos.com
sudo certbot --nginx -d api.blancosuenos.com
```

Seguir las instrucciones en pantalla.

## 🌍 Paso 8: Configurar DNS

En tu proveedor de dominios (GoDaddy, Namecheap, etc.):

```
Tipo    Nombre      Valor
A       @           IP_DE_TU_VPS
A       www         IP_DE_TU_VPS
A       admin       IP_DE_TU_VPS
A       api         IP_DE_TU_VPS
```

## ✅ Paso 9: Verificar Instalación

```bash
# Verificar MongoDB
sudo systemctl status mongod

# Verificar PM2
pm2 list
pm2 logs blancosuenos-api

# Verificar Nginx
sudo systemctl status nginx
sudo nginx -t

# Ver logs
pm2 logs
sudo tail -f /var/log/nginx/error.log
```

Probar en navegador:
- `https://blancosuenos.com` → Landing Page
- `https://admin.blancosuenos.com` → Panel Admin
- `https://api.blancosuenos.com/health` → API Health Check

## 🔄 Actualizar el Sistema

### Actualizar código

```bash
cd /var/www/blancosuenos
git pull origin main

# Backend
cd backend
npm install
npm run build
pm2 restart blancosuenos-api

# Admin
cd ../admin
npm install
npm run build

# Landing
cd ..
npm install
npm run build

# Recargar Nginx
sudo systemctl reload nginx
```

## 📊 Monitoreo con PM2

```bash
# Ver estado
pm2 status

# Ver logs
pm2 logs blancosuenos-api

# Ver métricas
pm2 monit

# Reiniciar
pm2 restart blancosuenos-api

# Detener
pm2 stop blancosuenos-api

# Ver logs guardados
pm2 logs blancosuenos-api --lines 100
```

## 🔥 Firewall (UFW)

```bash
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw enable
sudo ufw status
```

## 📦 Backup de MongoDB

```bash
# Crear backup
mongodump --db blancosuenos --out /backup/mongodb/$(date +%Y%m%d)

# Restaurar backup
mongorestore --db blancosuenos /backup/mongodb/20240114/blancosuenos
```

## 🔧 Troubleshooting

### Backend no inicia
```bash
pm2 logs blancosuenos-api
# Verificar variables de entorno en .env
# Verificar que MongoDB esté corriendo
```

### Error 502 Bad Gateway
```bash
# Verificar que PM2 esté corriendo
pm2 status

# Verificar logs de Nginx
sudo tail -f /var/log/nginx/error.log
```

### MongoDB no conecta
```bash
sudo systemctl status mongod
sudo systemctl restart mongod
```

## 📝 Checklist de Deployment

- [ ] Node.js instalado
- [ ] MongoDB instalado y corriendo
- [ ] PM2 instalado
- [ ] Nginx instalado
- [ ] Código clonado en `/var/www/blancosuenos`
- [ ] Backend configurado y corriendo con PM2
- [ ] Admin buildeado
- [ ] Landing buildeada
- [ ] Nginx configurado para los 3 dominios
- [ ] Certificados SSL instalados
- [ ] DNS configurado
- [ ] Firewall configurado
- [ ] PM2 configurado para auto-inicio
- [ ] Backups de MongoDB programados

¡Listo! Tu sistema debería estar funcionando en producción. 🎉
