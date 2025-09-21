import axios from "./axios.js";

//Login
export async function login(email, password) {
  try {
    const res = await axios.post("/auth/login", { email, password });
    const token = res.data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (err) {
    console.error("Errore login:", err);
    throw err;
  }
}

//Register
export async function register(formData) {
  try {
    const res = await axios.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const token = res.data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Errore nella registrazione del nuovo account", error);
    throw error;
  }
}
