import { compareSync, hashSync } from "bcryptjs";
import { Response, Router } from "express";
import { errorObj } from "../constants";
import { useToken } from "../hooks";
import { IRequest } from "../interfaces";
import ProfileModel from "../models/Profile.model";
import UserModel, { IUser } from "../models/User.model";
import Logger from "../utils/Logger";

const router = Router();
const expires = 2592000000; /* 30days */

router.post("/login", async (req: IRequest, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json(errorObj("Please fill in all fields")).status(400);
  }

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.json(errorObj("No user was found by that username"));
    }

    const isPwCorrect = compareSync(password, user.password);

    if (!isPwCorrect) {
      return res.json(errorObj("Password is incorrect"));
    }

    const token = useToken({ _id: user._id }, expires / 1000);
    res.cookie("session", token, {
      httpOnly: true,
      expires: new Date(Date.now() + expires),
    });

    return res.json({
      status: "success",
    });
  } catch (e) {
    Logger.error("login", e);
    return res.json(errorObj("An error occurred")).status(500);
  }
});

router.post("/register", async (req: IRequest, res: Response) => {
  const { username, password, password2 } = req.body;

  if (!username || !password || !password2) {
    return res.json(errorObj("Please fill in all fields"));
  }

  if (password.length < 6) {
    return res
      .json(errorObj("Password must be longer than 6 characters"))
      .status(400);
  }

  if (password !== password2) {
    return res.json(errorObj("Passwords do not match")).status(400);
  }

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.json(errorObj("Username is already in use")).status(400);
    }

    const hash = hashSync(password, 15);
    const newUser: IUser = new UserModel({ username, password: hash });
    const newProfile = new ProfileModel({
      user_id: newUser._id,
      display_name: username,
    });

    await newUser.save();
    await newProfile.save();

    const token = useToken({ _id: newUser._id }, expires / 1000);
    res.cookie("session", token, {
      httpOnly: true,
      expires: new Date(Date.now() + expires),
    });

    return res.json({
      status: "success",
    });
  } catch (e) {
    Logger.error("register", e);
    return res.json(errorObj("An error occurred")).status(500);
  }
});

export default router;
