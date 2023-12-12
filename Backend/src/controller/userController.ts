import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

export type RequestType = {
  username: string;
  password: string;
};
const userController = {
  async signUp(req: Request<RequestType>, res: Response) {
    try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(404)
          .send({ errorMessage: "User with the same username already exists" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({
        username: username,
        password: hash,
      });

      await newUser.save();
      return res
        .status(200)
        .send({ data: "User has been created Successfully!!" });
    } catch (error) {
      return res.status(500).json({ errorMessage: "Something went wrong" });
    }
  },
  async login(req: Request<RequestType>, res: any) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username: username });
      if (!user)
        return res
          .status(404)
          .json({ errorMessage: "Username does not exists" });
      const isPasswordChecked = await bcrypt.compare(password, user.password);
  
      if (!isPasswordChecked) {
        return res
          .status(404)
          .json({ errorMessage: "Password does not matched" });
      }
      const token = jwt.sign({ username }, `${process.env.JWT_TOKEN}`, {
        expiresIn: "5h",
      });
  
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expiresIn: "10h",
        })
        .status(200)
        .json({ token });
    } catch (err) {
      console.log("Check error", err);
  
      res.status(500).json(err);
    }
  },
};

export default userController;
