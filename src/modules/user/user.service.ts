import config from '../../config';
import { IUsers } from './user.interface';
import { userModel } from './user.model';
import { generateStudentId } from './user.utils';

const createUser = async (user: IUsers): Promise<IUsers | null> => {
	if (!user.password) {
		user.password = config.default_user_pass as string;
	}

	user.id = (await generateStudentId()) as string;

	const tour = await userModel.create(user);
	return tour;
};

export const userService = {
	createUser,
};
