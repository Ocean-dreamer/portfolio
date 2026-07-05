// backend/src/routes/profile.ts
import { Router, Request, Response } from "express";
import prisma from "../prisma/prisma";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

// GET public profile (no auth - this is what the homepage displays)
router.get("/", async (req: Request, res: Response) => {
  try {
    const admin = await prisma.admin.findFirst({
      select: {
        name: true,
        title: true,
        bio: true,
        phone: true,
        location: true,
        github: true,
        linkedin: true,
        twitter: true,
        email: true,
      },
    });

    if (!admin) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(admin);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// PUT update profile (admin only)
router.put("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { name, title, bio, phone, location, github, linkedin, twitter } = req.body;

    const updated = await prisma.admin.update({
      where: { id: req.user.id },
      data: { name, title, bio, phone, location, github, linkedin, twitter },
    });

    res.json({
      name: updated.name,
      title: updated.title,
      bio: updated.bio,
      phone: updated.phone,
      location: updated.location,
      github: updated.github,
      linkedin: updated.linkedin,
      twitter: updated.twitter,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
