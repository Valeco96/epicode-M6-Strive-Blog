import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("Base URL:", import.meta.env.VITE_BASE_URL);

export default instance;

