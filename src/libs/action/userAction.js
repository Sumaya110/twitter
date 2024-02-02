import {
    createNewUser,
    getNewUser,
    updateNewUser,
   
  } from "@/libs/api_routes/routes"
  
  async function createUser(data) {

    console.log("dataa  :", data)
    try {
      const response = await createNewUser(data);

      console.log("response : ", response)
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }

  
  
  async function getUser(data) {
    try {
      // console.log("data  : ", data)
      const response = await getNewUser(data);
      // console.log("get Action",response)
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }


  async function updateUser(userId, updateData) {
    try {
      console.log("action : ", userId, updateData)
      const response = await updateNewUser({userId, updateData});
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }
  
  
  
  export { createUser,  getUser, updateUser};