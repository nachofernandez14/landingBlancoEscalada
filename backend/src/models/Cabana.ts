import mongoose, { Schema, Document } from 'mongoose';

export interface IAmenity {
  name: string;
  icon: string;
}

export interface ICabana extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  amenities: IAmenity[];
  images: string[];
  mainImage: string;
  price: number;
  priceWeekend: number;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const AmenitySchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});

const CabanaSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  amenities: [AmenitySchema],
  images: [{
    type: String
  }],
  mainImage: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  priceWeekend: {
    type: Number
  },
  active: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model<ICabana>('Cabana', CabanaSchema);
