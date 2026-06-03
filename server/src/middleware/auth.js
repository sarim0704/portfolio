import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { env } from '../config/env.js';

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'Not authorized. Token missing.' });
    if (!env.jwtSecret) return res.status(500).json({ message: 'JWT_SECRET is not configured.' });
    const decoded = jwt.verify(token, env.jwtSecret);
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) return res.status(401).json({ message: 'Admin not found.' });
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}
