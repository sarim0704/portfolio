import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { env } from '../config/env.js';
import Admin from '../models/Admin.js';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Testimonial from '../models/Testimonial.js';
import { profile, projects, skills, experience, testimonials } from './data.js';

await connectDB();

if (!env.mongoUri) {
  throw new Error('MONGO_URI is required to seed the database.');
}

if (!env.adminEmail || !env.adminPassword) {
  throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required to seed the database.');
}

await Promise.all([
  Admin.deleteMany({}), Profile.deleteMany({}), Project.deleteMany({}), Skill.deleteMany({}), Experience.deleteMany({}), Testimonial.deleteMany({})
]);

await Admin.create({ email: env.adminEmail, password: env.adminPassword });
await Profile.create(profile);
await Project.insertMany(projects);
await Skill.insertMany(skills);
await Experience.insertMany(experience);
if (testimonials.length) await Testimonial.insertMany(testimonials);

console.log('Database seeded successfully.');
console.log(`Admin: ${env.adminEmail}`);
await mongoose.disconnect();
