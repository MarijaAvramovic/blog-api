import { Router } from 'express';
import { getAllPosts } from '../controllers/posts.js';    

const router = Router();

 
router.get('/', getAllPosts);

export default router;