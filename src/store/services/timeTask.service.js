import axiosInstance from './axios.config';

const getUserTimer = () => axiosInstance.get('/task/user/timer').then((res) => res.data);

const startTimer = (taskId) => axiosInstance.post(`/task/${taskId}/start`).then((res) => res.data);

const endTimer = (taskId) => axiosInstance.post(`/task/${taskId}/end`).then((res) => res.data);

export default {
  getUserTimer,
  startTimer,
  endTimer,
};
