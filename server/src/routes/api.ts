import { Router } from "express";
import tweetsRouter from "./tweets";
import authRouter from "./auth";

const api = Router();

api.use("/auth", authRouter);
api.use("/tweets", tweetsRouter);

export default api;
