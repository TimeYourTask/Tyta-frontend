import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// instance.defaults.headers.common.Authorization = 'AUTH TOKEN FROM INSTANCE';

export default instance;
