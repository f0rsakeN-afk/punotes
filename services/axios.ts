import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
});

export default axiosInstance;
