import express from "express";
import {
  createIssue,
  getIssuesByProject,
  updateIssue,
  getIssueBySprint,
  getIssueById,
  deleteIssue,
  filterIssues,
  sortIssues,
} from "../controllers/IssueControllers.js";

const router = express.Router();

router.get("/issues/:id", getIssuesByProject);
router.get("/sprintissue/:id", getIssueBySprint);
router.get("/issue/:id", getIssueById);
router.post("/issue", createIssue);
router.put("/issue/:id", updateIssue);
router.delete("/issue/:id", deleteIssue);
router.post("/filter/:id", filterIssues);
router.post("/sort/:id", sortIssues);

export default router;
