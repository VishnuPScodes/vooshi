import express from 'express';
import {
  getUserInformationsById,
  loginUser,
  registerUser,
  updateUserInformations,
} from '../controllers/auth.controller';
import asyncHandler from '../utils/asyncHandler';
import {
  loginValidator,
  registerValidator,
} from '../middlewares/validators/auth.validator';
import { isAuthenticated } from '../middlewares/auth/isAuthenticated';
import upload from '../middlewares/file-upload';

const authRouter = express.Router();

authRouter.post('/register', registerValidator, asyncHandler(registerUser));
authRouter.post('/login', loginValidator, asyncHandler(loginUser));
authRouter.get(
  '/profile/:userId',
  isAuthenticated,
  asyncHandler(getUserInformationsById)
);
authRouter.patch(
  '/profile/update/:userId',
  isAuthenticated,
  upload.single('profilePicture'),
  asyncHandler(updateUserInformations)
);

export default authRouter;
