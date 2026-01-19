import { Router } from 'express';
import { uploadImage, deleteFile } from '../controllers/upload.controller';
import { upload } from '../middleware/upload';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, upload.single('file'), uploadImage);
router.delete('/:filename', authMiddleware, deleteFile);

export default router;
