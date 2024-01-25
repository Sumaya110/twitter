import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  userId: String,
  username: String,
  userImg: String,
  tag: String,
  text: String,
  image: String,
  timestamp: Date,
  imageUrl: String,
  likes: [
    {
      postId: String,
      userId: String,
      username: String,
      userImg: String,
    },
  ],
  comments: [
    {
      postId: String,
      username: String,
      userImg: String,
      text: String,
      timestamp: Date,

      likes: [
        {
          postId: String,
          userId: String,
          username: String,
          userImg: String,
        },
      ],
      replies: [
        {
          id: String,
          username: String,
          userImg: String,
          text: String,
          timestamp: Date,
          likes: [
            {
              postId: String,
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

