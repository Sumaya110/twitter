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
      const response = await updateNewUser({query: userId, payload: updateData});
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }
  
  
  
  export { createUser,  getUser, updateUser, getUsers};