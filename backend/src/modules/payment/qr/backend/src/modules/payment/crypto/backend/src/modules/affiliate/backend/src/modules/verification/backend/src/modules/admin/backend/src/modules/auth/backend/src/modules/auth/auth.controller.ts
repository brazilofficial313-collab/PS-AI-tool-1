import { Request, Response } from "express";
import * as AuthService from "./auth.service";

export async function register(req: Request, res: Response) {
  try {
    const data = await AuthService.register(req.body);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const data = await AuthService.login(req.body);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const data = await AuthService.refresh(req.body.refreshToken);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function me(req: any, res: Response) {
  res.json({ success: true, user: req.user });
}
