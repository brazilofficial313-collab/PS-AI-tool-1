import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT ?? "5000",
  dbUrl: process.env.DATABASE_URL ?? "",
  redisUrl: process.env.REDIS_URL ?? "",
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? "",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? "",
  qrKey: process.env.QR_ENCRYPTION_KEY ?? "",
};
