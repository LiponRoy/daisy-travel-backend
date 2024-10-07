import { z } from 'zod';

const userValidationZodSchema = z.object({
	body: z.object({
		name: z
			.string()
			.min(4, { message: 'Name must be at least 4 characters long' })
			.regex(/^[A-Za-z]+$/, {
				message: 'Name must contain only alphabetic characters',
			}),
		email: z.string().email({ message: 'Invalid email address' }),
		phone: z
			.string()
			.length(11, { message: 'Phone number must be exactly 11 digits' })
			.regex(/^\d+$/, { message: 'Phone number must contain only digits' }),
		password: z
			.string()
			.min(5, { message: 'Password must be at least 5 characters' }),
	}),
});

// const profileUpdateZodSchema = z.object({
// 	body: z.object({
// 		name: z
// 			.string()
// 			.min(4, { message: 'Name must be at least 4 characters long' })
// 			.regex(/^[A-Za-z]+$/, {
// 				message: 'Name must contain only alphabetic characters',
// 			}),
// 		email: z.string().email({ message: 'Invalid email address' }),
// 		phone: z
// 			.string()
// 			.length(11, { message: 'Phone number must be exactly 11 digits' })
// 			.regex(/^\d+$/, { message: 'Phone number must contain only digits' }),
// 			avatar: z
// 			.any()
// 			.refine((files) => files instanceof FileList && files.length > 0, {
// 			  message: "File is required",
// 			})
// 			.refine((files) => files[0]?.type === "image/jpeg" || files[0]?.type === "image/png" || files[0]?.type === "image/jpg", {
// 			  message: "Only JPEG,JPG or PNG images are allowed",
// 			})
// 			.refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
// 			  message: "File size must be less than 5MB",
// 			}),
// 	}),
// });

const loginValidationSchema = z.object({
	body: z.object({
		email: z.string().email({ message: 'Invalid email address' }),
		password: z.string({ required_error: 'Password is required' }),
	}),
});
const resendVerifyEmailCode = z.object({
	body: z.object({
		email: z.string().email({ message: 'Invalid email address' }),
	}),
});

const refreshTokenValidationSchema = z.object({
	cookies: z.object({
		refreshToken: z.string({
			required_error: 'Refresh token is required!',
		}),
	}),
});

export const AuthValidation = {
	userValidationZodSchema,
	loginValidationSchema,
	resendVerifyEmailCode,
	refreshTokenValidationSchema,
};
