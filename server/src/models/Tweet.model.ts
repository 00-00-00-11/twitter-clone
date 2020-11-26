import { model, Schema, Document } from "mongoose";

interface Tweet extends Document {
  user_id: string;
}

const TweetSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  profile: {
    type: Object,
    required: true,
    ref: "Profile",
  },
  body: {
    type: String,
    required: true,
    max: 500,
  },
});

export default model<Tweet>("Profile", TweetSchema);
