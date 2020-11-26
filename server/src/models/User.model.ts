import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  created_at: number;
}

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    match: /^[a-zA-Z]*$/,
    max: 12,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    required: true,
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
});

export default model<IUser>("User", UserSchema);
