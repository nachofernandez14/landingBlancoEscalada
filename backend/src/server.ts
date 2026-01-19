import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/database';

// Importar rutas
import authRoutes from './routes/auth.routes';
import heroRoutes from './routes/hero.routes';
import cabanaRoutes from './routes/cabana.routes';
import activityRoutes from './routes/activity.routes';
import reviewRoutes from './routes/review.routes';
import galleryRoutes from './routes/gallery.routes';
import configRoutes from './routes/config.routes';
import uploadRoutes from './routes/upload.routes';
import googleReviewsRoutes from './routes/googleReviews.routes';

// Configuración de variables de entorno
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());
app.use(morgan('dev'));
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    process.env.ADMIN_URL || 'http://localhost:5174'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (imágenes subidas)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// Servir también desde /img para compatibilidad con URLs antiguas
app.use('/img', express.static(path.join(__dirname, '../uploads/img')));
// Servir videos desde la carpeta public/videos
app.use('/videos', express.static(path.join(__dirname, '../../public/videos')));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/cabanas', cabanaRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/google-reviews', googleReviewsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/config', configRoutes);
app.use('/api/upload', uploadRoutes);

// Ruta de health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Servir frontend del admin en /admin
app.use('/admin', express.static(path.join(__dirname, '../../admin/dist')));
app.get('/admin/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../admin/dist/index.html'));
});

// Servir landing (frontend principal) en la raíz
app.use(express.static(path.join(__dirname, '../../dist')));
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 Modo: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
