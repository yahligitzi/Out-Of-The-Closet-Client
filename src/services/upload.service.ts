import apiClient from "./axiosInstance";

const baseUrl = "/upload";

export default {
  uploadImages: async (formData: FormData) => {
    await apiClient.post(`${baseUrl}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
