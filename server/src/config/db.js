import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDB() {
  if (!env.mongoUri) {
    console.warn('MONGO_URI missing. Backend will start, but database routes will fail until configured.');
    return;
  }
  try {
    const conn = await mongoose.connect(env.mongoUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}
