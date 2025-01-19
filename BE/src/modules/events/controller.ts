import { Request, Response } from "express";
import { prismaClient } from "../../db";
import generalResponse from "../../utlis/generalResponse";

export const createEvent = async (req: Request, res: Response) => {
  const { name, description, startDateTime, endDateTime, categories } =
    req.body;

  const event = await prismaClient?.event?.create({
    data: {
      name,
      description,
      startDateTime,
      endDateTime,
      categories,
    },
  });
  if (!event) {
    return generalResponse(
      res,
      400,
      { success: false },
      "Event Could not be created. Try again",
      true
    );
  }

  return generalResponse(
    res,
    200,
    { success: true, event },
    "event added successfully",
    true
  );
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const { limit, offset } = req.body;
    const Events = await prismaClient?.event?.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: offset * limit,
    });

    if (!Events.length) {
      return generalResponse(
        res,
        404,
        { success: false },
        "No Events found",
        true
      );
    }
    return generalResponse(
      res,
      200,
      { success: true, Events: Events || [] },
      "event fetched successfully",
      false
    );
  } catch (error) {
    return generalResponse(res, 400, {}, "event Could not be fetched", true);
  }
};

export const updateEvents = async (req: Request, res: Response) => {
  const { name, description, startDateTime, endDateTime, categories } =
    req.body;

  const { id } = req.params;

  if (!id) {
    return generalResponse(res, 400, {}, "Event id is required", true);
  }

  const event = await prismaClient?.event?.update({
    where: { id },
    data: {
      name,
      description,
      categories,
      startDateTime,
      endDateTime,
    },
  });
  if (!event) {
    return generalResponse(
      res,
      400,
      { success: false },
      "event could not be created. Try again",
      true
    );
  }

  return generalResponse(
    res,
    200,
    { success: true, event },
    "event updated successfully",
    true
  );
};

export const deleteEvents = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return generalResponse(res, 400, {}, "Event id is required", true);
  }

  const event = await prismaClient?.event?.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
  if (!event) {
    return generalResponse(
      res,
      400,
      { success: false },
      "event could not be delete. Try again",
      true
    );
  }

  return generalResponse(
    res,
    200,
    { success: true, event },
    "event deleted successfully",
    true
  );
};
