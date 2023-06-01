import express from "express";
import {
  getUserById,
  addUser,
  editUser,
  getNotiById,
  addNoti,
} from "../controllers/UserControllers.js";

const router = express.Router();

router.get("/user/:id", getUserById);
router.post("/user", addUser);
router.put("/user/:id", editUser);
router.get("/noti/:id", getNotiById);
router.post("/noti", addNoti);

export default router;
