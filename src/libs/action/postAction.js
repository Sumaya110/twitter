import {
  createNewPost,
  getNewPost,
  getNewPosts,
  updateNewPost,
  deleteNewPost,
  createNewComment,
} from "@/libs/api_routes/routes";

async function createPost(data) {
  try {
    const response = await createNewPost(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function getPosts(userId) {
  try {
    const response = await getNewPosts(userId);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function getPost(postId) {
  try {
    const response = await getNewPost(postId);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function deletePost(postId) {
  try {
    console.log("action  :  ", postId);
    const response = await deleteNewPost(postId);
    console.log("repo res: ", response)
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function updatePost(postId, updateData) {
  try {
    const response = await updateNewPost({ postId, updateData });
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function createComment(data) {
  try {
    const response = await createNewComment(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

export { createPost, getPost, getPosts, updatePost, deletePost, createComment };
