import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem extends Document {
  type: 'image' | 'video';
  src: string;
  category: 'todas' | 'cabañas' | 'naturaleza';
  title?: string;
  description?: string;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema: Schema = new Schema({
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  src: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['todas', 'cabañas', 'naturaleza'],
    required: true
  },
  title: {
    type: String
  },
  description: {
    type: String
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

export default mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
