import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/http.exception';

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  
  // Provide a more structured error response
  return res.status(status).json({
    success: false,
    message,
    errors: [{
      message
    }]
  });
}

export default errorMiddleware;
