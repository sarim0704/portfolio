import Skill from '../models/Skill.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ order: 1 });
  res.json(skills);
});

export const updateSkills = asyncHandler(async (req, res) => {
  const { skills } = req.body;
  if (!Array.isArray(skills)) return res.status(400).json({ message: 'skills must be an array.' });
  await Skill.deleteMany({});
  const created = await Skill.insertMany(skills);
  res.json(created);
});
