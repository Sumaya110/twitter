const mongoose = require('mongoose')
import PostRepository from '../repositories/postRepository';

// GET all posts
const getPost = async(req, res) => {
   const userId =req.userId
   const posts = await PostRepository.find({userId});
   res.status(200).json(posts)
}


// create a new post
const createPost = async (req, res) => {
    try {
      const post = await PostRepository.create(req.body);
      res.status(200).json(post)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
}



// Update a post
const updatePost = async (req, res) => {
  try {
    const updateData = {
      postId: req.params.postId,
      updatedData: req.body,
    };

    const post = await PostRepository.findOneAndUpdate(updateData);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  getPost,
  createPost,
  updatePost,
  
}