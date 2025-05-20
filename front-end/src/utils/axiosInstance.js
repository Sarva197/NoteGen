import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // change to your backend URL
  withCredentials: true, // send cookies
});

export default axiosInstance;
