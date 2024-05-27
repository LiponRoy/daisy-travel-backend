import { Request, Response } from "express";
import { tourService } from "./tour.service";

const createTour = async (req: Request, res: Response) => {
  try {
    const tour = await tourService.createTour(req.body);
    res.status(200).send({
      status: "success",
      data: tour,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const tourController = {
  createTour,
};
