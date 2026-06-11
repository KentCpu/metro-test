import { z } from "zod";

export const VALIDATION_SCHEMA = z.object({
  name: z.string().trim().min(1, "Введите название"),
  longitude: z
    .string()
    .min(1, "Введите долготу")
    .refine((value) => Number.isFinite(Number(value)), {
      message: "Введите долготу",
    }),
  latitude: z
    .string()
    .min(1, "Введите широту")
    .refine((value) => Number.isFinite(Number(value)), {
      message: "Введите широту",
    }),
  routes: z.string(),
  address: z.string(),
});

export type BusStopFormValues = z.infer<typeof VALIDATION_SCHEMA>;
