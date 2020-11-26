import { Router, Response } from "express";
import { useAuth } from "../hooks";
import { IRequest } from "../interfaces";

const router = Router();

router.get("/", useAuth, (req: IRequest, res: Response) => {});

export default router;
