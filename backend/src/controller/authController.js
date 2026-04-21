import { User } from "../models/userSchema.js";

const login = (req, res) => {
    res.status(200).json({
        status: true,
        message: "login successfull!"
    })
};

const signup = async (req, res) => {
    try {
        const { username, email, password, age } = req.body

        await User.create(req.body);

        res.status(200).json({
            status: true,
            message: "signup successfull!"
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

export {login, signup}