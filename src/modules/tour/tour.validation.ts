import { z } from 'zod';
import { TourCodesArray, TourMomentsArray } from './tour.constant';

const TourZodSchema = z.object({
	body: z.object({
		fromLocation: z.string({
			required_error: 'FromLocation is required',
		}),
		toLocation: z.string({
			required_error: 'ToLocation is required',
		}),
		duration: z.number({
			required_error: 'duration is required',
		}),
		price: z.number({
			required_error: 'Price is required',
		}),
		// This way we can use enum in typescript.
		// Moment: z.enum([...TourMomentsArray] as [string, ...string[]]),
		// moment: z.enum([...TourMomentsArray] as [string, ...string[]]),
		// code: z.enum([...TourCodesArray] as [string, ...string[]]),
		tourDate: z.string({
			required_error: 'Tour Date is required',
		}),
		country: z.enum(['Bangladesh', 'India', 'Bhutan',"Thailand"]),
	}),
});

// for update
const UpdateTourZodSchema = z.object({
	body: z.object({
		fromLocation: z
			.string({
				required_error: 'FromLocation is required',
			})
			.optional(),
		toLocation: z
			.string({
				required_error: 'ToLocation is required',
			})
			.optional(),
		price: z
			.string({
				required_error: 'Price is required',
			})
			.optional(),
		// This way we can use enum in typescript.
		// Moment: z.enum([...TourMomentsArray] as [string, ...string[]]),
		moment: z.enum([...TourMomentsArray] as [string, ...string[]]).optional(),
		code: z.enum([...TourCodesArray] as [string, ...string[]]).optional(),
		tourDate: z
			.string({
				required_error: 'Tour Date is required',
			})
			.optional(),
	}),
});
export const TourZod = {
	TourZodSchema,
	UpdateTourZodSchema,
};
