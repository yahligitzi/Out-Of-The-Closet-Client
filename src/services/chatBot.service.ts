import apiClient from "./axiosInstance";

const baseUrl = "/chat-bot";

export default {
  generateOutFit: async () => {
    await apiClient.post(`${baseUrl}/outfit`);
  },
};
