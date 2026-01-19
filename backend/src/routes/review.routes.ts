import { Router } from 'express';
import {
  getAllReviews,
  getAllReviewsAdmin,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/review.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Rutas públicas
router.get('/', getAllReviews);

// Rutas protegidas (admin)
router.get('/admin/all', authMiddleware, getAllReviewsAdmin);
router.post('/', authMiddleware, createReview);
router.put('/:id', authMiddleware, updateReview);
router.delete('/:id', authMiddleware, deleteReview);

export default router;
