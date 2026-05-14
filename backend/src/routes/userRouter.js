import { getuser, updateUser } from "../controller/userController.js";
import express from "express"

const userRoutes = express.Router()

userRoutes.get("/", getuser);
userRoutes.put("/", updateUser);

export default userRoutes;