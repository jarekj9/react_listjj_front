import axios from 'axios';

const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const api = axios.create({
  baseURL: 'https://localhost:5001'
});

export default api;