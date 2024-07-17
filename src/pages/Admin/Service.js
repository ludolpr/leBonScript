import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getUsers = () =>
  api
    .get("/users")
    .catch((error) => console.error("Error fetching users:", error));
export const getAnnouncements = () =>
  api
    .get("/announcement")
    .catch((error) => console.error("Error fetching announcements:", error));
export const getMessages = () =>
  api
    .get("/message")
    .catch((error) => console.error("Error fetching messages:", error));
export const getRoles = () =>
  api
    .get("/role")
    .catch((error) => console.error("Error fetching roles:", error));
export const getCategories = () =>
  api
    .get("/category")
    .catch((error) => console.error("Error fetching categories:", error));
