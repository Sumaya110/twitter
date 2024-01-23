import { createNewPost, getNewPost, getNewPosts, updateNewPost } from "@/libs/api_routes/routes";

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
    // console.log("helll  ", postId)
    const response = await  getNewPost(postId); 
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}



async function updatePost(postId, imageUrl) {
  console.log("update action: ", imageUrl);
  try {
    const response = await updateNewPost({postId, imageUrl});
    console.log("update postAction", response.data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}


export { createPost , getPost, getPosts, updatePost};
