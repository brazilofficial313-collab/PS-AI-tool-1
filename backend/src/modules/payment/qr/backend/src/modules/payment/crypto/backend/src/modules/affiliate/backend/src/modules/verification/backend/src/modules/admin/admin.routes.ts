import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json({ route: "admin" });
});

export default router;
