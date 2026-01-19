import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  name: string;
  avatar: string;
  stars: number;
  text: string;
  date: string;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
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

export default mongoose.model<IReview>('Review', ReviewSchema);
