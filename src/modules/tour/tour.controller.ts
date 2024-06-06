import { NextFunction, Request, Response } from "express";
import { tourService } from "./tour.service";
import ErrorHandler from "../../utils/ErrorHandler";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { catchAsyncError } from "../../shared/catchAsyncErrors";
import { IPagination } from "../../interfaces/pagination";

const createTour = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...tourData } = req.body;
    const result = await tourService.createTour(tourData);

    if (!result) {
      return next(new ErrorHandler("Failed to create user !", 400));
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tour Created Successfully !",
      data: result,
    });
  }
);

const getTours = catchAsyncError(async (req: Request, res: Response) => {
  // const paginationOptions:IPagination = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   shortBy: req.query.shortBy ,
  //   shortOrder: req.query.shortOrder,
  // };

  const result = await tourService.getAllTour();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tours get Successfully !",
    data: result,
    
  });
  console.log(req.query)
});

export const tourController = {
  createTour,
  getTours,
};
