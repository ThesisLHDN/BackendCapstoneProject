import express from "express";
import {
  getWorkload,
  getBurndown,
  getCumulative,
} from "../controllers/DashboardControllers.js";

const router = express.Router();

router.get("/workload/:id", getWorkload);
router.get("/burndown/:id", getBurndown);
router.get("/cumulative/:id", getCumulative);

export default router;
