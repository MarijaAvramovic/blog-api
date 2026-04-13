import express from 'express';

 import { prisma } from "./lib/prisma.js";
import dotenv from 'dotenv';
 
 
import authRouter from './routes/auth.js';

dotenv.config();
 
const app = express();

 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 

 
app.get('/', async (req, res) => {
  const  user = await prisma.user.findFirst({
    where: {
        name: "Alice"
    }
    
  });
  res.json({ user });
});

app.use('/api/auth', authRouter);
 

const PORT = 4100;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));