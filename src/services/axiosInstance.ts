import axios from "axios";

const apiClient = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

export const addAuthHeader = (token: string) => {
  apiClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
};

export const removeAuthHeader = () => {
  apiClient.interceptors.request.use((config) => {
    config.headers.Authorization = null;

    return config;
  });
};

export default apiClient;
