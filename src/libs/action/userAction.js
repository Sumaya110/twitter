import {
    createNewUser,
    getNewUser,
   
  } from "@/libs/api_routes/routes"
  
  async function createUser(data) {

    console.log("dataa  :", data)
    try {
      const response = await createNewUser(data);

      console.log("response from action", response)
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }

  
  
  async function getUser(data) {
    try {
      const response = await getNewUser(data);
      
      console.log("get Action",response)
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }
  
  
  
  export { createUser,  getUser};