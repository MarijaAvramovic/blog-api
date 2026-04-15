import express from 'express';
import passport from './config/passport.js';
 import { prisma } from "./lib/prisma.js";
import dotenv from 'dotenv';
 import cors from 'cors';
 
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
import commentsRouter from './routes/comments.js';

dotenv.config();
 
const app = express();

app.use(cors({
  origin: '*',    
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
 

 
app.get('/', async (req, res) => {
  const  user = await prisma.user.findFirst({
    where: {
        name: "Alice"
    }
    
  });
  res.json({ user });
});

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api', commentsRouter);
 

const PORT = 4100;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));