// frontend/src/routes/certifications.ts
// backend/src/routes/certifications.ts
import { Router, Request, Response } from "express";
import prisma from "../prisma/prisma";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// GET all certifications
router.get("/", async (req: Request, res: Response) => {
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: { date: "desc" },
    });
    res.json(certifications);
  } catch (error) {
    console.error("Error fetching certifications:", error);
    res.status(500).json({ error: "Failed to fetch certifications" });
  }
});

// POST new certification
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, issuer, date, description, image, link } = req.body;

    const newCertification = await prisma.certification.create({
      data: {
        title,
        issuer,
        date: new Date(date),
        description,
        image,
        link: link || null,
      },
    });

    res.status(201).json(newCertification);
  } catch (error) {
    console.error("Error creating certification:", error);
    res.status(500).json({ error: "Failed to create certification" });
  }
});

// PUT update certification
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const { title, issuer, date, description, image, link } = req.body;

    const updatedCertification = await prisma.certification.update({
      where: { id: parseInt(id) },
      data: {
        title,
        issuer,
        date: new Date(date),
        description,
        image,
        link: link || null,
      },
    });

    res.json(updatedCertification);
  } catch (error) {
    console.error("Error updating certification:", error);
    res.status(500).json({ error: "Failed to update certification" });
  }
});

// DELETE certification
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    await prisma.certification.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Certification deleted successfully" });
  } catch (error) {
    console.error("Error deleting certification:", error);
    res.status(500).json({ error: "Failed to delete certification" });
  }
});

export default router;