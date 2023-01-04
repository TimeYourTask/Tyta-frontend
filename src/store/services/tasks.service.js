import { SET_NOTIFICATION } from '../actions';
import store from '../store';
import axiosInstance from './axios.config';

const createTask = (data) => axiosInstance.post('/task', data).then((res) => res.data);

const updateTask = (taskId, data) => axiosInstance.put(`/task/${taskId}`, data).then((res) => res.data);

const getOneTask = (taskId) => axiosInstance.get(`/task/${taskId}`).then((res) => res.data);

const getOneTimer = (taskId) => axiosInstance.get(`/task/${taskId}/timer`).then((res) => res.data).catch((err) => err.data);

const getProjectTasks = (projectId) => axiosInstance.get(`/project/${projectId}/tasks`).then((res) => res.data);

const startTimer = (taskId) => axiosInstance.post(`/task/${taskId}/start`).then((res) => res.data).catch((err) => {
  if (err.response.data.message) {
    store.dispatch({
      type: SET_NOTIFICATION,
      payload: {
        message: err.response.data.message,
        type: 'error',
      },
    });
  }
  return undefined;
});

const endTimer = (taskId) => axiosInstance.post(`/task/${taskId}/end`).then((res) => res.data).catch((err) => err.data);

const getUserTasks = () => axiosInstance.get('/tasks/user/').then((res) => res.data).catch((err) => err.data);

export default {
  createTask,
  updateTask,
  getOneTask,
  getOneTimer,
  getProjectTasks,
  startTimer,
  endTimer,
  getUserTasks,
};
