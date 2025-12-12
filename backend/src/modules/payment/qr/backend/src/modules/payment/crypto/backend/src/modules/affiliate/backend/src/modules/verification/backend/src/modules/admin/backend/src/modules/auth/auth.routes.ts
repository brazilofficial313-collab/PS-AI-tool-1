import { Router } from "express";
import * as AuthController from "./auth.controller";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

// PUBLIC ROUTES
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);

// PRIVATE ROUTE
router.get("/me", authMiddleware, AuthController.me);

export default router;
