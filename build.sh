#!/bin/bash

# Script de deployment para Blancos Sueños de Escalada
# Este script construye y despliega todo el proyecto

echo "🚀 Iniciando proceso de build..."

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Build Landing
echo -e "${BLUE}📦 Building Landing...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Landing built successfully${NC}"
else
    echo "❌ Error building landing"
    exit 1
fi

# 2. Build Admin
echo -e "${BLUE}📦 Building Admin...${NC}"
npm run build:admin
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Admin built successfully${NC}"
else
    echo "❌ Error building admin"
    exit 1
fi

# 3. Build Backend
echo -e "${BLUE}📦 Building Backend...${NC}"
cd backend
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend built successfully${NC}"
else
    echo "❌ Error building backend"
    exit 1
fi
cd ..

echo -e "${GREEN}✅ Build completo!${NC}"
echo ""
echo "📂 Archivos generados:"
echo "  - dist/           (Landing)"
echo "  - admin/dist/     (Admin Panel)"
echo "  - backend/dist/   (Backend)"
echo ""
echo "📤 Siguiente paso: Subir al VPS"
echo "rsync -avz --exclude 'node_modules' ./ usuario@vps:/var/www/blancosuenos/"
