import axios from "axios";

const API_URL = "http://localhost:3000";


const saveToken = (token) => {
  localStorage.setItem("userToken", token);
};


const getToken = () => {
  return localStorage.getItem("userToken");
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  
  saveToken(response.data.token); 
  return response.data;
};
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.data;
};

export const updateProduct = async (id,productData) => {
  const response = await axios.put(`${API_URL}/products/${id}`, productData);
  return response.data;
};

export const createProduct = async (product) => {
  try {
    const token = getToken(); 
    const response = await axios.post(`${API_URL}/products`, product, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error sending product to server:", error);
    throw error; 
  }
};

export const ProductList = async () => {
  try {
    const token = getToken(); 
    const response = await axios.get(`${API_URL}/products?page=1&limit=10`, {
      headers: {
        Authorization: `Bearer ${token} `
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error; 
  }
};

