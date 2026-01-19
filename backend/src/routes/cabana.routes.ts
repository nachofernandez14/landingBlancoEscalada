import { Router } from 'express';
import {
  getAllCabanas,
  getAllCabanasAdmin,
  getCabanaBySlug,
  createCabana,
  updateCabana,
  deleteCabana
} from '../controllers/cabana.controller';
import { authMiddleware } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// Rutas públicas
router.get('/', getAllCabanas);
router.get('/:slug', getCabanaBySlug);

// Rutas protegidas (admin)
router.get('/admin/all', authMiddleware, getAllCabanasAdmin);
router.post('/', authMiddleware, upload.array('images', 20), createCabana);
router.put('/:id', authMiddleware, upload.array('images', 20), updateCabana);
router.delete('/:id', authMiddleware, deleteCabana);

export default router;
