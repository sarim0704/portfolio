import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  category: { type: String, default: '' },
  description: { type: String, required: true },
  features: { type: [String], default: [] },
  techStack: { type: [String], default: [] },
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  thumbnailUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 999 },
  impact: { type: String, default: '' },
  status: { type: String, default: 'Completed' }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
