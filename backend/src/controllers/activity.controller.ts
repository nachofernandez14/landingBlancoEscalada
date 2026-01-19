import { Request, Response } from 'express';
import Activity from '../models/Activity';

export const getAllActivities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const filter: any = { active: true };
    
    if (category) {
      filter.category = category;
    }
    
    const activities = await Activity.find(filter).sort({ order: 1 });
    res.json(activities);
  } catch (error) {
    console.error('Error obteniendo actividades:', error);
    res.status(500).json({ message: 'Error al obtener actividades' });
  }
};

export const getAllActivitiesAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const activities = await Activity.find().sort({ order: 1 });
    res.json(activities);
  } catch (error) {
    console.error('Error obteniendo actividades:', error);
    res.status(500).json({ message: 'Error al obtener actividades' });
  }
};

export const createActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.error('Error creando actividad:', error);
    res.status(500).json({ message: 'Error al crear actividad' });
  }
};

export const updateActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!activity) {
      res.status(404).json({ message: 'Actividad no encontrada' });
      return;
    }
    
    res.json(activity);
  } catch (error) {
    console.error('Error actualizando actividad:', error);
    res.status(500).json({ message: 'Error al actualizar actividad' });
  }
};

export const deleteActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    
    if (!activity) {
      res.status(404).json({ message: 'Actividad no encontrada' });
      return;
    }
    
    res.json({ message: 'Actividad eliminada exitosamente' });
  } catch (error) {
    console.error('Error eliminando actividad:', error);
    res.status(500).json({ message: 'Error al eliminar actividad' });
  }
};
