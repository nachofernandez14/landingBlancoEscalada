import { Request, Response } from 'express';
import Cabana from '../models/Cabana';

export const getAllCabanas = async (req: Request, res: Response): Promise<void> => {
  try {
    const cabanas = await Cabana.find({ active: true }).sort({ order: 1 });
    res.json(cabanas);
  } catch (error) {
    console.error('Error obteniendo cabañas:', error);
    res.status(500).json({ message: 'Error al obtener cabañas' });
  }
};

export const getAllCabanasAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const cabanas = await Cabana.find().sort({ order: 1 });
    res.json(cabanas);
  } catch (error) {
    console.error('Error obteniendo cabañas:', error);
    res.status(500).json({ message: 'Error al obtener cabañas' });
  }
};

export const getCabanaBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const cabana = await Cabana.findOne({ slug: req.params.slug, active: true });
    if (!cabana) {
      res.status(404).json({ message: 'Cabaña no encontrada' });
      return;
    }
    res.json(cabana);
  } catch (error) {
    console.error('Error obteniendo cabaña:', error);
    res.status(500).json({ message: 'Error al obtener cabaña' });
  }
};

export const createCabana = async (req: Request, res: Response): Promise<void> => {
  try {
    const cabana = new Cabana(req.body);
    await cabana.save();
    res.status(201).json(cabana);
  } catch (error) {
    console.error('Error creando cabaña:', error);
    res.status(500).json({ message: 'Error al crear cabaña' });
  }
};

export const updateCabana = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('📝 Update request body:', req.body);
    
    // Parsear campos JSON si vienen como strings desde FormData
    const updateData: any = { ...req.body };
    
    if (typeof updateData.amenities === 'string') {
      updateData.amenities = JSON.parse(updateData.amenities);
    }
    
    if (typeof updateData.existingImages === 'string') {
      updateData.images = JSON.parse(updateData.existingImages);
      delete updateData.existingImages;
    }
    
    // Asegurar que mainImage se establezca
    if (!updateData.mainImage && updateData.images && updateData.images.length > 0) {
      updateData.mainImage = updateData.images[0];
    }
    
    console.log('📝 Processed update data:', updateData);
    
    const cabana = await Cabana.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!cabana) {
      res.status(404).json({ message: 'Cabaña no encontrada' });
      return;
    }
    
    console.log('✅ Updated cabana:', cabana);
    res.json(cabana);
  } catch (error) {
    console.error('❌ Error actualizando cabaña:', error);
    res.status(500).json({ message: 'Error al actualizar cabaña' });
  }
};

export const deleteCabana = async (req: Request, res: Response): Promise<void> => {
  try {
    const cabana = await Cabana.findByIdAndDelete(req.params.id);
    
    if (!cabana) {
      res.status(404).json({ message: 'Cabaña no encontrada' });
      return;
    }
    
    res.json({ message: 'Cabaña eliminada exitosamente' });
  } catch (error) {
    console.error('Error eliminando cabaña:', error);
    res.status(500).json({ message: 'Error al eliminar cabaña' });
  }
};
