import { z } from "zod";

export const createEventSchema = z
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

export const updateEventSchema = createEventSchema;

export const deleteEventSchema = z.object({
  id: z.number().nonnegative().int("Event ID must be a number"),
});

export const getEventsSchema = z.object({
  id: z.number().nonnegative().int("Event ID must be a number"),
});
