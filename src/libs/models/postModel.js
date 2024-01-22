import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  // _id: ObjectId,
  userId: String,
  username: String,
  userImg: String,
  tag: String,
  text: String,
  image: String,
  timestamp: Date,
  imageUrl: String,
  // likes: [ObjectId],
  comments: [
    {
      id: String,
      username: String,
      userImg: String,
      text: String,
      timestamp: Date,
      // likes: [ObjectId],
      replies: [
        {
          id: String,
          username: String,
          userImg: String,
          text: String,
          timestamp: Date,
          // likes: [ObjectId],
        },
      ],
    },
  ],
});

const Posts = models.post || model("post", postSchema);

export default Posts;
