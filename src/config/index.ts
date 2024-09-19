import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
	port: process.env.PORT,
	mongodb_url: process.env.MONGODB,
	node_env: process.env.NODE_ENV,
	default_user_pass: process.env.DEFAULT_USER_PASS,
	bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
	email_user: process.env.EMAIL_USER,
	email_password: process.env.EMAIL_PASS,

	jwt_access_secret: process.env.JWT_ACCESS_SECRATE,
	jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
	// jwt_refresh_secret: process.env.JWT_REFRESH_SECRATE,
	// jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

	reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
	frontend_URL: process.env.FRONTEND_URL,
};
