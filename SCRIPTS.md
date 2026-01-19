# Deployment Scripts

Scripts útiles para el deployment y mantenimiento del sistema.

## 🚀 Scripts Disponibles

### deploy.sh - Script de Deployment Completo

Script bash que automatiza todo el proceso de deployment.

```bash
#!/bin/bash

echo "🚀 Iniciando deployment de Blancos Sueños de Escalada..."

# Actualizar código
echo "📥 Pulling latest code..."
git pull origin main

# Backend
echo "🔧 Building backend..."
cd backend
npm install --production
npm run build
pm2 restart blancosuenos-api
cd ..

# Admin
echo "🎨 Building admin panel..."
cd admin
npm install --production
npm run build
cd ..

# Landing Page
echo "🌐 Building landing page..."
npm install --production
npm run build

# Reload Nginx
echo "♻️  Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ Deployment completed successfully!"
echo "🌐 Landing: https://blancosuenos.com"
echo "🔧 Admin: https://admin.blancosuenos.com"
echo "🔌 API: https://api.blancosuenos.com"
```

### Uso

```bash
chmod +x deploy.sh
./deploy.sh
```

---

### backup.sh - Backup de MongoDB

```bash
#!/bin/bash

BACKUP_DIR="/backup/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)

echo "💾 Creating MongoDB backup..."

mkdir -p $BACKUP_DIR

mongodump --db blancosuenos --out $BACKUP_DIR/$DATE

echo "✅ Backup created at: $BACKUP_DIR/$DATE"

# Mantener solo los últimos 7 backups
cd $BACKUP_DIR
ls -t | tail -n +8 | xargs -r rm -rf

echo "🧹 Old backups cleaned up"
```

### Uso

```bash
chmod +x backup.sh
./backup.sh

# Programar backup diario con cron
crontab -e
# Agregar: 0 2 * * * /var/www/blancosuenos/backup.sh
```

---

### logs.sh - Ver logs del sistema

```bash
#!/bin/bash

echo "📊 Logs del sistema Blancos Sueños de Escalada"
echo "==============================================="
echo ""
echo "Seleccione qué logs ver:"
echo "1) Backend API (PM2)"
echo "2) Nginx Access Log"
echo "3) Nginx Error Log"
echo "4) MongoDB Log"
echo "5) Todos"
echo ""
read -p "Opción: " option

case $option in
  1)
    pm2 logs blancosuenos-api --lines 50
    ;;
  2)
    sudo tail -f /var/log/nginx/access.log
    ;;
  3)
    sudo tail -f /var/log/nginx/error.log
    ;;
  4)
    sudo tail -f /var/log/mongodb/mongod.log
    ;;
  5)
    echo "=== PM2 Logs ==="
    pm2 logs blancosuenos-api --lines 20
    echo ""
    echo "=== Nginx Error Log ==="
    sudo tail -20 /var/log/nginx/error.log
    ;;
  *)
    echo "Opción inválida"
    ;;
esac
```

### Uso

```bash
chmod +x logs.sh
./logs.sh
```

---

### status.sh - Estado del sistema

```bash
#!/bin/bash

echo "📊 Estado del sistema Blancos Sueños de Escalada"
echo "================================================"
echo ""

echo "🔧 Backend API (PM2):"
pm2 status blancosuenos-api
echo ""

echo "🌐 Nginx:"
sudo systemctl status nginx --no-pager
echo ""

echo "💾 MongoDB:"
sudo systemctl status mongod --no-pager
echo ""

echo "💽 Espacio en disco:"
df -h /
echo ""

echo "🔥 Firewall (UFW):"
sudo ufw status
echo ""

echo "🌍 URLs del sistema:"
echo "  Landing: https://blancosuenos.com"
echo "  Admin: https://admin.blancosuenos.com"
echo "  API: https://api.blancosuenos.com"
```

### Uso

```bash
chmod +x status.sh
./status.sh
```

---

### restore.sh - Restaurar backup de MongoDB

