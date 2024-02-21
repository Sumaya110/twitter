import { Schema, model, models } from "mongoose";

const replySchema = Schema(
  {
    userId: String,
    username: String,
    userImg: String,
    userEmail: String,
    tag: String,
    text: String,
    imageUrl: String,
    likes: [
      {
        userId: String,
        username: String,
        userImg: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = replySchema;
