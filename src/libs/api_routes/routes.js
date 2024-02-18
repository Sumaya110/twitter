import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

API.interceptors.request.use((req) => {
  if (!req.url.includes("/api/posts"))
    req.headers["Content-Type"] = "application/json";
  return req;
});

API.interceptors.response.use((res) => {
  return res;
});

export const createNewUser = (payload) => API.post("/api/users", payload);

export const getNewUser = (userId) => API.get(`/api/users/${userId}`);

export const getNewUsers = () => API.get("/api/users");

export const updateNewUser = (payload) => API.patch("/api/users", payload);

export const createNewPost = (payload) => API.post("/api/posts", payload);
export const updateNewPost = (payload) => API.patch("/api/posts", payload);

export const getNewPost = (postId) => API.get(`/api/posts/${postId}`);
export const getNewPosts = (userId) => API.get(`/api/users/${userId}/posts`);

export const deleteNewPost = (payload) =>
  API.delete("/api/posts", { params: { _id: payload } });

export const createNewConversation = (payload) =>
  API.post("/api/conversations", payload);

export const getNewConversation = (conversationId) =>
  API.get(`/api/conversations/${conversationId}`);

  export const markNewSeen = (payload) => API.patch("/api/conversations", payload);

