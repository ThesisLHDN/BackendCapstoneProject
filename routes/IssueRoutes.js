import express from "express";
import {
  createIssue,
  getIssuesByProject,
  updateIssue,
  getIssueBySprint,
} from "../controllers/IssueControllers.js";

const router = express.Router();

router.get("/issues/:id", getIssuesByProject);
router.get("/sprintissue/:id", getIssueBySprint);
router.post("/issue", createIssue);
router.put("/issue/:id", updateIssue);

export default router;
