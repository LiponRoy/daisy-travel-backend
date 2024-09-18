import { sendEmail } from './../../utils/sendEmail';
import httpStatus from 'http-status';
import { ILoginUser, IUser } from './auth.interface';
import { User } from './auth.model';
import config from '../../config';
import { createToken, verifyToken } from './auth.utils';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import ApiError from '../../errors/ApiError';

const signupUser = async (payload: IUser) => {
	const { email } = payload;
	// Check if user exists
	const user = await User.isUserExistsByEmail(email);

	if (user) {
		throw new ApiError(409, 'User already exists');
	}

	// for verification by Email
	// make random 6 digit of code
	const verificationToken = Math.floor(
		100000 + Math.random() * 900000
	).toString();
	// Expire time in 1 hour
	//const verificationTokenExpireTime = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
	const verificationTokenExpireTime = Date.now() + 1 * 60 * 1000; // 1 minute

	// create user
	const newUser = await User.create({
		...payload,
		verificationToken,
		verificationTokenExpiresAt: verificationTokenExpireTime,
	});

	// send email
	await sendEmail({
		to: email,
		subject: 'Your Verification Code',
		text: verificationToken,
	});

	// If failed to create an user
	if (!newUser) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
	}

	return {
		newUser,
	};
};
const verifyEmail = async (code: string) => {
	const user = await User.findOne({
		verificationToken: code,
		verificationTokenExpiresAt: { $gt: Date.now() },
	});

	if (!user) {
		throw new ApiError(409, 'Invalid or expired verification code');
	}

	await User.findOneAndUpdate(
		{
			email: user.email,
			role: user.role,
		},
		{
			isVerified: true,
			verificationToken: '',
			verificationTokenExpiresAt: null,
		}
	);
	return {
		user,
	};
};

const resendVerifyEmailCode = async (payload: any) => {
	// Check if user exists
	const user = await User.isUserExistsByEmail(payload);

	if (!user) {
		throw new ApiError(409, 'User Not Found');
	}

	// for verification by Email
	// make random 6 digit of code
	const verificationToken = Math.floor(
		100000 + Math.random() * 900000
	).toString();
	// Expire time in 1 hour
	//const verificationTokenExpireTime = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
	const verificationTokenExpireTime = Date.now() + 1 * 60 * 1000; // 1 minute

	// create user
	// const newUser = await User.create({
	//   ...payload,
	//   verificationToken,
	//   verificationTokenExpiresAt: verificationTokenExpireTime,
	// });

	// update user
	const updateUser = await User.findOneAndUpdate(
		{
			email: user.email,
		},
		{
			isVerified: false,
			verificationToken: verificationToken,
			verificationTokenExpiresAt: verificationTokenExpireTime,
		}
	);

	// send email
	await sendEmail({
		to: payload,
		subject: 'Your Verification Code',
		text: verificationToken,
	});

	// If failed to create an user
	if (!updateUser) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'Failed to update with new code'
		);
	}

	return {
		updateUser,
	};
};

const loginUser = async (payload: IUser) => {
	// checking if the user is exist
	const user = await User.isUserExistsByEmail(payload.email);

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found !');
	}

	//checking if the password is correct
	if (!(await User.isPasswordMatched(payload?.password, user?.password)))
		throw new ApiError(httpStatus.FORBIDDEN, 'Password do not matched');

	//create token and sent to the  client
	const jwtPayload = {
		email: user.email,
		role: user.role,
	};

	const accessToken = createToken(
		jwtPayload,
		config.jwt_access_secret as string,
		config.jwt_access_expires_in as string
	);
	const refressToken = createToken(
		jwtPayload,
		config.jwt_refresh_secret as string,
		config.jwt_refresh_expires_in as string
	);

	return {
		accessToken,
		refressToken,
		user,
	};
};

const refreshToken = async (token: string) => {
	// checking if the given token is valid
	const decoded = verifyToken(token, config.jwt_refresh_secret as string);

	const { email, role } = decoded;

	// checking if the user is exist
	const user = await User.isUserExistsByEmail(email);

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found !');
	}

	const jwtPayload = {
		email: user.email,
		role: user.role,
	};

	const accessToken = createToken(
		jwtPayload,
		config.jwt_access_secret as string,
		config.jwt_access_expires_in as string
	);

	return {
		accessToken,
	};
};

const forgotPassword = async (payload: IUser) => {
	// checking if the user is exist
	const user = await User.isUserExistsByEmail(payload.email);

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found !');
	}

	// Generate reset token
	const resetToken = crypto.randomBytes(20).toString('hex');
	const resetTokenExpiresAt = Date.now() + 5 * 60 * 1000; // 1 hour
	//const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

	await User.findOneAndUpdate(
		{
			email: user.email,
			role: user.role,
		},
		{
			resetPasswordToken: resetToken,
			resetPasswordExpiresAt: resetTokenExpiresAt,
		}
	);

	const resetUILink = `${config.reset_pass_ui_link}${resetToken}`;

	// send email
	await sendEmail({
		to: user.email,
		subject: 'check your email',
		text: resetUILink,
	});
};

const resetPassword = async (password: string, token: string) => {
	const user = await User.findOne({
		resetPasswordToken: token,
		resetPasswordExpiresAt: { $gt: Date.now() },
	});

	if (!user) {
		throw new ApiError(httpStatus.FORBIDDEN, 'Invalid or expired reset token');
	}

	const newHashedPassword = await bcrypt.hash(
		password,
		Number(config.bcrypt_salt_rounds)
	);

	await User.findOneAndUpdate(
		{
			email: user.email,
			role: user.role,
		},
		{
			password: newHashedPassword,
			resetPasswordToken: '',
			resetPasswordExpiresAt: null,
		}
	);
};

const getUsers = async () => {
	const users = await User.find();

	if (!users.length) {
		throw new ApiError(409, 'Users not found');
	}

	return { users };
};

const userProfile = async (email:string) => {

	const user = await User.findOne({email});

	if (!user) {
		throw new ApiError(409, 'Profile user not found');
	}

	return { user };
};

export const AuthServices = {
	signupUser,
	verifyEmail,
	resendVerifyEmailCode,
	loginUser,
	refreshToken,
	forgotPassword,
	resetPassword,
	getUsers,
	userProfile,
};
