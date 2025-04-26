import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { catchAsyncError } from '../../utils/catchAsyncErrors';
// import { profileServices } from './package.services';
import { mainProfile } from './profile.model';

/**
 * Update General Info
 */
export const updateGeneralInfo = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const { generalInfo } = req.body; // Expecting an object

		const updatedProfile = await mainProfile.findOneAndUpdate(
			{ userId },
			{ generalInfo },
			{ new: true }
		);

		if (!updatedProfile) {
			return res.status(404).json({ message: 'Profile not found' });
		}

		res.status(200).json({ message: 'General info updated', updatedProfile });
	} catch (error) {
		res.status(500).json({ message: 'Error updating general info', error });
	}
};

/**
 * Update Education Info
 */
export const updateEducationInfo = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const { educationInfo } = req.body; // Expecting an array of objects

		const updatedProfile = await mainProfile.findOneAndUpdate(
			{ userId },
			{ educationInfo },
			{ new: true }
		);

		if (!updatedProfile) {
			return res.status(404).json({ message: 'Profile not found' });
		}

		res.status(200).json({ message: 'Education info updated', updatedProfile });
	} catch (error) {
		res.status(500).json({ message: 'Error updating education info', error });
	}
};

/**
 * Update Work Experience
 */
export const updateWorkExperience = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const { workExperience } = req.body; // Expecting an array of objects

		const updatedProfile = await mainProfile.findOneAndUpdate(
			{ userId },
			{ workExperience },
			{ new: true }
		);

		if (!updatedProfile) {
			return res.status(404).json({ message: 'Profile not found' });
		}

		res
			.status(200)
			.json({ message: 'Work experience updated', updatedProfile });
	} catch (error) {
		res.status(500).json({ message: 'Error updating work experience', error });
	}
};
