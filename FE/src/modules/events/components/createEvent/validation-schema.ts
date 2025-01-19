import { z } from "zod";

const addEventSchema = z
  .object({
    name: z.string().min(1, {
      message: "Event name is required.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    start: z.date({
      required_error: "A date of birth is required.",
    }),
    end: z.date({
      required_error: "A date of birth is required.",
    }),
  })
  .refine((data) => new Date(data.start) < new Date(data.end), {
    message: "Start time must be earlier than end time.",
    path: ["end"], // Point the error to the 'end' field
  });

export default addEventSchema;
