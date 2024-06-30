import { ErrorRequestHandler } from 'express';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import { IGenericErrorMessage } from '../interfaces/error';
import ApiError from '../utils/ApiError';

const globalErrorHandler: ErrorRequestHandler = (
	error: any,
	req,
	res,
	next
) => {
	let statusCode = 500;
	let message = 'Something went wrong';
	let errorMessage: IGenericErrorMessage[] = [];
	// For Validation error
	if (error.name === 'ValidationError') {
		const simplifiedError = handleValidationError(error);
		statusCode = simplifiedError.statusCode;
		message = simplifiedError.message;
		errorMessage = simplifiedError.errorMessage;
		// For castom ApiError error
	} else if (error instanceof ApiError) {
		statusCode = error?.statusCode;
		message = error?.message;
		errorMessage = error?.message
			? [
					{
						path: '',
						message: error.message,
					},
			  ]
			: [];
		// for normal Error class
	} else if (error instanceof Error) {
		message = error?.message;
		errorMessage = error?.message
			? [
					{
						path: '',
						message: error?.message,
					},
			  ]
			: [];
	}

	res.status(statusCode).json({
		success: false,
		message,
		errorMessage,
		stack: config.node_env === 'development' ? error.stack : undefined,
	});
};

export default globalErrorHandler;
