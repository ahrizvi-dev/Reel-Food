import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// iss controller mein hum user registration ka logic likhenge
export const registerUser = async (req, res) => {
  // request body se fullname, email aur password nikal lo
  const { fullname, email, password } = req.body;

  const isUserAlreadyRegistered = await userModel.findOne({
    email: email,
  });

  // agar user already registered hai to error bhej do
  if (isUserAlreadyRegistered.length > 0) {
    return res.status(400).json({
      success: false,
      message: "User already registered",
    });
  }

  // agar user registered nahi hai to naya user create kar do lekin password hash karke
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    fullname,
    email,
    password: hashedPassword,
  });

  // user create ho gaya hai to uska token generate kar do
  const token = jwt.sign(
    {
      userId: user._id,
    },
    "1e766acad00eb009de5ece3a20624276d66faaf0"
  );

  // token ko cookie mein bhej do

  res.cookie("token", token);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      fullname: user.fullname,
      email: user.email,
      id: user._id,
    },
  });
};

// iss controller mein hum user login ka logic likhenge
export const loginUser = async (req, res) => {};
