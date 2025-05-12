import apiClient from "./axiosInstance";

const baseUrl = "/items";

export default {
  addItems: async (formData: FormData) => {
    await apiClient.post(`${baseUrl}/add`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
