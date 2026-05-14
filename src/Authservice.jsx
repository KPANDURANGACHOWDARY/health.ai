// src/features/auth/authService.js
import API from "./Api";

export const loginUser = async (credentials) => {
  const { data } = await API.post("/auth/login", credentials);
  localStorage.setItem("token", data.token);
  return data;
};