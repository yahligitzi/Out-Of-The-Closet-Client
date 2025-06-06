import apiClient from "./axiosInstance";

const baseUrl = "/store";

export type Store = {
  name: string;
  logoUrl: string;
};

export default {
  getStores: async (): Promise<Store[]> => (await apiClient.get(baseUrl)).data,
};
