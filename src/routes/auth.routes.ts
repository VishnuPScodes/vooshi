import express from 'express';
import {
  getUserInformationsById,
  loginUser,
  registerUser,
} from '../controllers/auth.controller';
import asyncHandler from '../utils/asyncHandler';
import {
  loginValidator,
  registerValidator,
} from '../middlewares/validators/auth.validator';
import { isAuthenticated } from '../middlewares/auth/isAuthenticated';

const authRouter = express.Router();

authRouter.post('/register', registerValidator, asyncHandler(registerUser));
authRouter.post('/login', loginValidator, asyncHandler(loginUser));
authRouter.get(
  '/profile/:userId',
  isAuthenticated,
  asyncHandler(getUserInformationsById)
);

export default authRouter;
