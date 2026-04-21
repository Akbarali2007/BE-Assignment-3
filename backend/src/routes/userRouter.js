import { getuser } from "../controller/userController.js";
import express from "express"

const userRoutes = express.Router()

userRoutes.get("/", getuser);

export default userRoutes;