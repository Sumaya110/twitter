import {
  createNewPost,
  getNewPost,
  getNewPosts,
  updateNewPost,
  deleteNewPost,

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
    const response = await deleteNewPost(postId);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function updatePost(postId, updateData) {
  try {
    const response = await updateNewPost({
      query: postId,
      payload: updateData,
    });
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}



export { createPost, getPost, getPosts, updatePost, deletePost};
