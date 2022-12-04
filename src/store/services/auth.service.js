import axiosInstance from './axios.config';

const register = (email, password) => axiosInstance.post('/register', {
  email,
  password,
});

const login = (email, password) => axiosInstance
  .post('/login', {
    email,
    password,
  })
  .then((res) => {
    if (res.data.token) {
      localStorage.setItem('user', JSON.stringify(res.data));
    }

    return res.data;
  });

const requestResetPassword = (email) => axiosInstance.post('/reset-password', { email }).then((res) => res.data);

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  requestResetPassword,
  logout,
};
