import express from "express";
import {
  createIssue,
  getIssuesByProject,
  updateIssue,
  getIssueBySprint,
  getIssueById,
} from "../controllers/IssueControllers.js";

const router = express.Router();

router.get("/issues/:id", getIssuesByProject);
router.get("/sprintissue/:id", getIssueBySprint);
router.get("/issue/:id", getIssueById);
router.post("/issue", createIssue);
router.put("/issue/:id", updateIssue);

export default router;
