// backend/src/routes/projects.ts
// backend/src/routes/projects.ts
import { Router, Request, Response } from "express";
import prisma from "../prisma/prisma";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// GET all projects
router.get("/", async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    // Parse technologies from JSON string
    const parsedProjects = projects.map((project: typeof projects[number]) => ({
      ...project,
      technologies: JSON.parse(project.technologies),
    }));
    
    res.json(parsedProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// POST new project
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description, status, technologies, link } = req.body;

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        status,
        technologies: JSON.stringify(technologies), // Store as JSON string
        link: link || null,
      },
    });

    res.status(201).json({
      ...newProject,
      technologies: JSON.parse(newProject.technologies),
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// PUT update project
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const { title, description, status, technologies, link } = req.body;

    const updatedProject = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        status,
        technologies: JSON.stringify(technologies),
        link: link || null,
      },
    });

    res.json({
      ...updatedProject,
      technologies: JSON.parse(updatedProject.technologies),
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// DELETE project
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    await prisma.project.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;