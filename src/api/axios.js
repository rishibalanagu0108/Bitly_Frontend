import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bitly-backend-w3in.onrender.com/api',
});

export default api;
