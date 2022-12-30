import axiosInstance from './axios.config';

const createTask = (data) => axiosInstance.post('/task', data).then((res) => res.data);

const getProjectTasks = (projectId) => axiosInstance.get(`/project/${projectId}/tasks`).then((res) => res.data);

export default {
  createTask,
  getProjectTasks,
};
