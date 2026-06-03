import { Router } from 'express';
import { getExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import { protect } from '../middleware/auth.js';
const router = Router();
router.get('/', getExperience);
router.post('/admin', protect, createExperience);
router.put('/admin/:id', protect, updateExperience);
router.delete('/admin/:id', protect, deleteExperience);
export default router;
