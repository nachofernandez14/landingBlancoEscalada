import mongoose, { Schema, Document } from 'mongoose';

export interface IConfig extends Document {
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  phone: string;
  address: string;
  googleMapsUrl: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  createdAt: Date;
  updatedAt: Date;
}

const ConfigSchema: Schema = new Schema({
  whatsappNumber: {
    type: String,
    required: true,
    default: '5492613001298'
  },
  whatsappMessage: {
    type: String,
    default: '¡Hola! Me gustaría obtener más información sobre las cabañas.'
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  googleMapsUrl: {
    type: String
  },
  facebook: String,
  instagram: String,
  twitter: String,
  siteTitle: {
    type: String,
    default: 'Blancos Sueños de Escalada'
  },
  siteDescription: {
    type: String,
    default: 'Cabañas en Las Compuertas, Luján de Cuyo, Mendoza'
  },
  siteKeywords: {
    type: String,
    default: 'cabañas, mendoza, luján de cuyo, turismo, montaña'
  },
  logoUrl: {
    type: String,
    default: '/img/logo/logo_transparente.png'
  },
  faviconUrl: {
    type: String,
    default: '/img/logo/logo_transparente.png'
  },
  primaryColor: {
    type: String,
    default: '#C46A4A'
  },
  secondaryColor: {
    type: String,
    default: '#B87333'
  },
  accentColor: {
    type: String,
    default: '#9E553A'
  }
}, {
  timestamps: true
});

export default mongoose.model<IConfig>('Config', ConfigSchema);
