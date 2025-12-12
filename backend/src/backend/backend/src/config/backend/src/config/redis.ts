import { createClient } from "redis";
import { env } from "./env";

export const redis = createClient({
  url: env.redisUrl,
});

redis.on("connect", () => console.log("🟢 Redis connected"));
redis.on("error", (err) => console.error("🔴 Redis error:", err));

redis.connect();
