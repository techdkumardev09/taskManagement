import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";

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
};

export default userController;
