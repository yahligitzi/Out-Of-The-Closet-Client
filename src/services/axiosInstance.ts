import axios from "axios";

const apiClient = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

export const addAuthHeader = (token: string) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthHeader = () => {
  delete apiClient.defaults.headers.common["Authorization"];
};

export default apiClient;
