import "dotenv/config";
import "./services/mongodb";
import express, { Application, json, NextFunction, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import Logger from "./utils/Logger";
import api from "./routes/api";
import { IRequest } from "./interfaces";
import { allowedMethods, errorObj } from "./constants";

const app: Application = express();
const port = process.env?.PORT || 3030;
const CLIENT_URL = process.env?.CLIENT_URL;

app.use(compression());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: allowedMethods,
  })
);
app.use((req: IRequest, res: Response, next: NextFunction) => {
  if (!allowedMethods.includes(req.method)) {
    return res.json(errorObj("method not allowed")).status(405);
  }

  if (req.headers["content-type"] !== "application/json") {
    return res.json(errorObj("Content-Type must be 'application/json'"));
  }

  next();
});
app.use(json());
app.use("/api/v1", api);

app.listen(port, () =>
  Logger.log("app", `running app at http://localhost:${port}/`)
);
