import { Request, Response, NextFunction } from 'express';
import { UsersRepository } from '../repository/users.repository';
import { UsersServices_ } from '../services/users.service';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isPrivate } = req.query;
  console.log('private is', isPrivate);
  const user = await UsersServices_.getUsers({ isPrivate });

  res.status(201).send(user);
};
