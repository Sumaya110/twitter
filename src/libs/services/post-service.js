import PostRepository from "../repositories/postRepository";

export const createPost = async (req, res) => {
  try {

    const response = await PostRepository.create(req.body);

    return res.status(200).json(response._id);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


export const getPost = async (req, res) => {
  try {
    const userId = req.query._id
    console.log("service id", userId)
    const response = await PostRepository.find(userId);
    // console.log("from service ", response)
    return res.status(200).json(response);
    
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
