import express from "express";
import {
  getWorkload,
  getBurndown,
} from "../controllers/DashboardControllers.js";

const router = express.Router();

router.get("/workload/:id", getWorkload);
router.get("/burndown/:id", getBurndown);

export default router;
