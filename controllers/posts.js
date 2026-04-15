import { prisma } from "../lib/prisma.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,          
      },
      orderBy: {
        createdAt: 'desc',         
      },
      include: {
        author: {                 
          select: {
            id: true,
            username: true,
            name: true,
            role: true,
          }
        },
        comments: {                
          orderBy: {
            createdAt: 'desc',     
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
        }
      }
    });

    res.json({
      success: true,
      count: posts.length,
      posts: posts
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch posts and comments'
    });
  }
};


export const getAllPostsAdmin = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            role: true,
          }
        },
        comments: {
          orderBy: {
            createdAt: 'desc',
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
        }
      }
    });

    res.json({
      success: true,
      count: posts.length,
      posts: posts
    });
  } catch (error) {
    console.error('Error fetching all posts (admin):', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch posts'
    });
  }
};


export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            role: true,
          }
        },
        comments: {
          orderBy: {
            createdAt: 'desc',      
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
        }
      }
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    res.json({
      success: true,
      post: post
    });
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch post'
    });
  }
};


export const createPost = async (req, res) => {
  try {
    const { title, content, published = true } = req.body;

   
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Title and content are required'
      });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published,
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
      message: 'Post created successfully',
      post: newPost
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create post'
    });
  }
};


// Admin: Update a post (title, content, or published status)
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(published !== undefined && { published }),
      },
      include: {
        author: {
          select: { id: true, username: true, name: true, role: true }
        }
      }
    });

    res.json({
      success: true,
      message: 'Post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    console.error('Error updating post:', error);
    res.status(500).json({ success: false, error: 'Failed to update post' });
  }
};

// Admin: Delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
await prisma.comment.deleteMany({ where: { postId: id } });
    await prisma.post.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    console.error('Error deleting post:', error);
    res.status(500).json({ success: false, error: 'Failed to delete post' });
  }
};