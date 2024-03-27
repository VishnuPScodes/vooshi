import express from 'express';
import { registerUser } from '../controllers/auth.controller';
import asyncHandler from '../utils/asyncHandler';

const authRouter = express.Router();

authRouter.post('/register', asyncHandler(registerUser));

export default authRouter;
