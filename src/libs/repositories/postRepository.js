import Post from "../models/postModel";

const create = async (content) => {
  const post = await Post.create(content);
  return post;
};

const find = async (payload) => {
  const response = await Post.find(payload).sort({ createdAt: -1 });
  return response;
};

const findByIdAndUpdate = async ({ query, payload }) => {
  const response = await Post.findByIdAndUpdate(query, payload, { new: true });
  return response;
};

const findOneAndDelete = async (payload) => {
  const response = await Post.findOneAndDelete(payload);
  return response;
};

const PostRepository = {
  create,
  find,
  findByIdAndUpdate,
  findOneAndDelete,
};

export default PostRepository;
