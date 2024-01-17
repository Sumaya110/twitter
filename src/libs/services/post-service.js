import PostRepository from "../repositories/postRepository";


export const createPost = async (req, res) => {
    try {
      const response = await PostRepository.create({ data: req.body });
      return res.status(200).json(response._id);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };