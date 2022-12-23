import axios from 'axios';
import authHeader from './auth-header';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    ...authHeader(),
  },
});

export default instance;
