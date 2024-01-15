import {
    createNewUser,
    getNewUser,
   
  } from "@/libs/api_routes/routes"
  
  async function createUser(data) {
    try {
      const response = await createNewUser(data);

      console.log("response from action", response)
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }

  
  
  async function getUser(matchId) {
    try {
      const response = await getNewUser(matchId);
      
      console.log("get matchAction",response)
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }
  
  
  
  export { createUser,  getUser};