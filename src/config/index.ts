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

	jwt_auth_secret: process.env.JWT_AUTH_SECRATE,
	jwt_auth_expires_in: process.env.JWT_AUTH_EXPIRES_IN,

	reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
	frontend_URL: process.env.FRONTEND_URL,

	cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
	cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
