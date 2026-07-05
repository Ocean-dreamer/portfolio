// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export interface AuthRequest extends Request {
  user?: { id: number; username: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Cookies received:", req.cookies);
    const token = req.cookies.auth_token;
    console.log("Auth token:", token ? "exists" : "missing");

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    console.log("Attempting to verify token...");
    const decoded = jwt.verify(token, JWT_SECRET!) as { id: number; username: string };
    console.log("Token verified successfully:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};