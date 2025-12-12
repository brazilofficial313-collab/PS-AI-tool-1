import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

prisma.$connect()
  .then(() => console.log("🟢 Prisma DB connected"))
  .catch((err) => console.error("🔴 Prisma DB connection error:", err));
