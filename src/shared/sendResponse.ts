import { Response } from "express";

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T;
}

const sendResponse = <T>(res: Response, data: IResponse<T>): void => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  };
  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
