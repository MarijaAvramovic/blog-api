import express from 'express';
 import { prisma } from "./lib/prisma.js";
import dotenv from 'dotenv';
 

dotenv.config();
 
const app = express();

 
app.use(express.json());

 
app.get('/', async (req, res) => {
  const  user = await prisma.user.findFirst({
    where: {
        name: "Alice"
    }
    
  });
  res.json({ user });
});
 

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));