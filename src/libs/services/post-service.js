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
    const userId = req.query._id
    const response = await PostRepository.find(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


export const getPost = async (req, res) => {
  try {
    const postId = req.query._id

    console.log("service : ", postId)

    
    const response = await PostRepository.findById(postId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


export const updatePost = async (req, res) => {
  try {
    const response = await PostRepository.findOneAndUpdate(req.body);
    console.log("post service ", response )
    
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};





