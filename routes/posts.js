import { Router } from 'express';
import { getAllPosts, getAllPostsAdmin } from '../controllers/posts.js';    
import { authenticateJWT } from '../middleware/auth.js';
import { isAdmin } from '../middleware/admin.js';

const router = Router();

 
router.get('/', getAllPosts);
router.get('/admin', authenticateJWT, isAdmin, getAllPostsAdmin);

export default router;