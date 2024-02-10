const mongoose = require("mongoose");
import PostRepository from "../repositories/postRepository";

// GET all posts
const getPosts = async (req, res) => {
  const userId = req.userId;
  const posts = await PostRepository.find({ userId });
  res.status(200).json(posts);
};

// GET post
const getPost = async (req, res) => {
  const postId = req.params;
  const posts = await PostRepository.findById({ postId });
  res.status(200).json(posts);
};

// create a new post
const createPost = async (req, res) => {
  try {
    const post = await PostRepository.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a task
const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such post" });
  }

  const updatedPost = await PostRepository.findOneAndUpdate({
    postId: id,
    updateData: req.body.updateData,
  });

  if (!updatedPost) {
    return res.status(400).json({ error: "No such post" });
  }
  res.status(200).json(updatedPost);
};

// delete a task
const deletePost = async (req, res) => {

  console.log("cont :", req.body)
  const { id } = req.params;

  console.log("controller : ", id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such post" });
  }

  const deletedPost = await PostRepository.findOneAndDelete(id);

  if (!deletedPost) {
    return res.status(400).json({ error: "No such post" });
  }
  res.status(200).json(deletedPost);
};


// create a new comment
const createComment = async (req, res) => {
  try {
    const comment = await PostRepository.createComment(req.body);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  createComment
};
