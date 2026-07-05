// backend/src/routes/contact.ts
import { Router, Request, Response } from "express";
import { sendContactEmail } from "../utils/sendEmail";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    await sendContactEmail({ name, email, message });
    res.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      message: "Could not send message right now. Please email directly instead.",
    });
  }
});

export default router;
