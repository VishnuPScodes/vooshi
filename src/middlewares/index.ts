import { validationResult } from 'express-validator';
import mongoSanitize from 'express-mongo-sanitize';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import asyncHandler from '../utils/asyncHandler';

const validateRequest: RequestHandler[] = [
  mongoSanitize(),
  asyncHandler((req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        error: errors.array()[0].msg,
      });
    } else {
      next();
    }
  }),
];

export default validateRequest;
