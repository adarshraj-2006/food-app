import express from "express";
import { loginUser, registerUser, listUsers } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/list", authMiddleware, adminAuth, listUsers);

export default userRouter;
