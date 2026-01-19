const fs = require('fs');
const path = require('path');

// Directorios
const sourceDir = path.join(__dirname, '..', 'public', 'img');
const targetDir = path.join(__dirname, 'uploads', 'img');

// Función para copiar recursivamente
function copyRecursive(src, dest) {
  // Crear directorio de destino si no existe
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Leer contenido del directorio fuente
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Copiar subdirectorio recursivamente
      copyRecursive(srcPath, destPath);
    } else {
      // Copiar archivo
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  console.log('📂 Copiando imágenes de public/img a backend/uploads/img...');
  copyRecursive(sourceDir, targetDir);
  console.log('✅ Imágenes copiadas exitosamente');
  console.log(`   Desde: ${sourceDir}`);
  console.log(`   Hacia: ${targetDir}`);
} catch (error) {
  console.error('❌ Error al copiar imágenes:', error.message);
  process.exit(1);
}
