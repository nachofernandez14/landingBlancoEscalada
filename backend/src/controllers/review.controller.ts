import { Request, Response } from 'express';
import Review from '../models/Review';

export const getAllReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({ active: true }).sort({ order: 1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error obteniendo reseñas:', error);
    res.status(500).json({ message: 'Error al obtener reseñas' });
  }
};

export const getAllReviewsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find().sort({ order: 1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error obteniendo reseñas:', error);
    res.status(500).json({ message: 'Error al obtener reseñas' });
  }
};

export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creando reseña:', error);
    res.status(500).json({ message: 'Error al crear reseña' });
  }
};

export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!review) {
      res.status(404).json({ message: 'Reseña no encontrada' });
      return;
    }
    
    res.json(review);
  } catch (error) {
    console.error('Error actualizando reseña:', error);
    res.status(500).json({ message: 'Error al actualizar reseña' });
  }
};

export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    
    if (!review) {
      res.status(404).json({ message: 'Reseña no encontrada' });
      return;
    }
    
    res.json({ message: 'Reseña eliminada exitosamente' });
  } catch (error) {
    console.error('Error eliminando reseña:', error);
    res.status(500).json({ message: 'Error al eliminar reseña' });
  }
};
