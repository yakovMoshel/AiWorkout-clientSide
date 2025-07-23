import api from "./api";

export async function getCurrentUser() {
  return api.get('/auth/user', { withCredentials: true }).then((res) => {
    return res.data;
  });
}

export async function logoutUser() {
  return api.post('/auth/logout', {}, { withCredentials: true });
}