import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));

  try {
    const validToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = validToken;
    next();
  } catch (err) {
    return next(errorHandler(403, "Forbidden"));
  }
};
