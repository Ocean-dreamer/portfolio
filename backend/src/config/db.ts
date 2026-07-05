import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Optionally connect immediately & handle errors
const connectDB = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit if DB connection fails
  }
};

export { prisma, connectDB };
