import mongoose from 'mongoose';

export const connectWithMongoDB = async (url: string) => {
  return await mongoose.connect(url);
};
