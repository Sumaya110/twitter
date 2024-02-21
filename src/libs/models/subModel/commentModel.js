import { Schema, model, models } from "mongoose";
import replySchema from "./subSubModel/replyModel";

const commentSchema = Schema(
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
    replies: [replySchema],
  },
  {
    timestamps: true,
  }
);

module.exports = commentSchema;
