import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Sarim Azhar' },
  title: { type: String, default: 'Full-Stack MERN Developer & AI-Integrated Product Builder' },
  bio: { type: String, default: '' },
  location: { type: String, default: 'Kharian, Pakistan' },
  email: { type: String, default: 'sarimaz786@gmail.com' },
  phone: { type: String, default: '+92-327-8300828' },
  github: { type: String, default: 'https://github.com/sarim0704' },
  linkedin: { type: String, default: 'https://linkedin.com/in/sarim-azhar-6333422a8' },
  portraitUrl: { type: String, default: '/uploads/portrait.png' },
  resumeUrl: { type: String, default: '' },
  heroRoles: { type: [String], default: ['MERN Developer', 'AI Product Builder', 'CS Student'] },
  stats: [{ label: String, value: String, suffix: String }]
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
