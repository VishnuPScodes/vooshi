import { Request, Response, NextFunction } from 'express';
import { UserAuthServices_ } from '../services/auth.service';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, userName, email, userBio, phoneNumber, profileStatus } =
    req.body;
  const user = await UserAuthServices_.registerUser({
    password,
    userName,
    email,
    userBio,
    phoneNumber,
    profileStatus,
  });

  res.status(201).send(user);
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('rere');
  const { password, email } = req.body;
  const user = await UserAuthServices_.userLogin({
    password,
    email,
  });

  res.status(200).send(user);
};

export const getUserInformationsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('hooola');
  const { userId } = req.params;
  const user = await UserAuthServices_.getUserData(userId);

  res.status(201).send(user);
};
