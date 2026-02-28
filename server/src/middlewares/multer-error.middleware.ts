import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { config } from '../config/config';

/**
 * Middleware for handling Multer errors, especially file size limit errors
 */
function multerErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        const fileSizeLimitMB = Math.round(config.uploadFileSizeLimit / (1024 * 1024));
        return res.status(422).json({
          success: false,
          message: 'File size limit exceeded',
          errors: [{
            field: 'files',
            message: `File size exceeds the ${fileSizeLimitMB}MB limit. Please choose smaller files or compress them.`
          }]
        });
      
      case 'LIMIT_FILE_COUNT':
        return res.status(422).json({
          success: false,
          message: 'Too many files',
          errors: [{
            field: 'files',
            message: 'Maximum number of files exceeded. Please upload fewer files.'
          }]
        });
      
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(422).json({
          success: false,
          message: 'Unexpected file field',
          errors: [{
            field: 'files',
            message: 'Unexpected file field. Please check your upload form.'
          }]
        });
      
      default:
        return res.status(422).json({
          success: false,
          message: 'Upload error',
          errors: [{
            field: 'files',
            message: 'An error occurred during file upload. Please try again.'
          }]
        });
    }
  }

  // If it's not a Multer error, pass it to the next error handler
  next(error);
}

export default multerErrorHandler;
