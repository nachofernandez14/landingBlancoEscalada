import { Request, Response } from 'express';
import GalleryItem from '../models/GalleryItem';

export const getAllGalleryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const filter: any = { active: true };
    
    if (category && category !== 'todas') {
      filter.category = category;
    }
    
    const items = await GalleryItem.find(filter).sort({ order: 1 });
    res.json(items);
  } catch (error) {
    console.error('Error obteniendo items de galería:', error);
    res.status(500).json({ message: 'Error al obtener items de galería' });
  }
};

export const getAllGalleryItemsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await GalleryItem.find().sort({ order: 1 });
    res.json(items);
  } catch (error) {
    console.error('Error obteniendo items de galería:', error);
    res.status(500).json({ message: 'Error al obtener items de galería' });
  }
};

export const createGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = new GalleryItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creando item de galería:', error);
    res.status(500).json({ message: 'Error al crear item de galería' });
  }
};

export const updateGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!item) {
      res.status(404).json({ message: 'Item no encontrado' });
      return;
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error actualizando item de galería:', error);
    res.status(500).json({ message: 'Error al actualizar item de galería' });
  }
};

export const deleteGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);
    
    if (!item) {
      res.status(404).json({ message: 'Item no encontrado' });
      return;
    }
    
    res.json({ message: 'Item eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando item de galería:', error);
    res.status(500).json({ message: 'Error al eliminar item de galería' });
  }
};
