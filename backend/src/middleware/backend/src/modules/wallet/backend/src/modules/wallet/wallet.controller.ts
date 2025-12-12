import { Request, Response } from "express";
import * as WalletService from "./wallet.service";

export async function getBalance(req: any, res: Response) {
  try {
    const data = await WalletService.getBalance(req.user.id);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function getTransactions(req: any, res: Response) {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const data = await WalletService.getTransactions(req.user.id, +limit, +offset);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function transfer(req: any, res: Response) {
  try {
    const data = await WalletService.transfer(
      req.user.id,
      req.body.receiver_email,
      req.body.amount,
      req.body.description
    );
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
}
