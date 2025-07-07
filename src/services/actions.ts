export async function fakeLoginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "All fields are required.", values: { email, password } };
  }

  // כאן אפשר להחליף ל-fetch לשרת אמיתי
  if (email === "test@example.com" && password === "123456") {
    // נניח הצלחה, בהמשך נוכל להפעיל redirect
    return { error: "", values: { email, password }, redirect: "/" };
  }

  return { error: "Invalid credentials.", values: { email, password } };
}
