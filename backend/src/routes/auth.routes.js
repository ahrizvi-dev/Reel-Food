import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import e from "express";
const router = express.Router();

router.post("/user/register", registerUser);


export default router;