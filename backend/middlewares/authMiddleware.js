import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";

// Check if the user is authenticated or not
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie first
  token = req.cookies.jwt;
  
  // If no cookie, check Authorization header
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1]; // Bearer TOKEN
  }

  console.log("Auth middleware - token:", token ? "exists" : "none");
  console.log("Auth middleware - token source:", req.cookies.jwt ? "cookie" : req.headers.authorization ? "header" : "none");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      console.log("Auth middleware - user found:", req.user.username);
      next();
    } catch (error) {
      console.log("Auth middleware - token failed:", error.message);
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    console.log("Auth middleware - no token found");
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Check if the user is admin or not
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

export { authenticate, authorizeAdmin };
