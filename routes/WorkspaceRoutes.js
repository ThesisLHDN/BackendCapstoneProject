import express from "express";
import {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  getLastestWorkspace,
  editWorkspace,
  getAdmin,
  getWorkspaceMember,
  removeWorkspaceMember,
  deleteWorkspace,
} from "../controllers/WorkspaceControllers.js";

const router = express.Router();

router.get("/workspaces", getWorkspaces);
router.get("/workspace/:id", getWorkspaceById);
router.get("/lastworkspace/:id", getLastestWorkspace);
router.get("/admin/:id", getAdmin);
router.get("/wsmember/:id", getWorkspaceMember);
router.post("/workspace", createWorkspace);
router.put("/workspace/:id", editWorkspace);
router.delete("/wsmember/:id", removeWorkspaceMember);
router.delete("/workspace/:id", deleteWorkspace);

export default router;
