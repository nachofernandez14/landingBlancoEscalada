import { Router } from 'express';
import {
  getAllActivities,
  getAllActivitiesAdmin,
  createActivity,
  updateActivity,
  deleteActivity
} from '../controllers/activity.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Rutas públicas
router.get('/', getAllActivities);

// Rutas protegidas (admin)
router.get('/admin/all', authMiddleware, getAllActivitiesAdmin);
router.post('/', authMiddleware, createActivity);
router.put('/:id', authMiddleware, updateActivity);
router.delete('/:id', authMiddleware, deleteActivity);

export default router;
