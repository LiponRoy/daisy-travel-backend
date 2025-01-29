import { z } from 'zod';

const CountryZodSchema = z.object({
	body: z.object({
		name: z.string({
			required_error: 'Country name is required',
		}),
		location: z.string({
			required_error: 'Country location is required',
		}),
	}),
});

export const CountryZod = {
	CountryZodSchema,
};
