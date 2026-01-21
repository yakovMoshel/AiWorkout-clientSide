import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://35.169.29.92:5000" ,
  withCredentials: true,
});

export default api;
