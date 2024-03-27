import { Request, Response, NextFunction } from 'express';
import { UsersServices_ } from '../services/users.service';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isPrivate } = req.query;

  const user = await UsersServices_.getUsers({ isPrivate });

  res.status(201).send(user);
};
