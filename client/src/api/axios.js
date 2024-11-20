
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', 
});

// User API routes
export const userAPI = {
  getAllUsers: () => API.get('/users'),
  getUserById: (id) => API.get(`/users/${id}`),
  addUser: (data) => API.post(`/users`, data), 
  updateUser: (id, userData) => API.put(`/users/${id}`, userData),
  deleteUser: (id) => API.delete(`/users/${id}`),
};

// Post API routes
export const postAPI = {
  getAllPosts: () => API.get('/posts'),
  getPostById: (id) => API.get(`/posts/${id}`),
  createPost: (postData) => API.post('/posts', postData),
  updatePost: (id, postData) => API.put(`/posts/${id}`, postData),
  deletePost: (id) => API.delete(`/posts/${id}`),
};

// Comment API routes
export const commentAPI = {
  getCommentsByPostId: (postId) => API.get(`/posts/${postId}/comments`),
  addCommentToPost: (postId, commentData) => API.post(`/posts/${postId}/comments`, commentData),
  updateComment: (postId, commentId, commentData) => API.put(`/posts/${postId}/comments/${commentId}`, commentData),
  deleteComment: (postId, commentId) => API.delete(`/posts/${postId}/comments/${commentId}`),
};

export default API;