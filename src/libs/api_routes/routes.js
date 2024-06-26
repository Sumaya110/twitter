import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', 
});

API.interceptors.request.use((req)=>{
    req.headers["Content-Type"] = "application/json";
    return req;
})

API.interceptors.response.use((res)=>{
    return res;
})



export const createNewUser = (payload) => API.post('/api/users', payload);

export const getNewUser = (payload) => API.get('/api/users', {params:{id: payload}});

