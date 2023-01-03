import store from '../store';

export default function authHeader() {
  const state = store.getState();
  const user = state.auth;

  if (user.isLoggedIn && user.user.token) {
    return { Authorization: user.user.token };
  }
  return {};
}
