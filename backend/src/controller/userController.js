import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken"

export const getuser = async (req, res, next) => {
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
};

export const updateUser = async (req, res, next) => {
    try {
        const updateUserDetails = req.body;
        const token = req.headers.authorization.split(" ")[1]


        if(!token) throw new Error("token not provided")

            const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
            console.log(decodeToken)
         let user =  await User.findByIdAndUpdate(decodeToken.id, updateUserDetails)
        successResponse(res, 200, true, "update user successfully!", user )

    } catch (error) {
        next(error)
    }
};