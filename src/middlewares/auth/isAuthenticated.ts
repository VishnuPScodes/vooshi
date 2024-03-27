import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/response/error';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.JWT_SECRET_KEY;

const verifyToken = (token: any) => {
  if (!secret) {
    throw new BadRequestError('JWT secret is not provided');
  }
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if authorization header is set
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestError('Authorization token is missing');
    }

    // Extract token from header
    const token = authHeader.split(' ')[1];

    // Verify token
    const decodedToken: any = await verifyToken(token);

    // Attach user to request object
    req.user = decodedToken.user;

    next(); // Proceed to the next middleware
  } catch (error) {
    // Handle errors
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
    } else if (error instanceof BadRequestError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Error in isAuthenticated middleware:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
