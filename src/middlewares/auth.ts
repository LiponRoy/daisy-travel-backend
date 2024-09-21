import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
//import AppError from '../errors/AppError';
import { catchAsyncError } from '../utils/catchAsyncErrors';
import ApiError from '../errors/ApiError';
import { User } from '../modules/Auth/auth.model';
import { verifyToken } from '../modules/Auth/auth.utils';

const auth = (...requiredRoles: any) => {
	return catchAsyncError(
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const token = req.cookies.authToken;

				// checking if the token is missing
				if (!token) {
					throw new ApiError(
						httpStatus.UNAUTHORIZED,
						'You are not authorized!'
					);
				}
				// Verify the token
				const decoded = jwt.verify(
					token,
					config.jwt_auth_secret as string
				) as JwtPayload;

				const { email, role } = decoded;

				// // checking if the user is exist
				const user = await User.isUserExistsByEmail(email);

				if (!user) {
					throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found !');
				}
				// Check if the user has the required roles
				if (requiredRoles && !requiredRoles.includes(role)) {
					throw new ApiError(
						httpStatus.UNAUTHORIZED,
						'You are not authorized  hi!'
					);
				}
				// Attach the user payload to the request object
				req.user = decoded as JwtPayload & { role: string };
				// Proceed to the next middleware or controllers
				next();
			} catch (error) {
				throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token !');
			}
		}
	);
};

export default auth;
