import apiClient from "./axiosInstance";

const baseUrl = "/files";

export default {
  uploadImages: async (formData: FormData) => {
    await apiClient.post(`${baseUrl}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
