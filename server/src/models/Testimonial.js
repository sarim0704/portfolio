import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, default: '' },
  quote: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 999 }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
