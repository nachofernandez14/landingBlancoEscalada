import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  name: string;
  icon: string;
  category: 'activity' | 'excursion' | 'entreNosotras';
  description?: string;
  url?: string;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['activity', 'excursion', 'entreNosotras'],
    required: true
  },
  description: {
    type: String
  },
  url: {
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

export default mongoose.model<IActivity>('Activity', ActivitySchema);
