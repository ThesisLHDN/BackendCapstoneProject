import express from "express";
import {
  startSprint,
  getSprints,
  completeSprint,
  updateSprint,
  getLastestSprint,
} from "../controllers/SprintControllers.js";

const router = express.Router();

router.get("/sprints/:pId", getSprints);
router.get("/lastsprint/:pId", getLastestSprint);
router.post("/sprint", startSprint);
router.put("/editsprint/:id", updateSprint);
router.put("/sprint/:id", completeSprint);

export default router;
