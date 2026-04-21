import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const connectDB = async () => {
    let con = await mongoose.connect(process.env.MONGO_URI)
    console.log("DB is connected",con.connection.host)
}