// backend/src/routes/experience.ts
import { Router, Request, Response } from "express";
import prisma from "../prisma/prisma";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// GET all experience entries (public, ordered for display)
router.get("/", async (req: Request, res: Response) => {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    res.json(experience);
  } catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({ error: "Failed to fetch experience" });
  }
});

// POST new experience entry (admin only)
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { role, company, duration, description, technologies, highlights, order } = req.body;

    const newExperience = await prisma.experience.create({
      data: {
        role,
        company,
        duration,
        description,
        technologies: JSON.stringify(technologies ?? []),
        highlights: JSON.stringify(highlights ?? []),
        order: order ?? 0,
      },
    });

    res.status(201).json(newExperience);
  } catch (error) {
    console.error("Error creating experience:", error);
    res.status(500).json({ error: "Failed to create experience" });
  }
});

// PUT update experience entry (admin only)
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required" });

    const { role, company, duration, description, technologies, highlights, order } = req.body;

    const updated = await prisma.experience.update({
      where: { id: parseInt(id) },
      data: {
        role,
        company,
        duration,
        description,
        technologies: JSON.stringify(technologies ?? []),
        highlights: JSON.stringify(highlights ?? []),
        order: order ?? 0,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ error: "Failed to update experience" });
  }
});

// DELETE experience entry (admin only)
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required" });

    await prisma.experience.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ error: "Failed to delete experience" });
  }
});

export default router;
