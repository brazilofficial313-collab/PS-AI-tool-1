import { Router } from "express";

// Abhi modules empty hain — next steps me fill honge
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/users.routes";
import walletRoutes from "./modules/wallet/wallet.routes";
import qrPaymentRoutes from "./modules/payment/qr/qr.routes";
import cryptoPaymentRoutes from "./modules/payment/crypto/crypto.routes";
import affiliateRoutes from "./modules/affiliate/affiliate.routes";
import verifyRoutes from "./modules/verification/verify.routes";
import adminRoutes from "./modules/admin/admin.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/wallet", walletRoutes);
router.use("/payment/qr", qrPaymentRoutes);
router.use("/payment/crypto", cryptoPaymentRoutes);
router.use("/affiliate", affiliateRoutes);
router.use("/verify", verifyRoutes);
router.use("/admin", adminRoutes);

export default router;
