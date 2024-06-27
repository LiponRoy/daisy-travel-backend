import { z } from "zod";

const TourZodSchema = z.object({
  body: z.object({
    fromLocation: z.string({
      required_error: "FromLocation is required",
    }),
    toLocation: z.string({
      required_error: "ToLocation is required",
    }),
    price: z.string({
      required_error: "Price is required",
    }),
    tourDate: z.string({
      required_error: "Tour Date is required",
    }),
  }),
});
export const TourZod = {
  TourZodSchema,
};
