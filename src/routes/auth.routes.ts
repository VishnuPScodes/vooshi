import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller';
import asyncHandler from '../utils/asyncHandler';
import {
  loginValidator,
  registerValidator,
} from '../middlewares/validators/auth.validator';

const authRouter = express.Router();

authRouter.post('/register', registerValidator, asyncHandler(registerUser));
authRouter.post('/login', loginValidator, asyncHandler(loginUser));

export default authRouter;
