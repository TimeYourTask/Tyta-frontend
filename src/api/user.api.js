import axios from './axios.config';

export const sendEmailToResetPassword = async (email) => axios
  .post('/reset-password', {
    email,
  })
  .then((res) => res)
  .catch((err) => err);

export const resetPassword = async (tokenId, token, newPassword) => axios
  .post(`/reset-password/${tokenId}/${token}`, {
    password: newPassword,
  })
  .then((res) => res)
  .catch((err) => err);
export const register = async (email, password, firstname, lastname) => axios
  .post('/register', { email, password, firstname, lastname })
  .then((res) => res)
  .catch((err) => err);

export const login = () => {};
