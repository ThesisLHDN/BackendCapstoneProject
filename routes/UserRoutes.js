import express from "express";
import {
  getUserById,
  addUser,
  editUser,
} from "../controllers/UserControllers.js";

const router = express.Router();

router.get("/user/:id", getUserById);
router.post("/user", addUser);
router.put("/user", editUser);

export default router;
