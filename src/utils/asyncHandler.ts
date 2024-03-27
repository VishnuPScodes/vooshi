import { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotFoundError } from './response/error';

const asyncHandler =
  (fnc: any) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fnc(req, res, next)).catch((err) => {
      let status = 500;
      let error = err.message;
      if (err instanceof BadRequestError) {
        status = 400;
      } else if (err instanceof NotFoundError) {
        status = 404;
      } else {
        error = 'Internal Server Error Occurred';
      }
      return res.status(status).json({
        error: error,
      });
    });
  };

export default asyncHandler;
