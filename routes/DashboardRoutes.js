import express from "express";
import { getWorkload } from "../controllers/DashboardControllers.js";

const router = express.Router();

router.get("/workload/:id", getWorkload);

export default router;
