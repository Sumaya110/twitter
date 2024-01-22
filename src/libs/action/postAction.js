import { createNewPost, getNewPost, updateNewPost } from "@/libs/api_routes/routes";

async function createPost(data) {
  try {
    const response = await createNewPost(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}


async function getPost(userId) {
  try {
    const response = await getNewPost(userId); 
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}


async function updatePost(postId, updatedData) {
  try {
    const response = await updateNewPost(postId, updatedData); 
    console.log("update postAction",response)
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}


export { createPost , getPost, updatePost};
