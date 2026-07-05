// backend/src/routes/irican.ts
import { Router, Request, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import prisma from "../prisma/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// (EDIT - add login 

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET:", JWT_SECRET);
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
// POST /irican/reset_password → send token
router.post("/reset_password", async (req: Request, res: Response) => {
  try {
    const { identifier } = req.body; // username or email
    if (!identifier) return res.status(400).json({ success: false });

    const admin = await prisma.admin.findFirst({
      where: {
        OR: [
          { username: identifier },
          { email: identifier },
        ],
      },
    });

    if (!admin) return res.status(200).json({ success: true }); // do not reveal existence

    // Generate token
    const token = crypto.randomBytes(20).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);
    const expiry = new Date(Date.now() + 1000 * 60 * 30); // 30 min

    await prisma.admin.update({
      where: { id: admin.id },
      data: { resetToken: hashedToken, resetTokenExpiry: expiry },
    });

    console.log("Password reset token (use this in URL):", token);

    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
});

// POST /irican/reset_password/confirm → set new password
router.post("/reset_password/confirm", async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ success: false });

    const admin = await prisma.admin.findFirst({
      where: { resetToken: { not: null }, resetTokenExpiry: { gte: new Date() } },
    });

    if (!admin) return res.status(400).json({ success: false });

    const isValid = await bcrypt.compare(token, admin.resetToken!);
    if (!isValid) return res.status(400).json({ success: false });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null },
    });

    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
});




// POST /irican → LOGIN (ADD THIS ENTIRE ROUTE)
router.post("/", async (req: Request, res: Response) => {
  try {
    const { password, usernameOrEmail } = req.body;
    console.log("Login attempt:", { usernameOrEmail, password: "***" });

    if (!password || !usernameOrEmail) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const admin = await prisma.admin.findFirst({
      where: {
        OR: [
          { username: usernameOrEmail },
          { email: usernameOrEmail },
        ],
      },
    });

    console.log("Admin found:", admin ? "YES" : "NO");
    if (admin) {
      console.log("Admin username:", admin.username); // ADD THIS
      console.log("Admin email:", admin.email); // ADD THIS
    }


    if (!admin) {
      console.log("Admin not found");
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    console.log("Password valid:", isValid); // ADD THIS
    if (!isValid) {
      console.log("Invalid password"); // ADD THIS
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET!,  // Add the ! here
      { expiresIn: "7d" }
    );

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: isProd, // must be true in production (HTTPS) for sameSite: "none" to work
      sameSite: isProd ? "none" : "lax", // "none" needed for cross-domain (Vercel <-> Render/Railway)
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST /irican/logout → LOGOUT (ADD THIS ENTIRE ROUTE)
router.post("/logout", (req: Request, res: Response) => {
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });
  return res.json({ success: true, message: "Logged out" });
});

router.get("/check", authMiddleware, (req: AuthRequest, res: Response) => {
  return res.json({ success: true, user: req.user });
});

export default router;
