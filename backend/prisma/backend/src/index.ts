import { startServer } from "./server";
import dotenv from "dotenv";

dotenv.config();

startServer().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
