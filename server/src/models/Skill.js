import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: { type: [String], default: [] },
  order: { type: Number, default: 999 }
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
