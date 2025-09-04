import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import asyncHandler from "./asyncHandler.js";


const protect = asyncHandler(async (req, res, next) => {
  
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      req.user = await User.findById(decoded.userID).select("-password");

      console.log(req.cookies.jwt);
      console.log(decoded);

      // If user is not found, throw an error to trigger error handler
      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found.");
      }
      next();
      
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
}); 

export { protect };
