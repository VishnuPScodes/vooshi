import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/response/error';

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = req.user;

    // Check if the user is an admin
    if (!user.isAdmin) {
      throw new BadRequestError(
        'User is not authorized to access this resource'
      );
    }

    // If the user is an admin, proceed to the next middleware
    next();
  } catch (error) {
    // Handle errors
    if (error instanceof BadRequestError) {
      res.status(403).json({ error: error.message }); // Forbidden status code
    } else {
      console.error('Error in isAdmin middleware:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
