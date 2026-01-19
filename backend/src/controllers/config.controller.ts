import { Request, Response } from 'express';
import Config from '../models/Config';

export const getConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    let config = await Config.findOne();
    
    // Si no existe, crear una configuración por defecto
    if (!config) {
      config = new Config({});
      await config.save();
    }
    
    res.json(config);
  } catch (error) {
    console.error('Error obteniendo configuración:', error);
    res.status(500).json({ message: 'Error al obtener configuración' });
  }
};

export const updateConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    let config = await Config.findOne();
    
    if (!config) {
      config = new Config(req.body);
    } else {
      Object.assign(config, req.body);
    }
    
    await config.save();
    res.json(config);
  } catch (error) {
    console.error('Error actualizando configuración:', error);
    res.status(500).json({ message: 'Error al actualizar configuración' });
  }
};
