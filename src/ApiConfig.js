import axios from 'axios';

const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const baseUrl = window.API_URL || "https://localhost:5001";
const api = axios.create({
  baseURL: baseUrl
});

export default api;