// backend/src/app.ts
// The Express app itself, with no app.listen() - shared between local dev
// (src/index.ts) and the Vercel serverless entry (api/index.ts).
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import statsRouter from "./routes/stats";
import iricanRouter from "./routes/irican";
import educationRouter from "./routes/education";
import skillsRoutes from "./routes/skills";
import projectsRouter from "./routes/projects";
import certificationsRouter from "./routes/certifications";
import experienceRouter from "./routes/experience";
import profileRouter from "./routes/profile";
import contactRouter from "./routes/contact";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/irican", iricanRouter);
app.use("/api/stats", statsRouter);
app.use("/api/education", educationRouter);
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRouter);
app.use("/api/certifications", certificationsRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/profile", profileRouter);
app.use("/api/contact", contactRouter);

export default app;
