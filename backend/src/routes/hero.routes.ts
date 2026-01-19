import { Router } from 'express';
import { getHero, updateHero } from '../controllers/hero.controller';
import { authMiddleware } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getHero);
router.put('/', authMiddleware, upload.array('images', 10), updateHero);

export default router;
