import express from "express";
import {
  getProjects,
  createProject,
  getProjectById,
  addProjectMember,
  editProject,
  getProjectMembers,
  deleteProject,
  deleteProjectMember,
} from "../controllers/ProjectControllers.js";

const router = express.Router();

router.get("/projects/:id", getProjects);
router.get("/project/:id", getProjectById);
router.get("/pmembers/:id", getProjectMembers);
router.post("/project", createProject);
router.post("/pmember", addProjectMember);
router.put("/project/:id", editProject);
router.delete("/project/:id", deleteProject);
router.delete("/pmember/:id", deleteProjectMember);

export default router;
