import express from "express";
import { login, signup, resetPassword, forgetPassword, verifyOtp  } from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.post("/signup", signup);
authRoutes.post("/verify-otp", verifyOtp)
authRoutes.post("/forget-password", forgetPassword)
authRoutes.post("/reset-password", resetPassword)

export default authRoutes