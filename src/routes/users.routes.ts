import express from 'express';
import asyncHandler from '../utils/asyncHandler';
import { getAllUsers } from '../controllers/users.controller';

const usersRoutes = express.Router();

usersRoutes.get('/admin/allUsers', asyncHandler(getAllUsers));

export default usersRoutes;
