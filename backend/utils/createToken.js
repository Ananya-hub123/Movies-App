import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log("=== TOKEN CREATION DEBUG ===");
  console.log("Token created for userId:", userId);
  console.log("Token value:", token);

  // Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false, // Set to false for development/testing
    sameSite: "lax", // More permissive than strict
    maxAge: 30 * 24 * 60 * 60 * 1000,
    domain: process.env.NODE_ENV === "production" ? ".railway.app" : undefined, // Allow cross-domain cookies
  });

  console.log("Cookie set successfully");
  console.log("========================");

  return token;
};

export default generateToken;
