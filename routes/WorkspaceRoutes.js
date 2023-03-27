import express from "express";
import {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  getLastestWorkspace,
} from "../controllers/WorkspaceControllers.js";

const router = express.Router();

router.get("/workspaces", getWorkspaces);
router.get("/workspace/:id", getWorkspaceById);
router.get("/lastworkspace/:id", getLastestWorkspace);
router.post("/workspace", createWorkspace);

export default router;
