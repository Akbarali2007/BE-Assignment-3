import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid";

import { sendEmailOTP } from "../services/sendEmail.js";

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
            { expiresIn: 1 * 60 }
          );
          successResponse(res, 200, true, "User logged In  Successfully", myUser, token,);
        } else {
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
      const otp = uuidv4().slice(0, 4); // 8751987891dsafaqera
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

      console.log("My otp ==> ", otp);
      await sendEmailOTP(email, otp);

      await User.create({
        ...req.body,
        password: hash,
        otp,
        otpExpiry,
      });
    });
  } catch (error) {
    next(error);
  }
}
const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found!");

    if (user.otp !== otp) throw new Error("Invalid OTP");

    if (user.otpExpiry < new Date()) throw new Error("OTP Expired");

    user.otp = null;
    user.otpExpiry = null;
    user.isVerified = true;

    await user.save();

    successResponse(res, 200, true, "Email verified  Successfully");
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found!");

    const otp = uuidv4().slice(0, 4); // 8751987891dsafaqera
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();
    await sendEmailOTP(email, otp);

    successResponse(res, 200, true, "otp sent Successfully");
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found!");

    if (user.otp !== otp) throw new Error("Invalid OTP");

    if (user.otpExpiry < new Date()) throw new Error("OTP Expired!");

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    successResponse(res, 200, true, "reset password Successfully");
  } catch (error) {
    next(error);
  }
};

export { login, signup, verifyOtp, forgetPassword, resetPassword }