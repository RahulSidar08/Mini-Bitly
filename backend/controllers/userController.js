import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
import { User } from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    let newUser = await User.create({
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User Register Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: true,
      message: "Something went wrong",
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Does not exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.secrete_key, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None", // required for cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `User loggedIn Successfully`,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: true,
      message: "Something went wrong",
      error,
    });
  }
};
