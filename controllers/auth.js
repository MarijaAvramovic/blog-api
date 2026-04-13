import passport from '../config/passport.js';
import jwt from 'jsonwebtoken';
  import { prisma } from "../lib/prisma.js";
 import dotenv from 'dotenv';
 import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name: name || username
      }
    });

    res.status(201).json({ 
      message: 'User registered successfully',
      userId: user.id 
    });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Username already exists' });
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
};
 