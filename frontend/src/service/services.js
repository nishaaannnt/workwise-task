import axios from 'axios';

const AUTH_URL = 'http://localhost:4000/auth/v1';
const API_URL = 'http://localhost:4000/api/v1'; 

// Function to set the Authorization header with the JWT token
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Auth Services
export const loginUser = async (email, password) => {
  const response = await axios.post(`${AUTH_URL}/user/login`, { email, password });
  const { token } = response.data;
  setAuthToken(token);
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await axios.post(`${AUTH_URL}/user/signup`, userData);
  return response.data;
};

export const signupSeller = async (userData) => {
  const response = await axios.post(`${AUTH_URL}/seller/signup`, userData);
  return response.data;
};

// Product Services
export const getProducts = async (filters) => {
  const response = await axios.get(`${API_URL}/product/getProducts`, { params: filters });
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/product/seller/add`, productData);
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const response = await axios.put(`${API_URL}/product/seller/update/${productId}`, productData);
  return response.data;
};

export const searchProduct = async (productName) => {
  const response = await axios.get(`${API_URL}/product/search?name=${productName}`);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await axios.delete(`${API_URL}/product/seller/delete/${productId}`);
  return response.data;
};

export const getCartItems = async () => {
  const response = await axios.get(`${API_URL}/cart/buyer/get`);
  return response.data;
};

export const addToCart = async (productId) => {
  const response = await axios.post(`${API_URL}/cart/buyer/add`, { productId });
  return response.data;
};

export const removeFromCart = async (cartItemId) => {
  const response = await axios.delete(`${API_URL}/cart/buyer/remove/${cartItemId}`);
  return response.data;
};
