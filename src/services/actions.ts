import api from '../utils/api';

export async function loginAction(prevState: any, formData: { email: string; password: string }) {
  const email = formData.email;
  const password = formData.password;

  if (!email || !password) {
    return { error: "Please fill in all fields" };
  }
  try {
    const res = await api.post('/auth/login', { email, password });
    const token = res.data.token;
    if (!token) return { error: "No token received" };

    localStorage.setItem("token", token); 

    return { error: "", token };
  } catch (err: any) {
    return { error: err?.response?.data?.message || "Login failed" };
  }
}

export async function registerAction(prevState: any, formData: { name: string; email: string; password: string }) {
  const { name, email, password } = formData;

  if (!name || !email || !password) {
    return { error: "Please fill in all fields" };
  }
  try {
    const res = await api.post('/auth/register', { name, email, password });
    const token = res.data.token;
    if (!token) return { error: "No token received" };

    localStorage.setItem("token", token); 

    return { error: "", token };
  } catch (err: any) {
    console.error("Error:", err);
    return { error: err?.response?.data?.message || "Registration failed" };
  }
}

export async function requestWorkoutPlan(formData: any) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated. Please log in.");

  const response = await api.post("/setup/workout", {
    ...formData,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to create workout plan");
  }
  return response.data;
}