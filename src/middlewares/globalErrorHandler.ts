import { NextFunction, Request, Response } from "express";
import config from "../config";
import handleValidationError from "../errors/handleValidationError";
import { IGenericErrorMessage } from "../interfaces/error";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessage: IGenericErrorMessage[] = [];

  if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.node_env === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
