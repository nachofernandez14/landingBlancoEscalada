import { Request, Response } from 'express';
import Hero from '../models/Hero';

export const getHero = async (req: Request, res: Response): Promise<void> => {
  try {
    let hero = await Hero.findOne();
    
    // Si no existe, crear uno por defecto
    if (!hero) {
      hero = new Hero({
        title: 'Blancos Sueños de Escalada',
        subtitle: 'Tu refugio en la montaña',
        description: 'Desconéctate del mundo y reconéctate contigo mismo en nuestras cabañas junto al río, rodeadas de montañas y naturaleza pura.',
        ctaText: 'Descubre nuestras cabañas',
        ctaLink: '/cabanas',
        slides: []
      });
      await hero.save();
    }
    
    // Transformar slides de array de objetos a array de strings para el frontend
    const heroData = {
      _id: hero._id,
      title: hero.title,
      subtitle: hero.subtitle,
      description: hero.description,
      ctaText: hero.ctaText,
      ctaLink: hero.ctaLink,
      slides: hero.slides.map(slide => slide.image),
      createdAt: hero.createdAt,
      updatedAt: hero.updatedAt
    };
    
    res.json(heroData);
  } catch (error) {
    console.error('Error obteniendo hero:', error);
    res.status(500).json({ message: 'Error al obtener información del hero' });
  }
};

export const updateHero = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, subtitle, description, ctaText, ctaLink, existingSlides } = req.body;
    const files = req.files as Express.Multer.File[];
    
    let hero = await Hero.findOne();
    
    if (!hero) {
      res.status(404).json({ message: 'Hero no encontrado' });
      return;
    }

    // Actualizar campos básicos
    hero.title = title || hero.title;
    hero.subtitle = subtitle || hero.subtitle;
    hero.description = description || hero.description;
    hero.ctaText = ctaText || hero.ctaText;
    hero.ctaLink = ctaLink || hero.ctaLink;

    // Mantener slides existentes
    let slides = [];
    if (existingSlides) {
      try {
        const existing = JSON.parse(existingSlides);
        slides = existing.map((img: string) => ({ image: img }));
      } catch (error) {
        console.error('Error parsing existing slides:', error);
      }
    }

    // Agregar nuevas imágenes
    if (files && files.length > 0) {
      const newSlides = files.map((file: Express.Multer.File) => ({
        image: `/uploads/${file.filename}`
      }));
      slides = [...slides, ...newSlides];
    }

    hero.slides = slides;
    
    await hero.save();
    res.json(hero);
  } catch (error) {
    console.error('Error actualizando hero:', error);
    res.status(500).json({ message: 'Error al actualizar hero' });
  }
};
