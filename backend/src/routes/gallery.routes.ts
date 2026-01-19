import { Router } from 'express';
import {
  getAllGalleryItems,
  getAllGalleryItemsAdmin,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from '../controllers/gallery.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Rutas públicas
router.get('/', getAllGalleryItems);

// Rutas protegidas (admin)
router.get('/admin/all', authMiddleware, getAllGalleryItemsAdmin);
router.post('/', authMiddleware, createGalleryItem);
router.put('/:id', authMiddleware, updateGalleryItem);
router.delete('/:id', authMiddleware, deleteGalleryItem);

export default router;
