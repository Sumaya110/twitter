import {
    createNewUser,
    getNewUser,
    getNewUsers,
    updateNewUser,
   
  } from "@/libs/api_routes/routes"
  
  async function createUser(data) {
    try {
      const response = await createNewUser(data);
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }

  
  async function getUser(data) {

    console.log("action : ", data)
    try {
      const response = await getNewUser(data);
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }


  async function getUsers() {
    try {
      const response = await getNewUsers();
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }


  async function updateUser(userId, updateData) {
    try {
      const response = await updateNewUser({userId, updateData});
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }
  
  
  
  export { createUser,  getUser, updateUser, getUsers};