// import mongoose from 'mongoose';
// import {
// 	deleteLocalFile,
// 	uploadImage,
// } from '../../utils/cloudinary_file_upload';
// import ApiError from '../../errors/ApiError';
// import { JwtPayload } from 'jsonwebtoken';
// import mainProfile from './profile.model';
// import mainProfile from './profile.model';

// const profileUpdate = async (payload: any, currentUser: JwtPayload) => {
// 	try {
// 		const userId = req.user.id;
// 		const mainProfile = await MainProfile.findOne({ userId });

// 		if (!mainProfile || !mainProfile.generalInfo) {
// 			return res.status(404).json({ message: 'General Info not found' });
// 		}

// 		const updatedGeneralInfo = await GeneralInfo.findByIdAndUpdate(
// 			mainProfile.generalInfo,
// 			{ $set: req.body },
// 			{ new: true, runValidators: true }
// 		);

// 		res.status(200).json(updatedGeneralInfo);
// 	} catch (error) {
// 		res.status(500).json({ message: 'Server error', error });
// 	}

// 	// return updatedProfile;
// };

// export const profileServices = {
// 	profileUpdate,
// };
