import { Router } from 'express';
import { addComment, updateComment, deleteComment } from '../controllers/comments.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

 
router.post('/:postId/comments', authenticateJWT, addComment);

router.put('/comments/:commentId', authenticateJWT, updateComment);    
router.delete('/comments/:commentId', authenticateJWT, deleteComment);

export default router;