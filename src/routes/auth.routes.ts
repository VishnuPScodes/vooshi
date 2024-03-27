import express from 'express';
import { registerUser } from '../controllers/auth.controller';
import asyncHandler from '../utils/asyncHandler';
import { registerValidator } from '../middlewares/validators/auth.validator';

const authRouter = express.Router();

authRouter.post('/register', registerValidator, asyncHandler(registerUser));

export default authRouter;
