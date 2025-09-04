import axios from "axios";

const API_URL = "http://localhost:5000/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const loginAdmin = async (userData) => {
  try {
    const response = await axiosInstance.post("admin/login", userData);
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

const addUser = async (userData) => {
  try {
    const response = await axiosInstance.post("admin/add-user", userData);
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};


const deleteUser = async (_id) => {
  try {
    const response = await axiosInstance.get(`admin/delete-user/${_id}`);
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};


const editUser = async (userData) => {
  try {
    const response = await axiosInstance.post("admin/edit-user" , userData);
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

const allUser = async () => {
  try {
    const response = await axiosInstance.get("admin/alluser");
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};



const logoutAdmin = async () => {
  try {
    const response = await axiosInstance.post("admin/logout");
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};


export {
  loginAdmin,
  allUser,
  addUser,
  deleteUser,
  editUser,
  logoutAdmin
}