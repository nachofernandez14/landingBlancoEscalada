import { Request, Response } from 'express';
import { upload } from '../middleware/upload';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No se proporcionó ningún archivo' });
      return;
    }

    const filePath = req.file.path;
    const fileName = req.file.filename;
    
    // Si es una imagen, optimizarla con sharp
    if (req.file.mimetype.startsWith('image/')) {
      const optimizedPath = path.join(path.dirname(filePath), 'optimized-' + fileName);
      
      await sharp(filePath)
        .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toFile(optimizedPath);
      
      // Reemplazar el archivo original con el optimizado
      fs.unlinkSync(filePath);
      fs.renameSync(optimizedPath, filePath);
    }

    const fileUrl = `/uploads/${fileName}`;
    res.json({ url: fileUrl, filename: fileName });
  } catch (error) {
    console.error('Error subiendo archivo:', error);
    res.status(500).json({ message: 'Error al subir archivo' });
  }
};

export const deleteFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../../uploads', filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: 'Archivo eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Archivo no encontrado' });
    }
  } catch (error) {
    console.error('Error eliminando archivo:', error);
    res.status(500).json({ message: 'Error al eliminar archivo' });
  }
};
