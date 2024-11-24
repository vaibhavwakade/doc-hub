import { asyncHandler } from "../utils/asyncHandler.js";
import Jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import User from "../model/user.model.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      return new ApiError(401, "Unauthorized request");
    }

    const decodedToken = Jwt.verify(token, config.jwtAccessSecret);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized request", err: error });
  }
});
