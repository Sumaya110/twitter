import { Schema, model, models } from "mongoose";
import commentSchema from "./subModel/commentModel";

const postSchema = new Schema(
  {
    userId: String,
    userEmail: String,
    username: String,
    userImg: String,

    tag: String,
    text: String,
    image: String,
    imageUrl: String,
    retweetedFrom: String,
    retweetedBy: String,

    likes: [
      {
        userId: String,
        username: String,
        userImg: String,
      },
    ],
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Posts = models.post || model("post", postSchema);

export default Posts;
