import express from "express";
import {
  getTagsByIssue,
  getTagsByProject,
  createTag,
  deleteTag,
} from "../controllers/TagControllers.js";

const router = express.Router();

router.get("/tags/:id", getTagsByIssue);
router.get("/ptags/:id", getTagsByProject);
router.post("/tag", createTag);
router.delete("/tag/:id", deleteTag);

export default router;
