import api from "../utils/api";

export async function editProfile(formData: FormData) {
  const res = await api.put("/profile/edit", formData, );
  return res.data;
}