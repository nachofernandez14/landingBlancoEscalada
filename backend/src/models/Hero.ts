import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroSlide {
  image: string;
  _id?: string;
}

export interface IHero extends Document {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  slides: IHeroSlide[];
  createdAt: Date;
  updatedAt: Date;
}

const HeroSlideSchema: Schema = new Schema({
  image: {
    type: String,
    required: true
  }
});

const HeroSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'Blancos Sueños de Encalada'
  },
  subtitle: {
    type: String,
    required: true,
    default: 'Tu refugio en la montaña'
  },
  description: {
    type: String,
    required: true
  },
  ctaText: {
    type: String,
    default: 'Descubre nuestras cabañas'
  },
  ctaLink: {
    type: String,
    default: '/cabanas'
  },
  slides: [HeroSlideSchema]
}, {
  timestamps: true
});

export default mongoose.model<IHero>('Hero', HeroSchema);
