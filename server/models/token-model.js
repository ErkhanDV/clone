import { Schema, model } from "mongoose";

const TokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, requaired: true },
});

export const ModelToken = model("Token", TokenSchema);
