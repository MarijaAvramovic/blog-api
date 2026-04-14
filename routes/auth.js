import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateJWT, getProfile);
   

export default router;