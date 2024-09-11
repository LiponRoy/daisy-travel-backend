import nodemailer from 'nodemailer';
import httpStatus from 'http-status';
import config from '../config';
import ApiError from '../errors/ApiError';
export const sendEmail = async (options: any) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: config.email_user,
			pass: config.email_password,
		},
	});

	const mailOptions = {
		from: config.email_user,
		to: options.to,
		subject: options.subject,
		text: options.text,
	};

	await transporter.sendMail(mailOptions);
	try {
		// Send the email
		await transporter.sendMail(mailOptions);
		//console.log('Email sent successfully');
	} catch (error) {
		//console.error('Failed to send email:', error);
		//throw new Error('Email sending failed,something went wrong!');
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'Email sending failed,something went wrong!'
		);
	}
	return {
		transporter,
		mailOptions,
	};
};
