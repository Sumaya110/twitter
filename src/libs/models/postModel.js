import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  userId: String,
  userEmail: String,
  username: String,
  userImg: String,

  tag: String,
  text: String,
  image: String,
  timestamp: Date,
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
  comments: [
    {
      userId: String,
      username: String,
      userImg: String,
      userEmail: String,
      tag: String,
      text: String,
      timestamp: Date,
      imageUrl: String,

      likes: [
        {
          userId: String,
          username: String,
          userImg: String,
        },
      ],
      replies: [
        {
          userId: String,
          username: String,
          userImg: String,
          userEmail: String,
          tag: String,
          text: String,
          timestamp: Date,
          imageUrl: String,
          likes: [
            {
              userId: String,
              username: String,
              userImg: String,
            },
          ],
        },
      ],
    },
  ],
});

const Posts = models.post || model("post", postSchema);

export default Posts;

