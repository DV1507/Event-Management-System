import { z } from "zod";

const addEventSchema = z
  .object({
    name: z.string().min(1, {
      message: "Event name is required.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    startDateTime: z.date({
      required_error: "A date of birth is required.",
    }),
    endDateTime: z.date({
      required_error: "A date of birth is required.",
    }),
    categories: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .nonempty("Therapy area is required"),
  })
  .refine((data) => new Date(data.startDateTime) < new Date(data.endDateTime), {
    message: "Start time must be earlier than end time.",
    path: ["end"], // Point the error to the 'end' field
  });

export default addEventSchema;
