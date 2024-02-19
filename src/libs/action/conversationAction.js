import {
  createNewConversation,
  getNewConversation,
  getNewConversations,
  markNewSeen,
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

async function getConversations(data) {
  try {
    const response = await getNewConversations(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function markSeen(data) {
  try {
    const response = await markNewSeen(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

export { createConversation, getConversation, getConversations,  markSeen };
