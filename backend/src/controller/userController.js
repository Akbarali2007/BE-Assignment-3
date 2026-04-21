import { User } from "../models/userSchema.js";

export const getuser = async (req, res) => {
    try {
        const {limit, skip, sort} = req.query

        const user = await User.find().limit(limit).skip(skip).sort(sort)
        res.status(200).json({
            status: true,
            message: "data recevied successfull!",
            data: user
        })
    } catch (error) {
        req.status(510).json({
            status: false,
            message: error.message
        })
    }
}