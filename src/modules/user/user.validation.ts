import { z } from 'zod';

const userZodSchema = z.object({
	body: z.object({
		// id: z.string({
		// 	required_error: 'id is required',
		// }),
		role: z.string({
			required_error: 'role is required',
		}),
		// password: z.string({
		// 	required_error: 'password is required',
		// }),
	}),
});

export const userZod = {
	userZodSchema,
};
