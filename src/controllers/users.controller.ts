import { Request, Response, NextFunction } from 'express';
import { UsersServices_ } from '../services/users.service';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isPrivate, page, limit } = req.query;
  const user = await UsersServices_.getUsers({ isPrivate, page, limit });

  res.status(201).send(user);
};

export const getPublicUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query;
  const user = await UsersServices_.getPublicUsers({ page, limit });

  res.status(201).send(user);
};
