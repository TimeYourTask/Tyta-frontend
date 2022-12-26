import axiosInstance from './axios.config';

const getProjectsAsAdmin = () => axiosInstance.get('/admin/projects').then((res) => res.data);

const getUserProjects = (userId, teamId) => axiosInstance.get(`/user/${userId}/projects`, teamId ? { team: teamId } : null).then((res) => res.data);

const createProject = (teamId, data) => axiosInstance.post(`/team/${teamId}/project`, data)
  .then((res) => res.data);

const deleteProject = (projectId) => axiosInstance.delete(`/project/${projectId}`)
  .then((res) => res.data);

export default {
  getProjectsAsAdmin,
  getUserProjects,
  createProject,
  deleteProject,
};
