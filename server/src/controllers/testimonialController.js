import Testimonial from '../models/Testimonial.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getTestimonials = asyncHandler(async (req, res) => {
  const items = await Testimonial.find({ visible: true }).sort({ order: 1, createdAt: -1 });
  res.json(items);
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.create(req.body);
  res.status(201).json(item);
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ message: 'Testimonial not found.' });
  res.json(item);
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Testimonial not found.' });
  res.json({ message: 'Testimonial deleted.' });
});
