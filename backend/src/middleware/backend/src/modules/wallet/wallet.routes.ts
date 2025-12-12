import { Router } from "express";
import * as WalletController from "./wallet.controller";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

// PROTECTED ROUTES
router.get("/balance", authMiddleware, WalletController.getBalance);
router.get("/transactions", authMiddleware, WalletController.getTransactions);
router.post("/transfer", authMiddleware, WalletController.transfer);

export default router;
