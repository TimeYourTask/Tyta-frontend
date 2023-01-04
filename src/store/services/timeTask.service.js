import axiosInstance from './axios.config';

const getUserTimer = () => axiosInstance.get('/task/user/timer').then((res) => res.data);

const startTimer = (taskId) => axiosInstance.post(`/task/${taskId}/start`);

const endTimer = (taskId) => axiosInstance.post(`/task/${taskId}/end`);

export default {
  getUserTimer,
  startTimer,
  endTimer,
};