```bash
#!/bin/bash

BACKUP_DIR="/backup/mongodb"

echo "📥 Restore de MongoDB"
echo "===================="
echo ""
echo "Backups disponibles:"
ls -lt $BACKUP_DIR | head -10
echo ""
read -p "Ingrese el nombre del backup (ej: 20240114_153000): " backup_name

if [ -d "$BACKUP_DIR/$backup_name" ]; then
    echo "⚠️  ADVERTENCIA: Esto sobrescribirá la base de datos actual."
    read -p "¿Continuar? (yes/no): " confirm
    
    if [ "$confirm" = "yes" ]; then
        echo "📥 Restaurando backup..."
        mongorestore --db blancosuenos --drop $BACKUP_DIR/$backup_name/blancosuenos
        echo "✅ Restore completado"
        
        # Reiniciar API para reconectar
        pm2 restart blancosuenos-api
        echo "♻️  API reiniciada"
    else
        echo "❌ Restore cancelado"
    fi
else
    echo "❌ Backup no encontrado"
fi
```

### Uso

```bash
chmod +x restore.sh
./restore.sh
```

---

### update-ssl.sh - Renovar certificados SSL

```bash
#!/bin/bash

echo "🔒 Renovando certificados SSL..."

sudo certbot renew --nginx

echo "✅ Certificados renovados"

# Reload Nginx
sudo systemctl reload nginx

echo "♻️  Nginx recargado"
```

### Uso

```bash
chmod +x update-ssl.sh
./update-ssl.sh

# Programar renovación automática (mensual)
crontab -e
# Agregar: 0 0 1 * * /var/www/blancosuenos/update-ssl.sh
```

---

## 📦 Crear todos los scripts

```bash
cd /var/www/blancosuenos

# Crear directorio de scripts
mkdir -p scripts
cd scripts

# Crear los scripts (copiar contenido de arriba)
nano deploy.sh
nano backup.sh
nano logs.sh
nano status.sh
nano restore.sh
nano update-ssl.sh

# Dar permisos de ejecución
chmod +x *.sh

# Volver al directorio raíz
cd ..
```

## 🔄 Tareas automatizadas con Cron

```bash
# Editar crontab
crontab -e

# Agregar estas líneas:

# Backup diario a las 2 AM
0 2 * * * /var/www/blancosuenos/scripts/backup.sh

# Renovar SSL mensualmente
0 0 1 * * /var/www/blancosuenos/scripts/update-ssl.sh

# Reiniciar PM2 semanalmente (domingo 3 AM)
0 3 * * 0 pm2 restart blancosuenos-api
```

## 📊 Monitoreo

### PM2 Monit en tiempo real

```bash
pm2 monit
```

### Ver métricas del servidor

```bash
# CPU y memoria
htop

# Espacio en disco
df -h

# Procesos de Node
ps aux | grep node

# Conexiones activas
netstat -tuln | grep :5000
```

## 🔧 Troubleshooting

### Backend no responde

```bash
pm2 logs blancosuenos-api
pm2 restart blancosuenos-api
```

### Nginx error 502

```bash
# Ver logs
sudo tail -f /var/log/nginx/error.log

# Verificar que el backend esté corriendo
pm2 status

# Reiniciar todo
pm2 restart all
sudo systemctl restart nginx
```

### MongoDB problemas

```bash
sudo systemctl status mongod
sudo systemctl restart mongod
sudo tail -f /var/log/mongodb/mongod.log
```

### Espacio en disco lleno

```bash
# Limpiar logs antiguos de PM2
pm2 flush

# Limpiar logs de Nginx
sudo truncate -s 0 /var/log/nginx/*.log

# Limpiar backups antiguos
cd /backup/mongodb
ls -t | tail -n +8 | xargs rm -rf
```

---

## 📝 Notas

- Todos los scripts deben ejecutarse desde `/var/www/blancosuenos`
- Asegurarse de tener permisos adecuados (sudo cuando sea necesario)
- Los backups se almacenan en `/backup/mongodb`
- Los logs de PM2 están en `backend/logs/`
