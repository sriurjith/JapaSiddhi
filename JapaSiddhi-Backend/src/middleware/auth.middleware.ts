import {
  Request,
  Response,
  NextFunction,
} from 'express';

import jwtService from '../utils/jwt';

import AppError from '../utils/appError';


const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  try {

    const authHeader =
      req.headers.authorization;


    if (!authHeader) {
      throw new AppError(
        'Authorization token missing.',
        401,
      );
    }


    const parts =
      authHeader.split(' ');


    if (
      parts.length !== 2 ||
      parts[0] !== 'Bearer'
    ) {

      throw new AppError(
        'Invalid authorization format.',
        401,
      );

    }


    const token =
      parts[1];


    const decoded =
      jwtService.verify(
        token,
      );


    if (
      typeof decoded === 'string'
    ) {

      throw new AppError(
        'Invalid token.',
        401,
      );

    }


    const user = decoded as any;
    user.id = Number(user.id);
    req.user = user;

    next();


  } catch (error) {

    return res.status(401).json({

      success: false,

      message:
        error instanceof AppError
          ? error.message
          : 'Invalid token.',

    });

  }

};


export default authenticate;