import Post from "../models/postModel";

const create = async (content) => {
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

const find = async ({ userId }) => {
  const response = await Post.find({ userId }).sort({ timestamp: -1 });
  return response;
};

const findById = async (postId) => {
  const response = await Post.findById({ _id: postId });
  return response;
};

const findOneAndUpdate = async (updateData) => {
  const response = await Post.findOneAndUpdate(
    { _id: updateData.postId },
    updateData.updateData,
    { new: true }
  );
  return response;
};

const findOneAndDelete = async (postId) => {
  console.log("repo  : ", postId)
  const response = await Post.findOneAndDelete({ _id: postId });
  return response;
};




const createComment = async (content) => {
  const comment = await Post.create({
    postId: content.postId,
    username: content.username,
    userImg: content.userImg,
    text: content.text,
    timestamp: content.timestamp,
  });
  return comment;
};

const PostRepository = {
  create,
  find,
  findOneAndUpdate,
  findById,
  findOneAndDelete,
  createComment
};

export default PostRepository;
