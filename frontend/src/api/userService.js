import axios from "axios";

const API_URL = "http://localhost:5000/user";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/login", userData);
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export {loginUser}