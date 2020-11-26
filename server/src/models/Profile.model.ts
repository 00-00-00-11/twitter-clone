import { model, Schema, Document } from "mongoose";

interface Profile extends Document {
  user_id: string;
  display_name: string;
  bio: string | null;
  location: string | null;
  url: string | null;
}

const ProfileSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  display_name: String,
  bio: {
    type: String,
    default: null,
  },
  location: {
    type: String,
    default: null,
  },
  url: {
    type: String,
    default: null,
  },
});

export default model<Profile>("Profile", ProfileSchema);
