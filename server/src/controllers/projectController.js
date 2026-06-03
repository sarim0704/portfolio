import Project from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadBufferToCloudinary } from '../utils/cloudinaryUpload.js';

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ featured: -1, order: 1, createdAt: -1 });
  res.json(projects);
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!project) return res.status(404).json({ message: 'Project not found.' });
  res.json(project);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found.' });
  res.json({ message: 'Project deleted.' });
});

export const uploadProjectThumbnail = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found.' });
  const result = await uploadBufferToCloudinary(req.file.buffer, 'sarim-portfolio/projects', 'image');
  project.thumbnailUrl = result.secure_url;
  await project.save();
  res.json(project);
});
