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
  console.log('from controller', user);
  res.status(201).send(user);
};
