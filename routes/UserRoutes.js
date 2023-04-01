import express from "express";
import { getUserById, addUser } from "../controllers/UserControllers.js";

const router = express.Router();

router.get("/user/:id", getUserById);
router.post("/user", addUser);

export default router;
