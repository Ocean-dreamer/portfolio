// backend/src/routes/stats.ts (NEW FILE)
import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import prisma from "../prisma/prisma";

const router = Router();

router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const [projects, skills, certifications, blogPosts] = await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.certification.count(),
      prisma.blogPost.count(),
    ]);

    return res.json({
      projects,
      skills,
      certifications,
      blogPosts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;