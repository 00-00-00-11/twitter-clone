import "dotenv/config";
import "./services/mongodb";
import express, { Application, json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import Logger from "./utils/Logger";
import api from "./routes/api";
import { allowedMethods } from "./constants";

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
app.use(json());
app.use("/api/v1", api);

app.listen(port, () =>
  Logger.log("app", `running app at http://localhost:${port}/`)
);
