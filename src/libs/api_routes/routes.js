import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', 
});

API.interceptors.request.use((req)=>{
  if(!req.url.includes('/api/posts'))
      req.headers["Content-Type"] = "application/json";
  return req;
})

API.interceptors.response.use((res)=>{
    return res;
})



export const createNewUser = (payload) => API.post('/api/users', payload);

export const getNewUser = (payload) => API.get('/api/users',  {params:{email:payload}});

export const updateNewUser = (payload) => API.patch('/api/users', payload);



export const createNewPost = (payload) => API.post('/api/posts', payload);

export const updateNewPost = (payload) => API.patch('/api/posts', payload);

 export const getNewPost = (payload) => API.get('/api/posts', {params:{_id:payload, purpose: "get-single-post" }});

 export const getNewPosts = (payload) => API.get('/api/posts', {params:{_id:payload, purpose:"get-all-posts" }});

 export const deleteNewPost = (payload) => API.delete('/api/posts', {params:{_id:payload}});

