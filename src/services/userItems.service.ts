import apiClient from "./axiosInstance";

const baseUrl = "/user-items";

export default {
  deleteItemById: (itemId: string) => apiClient.delete(`${baseUrl}/${itemId}`),
};
