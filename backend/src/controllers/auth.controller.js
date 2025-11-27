import userModel from "../models/user.model.js";
import foodPartnerModel from "../models/foodpartner.model.js";
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
  if (isUserAlreadyRegistered) {
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
    process.env.JWT_SECRET
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
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });

  // agar user nahi mila to error bhej do
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  isPasswordMatched = await bcrypt.compare(password, user.password);

  // agar password match nahi karta to error bhej do
  if (!isPasswordMatched) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // agar user mil gaya aur password bhi match kar gaya to token generate kar do
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET
  );

  // token ko cookie mein bhej do
  res.cookie("token", token);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

export const registerFoodpartner = async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required",
    });
  }

  const isPartnerAlreadyRegistered = await foodPartnerModel.findOne({
    email,
  });

  if (isPartnerAlreadyRegistered) {
    res.status(400).json({
      success: false,
      message: "Food Partner already registered",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    message: "Food Partner registered successfully",
  });

  const token = jwt.sign(
    {
      foodPartnerId: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    success: true,
    message: "Food Partner registered successfully",
  });
};

export const loginFoodpartner = async (req, res) => {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({ email });
  if (!foodPartner) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    foodPartner.password
  );
  if (!isPasswordMatched) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      foodPartnerId: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
  res.status(200).json({
    success: true,
    message: "Food Partner logged in successfully",
  });
};

export const logoutFoodpartner = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Food Partner logged out successfully",
  });
}
