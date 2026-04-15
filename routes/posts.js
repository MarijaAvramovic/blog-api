import { Router } from 'express';
import { getAllPosts, getAllPostsAdmin, getPostById, createPost, updatePost, deletePost} from '../controllers/posts.js';    
import { authenticateJWT } from '../middleware/auth.js';
import { isAdmin } from '../middleware/admin.js';

const router = Router();

 
router.get('/', getAllPosts);
router.get('/admin', authenticateJWT, isAdmin, getAllPostsAdmin);
router.get('/:id', getPostById);

router.post('/', authenticateJWT, isAdmin, createPost);
router.put('/:id', authenticateJWT, isAdmin, updatePost);         
router.delete('/:id', authenticateJWT, isAdmin, deletePost);

 

export default router;