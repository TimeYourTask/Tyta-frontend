import axiosInstance from './axios.config';

const getProjectsAsAdmin = () => axiosInstance.get('/admin/projects').then((res) => res.data);

const getUserProjects = (userId, teamId) =>
  axiosInstance
    .get(`/user/${userId}/projects`, teamId ? { params: { team: teamId } } : null)
    .then((res) => res.data);

const getOneProject = (projectId) =>
  axiosInstance.get(`/project/${projectId}`).then((res) => res.data);

const createProject = (teamId, data) =>
  axiosInstance.post(`/team/${teamId}/project`, data).then((res) => res.data);

const updateProject = (projectId, data) =>
  axiosInstance.put(`/project/${projectId}`, data).then((res) => res.data);

const addUserToProject = (projectId, userId, data = {}) =>
  axiosInstance.put(`/project/${projectId}/user/${userId}`, data).then((res) => res.data);

const deleteProject = (projectId) =>
  axiosInstance.delete(`/project/${projectId}`).then((res) => res.data);

const getUserOfProject = (projectId) =>
  axiosInstance.get(`/project/${projectId}/users`).then((res) => res.data);

export default {
  getProjectsAsAdmin,
  getUserProjects,
  getOneProject,
  createProject,
  updateProject,
  addUserToProject,
  deleteProject,
  getUserOfProject,
};
