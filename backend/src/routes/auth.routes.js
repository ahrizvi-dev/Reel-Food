import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodpartner,
  loginFoodpartner,
  logoutFoodpartner,
} from "../controllers/auth.controller.js";

const router = express.Router();


// USER RIUTES 
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);
// USER FOOD PARTNER ROUTES
router.post("/partner/register", registerFoodpartner);
router.post("/partner/login", loginFoodpartner);
router.get("/partner/logout", logoutFoodpartner);

export default router;
