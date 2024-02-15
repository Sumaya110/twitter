import {
    createNewConversation,
   
  } from "@/libs/api_routes/routes";


async function createConversation(data) {
    try {
      const response = await createNewConversation(data);
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }