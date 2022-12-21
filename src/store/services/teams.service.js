import axiosInstance from './axios.config';

const getTeams = () => axiosInstance.get('/teams').then((res) => res.data);

const addUserToTeam = (team, user) => axiosInstance.put(`/team/${team}/user`, { user })
  .then((res) => res.data);

export default {
  getTeams,
  addUserToTeam,
};
