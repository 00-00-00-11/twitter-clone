import { connect } from "mongoose";
import Logger from "../utils/Logger";

(async function mongodb() {
  try {
    const uri = String(process.env.MONGODB_URI);
    await connect(uri, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    Logger.log("mongodb", "Connected to mongodb");
  } catch (e) {
    Logger.error("mongodb", e);
  }
})();
