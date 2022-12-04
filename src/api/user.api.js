import axios from './axios.config';

export const sendEmailToResetPassword = async (email) => axios
  .post('/reset-password', {
    email,
  })
  .then((res) => res)
  .catch((err) => err);

export const resetPassword = async (userId, token, newPassword) => axios
  .post(`/reset-password/${userId}/${token}`, {
    password: newPassword,
  })
  .then((res) => res)
  .catch((err) => err);
