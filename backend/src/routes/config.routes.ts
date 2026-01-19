import { Router } from 'express';
import { getConfig, updateConfig } from '../controllers/config.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', getConfig);
router.put('/', authMiddleware, updateConfig);

export default router;
