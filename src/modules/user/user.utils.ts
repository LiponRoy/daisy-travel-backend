import { userModel } from './user.model';

const findLastStudentId = async () => {
	const lastStudent = await userModel
		.findOne(
			{
				role: 'student',
			},
			{
				id: 1,
				_id: 0,
			}
		)
		.sort({
			createdAt: -1,
		})
		.lean();

	return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async () => {
	const currentId =
		(await findLastStudentId()) || (0).toString().padStart(5, '0'); //00000

	const incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');

	return incrementId;
};
