import passport from '../config/passport.js';
import jwt from 'jsonwebtoken';
  import { prisma } from "../lib/prisma.js";
 import dotenv from 'dotenv';
 import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { username, password, name, role} = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name: name || username,
         
      }
    });

    res.status(201).json({ 
      message: 'User registered successfully',
      username: user.username 
    });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Username already exists' });
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
};
 

// Login using Passport Local Strategy + issue JWT
export const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: info?.message || 'Login failed' });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username 
      },
      process.env.JWT_SECRET || 'super-secret-change-this',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      }
    });
  })(req, res, next);
};


export const getProfile = async (req, res) => {
  try {
    
    res.json({
      message: '✅ Protected route accessed successfully',
      user: req.user
    });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const logout = (req, res) => {
  // Optional: If you want to use Passport's logout (harmless here)
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
  });

  // For JWT, we can't invalidate the token on server (unless you add blacklisting later)
  res.json({
    message: 'Logged out successfully. Please remove the token from client storage.',
    success: true
  });
};