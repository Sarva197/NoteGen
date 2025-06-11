import User from "../models/userModel.js";
import { createSecretToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import ExpressError from "../utils/ExpressError.js";
import { userLoginSchema, userSignupSchema } from "../validator/schema.js";

// --- SIGNUP CONTROLLER --- //
export const Signup = async (req, res, next) => {

  const { error } = userSignupSchema.validate(req.body);
  if (error) {
    throw new ExpressError(httpStatus.BAD_REQUEST, error.details[0].message);
  }
  const { email, password, username } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ExpressError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const user = await User.create({ email, password, username });
  const token = createSecretToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  const resUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
    token: token,
  };

  return res.status(httpStatus.CREATED).json({
    message: "User signed up successfully",
    success: true,
    resUser,
  });
};

// --- LOGIN CONTROLLER --- //
export const Login = async (req, res, next) => {

  const { error } = userLoginSchema.validate(req.body);

  if(error){
    throw new ExpressError(httpStatus.BAD_REQUEST,error.details[0].message);
  }

  
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ExpressError(httpStatus.BAD_REQUEST, "All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ExpressError(
      httpStatus.UNAUTHORIZED,
      "Incorrect password or email"
    );
  }

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    throw new ExpressError(
      httpStatus.UNAUTHORIZED,
      "Incorrect password or email"
    );
  }

  const token = createSecretToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // update based on your environment
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  const resUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
    token: token,
  };

  return res.status(httpStatus.OK).json({
    message: "User logged in successfully",
    success: true,
    resUser,
  });
};

// --- LOGOUT CONTROLLER --- //
export const Logout = async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res
    .status(httpStatus.OK)
    .json({ message: "User logged out successfully", success: true });
};

// --- GET USER CONTROLLER --- //
export const GetUser = async (req, res, next) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    throw new ExpressError(httpStatus.NOT_FOUND, "User not found");
  }

  const resUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };

  return res.status(httpStatus.OK).json({ resUser, success: true });
};
