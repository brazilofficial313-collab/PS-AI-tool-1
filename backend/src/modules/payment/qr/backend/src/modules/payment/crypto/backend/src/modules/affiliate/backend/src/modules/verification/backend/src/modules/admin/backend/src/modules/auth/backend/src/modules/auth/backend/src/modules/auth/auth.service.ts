import { prisma } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { v4 as uuid } from "uuid";

export async function register(data: any) {
  const { email, password } = data;

  const exists = await prisma.users.findUnique({ where: { email } });
  if (exists) throw new Error("Email already registered");

  const password_hash = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      id: uuid(),
      email,
      password_hash,
      tier: "free",
      referral_code: `REF-${Math.floor(100000 + Math.random() * 900000)}`
    },
  });

  return {
    user,
    tokens: generateTokens(user.id),
  };
}

export async function login(data: any) {
  const { email, password } = data;

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new Error("Invalid password");

  return {
    user,
    tokens: generateTokens(user.id),
  };
}

export async function refresh(refreshToken: string) {
  try {
    const decoded: any = jwt.verify(refreshToken, env.jwtRefreshSecret);
    return { tokens: generateTokens(decoded.userId) };
  } catch {
    throw new Error("Invalid refresh token");
  }
}

function generateTokens(userId: string) {
  const accessToken = jwt.sign({ userId }, env.jwtAccessSecret, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, env.jwtRefreshSecret, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
}
