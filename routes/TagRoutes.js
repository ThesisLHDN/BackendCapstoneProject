import express from "express";
import {
  getTagsByIssue,
  createTag,
  deleteTag,
} from "../controllers/TagControllers.js";

const router = express.Router();

router.get("/tags/:id", getTagsByIssue);
router.post("/tag", createTag);
router.delete("/tag/:id", deleteTag);

export default router;
