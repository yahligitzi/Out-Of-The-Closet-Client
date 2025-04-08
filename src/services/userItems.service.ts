import apiClient from "./axiosInstance";

const baseUrl = "/user-items";

export default {
  addUserItems: async (formData: FormData) => {
    await apiClient.post(`${baseUrl}/add`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
