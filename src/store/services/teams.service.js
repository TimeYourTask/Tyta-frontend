import axiosInstance from './axios.config';

const getTeams = () => axiosInstance.get('/teams/mine').then((res) => res.data);

const addUserToTeam = (team, user) =>
  axiosInstance.put(`/team/${team}/user`, { user }).then((res) => res.data);

const getOneTeam = (team) => axiosInstance.get(`/team/${team}`).then((res) => res.data);

const updateTeam = (team) =>
  axiosInstance
    .put(`/team/${team.id}`, {
      users: team.users,
      name: team.name,
    })
    .then((res) => res.data);

const createTeam = (teamName) =>
  axiosInstance.post('/team', { name: teamName }).then((res) => res.data.newTeam);

const deleteTeam = (teamId) => axiosInstance.delete(`/team/${teamId}`).then((res) => res.data);

const getUserOfTeam = (teamId) =>
  axiosInstance.get(`/team/${teamId}/users/`).then((res) => res.data);

export default {
  getTeams,
  addUserToTeam,
  getOneTeam,
  updateTeam,
  createTeam,
  deleteTeam,
  getUserOfTeam,
};
