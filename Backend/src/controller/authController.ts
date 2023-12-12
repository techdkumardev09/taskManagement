import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel";

// Create an array to store revoked tokens
const tokenBlacklist = [];

console.log(process.env.JWT_TOKEN, "code");

type RequestType = {
  username: string;
  password: string;
};

const authController = {
  async login(req: Request<RequestType>, res: any) {
    const { username, password } = req.body;
    try {
      const user:any = await User.findOne({ username: username });
      const isPasswordChecked = await bcrypt.compare(password,user.password);

      if (!isPasswordChecked) {
        return res
          .status(404)
          .json({ errorMessage: "password is not matched" });
      }
      const token = jwt.sign({ username }, `${process.env.JWT_TOKEN}`, {
        expiresIn: "5h",
      });

      // Set the cookie and send the response in one go
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expiresIn: "10h",
        })
        .status(200)
        .json({ token });
    } catch (err) {
      res.status(500).json(err);
    }
  },

 
};

// Export the tokenBlacklist array so that it can be used in other parts of your application
export { tokenBlacklist };
export default authController;
