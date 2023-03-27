import express from "express";
import { addUser } from "../controllers/UserControllers.js";

const router = express.Router();

router.post("/user", addUser);

export default router;
