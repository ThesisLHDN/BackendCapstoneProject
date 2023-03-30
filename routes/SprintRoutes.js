import express from "express";
import {
  startSprint,
  getSprints,
  completeSprint,
  getLastestSprint,
} from "../controllers/SprintControllers.js";

const router = express.Router();

router.get("/sprints/:pId", getSprints);
router.get("/lastsprint/:pId", getLastestSprint);
router.post("/sprint", startSprint);
router.put("/sprint/:id", completeSprint);

export default router;
