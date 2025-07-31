import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "@/features/user/models/user-model";
import { HTTP_CODE } from "@/http/constants";
import { AUTH_MESSAGES } from "@/constants/messages";
import { EMAIL_PATTERN } from "@/patterns";
import CONFIG from "@/config";

const SALT_ROUNDS: number = 10;
const setAuthCookie = (res: Response, token: string) => {
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export const postRegister = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_CODE.BAD_REQUEST).json({
      message: AUTH_MESSAGES.MISSING_FIELDS,
    });
  }

  if (!email.match(EMAIL_PATTERN)) {
    return res.status(HTTP_CODE.BAD_REQUEST).json({
      message: AUTH_MESSAGES.INVALID_EMAIL,
    });
  }

  if (password.length < 6 || password.length > 512) {
    return res.status(HTTP_CODE.BAD_REQUEST).json({
      message: AUTH_MESSAGES.INVALID_PASSWORD,
    });
  }

  try {
    const existingUser = await UserModel.findOne({ email }).exec();

    if (existingUser) {
      return res.status(HTTP_CODE.CONFLICT).json({
        message: AUTH_MESSAGES.USER_EXISTS,
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new UserModel({
      email: email.trim(),
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, CONFIG.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    setAuthCookie(res, token);

    res.status(HTTP_CODE.CREATED).json({
      message: AUTH_MESSAGES.USER_REGISTERED,
    });
  } catch (error) {
    console.error(error);
    res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({
      message: AUTH_MESSAGES.SERVER_ERROR,
    });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_CODE.BAD_REQUEST).json({
      message: AUTH_MESSAGES.MISSING_FIELDS,
    });
  }

  if (password.length < 6 || password.length > 256) {
    return res.status(HTTP_CODE.BAD_REQUEST).json({
      message: AUTH_MESSAGES.INVALID_PASSWORD,
    });
  }

  try {
    const user = await UserModel.findOne({ email: email.trim() }).exec();

    if (!user) {
      return res.status(HTTP_CODE.UNAUTHORIZED).json({
        message: AUTH_MESSAGES.INVALID_CREDENTIALS,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(HTTP_CODE.UNAUTHORIZED).json({
        message: AUTH_MESSAGES.INVALID_CREDENTIALS,
      });
    }

    const token = jwt.sign({ userId: user._id }, CONFIG.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    console.log("calisti");

    setAuthCookie(res, token);

    return res.status(HTTP_CODE.OK).json({
      message: AUTH_MESSAGES.SIGNIN_SUCCESS,
      data: { _id: user._id },
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({
      message: AUTH_MESSAGES.SERVER_ERROR,
    });
  }
};

export const postLogout = (req: Request, res: Response) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
    path: "/",
  });

  return res.status(HTTP_CODE.OK).json({
    message: AUTH_MESSAGES.SIGNOUT_SUCCESS,
  });
};
