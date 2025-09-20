import axios from "./axios.js";

export async function login(email, password) {
  try {
    const res = await api.post("/auth/login", { email, password });
    const token = res.data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (err) {
    console.error("Errore login:", err);
    throw err;
  }
}