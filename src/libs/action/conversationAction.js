import {
  createNewConversation,
  getNewConversation,
} from "@/libs/api_routes/routes";

async function createConversation(data) {
  try {
    const response = await createNewConversation(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function getConversation(data) {
  try {
    const response = await getNewConversation(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

export { createConversation, getConversation };
