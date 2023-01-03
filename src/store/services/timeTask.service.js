import axiosInstance from './axios.config';

const getUserTimer = () => axiosInstance.get('/task/user/timer').then((res) => res.data);

export default {
  getUserTimer,
};
