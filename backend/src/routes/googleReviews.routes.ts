import { Router } from 'express';
import { getGoogleReviews, getPlaceInfo } from '../controllers/googleReviews.controller';

const router = Router();

// Obtener reseñas de Google
router.get('/', getGoogleReviews);

// Obtener información del lugar
router.get('/place-info', getPlaceInfo);

export default router;
