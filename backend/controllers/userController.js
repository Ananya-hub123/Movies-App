import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  console.log("=== LOGIN DEBUG ===");
  console.log("Request body:", req.body);
  
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Missing email or password");
    res.status(400);
    throw new Error("Please enter email and password");
  }

  const existingUser = await User.findOne({ email });
  console.log("Found user:", existingUser ? existingUser.email : "Not found");

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    
    console.log("Password valid:", isPasswordValid);

    if (isPasswordValid) {
      console.log("Creating token for user:", existingUser.username);
      const token = createToken(res, existingUser._id);
      
      const responseData = {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        token: token, // Also send token in response for debugging
      };
      
      console.log("Login response data:", responseData);
      res.status(201).json(responseData);
    } else {
      console.log("Invalid password");
      res.status(401).json({ message: "Invalid Password" });
    }
  } else {
    console.log("User not found");
    res.status(401).json({ message: "User not found" });
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  console.log("Getting all users...");
  try {
    const users = await User.find({});
    console.log("Found users:", users.length);
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Error getting users", error: error.message });
  }
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
};
