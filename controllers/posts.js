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