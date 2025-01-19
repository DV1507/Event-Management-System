import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import {
  createEventSchema,
  deleteEventSchema,
  getEventsSchema,
  updateEventSchema,
} from "./validation.schema";
import {
  createEvent,
  deleteEvents,
  getAllEvents,
  updateEvents,
} from "./controller";

const router = Router();
const basePath = "/events";
router.post(
  `${basePath}`,
  validationMiddleware(getEventsSchema, "body"),
  createEvent
);
router.post(
  `${basePath}`,
  validationMiddleware(createEventSchema, "body"),
  getAllEvents
);

router.patch(
  `${basePath}/:id`,
  validationMiddleware(updateEventSchema, "body"),
  updateEvents
);

router.delete(
  `${basePath}/:id`,
  validationMiddleware(deleteEventSchema, "params"),
  deleteEvents
);
export const productRouter = router;
