import Profile from '../models/Profile.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadBufferToCloudinary } from '../utils/cloudinaryUpload.js';

async function getOrCreateProfile() {
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({});
  return profile;
}

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await getOrCreateProfile();
  res.json(profile);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await getOrCreateProfile();
  Object.assign(profile, req.body);
  await profile.save();
  res.json(profile);
});

export const uploadPortrait = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });
  const result = await uploadBufferToCloudinary(req.file.buffer, 'sarim-portfolio/portrait', 'image');
  const profile = await getOrCreateProfile();
  profile.portraitUrl = result.secure_url;
  await profile.save();
  res.json({ url: result.secure_url, profile });
});

export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });
  const result = await uploadBufferToCloudinary(req.file.buffer, 'sarim-portfolio/resume', 'auto');
  const profile = await getOrCreateProfile();
  profile.resumeUrl = result.secure_url;
  await profile.save();
  res.json({ url: result.secure_url, profile });
});
