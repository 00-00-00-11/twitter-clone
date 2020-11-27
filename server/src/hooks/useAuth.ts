import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { errorObj } from "../constants";
import { IRequest } from "../interfaces";
import UserModel from "../models/User.model";

async function useAuth(
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<any> {
  const token = req.cookies["session"];
  const secret = process.env.JWT_SECRET;

  if (!token) {
    return res.json(errorObj("invalid token")).status(401);
  }

  try {
    const vToken = jwt.verify(token, String(secret)) as { _id: string };
    const user = await UserModel.findById(vToken._id).select({ password: 0 });

    if (!user) {
      return res.json(errorObj("user not found")).status(401);
    }

    req.user = { _id: user._id };

    next();
  } catch {
    return res.json(errorObj("invalid token")).status(401);
  }
}

export default useAuth;
