import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { ApiError } from '@/types';

export interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  details?: any[];
  isOperational?: boolean;
}

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';
  let code = error.code || 'INTERNAL_ERROR';
  let details = error.details || [];

  // Log error
  logger.error('Error occurred:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: (req as any).user?.id,
  });

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    code = 'VALIDATION_ERROR';
    
    // Extract validation details for Mongoose
    if (error.message.includes('validation failed')) {
      const validationErrors = Object.values((error as any).errors || {}).map((err: any) => ({
        field: err.path,
        message: err.message,
        code: err.kind?.toUpperCase() || 'VALIDATION_ERROR',
      }));
      details = validationErrors;
    }
  }

  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
    code = 'INVALID_ID';
  }

  if (error.name === 'MongoServerError') {
    if ((error as any).code === 11000) {
      statusCode = 409;
      message = 'Duplicate field value';
      code = 'DUPLICATE_ERROR';
      
      // Extract field name from duplicate key error
      const field = Object.keys((error as any).keyValue || {})[0];
      if (field) {
        details = [{
          field,
          message: `${field} already exists`,
          code: 'DUPLICATE_VALUE',
        }];
      }
    }
  }

  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
    code = 'INVALID_TOKEN';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
    code = 'TOKEN_EXPIRED';
  }

  if (error.name === 'MulterError') {
    statusCode = 400;
    code = 'FILE_UPLOAD_ERROR';
    
    switch ((error as any).code) {
      case 'LIMIT_FILE_SIZE':
        message = 'File too large';
        break;
      case 'LIMIT_FILE_COUNT':
        message = 'Too many files';
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        message = 'Unexpected file field';
        break;
      default:
        message = 'File upload error';
    }
  }

  // Don't leak error details in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Something went wrong';
    code = 'INTERNAL_ERROR';
    details = [];
  }

  const errorResponse: ApiError = {
    message,
    code,
    statusCode,
    ...(details.length > 0 && { details }),
  };

  res.status(statusCode).json({
    success: false,
    error: errorResponse,
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
    }),
  });
};

// Async error wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Create custom error
export const createError = (
  message: string,
  statusCode: number = 500,
  code: string = 'CUSTOM_ERROR',
  details?: any[]
): CustomError => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  error.code = code;
  error.details = details;
  error.isOperational = true;
  return error;
};