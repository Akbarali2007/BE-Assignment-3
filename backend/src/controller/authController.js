import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error("All fields are required!");

    let myUser = await User.findOne({ email: email });
    console.log(myUser);

    if (!myUser) throw new Error("User not found");

    bcrypt.compare(password, myUser.password, function (err, result) {
     try {
       if (result) {
        const token = jwt.sign(
          { email: myUser.email, id: myUser._id }, 
          process.env.JWT_SECRET_KEY,                                                   
          {expiresIn: 1 * 60}                                      
        );
        successResponse(res,200,true,"User logged In  Successfully",myUser,token,);
      }else {
        throw new Error("Invalid Credentials")
      }
     } catch (error) {
      next(error)
     }
    });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
    try {
        const { username, email, password, age } = req.body

        await User.create(req.body);

        res.status(200).json({
            status: true,
            message: "signup successfull!"
        })
    bcrypt.hash(password, 12, async function (err, hash) {

      await User.create({
        ...req.body,
        password: hash,
      });
    });
  } catch (error) {
    next(error);
  }
}

export {login, signup}