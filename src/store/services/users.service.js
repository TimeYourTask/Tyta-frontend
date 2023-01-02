import axiosInstance from './axios.config';

const getUsers = () => axiosInstance.get('/users').then((res) => res.data);

const getOneUser = (userId) => axiosInstance.get(`/user/${userId}`).then((res) => res.data);

export default {
  getUsers,
  getOneUser,
};
