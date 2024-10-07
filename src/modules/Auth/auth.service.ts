import { sendEmail } from "./../../utils/sendEmail";
import httpStatus from "http-status";
import { ILoginUser, IUser } from "./auth.interface";
import { User } from "./auth.model";
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";
import bcrypt from "bcrypt";
import crypto from "crypto";
import ApiError from "../../errors/ApiError";
import cloudinary from "../../utils/cloudinary";

const signupUser = async (payload: IUser) => {
  const { email } = payload;
  // Check if user exists
  const user = await User.isUserExistsByEmail(email);

  if (user) {
    throw new ApiError(409, "User already exists");
  }

  // for verification by Email
  // make random 6 digit of code
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  // Expire time in 1 hour
  //const verificationTokenExpireTime = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
  const verificationTokenExpireTime = Date.now() + 10 * 60 * 1000; // 10 minute

  // create user
  const newUser = await User.create({
    ...payload,
    verificationToken,
    verificationTokenExpiresAt: verificationTokenExpireTime,
  });

  // send email
  await sendEmail({
    to: email,
    subject: "Your Verification Code",
    text: verificationToken,
  });

  // If failed to create an user
  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
  }

  return {
    newUser,
  };
};

const verifyEmail = async (code: string) => {
  const user = await User.findOne({
    verificationToken: code,
    verificationTokenExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(409, "Invalid or expired verification code");
  }

  await User.findOneAndUpdate(
    {
      email: user.email,
      role: user.role,
    },
    {
      isVerified: true,
      verificationToken: "",
      verificationTokenExpiresAt: null,
    }
  );
  return {
    user,
  };
};

const resendVerifyEmailCode = async (payload: any) => {
  const { name, email, phone, password, role } = payload;

  // Check if user exists
  const user = await User.isUserExistsByEmail(payload);

  if (!user) {
    throw new ApiError(409, "User Not Found");
  }

  // for verification by Email
  // make random 6 digit of code
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  // Expire time in 1 hour
  //const verificationTokenExpireTime = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
  const verificationTokenExpireTime = Date.now() + 1 * 60 * 1000; // 1 minute

  // create user
  // const newUser = await User.create({
  //   ...payload,
  //   verificationToken,
  //   verificationTokenExpiresAt: verificationTokenExpireTime,
  // });

  // update user
  const updateUser = await User.findOneAndUpdate(
    {
      email: user.email,
    },
    {
      isVerified: false,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: verificationTokenExpireTime,
    }
  );

  // send email
  await sendEmail({
    to: payload,
    subject: "Your Verification Code",
    text: verificationToken,
  });

  // If failed to create an user
  if (!updateUser) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Failed to update with new code"
    );
  }

  return {
    updateUser,
  };
};

const loginUser = async (payload: IUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new ApiError(httpStatus.FORBIDDEN, "Password do not matched");

  //create token and sent to the  client
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const authToken = createToken(
    jwtPayload,
    config.jwt_auth_secret as string,
    config.jwt_auth_expires_in as string
  );

  return {
    authToken,
    user,
  };
};

const forgotPassword = async (payload: IUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiresAt = Date.now() + 5 * 60 * 1000; // 1 hour
  //const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

  await User.findOneAndUpdate(
    {
      email: user.email,
      role: user.role,
    },
    {
      resetPasswordToken: resetToken,
      resetPasswordExpiresAt: resetTokenExpiresAt,
    }
  );

  const resetUILink = `${config.reset_pass_ui_link}${resetToken}`;

  // send email
  await sendEmail({
    to: user.email,
    subject: "check your email",
    text: resetUILink,
  });
};

const resetPassword = async (password: string, token: string) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid or expired reset token");
  }

  const newHashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      email: user.email,
      role: user.role,
    },
    {
      password: newHashedPassword,
      resetPasswordToken: "",
      resetPasswordExpiresAt: null,
    }
  );
};

const getUsers = async () => {
  const users = await User.find();

  if (!users.length) {
    throw new ApiError(409, "Users not found");
  }

  return { users };
};

const getMe = async (email: string, role: string) => {
  let result = null;
  result = await User.findOne({ email });
  // if (role === 'customer') {
  // 	result = await User.findOne({ email });
  // }
  // if (role === 'admin') {
  // 	result = await Admin.findOne({ email }).populate('user');
  // }

  return result;
};
const updateProfile = async (payload: Partial<IUser>, photoFile: any) => {
  const { name, phone, email } = payload;

  console.log("profileUpdate file: ", photoFile);

  // Check if user exists
  let user: any = await User.isUserExistsByEmail(email as string);

  //console.log("profileUpdate user: ", user._id.toString());

  if (!user) {
    throw new ApiError(409, "User Not Found");
  }

  // Upload image to cloudinary
  let result: any
  if(photoFile){
  // if file found then we need to use cloudinary otherways not
    result = await cloudinary.uploader.upload(photoFile.path,{ folder: "tpn-img"});

    if (user.cloudinary_id) {
      await cloudinary.uploader.destroy(user.cloudinary_id);
    }

  }

  

  const data = {
    name: name,
    phone: phone,
    avatar: result?.secure_url || user.avatar,
    cloudinary_id: result?.public_id || user.cloudinary_id,
  };

  user = await User.findByIdAndUpdate(user._id.toString(), data, {
    new: true,
  });
  // res.json(user);

  return {
    user,
  };

  // let result = null;
  // result = await User.findOne({ email });

  // try {
  //   const updatedUser = await User.findByIdAndUpdate(
  //     id,
  //     {
  //       name,
  //       email,
  //       phoneNumber,
  //       gender,
  //     },
  //     { new: true, runValidators: true } // Options: 'new' returns the updated document, 'runValidators' ensures validation runs on update
  //   );

  //   if (!updatedUser) {
  //     return res.status(404).json({ message: 'User not found' });
  //   }
  // // if (role === 'customer') {
  // // 	result = await User.findOne({ email });
  // // }
  // // if (role === 'admin') {
  // // 	result = await Admin.findOne({ email }).populate('user');
  // // }
  //const result = "Nothing ...";

  return result;
};

// const updateProfile = async (payload: IUser, myFile: any) => {

//   const { name, email, phone, password, role } = payload;

//   const user = await User.isUserExistsByEmail(email);

//   if (user) {
//     throw new ApiError(409, "User already exists");
//   }

//   //const session = await mongoose.startSession();

//   // for verification by Email
//   // make random 6 digit of code
//   const verificationToken = Math.floor(
//     100000 + Math.random() * 900000
//   ).toString();
//   // Expire time in 1 hour
//   //const verificationTokenExpireTime = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
//   const verificationTokenExpireTime = Date.now() + 1 * 60 * 1000; // 1 minute

//   //send image to cloudinary
//     const { secure_url } = await sendImageToCloudinary(email, myFile.path);

//   // create user
//   const newUser = await User.create({
//     name,
//     email,
//     phone,
//     password,
//     role,
//     image: secure_url,
//     verificationToken,
//     verificationTokenExpiresAt: verificationTokenExpireTime,
//   });

//   // send email
//   await sendEmail({
//     to: email,
//     subject: "Your Verification Code",
//     text: verificationToken,
//   });

//   // If failed to create an user
//   if (!newUser) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
//   }

//   return {
//     newUser,
//   };
// };

export const AuthServices = {
  signupUser,
  verifyEmail,
  resendVerifyEmailCode,
  loginUser,
  forgotPassword,
  resetPassword,
  getUsers,
  getMe,
  updateProfile,
};
