import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  organization: { type: String, required: true },
  type: { type: String, default: 'Experience' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: 'present' },
  bullets: { type: [String], default: [] },
  order: { type: Number, default: 999 }
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);
