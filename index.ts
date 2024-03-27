import express from 'express';
import dotenv from 'dotenv';
import { connectWithMongoDB } from './src/configs/db';
import authRouter from './src/routes/auth.routes';
const app = express();
app.use(express.json());
dotenv.config();
//getting data from .env
const PORT = process.env.PORT || 4001;
const mongoUrl = process.env.MONGO_URL as string;
app.use('/auth', authRouter);
app.listen(PORT, async () => {
  try {
    await connectWithMongoDB(mongoUrl);
    console.log('running on port ', PORT);
  } catch (error) {
    console.log(error);
  }
});
