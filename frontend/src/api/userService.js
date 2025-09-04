import axios from "axios";

const API_URL = "http://localhost:5000/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("user/login", userData);
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("user/register", userData);
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};


const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("user/logout");
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};


export {
  loginUser,
  registerUser,
  logoutUser
}