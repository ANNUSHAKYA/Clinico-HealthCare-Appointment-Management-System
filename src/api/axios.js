import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "/api" : "http://localhost:5002/api"),
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("clinico_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
