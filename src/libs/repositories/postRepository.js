import Post from "../models/postModel";

const create = async (content ) => {
  console.log("content ", content)
  const post = await Post.create({
    userId: content.userId,
    username: content.username,
    userImg: content.userImg,
    tag: content.tag,
    text: content.text,
    timestamp: content.timestamp,
  });
  return post;
};


const find = async (userId ) => {
  const response = await Post.find({userId});
  console.log("repo response", response);
  return response;
};

const PostRepository = {
  create, find, 
};

export default PostRepository;
