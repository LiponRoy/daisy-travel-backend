import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
//import AppError from '../errors/AppError';
import { catchAsyncError } from '../utils/catchAsyncErrors';
import ApiError from '../errors/ApiError';
import { User } from '../modules/Auth/auth.model';

const auth = (...requiredRoles: any) => {
  return catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies

    // checking if the token is missing
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const {email, role,  } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByEmail(email)

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }

    req.user = decoded

    next();
  });
};

export default auth;
