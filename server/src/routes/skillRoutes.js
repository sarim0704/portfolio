import { Router } from 'express';
import { getSkills, updateSkills } from '../controllers/skillController.js';
import { protect } from '../middleware/auth.js';
const router = Router();
router.get('/', getSkills);
router.put('/admin', protect, updateSkills);
export default router;
