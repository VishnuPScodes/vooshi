import express from 'express';
import asyncHandler from '../utils/asyncHandler';
import { getAllUsers } from '../controllers/users.controller';
import { isAdmin } from '../middlewares/validators/isAdmin';
import { isAuthenticated } from '../middlewares/auth/isAuthenticated';

const usersRoutes = express.Router();

usersRoutes.get(
  '/admin/allUsers',
  isAuthenticated,
  isAdmin,
  asyncHandler(getAllUsers)
);

export default usersRoutes;
