// backend/src/routes/skills.ts
import { Router, Request, Response } from "express";
import prisma from "../prisma/prisma";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// GET all skills
router.get("/", async (req: Request, res: Response) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { category: "asc" },
    });
    res.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

// POST new skill
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, category, level, color, iconPath } = req.body;

    const newSkill = await prisma.skill.create({
      data: {
        name,
        category,
        level: parseInt(level),
        color,
        iconPath: iconPath || null,
      },
    });

    res.status(201).json(newSkill);
  } catch (error) {
    console.error("Error creating skill:", error);
    res.status(500).json({ error: "Failed to create skill" });
  }
});

// PUT update skill
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const { name, category, level, color, iconPath } = req.body;

    const updatedSkill = await prisma.skill.update({
      where: { id: parseInt(id) },
      data: {
        name,
        category,
        level: parseInt(level),
        color,
        iconPath: iconPath || null,
      },
    });

    res.json(updatedSkill);
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).json({ error: "Failed to update skill" });
  }
});

// DELETE skill
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    await prisma.skill.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ error: "Failed to delete skill" });
  }
});

export default router;