import { app } from "./src/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv"
import { connectDB } from "./src/config/db.js";

dotenv.config()
const PORT = process.env.PORT || 5600;

app.listen(PORT, () => {
    console.log(`server is listening on port : ${PORT}`)
    connectDB()
})