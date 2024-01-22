import Post from "../models/postModel";

const create = async (content ) => {
  // console.log("content ", content)
  const post = await Post.create({
    userId: content.userId,
    username: content.username,
    userImg: content.userImg,
    tag: content.tag,
    text: content.text,
    timestamp: content.timestamp,
    imageUrl: content.imageUrl,
  });
  return post;
};


const find = async (userId ) => {
  const response = await Post.find({userId});
  return response;
};


const findOneAndUpdate = async (updateData) => {
 
  const response = await Post.findOneAndUpdate(
    { _id: updateData.postId }, 
    updateData.updatedData,
    { new: true } 
  );
  console.log("post repo ", response)
  return response;
};

const PostRepository = {
  create, find, findOneAndUpdate,
};

export default PostRepository;
