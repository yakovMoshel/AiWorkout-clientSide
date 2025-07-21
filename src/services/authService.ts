import api from '../utils/api';

export async function loginAction(
  prevState: any,
  formData: { email: string; password: string }
) {
  const { email, password } = formData;

  if (!email || !password) {
    return { error: "Please fill in all fields" };
  }

  try {
    await api.post('/auth/login', { email, password }, { withCredentials: true });

    return { error: "" }; 
  } catch (err: any) {
    return { error: err?.response?.data?.message || "Login failed" };
  }
}

export async function registerAction(
  prevState: any,
  formData: { name: string; email: string; password: string }
) {
  const { name, email, password } = formData;

  if (!name || !email || !password) {
    return { error: "Please fill in all fields" };
  }

  try {
    await api.post('/auth/register', { name, email, password }, { withCredentials: true });

    return { error: "" };
  } catch (err: any) {
    return { error: err?.response?.data?.message || "Registration failed" };
  }
}

export async function logout() {
  try {
    await api.post('/auth/logout', {}, { withCredentials: true });
  } catch (err) {
    console.error('Logout failed', err);
  }
}

export async function fetchUser() {
  try {
    const response = await api.get('/auth/user', { withCredentials: true });
    return response.data; // { id, name, email }
  } catch (err) {
    return null;
  }
}
