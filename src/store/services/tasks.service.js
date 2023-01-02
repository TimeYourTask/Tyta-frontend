import axiosInstance from './axios.config';

const createTask = (data) => axiosInstance.post('/task', data).then((res) => res.data);

const updateTask = (taskId, data) => axiosInstance.put(`/task/${taskId}`, data).then((res) => res.data);

const getOneTask = (taskId) => axiosInstance.get(`/task/${taskId}`).then((res) => res.data);

const getOneTimer = (taskId) => axiosInstance.get(`/task/${taskId}/timer`).then((res) => res.data).catch((err) => err.data);

const getProjectTasks = (projectId) => axiosInstance.get(`/project/${projectId}/tasks`).then((res) => res.data);

export default {
  createTask,
  updateTask,
  getOneTask,
  getOneTimer,
  getProjectTasks,
};
