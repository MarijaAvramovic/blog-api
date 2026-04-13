import express from 'express';
 
import dotenv from 'dotenv';
 

dotenv.config();
 
const app = express();

 
app.use(express.json());

 
app.get('/', (req, res) => res.json({ message: 'Blog API is running' }));

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));