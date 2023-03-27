import express from "express";
import {
  getProjects,
  createProject,
} from "../controllers/ProjectControllers.js";

const router = express.Router();

router.get("/projects/:id", getProjects);
router.post("/project", createProject);

export default router;
