import axios from 'axios';
import authHeader from './auth-header';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    ...authHeader(),
  };

  return config;
}, (error) => Promise.reject(error)
);

export default instance;
