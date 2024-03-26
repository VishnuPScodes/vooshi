import express from 'express';
import dotenv from 'dotenv';
import { connectWithMongoDB } from './src/configs/db';

const app = express();
dotenv.config();
//getting data from .env
const PORT = process.env.PORT || 4001;
const mongoUrl = process.env.MONGO_URL as string;

app.listen(PORT, async () => {
  try {
    await connectWithMongoDB(mongoUrl);
  } catch (error) {
    console.log(error);
  }
});
