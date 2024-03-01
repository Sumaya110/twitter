import PostRepository from "../repositories/postRepository";

export const createPost = async (req, res) => {
  try {
    const response = await PostRepository.create(req.body);
    return res.status(200).json(response._id);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getPosts = async (req, res) => {
  try {
    const userId = req.query.userId;
    const response = await PostRepository.find({ userId });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updatePost = async (req, res) => {
  try {
    const response = await PostRepository.findByIdAndUpdate(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = { _id: req.query.postId };
    const response = await PostRepository.findOneAndDelete(postId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
