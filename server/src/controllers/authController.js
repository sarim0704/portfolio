import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { env } from '../config/env.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function signToken(id) {
  if (!env.jwtSecret) {
    const error = new Error('JWT_SECRET is not configured.');
    error.status = 500;
    throw error;
  }
  return jwt.sign({ id }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });
  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid admin credentials.' });
  }
  const token = signToken(admin._id);
  res.json({ token, admin: { id: admin._id, email: admin.email } });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ admin: req.admin });
});
