import axios from "axios";

const API=axios.create({baseURL:"http://localhost:5000"});
export const signIn=(formData)=>API.post('/user/signin',formData);
export const signUp=(formData)=>API.post('/user/signup',formData);
export const google=(formData)=>API.post('/user/google',formData);
export const getUser=(id)=>API.get(`/user/getuser/${id}`);
export const updateProfile=(id,profilePhoto)=>API.put(`/user/update/${id}`,{profilePhoto});

export const createRecipes=(formData)=>API.post('/post/createpost',formData);
export const fetchRecipes=()=>API.get('/post/getPosts');
export const fetchRecipe=(id)=>API.get(`/post/getPost/${id}`);
export const commentOnRecipe=(id,comment)=>API.put(`/post/comment/${id}`,comment);
export const likePost=(id,userId)=>API.put(`/post/likepost/${id}`,{userId}); //send userId in form of object
export const dislikePost=(id,userId)=>API.put(`/post/dislikepost/${id}`,{userId});
export const fetchUserRecipe=(id)=>API.get(`/post/getUserPost/${id}`);
export const updateTheRecipe=(formData)=>API.put(`/post/updatepost`,formData);
export const deletePost=(id)=>API.delete(`/post/deletepost/${id}`);
