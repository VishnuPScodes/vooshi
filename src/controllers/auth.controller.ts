import { Request, Response, NextFunction } from 'express';
import { UserAuthServices_ } from '../services/auth.service';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, userName, email, userBio, phoneNumber } = req.body;
  try {
    const user = await UserAuthServices_.registerUser({
      password,
      userName,
      email,
      userBio,
      phoneNumber,
    });
    console.log('from controller', user);
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
