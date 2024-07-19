import axios from "axios";

// URL API
const API_BASE_URL = "http://localhost:8000";

export const login = (email, password) => {
  return axios.post(`${API_BASE_URL}/login`, { email, password });
};

export const register = (formData) => {
  return axios.post(`${API_BASE_URL}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const logout = () => {
  localStorage.removeItem("user");
};
