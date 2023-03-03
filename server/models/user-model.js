import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, unique: true, requaired: true },
  isWaitingGame: { type: Boolean, default: false },
  gameId: { type: String, default: "" },
});

export const ModelUser = model("User", UserSchema);
