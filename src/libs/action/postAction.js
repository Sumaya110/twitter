import { createNewPost, getNewPost } from "@/libs/api_routes/routes";

async function createPost(data) {
  console.log("dataa  :", data);
  try {
    const response = await createNewPost(data);

    console.log("response from action", response);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}


async function getPost(userId) {

  try {
    const response = await getNewPost(userId);
    
    console.log("get postAction",response)
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

export { createPost , getPost};
