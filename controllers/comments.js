import { prisma } from "../lib/prisma.js";
 
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

   
    if (!content || content.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Comment content is required'
      });
    }
 
    const postExists = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!postExists) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
 
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        postId: postId,
        authorId: req.user.id,      
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            role: true,
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add comment'
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ success: false, error: 'Comment content is required' });
    }

     
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: { author: true }
    });

    if (!comment) {
      return res.status(404).json({ success: false, error: 'Comment not found' });
    }

    // Check permission: Author or Admin
    const isAuthor = comment.authorId === req.user.id;
    const isAdmin = req.user.role === 'ADMIN';

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ success: false, error: 'You can only edit your own comments' });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content: content.trim() },
      include: {
        author: { select: { id: true, username: true, name: true, role: true } }
      }
    });

    res.json({
      success: true,
      message: 'Comment updated successfully',
      comment: updatedComment
    });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ success: false, error: 'Failed to update comment' });
  }
};

// Delete comment - Only author or Admin can delete
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Find the comment
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return res.status(404).json({ success: false, error: 'Comment not found' });
    }

    // Check permission: Author or Admin
    const isAuthor = comment.authorId === req.user.id;
    const isAdmin = req.user.role === 'ADMIN';

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ success: false, error: 'You can only delete your own comments' });
    }

    await prisma.comment.delete({
      where: { id: commentId }
    });

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ success: false, error: 'Failed to delete comment' });
  }
};