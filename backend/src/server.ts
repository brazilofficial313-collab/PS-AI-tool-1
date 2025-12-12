import express from "express";
import cors from "cors";
import helmet from "helmet";
import { json } from "body-parser";
import { prisma } from "./config/db";
import { redis } from "./config/redis";

// Routes import (abhi empty, baad me fill karenge)
import router from "./routes";

export async function startServer() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(json());

  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "PS AI Tool Backend Running"
    });
  });

  app.use("/api/v1", router);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
          }
