import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

export type RequestType = {
  email: string;
  password: string;
};
const userController = {
  async signUp(req: Request<RequestType>, res: Response) {
    try {
      const { email, password, name } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(404)
          .send({ errorMessage: "User with the same email already exists" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({
        email: email,
        password: hash,
        name: name,
      });
      await newUser.save();
      return res
        .status(200)
        .send({ data: "User has been created Successfully!!" });
    } catch (error) {
      return res
        .status(500)
        .json({ errorMessage: "Something went wrong signupppp" });
    }
  },
  async login(req: Request<RequestType>, res: any) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user)
        return res.status(404).json({ errorMessage: "email does not exists" });
      const isPasswordChecked = await bcrypt.compare(password, user.password);

      if (!isPasswordChecked) {
        return res
          .status(404)
          .json({ errorMessage: "Password does not matched" });
      }
      const token = jwt.sign({ email }, `${process.env.JWT_TOKEN}`, {
        expiresIn: "5h",
      });
      const data = {
        message: "Login successful",
        token: token,
        name: user.name,
        email: user.email,
      };
      res.status(200).send({ success: true, data });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default userController;
