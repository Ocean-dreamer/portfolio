// backend/src/routes/education.ts
import { Router, Request, Response } from "express";
import prisma from "../prisma/prisma";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// GET all education entries
router.get("/", async (req: Request, res: Response) => {
  try {
    const education = await prisma.education.findMany({
      orderBy: { startYear: "desc" },
    });
    res.json(education);
  } catch (error) {
    console.error("Error fetching education:", error);
    res.status(500).json({ error: "Failed to fetch education" });
  }
});

// POST new education entry
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { degree, institution, startYear, endYear, description } = req.body;

    const newEducation = await prisma.education.create({
      data: {
        degree,
        institution,
        startYear,
        endYear: endYear || null,
        description: description || null,
      },
    });

    res.status(201).json(newEducation);
  } catch (error) {
    console.error("Error creating education:", error);
    res.status(500).json({ error: "Failed to create education" });
  }
});

// PUT update education entry
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const { degree, institution, startYear, endYear, description } = req.body;

    const updatedEducation = await prisma.education.update({
      where: { id: parseInt(id) },
      data: {
        degree,
        institution,
        startYear,
        endYear: endYear || null,
        description: description || null,
      },
    });

    res.json(updatedEducation);
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({ error: "Failed to update education" });
  }
});

// DELETE education entry
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    await prisma.education.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Education deleted successfully" });
  } catch (error) {
    console.error("Error deleting education:", error);
    res.status(500).json({ error: "Failed to delete education" });
  }
});

export default router;