import axiosInstance from './axios.config';

const getUsers = () => axiosInstance.get('/users').then((res) => res.data);

export default {
  getUsers,
};
